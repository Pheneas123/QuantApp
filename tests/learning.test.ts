import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { questions } from '../src/features/quick-practice/data/questions';
import { objectives,guidedProblems,writtenProblems,quickMappings } from '../src/features/learning/data';
import { validateObjectives,validateProblems,itemKey,choiceIdentity } from '../src/features/learning/schema';
import { beginGuided,selectGuided,submitGuided,hintGuided,advanceGuided,guidedAttempt,canResume } from '../src/features/learning/guidedSession';
import { updateSchedule,isDue,objectiveEvidence,type ReviewEvent,type ReviewSchedule } from '../src/features/learning/scheduling';
import { keys,readRecords,writeRecords,upsert,toggleFlag,recordReview,exportBackup,restoreBackup,validateBackup,validRecord,allEvents,type StorageLike,type WrittenDraft,type Flag,type GuidedSession } from '../src/features/learning/storage';
import { highlight } from '../src/components/highlighting';
import { textSegments } from '../src/components/textSegments';
import { ProgressiveHints } from '../src/components/ProgressiveHints';
import { STORAGE_KEY } from '../src/features/quick-practice/progress';
class MemoryStorage implements StorageLike {data=new Map<string,string>();getItem(k:string){return this.data.get(k)??null;}setItem(k:string,v:string){this.data.set(k,v);}removeItem(k:string){this.data.delete(k);}}
const at='2026-10-24T23:30:00.000Z';
const event=(fields:Partial<ReviewEvent>={}):ReviewEvent=>({id:'event-1',mode:'quick',itemId:'prob-001',at,outcome:'correct',hints:0,objectiveIds:['lo-probability-independence'],provenance:'assessed',...fields});
test('objective registry and explicit many-to-many mappings preserve all 450 IDs',()=>{
 validateObjectives(objectives);assert.equal(questions.length,450);assert.equal(Object.keys(quickMappings).length,450);
 const ids=new Set(objectives.map(o=>o.id));for(const q of questions)for(const id of q.objectiveIds)assert.ok(ids.has(id));
 assert.ok(objectives.some(o=>o.prerequisiteIds?.some(id=>objectives.find(p=>p.id===id)?.category!==o.category)));
 assert.ok(questions.some(q=>q.objectiveIds.length>1));
 assert.ok(questions.find(q=>q.id==='prob-013')!.objectiveIds.includes('lo-variance-sum'));
 assert.ok(questions.find(q=>q.id==='ml-forest-correlation')!.objectiveIds.includes('lo-variance-sum'));
});
test('objective validation rejects unknown IDs, cycles, self-dependencies and invalid taxonomy',()=>{
 const sample=objectives[0];for(const change of [{category:'X'},{subcategories:['Wrong']},{knowledgeIds:['unknown']},{prerequisiteIds:['unknown']},{prerequisiteIds:[sample.id]}])assert.throws(()=>validateObjectives([{...sample,...change}]));
 assert.throws(()=>validateObjectives([sample,sample]),/duplicate/);
 assert.throws(()=>validateObjectives([{...sample,id:'a',prerequisiteIds:['b']},{...sample,id:'b',prerequisiteIds:['a']}]),/cycle/);
});
test('guided/written validators detect ordered-part, hint, reference, solution and answer defects',()=>{
 const g=guidedProblems[0],w=writtenProblems[0];
 for(const parts of [[{...g.parts[0],order:2}], [{...g.parts[0],explanation:''}], [{...g.parts[0],correctAnswer:4}], [{...g.parts[0],answers:['1','1.0','2','3']}], [{...g.parts[0],hints:[{}]}],[g.parts[0],{...g.parts[1],id:g.parts[0].id}]])assert.throws(()=>validateProblems([{...g,parts}],'guided',objectives));
 for(const change of [{solution:''},{objectiveIds:['unknown']},{knowledgeIds:['unknown']},{prerequisiteIds:['unknown']},{hints:[null]}])assert.throws(()=>validateProblems([{...w,...change}],'written',objectives));
 assert.throws(()=>validateProblems([{...w,criteria:[]}],'written',objectives));
 assert.notEqual(choiceIdentity('$N_t$'),choiceIdentity('$n_t$'));
});
test('all new solutions/hints/choices parse as maths and preserve fenced code',()=>{
 for(const p of [...guidedProblems,...writtenProblems]) {
  const texts=[p.statement,p.solution,p.assumptions,...(p.hints??[]),...('parts' in p?p.parts.flatMap(part=>[part.prompt,part.explanation,...part.answers,...(part.hints??[])]):p.criteria)];
  for(const text of texts)for(const seg of textSegments(text??'')){if(seg.kind==='code')continue;for(const m of seg.text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$]*?)\$/g))assert.doesNotThrow(()=>katex.renderToString(m[1]??m[2],{throwOnError:true}),p.id);}
 }
});
test('guided state grades once, locks recorded parts, orders transitions and persists/resumes',()=>{
 const p=guidedProblems[0],storage=new MemoryStorage();let s=beginGuided(p,'assessment',at,()=>0);
 assert.equal(advanceGuided(s,p),s);assert.equal(submitGuided(s,p,at),s);
 s=hintGuided(s,p);s=submitGuided(selectGuided(s,p.parts[0].correctAnswer),p,at);
 assert.equal(s.responses[0].correct,true);assert.equal(s.responses[0].hints,1);
 assert.equal(selectGuided(s,0),s);assert.equal(submitGuided(s,p,at),s);assert.equal(hintGuided(s,p),s);
 upsert(keys.active,s,storage);const resumed=readRecords<GuidedSession>(keys.active,storage)[0];assert.deepEqual(resumed,s);assert.ok(canResume(resumed,p));
 assert.ok(!canResume({...s,contentVersion:99},p));
 assert.ok(!canResume({...s,complete:true},p));assert.ok(!canResume({...s,recorded:true},p));
 assert.ok(!canResume({...s,responses:[{...s.responses[0],selectedAnswer:null,correct:false}]},p));
 assert.ok(!canResume({...s,hints:[0,...s.hints.slice(1)]},p));
 for(let i=1;i<p.parts.length;i++){s=advanceGuided(s,p);s=submitGuided(selectGuided(s,p.parts[i].correctAnswer),p,at);}
 assert.equal(s.complete,false);s=advanceGuided(s,p);assert.equal(s.complete,true);assert.equal(guidedAttempt(s,p).performance,1);assert.equal(guidedAttempt(s,p).responses.length,p.parts.length);
 assert.equal(advanceGuided(s,p),s);
});
test('progressive hints expose only the revealed prefix, including zero-hint compatibility',()=>{
 let html=renderToStaticMarkup(createElement(ProgressiveHints,{hints:['alpha','beta'],count:1,onReveal:()=>{}}));
 assert.ok(html.includes('Hint 1'));assert.ok(!html.includes('Hint 2')); // MathText fills prose on mount; labels establish prefix length.
 assert.equal(renderToStaticMarkup(createElement(ProgressiveHints,{count:0,onReveal:()=>{}})),'');
});
test('scheduling is deterministic across DST and distinguishes hints and unsure',()=>{
 const s=updateSchedule(undefined,event());assert.equal(s.due,'2026-10-25T23:30:00.000Z');assert.equal(s.intervalDays,1);
 const second=updateSchedule(s,event({id:'event-2',at:s.due}));assert.equal(second.intervalDays,6);assert.equal(second.state,'review');
 const third=updateSchedule(second,event({id:'event-3',at:second.due}));assert.equal(third.intervalDays,16);
 assert.deepEqual(updateSchedule(second,event({id:'event-3',at:second.due})),third);
 for(const change of [{outcome:'incorrect' as const},{outcome:'unsure' as const},{outcome:'partial' as const},{hints:1}]){const next=updateSchedule(second,event({id:'failure',at:second.due,...change}));assert.equal(next.intervalDays,1);assert.equal(next.successes,0);assert.equal(next.state,'learning');assert.ok(next.ease<second.ease);}
 assert.ok(!isDue(s,Date.parse(s.due)-1));assert.ok(isDue(s,Date.parse(s.due)));
 assert.equal(updateSchedule(s,event()),s);
 assert.throws(()=>updateSchedule(s,event({id:'old',at:'2020-01-01T00:00:00Z'})),/time mismatch/);
});
test('whole-problem guided and self-reported written reviews preserve provenance',()=>{
 const storage=new MemoryStorage();recordReview(event({mode:'guided',itemId:guidedProblems[0].id,outcome:'partial'}),storage);
 recordReview(event({id:'written',mode:'written',itemId:writtenProblems[0].id,outcome:'correct',provenance:'self-reported'}),storage);
 const s=readRecords<ReviewSchedule>(keys.schedules,storage);assert.equal(s.length,2);assert.equal(s[0].events[0].outcome,'partial');assert.equal(s[1].events[0].provenance,'self-reported');
 recordReview(event({mode:'guided',itemId:guidedProblems[0].id,outcome:'partial'}),storage);assert.equal(allEvents(readRecords<ReviewSchedule>(keys.schedules,storage)).length,2);
});
test('objective evidence reports insufficient data and keeps hint/written success distinct',()=>{
 const id='lo-probability-independence';const e=objectiveEvidence(id,[event(),event({id:'hint',hints:1}),event({id:'written',mode:'written',provenance:'self-reported'})]);
 assert.equal(e.attempts,3);assert.equal(e.uniqueItems,2);assert.equal(e.hintAssisted,1);assert.equal(e.writtenSuccess,1);assert.equal(e.insufficient,true);
 assert.equal(objectiveEvidence(id,[]).insufficient,true);
 assert.equal(objectiveEvidence(id,[event(),event({id:'b',itemId:'prob-009'}),event({id:'c',itemId:'prob-024'})]).insufficient,false);
});
test('flags distinguish modes, survive reload and retain unavailable identities for removal',()=>{
 const storage=new MemoryStorage();for(const mode of ['quick','guided','written'] as const)toggleFlag({mode,itemId:'same-id'},storage);
 assert.equal(readRecords<Flag>(keys.flags,storage).length,3);toggleFlag({mode:'guided',itemId:'same-id'},storage);assert.equal(readRecords<Flag>(keys.flags,storage).length,2);
 toggleFlag({mode:'written',itemId:'removed-content'},storage);assert.ok(readRecords<Flag>(keys.flags,storage).some(f=>f.itemId==='removed-content'));
 assert.notEqual(itemKey({mode:'quick',itemId:'x'}),itemKey({mode:'guided',itemId:'x'}));
});
test('written drafts preserve long maths/code answers and reveal state through storage',()=>{
 const storage=new MemoryStorage();const draft:WrittenDraft={id:'written-ou',at,answer:'Reasoning $x^2$\n```python\n    print(2)\n```'.repeat(100),hints:2,revealed:false,attemptId:'draft-id',assessed:false};
 upsert(keys.drafts,draft,storage);assert.deepEqual(readRecords<WrittenDraft>(keys.drafts,storage),[draft]);
 upsert(keys.drafts,{...draft,revealed:true},storage);assert.equal(readRecords<WrittenDraft>(keys.drafts,storage)[0].revealed,true);
});
test('malformed records do not erase healthy progress or permit unsafe overwrites',()=>{
 const storage=new MemoryStorage();const flag={id:'quick:x',mode:'quick',itemId:'x',at};storage.setItem(keys.flags,JSON.stringify({version:1,records:[flag,{broken:true}]}));
 const raw=storage.getItem(keys.flags);assert.equal(readRecords<Flag>(keys.flags,storage).length,1);
 assert.throws(()=>toggleFlag({mode:'quick',itemId:'y'},storage));assert.equal(storage.getItem(keys.flags),raw);
 storage.setItem(keys.drafts,'broken');assert.deepEqual(readRecords(keys.drafts,storage),[]);assert.throws(()=>writeRecords(keys.drafts,[],storage));assert.equal(storage.getItem(keys.drafts),'broken');
});
test('a denied localStorage getter is handled before any record read',()=>{
 const prior=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
 try {Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw Error('SecurityError');}});assert.deepEqual(readRecords(keys.flags),[]);}
 finally {if(prior)Object.defineProperty(globalThis,'localStorage',prior);else Reflect.deleteProperty(globalThis,'localStorage');}
});
test('backup round trips legacy records, draft, interrupted session, flags and schedules',()=>{
 const source=new MemoryStorage(),dest=new MemoryStorage();const legacy={id:'legacy',questionId:'retired-id',at,correct:true,selectedAnswer:1};source.setItem(STORAGE_KEY,JSON.stringify([legacy]));
 toggleFlag({mode:'written',itemId:'unavailable'},source);recordReview(event(),source);upsert(keys.active,beginGuided(guidedProblems[0],'learning',at),source);
 upsert(keys.drafts,{id:'written-ou',at,answer:'Full draft',hints:0,revealed:false,attemptId:'draft',assessed:false},source);
 const backup=exportBackup(source);validateBackup(backup);restoreBackup(backup,'replace',dest);assert.deepEqual(exportBackup(dest).data,backup.data);assert.deepEqual(JSON.parse(dest.getItem(STORAGE_KEY)!)[0],legacy);
 restoreBackup(backup,'merge',dest);assert.deepEqual(exportBackup(dest).data,backup.data);
 const newer=event({id:'later',at:'2026-10-26T23:30:00Z'});recordReview(newer,dest);restoreBackup(backup,'merge',dest);assert.equal(readRecords<ReviewSchedule>(keys.schedules,dest)[0].events.length,2);
});
test('malformed backups are rejected before mutation and import rollback restores originals',()=>{
 const source=new MemoryStorage();toggleFlag({mode:'quick',itemId:'x'},source);recordReview(event(),source);const backup=exportBackup(source);
 for(const change of [{version:2},{format:'other'},{data:{...backup.data,secret:'x'}},{data:{...backup.data,[keys.flags]:{version:1,records:[{}]}}}])assert.throws(()=>restoreBackup({...backup,...change} as any,'replace',source));
 assert.equal(readRecords<Flag>(keys.flags,source).length,1);
 const dest=new MemoryStorage();toggleFlag({mode:'written',itemId:'existing'},dest);const original=dest.getItem(keys.flags);let writes=0;const real=dest.setItem.bind(dest);dest.setItem=(k,v)=>{if(++writes===2)throw Error('Quota');real(k,v);};
 assert.throws(()=>restoreBackup(backup,'replace',dest),/original data restored/);assert.equal(dest.getItem(keys.flags),original);
});
test('syntax highlighting uses four grammars, preserves characters and escapes markup',()=>{
 for(const [language,code] of [['py','def f(x):\n    return "<script>$x$" # comment'],['c++','int f() { return 42; }'],['js','const f = () => "hello";'],['ts','const x: number = 2;']]){
  const html=highlight(code,language)!;assert.ok(html.includes('hljs-'));assert.ok(!html.includes('<script>'));const plain=html.replace(/<[^>]*>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&amp;/g,'&');assert.equal(plain,code);
 }
 assert.equal(highlight('<unknown>','unknown'),undefined);
 assert.equal(highlight('x'),undefined);
});
test('new independently calculated numeric guided answers are unique',()=>{
 const expected:Record<string,string>={'bayes-joint':(.01*.9).toFixed(3),'bayes-total':(.01*.9+.99*.05).toFixed(4),'bayes-posterior':`${(.009/.0585*100).toFixed(2)}%`,'gbm-log-drift':(.08-.5*.2**2).toFixed(2),'gbm-mean':(100*Math.exp(.08)).toFixed(2),'square-derivatives':'2','square-variance':String(2**2/2),'bond-price':'£100.00','bond-macaulay':((5/1.05+2*105/1.05**2)/100).toFixed(4),'bond-modified':((5/1.05+2*105/1.05**2)/100/1.05).toFixed(4),'gradient-first':String(1-.1*2*(1-3)),'gradient-second':(1.4-.1*2*(1.4-3)).toFixed(2)};
 for(const [id,value] of Object.entries(expected)){const part=guidedProblems.flatMap(p=>p.parts).find(p=>p.id===id)!;assert.deepEqual(part.answers.flatMap((answer,i)=>answer===value?[i]:[]),[part.correctAnswer],id);}
 assert.ok(Math.abs(120*(-.5)+1.05*(60/1.05))<1e-10);assert.equal(80*(-.5)+1.05*(60/1.05),20);
 const p=.5,y=1,x=[2,-1];assert.deepEqual(x.map(v=>(p-y)*v),[-1,.5]);assert.equal(Math.max(0,0)-y*0+Math.log1p(Math.exp(-Math.abs(0))),Math.log(2));
});
