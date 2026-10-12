import { curriculum, type Category, type Subcategory } from '../../data/curriculum';
import { difficulties, type StudyMetadata } from '../../data/studyMetadata';
import { knowledgeIdSet } from '../../data/knowledge';
export const studyModes = ['quick', 'guided', 'written'] as const;
export type StudyMode = typeof studyModes[number];
export type ItemIdentity = { mode: StudyMode; itemId: string };
export const itemKey = ({ mode, itemId }: ItemIdentity) => `${mode}:${itemId}`;
export interface LearningObjective {
 id: string; category: Category; subcategories: Subcategory[]; description: string;
 knowledgeIds?: string[]; prerequisiteIds?: string[];
}
export interface ItemMapping { objectiveIds: string[]; familyId?: string }
export type EducationalMetadata = StudyMetadata & {
 practiceMode: StudyMode; objectiveIds: string[]; prerequisiteIds?: string[]; knowledgeIds?: string[];
 hints?: string[]; familyId?: string; contentVersion?: number;
};
export interface GuidedPart {
 id: string; order: number; prompt: string; answers: [string,string,string,string];
 correctAnswer: 0|1|2|3; explanation: string; hints?: string[]; knowledgeIds?: string[];
}
export type GuidedProblem = EducationalMetadata & { practiceMode: 'guided'; title: string; statement: string; assumptions?: string; parts: GuidedPart[]; solution: string };
export type WrittenProblem = EducationalMetadata & { practiceMode: 'written'; title: string; statement: string; assumptions?: string; subparts?: string[]; solution: string; criteria: string[] };
const text = (v: unknown): v is string => typeof v === 'string' && !!v.trim();
const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const list = (v: unknown): v is string[] => Array.isArray(v) && v.every(text) && new Set(v).size === v.length;
export function validateObjectives(data: unknown): asserts data is LearningObjective[] {
 if (!Array.isArray(data)) throw Error('Objectives must be an array');
 const ids = new Set<string>();
 for (const o of data) {
  if (!object(o) || !text(o.id) || ids.has(o.id) || !text(o.description)) throw Error('Invalid/duplicate objective ID or description');
  ids.add(o.id);
  if (!Object.hasOwn(curriculum, String(o.category)) || !list(o.subcategories) || !o.subcategories.length || o.subcategories.some(s => !(curriculum[o.category as Category] as readonly string[]).includes(s))) throw Error(`Invalid objective taxonomy: ${o.id}`);
  if (o.knowledgeIds !== undefined && (!list(o.knowledgeIds) || o.knowledgeIds.some(id => !knowledgeIdSet.has(id)))) throw Error(`Invalid objective reference: ${o.id}`);
  if (o.prerequisiteIds !== undefined && !list(o.prerequisiteIds)) throw Error(`Invalid prerequisites: ${o.id}`);
 }
 const byId = new Map(data.map(o => [o.id, o]));
 const active = new Set<string>(), done = new Set<string>();
 function visit(id: string) {
  if (active.has(id)) throw Error(`Prerequisite cycle: ${id}`);
  if (done.has(id)) return;
  const o = byId.get(id); if (!o) throw Error(`Unknown prerequisite: ${id}`);
  active.add(id); for (const p of o.prerequisiteIds ?? []) { if (p === id) throw Error(`Self prerequisite: ${id}`); visit(p); }
  active.delete(id); done.add(id);
 }
 for (const id of ids) visit(id);
}
/** Conservative deterministic equivalence only; mathematical equivalence still needs review. */
export function choiceIdentity(s: string) {
 const normal = s.trim().replace(/\$/g,'').replace(/\s+/g,' ');
 return /^[+-]?\d+(?:\.\d+)?$/.test(normal) ? String(Number(normal)) : normal;
}
export function validateProblems(data: unknown, mode: 'guided'|'written', objectives: readonly LearningObjective[]): asserts data is (GuidedProblem|WrittenProblem)[] {
 if (!Array.isArray(data)) throw Error('Problems must be an array');
 const ids = new Set<string>(), partIds = new Set<string>(), prompts = new Set<string>();
 const objectiveIds = new Set(objectives.map(o => o.id));
 const refs = (v: unknown) => v === undefined || (list(v) && v.every(id => knowledgeIdSet.has(id)));
 const hints = (v: unknown) => v === undefined || (Array.isArray(v) && v.every(text));
 for (const p of data) {
  if (!object(p) || !text(p.id) || ids.has(p.id) || p.practiceMode !== mode || !text(p.title) || !text(p.statement) || !text(p.solution)) throw Error('Invalid/duplicate problem or missing model solution');
  ids.add(p.id);
  const prompt = p.statement.trim().replace(/\s+/g,' '); if (prompts.has(prompt)) throw Error(`Duplicate problem statement: ${p.id}`); prompts.add(prompt);
  if (!Object.hasOwn(curriculum,String(p.category)) || !(curriculum[p.category as Category] as readonly unknown[]).includes(p.subcategory) || !(difficulties as readonly unknown[]).includes(p.difficulty)) throw Error(`Invalid problem taxonomy/difficulty: ${p.id}`);
  if (!list(p.objectiveIds) || !p.objectiveIds.length || p.objectiveIds.some(id => !objectiveIds.has(id))) throw Error(`Missing objective: ${p.id}`);
  if (p.prerequisiteIds !== undefined && (!list(p.prerequisiteIds) || p.prerequisiteIds.some(id => !objectiveIds.has(id)))) throw Error(`Invalid item prerequisites: ${p.id}`);
  if (!refs(p.knowledgeIds) || !hints(p.hints) || (p.assumptions !== undefined && !text(p.assumptions)) || (p.familyId !== undefined && !text(p.familyId)) || (p.contentVersion !== undefined && (!Number.isInteger(p.contentVersion) || Number(p.contentVersion)<1))) throw Error(`Invalid references/hints/metadata: ${p.id}`);
  if (mode === 'guided') {
   if (!Array.isArray(p.parts) || !p.parts.length) throw Error(`Missing parts: ${p.id}`);
   p.parts.forEach((part: unknown, i: number) => {
    if (!object(part) || !text(part.id) || partIds.has(part.id) || part.order !== i+1 || !text(part.prompt) || !text(part.explanation) || !Array.isArray(part.answers) || part.answers.length !== 4 || !part.answers.every(text) || new Set(part.answers.map(choiceIdentity)).size !== 4 || !Number.isInteger(part.correctAnswer) || Number(part.correctAnswer)<0 || Number(part.correctAnswer)>3 || !hints(part.hints) || !refs(part.knowledgeIds)) throw Error(`Invalid part ordering/answers/explanation/hints: ${p.id} part ${i+1}`);
    partIds.add(part.id);
   });
  } else if (!list(p.criteria) || !p.criteria.length || (p.subparts !== undefined && !list(p.subparts))) throw Error(`Missing written criteria/invalid subparts: ${p.id}`);
 }
}
