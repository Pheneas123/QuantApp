import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { questions } from '../src/features/quick-practice/data/questions.ts';
const total = questions.length;
const server=await preview({logLevel:'silent',preview:{host:'127.0.0.1',port:4188}});
let browser;
try {
  browser=await chromium.launch({headless:true,executablePath:process.env.PWA_CHROMIUM||undefined,args:process.env.PWA_NO_SANDBOX==='1'?['--no-sandbox']:[]});
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  const key='quant-pocket.attempts.v1';
  const legacy=[
    {id:'old1',at:'2026-10-06T10:00:00Z',questionId:'calc-001',selectedAnswer:0,correct:true},
    {id:'old2',at:'2026-10-06T11:00:00Z',questionId:'calc-002',selectedAnswer:0,correct:false},
  ];
  await page.goto(server.resolvedUrls.local[0]);
  await page.evaluate(({key,legacy})=>localStorage.setItem(key,JSON.stringify(legacy)),{key,legacy});
  await page.reload();
  await page.getByRole('button',{name:'Probability 50 questions',exact:true}).click();
  await page.getByRole('combobox',{name:'Subcategory'}).selectOption('Conditional expectation');
  await page.getByRole('button',{name:'Easy',exact:true}).click();
  const history=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
  for(const [i,result] of ['correct','incorrect','unsure'].entries()){
    await page.getByRole('button',{name:'Start',exact:true}).click();
    assert.equal(await page.locator('.explanation').count(),0);
    if(result==='unsure'){
      // U must ignore text input and repeated keys.
      await page.evaluate(()=>{const input=document.createElement('input');document.body.append(input);input.focus();});
      await page.keyboard.press('u');
      assert.equal((await history()).length,4);
      await page.evaluate(()=>document.querySelector('input').remove());
      await page.locator('.question').focus();
      await page.keyboard.press('1');
      await page.keyboard.press('u');
      await page.keyboard.press('u');
      await page.keyboard.press('2');
    } else {
      await page.locator('.answer').filter({has:page.getByText(result==='correct'?'1 and 5.':'2 and 10.',{exact:true})}).click();
      await page.keyboard.press('Enter');
    }
    await page.locator('.explanation .katex').first().waitFor();
    assert.equal(await page.locator('.katex-error').count(),0);
    assert.equal(await page.locator('.feedback strong').innerText(),result==='unsure'?'Not sure':result==='correct'?'Correct':'Incorrect');
    assert.equal(await page.locator('.answer:disabled').count(),4);
    assert.equal(await page.locator('.answer.is-correct').count(),1);
    if(result!=='correct') assert.match(await page.locator('.feedback').innerText(),/Correct answer: [ABCD]/);
    if(result==='unsure'){
      assert.equal(await page.locator('.answer.is-selected, .answer.is-wrong').count(),0);
      assert.ok(!('selectedAnswer' in (await history()).at(-1)));
    }
    assert.equal((await history()).length,3+i);
    assert.equal((await history()).at(-1).result,result);
    await page.keyboard.press('Enter');
    await page.getByRole('heading',{name:'Session complete'}).waitFor();
    if(result==='unsure') assert.deepEqual(await page.locator('.session-summary dd').allTextContents(),['1','0','0','1','0%']);
    await page.getByRole('button',{name:'Back to Home'}).click();
  }
  assert.deepEqual(await page.locator('.stats dd').allTextContents(),['1','1','1',String(total - 3),'50%']);
  assert.deepEqual((await history()).slice(0,2),legacy);
  await page.getByRole('group',{name:'Mode',exact:true}).getByRole('button',{name:'Review Unsure'}).click();
  await page.getByText('1 available · session: 1',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Start',exact:true}).click();
  await page.getByRole('button',{name:'Not sure',exact:true}).click();
  assert.equal((await history()).length,6);
  await page.getByRole('button',{name:'Next',exact:true}).click();
  await page.getByRole('button',{name:'Back to Home'}).click();
  await page.getByRole('button',{name:'History',exact:true}).click();
  assert.equal(await page.locator('.history li').filter({hasText:'Not sure'}).count(),2);
  await page.reload();
  assert.deepEqual(await page.locator('.stats dd').allTextContents(),['1','1','1',String(total - 3),'50%']);
  await page.getByRole('button',{name:'History',exact:true}).click();
  page.once('dialog',dialog=>dialog.accept());
  await page.getByRole('button',{name:'Reset progress'}).click();
  assert.equal(await history(),null);
  await page.getByRole('navigation').getByRole('button',{name:'Practice',exact:true}).click();
  assert.deepEqual(await page.locator('.stats dd').allTextContents(),['0','0','0',String(total),'0%']);
  assert.deepEqual(errors,[]);
  console.log('PASS: correct/incorrect/unsure feedback and math, keyboard guards, summary, review, legacy history, reload and reset.');
} finally {
  await browser?.close();
  server.httpServer.closeAllConnections();
  await new Promise(done=>server.httpServer.close(done));
}
