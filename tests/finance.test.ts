import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import finance from '../src/features/quick-practice/data/bank/finance/index.ts';
import { curriculum } from '../src/data/curriculum.ts';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { validateMultipleChoiceBank } from '../src/features/quick-practice/data/schema.ts';
import { availableSubcategories, changeCategory, defaultFilters, eligibleQuestions } from '../src/features/quick-practice/sessionSetup.ts';
import { advanceQuestion, beginQuickPractice, selectAnswer, submitAnswer, submitUnsure } from '../src/features/quick-practice/session.ts';
import { attemptCounts, parseAttempts, STORAGE_KEY } from '../src/features/quick-practice/progress.ts';

const question = (id: string) => {
  const q = finance.find(q => q.id === id);
  assert.ok(q, id);
  return q;
};

test('Finance has ten topics with educational explanations and valid mathematics', () => {
  validateMultipleChoiceBank(finance);
  assert.equal(finance.length, 100);
  assert.equal(questions.filter(q => !['Finance', 'Programming', 'Machine Learning'].includes(q.category)).length, 250);
  assert.deepEqual(availableSubcategories(questions, 'Finance'), [...curriculum.Finance]);
  for (const subcategory of curriculum.Finance) {
    const topic = finance.filter(q => q.subcategory === subcategory);
    assert.equal(topic.length, 10);
    // Topic difficulty quotas were replaced by item-level audit calibration.
    for (const difficulty of ['easy', 'medium', 'hard'] as const) {
      assert.deepEqual(eligibleQuestions(questions, { ...defaultFilters, category: 'Finance', subcategory, difficulty }, []).map(q => q.id),
        topic.filter(q => q.difficulty === difficulty).map(q => q.id));
    }
  }
  for (const q of finance) {
    assert.ok(q.explanation.trim());
    assert.match(q.id, /^fin-/);
    for (const text of [q.prompt, ...q.answers, q.explanation]) {
      for (const match of text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$]*?)\$/g)) {
        assert.doesNotThrow(() => katex.renderToString(match[1] ?? match[2], { throwOnError: true }), q.id);
      }
      assert.equal((text.match(/\$/g) ?? []).length % 2, 0, q.id + ' delimiters');
    }
  }
});

