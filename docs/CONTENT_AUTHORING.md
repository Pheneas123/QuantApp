# Learning content authoring

QuantApp uses one taxonomy (`src/data/curriculum.ts`), one escaped prose/maths/code renderer (`MathText`) and three content contracts. Add content to data modules and explicit objective mappings; components and storage do not need changing for each exercise. Preserve stable IDs, canonical answers and existing progress. The current bank has 450 MCQs, six Guided Problems and six Written Problems.

Use British English, explicit mathematical/programming assumptions, plausible distractors and independently checked explanations. Keep language/API identifiers literal. Difficulty follows reasoning demand; specialised terminology does not make recognition Hard. New concepts need directly supporting Reference links.

## Shared metadata and objectives

Stable item IDs identify the same educational task permanently. Never reuse IDs or change answer meanings without an explicit remediation review. New modes require `practiceMode`, `objectiveIds`, category/subcategory and difficulty. Optional shared fields are `prerequisiteIds`, `knowledgeIds`, ordered string `hints`, `familyId` and positive integer `contentVersion`. MCQs keep optional metadata through a backwards-compatible adapter; explicit reviewed mappings live in `src/features/learning/data/quickMappings.ts`. Change a Guided Problem’s content version when part IDs/order/meaning change: incompatible interrupted sessions remain stored but are not resumed against a changed problem. Resume also rejects inconsistent completion, recorded state, selected responses or hint counts.

Add objectives to `src/features/learning/data/objectives.ts`. Each describes an observable competency, not just a topic name. Categories and every relevant subsection must be valid. Links in `prerequisiteIds` mean each listed objective precedes this objective; cross-category links are allowed, self-links and cycles are rejected. Link a Reference only if it states the relevant result or clearly identified foundation. Uncertain objective mappings should be left empty and reported, rather than manufactured to improve percentages.

```ts
const objective = {
  id: 'lo-example-bayes', category: 'Probability',
  subcategories: ['Conditional probability'],
  description: 'Compute a posterior event probability using base rates and conditional test rates.',
  knowledgeIds: [], prerequisiteIds: ['lo-probability-conditional-probability'],
} satisfies LearningObjective;
```

This specific posterior-computation objective builds on the existing conditional-probability competency. Review every dependency individually.

The initial registry has broad curriculum competencies and more specific shared competencies. A subsection-level mapping does not prove that every skill in a composite objective is assessed. Coverage reports identify repeated families, recognition-only evidence and weak subsections; future expansion should split competencies where that improves diagnosis. Shared variance/UI/lifetime mappings prevent counting repeated constructions as unrelated breadth. Item identities are `mode:itemId`, while objectives remain independent of format.

## Quick Practice template

Add the object to its subject module under `src/features/quick-practice/data/bank/`. Import new modules in `questions.ts` if needed. Add a reviewed mapping to `quickMappings.ts`; its objective IDs must exist.

```ts
const m = String.raw;
const example = {
  id: 'prob-constant-expectation-example', category: 'Probability',
  subcategory: 'Expectation', difficulty: 'easy', questionType: 'short_calculation',
  prompt: m`If $X=2$ almost surely, what is $E[X]$?`,
  answers: ['0', '1', '2', '4'], correctAnswer: 2,
  explanation: 'The expectation of a constant equals that constant.',
  hints: ['Use the definition of expectation for a deterministic value.'],
  objectiveIds: ['lo-probability-expectation'],
} satisfies MultipleChoiceQuestion;
// quickMappings['prob-constant-expectation-example'] = { objectiveIds: ['lo-probability-expectation'] };
```

All four choices must be distinct and exactly one mathematically defensible answer must remain under the standalone prompt’s assumptions. Big-O questions should ask for a tightest bound when larger bounds are also true. Canonical indices stay fixed; UI answer orders are shuffled.

## Guided Problem template

Add to `src/features/learning/data/guided.ts` (or import a new content module there). Each part has a globally unique stable ID and contiguous one-based order. Parts are four-choice MCQs, not independent Quick Practice records. Supply a complete final solution as well as each local explanation.

```ts
const problem = {
  id: 'guided-fair-dice-example', practiceMode: 'guided', contentVersion: 1,
  title: 'Conditioning on an even die roll', category: 'Probability',
  subcategory: 'Conditional probability', difficulty: 'easy',
  objectiveIds: ['lo-probability-conditional-probability'],
  statement: 'A fair six-sided die is rolled. Given that the result is even, find the probability that it exceeds three.',
  assumptions: 'All six faces are equally likely.',
  parts: [
    { id: 'fair-dice-even-space', order: 1,
      prompt: 'How many equally likely outcomes remain after conditioning on even?',
      answers: ['1', '2', '3', '6'], correctAnswer: 2,
      explanation: 'The remaining outcomes are 2, 4 and 6.',
      hints: ['List the even faces.'] },
    { id: 'fair-dice-favourable', order: 2,
      prompt: 'How many remaining outcomes exceed three?',
      answers: ['1', '2', '3', '4'], correctAnswer: 1,
      explanation: 'Of the even faces, 4 and 6 exceed three.',
      hints: ['Apply the second event inside the conditioned sample space.'] },
    { id: 'fair-dice-ratio', order: 3,
      prompt: 'What is the conditional probability?',
      answers: ['1/6', '1/3', '1/2', '2/3'], correctAnswer: 3,
      explanation: 'Two of the three equally likely conditional outcomes are favourable.',
      hints: ['Divide favourable count by the size of the conditional sample space.'] },
  ],
  solution: 'Conditioning removes odd faces. The conditional sample space is {2,4,6}; all three have equal conditional probability. The event of exceeding three is {4,6}, so the probability is 2/3. Dividing by six would ignore the conditioning.',
} satisfies GuidedProblem;
```

