import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { availableSubcategories } from '../src/features/quick-practice/sessionSetup.ts';
const total = questions.length;
const count = category => questions.filter(q => q.category === category).length;

const server = await preview({ logLevel: 'silent', preview: { host: '127.0.0.1', port: 4186 } });
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.PWA_CHROMIUM || undefined,
    args: process.env.PWA_NO_SANDBOX === '1' ? ['--no-sandbox'] : [] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(server.resolvedUrls.local[0]);
  const mode = page.getByRole('group', { name: 'Mode', exact: true });
  const session = page.getByRole('group', { name: 'Session', exact: true });
  const start = page.getByRole('button', { name: 'Start', exact: true });
  const subcategory = page.getByRole('combobox', { name: 'Subcategory' });
  assert.equal(await subcategory.count(), 0);
  assert.equal(await session.getByRole('button', { name: '25', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.getByText(`${total} available · session: 25`, { exact: true }).waitFor();
  for (const [size, count] of [['10', 10], ['25', 25], ['50', Math.min(50, total)], ['All', total]]) {
    await session.getByRole('button', { name: size, exact: true }).click();
    await start.click();
    assert.match(await page.locator('.quiz-top').innerText(), new RegExp(`1 / ${count}$`));
    await page.getByRole('button', { name: 'End session' }).click();
  }
  await page.getByRole('button', { name: `Stochastic Calculus ${count('Stochastic Calculus')} questions` }).click();
  assert.deepEqual(await subcategory.locator('option').allTextContents(), ['All subcategories', ...availableSubcategories(questions, 'Stochastic Calculus')]);
  await subcategory.selectOption('Brownian motion properties');
  await page.getByRole('button', { name: 'Hard', exact: true }).click();
  await page.getByText('No questions match these filters.', { exact: true }).waitFor();
  assert.equal(await start.isDisabled(), true);
  await page.getByRole('button', { name: `Statistics ${count('Statistics')} questions` }).click();
  assert.equal(await subcategory.inputValue(), 'All');
  const hardStats = questions.filter(q => q.category === 'Statistics' && q.difficulty === 'hard').length;
  await page.getByText(`${hardStats} available · session: ${hardStats}`, { exact: true }).waitFor();
  await page.getByRole('button', { name: `All Questions ${total} questions` }).click();
  assert.equal(await subcategory.count(), 0);

  // Existing-format records: latest status wins, and preferences never write history.
  const legacy = [
    { id: 'old-1', questionId: 'calc-002', selectedAnswer: 0, correct: false, at: '2026-10-06T10:00:00Z' },
    { id: 'old-2', questionId: 'calc-002', selectedAnswer: 0, correct: true, at: '2026-10-06T11:00:00Z' },
    { id: 'old-3', questionId: 'calc-004', selectedAnswer: 0, correct: false, at: '2026-10-06T12:00:00Z' },
  ];
  await page.evaluate(history => localStorage.setItem('quant-pocket.attempts.v1', JSON.stringify(history)), legacy);
  await page.reload();
  await page.getByRole('button', { name: `Stochastic Calculus ${count('Stochastic Calculus')} questions` }).click();
  await subcategory.selectOption('Brownian motion properties');
  await page.getByRole('button', { name: 'Easy', exact: true }).click();
  await page.getByText('2 available · session: 2', { exact: true }).waitFor();
  for (const [label, expected] of [['Review Incorrect', '1.3'], ['Unseen Only', 'distribution']]) {
    await mode.getByRole('button', { name: label, exact: true }).click();
    await page.getByText('1 available · session: 1', { exact: true }).waitFor();
    await start.click();
    assert.ok((await page.locator('.question').innerText()).includes(expected));
    await page.getByRole('button', { name: 'End session' }).click();
  }
  await page.getByRole('button', { name: `Statistics ${count('Statistics')} questions` }).click();
  assert.equal(await mode.getByRole('button', { name: 'Unseen Only' }).getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: `All Questions ${total} questions` }).click();
  await page.getByRole('button', { name: 'Mixed', exact: true }).click();
  await mode.getByRole('button', { name: 'Practice', exact: true }).click();
  await session.getByRole('button', { name: '10', exact: true }).click();
  const readHistory = () => page.evaluate(() => JSON.parse(localStorage.getItem('quant-pocket.attempts.v1')));
  assert.deepEqual(await readHistory(), legacy);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await start.click();
  const prompts = new Set();
  for (let index = 0; index < 10; index++) {
    const prompt = await page.locator('.question').innerText();
    assert.ok(!prompts.has(prompt));
    prompts.add(prompt);
    const order = await page.locator('.answer > span:nth-child(2)').allTextContents();
    await page.locator('.answer').first().click();
    await page.locator('.answer').nth(1).click();
    assert.deepEqual(await page.locator('.answer > span:nth-child(2)').allTextContents(), order);
    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  }
  assert.equal(await page.locator('.session-summary dd').first().innerText(), '10');
  assert.equal((await readHistory()).length, 13);
  assert.deepEqual((await readHistory()).slice(0, 3), legacy);
  await page.getByRole('button', { name: 'Practice Again', exact: true }).click();
  assert.match(await page.locator('.quiz-top').innerText(), /1 \/ 10$/);
  await page.getByRole('button', { name: 'End session' }).click();
  assert.equal(await session.getByRole('button', { name: '10', exact: true }).getAttribute('aria-pressed'), 'true');
  // Reset is explicit, scoped to attempts, and reflected immediately.
  await page.getByRole('button', { name: 'History', exact: true }).click();
  const reset = page.getByRole('button', { name: 'Reset progress', exact: true });
  const beforeReset = await readHistory();
  await page.evaluate(() => localStorage.setItem('unrelated-preference', 'keep'));
  page.once('dialog', async dialog => {
    assert.match(dialog.message(), /correct\/incorrect\/unseen/);
    await dialog.dismiss();
  });
  await reset.click();
  assert.deepEqual(await readHistory(), beforeReset);

  // A failed deletion must not clear in-memory history or claim success.
  await page.evaluate(() => {
    window.savedRemoveItem = Storage.prototype.removeItem;
    Storage.prototype.removeItem = () => { throw new Error('blocked storage'); };
  });
  page.once('dialog', dialog => dialog.accept());
  await reset.click();
  await page.getByRole('alert').filter({ hasText: 'could not be reset' }).waitFor();
  assert.deepEqual(await readHistory(), beforeReset);
  assert.equal(await page.locator('.history li').count(), beforeReset.length);
  await page.evaluate(() => { Storage.prototype.removeItem = window.savedRemoveItem; });
  page.once('dialog', dialog => dialog.accept());
  await reset.click();
  await page.getByText('No attempts recorded.', { exact: true }).waitFor();
  assert.equal(await readHistory(), null);
  assert.equal(await page.evaluate(() => localStorage.getItem('unrelated-preference')), 'keep');
  await page.getByRole('button', { name: 'Practice', exact: true }).last().click();
  assert.deepEqual(await page.locator('.stats dd').allTextContents(), ['0', '0', '0', String(total), '0%']);
  await mode.getByRole('button', { name: 'Unseen Only' }).click();
  await page.getByText(`${total} available · session: 10`, { exact: true }).waitFor();
  await mode.getByRole('button', { name: 'Review Incorrect' }).click();
  assert.equal(await start.isDisabled(), true);
  await page.reload();
  assert.deepEqual(await page.locator('.stats dd').allTextContents(), ['0', '0', '0', String(total), '0%']);

  // Explicit reset also permits recovery from unreadable stored history.
  await page.evaluate(() => localStorage.setItem('quant-pocket.attempts.v1', 'invalid'));
  await page.reload();
  await page.getByRole('button', { name: 'History', exact: true }).click();
  page.once('dialog', dialog => dialog.accept());
  await reset.click();
  await page.getByRole('button', { name: 'Practice', exact: true }).last().click();
  await start.click();
  await page.locator('.answer').first().click();
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  assert.equal((await readHistory()).length, 1);
  await page.reload();
  assert.equal((await readHistory()).length, 1);
  assert.deepEqual(errors, []);
  console.log('PASS: mobile setup, populated subcategories/reset, modes, sizes/caps, empty states, sampled session completion/repeat, stable answers, and legacy progress preservation.');
} finally {
  await browser?.close();
  server.httpServer.closeAllConnections();
  await new Promise(done => server.httpServer.close(done));
}
