# Quick Practice question bank and curriculum

The shared `src/data/curriculum.ts` defines the eight subjects and their allowed topics, including topics with no questions yet. Add a topic to its subject's array to extend the taxonomy. Category and subcategory types are derived from these arrays; no duplicate lists need updating. Labels are also the stored taxonomy values. Renaming a topic requires updating its question records, but does not affect attempt history, which uses question IDs.

`schema.ts` defines `MultipleChoiceQuestion`, question types, and runtime validation. Shared difficulty values and metadata come from `src/data/studyMetadata.ts`. The category/subcategory pair is a discriminated union: assigning a topic to the wrong subject fails type checking. `bank/` contains one array per subject; split these into additional topic files as the bank grows and import them in `questions.ts`. The index validates the combined bank once, including ID uniqueness across files. The original 330 questions include the first 120-question revision bank and two reviewed 30-question additions in `bank/batch-a.ts` and `bank/batch-b.ts`, plus 100 Finance questions in ten topic modules under `bank/finance/`, and 25 each in `bank/programming.ts` and `bank/machine-learning.ts`; Stage 2 appends 120 records under `bank/stage2/` for **450 total**, with its explicit mappings in `stage2Mappings.ts` and reviewed additions in `stage2Objectives.ts`. They form a growing revision bank, not a final syllabus. See [content review notes](CONTENT_REVIEW.md) for the review scope, references and limitations.

Follow the British-English [content standard](../../../../CONTENT_STYLE.md) for all authored prose.

## Authoring

```ts
import type { MultipleChoiceQuestion } from '../schema';
const m = String.raw;

export default [{
  id: 'prob-expectation-001',
  category: 'Probability',
  subcategory: 'Expectation',
  difficulty: 'easy',
  questionType: 'short_calculation',
  prompt: m`If $X=2$ almost surely, what is $\mathbb E[X]$?`,
  answers: ['0', '1', '2', '4'],
  correctAnswer: 2,
  explanation: 'The expectation of a constant is that constant.',
  // Optional: workedSolution, tags, familyId, knowledgeIds.
}] satisfies MultipleChoiceQuestion[];
```

`prompt` is the question text. Answers are exactly four distinct, non-empty strings in A–D order. `correctAnswer` is a zero-based index (0–3). Text fields support LaTeX using `$...$`, `$$...$$`, `\(...\)`, or `\[...\]`. `String.raw` avoids doubling backslashes. Text is rendered as text/math, not HTML.

Optional fields:

- `explanation`: optional short explanation text, displayed automatically after correct, incorrect or unsure submissions with LaTeX support. Explain the reason and useful misconceptions; never refer to an answer letter or its position because choices are shuffled.
- `workedSolution`: optional full solution text, retained for future use; not currently shown in the Quick Practice quiz; Guided and Written solutions use their own schemas.
- `tags`: an array of non-empty strings; an empty array is allowed.
- `knowledgeIds`: optional distinct IDs from the [knowledge reference](../../../data/knowledge/README.md); targets are validated on import/build. Related links appear after submission and return without changing the quiz.
- `familyId`: a shared identifier for deliberate variants or complementary tests of one idea. Variants retain distinct question IDs and independent histories. Normal shuffling may include multiple members; there is no family sampling policy in V1.

Omit unused optional text fields rather than supplying empty strings. There is no separate degree/education-level field.

## Difficulty

- `easy`: undergraduate and accessible master's material; core definitions, common results, recognition and straightforward calculations.
- `medium`: primarily master's material and some deeper advanced material; subtle conditions, distinctions and stronger applications.
- `hard`: advanced graduate/PhD-style depth; demanding conditions, counterexamples and deeper implications.

Difficulty reflects actual reasoning demand, with prerequisite sophistication recorded separately. Direct recognition of a specialised theorem is not automatically Hard. UI labels remain Easy, Medium and Hard; Mixed is a filter, never a stored difficulty. For Finance, judge whether the prompt supplies a formula/strategy or requires the learner to construct it; no-arbitrage terminology alone does not imply Hard. Labels remain editorial judgements and need calibration against the eventual canonical curriculum.

## Question types

`definition_recall`, `definition_recognition`, `theorem_recall`, `theorem_conditions`, `property_recognition`, `concept_identification`, `true_false_conceptual`, `short_calculation`, `implication`, `counterexample_recognition`.

All types currently use the same four-choice interface. Answer order is randomised per session; bank indices remain stable for grading and saved history. `true_false_conceptual` still has four choices (for example, four candidate statements), not a two-choice boolean format. Type metadata does not change grading.

