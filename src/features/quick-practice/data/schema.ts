import { curriculum, type Category } from '../../../data/curriculum';
import { knowledgeIdSet } from '../../../data/knowledge';

import { difficulties, type StudyMetadata } from '../../../data/studyMetadata';
export { difficulties, difficultyLabels } from '../../../data/studyMetadata';
export type { Difficulty } from '../../../data/studyMetadata';

export const questionTypes = [
  'definition_recall', 'definition_recognition', 'theorem_recall', 'theorem_conditions',
  'property_recognition', 'concept_identification', 'true_false_conceptual',
  'short_calculation', 'implication', 'counterexample_recognition',
] as const;
export type MultipleChoiceQuestionType = typeof questionTypes[number];
interface MultipleChoiceFields {
  questionType: MultipleChoiceQuestionType;
  /** Plain text with optional LaTeX delimiters; not HTML. */
  prompt: string;
  answers: [string, string, string, string];
  /** Zero-based answer index: A=0, B=1, C=2, D=3. */
  correctAnswer: 0 | 1 | 2 | 3;
  explanation?: string;
  workedSolution?: string;
  /** Shared idea, distinct question IDs. Does not merge progress or limit sampling. */
  familyId?: string;
  /** Stable references; never used to grade or store attempts. */
  knowledgeIds?: string[];
}

// Shared metadata retains the category/subcategory union; the answer contract stays strict.
export type MultipleChoiceQuestion = StudyMetadata & MultipleChoiceFields;

const fields = new Set(['id', 'category', 'subcategory', 'difficulty', 'questionType', 'prompt',
  'answers', 'correctAnswer', 'explanation', 'workedSolution', 'tags', 'familyId', 'knowledgeIds', 'practiceMode', 'objectiveIds', 'prerequisiteIds', 'hints', 'contentVersion']);
const nonempty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

/** Validate imported data as well as typed authoring. Report all errors with question/field paths. */
export function validateMultipleChoiceBank(data: unknown, referenceIds: ReadonlySet<string> = knowledgeIdSet): asserts data is MultipleChoiceQuestion[] {
  if (!Array.isArray(data)) throw new Error('Invalid question bank: expected an array.');
  const errors: string[] = [];
  const ids = new Set<string>();
  const prompts = new Map<string, string>();
  data.forEach((value: unknown, index) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      errors.push(`[${index}]: expected a question object`);
      return;
    }
    const q = value as Record<string, unknown>;
    const path = `[${index}]${nonempty(q.id) ? ` (${q.id})` : ''}`;
    const error = (field: string, message: string) => errors.push(`${path}.${field}: ${message}`);
    if (nonempty(q.prompt)) {
      const normalized = q.prompt.trim().replace(/\s+/g, ' ');
      const previous = prompts.get(normalized);
      if (previous) error('prompt', `duplicate question text (also ${previous})`);
      else prompts.set(normalized, path);
    }
    for (const field of Object.keys(q)) if (!fields.has(field)) error(field, 'unknown field');
    for (const field of ['id', 'prompt']) if (!nonempty(q[field])) error(field, 'expected a non-empty string');
    if (nonempty(q.id)) {
      if (ids.has(q.id)) error('id', 'duplicate question ID');
      ids.add(q.id);
    }
    if (typeof q.category !== 'string' || !Object.hasOwn(curriculum, q.category)) {
      error('category', 'unknown curriculum category');
    } else if (!(curriculum[q.category as Category] as readonly unknown[]).includes(q.subcategory)) {
      error('subcategory', `must belong to ${q.category}`);
    }
    if (!(difficulties as readonly unknown[]).includes(q.difficulty)) error('difficulty', 'expected easy, medium or hard');
    if (!(questionTypes as readonly unknown[]).includes(q.questionType)) error('questionType', 'unknown question type');
    if (!Array.isArray(q.answers) || q.answers.length !== 4 || !q.answers.every(nonempty)) {
      error('answers', 'expected exactly four non-empty strings');
    } else if (new Set(q.answers.map(a => a.trim())).size !== 4) {
      error('answers', 'answer choices must be distinct');
    }
    if (typeof q.correctAnswer !== 'number' || !Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer > 3) {
      error('correctAnswer', 'expected a zero-based integer from 0 to 3');
    }
    for (const field of ['explanation', 'workedSolution', 'familyId']) {
      if (field in q && !nonempty(q[field])) error(field, 'omit this field or provide a non-empty string');
    }
    for (const field of ['objectiveIds', 'prerequisiteIds', 'hints']) if (field in q && (!Array.isArray(q[field]) || !(q[field] as unknown[]).every(nonempty))) error(field, 'expected non-empty strings');
    if ('practiceMode' in q && q.practiceMode !== 'quick') error('practiceMode', 'expected quick');
    if ('contentVersion' in q && (!Number.isInteger(q.contentVersion) || Number(q.contentVersion) < 1)) error('contentVersion', 'expected positive integer');
    if ('tags' in q && (!Array.isArray(q.tags) || !q.tags.every(nonempty))) error('tags', 'expected an array of non-empty strings');
    if ('knowledgeIds' in q) {
      if (!Array.isArray(q.knowledgeIds) || !q.knowledgeIds.every(nonempty) || new Set(q.knowledgeIds).size !== q.knowledgeIds.length) {
        error('knowledgeIds', 'expected distinct non-empty reference IDs');
      } else for (const id of q.knowledgeIds) if (!referenceIds.has(id)) error('knowledgeIds', `missing reference target: ${id}`);
    }
  });
  if (errors.length) throw new Error(`Invalid question bank (${errors.length} errors):\n${errors.join('\n')}`);
}
