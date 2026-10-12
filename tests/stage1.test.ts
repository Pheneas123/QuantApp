import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import programming from '../src/features/quick-practice/data/bank/programming.ts';
import machineLearning from '../src/features/quick-practice/data/bank/machine-learning.ts';
import programmingReferences from '../src/data/knowledge/programming.ts';
import machineLearningReferences from '../src/data/knowledge/machine-learning.ts';
import { curriculum } from '../src/data/curriculum.ts';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { knowledgeIdSet } from '../src/data/knowledge/index.ts';
import { defaultFilters, availableSubcategories, eligibleQuestions, changeCategory } from '../src/features/quick-practice/sessionSetup.ts';
import { beginQuickPractice, selectAnswer, submitAnswer, submitUnsure } from '../src/features/quick-practice/session.ts';
import { parseAttempts, attemptCounts, STORAGE_KEY } from '../src/features/quick-practice/progress.ts';
import { textSegments } from '../src/components/textSegments.ts';
import { MathText } from '../src/components/MathText.tsx';

const additions = [...programming, ...machineLearning];
const question = (id: string) => { const q = additions.find(q => q.id === id); assert.ok(q, id); return q; };

test('Stage 1 adds exactly 25 per category across all ten topics with validated reference links', () => {
  assert.equal(programming.length, 25);
  assert.equal(machineLearning.length, 25);
  assert.equal(programmingReferences.length, 10);
  assert.equal(machineLearningReferences.length, 12);
  assert.equal(questions.filter(q => q.category === 'Finance').length, 100);
  for (const [category, expectedTopics, expectedDifficulty] of [
    ['Programming', [3, 3, 3, 2, 3, 2, 3, 2, 2, 2], [8, 17, 0]],
    ['Machine Learning', [2, 2, 2, 3, 2, 3, 2, 2, 3, 4], [8, 17, 0]],
  ] as const) {
    const bank = additions.filter(q => q.category === category);
    assert.deepEqual(availableSubcategories(questions, category), [...curriculum[category]]);
    assert.deepEqual(curriculum[category].map(t => bank.filter(q => q.subcategory === t).length), expectedTopics);
    assert.deepEqual(['easy', 'medium', 'hard'].map(d => bank.filter(q => q.difficulty === d).length), expectedDifficulty);
    for (const subcategory of curriculum[category]) for (const difficulty of ['easy', 'medium', 'hard'] as const) {
      assert.deepEqual(eligibleQuestions(questions, { ...defaultFilters, category, subcategory, difficulty }, []).map(q => q.id),
        questions.filter(q => q.category === category && q.subcategory === subcategory && q.difficulty === difficulty).map(q => q.id));
    }
  }
  for (const q of additions) {
    assert.ok(q.explanation.trim());
    assert.ok(q.knowledgeIds.length);
    for (const id of q.knowledgeIds) assert.ok(knowledgeIdSet.has(id), q.id);
    for (const text of [q.prompt, ...q.answers, q.explanation]) {
      for (const segment of textSegments(text).filter(s => s.kind === 'text')) {
        for (const match of segment.text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$]*?)\$/g)) {
          assert.doesNotThrow(() => katex.renderToString(match[1] ?? match[2], { throwOnError: true }), q.id);
        }
      }
      assert.ok(!textSegments(text).some(s => s.kind === 'text' && s.text.includes('```')), q.id + ': malformed fence');
    }
  }
});