// Independent formula inputs, not copies of the correct-answer index or explanation.
// Numbers are compared to every authored option; percentages remain in percentage units.
const calculations: [string, number, number?][] = [
  ['fin-markets-spread', 49.90 - 50.10],
  ['fin-markets-leverage-return', ((200 * 0.9 - 100) / 100 - 1) * 100],
  ['fin-markets-short-dividend', 10 * (40 - 35 - 1)],
  ['fin-markets-crossed-arbitrage', 100 * (100.40 - 100.10 - 2 * 0.05)],
  ['fin-markets-maintenance-margin', 6000 / (100 * (1 - 0.25))],
  ['fin-markets-fx-triangle', 1000 * (1.2 * 0.9 * 0.95 - 1)],
  ['fin-micro-walk-book', (100 * 10 + 50 * 10.03) / 150],
  ['fin-micro-vwap', (100 * 20 + 300 * 22) / 400],
  ['fin-micro-imbalance', (900 - 300) / (900 + 300)],
  ['fin-micro-adverse-selection', 0.6 * 102 + 0.4 * 98 + 0.1],
  ['fin-micro-execution-tradeoff', 0.6 * 100 + 0.4 * 100.1 - 100.02],
  ['fin-bonds-coupon', 1000 * 0.06 / 2],
  ['fin-bonds-zero-price', 1000 / 1.05, 0.005],
  ['fin-bonds-dirty', 98 + 4 * 90 / 360],
  ['fin-bonds-spot-price', 5 * 0.96 + 105 * 0.9],
  ['fin-bonds-forward-rate', (1.05 ** 2 / 1.04 - 1) * 100, 0.005],
  ['fin-bonds-dv01', 4 * 2_000_000 * 0.0001],
  ['fin-bonds-bootstrap', (100 - 5 * 0.96) / 105, 0.00005],
  ['fin-bonds-convexity', 100 * (1 - 5 * 0.02 + 30 * 0.02 ** 2 / 2)],
  ['fin-credit-simple-interest', 1000 * (1 + 0.06 * 2)],
  ['fin-credit-compound-interest', 1000 * 1.05 ** 2],
  ['fin-credit-effective-rate', (1.01 ** 12 - 1) * 100, 0.005],
  ['fin-credit-amortisation', 10_000 * 1.005 - 300],
  ['fin-credit-annuity', 1000 / (1 / 1.1 + 1 / 1.1 ** 2), 0.005],
  ['fin-credit-ecl', 0.02 * 0.6 * 500_000],
  ['fin-credit-risk-neutral-bond', (0.95 * 100 + 0.05 * 40) / 1.04, 0.005],
  ['fin-credit-dependent-ecl', (0.01 * 100_000 + 0.09 * 200_000) / 2],
  ['fin-credit-hazard-spread', (1 - 0.4) * 0.03 * 10_000],
  ['fin-forwards-payoff', 112 - 100],
  ['fin-futures-marking', 2 * 10 * (4007 - 4000)],
  ['fin-forwards-carry', 100 * 1.05],
  ['fin-forwards-dividend-yield', 200 * Math.exp((0.04 - 0.01) * 2), 0.005],
  ['fin-forwards-basis-hedge', 75 + 80 - 77],
  ['fin-forwards-cash-carry-arbitrage', 110 - 100 * 1.05],
  ['fin-forwards-fx-covered', 0.85 * 1.05 / 1.02, 0.00005],
  ['fin-forwards-existing-value', 108 - 100 / 1.04, 0.005],
  ['fin-options-call-profit', Math.max(58 - 50, 0) - 3],
  ['fin-options-put-payoff', Math.max(60 - 52, 0)],
  ['fin-options-parity', 10 - 100 + 100 * 0.95],
  ['fin-options-binomial', ((1.05 - 0.8) / (1.2 - 0.8) * 20) / 1.05, 0.005],
  ['fin-options-butterfly-arbitrage', -(14 - 2 * 10 + 4)],
  ['fin-swaps-par-rate', (1 - 0.9) / (0.96 + 0.9) * 100, 0.005],
  ['fin-swaps-caplet', 2_000_000 * 0.25 * Math.max(0.04 - 0.03, 0)],
  ['fin-swaps-total-return', 1_000_000 * (0.03 + 0.01 - 0.04 * 0.5)],
  ['fin-swaps-fra-settlement', 1_000_000 * 0.5 * (0.06 - 0.04) / (1 + 0.5 * 0.06), 0.005],
  ['fin-swaps-cva', 0.95 * 0.02 * 0.6 * 100_000],
  ['fin-portfolio-total-return', (104 - 100 + 2) / 100 * 100],
  ['fin-portfolio-log-return', Math.log(110 / 100) * 100, 0.005],
  ['fin-portfolio-variance', Math.sqrt(0.5 ** 2 * 0.2 ** 2 * 2) * 100, 0.005],
  ['fin-portfolio-capm', (0.03 + 1.2 * (0.08 - 0.03)) * 100],
  ['fin-portfolio-sharpe', (0.1 - 0.02) / 0.16],
  ['fin-portfolio-information-ratio', 0.02 / 0.04],
  ['fin-portfolio-minimum-variance', 0.2 ** 2 / (0.1 ** 2 + 0.2 ** 2) * 100],
  ['fin-portfolio-factor-residual', 1.5 ** 2 * 0.04 + 0.01],
  ['fin-risk-normal-var', 10_000 + 2.326 * 50_000],
  ['fin-risk-discrete-es', (4 * 10 + 100) / 5],
  ['fin-risk-backtest-exceptions', 250 * 0.01],
  ['fin-risk-garch', 0.00001 + 0.1 * 0.02 ** 2 + 0.85 * 0.0004],
  ['fin-pricing-monte-carlo', [0, 10, 20, 30].reduce((a, b) => a + b) / 4 * 0.95],
  ['fin-pricing-gbm-log', 0.05 - 0.2 ** 2 / 2],
  ['fin-pricing-antithetic', (4 + 4 + 2 * -2) / 4],
  ['fin-pricing-numerical-delta', (8.4 - 7.2) / 2],
  ['fin-pricing-explicit-stability', 0.1 ** 2 / (2 * 0.02)],
];

test('Finance numerical options contain exactly one independently calculated answer', () => {
  for (const [id, expected, tolerance = 1e-8] of calculations) {
    const q = question(id);
    const matches = q.answers.flatMap((answer, i) => {
      const numeric = answer.replaceAll('−', '-').replace(/[£%,]| bp/g, '').trim();
      assert.match(numeric, /^-?\d+(\.\d+)?$/, id + ': unexpected numeric format');
      return Math.abs(Number(numeric) - expected) <= tolerance ? [i] : [];
    });
    assert.deepEqual(matches, [q.correctAnswer], id);
  }
  // Require every calculation question to remain covered when the bank grows.
  const mixed = ['fin-bonds-duration-hedge', 'fin-options-intrinsic-time', 'fin-options-delta-hedge', 'fin-swaps-payment', 'fin-portfolio-rebalancing'];
  const checked = new Set([...calculations.map(([id]) => id), ...mixed]);
  for (const q of finance.filter(q => q.questionType === 'short_calculation')) assert.ok(checked.has(q.id), q.id);
  assert.equal(question('fin-bonds-duration-hedge').answers[question('fin-bonds-duration-hedge').correctAnswer], `Short ${1200 / 80} hedge bonds.`);
  assert.equal(question('fin-options-intrinsic-time').answers[question('fin-options-intrinsic-time').correctAnswer], `£${105 - 100} intrinsic and £${9 - (105 - 100)} time`);
  assert.equal(question('fin-options-delta-hedge').answers[question('fin-options-delta-hedge').correctAnswer], `Buy ${10 * 100 * 0.6} shares.`);
  assert.equal(question('fin-swaps-payment').answers[question('fin-swaps-payment').correctAnswer], `Receive £${(1_000_000 * 0.5 * (0.05 - 0.04)).toLocaleString('en-GB', { maximumFractionDigits: 0 })}.`);
  const rebalance = 50 * 0.8 + 50 * 1.2;
  const hold = 50 * 1.2 * 0.8 + 50 * 0.8 * 1.2;
  assert.equal(question('fin-portfolio-rebalancing').answers[question('fin-portfolio-rebalancing').correctAnswer], `£${rebalance} rebalanced; £${hold} held`);
});

