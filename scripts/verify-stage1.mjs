// Production controls, literal code, legacy history, references and offline data.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { curriculum } from '../src/data/curriculum.ts';
import { knowledge } from '../src/data/knowledge/index.ts';
import { textSegments } from '../src/components/textSegments.ts';
import { STORAGE_KEY } from '../src/features/quick-practice/progress.ts';

const server = await preview({ logLevel: 'silent', preview: { host: '127.0.0.1', port: 4191, strictPort: true } });
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.PWA_CHROMIUM || undefined,
    args: process.env.PWA_NO_SANDBOX === '1' ? ['--no-sandbox'] : [] });
  const context = await browser.newContext({ viewport: { width: 320, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(server.resolvedUrls.local[0]);
  const legacy = { id: 'legacy-before-stage1', questionId: 'prob-001', at: '2026-10-01T12:00:00Z', selectedAnswer: 1, correct: true };
  const history = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
  const topic = page.getByRole('combobox', { name: 'Subcategory', exact: true });
  const start = page.getByRole('button', { name: 'Start', exact: true });
  const mode = page.getByRole('group', { name: 'Mode', exact: true });
  const choose = category => page.getByRole('button', { name: `${category} 50 questions`, exact: true }).click();
  const seed = async excluded => {
    const attempts = [legacy, ...questions.filter(q => !excluded.includes(q.id)).map((q, i) => ({
      id: `seed-${i}`, questionId: q.id, at: '2026-10-02T12:00:00Z', selectedAnswer: 0, correct: true,
    }))];
    await page.evaluate(({ key, attempts }) => localStorage.setItem(key, JSON.stringify(attempts)), { key: STORAGE_KEY, attempts });
    await page.reload();
    return attempts;
  };
  const noOverflow = async id => {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id} at ${width}px`);
    }
    assert.equal(await page.locator('.katex-error').count(), 0, id);
  };
  const literalCode = async q => {
    const expected = textSegments(q.prompt).filter(s => s.kind === 'code').map(s => s.text);
    assert.deepEqual(await page.locator('.question .code-block').allTextContents(), expected, q.id);
    assert.equal(await page.locator('.code-block .katex').count(), 0, q.id);
    for (const code of await page.locator('.code-block').all()) {
      assert.equal(await code.evaluate(el => getComputedStyle(el).whiteSpace), 'pre');
      assert.equal(await code.evaluate(el => getComputedStyle(el).overflowX), 'auto');
    }
  };
  const roundTrip = async q => {
    const saved = await history();
    const prompt = await page.locator('.question').textContent();
    const order = await page.locator('.answer > span:nth-child(2)').allTextContents();
    const ref = knowledge.find(k => k.id === q.knowledgeIds[0]);
    await page.getByRole('button', { name: ref.name, exact: true }).click();
    await page.getByRole('heading', { name: ref.name, exact: true }).waitFor();
    await noOverflow(ref.id);
    await page.getByRole('button', { name: 'Back to Quick Practice', exact: true }).click();
    assert.equal(await page.locator('.question').textContent(), prompt);
    assert.deepEqual(await page.locator('.answer > span:nth-child(2)').allTextContents(), order);
    assert.deepEqual(await history(), saved);
  };

  for (const category of ['Programming', 'Machine Learning']) {
    const additions = questions.filter(q => q.category === category);
    const seeded = await seed(additions.map(q => q.id));
    await choose(category);
    assert.deepEqual(await topic.locator('option').allTextContents(), ['All subcategories', ...curriculum[category]]);
    await page.getByRole('group', { name: 'Session', exact: true }).getByRole('button', { name: 'All', exact: true }).click();
    for (const subcategory of curriculum[category]) {
      await topic.selectOption(subcategory);
      for (const difficulty of ['Easy', 'Medium', 'Hard']) {
        await page.getByRole('button', { name: difficulty, exact: true }).click();
        const count = additions.filter(q => q.subcategory === subcategory && q.difficulty === difficulty.toLowerCase()).length;
        await page.getByText(count ? `${count} available · session: ${count}` : 'No questions match these filters.', { exact: true }).waitFor();
        assert.equal(await start.isDisabled(), count === 0);
      }
    }
    await topic.selectOption('All');
    await page.getByRole('group', { name: 'Difficulty', exact: true }).getByRole('button', { name: 'Mixed', exact: true }).click();
    await mode.getByRole('button', { name: 'Unseen Only', exact: true }).click();
    await start.click();
    const rendered = [];
    for (let n = 0; n < additions.length; n++) {
      await noOverflow(category);
      await page.getByRole('button', { name: 'Not sure', exact: true }).click();
      const attempt = (await history()).at(-1);
      const q = additions.find(q => q.id === attempt.questionId);
      assert.ok(q);
      rendered.push(q.id);
      assert.equal(attempt.result, 'unsure');
      await literalCode(q);
      await noOverflow(q.id);
      assert.equal(await page.locator('.answer.is-correct').count(), 1);
      assert.equal(await page.locator('.explanation').count(), 1);
      if (n === 0) await roundTrip(q);
      await page.getByRole('button', { name: 'Next', exact: true }).click();
    }
    assert.equal(new Set(rendered).size, additions.length);
    assert.deepEqual((await history()).slice(0, seeded.length), seeded);
    await page.getByRole('button', { name: 'Back to Home', exact: true }).click();
    assert.equal(await start.isDisabled(), true);
    await mode.getByRole('button', { name: 'Review Unsure', exact: true }).click();
    await page.getByText('50 available · session: 50', { exact: true }).waitFor();
    await page.reload();
    assert.equal((await history()).length, seeded.length + additions.length);
  }

  // Deterministic singleton pools test all three browser grading outcomes.
  for (const id of ['prog-reference-alias', 'ml-logistic-probability']) {
    const q = questions.find(q => q.id === id);
    for (const result of ['correct', 'incorrect', 'unsure']) {
      const seeded = await seed([id]);
      await choose(q.category);
      await mode.getByRole('button', { name: 'Unseen Only', exact: true }).click();
      await start.click();
      const order = await page.locator('.answer > span:nth-child(2)').allTextContents();
      if (result === 'unsure') await page.getByRole('button', { name: 'Not sure', exact: true }).click();
      else {
        const canonical = result === 'correct' ? q.correctAnswer : (q.correctAnswer + 1) % 4;
        await page.locator('.answer').filter({ has: page.getByText(q.answers[canonical], { exact: true }) }).click();
        assert.deepEqual(await page.locator('.answer > span:nth-child(2)').allTextContents(), order);
        await page.getByRole('button', { name: 'Submit', exact: true }).click();
        assert.equal((await history()).at(-1).selectedAnswer, canonical);
      }
      assert.equal((await history()).at(-1).result, result);
      assert.deepEqual((await history()).slice(0, seeded.length), seeded);
      await roundTrip(q);
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      await page.getByRole('button', { name: 'Back to Home', exact: true }).click();
      if (result !== 'correct') {
        await mode.getByRole('button', { name: result === 'unsure' ? 'Review Unsure' : 'Review Incorrect', exact: true }).click();
        await page.getByText('1 available · session: 1', { exact: true }).waitFor();
      }
    }
  }

  // Production cache includes both code-bearing categories and their references.
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  await page.reload();
  assert.ok(await page.evaluate(() => !!navigator.serviceWorker.controller));
  await context.setOffline(true);
  for (const id of ['prog-reference-alias', 'ml-gradient-accumulation']) {
    const q = questions.find(q => q.id === id);
    await seed([id]);
    await choose(q.category);
    await mode.getByRole('button', { name: 'Unseen Only', exact: true }).click();
    await start.click();
    await literalCode(q);
    await page.getByRole('button', { name: 'Not sure', exact: true }).click();
    await noOverflow(q.id);
    await roundTrip(q);
    const saved = await history();
    await page.reload();
    assert.deepEqual(await history(), saved);
  }
  await page.getByRole('navigation').getByRole('button', { name: 'History', exact: true }).click();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Reset progress', exact: true }).click();
  assert.equal(await history(), null);
  await page.getByRole('navigation').getByRole('button', { name: 'Practice', exact: true }).click();
  await page.getByRole('group', { name: 'Session', exact: true }).getByRole('button', { name: 'All', exact: true }).click();
  for (const category of ['Programming', 'Machine Learning']) {
    await choose(category);
    await mode.getByRole('button', { name: 'Unseen Only', exact: true }).click();
    await page.getByText('50 available · session: 50', { exact: true }).waitFor();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: 60 topic/difficulty pools, all 100 Programming/ML questions/literal code at 320px and 390px, shuffled canonical grading, review/unseen, legacy history, reference return, reload, offline code/references and reset.');
} finally {
  await browser?.close();
  server.httpServer.closeAllConnections();
  await new Promise(done => server.httpServer.close(done));
}
