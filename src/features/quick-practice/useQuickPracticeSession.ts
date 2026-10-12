import { useRef, useState } from 'react';
import type { MultipleChoiceQuestion } from './data/schema';
import type { QuickPracticeAttempt } from './progress';
import { advanceQuestion, beginQuickPractice, createAttemptId, selectAnswer, submitAnswer, submitUnsure, type SessionSize } from './session';

export function useQuickPracticeSession(onAttempt: (attempt: QuickPracticeAttempt) => void) {
  const [state, setState] = useState(() => beginQuickPractice([]));
  // Update synchronously so repeated events before React renders cannot submit twice.
  const current = useRef(state);
  function commit(next: typeof state) {
    current.current = next;
    setState(next);
  }
  function start(questions: MultipleChoiceQuestion[], size: SessionSize = 'All') {
    if (!questions.length) return false;
    commit(beginQuickPractice(questions, Math.random, size));
    return true;
  }
  function select(originalIndex: number) {
    commit(selectAnswer(current.current, originalIndex));
  }
  function submit(unsure = false) {
    const previous = current.current;
    if ((!unsure && previous.selectedAnswer === null) || previous.submitted || previous.complete) return;
    const next = (unsure ? submitUnsure : submitAnswer)(previous, createAttemptId(), new Date().toISOString());
    if (next === previous || !next.submitted) return;
    commit(next);
    onAttempt(next.submitted);
  }
  function next() {
    const updated = advanceQuestion(current.current);
    commit(updated);
    return updated.complete;
  }
  return { state, start, select, submit: () => submit(), unsure: () => submit(true), next };
}
