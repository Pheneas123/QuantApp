import { shuffle } from '../quick-practice/progress';
import { createAttemptId } from '../quick-practice/session';
import type { GuidedProblem } from './schema';
import type { GuidedSession, GuidedAttempt } from './storage';
export function beginGuided(problem:GuidedProblem,policy:'learning'|'assessment',at:string,random=Math.random):GuidedSession {
 return {id:createAttemptId(),at,problemId:problem.id,policy,responses:[],index:0,selectedAnswer:null,hints:problem.parts.map(()=>0),answerOrders:problem.parts.map(()=>shuffle([0,1,2,3],random)),complete:false,contentVersion:problem.contentVersion??1,recorded:false};
}
export function canResume(session:GuidedSession,problem:GuidedProblem) {
 if(session.complete&&(session.index!==problem.parts.length-1||session.responses.length!==problem.parts.length))return false;
 if(session.recorded&&!session.complete)return false;
 if(session.responses.some((r,i)=>r.selectedAnswer===null||r.hints!==session.hints[i]))return false;
 if(session.responses[session.index]&&session.selectedAnswer!==session.responses[session.index].selectedAnswer)return false;
 return session.problemId===problem.id&&session.contentVersion===(problem.contentVersion??1)&&session.hints.length===problem.parts.length&&session.answerOrders.length===problem.parts.length&&session.index<problem.parts.length&&session.responses.length<=problem.parts.length&&session.responses.every((r,i)=>r.partId===problem.parts[i].id&&r.hints<= (problem.parts[i].hints?.length??0)&&r.correct===(r.selectedAnswer===problem.parts[i].correctAnswer))&&session.responses.length>=session.index&&session.responses.length<=session.index+1&&session.hints.every((n,i)=>n<=(problem.parts[i].hints?.length??0));
}
export function selectGuided(s:GuidedSession,index:number):GuidedSession {
 return s.complete||s.responses[s.index]||!s.answerOrders[s.index]?.includes(index)?s:{...s,selectedAnswer:index};
}
export function hintGuided(s:GuidedSession,p:GuidedProblem):GuidedSession {
 if(s.complete||s.responses[s.index]||s.hints[s.index]>=(p.parts[s.index].hints?.length??0))return s;
 const hints=[...s.hints];hints[s.index]++;return {...s,hints};
}
export function submitGuided(s:GuidedSession,p:GuidedProblem,at:string):GuidedSession {
 if(s.complete||s.responses[s.index]||s.selectedAnswer===null)return s;
 const part=p.parts[s.index];return {...s,responses:[...s.responses,{partId:part.id,selectedAnswer:s.selectedAnswer,correct:s.selectedAnswer===part.correctAnswer,hints:s.hints[s.index],at}]};
}
export function advanceGuided(s:GuidedSession,p:GuidedProblem):GuidedSession {
 if(s.complete||!s.responses[s.index])return s;
 return s.index===p.parts.length-1?{...s,complete:true}:{...s,index:s.index+1,selectedAnswer:null};
}
export function guidedAttempt(s:GuidedSession,p:GuidedProblem):GuidedAttempt {
 return {id:s.id,problemId:p.id,at:s.responses.at(-1)?.at??s.at,responses:s.responses,complete:s.complete,
 performance:s.responses.length?s.responses.filter(r=>r.correct).length/s.responses.length:0,objectiveIds:p.objectiveIds,policy:s.policy,contentVersion:s.contentVersion};
}
