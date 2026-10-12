import { curriculum, type Category } from '../../data/curriculum';
import type { Difficulty, MultipleChoiceQuestion } from './data/schema';
import { selectQuestions, type QuickPracticeAttempt } from './progress';

export const practiceModes = [
  { value: 'practice', label: 'Practice' },
  { value: 'incorrect', label: 'Review Incorrect' },
  { value: 'unsure', label: 'Review Unsure' },
  { value: 'unseen', label: 'Unseen Only' },
] as const;
export type PracticeMode = typeof practiceModes[number]['value'];
export interface PracticeFilters {
  category: Category | 'All';
  subcategory: string;
  difficulty: Difficulty | 'All';
  mode: PracticeMode;
}
export const defaultFilters: PracticeFilters = {
  category: 'All', subcategory: 'All', difficulty: 'All', mode: 'practice',
};

/** Keep curriculum order, but omit topics with no content. Other filters do not hide topics. */
export function availableSubcategories(bank: MultipleChoiceQuestion[], category: Category | 'All'): string[] {
  if (category === 'All') return [];
  const populated = new Set(bank.filter(q => q.category === category).map(q => q.subcategory));
  return curriculum[category].filter(topic => populated.has(topic));
}

export function changeCategory(bank: MultipleChoiceQuestion[], filters: PracticeFilters, category: Category | 'All'): PracticeFilters {
  const valid = availableSubcategories(bank, category).includes(filters.subcategory);
  return { ...filters, category, subcategory: valid ? filters.subcategory : 'All' };
}

export function eligibleQuestions(bank: MultipleChoiceQuestion[], filters: PracticeFilters, attempts: QuickPracticeAttempt[]) {
  return selectQuestions(bank, filters.category, filters.difficulty, filters.mode === 'unsure' ? 'unsure' : filters.mode === 'incorrect', attempts,
    filters.mode === 'unseen', filters.category === 'All' ? 'All' : filters.subcategory);
}
