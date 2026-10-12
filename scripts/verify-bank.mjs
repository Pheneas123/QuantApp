// Render every bank entry in the real production quiz, including submitted feedback.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { questions } from '../src/features/quick-practice/data/questions.ts';

const server = await preview({ logLevel: 'silent', preview: { host: '127.0.0.1', port: 4187 } });
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.PWA_CHROMIUM || undefined,
    args: process.env.PWA_NO_SANDBOX === '1' ? ['--no-sandbox'] : [] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const errors = [], overflow = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(server.resolvedUrls.local[0]);
  await page.getByRole('group', { name: 'Session', exact: true }).getByRole('button', { name: 'All', exact: true }).click();
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  for (let n=0;n<questions.length;n++) {
    for (const width of [390,320]) {
      await page.setViewportSize({ width, height: 844 });
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth+1)) overflow.push({ n, width, phase: 'selection' });
    }
    await page.locator('.answer').first().click();
    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth+1)) overflow.push({ n, width:320, phase:'feedback' });
    assert.equal(await page.locator('.katex-error').count(), 0);
    try { await page.getByRole('button', { name: 'Next', exact: true }).click(); } catch (error) {
      console.error('Bank failure at',n,await page.evaluate(()=>JSON.parse(localStorage.getItem('quant-pocket.attempts.v1')).at(-1).questionId));
      console.error(await page.getByRole('button',{name:'Next',exact:true}).evaluate(el=>{const r=el.getBoundingClientRect();return {rect:r.toJSON(),scroll:scrollY,hit:document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.outerHTML.slice(0,300)};}));
      await page.screenshot({path:'/tmp/quant-bank-failure.png',fullPage:true});throw error;
    }
  }
  const attempts = await page.evaluate(() => JSON.parse(localStorage.getItem('quant-pocket.attempts.v1')));
  const problems=overflow.map(entry=>({...entry,id:attempts[entry.n].questionId}));
  assert.deepEqual(problems, [], JSON.stringify(problems));
  assert.equal(new Set(attempts.map(a=>a.questionId)).size, questions.length);
  assert.equal(await page.locator('.session-summary dd').first().innerText(), String(questions.length));
  assert.deepEqual(errors, []);
  console.log('PASS: entire bank rendered and submitted at 390px/320px without page overflow or KaTeX errors.');
} finally {
  await browser?.close();
  server.httpServer.closeAllConnections();
  await new Promise(done => server.httpServer.close(done));
}
