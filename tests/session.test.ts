import test from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { createQuickPracticeSession, createAttemptId, beginQuickPractice, selectAnswer, submitAnswer, advanceQuestion } from '../src/features/quick-practice/session.ts';
import { parseAttempts, selectQuestions, type QuickPracticeAttempt } from '../src/features/quick-practice/progress.ts';

test('answer permutations retain grading and canonical choices without mutating the bank',()=>{
  const before=structuredClone(questions);
  const positions=new Set<number>();
  for(const random of [()=>0,()=>0.3,()=>0.6,()=>0.99]) {
    const [q]=createQuickPracticeSession([questions[0]],random);
    assert.deepEqual([...q.answerOrder].sort(),[0,1,2,3]);
    const displayedCorrect=q.answerOrder.indexOf(q.correctAnswer);
    positions.add(displayedCorrect);
    assert.equal(q.answers[q.answerOrder[displayedCorrect]],questions[0].answers[questions[0].correctAnswer]);
    const attempt:QuickPracticeAttempt={id:'test',questionId:q.id,selectedAnswer:q.correctAnswer,displayedAnswer:displayedCorrect,correct:true,at:new Date().toISOString()};
    assert.deepEqual(parseAttempts(JSON.stringify([attempt])),[attempt]);
  }
  assert.ok(positions.size>1);
  assert.deepEqual(questions,before);
  assert.equal(new Set(createQuickPracticeSession(questions).map(q=>q.id)).size,questions.length);
});
test('unseen excludes both correct and incorrect attempts and combines with filters',()=>{
  const history:QuickPracticeAttempt[]=questions.slice(0,2).map((q,i)=>({id:String(i),questionId:q.id,selectedAnswer:0,correct:i===0,at:new Date().toISOString()}));
  const unseen=selectQuestions(questions,'All','All',false,history,true);
  assert.equal(unseen.length,questions.length-2);
  assert.ok(unseen.every(q=>!history.some(a=>a.questionId===q.id)));
  const filtered=selectQuestions(questions.slice(0,3),'Probability','easy',false,history,true);
  assert.deepEqual(filtered.map(q=>q.id),['prob-003']);
  assert.equal(selectQuestions(questions,'All','All',false,[],true).length,questions.length);
  assert.equal(selectQuestions(questions.slice(0,2),'All','All',false,history,true).length,0);
});
test('attempt IDs work when randomUUID is unavailable on HTTP',()=>{
  const descriptor=Object.getOwnPropertyDescriptor(globalThis,'crypto');
  let counter=0;
  try {
    Object.defineProperty(globalThis,'crypto',{configurable:true,value:{getRandomValues:(bytes:Uint8Array)=>{bytes.fill(++counter);return bytes;}}});
    const ids=Array.from({length:10},createAttemptId);
    assert.equal(new Set(ids).size,10);
    assert.ok(ids.every(id=>/^[a-f0-9]{32}$/.test(id)));
    Object.defineProperty(globalThis,'crypto',{configurable:true,value:undefined});
    assert.ok(createAttemptId().length>0);
  }finally{if(descriptor)Object.defineProperty(globalThis,'crypto',descriptor);else Reflect.deleteProperty(globalThis,'crypto');}
});
test('history accepts old canonical indices but rejects invalid display positions',()=>{
  const attempt={id:'old',questionId:'prob-001',selectedAnswer:1,correct:true,at:new Date().toISOString()};
  assert.deepEqual(parseAttempts(JSON.stringify([attempt])),[attempt]);
  assert.throws(()=>parseAttempts(JSON.stringify([{...attempt,displayedAnswer:4}])));
});


test('selection is editable, submission occurs once, and advancement requires submission',()=>{
  let state=beginQuickPractice(questions.slice(0,2),()=>0.5);
  const originalQueue=state.queue;
  const q=state.queue[0];
  assert.equal(submitAnswer(state,'empty','2026-01-01T00:00:00Z'),state);
  assert.equal(advanceQuestion(state),state);
  state=selectAnswer(state,(q.correctAnswer+1)%4);
  assert.equal(state.submitted,null);
  assert.equal(state.correct,0);
  state=selectAnswer(state,q.correctAnswer);
  state=submitAnswer(state,'first','2026-01-01T00:00:00Z');
  assert.equal(state.submitted?.selectedAnswer,q.correctAnswer);
  assert.equal(state.submitted?.result,'correct');
  assert.equal(state.correct,1);
  assert.equal(selectAnswer(state,(q.correctAnswer+1)%4),state);
  assert.equal(submitAnswer(state,'duplicate','2026-01-01T00:00:01Z'),state);
  assert.equal(state.queue,originalQueue);
  state=advanceQuestion(state);
  assert.equal(state.index,1);
  assert.equal(state.selectedAnswer,null);
  assert.equal(state.submitted,null);
  assert.equal(advanceQuestion(state),state);
  state=selectAnswer(state,(state.queue[1].correctAnswer+1)%4);
  state=submitAnswer(state,'second','2026-01-01T00:00:02Z');
  assert.equal(state.submitted?.result,'incorrect');
  state=advanceQuestion(state);
  assert.equal(state.complete,true);
  assert.equal(state.correct,1);
  assert.equal(state.queue.length,2);
  assert.equal(advanceQuestion(state),state);
  assert.equal(submitAnswer(state,'after-end','2026-01-01T00:00:03Z'),state);
});

test('subcategory filtering combines with category, difficulty and unseen/review modes',()=>{
  const history:QuickPracticeAttempt[]=[{id:'old',questionId:'calc-004',selectedAnswer:0,correct:false,at:'2026-01-01T00:00:00Z'}];
  const filter=(review:boolean,unseen:boolean)=>selectQuestions(questions,'Stochastic Calculus','easy',review,history,unseen,'Brownian motion properties').map(q=>q.id);
  assert.deepEqual(filter(false,false),['calc-001','calc-004']);
  assert.deepEqual(filter(false,true),['calc-001']);
  assert.deepEqual(filter(true,false),['calc-004']);
});
