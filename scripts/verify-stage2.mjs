import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { stage2Questions } from '../src/features/quick-practice/data/bank/stage2/index.ts';
import { beginQuickPractice } from '../src/features/quick-practice/session.ts';
import { guidedProblems, writtenProblems } from '../src/features/learning/data/index.ts';
import { knowledge } from '../src/data/knowledge/index.ts';
import { keys, validRecord } from '../src/features/learning/storage.ts';
import { updateSchedule } from '../src/features/learning/scheduling.ts';
import { textSegments } from '../src/components/textSegments.ts';
const server=await preview({logLevel:'silent',preview:{host:'127.0.0.1',port:4194,strictPort:true}});
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.PWA_CHROMIUM||undefined,args:process.env.PWA_NO_SANDBOX==='1'?['--no-sandbox']:[]});
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Math.random=()=>0;});await page.goto(server.resolvedUrls.local[0]);await page.clock.setFixedTime(new Date('2026-10-11T12:00:00Z'));
 const at='2026-10-01T12:00:00Z',gp=guidedProblems[0],wp=writtenProblems[0];
 const old={
  [keys.guided]:{id:'old-guided',problemId:gp.id,at,responses:[],complete:false,performance:0,objectiveIds:gp.objectiveIds,policy:'learning',contentVersion:1},
  [keys.written]:{id:'old-written',problemId:wp.id,at,assessment:'partial',hints:1,revealed:true,objectiveIds:wp.objectiveIds,answer:'Saved original working'},
  [keys.drafts]:{id:wp.id,at,answer:'Saved draft $x^2$',hints:1,revealed:false,attemptId:'old-draft',assessed:false},
  [keys.active]:{id:'old-active',at,problemId:gp.id,policy:'learning',responses:[],index:0,selectedAnswer:null,hints:gp.parts.map(()=>0),answerOrders:gp.parts.map(()=>[0,1,2,3]),complete:false,contentVersion:1,recorded:false},
  [keys.flags]:{id:'quick:prob-001',mode:'quick',itemId:'prob-001',at},
  [keys.schedules]:updateSchedule(undefined,{id:'old-review',mode:'quick',itemId:'prob-001',at,outcome:'correct',hints:0,objectiveIds:['lo-probability-expectation'],provenance:'assessed'}),
 };
 for(const [key,record] of Object.entries(old))assert.ok(validRecord(key,record),key);
 const legacy={id:'original-legacy',questionId:'prob-001',selectedAnswer:1,correct:true,at};
 const seeded=[legacy,...questions.filter(q=>!q.id.startsWith('s2-')&&q.id!=='prob-001').map(q=>({id:'original-'+q.id,questionId:q.id,selectedAnswer:q.correctAnswer,correct:true,at}))];
 await page.evaluate(({old,seeded})=>{for(const [key,record]of Object.entries(old))localStorage.setItem(key,JSON.stringify({version:1,records:[record]}));localStorage.setItem('quant-pocket.attempts.v1',JSON.stringify(seeded));},{old,seeded});await page.reload();
 const button=name=>page.getByRole('button',{name,exact:true}),records=key=>page.evaluate(key=>JSON.parse(localStorage.getItem(key))?.records??[],key),history=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('quant-pocket.attempts.v1')));
 async function widths(id,phase){for(const width of [320,390,768,1024]){await page.setViewportSize({width,height:width===768?1024:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${id}/${phase}/${width}: overflow`);assert.equal(await page.locator('.katex-error').count(),0,id);if(phase==='selection'&&width===320&&await page.locator('.question .code-block').evaluateAll(els=>els.some(e=>e.scrollWidth>e.clientWidth)))localScroll=true;}}
 async function code(q){const blocks=textSegments(q.prompt).filter(s=>s.kind==='code');assert.deepEqual(await page.locator('.question .code-block').allTextContents(),blocks.map(s=>s.text),q.id);for(const el of await page.locator('.question .code-block').all()){assert.equal(await el.evaluate(e=>getComputedStyle(e).whiteSpace),'pre');assert.equal(await el.evaluate(e=>getComputedStyle(e).overflowX),'auto');assert.ok(await el.locator('[class^=hljs-]').count()>0,q.id+' highlighting');}}
 await page.getByRole('group',{name:'Session',exact:true}).getByRole('button',{name:'All',exact:true}).click();await button('Unseen Only').click();await page.getByText('120 available · session: 120',{exact:true}).waitFor();await button('Start').click();
 const queue=beginQuickPractice(stage2Questions,()=>0).queue;
 let localScroll=false,mathCount=0;
 for(let n=0;n<queue.length;n++){
  const q=queue[n];await widths(q.id,'selection');await code(q);mathCount+=await page.locator('.question .katex').count();
  for(const el of await page.locator('.question .code-block').all())if(await el.evaluate(e=>e.scrollWidth>e.clientWidth))localScroll=true;
  if(q.hints?.length){assert.equal(await page.locator('.hints p').count(),0);for(let h=0;h<q.hints.length;h++){await button(`Reveal next hint (${h}/${q.hints.length})`).click();assert.equal(await page.locator('.hints p').count(),h+1);}assert.ok(await button(`Reveal next hint (${q.hints.length}/${q.hints.length})`).isDisabled());}
  if(n%20===0)await button('Flag for later').click();
  const canonical=n%3===0?q.correctAnswer:(q.correctAnswer+1)%4;
  if(n%3===2)await button('Not sure').click();else{await page.locator(`.answer[data-answer-index="${canonical}"]`).click();await button('Submit').click();}
  const attempt=(await history()).at(-1);assert.equal(attempt.questionId,q.id);assert.equal(attempt.result,n%3===0?'correct':n%3===1?'incorrect':'unsure');assert.equal(await page.locator('.answer.is-correct').count(),1);assert.equal(await page.locator('.answer:disabled').count(),4);await widths(q.id,'feedback');
  const schedule=(await records(keys.schedules)).find(s=>s.itemId===q.id&&s.mode==='quick');assert.equal(schedule.events[0].hints,q.hints?.length??0);assert.deepEqual(schedule.events[0].objectiveIds,q.objectiveIds);if(q.hints?.length)assert.equal(schedule.successes,0);
  if(n%20===0){const ref=knowledge.find(k=>k.id===q.knowledgeIds[0]),before=await history(),order=await page.locator('.answer').allTextContents();await page.locator('.related-concepts').getByRole('button',{name:ref.name,exact:true}).click();await page.getByRole('heading',{name:ref.name,exact:true}).waitFor();await widths(ref.id,'Reference');await button('Back to Quick Practice').click();assert.deepEqual(await history(),before);assert.deepEqual(await page.locator('.answer').allTextContents(),order);assert.equal(await page.locator('.hints p').count(),q.hints?.length??0);}
  await button('Next').click();if((n+1)%20===0)console.log(`Reviewed ${n+1}/120 new items at four widths.`);
 }
 assert.ok(localScroll,'long lines scroll inside code blocks');assert.ok(mathCount>0,'new mathematics rendered by KaTeX');
 assert.deepEqual((await history()).slice(0,seeded.length),seeded);
 for(const [key,record] of Object.entries(old))assert.deepEqual((await records(key)).find(r=>r.id===record.id),record,`${key}: retained original record`);
 await button('Back to Home').click();await page.reload();await button('Due for Review').click();await page.getByText('1 available · session: 1',{exact:true}).waitFor();await page.clock.setFixedTime(new Date('2026-10-13T12:00:00Z'));await page.reload();await page.getByRole('group',{name:'Session',exact:true}).getByRole('button',{name:'All',exact:true}).click();await button('Due for Review').click();await page.getByText('121 available · session: 121',{exact:true}).waitFor();
 await page.getByRole('navigation').getByRole('button',{name:'History',exact:true}).click();const downloading=page.waitForEvent('download');await button('Export progress').click();const downloaded=await downloading;const backupPath='/tmp/quant-stage2-backup.json';await downloaded.saveAs(backupPath);const backup=JSON.parse(readFileSync(backupPath,'utf8'));
 assert.equal(backup.data['quant-pocket.attempts.v1'].length,450);for(const [key,record]of Object.entries(old))assert.deepEqual(backup.data[key].records.find(r=>r.id===record.id),record,key);
 await page.locator('input[type=file]').setInputFiles({name:'stage2-backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.getByRole('heading',{name:'Review restoration',exact:true}).waitFor();await button('Confirm restoration').click();await page.getByText('Backup restored.',{exact:true}).waitFor();assert.deepEqual(await history(),backup.data['quant-pocket.attempts.v1']);
 // A cached production app can render a new code question and its new Reference entry offline.
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await context.setOffline(true);
 const offlineId='s2-prog-perfect-forwarding';await page.evaluate(id=>{const key='quant-pocket.attempts.v1';localStorage.setItem(key,JSON.stringify(JSON.parse(localStorage.getItem(key)).filter(q=>q.questionId!==id)));},offlineId);await page.reload();await page.getByRole('navigation').getByRole('button',{name:'Practice',exact:true}).click();await button('Unseen Only').click();await page.getByText('1 available · session: 1',{exact:true}).waitFor();await button('Start').click();const q=stage2Questions.find(q=>q.id===offlineId);await code(q);await button('Not sure').click();const ref=knowledge.find(k=>k.id===q.knowledgeIds[0]);await page.locator('.related-concepts').getByRole('button',{name:ref.name,exact:true}).click();await page.getByRole('heading',{name:ref.name,exact:true}).waitFor();await widths(ref.id,'offline');await button('Back to Quick Practice').click();
 assert.deepEqual(errors,[]);console.log('PASS: all 120 Stage 2 items, 320/390/768/1024 selection and feedback, progressive hints, 40 correct/40 incorrect/40 unsure, literal highlighted code, local line scrolling, Reference returns, original namespaces, due schedules, backup download/import and offline new content.');
}finally{await browser?.close();server.httpServer.closeAllConnections();await new Promise(done=>server.httpServer.close(done));}
