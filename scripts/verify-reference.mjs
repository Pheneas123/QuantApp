import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { knowledge } from '../src/data/knowledge/index.ts';

const server = await preview({ logLevel: 'silent', preview: { host: '127.0.0.1', port: 4189 } });
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.PWA_CHROMIUM || undefined,
    args: process.env.PWA_NO_SANDBOX === '1' ? ['--no-sandbox'] : [] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(server.resolvedUrls.local[0]);
  await page.evaluate(ids => localStorage.setItem('quant-pocket.attempts.v1', JSON.stringify(ids.map((questionId, i) => ({ id: `seed-${i}`, questionId, correct: true, selectedAnswer: 0, at: new Date().toISOString() })))), questions.filter(q => q.id !== 'calc-002').map(q => q.id));
  await page.reload();
  await page.getByRole('button', { name: 'Unseen Only', exact: true }).click();
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await page.getByRole('button', { name: 'Stochastic Calculus 50 questions', exact: true }).click();
  await page.getByLabel('Subcategory', { exact: true }).selectOption('Quadratic variation');
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  assert.equal(await nav.getByRole('button', { name: 'Reference' }).isDisabled(), true);
  assert.equal(await page.getByRole('region', { name: 'Related concepts' }).count(), 0);
  const answers = await page.locator('.answer').allTextContents();
  const question = await page.locator('.question').innerText();
  await page.getByRole('button', { name: 'Not sure', exact: true }).click();
  const saved = await page.evaluate(() => localStorage.getItem('quant-pocket.attempts.v1'));
  const variation = knowledge.find(k => k.id === 'def-quadratic-variation');
  await page.getByRole('button', { name: variation.name, exact: true }).click();
  await page.getByRole('heading', { name: variation.name, exact: true }).waitFor();
  await page.keyboard.press('u');
  await page.keyboard.press('Enter');
  const brownian = knowledge.find(k => k.id === 'def-brownian-motion');
  await page.getByRole('button', { name: brownian.name, exact: true }).click();
  await page.getByRole('heading', { name: brownian.name, exact: true }).waitFor();
  await page.getByRole('button', { name: 'Back to previous concept' }).click();
  await page.getByRole('button', { name: 'Back to Quick Practice' }).click();
  assert.equal(await page.locator('.question').innerText(), question);
  // Feedback labels may be appended after submission; answer order must not change.
  const returned = await page.locator('.answer').allTextContents();
  answers.forEach((answer, i) => assert.ok(returned[i].includes(answer)));
  assert.equal(await page.locator('.answer:disabled').count(), 4);
  assert.equal(await page.evaluate(() => localStorage.getItem('quant-pocket.attempts.v1')), saved);
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('heading', { name: 'Session complete', exact: true }).waitFor();
  await nav.getByRole('button', { name: 'Reference', exact: true }).click();
  await page.getByLabel('Category', { exact: true }).selectOption('Stochastic Processes');
  await page.getByLabel('Subcategory', { exact: true }).selectOption('Stopping times');
  await page.getByLabel('Type', { exact: true }).selectOption('definition');
  assert.equal(await page.locator('.reference-list li').count(), 2);
  await page.getByLabel('Type', { exact: true }).selectOption('corollary');
  await page.getByText('No references match these filters.', { exact: true }).waitFor();
  await page.getByLabel('Category', { exact: true }).selectOption('Statistics');
  assert.equal(await page.getByLabel('Subcategory', { exact: true }).inputValue(), 'All');
  await page.getByLabel('Category', { exact: true }).selectOption('All');
  await page.getByLabel('Type', { exact: true }).selectOption('All');
  for (const entry of knowledge) {
    await page.getByRole('button', { name: entry.name, exact: true }).click();
    await page.getByRole('heading', { name: entry.name, exact: true }).waitFor();
    if ([entry.statement, entry.assumptions, entry.conclusion, entry.intuition, entry.notation].some(text => text?.includes('$'))) {
      assert.ok(await page.locator('.katex').count(), entry.id);
    }
    assert.equal(await page.locator('.katex-error').count(), 0, entry.id);
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${entry.id} at ${width}px`);
    }
    await page.getByRole('button', { name: 'Reference list', exact: true }).click();
  }
  assert.deepEqual(errors, []);
  console.log(`PASS: reference filters, all ${knowledge.length} entries/LaTeX at 320px and 390px, and quiz/reference round trip without extra attempts or reshuffling.`);
} finally {
  await browser?.close();
  server.httpServer.closeAllConnections();
  await new Promise(done => server.httpServer.close(done));
}
