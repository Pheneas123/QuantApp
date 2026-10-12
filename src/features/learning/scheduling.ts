import { itemKey, type ItemIdentity } from './schema';
export type ReviewOutcome = 'correct'|'partial'|'incorrect'|'unsure';
export interface ReviewEvent extends ItemIdentity {
 id: string; at: string; outcome: ReviewOutcome; hints: number; objectiveIds: string[];
 provenance: 'assessed'|'self-reported';
}
export interface ReviewSchedule extends ItemIdentity {
 id: string; state: 'learning'|'review'; due: string; intervalDays: number; ease: number;
 successes: number; lastReview: string; events: ReviewEvent[];
}
const DAY = 86_400_000;
/** Deterministic SM-2-inspired policy; UTC elapsed days, with assistance/provenance explicit. */
export function updateSchedule(previous: ReviewSchedule|undefined, event: ReviewEvent): ReviewSchedule {
 if (!Number.isFinite(Date.parse(event.at)) || !Number.isInteger(event.hints) || event.hints<0) throw Error('Invalid review event');
 if (previous?.events.some(e=>e.id===event.id)) return previous;
 if (previous && (previous.id !== itemKey(event) || Date.parse(event.at)<Date.parse(previous.lastReview))) throw Error('Review identity/time mismatch');
 const unaided = event.outcome === 'correct' && event.hints === 0;
 const successes = unaided ? (previous?.successes ?? 0)+1 : 0;
 const ease = Math.max(1.3, Math.min(3, (previous?.ease ?? 2.5) + (unaided ? 0.05 : event.outcome==='incorrect' || event.outcome==='unsure' ? -0.2 : -0.1)));
 const intervalDays = unaided ? successes===1 ? 1 : successes===2 ? 6 : Math.min(365,Math.round((previous?.intervalDays ?? 6)*ease)) : 1;
 return {mode:event.mode,itemId:event.itemId,id:itemKey(event),state:unaided&&successes>=2?'review':'learning',
  due:new Date(Date.parse(event.at)+intervalDays*DAY).toISOString(),intervalDays,ease,successes,lastReview:event.at,events:[...(previous?.events ?? []),event]};
}
export const isDue = (schedule: ReviewSchedule, now: number) => Date.parse(schedule.due)<=now;
/** Aggregate evidence, never a claim of mastery. Guided items contribute once per completed problem. */
export function objectiveEvidence(id: string, events: ReviewEvent[]) {
 const relevant=events.filter(e=>e.objectiveIds.includes(id));
 const unique=new Set(relevant.map(itemKey)).size;
 const assessed=relevant.filter(e=>e.provenance==='assessed');
 return {attempts:relevant.length,uniqueItems:unique,correct:assessed.filter(e=>e.outcome==='correct').length,
  assessed:assessed.length,hintAssisted:relevant.filter(e=>e.outcome==='correct'&&e.hints>0).length,
  writtenSuccess:relevant.filter(e=>e.provenance==='self-reported'&&e.outcome==='correct').length,
  insufficient:assessed.length<3 || new Set(assessed.map(itemKey)).size<2};
}
