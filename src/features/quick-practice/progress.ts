import type { MultipleChoiceQuestion, Difficulty } from './data/schema';
export type AttemptResult = 'correct' | 'incorrect' | 'unsure';
interface AttemptMetadata { id: string; questionId: string; at: string }
export type SubmittedAttempt = AttemptMetadata & (
  | { result: 'correct' | 'incorrect'; selectedAnswer: number; displayedAnswer?: number }
  | { result: 'unsure'; selectedAnswer?: never; displayedAnswer?: never }
);
/** Preserve old records verbatim; new submissions use result and never a boolean. */
type LegacyAttempt = AttemptMetadata & { correct: boolean; selectedAnswer: number; displayedAnswer?: number; result?: never };
export type QuickPracticeAttempt = SubmittedAttempt | LegacyAttempt;
export type QuickPracticeStatus = 'unseen' | AttemptResult;
export const STORAGE_KEY = 'quantapp.attempts.v1';
export function attemptResult(attempt: QuickPracticeAttempt): AttemptResult {
  return attempt.result ?? (('correct' in attempt && attempt.correct) ? 'correct' : 'incorrect');
}
export function answerAccuracy(correct: number, incorrect: number): number {
  return correct + incorrect ? Math.round(100 * correct / (correct + incorrect)) : 0;
}
export function attemptCounts(attempts: QuickPracticeAttempt[]) {
  const counts = { correct: 0, incorrect: 0, unsure: 0 };
  for (const attempt of attempts) counts[attemptResult(attempt)]++;
  return { ...counts, accuracy: answerAccuracy(counts.correct, counts.incorrect) };
}
export function parseAttempts(raw: string | null): QuickPracticeAttempt[] {
  if (!raw) return [];
  const data: unknown = JSON.parse(raw);
  const index = (n: unknown) => typeof n === 'number' && Number.isInteger(n) && n >= 0 && n < 4;
  if (!Array.isArray(data) || !data.every(a => {
    if (!a || typeof a.id !== 'string' || typeof a.questionId !== 'string' || typeof a.at !== 'string' || !Number.isFinite(Date.parse(a.at))) return false;
    if ('result' in a) {
      if ('correct' in a) return false; // Reject conflicting old/new representations.
      if (a.result === 'unsure') return !('selectedAnswer' in a) && !('displayedAnswer' in a);
      if (a.result !== 'correct' && a.result !== 'incorrect') return false;
    } else if (typeof a.correct !== 'boolean') return false;
    return index(a.selectedAnswer) && (a.displayedAnswer === undefined || index(a.displayedAnswer));
  })) throw new Error('Invalid history');
  return data;
}
export function statuses(attempts: QuickPracticeAttempt[]): Map<string, QuickPracticeStatus> {
  const result = new Map<string, QuickPracticeStatus>();
  for (const a of attempts) result.set(a.questionId, attemptResult(a));
  return result;
}
export function selectQuestions(bank:MultipleChoiceQuestion[], category:string, difficulty:Difficulty|'All', review:boolean|'unsure', attempts:QuickPracticeAttempt[], unseenOnly=false, subcategory='All'):MultipleChoiceQuestion[] {
 const latest=statuses(attempts);
 return bank.filter(q=>(category==='All'||q.category===category)&&(difficulty==='All'||q.difficulty===difficulty)&&(subcategory==='All'||q.subcategory===subcategory)&&(!review||latest.get(q.id)===(review==='unsure'?'unsure':'incorrect'))&&(!unseenOnly||!latest.has(q.id)));
}
export function shuffle<T>(items:T[], random= Math.random):T[] { const result=[...items]; for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1)); [result[i],result[j]]=[result[j],result[i]];} return result; }
