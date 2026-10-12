import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { guidedProblems,writtenProblems } from '../src/features/learning/data/index.ts';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { keys } from '../src/features/learning/storage.ts';
const server=await preview({logLevel:'silent',preview:{host:'127.0.0.1',port:4193,strictPort:true}});
let browser;
try {
 browser=await chromium.launch({headless:true,executablePath:process.env.PWA_CHROMIUM||undefined,args:process.env.PWA_NO_SANDBOX==='1'?['--no-sandbox']:[]});
 const context=await browser.newContext({viewport:{width:390,height:844}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(server.resolvedUrls.local[0]);
 const records=key=>page.evaluate(key=>JSON.parse(localStorage.getItem(key))?.records??[],key);
 const button=name=>page.getByRole('button',{name,exact:true});
 const format=mode=>page.getByRole('group',{name:'Practice format',exact:true}).getByRole('button',{name:mode,exact:true}).click();
 const home=()=>page.getByRole('navigation').getByRole('button',{name:'Practice',exact:true}).click();
 async function widths(label){for(const width of [320,390,768,1024,1280]){await page.setViewportSize({width,height:width===768?1024:width===1024?768:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${label} overflow ${width}`);assert.equal(await page.locator('.katex-error').count(),0,label);if(label==='written-student-interval draft'&&[390,768,1024].includes(width))await page.screenshot({path:`/tmp/quant-written-${width}.png`,fullPage:true});}await page.setViewportSize({width:390,height:844});}
 await widths('Quick setup');
 const legacy={id:'legacy-learning',questionId:'prob-001',at:'2026-10-01T12:00:00Z',selectedAnswer:1,correct:true};
 await page.evaluate(legacy=>localStorage.setItem('quantapp.attempts.v1',JSON.stringify([legacy])),legacy);await page.reload();
 await format('Guided Problems');await widths('Guided setup');
 for(let n=0;n<guidedProblems.length;n++){
  const p=guidedProblems[n];await button(p.title).click();await widths(p.id+' introduction');
  if(n===0)await button('Assessment').click();await button('Start problem').click();
  for(let i=0;i<p.parts.length;i++){
   await page.locator('section[aria-label="Guided problem"] h2.question').waitFor();
   assert.equal(await page.getByRole('region',{name:'Worked solution',exact:true}).count(),0);
   if(i===0){await page.locator('h1.question').focus();await page.keyboard.press('h');assert.equal(await page.locator('.hints strong').count(),1);assert.equal(await page.locator('.hints p').count(),1);await page.keyboard.press('f');assert.ok((await records(keys.flags)).some(f=>f.itemId===p.id));}
   const answer=page.locator(`.answer[data-answer-index="${p.parts[i].correctAnswer}"]`);const position=await answer.evaluate(el=>[...el.parentElement.children].indexOf(el));
   await page.locator('h1.question').focus();await page.keyboard.press(String(position+1));
   if(n===0&&i===0){await page.evaluate(()=>{document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',repeat:true,bubbles:true,cancelable:true}));document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'f',ctrlKey:true,bubbles:true,cancelable:true}));});assert.equal((await records(keys.guided))[0].responses.length,0);}
   await page.keyboard.press('Enter');
   await page.waitForFunction(key=>JSON.parse(localStorage.getItem(key)).records.at(-1).responses.length>0,keys.guided);
   assert.equal((await records(keys.guided)).find(a=>a.problemId===p.id).responses.length,i+1);
   assert.equal(await page.locator('.answer:disabled').count(),4);
   if(n===0)assert.equal(await page.locator('section[aria-label$="feedback"]').count(),0,'assessment feedback stays hidden');
   if(n===0&&i===0){await page.reload();await format('Guided Problems');await page.getByRole('button',{name:p.title+' · Resume / review',exact:true}).click();assert.equal(await page.locator('.answer:disabled').count(),4);assert.equal((await records(keys.guided)).length,1);}
   await page.locator('h1.question').focus();await page.keyboard.press('n');
  }
  await page.getByRole('heading',{name:'Problem summary',exact:true}).waitFor();await widths(p.id+' solution');
  assert.equal((await records(keys.guided)).filter(a=>a.problemId===p.id&&a.complete).length,1);assert.equal((await records(keys.schedules)).filter(s=>s.mode==='guided'&&s.itemId===p.id)[0].events.length,1);
  assert.equal(await page.getByRole('region',{name:'Worked solution',exact:true}).count(),1);
  await button('Back to problems').click();
 }
 assert.equal((await records(keys.guided)).length,6);
 await page.getByRole('group',{name:'Study filter',exact:true}).getByRole('button',{name:'Flagged',exact:true}).click();assert.equal(await page.locator('.reference-list').first().locator('li').count(),6);
 await page.getByRole('group',{name:'Study filter',exact:true}).getByRole('button',{name:'Due for Review',exact:true}).click();assert.equal(await page.locator('.reference-list').first().locator('li').count(),0);
 // Move the browser clock ahead without modifying persisted schedules.
 await page.clock.setFixedTime(new Date(Date.now()+10*86_400_000));await home();await page.reload();await format('Guided Problems');await page.getByRole('button',{name:'Due for Review',exact:true}).click();assert.equal(await page.locator('.reference-list').first().locator('li').count(),6);
 await format('Written Problems');await widths('Written setup');
 const answerText='My derivation $x^2$.\n$$x=2$$\n```python\ndef f(x):\n    return x + 1\n```\n```c++\nint x = 2;\n```\n```js\nconst f = () => 2;\n```\n```typescript\nconst x: number = 2;\n```\n```unknown\n<literal>\n```\n';
 for(let n=0;n<writtenProblems.length;n++){
  const p=writtenProblems[n];await button(p.title).click();assert.equal(await button('Reveal worked solution').isDisabled(),true);
  await page.locator('#written-answer').fill(answerText);
  const beforeFlags=(await records(keys.flags)).length;await page.keyboard.type('hf1234');assert.equal((await records(keys.flags)).length,beforeFlags);assert.equal(await page.locator('.hints p').count(),0,'typing does not reveal hints');
  await page.locator('h1.question').focus();await page.keyboard.press('h');await page.keyboard.press('f');
  await page.waitForSelector('.answer-preview .hljs-keyword');assert.equal(await page.locator('.answer-preview .code-block .katex').count(),0);assert.equal(await page.locator('.answer-preview .code-block').count(),5);
  await widths(p.id+' draft');
  if(n===0){await page.reload();await format('Written Problems');await button(p.title).click();assert.ok((await page.locator('#written-answer').inputValue()).includes('hf1234'));assert.equal(await page.getByRole('region',{name:'Worked solution',exact:true}).count(),0);assert.equal(await page.locator('.hints p').count(),1);}
  await button('Reveal worked solution').click();await widths(p.id+' solution');await button(n===0?'Partially Correct':'Correct').click();assert.equal((await records(keys.written)).filter(a=>a.problemId===p.id).length,1);
  if(n===0){await page.reload();await format('Written Problems');await button(p.title).click();assert.ok(await button('Correct').isDisabled());assert.equal(await page.getByRole('region',{name:'Worked solution',exact:true}).count(),1);}
  await button('Back to problems').click();
 }
 assert.equal((await records(keys.written)).length,6);
 // Explicit prerequisite practice opens the MCQ objective filter without altering history.
 await format('Guided Problems');await page.getByRole('button',{name:'Solving multiplicative Brownian noise · Resume / review',exact:true}).click();await page.getByText('Learning objectives and prerequisites',{exact:true}).click();await page.getByRole('button',{name:'Practise this foundation',exact:true}).first().click();await page.getByText('Filtered by learning objective.',{exact:false}).waitFor();await button('Clear objective filter').click();
 // Isolate a hinted Quick Practice item while keeping a legacy record verbatim.
 const q=questions.find(q=>q.id==='calc-003');await page.evaluate(({questions,legacy})=>localStorage.setItem('quantapp.attempts.v1',JSON.stringify([legacy,...questions.filter(q=>q.id!=='calc-003'&&q.id!==legacy.questionId).map(q=>({id:'seed-'+q.id,questionId:q.id,at:'2026-10-01T12:00:00Z',selectedAnswer:0,correct:true}))])),{questions,legacy});await page.reload();
 await page.getByRole('group',{name:'Mode',exact:true}).getByRole('button',{name:'Unseen Only',exact:true}).click();await button('Start').click();await page.locator('h1.question').focus();await page.keyboard.press('h');await page.keyboard.press('f');assert.equal(await page.locator('.hints p').count(),1);
 await widths('Quick question');await page.locator(`.answer[data-answer-index="${q.correctAnswer}"]`).click();await button('Submit').click();await widths('Quick feedback');const schedule=(await records(keys.schedules)).find(s=>s.mode==='quick'&&s.itemId===q.id);assert.equal(schedule.events[0].hints,1);assert.equal(schedule.successes,0);
 await page.locator('.related-concepts button').first().click();await widths('Reference reading');await button('Back to Quick Practice').click();assert.equal(await page.locator('.answer:disabled').count(),4);assert.equal(await page.locator('.hints p').count(),1,'revealed Quick hints survive Reference return');
 await page.keyboard.press('?');await page.getByRole('dialog',{name:'Keyboard shortcuts',exact:true}).waitFor();await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);
 await button('End session').click();await page.getByRole('navigation').getByRole('button',{name:'History',exact:true}).click();assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('quantapp.attempts.v1'))[0]),legacy);
 await button('Export progress').click();
 const backup=await page.evaluate(keys=>{const data={};for(const k of ['quantapp.attempts.v1',...Object.values(keys)])data[k]=JSON.parse(localStorage.getItem(k));return {format:'quantapp-backup',version:1,exportedAt:new Date().toISOString(),data};},keys);
 await page.locator('input[type=file]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.getByRole('heading',{name:'Review restoration',exact:true}).waitFor();await button('Confirm restoration').click();await page.getByText('Backup restored.',{exact:true}).waitFor();
 assert.equal((await records(keys.written)).length,6);
 // Replacement requires an explicit confirmation; cancelling preserves data.
 await page.locator('input[type=file]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.locator('select').filter({has:page.locator('option[value=replace]')}).selectOption('replace');page.once('dialog',d=>d.dismiss());await button('Confirm restoration').click();assert.equal((await records(keys.written)).length,6);await button('Cancel import').click();
 await page.locator('input[type=file]').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":99}')});await page.getByText('Invalid or unsupported backup. No data was changed.',{exact:true}).waitFor();
 // Cache all lazy code before first use: a fresh offline tab can launch both new formats.
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await context.setOffline(true);await page.reload();await format('Written Problems');await button(writtenProblems[0].title).click();await page.waitForSelector('.answer-preview .hljs-keyword');await button('Back to problems').click();await format('Guided Problems');await page.getByRole('button',{name:guidedProblems[0].title+' · Resume / review',exact:true}).click();await page.getByRole('heading',{name:'Problem summary',exact:true}).waitFor();await widths('Offline guided summary');
 // First offline use of previously unopened lazy modes in a clean profile.
 const fresh=await browser.newContext({viewport:{width:768,height:1024}});const offline=await fresh.newPage();
 await offline.goto(server.resolvedUrls.local[0]);await offline.evaluate(()=>navigator.serviceWorker.ready);await offline.reload();await fresh.setOffline(true);await offline.reload();
 await offline.getByRole('button',{name:'Guided Problems',exact:true}).click();await offline.getByRole('button',{name:guidedProblems[0].title,exact:true}).click();await offline.getByRole('button',{name:'Start problem',exact:true}).click();await offline.locator('.answer').first().click();await offline.getByRole('button',{name:'Submit',exact:true}).click();await offline.getByRole('button',{name:'Back to problems',exact:true}).click();
 await offline.getByRole('button',{name:'Written Problems',exact:true}).click();await offline.getByRole('button',{name:writtenProblems[0].title,exact:true}).click();await offline.locator('#written-answer').fill('Offline $x^2$\n```py\ndef f():\n    return 2\n```');await offline.waitForSelector('.hljs-keyword');await offline.getByRole('button',{name:'Reveal worked solution',exact:true}).click();await offline.getByRole('button',{name:'Not Sure',exact:true}).click();await fresh.close();
 // Detectable quota failures keep typed work on screen and surface a warning.
 const failing=await browser.newContext();const failed=await failing.newPage();await failed.goto(server.resolvedUrls.local[0]);await failed.getByRole('button',{name:'Written Problems',exact:true}).click();await failed.getByRole('button',{name:writtenProblems[0].title,exact:true}).click();
 await failed.evaluate(()=>{Storage.prototype.setItem=function(){throw new DOMException('Quota','QuotaExceededError');};});await failed.locator('#written-answer').fill('Keep this answer on screen');await failed.getByRole('alert').waitFor();assert.equal(await failed.locator('#written-answer').inputValue(),'Keep this answer on screen');await failing.close();
 // A browser can deny access to the storage property itself, before getItem executes.
 const denied=await browser.newContext();await denied.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError');}}));const blocked=await denied.newPage();const blockedErrors=[];blocked.on('pageerror',e=>blockedErrors.push(e.message));await blocked.goto(server.resolvedUrls.local[0]);await blocked.getByRole('button',{name:'Written Problems',exact:true}).click();await blocked.getByRole('button',{name:writtenProblems[0].title,exact:true}).click();await blocked.locator('#written-answer').fill('Work without available storage');await blocked.getByRole('alert').waitFor();assert.equal(await blocked.locator('#written-answer').inputValue(),'Work without available storage');assert.deepEqual(blockedErrors,[]);await denied.close();

 // Retry starts a separate attempt and resumes it rather than reopening the older completion.
 const beforeRetry=(await records(keys.guided)).length;await button('Try again').click();assert.equal((await records(keys.guided)).length,beforeRetry+1);assert.equal(await page.locator('.answer:disabled').count(),0);await page.reload();await format('Guided Problems');await page.getByRole('button',{name:guidedProblems[0].title+' · Resume / review',exact:true}).click();assert.equal(await page.locator('.answer:disabled').count(),0);assert.equal(await page.locator('.hints p').count(),0);
 await button('Back to problems').click();await format('Written Problems');await button(writtenProblems[0].title).click();await button('Start a fresh answer').click();assert.equal(await page.locator('#written-answer').inputValue(),'');assert.equal(await button('Reveal worked solution').isDisabled(),true);assert.equal((await records(keys.written)).length,6);
 await button('Unflag').click();assert.ok(!(await records(keys.flags)).some(f=>f.mode==='written'&&f.itemId===writtenProblems[0].id));await page.reload();assert.ok(!(await records(keys.flags)).some(f=>f.mode==='written'&&f.itemId===writtenProblems[0].id));
 assert.deepEqual(errors,[]);console.log('PASS: all 6 Guided (23 parts) and 6 Written flows, assessment/learning feedback, resume/reload/retry, hints, flag/unflag, due review, prerequisite practice, keyboard/editing guards, highlighting, backup merge/replacement confirmation, storage failure, first-use offline and five viewport widths.');
 await context.close();
} finally {await browser?.close();server.httpServer.closeAllConnections();await new Promise(done=>server.httpServer.close(done));}
