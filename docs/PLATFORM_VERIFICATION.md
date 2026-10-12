This document records **Update 004** verification. Current Stage 2 inventory, preservation, compiler/numerical evidence, browser results and bundle comparison are in [STAGE_2_REVIEW.md](STAGE_2_REVIEW.md). Historical evidence below is preserved.

# Platform verification — 11 October 2026

This release implements academic remediation and shared learning infrastructure, without expanding the ordinary MCQ bank or deploying the application. The independent [audit](../QUESTION_BANK_AUDIT.md) is historical evidence and remains unchanged. Decisions are in [AUDIT_REMEDIATION.md](AUDIT_REMEDIATION.md).

## Content and preservation

| Inventory | Current result |
| --- | --- |
| Quick Practice | 330 questions; all original IDs, canonical indices and correct-answer strings retained |
| Guided Problems | 6 problems, 23 independently graded parts; both Learning and Assessment flows |
| Written Problems | 6 problems, substantial model solutions and explicit self-assessment |
| References | 132 entries; original 122 records preserved, 10 added |
| Reference-linked Quick items | 193 linked / 137 unlinked |
| Learning objectives | 94; every current item mapped; no unassessed objectives |
| Prerequisites | 18 directed edges; 13 objectives have prerequisites; 70 have References |
| Recognition-only objectives | 28, using a documented question-type heuristic |

Broad initial competencies deliberately group related skills. A mapping does not establish that every component is assessed; repeated family questions do not count as new syllabus breadth. The generated [coverage report](LEARNING_COVERAGE.md) and JSON provide category/subsection, mode, difficulty, objective, Reference, prerequisite and family inventories.

Preservation tests fingerprint all original `[id, correctAnswer, correctAnswerString]` tuples and the original Reference records. Legacy boolean Quick records and current outcome records retain their original key/array representation. No historical attempt was regraded or converted into a review schedule. Original topic-count tests remain; historical difficulty quotas were replaced where editorial recalibration makes them inappropriate.

## Automated checks executed

| Check | Evidence |
| --- | --- |
| `npm test` | 14 test files pass |
| Individual-case reporting | 71 cases pass, zero failures (`node --import tsx --test --test-isolation=none tests/*.test.ts`) |
| `validate:bank` | 330 question records and Reference links validate |
| `validate:learning` | 94 objectives, 18 edges, 6 Guided and 6 Written validate |
| `coverage:learning` | Markdown/JSON inventories generated successfully |
| `audit:bank` | Completed; one nonblocking answer-length signal, 51/330 uniquely longest correct choices; canonical positions 78/91/88/73 |
| `test:code` | Reviewed existing Python/NumPy and C++ snippets pass the execution/compile policies below |
| `test:learning-code` | Written Python repair assertions pass; Guided C++20 solution compiles and prints `1 2 3` |
| `build` | Both content validators, TypeScript and production/PWA build pass |

New tests cover malformed schemas, equivalent-choice signals, unknown/cyclic/self prerequisites, cross-category mappings, ordered Guided grading/locking/resumption, hint prefixes, all authored maths, independent numerical results, deterministic review dates across DST, duplicate events, assistance and self-report provenance, objective evidence thresholds, mode-qualified flags, unavailable IDs, long drafts, malformed persistence, backup round trips/merge/version rejection and detectable-write rollback, and highlighting escaping/exact characters. Static validators cannot certify arbitrary mathematical or semantic correctness.

There is no standalone lint command. The build's existing large-main-chunk warning remains. The answer-length signal is `fin-swaps-wrong-way`: its original short canonical answer is retained, with longer misconception descriptions. It is an editorial review signal, not evidence of a second correct answer.

## Production Chromium checks executed

All existing scripts ran against production builds using isolated profiles and `/usr/bin/chromium`. Set `PWA_CHROMIUM=/usr/bin/chromium PWA_NO_SANDBOX=1` when needed. Package browser commands build first; direct `node --import tsx scripts/verify-*.mjs` runs are equivalent after a successful build.

| Script | Verified behaviour |
| --- | --- |
| `verify-session-setup.mjs` | Categories/topics/difficulty, all existing modes, session sizes/caps, empty pools, sampling, completion/repeat, stable choices and legacy data |
| `verify-feedback.mjs` | Correct/incorrect/unsure, equations, keyboard editing guards, summaries, review/history, reload and reset |
| `verify-finance.mjs` | All Finance filters, revised difficulty counts including empty pools, canonical shuffled grading, feedback, offline attempts and reset |
| `verify-bank.mjs` | All 330 prompts/choices at 320/390px and every submitted explanation at 320px; no page overflow or KaTeX errors |
| `verify-reference.mjs` | All 132 entries at 320/390px, filters, and return to the same quiz without extra attempts/reshuffling |
| `verify-stage1.mjs` | 60 Programming/ML topic/difficulty pools, all 50 questions/code, grade/review/unseen/history, Reference return, offline and reset |
| `verify-pwa.mjs` | Manifest/icons/host configuration, browser restart with network/server unavailable, cached bank/References/KaTeX/fonts, persisted offline answers, update deferral during Quick quiz and activation/data retention |
| `verify-learning.mjs` | All 6 Guided/23 parts and 6 Written; Learning/Assessment feedback timing, immutable answers, resume/reload/retry, summaries, draft/reveal/self-assessment/history, hints, flag/unflag, controlled-clock due filtering, prerequisite practice, typing/modifier/repeat guards, help/Esc, all four highlighted languages and literal fallback, validated backup merge/replacement cancellation, quota-error/denied-storage notices with work retained on screen, revealed Quick hints retained across Reference return, offline use and first offline opening of previously unopened lazy modes |

