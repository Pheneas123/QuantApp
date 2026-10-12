import type { MultipleChoiceQuestion } from './data/schema';
import { shuffle } from './progress';

export type QuickPracticeSessionQuestion = MultipleChoiceQuestion & { answerOrder: number[] };
export const sessionSizes = [10, 25, 50, 'All'] as const;
export type SessionSize = typeof sessionSizes[number];
export function sessionQuestionCount(eligibleCount: number, size: SessionSize): number {
  return size === 'All' ? eligibleCount : Math.min(eligibleCount, size);
}

/** Shuffle once when starting a session; retain canonical answer indices for grading/history. */
export function createQuickPracticeSession(questions: MultipleChoiceQuestion[], random = Math.random, size: SessionSize = 'All'): QuickPracticeSessionQuestion[] {
  return shuffle(questions, random).slice(0, sessionQuestionCount(questions.length, size)).map(question => ({
    ...question,
    answerOrder: shuffle([0, 1, 2, 3], random),
  }));
}

/** randomUUID requires HTTPS; getRandomValues also works on a phone's HTTP LAN preview. */
export function createAttemptId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID();
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // IDs only identify local study records, not credentials or security tokens.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

export interface QuickPracticeState {
  queue: QuickPracticeSessionQuestion[];
  index: number;
  selectedAnswer: number | null;
  submitted: import('./progress').SubmittedAttempt | null;
  correct: number;
  unsure: number;
  complete: boolean;
}

export function beginQuickPractice(questions: MultipleChoiceQuestion[], random = Math.random, size: SessionSize = 'All'): QuickPracticeState {
  return { queue: createQuickPracticeSession(questions, random, size), index: 0, selectedAnswer: null, submitted: null, correct: 0, unsure: 0, complete: false };
}

export function selectAnswer(state: QuickPracticeState, originalIndex: number): QuickPracticeState {
  if (state.complete || state.submitted || !state.queue[state.index]?.answerOrder.includes(originalIndex)) return state;
  return { ...state, selectedAnswer: originalIndex };
}

export function submitAnswer(state: QuickPracticeState, id: string, at: string): QuickPracticeState {
  const q = state.queue[state.index];
  if (!q || state.complete || state.submitted || state.selectedAnswer === null) return state;
  const correct = state.selectedAnswer === q.correctAnswer;
  return {
    ...state,
    correct: state.correct + Number(correct),
    submitted: {
      id, at, questionId: q.id, selectedAnswer: state.selectedAnswer,
      displayedAnswer: q.answerOrder.indexOf(state.selectedAnswer), result: correct ? 'correct' : 'incorrect',
    },
  };
}

export function advanceQuestion(state: QuickPracticeState): QuickPracticeState {
  if (state.complete || !state.submitted) return state;
  if (state.index + 1 === state.queue.length) return { ...state, complete: true };
  return { ...state, index: state.index + 1, selectedAnswer: null, submitted: null };
}

export function submitUnsure(state: QuickPracticeState, id: string, at: string): QuickPracticeState {
  const q = state.queue[state.index];
  if (!q || state.complete || state.submitted) return state;
  return { ...state, selectedAnswer: null, unsure: state.unsure + 1,
    submitted: { id, at, questionId: q.id, result: 'unsure' } };
}
