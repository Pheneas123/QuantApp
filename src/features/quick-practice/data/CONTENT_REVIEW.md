Current Stage 2, 11 October 2026: exactly **450 MCQs**, including 120 additions with full explanations, explicit objective mappings and References. Original 330 full records, family mappings and all Guided/Written content are preserved. [Stage 2 review](../../../../docs/STAGE_2_REVIEW.md) and [per-item ledger](../../../../docs/STAGE_2_REVIEW_LEDGER.json) cover difficulty, all choices, overlap, primary-source checks, execution and limitations. Earlier findings retain their historical scope.

# Content review — 2026-10-06

Stage 1, 11 October 2026: added 25 Programming and 25 Machine Learning questions with explanations and supporting references. The original 280 question records are unchanged. Current inventory, independent code/calculation checks, primary sources and review limitations are in [STAGE_1_REVIEW.md](STAGE_1_REVIEW.md). Earlier review findings below retain their historical scope.

This is the first substantial revision bank, not a canonical syllabus or an independently peer-reviewed collection. Current counts and development status belong in the root `STATUS.md`.

## Review performed

Reviewed prompts, four choices, correct indices, explanations, taxonomy and difficulty together. Replaced weak distractors with nearby definitions, missing conditions, reversed implications, time/sign mistakes and variance/standard-deviation confusion. Assumptions distinguish finite-state chains, natural versus enlarged filtrations, continuity, integrability, and strong versus weak solutions. Difficulty labels remain editorial judgments, not calibrated exam grades.

Particular checks included the sigma-finiteness failure in the counting-measure Radon–Nikodym example; almost sure finiteness versus optional-stopping hypotheses; modification versus indistinguishability; pure-birth explosion; the boundary likelihood-ratio mixture; and Girsanov's measure-change sign, Novikov's sufficient condition and the filtration needed for martingale representation.

`tests/content.test.ts` checks 11 of the 13 short-calculation entries using finite enumeration, probability sums, likelihood derivatives, conjugate-prior kernels and differential-equation identities. The Itô-square and squared-normal-limit questions were checked algebraically during author review. These finite checks are not proofs of general theorem questions. The full bank's LaTeX is checked by the test suite.

`npm run audit:bank` reports difficulty/type counts, canonical answer positions and suspicious source-text length differences. The first pass flagged two options, which were revised. The current pass has no length flags; 16 correct choices are uniquely longest. This heuristic cannot detect semantic errors, subtle wording clues or conceptual duplicates, and does not reject content.

## Reference spot checks

Questions and distractors are original; these references were consulted to check theorem statements, not to copy question sets. This is a topic-level review record, not complete per-question provenance.

- [Berkeley Stat 210A: completeness and Basu](https://stat210a.berkeley.edu/fall-2024/reader/completeness.html) — completeness/sufficiency versus minimal sufficiency in Basu's theorem.
- [MIT 18.440: optional stopping](https://ocw.mit.edu/courses/18-440-probability-and-random-variables-spring-2014/95835880b8b2c186229980f4622897df_MIT18_440S14_Lecture35.pdf) — bounded stopping and failure at an unbounded hitting time.
- [MIT 6.436: abstract integration II](https://ocw.mit.edu/courses/6-436j-fundamentals-of-probability-fall-2018/a8b70283ce951b43d64f419b0857e0a3_MIT6_436JF18_lec08.pdf) — Fatou and dominated convergence.
- [Columbia IEOR 6711: CTMC notes](https://www.columbia.edu/~ww2040/6711F12/lect1129.pdf) — pure-birth nonexplosion and birth-death balance.
- [Oxford: continuous martingales and stochastic calculus](https://courses.maths.ox.ac.uk/pluginfile.php/83276/mod_folder/content/0/LectureNotes.pdf?forcedownload=1) — continuous local martingales, quadratic variation and time change.
- [EPFL: stochastic calculus II](https://ipgold.epfl.ch/~leveque/Lecture_Notes/sc2_final.pdf) — exponential martingales and Novikov's condition.
- [Alan Bain: stochastic calculus](https://www.chiark.greenend.org.uk/~alanb/stoc-calc.pdf) — sign convention in Girsanov's formula.
- [Oxford: stochastic analysis and PDEs](https://www.stats.ox.ac.uk/~etheridg/pdecdt.pdf) — strong/weak solutions and Yamada–Watanabe.

## Identity and duplication decisions

Retained 29 existing IDs for the same mathematical ideas and correct-answer positions, refining wording/distractors where needed. Retired `calc-005`, the second numerical Brownian conditional-mean variant; its ID is never reused. Existing attempts remain unchanged, including retired-question records. History resolves current prompts rather than storing old content snapshots, so revised wording is not historically versioned.

`prob-023` and `measure-005` deliberately share `familyId: escaping-mass`: one diagnoses uniform integrability, the other recognizes the integral counterexample. Other recurring themes target different definitions, hypotheses or consequences. There is no automated semantic duplicate detector or family-aware sampling.

Update, 2026-10-07: [CURRICULUM_MAP.md](../../../../CURRICULUM_MAP.md) now maps the existing bank and references to LSE, Oxford and Cambridge course material and sets reviewed batch priorities towards 300 questions. Use that plan for the next content batch. A populated topic does not imply adequate coverage of that topic.

## Batch A expansion

The bank now has 150 questions. The original 120 records reviewed above are unchanged; see [BATCH_A_REVIEW.md](BATCH_A_REVIEW.md) for the 30 new questions, 22 supporting references, review decisions and verification.

## Batch B expansion — 8 October 2026

The bank now has 180 questions. All 150 pre-Batch-B records are unchanged; [BATCH_B_REVIEW.md](BATCH_B_REVIEW.md) records the 30 new questions, 28 references, source checks, exact budgets and verification.

## Finance initial batch — 11 October 2026

Added 100 Finance questions across ten topics, with 30 Easy / 40 Medium / 30 Hard. All previous 180 records remain unchanged. [FINANCE_REVIEW.md](FINANCE_REVIEW.md) records conventions, primary-source spot checks, calculation validation, integration tests and the remaining 200-question target. Total bank: 280; reference bank and existing links remain unchanged.