The learning script checks Quick setup/question/feedback, Reference reading, Guided statements/solutions and Written drafts/solutions at **320, 390, 768, 1024 and 1280px**. Tablet sizes include **768×1024 portrait** and **1024×768 landscape**. Written previews were also captured for visual inspection at phone/tablet widths. A temporary no-wrap math rule caused a 320px overflow during testing; removing it restored the full-bank check. Fixed-navigation scroll spacing keeps primary actions reachable.

The new-mode PWA guard is implemented for active Guided/Written study. The update injection regression exercises the existing Quick quiz guard; it does not independently simulate every OS/update state for each new mode.

## Academic and programming verification

Audit assumptions and all 47 difficulty candidates were reconsidered against the actual question. Forty-four labels changed, three stayed; `stat-019` and `fin-swaps-wrong-way` use Medium rather than the audit's suggested Easy. All seven distractor targets were revised without changing canonical meanings. All eleven priority Reference gaps are linked, with continuous mapping reusing the existing entry.

New calculations were independently recomputed in tests: Bayes contributions/posterior, GBM log drift and expectation, Itô-square variance, duration/Macaulay-to-modified conversion, gradient iterates, put replication state payoffs and logistic gradients/loss. Full model derivations were reviewed using normal orthogonal projections, dominated convergence/UI tails, the OU integrating factor/isometry, statewise replication and the logistic chain rule. This is author verification with primary-source spot checks, not a new independent review of every authored statement.

Primary material inspected includes [Berkeley finite-row Lindeberg notes](https://www.stat.berkeley.edu/~pitman/s205f02/lecture10.pdf), [MIT finite-measure Egorov notes](https://ocw.mit.edu/courses/18-125-measure-and-integration-fall-2003/8ee188461695d9db958de0347471d0db_18125_lec13.pdf), [CMU Gauss–Markov notes](https://www.stat.cmu.edu/~larry/=stat401/lecture-24.pdf), [Oxford stochastic calculus notes](https://www.stats.ox.ac.uk/~etheridg/pdecdt.pdf) and [the BIS market-risk framework](https://www.bis.org/committees/bcbs/basel-framework/standard/mar). The new pure-birth entry includes its Laplace-product proof rather than inferring almost-sure nonexplosion from infinite expectation.

Existing code checks execute seven Python/NumPy outputs, one expected IndexError and five C++20 outputs; two expected compiler failures pass. Three undefined-behaviour examples are syntax-checked and analysed rather than executed. New checks execute only explicitly reviewed static solution snippets, never user answers.

**PyTorch is unavailable in this environment.** No heavyweight installation was made solely for four examples. Their framework execution remains unverified; equivalent numerical reasoning and [official PyTorch dtype requirements](https://docs.pytorch.org/docs/2.14/generated/torch.mean.html) support the documented correction to the broadcasting prompt. This is the audit's outstanding U01 execution limitation.

## Performance

Sizes are Vite's rounded production output, before any hosting-specific transfer changes.

| Asset | Baseline | Current | Change |
| --- | ---: | ---: | ---: |
| Main JS | 836.48 kB / 245.34 gzip | 923.59 kB / 266.19 gzip | +87.11 kB / +20.85 gzip |
| CSS | 35.73 kB / 9.93 gzip | 38.24 kB / 10.59 gzip | +2.51 kB / +0.66 gzip |
| New mode chunk | — | 41.82 kB / 14.37 gzip | Loaded when selected |
| Highlighting chunk | — | 45.34 kB / 14.63 gzip | Loaded when a supported code block mounts |
| PWA precache | 70 entries / 1910.97 KiB | 72 entries / 2083.61 KiB | +172.64 KiB |

The main increase includes objective/mapping metadata, ten References, review/storage controls and shared tools. Guided/Written content and screens are split from the main chunk; only four grammars are bundled, in a separate highlighting chunk. No editor framework or runtime network dependency was added. PWA precaching deliberately downloads lazy chunks during installation so first use works offline; lazy loading reduces initial evaluation, not total installed content. The existing PWA metadata test reports 69 eligible precache assets, while the complete build manifest has 72 entries; these are different filters of the same manifest.

## Limits and remaining work

No commit, push or deployment was made. No live-site check, actual iPad/iPhone/Safari run, OS eviction simulation or independent academic certification was performed. localStorage remains origin-local, unpaginated and nontransactional across keys/tabs; detectable failures are surfaced and import rollback is best effort. Malformed/unsupported data stays untouched; merge/export refuses corrupt namespaces. Details and reset semantics are in [LEARNING_STORAGE.md](LEARNING_STORAGE.md).

Quick unfinished sessions retain their original in-memory lifetime. Guided sessions and Written drafts persist. Legacy Quick history remains available but does not populate new schedule-derived objective evidence. Difficulty labels, distractor discrimination and the heuristic review policy still need learner calibration. Initial objectives are broad in places, 28 are recognition-only, prerequisite coverage is partial, and most categories have only MCQs so far. Family-aware sampling/adaptive recommendations remain future work. The 450/625/800 MCQ stages remain unimplemented.
