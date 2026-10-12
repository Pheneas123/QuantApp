# Content standard

Use British English for interface text, questions, answer choices, explanations, reference entries and future generated material: analyse, behaviour, centre, colour, localising, normalisation, parametrisation, modelling and randomised. Preserve mathematical notation, theorem names, proper nouns, exact source titles and quotations. Do not apply spelling replacements to identifiers or LaTeX commands.

Write concise mathematical prose. State the version and necessary assumptions of a theorem; distinguish definitions, conclusions and intuition. Introduce unfamiliar notation. Do not imply that a sufficient condition is necessary, or that a special case is universal. Use the existing text-based MathText delimiters and `String.raw` for LaTeX. Explanations must not refer to answer letters or positions, which are shuffled.

Link questions only to relevant knowledge IDs. A prerequisite link is useful but does not establish full coverage; record missing results in the [mapping review](src/data/knowledge/MAPPING_REVIEW.md). Preserve question IDs and saved history when correcting wording.

`npm test` checks a small explicit list of American spellings in authored question/reference prose and UI strings. It ignores mathematical expressions and permits documented exact-name/quotation exemptions. This is an editorial guard, not a complete spelling checker or a proof of mathematical correctness. Extend its word list carefully; never reject words solely because of an ending such as “-ize”. Future generation must follow this standard before validation and mathematical review.
