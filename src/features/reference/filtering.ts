import { curriculum, type Category } from '../../data/curriculum';
import type { KnowledgeObject, KnowledgeType } from '../../data/knowledge';

export interface ReferenceFilters { category: Category | 'All'; subcategory: string; type: KnowledgeType | 'All' }
export const defaultReferenceFilters: ReferenceFilters = { category: 'All', subcategory: 'All', type: 'All' };
export function referenceSubcategories(bank: KnowledgeObject[], category: Category | 'All') {
  if (category === 'All') return [];
  return curriculum[category].filter(topic => bank.some(k => k.category === category && k.subcategory === topic));
}
export function filterKnowledge(bank: KnowledgeObject[], filters: ReferenceFilters) {
  return bank.filter(k => (filters.category === 'All' || k.category === filters.category) &&
    (filters.category === 'All' || filters.subcategory === 'All' || k.subcategory === filters.subcategory) &&
    (filters.type === 'All' || k.type === filters.type));
}
