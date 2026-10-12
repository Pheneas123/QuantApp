import { useEffect,useRef,useState } from 'react';
import type { GuidedProblem } from './schema';
import { beginGuided,canResume,selectGuided,hintGuided,submitGuided,advanceGuided,guidedAttempt } from './guidedSession';
import { keys,upsert,writeRecords,recordReview,saveSafely,readRecords,toggleFlag,type GuidedSession } from './storage';
import { MathText } from '../../components/MathText';
import { ProgressiveHints } from '../../components/ProgressiveHints';
import { StudyTools } from '../../components/StudyTools';
import { useStudyShortcuts } from '../../components/useStudyShortcuts';
export function GuidedStudy({problem,onExit,onReference,onPractise}:{problem:GuidedProblem;onExit:()=>void;onReference:(id:string)=>void;onPractise:(id:string)=>void}) {
 const [session,setSession]=useState(()=>readRecords<GuidedSession>(keys.active).find(s=>s.problemId===problem.id&&canResume(s,problem))??null);
 const current=useRef(session),root=useRef<HTMLElement>(null),heading=useRef<HTMLHeadingElement>(null);
 const [selectedPolicy,setPolicy]=useState<'learning'|'assessment'>('learning');
 useEffect(()=>{heading.current?.focus();},[session?.index,session?.complete]);
 function commit(next:GuidedSession){current.current=next;setSession(next);saveSafely(()=>{writeRecords(keys.active,[...readRecords<GuidedSession>(keys.active).filter(s=>s.problemId!==next.problemId),next]);upsert(keys.guided,guidedAttempt(next,problem));});}
 function start(){commit(beginGuided(problem,selectedPolicy,new Date().toISOString()));}
 function select(index:number){const s=current.current;if(s)commit(selectGuided(s,index));}
 function hint(){const s=current.current;if(s)commit(hintGuided(s,problem));}
 function submit(){const s=current.current;if(s)commit(submitGuided(s,problem,new Date().toISOString()));}
 function finish(s:GuidedSession){
  commit(s);
  if(!s.complete)return;
  const correct=s.responses.filter(r=>r.correct).length;
  const saved=saveSafely(()=>recordReview({id:s.id,mode:'guided',itemId:problem.id,at:s.responses.at(-1)!.at,
   outcome:correct===problem.parts.length?'correct':correct===0?'incorrect':'partial',hints:s.responses.reduce((n,r)=>n+r.hints,0),objectiveIds:problem.objectiveIds,provenance:'assessed'}));
  if(saved&&!s.recorded)commit({...s,recorded:true});
 }
 function next(){const s=current.current;if(s&&!s.complete&&s.responses[s.index])finish(advanceGuided(s,problem));}
 useEffect(()=>{if(session?.complete&&!session.recorded)finish(session);},[]);
 useStudyShortcuts(root,{select:position=>{const s=current.current;if(s)select(s.answerOrders[s.index][position]);},submit:()=>{if(current.current?.responses[current.current.index])next();else submit();},next,hint,flag:()=>saveSafely(()=>toggleFlag({mode:'guided',itemId:problem.id}))});
 function feedback(index:number){const response=session?.responses[index];if(!response)return null;const part=problem.parts[index];return <section className="explanation" aria-label={`Part ${index+1} feedback`}><strong>{response.correct?'Correct':'Incorrect'}</strong><p>Correct answer: <MathText text={part.answers[part.correctAnswer]}/></p><MathText text={part.explanation}/><p className="subtle">{response.hints} hints used</p></section>;}
 const part=session?problem.parts[session.index]:null;
 const submitted=session?.responses[session.index];
 return <section ref={root} className="rich-content" aria-label="Guided problem"><div className="quiz-top"><button className="text-button" onClick={onExit}>Back to problems</button>{session&&<span>Part {session.index+1} / {problem.parts.length}</span>}</div><h1 ref={heading} tabIndex={-1} className="question">{problem.title}</h1>
 <div className="problem-statement"><MathText text={problem.statement}/>{problem.assumptions&&<p className="subtle"><MathText text={problem.assumptions}/></p>}</div>
 <StudyTools identity={{mode:'guided',itemId:problem.id}} objectiveIds={problem.objectiveIds} prerequisiteIds={problem.prerequisiteIds} knowledgeIds={problem.knowledgeIds} onReference={onReference} onPractise={onPractise}/>
 {!session?<><fieldset><legend>Feedback</legend><div className="difficulty"><button className={selectedPolicy==='learning'?'active':''} onClick={()=>setPolicy('learning')}>Learning</button><button className={selectedPolicy==='assessment'?'active':''} onClick={()=>setPolicy('assessment')}>Assessment</button></div></fieldset><p className="subtle">Learning shows feedback after each part. Assessment shows feedback and solutions after all parts.</p><button className="primary" onClick={start}>Start problem</button></>:
 session.complete?<><section className="feedback"><h2>Problem summary</h2><p>{session.responses.filter(r=>r.correct).length} / {problem.parts.length} parts correct · {session.responses.reduce((n,r)=>n+r.hints,0)} hints used</p><p>One completed Guided Problem with {problem.parts.length} assessed steps.</p></section>{problem.parts.map((part,i)=><details key={part.id}><summary>Part {i+1}: review</summary><MathText text={part.prompt}/>{feedback(i)}</details>)}<section className="explanation" aria-label="Worked solution"><h2>Complete worked solution</h2><MathText text={problem.solution}/></section><button className="primary" onClick={start}>Try again</button></>:
 <><h2 className="question"><MathText text={part!.prompt}/></h2><div className="answers" role="group" aria-label="Answer choices">{session.answerOrders[session.index].map((index,position)=><button key={index} data-answer-index={index} data-study-control disabled={!!submitted} aria-pressed={session.selectedAnswer===index} className={`answer ${session.selectedAnswer===index?'is-selected':''} ${submitted&&session.policy==='learning'&&index===part!.correctAnswer?'is-correct':''}`} onClick={()=>select(index)}><span className="letter">{'ABCD'[position]}</span><MathText text={part!.answers[index]}/></button>)}</div><ProgressiveHints hints={part!.hints} count={session.hints[session.index]} onReveal={hint} disabled={!!submitted}/>{submitted?<>{session.policy==='learning'?feedback(session.index):<p role="status">Answer recorded. Feedback follows completion.</p>}<button className="primary" data-study-control onClick={next}>{session.index===problem.parts.length-1?'Finish problem':'Next part'}</button></>:<button className="primary" data-study-control disabled={session.selectedAnswer===null} onClick={submit}>Submit</button>}
 {session.responses.slice(0,session.index).map((response,i)=><details key={response.partId}><summary>Submitted part {i+1}</summary><MathText text={problem.parts[i].prompt}/><p>Your answer: <MathText text={problem.parts[i].answers[response.selectedAnswer!]}/></p>{session.policy==='learning'&&feedback(i)}</details>)}</>}
 </section>;
}
