// Compile-time boundaries checked by `tsc -b` during every production build.
import type { StudyMetadata } from '../src/data/studyMetadata';
import type { MultipleChoiceQuestion } from '../src/features/quick-practice/data/schema';

type Assert<T extends true> = T;
type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

type MetadataKeys = Assert<Equal<keyof StudyMetadata, 'id' | 'category' | 'subcategory' | 'difficulty' | 'tags' | 'practiceMode' | 'objectiveIds' | 'prerequisiteIds' | 'hints' | 'contentVersion'>>;
type MultipleChoiceSharesMetadata = Assert<MultipleChoiceQuestion extends StudyMetadata ? true : false>;
type FourRequiredChoices = Assert<Equal<MultipleChoiceQuestion['answers'], [string, string, string, string]>>;
type RequiredCorrectAnswer = Assert<Equal<MultipleChoiceQuestion['correctAnswer'], 0 | 1 | 2 | 3>>;
type CorrectCategoryPair = Assert<Extract<StudyMetadata, { category: 'Probability' }>['subcategory'] extends 'Stopping times' ? false : true>;

// Metadata alone is reusable but must not satisfy the multiple-choice contract.
const metadata: StudyMetadata = { id: 'test', category: 'Probability', subcategory: 'Expectation', difficulty: 'easy' };
// @ts-expect-error Multiple-choice questions require prompt, type, choices and correct answer.
const incompleteQuestion: MultipleChoiceQuestion = metadata;
// @ts-expect-error The shared metadata also preserves category/subcategory membership.
const wrongTopic: StudyMetadata = { id: 'test', category: 'Probability', subcategory: 'Stopping times', difficulty: 'easy' };
