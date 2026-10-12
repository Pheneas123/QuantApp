// Real production Finance controls and persistence, using an isolated browser context.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';
import finance from '../src/features/quick-practice/data/bank/finance/index.ts';
import { curriculum } from '../src/data/curriculum.ts';
import { STORAGE_KEY } from '../src/features/quick-practice/progress.ts';

const server = await preview({ logLevel: 'silent', preview: { host: '127.0.0.1', port: 4189 } });
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.PWA_CHROMIUM || undefined,
    args: process.env.PWA_NO_SANDBOX === '1' ? ['--no-sandbox'] : [] });
  const context = await browser.newContext({ viewport: { width: 320, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(server.resolvedUrls.local[0]);
  const legacy = [{ id: 'pre-finance', questionId: 'prob-001', at: '2026-10-01T12:00:00Z', selectedAnswer: 1, correct: true }];
  await page.evaluate(({ key, legacy }) => localStorage.setItem(key, JSON.stringify(legacy)), { key: STORAGE_KEY, legacy });
  await page.reload();
  const chooseFinance = () => page.getByRole('button', { name: 'Finance 100 questions', exact: true }).click();
  const topic = page.getByRole('combobox', { name: 'Subcategory' });
  const session = page.getByRole('group', { name: 'Session', exact: true });
  const mode = page.getByRole('group', { name: 'Mode', exact: true });
  const start = page.getByRole('button', { name: 'Start', exact: true });
  const history = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
  await chooseFinance();
  assert.deepEqual(await topic.locator('option').allTextContents(), ['All subcategories', ...curriculum.Finance]);
  await session.getByRole('button', { name: 'All', exact: true }).click();
  for (const subcategory of curriculum.Finance) {
    await topic.selectOption(subcategory);
    for (const difficulty of ['Easy', 'Medium', 'Hard']) {
      const count=finance.filter(q=>q.subcategory===subcategory&&q.difficulty===difficulty.toLowerCase()).length;
      await page.getByRole('button', { name: difficulty, exact: true }).click();
      await page.getByText(count?`${count} available · session: ${count}`:'No questions match these filters.', { exact: true }).waitFor();
      assert.equal(await start.isDisabled(), count===0);
    }
  }
  await topic.selectOption('Financial markets and instruments');
  await page.getByRole('button', { name: 'Easy', exact: true }).click();
  await start.click();
  for (const result of ['correct', 'incorrect', 'unsure']) {
    const prompt = await page.locator('.question').innerText();
    const q = finance.find(q => q.prompt === prompt);
    assert.ok(q, prompt);
    const order = await page.locator('.answer > span:nth-child(2)').allTextContents();
    if (result === 'unsure') {
      await page.getByRole('button', { name: 'Not sure', exact: true }).click();
    } else {
      const selected = result === 'correct' ? q.correctAnswer : (q.correctAnswer + 1) % 4;
      await page.locator('.answer').filter({ has: page.getByText(q.answers[selected], { exact: true }) }).click();
      assert.deepEqual(await page.locator('.answer > span:nth-child(2)').allTextContents(), order);
      await page.getByRole('button', { name: 'Submit', exact: true }).click();
    }
    assert.equal((await history()).at(-1).result, result);
    assert.equal((await history()).at(-1).questionId, q.id);
    assert.equal(await page.locator('.answer.is-correct').count(), 1);
    assert.equal(await page.locator('.explanation').count(), 1);
    assert.equal(await page.locator('.katex-error').count(), 0);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  }
  assert.deepEqual(await page.locator('.session-summary dd').allTextContents(), ['3', '1', '1', '1', '50%']);
  await page.getByRole('button', { name: 'Back to Home' }).click();
  for (const [label, available] of [['Review Incorrect', 1], ['Review Unsure', 1]]) {
    await mode.getByRole('button', { name: label, exact: true }).click();
    await page.getByText(`${available} available · session: ${available}`, { exact: true }).waitFor();
  }
  await mode.getByRole('button', { name: 'Unseen Only', exact: true }).click();
  assert.equal(await start.isDisabled(), true);
  await page.getByRole('button', { name: 'Statistics 50 questions', exact: true }).click();
  assert.equal(await topic.inputValue(), 'All');
  const saved = await history();
  assert.deepEqual(saved.slice(0, 1), legacy);
  await page.reload();
  assert.deepEqual(await history(), saved);

  // Verify the new category and maths work from the production service-worker cache.
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  await page.reload();
  assert.equal(await page.evaluate(() => !!navigator.serviceWorker.controller), true);
  await context.setOffline(true);
  await page.reload();
  await chooseFinance();
  await topic.selectOption('Quantitative pricing and numerical finance');
  await page.getByRole('button', { name: 'Hard', exact: true }).click();
  await start.click();
  await page.getByRole('button', { name: 'Not sure', exact: true }).click();
  assert.equal(await page.locator('.katex-error').count(), 0);
  assert.ok(await page.locator('.explanation .katex').count() > 0);
  assert.equal((await history()).length, saved.length + 1);
  await page.reload();
  assert.equal((await history()).length, saved.length + 1);
  await page.getByRole('navigation').getByRole('button', { name: 'History', exact: true }).click();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Reset progress', exact: true }).click();
  assert.equal(await history(), null);
  await page.getByRole('navigation').getByRole('button', { name: 'Practice', exact: true }).click();
  await chooseFinance();
  await mode.getByRole('button', { name: 'Unseen Only', exact: true }).click();
  await page.getByText('100 available · session: 25', { exact: true }).waitFor();
  assert.deepEqual(errors, []);
  console.log('PASS: all Finance filters, shuffled canonical grading, outcomes, explanations, legacy history, reload, offline maths/attempts and reset.');
} finally {
  await browser?.close();
  server.httpServer.closeAllConnections();
  await new Promise(done => server.httpServer.close(done));
}
