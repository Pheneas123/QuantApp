import { answerAccuracy } from '../progress';
import { useEffect, useRef } from 'react';

export function QuickPracticeSummary({ total, correct, unsure, canRepeat, onRepeat, onHome }: {
  total: number; correct: number; unsure: number; canRepeat: boolean; onRepeat: () => void; onHome: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { window.scrollTo(0, 0); heading.current?.focus(); }, []);
  return <section className="complete">
    <h1 ref={heading} tabIndex={-1}>Session complete</h1>
    <dl className="session-summary">
      <div><dt>Questions</dt><dd>{total}</dd></div>
      <div><dt>Correct</dt><dd>{correct}</dd></div>
      <div><dt>Incorrect</dt><dd>{total - correct - unsure}</dd></div>
      <div><dt>Unsure</dt><dd>{unsure}</dd></div>
      <div><dt>Accuracy</dt><dd>{answerAccuracy(correct, total - correct - unsure)}%</dd></div>
    </dl>
    <button className="primary" disabled={!canRepeat} onClick={onRepeat}>Practice Again</button>
    {!canRepeat && <p className="subtle">No questions remain for the selected filters.</p>}
    <button className="text-button" onClick={onHome}>Back to Home</button>
  </section>;
}
