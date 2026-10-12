import type { Category, Subcategory } from './curriculum';

export const difficulties = ['easy', 'medium', 'hard'] as const;
export type Difficulty = typeof difficulties[number];
export const difficultyLabels: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

/** Shared descriptive metadata only: no answer format, grading or attempt semantics. */
export type StudyMetadata = {
  [C in Category]: {
    /** Stable within the owning study mode; never reuse for a different item. */
    id: string;
    category: C;
    subcategory: Subcategory<C>;
    difficulty: Difficulty;
    tags?: string[];
    practiceMode?: 'quick' | 'guided' | 'written';
    objectiveIds?: string[];
    prerequisiteIds?: string[];
    hints?: string[];
    contentVersion?: number;
  }
}[Category];
