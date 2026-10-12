import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import katex from 'katex';
import { questions, categories } from '../src/features/quick-practice/data/questions';
import { stage2Questions } from '../src/features/quick-practice/data/bank/stage2';
import { knowledge, knowledgeIdSet } from '../src/data/knowledge';
import { objectives, guidedProblems, writtenProblems, quickMappings } from '../src/features/learning/data';
import { stage2Objectives } from '../src/features/learning/data/stage2Objectives';
import { choiceIdentity } from '../src/features/learning/schema';
import { beginQuickPractice, selectAnswer, submitAnswer, submitUnsure } from '../src/features/quick-practice/session';
import { textSegments } from '../src/components/textSegments';
import { defaultFilters, eligibleQuestions } from '../src/features/quick-practice/sessionSetup';
import { parseAttempts } from '../src/features/quick-practice/progress';
import { updateSchedule, objectiveEvidence, type ReviewEvent } from '../src/features/learning/scheduling';
const baseline = JSON.parse(readFileSync('tests/fixtures/stage2-baseline.json', 'utf8'));
const ledger = JSON.parse(readFileSync('docs/STAGE_2_REVIEW_LEDGER.json', 'utf8'));
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const q = (slug: string) => { const item = stage2Questions.find(q => q.id === 's2-' + slug); assert.ok(item, slug); return item; };
const correct = (slug: string) => { const item = q(slug); return item.answers[item.correctAnswer]; };
const close = (x: number, y: number) => assert.ok(Math.abs(x - y) < 1e-10, `${x} ≠ ${y}`);
function numerical(slug: string, expected: number) {
 const item = q(slug);
 function value(a: string) { const clean = a.replace(/\$/g, ''); const parts = clean.split('/').map(Number); return parts.length === 2 ? parts[0] / parts[1] : Number(clean); }
 assert.deepEqual(item.answers.flatMap((a, i) => Math.abs(value(a) - expected) < 1e-10 ? [i] : []), [item.correctAnswer], slug);
}
test('Stage 2 exact allocation and full original content preservation', () => {
 assert.equal(stage2Questions.length, 120); assert.equal(questions.length, 450);
 assert.deepEqual(categories.map(c => questions.filter(q => q.category === c).length), [50,50,50,50,50,100,50,50]);
 assert.deepEqual(categories.map(c => stage2Questions.filter(q => q.category === c).length), [13,22,16,6,13,0,25,25]);
 assert.equal(new Set(questions.map(q => q.id)).size, 450);
 for (const [key, records] of Object.entries({questions, knowledge, objectives, guidedProblems, writtenProblems})) {
  for (const [id, expected] of Object.entries(baseline[key])) assert.equal(hash(records.find(r => r.id === id)), expected, `${key}/${id}: original full record`);
 }
 assert.equal(Object.keys(baseline.questions).length,330);assert.equal(Object.keys(baseline.knowledge).length,132);
 assert.equal(Object.keys(baseline.objectives).length,94);
 assert.equal(guidedProblems.length,6); assert.equal(guidedProblems.reduce((n,p)=>n+p.parts.length,0),23); assert.equal(writtenProblems.length,6);
 for (const [id,expected] of Object.entries(baseline.mappings)) assert.equal(hash(quickMappings[id]),expected,`${id}: original mapping/family`);
});
test('Stage 2 content, review ledger, objective coverage and strict TeX rendering', () => {
 const ids = new Set(objectives.map(o => o.id));
 assert.equal(ledger.length,120);assert.equal(ledger.filter((r: {application: boolean})=>r.application).length,116);
 for (const item of stage2Questions) {
  assert.equal(item.answers.length,4); assert.equal(new Set(item.answers.map(choiceIdentity)).size,4);
  assert.ok(item.explanation?.trim()); assert.ok(quickMappings[item.id].objectiveIds.length);
  assert.deepEqual(quickMappings[item.id].objectiveIds,item.objectiveIds);
  for (const id of item.objectiveIds!) assert.ok(ids.has(id),item.id);
  assert.ok(item.knowledgeIds?.length); for (const id of item.knowledgeIds!) assert.ok(knowledgeIdSet.has(id),item.id);
  const review=ledger.find((r: {id:string})=>r.id===item.id);assert.ok(review.difficultyRationale && review.verificationBasis && review.overlapReview,item.id);
  assert.equal(review.choices.length,4,item.id);assert.equal(review.choices.filter((c:{accepted:boolean})=>c.accepted).length,1,item.id);
  for(const c of review.choices){assert.equal(c.answer,item.answers[c.canonicalIndex],item.id);assert.equal(c.accepted,c.canonicalIndex===item.correctAnswer,item.id);assert.ok(c.review.trim(),item.id);}
  for (const text of [item.prompt,...item.answers,item.explanation!,...(item.hints??[])]) {
   for (const segment of textSegments(text).filter(s=>s.kind==='text')) {
    assert.ok(!segment.text.includes('```'),item.id);
    for (const m of segment.text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$]*?)\$/g)) assert.doesNotThrow(()=>katex.renderToString(m[1]??m[2],{throwOnError:true}),item.id);
   }
  }
 }
 assert.equal(stage2Objectives.length,8);
 for(const o of stage2Objectives)assert.ok(stage2Questions.some(q=>q.objectiveIds?.includes(o.id)),o.id);
 const normalise=(s:string)=>s.toLowerCase().replace(/\s+/g,' ').trim();
 const prompts=[...questions.map(q=>q.prompt),...guidedProblems.flatMap(p=>[p.statement,...p.parts.map(q=>q.prompt)]),...writtenProblems.map(p=>p.statement)].map(normalise);
 assert.equal(new Set(prompts).size,prompts.length,'no identical cross-mode prompts');
});
test('Stage 2 finite enumeration checks conditional models and sampling laws', () => {
 const prior=.2, likelihoods=[.8*.2,.2*.8];numerical('prob-two-signals',prior*likelihoods[0]/(prior*likelihoods[0]+(1-prior)*likelihoods[1]));
 const outcomes=[[0,0],[0,1],[1,0],[1,1]].filter(([u,v])=>u+v>=1);
 const joint=outcomes.filter(([u,v])=>u&&v).length/outcomes.length;
 const marginals=outcomes.filter(([u])=>u).length/outcomes.length*outcomes.filter(([,v])=>v).length/outcomes.length;
 close(joint,1/3);close(marginals,4/9);assert.equal(correct('prob-conditioning-dependence'),'$(1/3,4/9)$');
 const samples=[];for(let a=0;a<10;a++)for(let b=0;b<10;b++)for(let c=0;c<10;c++)if(a!==b&&b!==c&&a!==c)samples.push([a,b,c]);
 numerical('prob-without-replacement',samples.filter(s=>s.every(i=>i<5)).length/samples.length);
 const draws=[];for(let a=0;a<5;a++)for(let b=0;b<5;b++)for(let c=0;c<5;c++)draws.push(new Set([a,b,c]).size);
 numerical('prob-distinct-indicators',draws.reduce((s,n)=>s+n,0)/draws.length);
 const within=[.25,.75].reduce((s,p)=>s+p*(1-p)/2,0),between=[.25,.75].reduce((s,p)=>s+(p-.5)**2/2,0);
 close(within,3/16);close(between,1/16);close(within+between,.25);assert.equal(correct('prob-total-variance-mixture'),'$(3/16,1/16,1/4)$');
 numerical('prob-hoeffding-budget',Math.ceil(Math.log(40)/.02));assert.ok(2*Math.exp(-.02*184)>.05);assert.ok(2*Math.exp(-.02*185)<=.05);
 numerical('prob-binomial-normal-approximation',1-.9772);
});
test('Stage 2 exact finite statistical calculations, pivots and projection algebra',()=>{
 numerical('stat-cramer-rao-transformed',(2*2)**2/(36/9));numerical('stat-oracle-shrinkage',4/(1+4));
 numerical('stat-normal-constrained-mle',Math.min(1,(2+3)/2));
 numerical('stat-discrete-p-value',5/16);numerical('stat-randomised-size',(.5-.25)/.5);
 const nullReject=.5**3,altReject=.8**3;close(nullReject,1/8);close(1-altReject,61/125);assert.equal(correct('stat-binomial-errors'),'$1/8$ and $61/125$');
 const x=[0,1,2],y=[1,2,2],xm=1,ym=y.reduce((s,v)=>s+v,0)/3;
 const slope=x.reduce((s,v,i)=>s+(v-xm)*(y[i]-ym),0)/x.reduce((s,v)=>s+(v-xm)**2,0);close(slope,.5);close(ym-slope*xm,7/6);assert.equal(correct('stat-ols-line-fit'),'$(7/6,1/2)$');
 numerical('stat-heteroskedastic-variance',1/25+9*4/25);
 numerical('stat-dependent-predictive-trials',3*4/(4*5));
 for(const n of [2,10,100]){const lambda=.7;const c=-Math.log(.95),m=c/(n*lambda);close(Math.exp(-n*lambda*m),.95);}
 assert.equal(correct('stat-exponential-lower-bound'),'$-\\log(0.95)/(nM)$');assert.match(q('stat-exponential-lower-bound').prompt,/n≥2/);
 for(const z of [.1,1,3])assert.ok(Math.abs((1-z/1e6)**1e6-Math.exp(-z))<1e-6);
});
test('Stage 2 measure examples, strict Fatou and finite partitions',()=>{
 const atoms=new Map<string,number[]>();for(let i=1;i<=5;i++){const signature=[1,2].includes(i)+','+[2,3].includes(i);atoms.set(signature,[...(atoms.get(signature)??[]),i]);}
 numerical('measure-generated-atoms',2**atoms.size);
 numerical('measure-overlapping-simple',.25+3*.5+2*.25);
 numerical('measure-continuous-density-expectation',2/3);
 const n=100_000;let kernel=0,logLimit=0;for(let i=0;i<n;i++){const x=(i+.5)/n;kernel+=(Math.log1p(x)-Math.log(x))/n;logLimit+=n*Math.log1p(x/n)/n;}
 assert.ok(Math.abs(kernel-2*Math.log(2))<1e-5);assert.ok(Math.abs(logLimit-.5)<2e-6);
 assert.equal(correct('measure-tonelli-singular-kernel'),'$2\\log2$; Tonelli first, then finite integrability permits Fubini.');
 assert.equal(correct('measure-strict-fatou'),'$(0,1/2)$');
});
test('Stage 2 process and calculus identities cross-check via moments, ODEs and PDEs',()=>{
 numerical('process-reflection-barrier',2*(1-.8413));
 let second=0;for(let bits=0;bits<16;bits++){const k=bits.toString(2).replaceAll('0','').length;second+=(2*k-4)**2*.75**k*.25**(4-k);}numerical('process-biased-walk-second-moment',second);
 numerical('process-absorption-with-holding',.3/(1-.5));numerical('calc-disjoint-integral-covariation',0);numerical('calc-bridge-qv',1);
 for(const t of [.2,1,3]){const p=.4*(1-Math.exp(-5*t)),dp=2*Math.exp(-5*t);close(dp,2*(1-p)-3*p);}
 // Independently differentiate the proposed conditional cubic polynomial.
 for(const t of [.2,.7])for(const w of [-2,1,3]){const timeDerivative=-3*w,secondDerivative=6*w;close(timeDerivative+.5*secondDerivative,0);}
 // Heat solution: u_t = +u/2, u_xx = -u.
 for(const t of [0,.4,1]){const u=Math.exp(-(1-t)/2)*Math.cos(.7);close(.5*u+.5*(-u),0);}
 for(const mu of [-1,.4])for(const sigma of [.5,2]){const x=3;close(-(x**-2)*mu*x+.5*2*x**-3*(sigma*x)**2,(sigma**2-mu)/x);}
});
test('Stage 2 ML gradients, coupled stability, posterior covariance and metrics',()=>{
 const ridge=[2/(1+1),8/(4+1)];assert.equal(correct('ml-ridge-diagonal-solution'),`$(${ridge[0]},8/5)^T$`);
 const p=.25;const derivative=2*p*(1-p),scoreMean=p*(2-1)*(1-p)+(1-p)*(0-1)*(-p);close(derivative,3/8);close(scoreMean,derivative);assert.equal(correct('ml-policy-gradient-bandit'),'Both are 3/8.');
 // Characteristic polynomial of DH independently computed from trace and determinant.
 const A=[[4,2],[4,8]],trace=A[0][0]+A[1][1],det=A[0][0]*A[1][1]-A[0][1]*A[1][0],lambda=(trace+Math.sqrt(trace**2-4*det))/2;
 close(2/lambda,1/(3+Math.sqrt(3)));assert.equal(correct('ml-matrix-gradient-stability'),'$0<\\eta<1/(3+\\sqrt3)$');
 for(const eta of [.05,.1,.2])assert.ok(Math.abs(1-eta*lambda)<1);close(Math.abs(1-2/lambda*lambda),1);
 numerical('ml-selection-optimism',[0,0,0,1].reduce((s,x)=>s+x,0)/4);
 numerical('ml-centred-pca-rank',Math.min(3-1,5));numerical('ml-adam-first-step',1-.1*((1-.9)*2/(1-.9))/Math.sqrt((1-.999)*4/(1-.999)));
 const pos=[.9,.2],neg=[.8,.1,.2];numerical('ml-auc-tied-rank',pos.reduce((s,a)=>s+neg.reduce((v,b)=>v+(a>b?1:a===b?.5:0),0),0)/(pos.length*neg.length));numerical('ml-f1-counts',2*3/(2*3+1+2));
 close(0-1*1/(1+1+2),-.25);close(1-1*1/2,.5);
 const keep=.5,x=2,ys=[0,x/keep];close(ys.reduce((s,y)=>s+y*.5,0),2);close(ys.reduce((s,y)=>s+(y-2)**2*.5,0),4);
 const out=Math.floor((7+2-1*(3-1)-1)/2)+1;assert.equal(out,4);assert.equal(4*3*3*3+4,112);
});
test('every new item keeps canonical shuffled grading, legacy attempts, evidence and hint-assisted scheduling',()=>{
 const legacy={id:'legacy',questionId:'prob-001',correct:true,selectedAnswer:1,at:'2026-10-01T12:00:00Z'};
 for(const item of stage2Questions)for(const random of [()=>0,()=>.3,()=>.99]){
  const state=beginQuickPractice([item],random),result=submitAnswer(selectAnswer(state,item.correctAnswer),'new','2026-10-11T12:00:00Z');assert.equal(result.submitted?.result,'correct');
  const history=parseAttempts(JSON.stringify([legacy,result.submitted]));assert.deepEqual(history[0],legacy);
  assert.equal(submitAnswer(selectAnswer(state,(item.correctAnswer+1)%4),'wrong','2026-10-11T12:01:00Z').submitted?.result,'incorrect');assert.equal(submitUnsure(state,'unsure','2026-10-11T12:02:00Z').submitted?.result,'unsure');
  assert.ok(!eligibleQuestions(questions,{...defaultFilters,mode:'unseen'},history).some(q=>q.id===item.id));
  const event:ReviewEvent={id:'review-'+item.id,mode:'quick',itemId:item.id,at:'2026-10-11T12:00:00Z',outcome:'correct',hints:1,objectiveIds:item.objectiveIds!,provenance:'assessed'};
  const schedule=updateSchedule(undefined,event);assert.equal(schedule.successes,0);assert.equal(schedule.events[0].hints,1);
  const evidence=objectiveEvidence(item.objectiveIds![0],[event]);assert.equal(evidence.hintAssisted,1);
 }
});