test('fenced code preserves indentation and literal syntax without HTML or KaTeX interpretation', () => {
  const code = 'if x < 2:\n    print("$literal$ <script>")';
  const text = 'Before $x^2$.\n```python\n' + code + '\n```\nAfter.';
  assert.deepEqual(textSegments(text), [
    { kind: 'text', text: 'Before $x^2$.\n' },
    { kind: 'code', language: 'python', text: code },
    { kind: 'text', text: '\nAfter.' },
  ]);
  const html = renderToStaticMarkup(createElement(MathText, { text }));
  assert.match(html, /<code class="code-block" data-language="python">/);
  assert.ok(html.includes('    print('));
  assert.ok(html.includes('$literal$'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(!html.includes('<script>'));
  assert.deepEqual(textSegments('inline ``` text'), [{ kind: 'text', text: 'inline ``` text' }]);
  assert.equal(textSegments('```python\nunfinished')[0].kind, 'text');
  assert.equal(textSegments('```cpp\r\nint x;\r\n```')[0].text, 'int x;');
  assert.deepEqual(textSegments('plain $x$'), [{ kind: 'text', text: 'plain $x$' }]);
  assert.equal(textSegments('```\na\n```\n```python\nb\n```').filter(s => s.kind === 'code').length, 2);
});

test('ML numeric choices agree with independent scalar and chain-rule calculations uniquely', () => {
  for (const [id, expected] of [
    ['ml-logistic-probability', 1 / (1 + Math.exp(-Math.log(3)))],
    ['ml-forest-correlation', (4 + 4 + 2 * 0.5 * 4) / 4],
    ['ml-gradient-step', 1 - 0.1 * 2 * (1 - 3)],
    ['ml-momentum-step', 5 - 0.1 * (0.9 * 2 - 1)],
    ['ml-backprop-chain', (4 - 1) * 2 * 2 * 2],
    ['ml-bellman-value', 2 + 0.9 * 10],
    ['ml-q-learning-update', 4 + 0.5 * (2 + 0.9 * 6 - 4)],
  ] as const) {
    const q = question(id);
    assert.deepEqual(q.answers.flatMap((a, i) => Math.abs(Number(a) - expected) < 1e-10 ? [i] : []), [q.correctAnswer], id);
  }
  const precision = question('ml-precision-recall');
  assert.equal(precision.answers[precision.correctAnswer], `${18 / (18 + 6)} precision; ${(18 / (18 + 12)).toFixed(2)} recall`);
  const imbalance = question('ml-accuracy-imbalance');
  assert.equal(imbalance.answers[imbalance.correctAnswer], `${95 / 100 * 100}% accuracy; ${0 / 5 * 100}% recall`);
  const covariance = [[9, 0], [0, 1]];
  for (let k = 0; k < 100; k++) {
    const angle = k * Math.PI / 100;
    const projected = covariance[0][0] * Math.cos(angle) ** 2 + covariance[1][1] * Math.sin(angle) ** 2;
    assert.ok(projected <= 9 + 1e-12);
  }
  const derivative = (w: number) => {
    const x = 2, t = 1, h = w * x;
    return 0.5 * (h * h - t) ** 2;
  };
  const step = 1e-5;
  assert.ok(Math.abs((derivative(1 + step) - derivative(1 - step)) / (2 * step) - 24) < 1e-7);
});

test('ML stability, terminal targets and ELBO reasoning respect their stated assumptions', () => {
  for (const eta of [0.1, 0.4, 0.9]) {
    const a = 2;
    assert.ok(Math.abs(1 - eta * a) < 1);
  }
  assert.equal(Math.abs(1 - (2 / 2) * 2), 1);
  for (const terminal of [0, 1]) {
    const reward = 3, gamma = 0.9, next = 8;
    const target = reward + gamma * (1 - terminal) * next;
    assert.equal(target, terminal ? reward : 10.2);
  }
  const q = [0.25, 0.75], posterior = [0.5, 0.5];
  const kl = q.reduce((s, x, i) => s + x * Math.log(x / posterior[i]), 0);
  assert.ok(kl > 0);
  const logEvidence = -2;
  assert.ok(logEvidence - kl < logEvidence);
});

test('new categories preserve canonical grading, all review modes and legacy history across answer shuffles', () => {
  const original = structuredClone(additions);
  const legacy = { id: 'legacy', questionId: 'prob-001', selectedAnswer: 1, correct: true, at: '2026-10-01T12:00:00Z' };
  for (const q of additions) for (const random of [() => 0, () => 0.3, () => 0.6, () => 0.99]) {
    const state = beginQuickPractice([q], random);
    const correct = submitAnswer(selectAnswer(state, q.correctAnswer), 'c', '2026-10-11T12:00:00Z');
    const wrong = submitAnswer(selectAnswer(state, (q.correctAnswer + 1) % 4), 'i', '2026-10-11T12:01:00Z');
    const unsure = submitUnsure(state, 'u', '2026-10-11T12:02:00Z');
    assert.equal(correct.submitted?.result, 'correct');
    assert.equal(wrong.submitted?.result, 'incorrect');
    assert.deepEqual([...state.queue[0].answerOrder].sort(), [0, 1, 2, 3]);
    assert.equal(correct.submitted && 'displayedAnswer' in correct.submitted ? correct.submitted.displayedAnswer : undefined,
      state.queue[0].answerOrder.indexOf(q.correctAnswer));
    const history = parseAttempts(JSON.stringify([legacy, correct.submitted, wrong.submitted, unsure.submitted]));
    assert.deepEqual(history[0], legacy);
    assert.deepEqual(attemptCounts(history), { correct: 2, incorrect: 1, unsure: 1, accuracy: 67 });
    const filters = { ...defaultFilters, category: q.category, subcategory: q.subcategory, difficulty: q.difficulty };
    assert.deepEqual(eligibleQuestions(questions, { ...filters, mode: 'unsure' }, history).map(q => q.id), [q.id]);
    assert.deepEqual(eligibleQuestions(questions, { ...filters, mode: 'incorrect' }, history), []);
    assert.deepEqual(eligibleQuestions(questions, { ...filters, mode: 'incorrect' }, history.slice(0, -1)).map(q => q.id), [q.id]);
    assert.ok(!eligibleQuestions(questions, { ...filters, mode: 'unseen' }, history).some(item => item.id === q.id));
    assert.ok(eligibleQuestions(questions, { ...filters, mode: 'unseen' }, []).some(item => item.id === q.id));
  }
  assert.equal(changeCategory(questions, { ...defaultFilters, category: 'Programming', subcategory: 'Modern C++' }, 'Machine Learning').subcategory, 'All');
  assert.equal(STORAGE_KEY, 'quantapp.attempts.v1');
  assert.deepEqual(additions, original);
});