## Validation and compatibility

Run `npm run validate:bank` for field-level runtime validation, `npm test` for content/behaviour checks, or `npm run build` for validation plus TypeScript and the production build. Validation also runs on import in development, so malformed records fail immediately with an index, question ID, and field. It checks required and optional fields, allowed values, taxonomy membership, answer count and index, distinct answers, unique IDs, exact duplicate prompts (with whitespace normalised), and unknown fields. `npm run audit:bank` adds nonblocking answer-length and distribution reports. Tests also check sample LaTeX rendering; structural validation does not prove mathematical correctness.

Keep IDs stable and do not reuse one for a different question. The expansion retains 29 existing IDs for the same ideas and correct positions, with revised wording and distractors. The redundant `calc-005` variant is retired, never reassigned; its attempts remain in history. Existing localStorage attempts need no migration. History shows current question wording rather than an original-content snapshot. Family IDs do not replace question IDs. Historical correctness is captured at attempt time; changing a question's answer does not retroactively regrade old attempts.

No database, schema library, content generator, or new service is needed for this static bank. New data is bundled and precached with each app release. Category, populated subcategory, difficulty and practice mode combine to select an eligible pool. Session setup samples that pool without replacement; question type and tags remain metadata for possible future filters.

Finance uses stable descriptive `fin-` IDs. Every Finance question includes a self-contained explanation; no Finance references are linked yet. The initial batch and historical 300-question Finance target are documented in [FINANCE_REVIEW.md](FINANCE_REVIEW.md). Finance remains at 100 under the current [balanced roadmap](../../../../CURRICULUM_EXPANSION.md). Every calculation question is covered by an independent numerical or scenario check in `tests/finance.test.ts`.

## Programming and Machine Learning

Stage 1 adds ten subsections and 25 questions per category; see [STAGE_1_REVIEW.md](STAGE_1_REVIEW.md) for topic/difficulty counts, reference IDs, sources and executed checks. Existing schema fields and question types are unchanged. Use stable descriptive `prog-` and `ml-` IDs. All 50 initial questions have explanations and validated reference links.

Use line-delimited triple-backtick fences with an optional language tag (`python` or `cpp`) inside existing string fields. The opening fence, code and closing fence each begin on their own line. Preserve source indentation, use concise snippets, and specify Python 3 / C++20 / PyTorch 2.x assumptions in the prompt. In ordinary quoted TypeScript strings use `\n` for newlines and escape quotes/backslashes; when using a template literal, escape its backticks. Do not insert HTML or executable UI code. Fences render as syntax-coloured escaped code for the four supported languages (literal fallback for others) with preserved whitespace and horizontal scrolling; prose outside them retains KaTeX. Inline backticks are not a general Markdown feature.

Distinguish deterministic output from compilation errors, Python exceptions and C++ undefined behaviour. Do not claim a guaranteed output for undefined behaviour. Verify only deliberately reviewed bounded snippets, never arbitrary uploads. `npm run test:code` requires Python 3/NumPy and g++; it runs an explicit reviewed ID allowlist and never executes the UB examples. When changing an example, update its verification and inspect the exact displayed code at 320px and 390px. Code identifiers and APIs retain their exact spelling; the British-English guard audits prose outside fenced code.

For Programming, Easy covers basic output and data/complexity reasoning, Medium combines bindings, ownership, shapes or bugs, and Hard tests subtle lifetimes, invalidation, closure behaviour and numerical conditions. For ML, Easy covers direct calculations and basic model/validation diagnosis, Medium combines mathematical or implementation steps, and Hard covers stability, causal information flow, posterior identities and RL assumptions. Do not use obscure names alone to justify Hard; calibrate all labels during expansion. Later stages need broader algorithms, language features and model coverage rather than cosmetic variants.

## Shared learning infrastructure — Update 004

See [the complete platform authoring guide](../../../../docs/CONTENT_AUTHORING.md) for objective mappings, prerequisite links, progressive hints, three-mode templates and coverage reports. Shared metadata optionally accepts `practiceMode`, `objectiveIds`, `prerequisiteIds`, `hints` and `contentVersion`. Existing MCQs use a validated adapter with explicit mappings in `src/features/learning/data/quickMappings.ts`; no history migration runs. `validate:learning` requires explanations for the assembled static bank and checks mapped objective targets and simple choice equivalence while preserving case-sensitive mathematical symbols. Academic labels supersede historical difficulty quotas; the bank now contains 450. [Remediation decisions](../../../../docs/AUDIT_REMEDIATION.md) document the changes.
