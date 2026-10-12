import test from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { availableSubcategories, changeCategory, defaultFilters, eligibleQuestions, type PracticeFilters } from '../src/features/quick-practice/sessionSetup.ts';
import { beginQuickPractice, createQuickPracticeSession, selectAnswer, sessionQuestionCount, submitAnswer } from '../src/features/quick-practice/session.ts';
import type { QuickPracticeAttempt } from '../src/features/quick-practice/progress.ts';

const attempt = (questionId: string, correct: boolean): QuickPracticeAttempt => ({
  id: crypto.randomUUID(), questionId, correct, selectedAnswer: 0, at: '2026-10-06T12:00:00Z',
});
const filters: PracticeFilters = { category: 'Stochastic Calculus', subcategory: 'Brownian motion properties', difficulty: 'easy', mode: 'practice' };

test('subcategories contain only populated topics and remain independent of difficulty/status', () => {
  assert.deepEqual(availableSubcategories(questions, 'All'), []);
  const topics = availableSubcategories(questions, 'Stochastic Calculus');
  assert.ok(topics.includes('Brownian motion properties'));
  assert.ok(topics.includes('Girsanov theorem'));
  assert.deepEqual(availableSubcategories(questions.filter(q => q.id === 'calc-001'), 'Stochastic Calculus'), ['Brownian motion properties']);
  assert.equal(new Set(topics).size, topics.length);
  for (const topic of topics) assert.ok(questions.some(q => q.category === 'Stochastic Calculus' && q.subcategory === topic));
});

test('category changes reset invalid subcategories and retain valid ones and other filters', () => {
  const other = changeCategory(questions, filters, 'Statistics');
  assert.equal(other.subcategory, 'All');
  assert.equal(other.difficulty, 'easy');
  assert.equal(other.mode, 'practice');
  assert.equal(changeCategory(questions, filters, 'All').subcategory, 'All');
  assert.equal(changeCategory(questions, filters, 'Stochastic Calculus').subcategory, filters.subcategory);
  assert.equal(filters.subcategory, 'Brownian motion properties');
});

test('category, subcategory, difficulty and all three modes use the latest status', () => {
  const history = [attempt('calc-001', false), attempt('calc-001', true), attempt('calc-004', true), attempt('calc-004', false)];
  const ids = (overrides: Partial<PracticeFilters>) => eligibleQuestions(questions, { ...filters, ...overrides }, history).map(q => q.id);
  assert.deepEqual(ids({}), ['calc-001', 'calc-004']);
  assert.deepEqual(ids({ mode: 'incorrect' }), ['calc-004']);
  assert.deepEqual(ids({ mode: 'unseen' }), []);
  assert.deepEqual(ids({ difficulty: 'hard' }), []);
  assert.deepEqual(ids({ category: 'Statistics' }), []);
  assert.equal(eligibleQuestions(questions, defaultFilters, history).length, 450);
  assert.equal(eligibleQuestions(questions, { ...defaultFilters, subcategory: filters.subcategory }, history).length, 450);
  assert.ok(ids({ subcategory: 'All' }).includes('calc-002'));
});

test('size samples after shuffling, caps to availability and never duplicates', () => {
  const snapshot = structuredClone(questions);
  for (const size of [10, 25, 50, 'All'] as const) {
    const queue = createQuickPracticeSession(questions, () => 0, size);
    assert.equal(queue.length, sessionQuestionCount(questions.length, size));
    assert.deepEqual(queue.map(q => q.id), [...questions.slice(1), questions[0]].slice(0, queue.length).map(q => q.id));
    assert.equal(new Set(queue.map(q => q.id)).size, queue.length);
  }
  assert.equal(beginQuickPractice(questions.slice(0, 3), () => 0, 25).queue.length, 3);
  assert.equal(createQuickPracticeSession([], () => 0, 10).length, 0);
  assert.equal(sessionQuestionCount(0, 25), 0);
  assert.deepEqual(questions, snapshot);
});

test('sampled sessions retain shuffled, stable answers and canonical grading', () => {
  let state = beginQuickPractice(questions, () => 0, 10);
  const queue = state.queue;
  assert.deepEqual(queue[0].answerOrder, [1, 2, 3, 0]);
  state = selectAnswer(state, queue[0].correctAnswer);
  state = submitAnswer(state, 'one-attempt', '2026-10-06T12:00:00Z');
  assert.equal(state.queue, queue);
  assert.equal(state.submitted?.result, 'correct');
  assert.equal(state.submitted?.selectedAnswer, queue[0].correctAnswer);
  assert.equal(state.submitted?.displayedAnswer, queue[0].answerOrder.indexOf(queue[0].correctAnswer));
  assert.notDeepEqual(createQuickPracticeSession(questions, () => 0.99, 10)[0].answerOrder, queue[0].answerOrder);
});