test('Finance no-arbitrage and tail-risk examples survive state enumeration', () => {
  const butterfly = (s: number) => Math.max(s - 90, 0) - 2 * Math.max(s - 100, 0) + Math.max(s - 110, 0);
  for (let s = 0; s <= 200; s += 0.5) assert.ok(butterfly(s) >= 0);
  assert.equal(butterfly(100), 10);
  // Replication independently checks the binomial option price and both payoffs.
  const delta = (20 - 0) / (120 - 80);
  const cash = -delta * 80 / 1.05;
  assert.ok(Math.abs(delta * 100 + cash - 11.904761904761905) < 1e-10);
  assert.equal(delta * 120 + cash * 1.05, 20);
  assert.equal(delta * 80 + cash * 1.05, 0);
  const losses = [[0, 0.96], [100, 0.04]];
  const distribution = losses.flatMap(([x, px]) => losses.map(([y, py]) => [x + y, px * py])).sort((a, b) => a[0] - b[0]);
  let cumulative = 0;
  const quantile = distribution.find(([, p]) => (cumulative += p) >= 0.95)?.[0];
  assert.equal(quantile, 100);
  assert.equal(question('fin-risk-var-nonsubadditive').answers[question('fin-risk-var-nonsubadditive').correctAnswer], 'Individual VaRs are £0 each; the sum’s VaR is £100.');
});

test('every Finance item grades canonical answers across shuffles and retains all progress outcomes', () => {
  const snapshot = structuredClone(finance);
  const legacy = { id: 'legacy', questionId: 'prob-001', at: '2026-10-01T12:00:00Z', selectedAnswer: 1, correct: true };
  for (const q of finance) {
    for (const random of [() => 0, () => 0.3, () => 0.6, () => 0.99]) {
      const initial = beginQuickPractice([q], random);
      assert.deepEqual([...initial.queue[0].answerOrder].sort(), [0, 1, 2, 3]);
      const correct = submitAnswer(selectAnswer(initial, q.correctAnswer), 'correct', '2026-10-11T12:00:00Z');
      const wrong = submitAnswer(selectAnswer(initial, (q.correctAnswer + 1) % 4), 'wrong', '2026-10-11T12:01:00Z');
      const unsure = submitUnsure(initial, 'unsure', '2026-10-11T12:02:00Z');
      assert.equal(correct.submitted?.result, 'correct');
      assert.equal(wrong.submitted?.result, 'incorrect');
      assert.equal(unsure.submitted?.result, 'unsure');
      assert.equal(correct.submitted && 'displayedAnswer' in correct.submitted ? correct.submitted.displayedAnswer : undefined,
        initial.queue[0].answerOrder.indexOf(q.correctAnswer));
      assert.equal(submitAnswer(correct, 'duplicate', '2026-10-11T12:03:00Z'), correct);
      assert.equal(advanceQuestion(correct).complete, true);
      const history = parseAttempts(JSON.stringify([legacy, correct.submitted, wrong.submitted, unsure.submitted]));
      assert.deepEqual(history[0], legacy);
      assert.deepEqual(attemptCounts(history), { correct: 2, incorrect: 1, unsure: 1, accuracy: 67 });
      const filters = { ...defaultFilters, category: 'Finance' as const, subcategory: q.subcategory, difficulty: q.difficulty };
      assert.deepEqual(eligibleQuestions(questions, { ...filters, mode: 'unsure' }, history).map(q => q.id), [q.id]);
      assert.deepEqual(eligibleQuestions(questions, { ...filters, mode: 'incorrect' }, history), []);
      assert.ok(!eligibleQuestions(questions, { ...filters, mode: 'unseen' }, history).some(item => item.id === q.id));
      assert.deepEqual(eligibleQuestions(questions, { ...filters, mode: 'incorrect' }, history.slice(0, -1)).map(q => q.id), [q.id]);
      assert.ok(eligibleQuestions(questions, { ...filters, mode: 'unseen' }, parseAttempts(null)).some(item => item.id === q.id));
    }
  }
  const switched = changeCategory(questions, { ...defaultFilters, category: 'Finance', subcategory: curriculum.Finance[0], difficulty: 'hard', mode: 'unsure' }, 'Statistics');
  assert.deepEqual(switched, { category: 'Statistics', subcategory: 'All', difficulty: 'hard', mode: 'unsure' });
  assert.equal(STORAGE_KEY, 'quantapp.attempts.v1');
  assert.deepEqual(finance, snapshot);
});
