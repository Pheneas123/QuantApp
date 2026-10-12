// A strict static server deliberately provides no SPA rewrites.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { chromium } from 'playwright';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { guidedProblems, writtenProblems } from '../src/features/learning/data/index.ts';
import { keys } from '../src/features/learning/storage.ts';

const root=resolve('dist');
const manifest=JSON.parse(await readFile(resolve(root,'manifest.webmanifest'),'utf8'));
const base=manifest.scope;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf'};
const server=createServer(async(req,res)=>{
 try{
  const path=new URL(req.url,'http://localhost').pathname;
  if(!path.startsWith(base)){res.writeHead(404).end();return;}
  const file=resolve(root,decodeURIComponent(path.slice(base.length))||'index.html');
  if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  if(!(await stat(file)).isFile()){res.writeHead(404).end();return;}
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'}).end(await readFile(file));
 }catch{res.writeHead(404).end();}
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const origin=`http://127.0.0.1:${server.address().port}`,entry=origin+base;
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.PWA_CHROMIUM||undefined,args:process.env.PWA_NO_SANDBOX==='1'?['--no-sandbox']:[]});
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[],failed=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 const button=name=>page.getByRole('button',{name,exact:true}),brand=()=>button('QuantPocket home');
 const format=name=>page.getByRole('group',{name:'Practice format',exact:true}).getByRole('button',{name,exact:true}).click();
 const records=key=>page.evaluate(key=>JSON.parse(localStorage.getItem(key))?.records??[],key);
 const snapshot=()=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith('quant-pocket.')).sort().map(k=>[k,localStorage.getItem(k)])));
 async function home(before,activation='click'){
  assert.equal(await brand().evaluate(el=>el.tagName),'BUTTON');assert.equal(await brand().evaluate(el=>el.tabIndex),0);
  if(activation==='icon')await page.locator('.brand-icon').click();
  else if(activation==='click')await brand().click();
  else{await brand().focus();await page.keyboard.press(activation);}
  await page.getByRole('heading',{name:'Progress',exact:true}).waitFor();
  assert.equal(await page.getByRole('button',{name:'Quick Practice',exact:true}).getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('section[aria-label="Guided problem"],section[aria-label="Written problem"]').count(),0);
  assert.equal(new URL(page.url()).pathname,base);assert.deepEqual(await snapshot(),before,'Home must not mutate progress');
  for(const width of [320,390,768,1024]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 }
 assert.equal((await page.goto(entry)).status(),200);await page.getByRole('heading',{name:'Progress',exact:true}).waitFor();
 assert.equal(await page.locator('.brand').getAttribute('class'),'brand');
 const legacy={id:'legacy-pages',questionId:'prob-001',selectedAnswer:1,correct:true,at:'2026-10-01T12:00:00Z'};
 const seeded=[legacy,...questions.filter(q=>q.id!=='prob-001'&&q.id!=='calc-003').map(q=>({id:'seed-'+q.id,questionId:q.id,selectedAnswer:q.correctAnswer,correct:true,at:'2026-10-01T12:00:00Z'}))];
 await page.evaluate(attempts=>localStorage.setItem('quant-pocket.attempts.v1',JSON.stringify(attempts)),seeded);await page.reload();
 await button('Unseen Only').click();await button('Start').click();await button('Reveal next hint (0/2)').click();await button('Flag for later').click();await page.locator('.answer').first().click();await button('Submit').click();
 assert.equal((await records(keys.schedules)).length,1);await home(await snapshot(),'icon');
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('quant-pocket.attempts.v1'))[0]),legacy);

 const gp=guidedProblems[0];await format('Guided Problems');await button(gp.title).click();await home(await snapshot()); // Introduction also exits.
 await format('Guided Problems');await button(gp.title).click();await button('Start problem').click();
 await page.locator(`.answer[data-answer-index="${gp.parts[0].correctAnswer}"]`).click();await button('Flag for later').click();
 const selected=(await records(keys.active))[0];assert.equal(selected.selectedAnswer,gp.parts[0].correctAnswer);await home(await snapshot(),'Enter');
 await format('Guided Problems');await button(gp.title+' · Resume / review').click();assert.deepEqual((await records(keys.active))[0],selected);assert.equal(await page.locator('.answer.is-selected').getAttribute('data-answer-index'),String(gp.parts[0].correctAnswer));
 await button('Submit').click();const submitted=(await records(keys.active))[0];assert.equal(submitted.responses.length,1);await home(await snapshot(),'Space');
 await format('Guided Problems');await button(gp.title+' · Resume / review').click();assert.deepEqual((await records(keys.active))[0],submitted);assert.equal(await page.locator('.answer:disabled').count(),4);
 await page.getByRole('navigation').getByRole('button',{name:'Reference',exact:true}).click();await page.locator('.reference').waitFor();await home(await snapshot());
 // The shared Practice navigation also exits an active child view.
 await format('Guided Problems');await button(gp.title+' · Resume / review').click();const beforePractice=await snapshot();await page.getByRole('navigation').getByRole('button',{name:'Practice',exact:true}).click();await page.getByRole('heading',{name:'Progress',exact:true}).waitFor();assert.deepEqual(await snapshot(),beforePractice);

 const wp=writtenProblems[0],answer='Retained working $x^2$.\n```python\ndef f(x):\n    return x + 1\n```';
 await format('Written Problems');await button(wp.title).click();await page.locator('#written-answer').fill(answer);await button('Flag for later').click();
 const draft=(await records(keys.drafts))[0];assert.equal(draft.answer,answer);await home(await snapshot(),'Enter');
 await format('Written Problems');await button(wp.title).click();assert.equal(await page.locator('#written-answer').inputValue(),answer);assert.deepEqual((await records(keys.drafts))[0],draft);
 await page.reload();assert.equal(new URL(page.url()).pathname,base);await page.getByRole('heading',{name:'Progress',exact:true}).waitFor();
 await format('Written Problems');await button(wp.title).click();assert.equal(await page.locator('#written-answer').inputValue(),answer);
 await button('Reveal worked solution').click();await home(await snapshot(),'Space');
 await format('Written Problems');await button(wp.title).click();await button('Partially Correct').click();assert.equal((await records(keys.written)).length,1);assert.equal((await records(keys.schedules)).length,2);await home(await snapshot());
 await page.getByRole('navigation').getByRole('button',{name:'History',exact:true}).click();await home(await snapshot(),'Enter');
 await page.getByRole('navigation').getByRole('button',{name:'Reference',exact:true}).click();await home(await snapshot(),'Space');
 const persisted=await snapshot();await page.goto('about:blank');assert.equal((await page.goto(entry+'#reload-check')).status(),200);await page.getByRole('heading',{name:'Progress',exact:true}).waitFor();assert.deepEqual(await snapshot(),persisted);
 assert.equal((await page.reload()).status(),200);assert.deepEqual(await snapshot(),persisted);

 await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();assert.ok(await page.evaluate(()=>!!navigator.serviceWorker.controller));
 const registration=await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();return {scope:r.scope,script:r.active.scriptURL};});assert.equal(registration.scope,entry);assert.equal(registration.script,entry+'sw.js');
 for(const icon of manifest.icons)assert.equal((await context.request.get(origin+icon.src)).status(),200);
 if(base!=='/')assert.equal((await context.request.get(origin+'/icon-192.png')).status(),404,'root paths must not be used by a repository build');
 await context.setOffline(true);assert.equal((await page.reload()).status(),200);await page.getByRole('heading',{name:'Progress',exact:true}).waitFor();assert.deepEqual(await snapshot(),persisted);
 await format('Guided Problems');await button(gp.title+' · Resume / review').click();assert.equal(await page.locator('.answer:disabled').count(),4);await home(await snapshot());
 await format('Written Problems');await button(wp.title).click();assert.equal(await page.locator('#written-answer').inputValue(),answer);await home(await snapshot(),'Enter');
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 console.log(`PASS: strict static hosting at ${base}, base-scoped assets/SW/offline, mouse/icon/Enter/Space home from Quick/Guided/Written/History/Reference, saved answers/drafts/flags/schedules, direct entry and reload.`);
}finally{await browser?.close();server.closeAllConnections();await new Promise(done=>server.close(done));}
