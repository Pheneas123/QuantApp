Current platform note: Guided and Written modes are implemented under `src/features/learning/` using their own schemas and namespaces. The boundaries below still explain Quick Practice; future-tense statements refer to the earlier design baseline. See [the current authoring guide](../../../docs/CONTENT_AUTHORING.md).

# Quick Practice boundary

This feature is the existing multiple-choice study mode. `QuickPractice.tsx` is its UI entry point. It owns the current home/filter screens, answering, summary, history and progress coordination. `src/main.tsx` mounts the feature and passes in a PWA update notification/callback; the feature defers that notification during an active session.

The multiple-choice contract remains strict:

- `MultipleChoiceQuestion = StudyMetadata & MultipleChoiceFields` requires exactly four choices and a correct index from 0 to 3. Its runtime validator also enforces those fields. No answer fields were made optional.
- `QuickPracticeState` and `QuickPracticeSessionQuestion` carry shuffled answer mappings and submission state.
- `QuickPracticeAttempt` accepts legacy boolean-correctness records unchanged and new explicit correct/incorrect/unsure results. Answered attempts retain canonical and displayed indices; unsure attempts contain no answer indices. It is not a universal model for every future study interaction.
- The localStorage key `quant-pocket.attempts.v1`, question IDs and record format are unchanged. This legacy key is owned by Quick Practice. A future mode should use its own storage key rather than mix records into this format.

Shared modules have no dependency on Quick Practice: the curriculum, `StudyMetadata` (ID, category, subcategory, difficulty, tags), and `MathText` rendering. Metadata retains the category/subcategory discriminated union.

A future WrittenProblem schema can compose `StudyMetadata` with its own problem text, hints and solutions, along with its own flow and progress model. It should not extend `MultipleChoiceQuestion`. That schema, mode selection and written-problem UI are intentionally not implemented in this cleanup.

No content, UI labels, session semantics or saved history change as a result of the module moves.
