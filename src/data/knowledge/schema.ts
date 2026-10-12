import { curriculum, type Category, type Subcategory } from '../curriculum';

export const knowledgeTypes = ['definition', 'theorem', 'lemma', 'proposition', 'corollary', 'key_result'] as const;
export type KnowledgeType = typeof knowledgeTypes[number];
export const knowledgeTypeLabels: Record<KnowledgeType, string> = {
  definition: 'Definition', theorem: 'Theorem', lemma: 'Lemma', proposition: 'Proposition',
  corollary: 'Corollary', key_result: 'Key result',
};
/** Reference metadata is independent of question format, difficulty and progress. */
export type KnowledgeObject = {
  [C in Category]: {
    id: string; name: string; type: KnowledgeType; category: C; subcategory: Subcategory<C>;
    statement: string; assumptions?: string; conclusion?: string; intuition?: string; notation?: string;
    relatedKnowledgeIds?: string[]; tags?: string[];
  }
}[Category];

const fields = new Set(['id', 'name', 'type', 'category', 'subcategory', 'statement', 'assumptions',
  'conclusion', 'intuition', 'notation', 'relatedKnowledgeIds', 'tags']);
const nonempty = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
export function validateKnowledgeBank(data: unknown): asserts data is KnowledgeObject[] {
  if (!Array.isArray(data)) throw new Error('Invalid knowledge bank: expected an array');
  const ids = new Set<string>();
  const errors: string[] = [];
  data.forEach((value: unknown, index) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) { errors.push(`[${index}]: expected an object`); return; }
    const q = value as Record<string, unknown>;
    const path = `[${index}] (${q.id ?? '?'})`;
    const error = (field: string, message: string) => errors.push(`${path}.${field}: ${message}`);
    for (const field of Object.keys(q)) if (!fields.has(field)) error(field, 'unknown field');
    for (const field of ['id', 'name', 'statement']) if (!nonempty(q[field])) error(field, 'expected non-empty text');
    if (nonempty(q.id)) { if (ids.has(q.id)) error('id', 'duplicate knowledge ID'); ids.add(q.id); }
    if (!(knowledgeTypes as readonly unknown[]).includes(q.type)) error('type', 'unknown knowledge type');
    if (typeof q.category !== 'string' || !Object.hasOwn(curriculum, q.category)) error('category', 'unknown category');
    else if (!(curriculum[q.category as Category] as readonly unknown[]).includes(q.subcategory)) error('subcategory', 'must belong to category');
    for (const field of ['assumptions', 'conclusion', 'intuition', 'notation']) if (field in q && !nonempty(q[field])) error(field, 'omit or provide non-empty text');
    for (const field of ['relatedKnowledgeIds', 'tags']) if (field in q) {
      const values = q[field];
      if (!Array.isArray(values) || !values.every(nonempty) || new Set(values).size !== values.length) error(field, 'expected distinct non-empty strings');
    }
  });
  data.forEach((q, index) => {
    if (q && Array.isArray(q.relatedKnowledgeIds)) for (const id of q.relatedKnowledgeIds) {
      if (!ids.has(id)) errors.push(`[${index}] (${q.id}).relatedKnowledgeIds: missing target ${id}`);
      if (id === q.id) errors.push(`[${index}] (${q.id}).relatedKnowledgeIds: self-reference`);
    }
  });
  if (errors.length) throw new Error(`Invalid knowledge bank:\n${errors.join('\n')}`);
}
