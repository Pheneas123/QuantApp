import { quickMappings } from '../../learning/data/quickMappings';
import { stage2Questions } from './bank/stage2';
import probability from './bank/probability';
import batchA from './bank/batch-a';
import batchB from './bank/batch-b';
import finance from './bank/finance';
import programming from './bank/programming';
import machineLearning from './bank/machine-learning';
import statistics from './bank/statistics';
import measureTheory from './bank/measure-theory';
import stochasticProcesses from './bank/stochastic-processes';
import stochasticCalculus from './bank/stochastic-calculus';
import { validateMultipleChoiceBank, type MultipleChoiceQuestion } from './schema';

export { categories, curriculum } from '../../../data/curriculum';
export type { Category, Subcategory } from '../../../data/curriculum';
export { difficulties, difficultyLabels, questionTypes } from './schema';
export type { MultipleChoiceQuestion, Difficulty, MultipleChoiceQuestionType } from './schema';

// One validation pass across all files also detects duplicate IDs across subjects.
const bank: MultipleChoiceQuestion[] = [...probability, ...statistics, ...measureTheory, ...stochasticProcesses, ...stochasticCalculus, ...batchA, ...batchB, ...finance, ...programming, ...machineLearning, ...stage2Questions];
validateMultipleChoiceBank(bank);
export const questions = bank.map(q => ({ ...q, practiceMode: 'quick' as const, objectiveIds: quickMappings[q.id]?.objectiveIds ?? [] }));
