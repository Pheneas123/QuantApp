import { useEffect, useRef, useState } from 'react';
import { difficultyLabels } from '../data/schema';
import type { QuickPracticeState } from '../session';
import { MathText } from '../../../components/MathText';
import { knowledgeById } from '../../../data/knowledge';

import { ProgressiveHints } from '../../../components/ProgressiveHints';
import { StudyTools } from '../../../components/StudyTools';
import { useStudyShortcuts } from '../../../components/useStudyShortcuts';
import { saveSafely, toggleFlag } from '../../learning/storage';

interface Props {
  state: QuickPracticeState;
  onSelect: (originalIndex: number) => void;
  onSubmit: () => void;
  onUnsure: () => void;
  onNext: () => void;
  onEnd: () => void;
  onOpenReference?: (id: string) => void;
  onHintUse?: (id:string,count:number)=>void;
  getHintCount?: (id:string)=>number;
  onPractiseObjective?: (id:string)=>void;
}

export function QuickPracticeScreen({ state, onSelect, onSubmit, onUnsure, onNext, onEnd, onOpenReference, onHintUse, getHintCount, onPractiseObjective }: Props) {
  const { queue, index, selectedAnswer, submitted } = state;
  const question = queue[index];
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, [question.id]);

  useEffect(() => {
    if (submitted) nextButton.current?.focus({ preventScroll: true });
  }, [submitted]);

  const [hintState,setHintState]=useState({id:question.id,count:getHintCount?.(question.id)??0});
  const hintRef=useRef(hintState);
  const hintCount=hintState.id===question.id?hintState.count:getHintCount?.(question.id)??0;
  function revealHint(){
    const count=hintRef.current.id===question.id?hintRef.current.count:getHintCount?.(question.id)??0;
    if(submitted||count>=(question.hints?.length??0))return;
    const next={id:question.id,count:count+1};hintRef.current=next;setHintState(next);onHintUse?.(question.id,next.count);
  }
  useStudyShortcuts(root,{select:position=>{if(!submitted)onSelect(question.answerOrder[position]);},
    submit:()=>{if(submitted)onNext();else onSubmit();},next:()=>{if(submitted)onNext();},
    unsure:()=>{if(!submitted)onUnsure();},hint:revealHint,flag:()=>saveSafely(()=>toggleFlag({mode:'quick',itemId:question.id}))});

  return <section ref={root} aria-label="Quiz">
    <div className="quiz-top">
      <button className="text-button" onClick={onEnd}>End session</button>
      <span aria-label={`Question ${index + 1} of ${queue.length}`}>{index + 1} / {queue.length}</span>
    </div>
    <div className="progress-track quiz-track" aria-hidden="true">
      <span style={{ width: `${100 * (index + Number(!!submitted)) / queue.length}%` }} />
    </div>
    <div className="question-meta">
      <span>{question.category}</span><span>{question.subcategory}</span><span>{difficultyLabels[question.difficulty]}</span>
    </div>
    <StudyTools identity={{mode:'quick',itemId:question.id}} objectiveIds={question.objectiveIds} prerequisiteIds={question.prerequisiteIds} onReference={onOpenReference} onPractise={onPractiseObjective}/>
    <h1 className="question" ref={heading} tabIndex={-1}><MathText text={question.prompt} /></h1>
    <div className="answers" role="group" aria-label="Answer choices">
      {question.answerOrder.map((originalIndex, position) => {
        const selected = selectedAnswer === originalIndex;
        const correct = !!submitted && originalIndex === question.correctAnswer;
        const incorrect = !!submitted && selected && !correct;
        return <button key={originalIndex} data-answer-index={originalIndex} type="button" data-quiz-control
          disabled={!!submitted} aria-pressed={selected}
          className={`answer ${selected ? 'is-selected' : ''} ${correct ? 'is-correct' : ''} ${incorrect ? 'is-wrong' : ''}`}
          onClick={() => onSelect(originalIndex)}>
          <span className="letter">{'ABCD'[position]}</span>
          <MathText text={question.answers[originalIndex]} />
          {correct && <span className="answer-result">Correct</span>}
          {incorrect && <span className="answer-result">Incorrect</span>}
        </button>;
      })}
    </div>
    <ProgressiveHints hints={question.hints} count={hintCount} onReveal={revealHint} disabled={!!submitted}/>
    {submitted ? <>
      <div className="feedback" role="status">
        <strong>{submitted.result === 'unsure' ? 'Not sure' : submitted.result === 'correct' ? 'Correct' : 'Incorrect'}</strong>
        {submitted.result !== 'correct' && <p>Correct answer: {'ABCD'[question.answerOrder.indexOf(question.correctAnswer)]}.</p>}
      </div>
      {question.explanation && <section className="explanation" aria-label="Explanation"><h2>Explanation</h2><MathText text={question.explanation} /></section>}
      {!!question.knowledgeIds?.length && onOpenReference && <section aria-label="Related concepts" className="related-concepts"><h2>Related</h2><ul className="reference-list">
        {question.knowledgeIds.map(id => <li key={id}><button className="text-button" onClick={() => onOpenReference(id)}>{knowledgeById.get(id)!.name}</button></li>)}
      </ul></section>}
      <button key="next" ref={nextButton} className="primary" data-quiz-control
        onClick={event => { if (event.detail <= 1) onNext(); }}>Next</button>
    </> : <><button className="text-button" data-quiz-control aria-keyshortcuts="U" onClick={onUnsure}>Not sure</button><button key="submit" className="primary" data-quiz-control
      disabled={selectedAnswer === null} onClick={onSubmit}>Submit</button></>}
  </section>;
}
