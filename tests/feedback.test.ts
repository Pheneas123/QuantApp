import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { beginQuickPractice, selectAnswer, submitAnswer, submitUnsure, advanceQuestion } from '../src/features/quick-practice/session.ts';
import { parseAttempts, statuses, attemptCounts } from '../src/features/quick-practice/progress.ts';
import { eligibleQuestions, defaultFilters } from '../src/features/quick-practice/sessionSetup.ts';
import { QuickPracticeScreen } from '../src/features/quick-practice/components/QuickPracticeScreen.tsx';

const at='2026-10-07T12:00:00Z';
test('unsure clears selection, records no answer, locks the attempt and requires Next',()=>{
  let state=selectAnswer(beginQuickPractice([questions[0]]),0);
  state=submitUnsure(state,'u',at);
  assert.deepEqual(state.submitted,{id:'u',at,questionId:questions[0].id,result:'unsure'});
  assert.equal(state.selectedAnswer,null);
  assert.equal(state.correct,0); assert.equal(state.unsure,1); assert.equal(state.complete,false);
  assert.equal(submitUnsure(state,'duplicate',at),state);
  assert.equal(submitAnswer(state,'duplicate',at),state);
  assert.equal(selectAnswer(state,1),state);
  assert.equal(advanceQuestion(state).complete,true);
  assert.equal(submitUnsure(beginQuickPractice([]),'empty',at).submitted,null);
});
test('mixed legacy/new history round trips intact, counts accuracy and follows latest result',()=>{
  const raw=JSON.stringify([
    {id:'old1',at,questionId:'prob-001',selectedAnswer:1,correct:true},
    {id:'old2',at,questionId:'prob-002',selectedAnswer:0,correct:false},
    {id:'new1',at,questionId:'prob-001',result:'unsure'},
    {id:'new2',at,questionId:'prob-003',result:'correct',selectedAnswer:2},
  ]);
  const attempts=parseAttempts(raw);
  assert.equal(JSON.stringify(attempts),raw);
  assert.equal(statuses(attempts).get('prob-001'),'unsure');
  assert.deepEqual(attemptCounts(attempts),{correct:2,incorrect:1,unsure:1,accuracy:67});
  assert.equal(attemptCounts([attempts[2]]).accuracy,0);
  assert.equal(attemptCounts([]).accuracy,0);
  const filters={...defaultFilters,mode:'unsure' as const,category:'Probability' as const,subcategory:'Independence',difficulty:'easy' as const};
  assert.deepEqual(eligibleQuestions(questions,filters,attempts).map(q=>q.id),['prob-001']);
  assert.equal(eligibleQuestions(questions,{...filters,difficulty:'hard'},attempts).length,0);
  assert.equal(eligibleQuestions(questions,{...filters,subcategory:'Expectation'},attempts).length,0);
  assert.deepEqual(eligibleQuestions(questions,{...filters,mode:'unseen'},attempts).map(q=>q.id),['prob-mutual-independence-subsets']);
  attempts.push({id:'new3',at,questionId:'prob-001',result:'incorrect',selectedAnswer:0});
  assert.equal(eligibleQuestions(questions,filters,attempts).length,0);
  assert.deepEqual(eligibleQuestions(questions,{...filters,mode:'incorrect'},attempts).map(q=>q.id),['prob-001']);
  assert.equal(attempts.length,5);
});
test('reject ambiguous or malformed new attempt shapes',()=>{
  for(const fields of [{result:'unsure',selectedAnswer:0},{result:'unsure',displayedAnswer:0},{result:'correct',correct:true,selectedAnswer:0},{result:'unknown'},{result:'incorrect'},{result:'correct',selectedAnswer:4}]) {
    assert.throws(()=>parseAttempts(JSON.stringify([{id:'bad',at,questionId:'q',...fields}])));
  }
});
test('explanation is absent before submission and visible for every outcome, optional when missing',()=>{
  const render=(state:ReturnType<typeof beginQuickPractice>)=>renderToStaticMarkup(createElement(QuickPracticeScreen,{state,onSelect:()=>{},onSubmit:()=>{},onUnsure:()=>{},onNext:()=>{},onEnd:()=>{}}));
  const initial=beginQuickPractice([questions[0]]);
  assert.ok(!render(initial).includes('class="explanation"'));
  for(const state of [submitUnsure(initial,'u',at),submitAnswer(selectAnswer(initial,1),'c',at),submitAnswer(selectAnswer(initial,0),'i',at)]) {
    const html=render(state);
    assert.ok(html.includes('class="explanation"'));
    assert.ok(html.indexOf('class="feedback"')<html.indexOf('class="explanation"'));
    assert.ok(!html.includes('>Submit</button>'));
  }
  const noExplanation={...questions[0]}; delete noExplanation.explanation;
  assert.ok(!render(submitUnsure(beginQuickPractice([noExplanation]),'u',at)).includes('class="explanation"'));
});