Usually write 3–6 parts, each advancing the same overarching argument. Do not put future canonical choices in the introductory statement or early explanations. Learning feedback follows each submission; assessment feedback follows explicit completion. Stored answers are immutable within an attempt; retry creates a new attempt ID. The whole problem is the review identity. Every part’s hint usage is saved, but parts do not create separate schedules or inflate MCQ counts.

## Written Problem template

Add to `src/features/learning/data/written.ts`. Solutions remain hidden until the user has entered nonempty work and explicitly reveals them. Self-assessments are not automatically verified grades.

```ts
const problem = {
  id: 'written-variance-example', practiceMode: 'written', contentVersion: 1,
  title: 'Derive variance of a sum', category: 'Probability',
  subcategory: 'Expectation', difficulty: 'medium',
  objectiveIds: ['lo-variance-sum'],
  statement: 'Derive Var(X+Y) in terms of individual variances and covariance. Explain the independent case.',
  assumptions: 'X and Y have finite second moments on the same probability space.',
  subparts: ['Expand the centred square.', 'State what independence implies.'],
  hints: ['Centre both variables before expanding.', 'Identify the cross-product expectation.'],
  solution: String.raw`Write $A=X-EX$, $B=Y-EY$. Then $E[(A+B)^2]=E[A^2]+E[B^2]+2E[AB]$, giving $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)$. Independence makes the covariance zero because the centred cross expectation factors. Zero covariance alone does not imply independence.`,
  criteria: ['Justify centring and expansion.', 'Retain the factor two.', 'Distinguish independence from zero covariance.'],
} satisfies WrittenProblem;
```

Drafts save on every edit, including answer text, hint count and reveal state. Revealing a solution does not itself create a completed attempt or review. Only an explicit self-assessment does. The saved attempt includes the answer; starting fresh keeps completed answers in history and confirms replacement of an unassessed nonempty draft.

## Prose, equations, tables and code

Text fields accept plain text and `$...$`, `$$...$$`, `\(...\)` and `\[...\]`. Use `String.raw` for LaTeX. Long solutions can use newlines; no HTML is executed. Markdown pipe tables with a header separator are supported for compact comparisons. They are deliberately a small subset of Markdown; general inline Markdown formatting is not a contract.

Fences must open and close on their own lines. Supported language aliases: `python`/`py`, `cpp`/`c++`, `js`/`javascript`, `ts`/`typescript`. Unknown or omitted languages remain escaped literal code. Indentation and characters are preserved; long lines scroll inside the code block. Four highlight.js grammars are imported selectively into one local lazy chunk; the service worker precaches it. Highlighting never sends code to a network service or runs it. No full editor or code executor is included.

Write ordered hints that move from a useful idea to a concrete next step. Each should give less than the whole answer and must not disclose later part results. Zero hints are valid. Hint assistance resets the scheduling success streak rather than being treated as unaided success.

## Difficulty and verification

Distinguish prerequisite sophistication from reasoning demand. Easy is direct recognition or supplied-formula substitution. Medium usually requires an application, short derivation, modelling distinction or local counterexample. Hard requires substantial construction, interaction of assumptions or a deeper proof/derivation. Specialised terminology alone does not justify Hard. These are editorial labels; learner evidence is needed for empirical calibration. Do not impose artificial per-topic tier quotas.

For each MCQ check every distractor, not just the key. Recompute numeric results from independent inputs or state enumeration. Check theorem hypotheses, filtration conventions, exact versus approximate results, dimensional units and degenerate cases. For written proofs, inspect the full argument and criteria. Schema tests and KaTeX parsing do not establish semantic correctness.

Programming prompts must specify language/version and execution context, distinguish output from exceptions/compilation failure/undefined behaviour, and state shape/dtype/device assumptions where relevant. Add bounded, reviewed snippets to `scripts/verify-code.ts` or `scripts/verify-learning-code.ts`; never execute arbitrary user answers. Keep undefined-behaviour examples syntax-only. Document frameworks unavailable for actual execution.

## Commands and review workflow

```sh
npm run validate:bank
npm run validate:learning
npm run coverage:learning
npm run audit:bank
npm test
node --import tsx --test --test-isolation=none tests/*.test.ts
npm run test:code
npm run test:learning-code
npm run build
PWA_CHROMIUM=/usr/bin/chromium PWA_NO_SANDBOX=1 npm run test:learning
```

The production build automatically validates both content systems. `coverage:learning` generates ignored JSON and Markdown reports under `docs/` by mode, category/subsection, difficulty, objective, references, prerequisites and families. It reports unmapped items, unassessed objectives, recognition-only objectives and weak subsections. The recognition classification is a conservative question-type heuristic, not a semantic proof.

Run relevant existing production browser scripts after a build: `verify-session-setup.mjs`, `verify-feedback.mjs`, `verify-bank.mjs`, `verify-finance.mjs`, `verify-reference.mjs`, `verify-stage1.mjs`, `verify-pwa.mjs`. Package `test:*` aliases include their own build. The new browser suite exercises all example content, five viewport widths, draft/reload, keyboard guards, flags, due reviews, backups and offline use. Real-device Safari testing remains separate.

Before finalising content, record changed IDs and rationale, independent numerical/compiler checks and any unexecuted examples. Review coverage rather than filling counts with reskins. Commit, push and deployment require explicit authorisation.
