import { useEffect,useRef,useState } from 'react';
import { createAttemptId } from '../quick-practice/session';
import type { WrittenProblem } from './schema';
import { keys,readRecords,upsert,recordReview,saveSafely,toggleFlag,type WrittenDraft,type SelfAssessment } from './storage';
import { MathText } from '../../components/MathText';
import { ProgressiveHints } from '../../components/ProgressiveHints';
import { StudyTools } from '../../components/StudyTools';
import { useStudyShortcuts } from '../../components/useStudyShortcuts';
export function WrittenStudy({problem,onExit,onReference,onPractise}:{problem:WrittenProblem;onExit:()=>void;onReference:(id:string)=>void;onPractise:(id:string)=>void}) {
 const fresh=():WrittenDraft=>({id:problem.id,at:new Date().toISOString(),answer:'',hints:0,revealed:false,attemptId:createAttemptId(),assessed:false});
 const [draft,setDraft]=useState(()=>readRecords<WrittenDraft>(keys.drafts).find(d=>d.id===problem.id)??fresh());
 const current=useRef(draft),root=useRef<HTMLElement>(null),heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{heading.current?.focus();},[]);
 function commit(next:WrittenDraft){current.current=next;setDraft(next);saveSafely(()=>upsert(keys.drafts,next));}
 function hint(){const d=current.current;if(!d.revealed&&d.hints<(problem.hints?.length??0))commit({...d,hints:d.hints+1,at:new Date().toISOString()});}
 function reveal(){const d=current.current;if(d.answer.trim()&&!d.revealed)commit({...d,revealed:true,at:new Date().toISOString()});}
 function assess(assessment:SelfAssessment){const d=current.current;if(!d.revealed||d.assessed)return;
  const at=new Date().toISOString();const next={...d,assessed:true,at};
  const saved=saveSafely(()=>{
   upsert(keys.written,{id:d.attemptId,problemId:problem.id,at,assessment,hints:d.hints,revealed:true,objectiveIds:problem.objectiveIds,answer:d.answer});
   recordReview({id:d.attemptId,mode:'written',itemId:problem.id,at,outcome:assessment,hints:d.hints,objectiveIds:problem.objectiveIds,provenance:'self-reported'});
   upsert(keys.drafts,next);
  });if(saved){current.current=next;setDraft(next);}
 }
 useStudyShortcuts(root,{hint,flag:()=>saveSafely(()=>toggleFlag({mode:'written',itemId:problem.id}))});
 function retry(){if(current.current.answer&&!current.current.assessed&&!window.confirm('Start a fresh answer? This replaces the current draft. Export a backup first if you want to keep it.'))return;commit(fresh());}
 return <section ref={root} className="rich-content" aria-label="Written problem"><button className="text-button" onClick={onExit}>Back to problems</button><h1 ref={heading} tabIndex={-1} className="question">{problem.title}</h1><div className="problem-statement"><MathText text={problem.statement}/>{problem.assumptions&&<p className="subtle"><MathText text={problem.assumptions}/></p>}{problem.subparts&&<ol>{problem.subparts.map(s=><li key={s}><MathText text={s}/></li>)}</ol>}</div>
 <StudyTools identity={{mode:'written',itemId:problem.id}} objectiveIds={problem.objectiveIds} prerequisiteIds={problem.prerequisiteIds} knowledgeIds={problem.knowledgeIds} onReference={onReference} onPractise={onPractise}/>
 <ProgressiveHints hints={problem.hints} count={draft.hints} onReveal={hint} disabled={draft.revealed}/>
 <div className="written-workspace"><div><label htmlFor="written-answer">Your answer</label><p id="answer-guidance" className="subtle">Plain text is fine. Use $x^2$ for inline maths, $$...$$ for block equations, and fenced code with python, cpp, js or ts. Drafts save on this device as you type.</p><textarea id="written-answer" aria-describedby="answer-guidance" value={draft.answer} readOnly={draft.assessed} onChange={event=>commit({...current.current,answer:event.target.value,at:new Date().toISOString()})}/></div><section className="answer-preview" aria-label="Answer preview"><h2>Preview</h2>{draft.answer?<MathText text={draft.answer}/>:<p className="subtle">Your formatted answer appears here.</p>}</section></div>
 {!draft.revealed?<button className="primary" data-study-control disabled={!draft.answer.trim()} onClick={reveal}>Reveal worked solution</button>:<><section className="explanation" aria-label="Worked solution"><h2>Worked solution</h2><MathText text={problem.solution}/></section><section className="explanation"><h2>Self-assessment criteria</h2><ul>{problem.criteria.map(c=><li key={c}><MathText text={c}/></li>)}</ul><p className="subtle">This assessment is self-reported; QuantApp does not automatically grade your written work.</p><div className="difficulty practice-modes">{([['correct','Correct'],['partial','Partially Correct'],['incorrect','Incorrect'],['unsure','Not Sure']] as const).map(([value,label])=><button key={value} data-study-control disabled={draft.assessed} onClick={()=>assess(value)}>{label}</button>)}</div>{draft.assessed&&<p role="status">Self-assessment saved. Your answer is retained in history and in this draft.</p>}</section></>}
 <button className="text-button" onClick={retry}>Start a fresh answer</button></section>;
}
