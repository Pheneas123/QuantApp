Current Stage 2, 11 October 2026: **450 questions / 170 References / 313 linked / 137 unlinked**. All 120 new MCQs have direct links; all 38 new entries are used. The original 132 entries and original question links remain unchanged, including Finance. Eight new competencies have objective-level links. [Stage 2 mapping/verification review](../../../docs/STAGE_2_REVIEW.md) and [coverage](../../../docs/LEARNING_COVERAGE.md) are current; the snapshots below are historical.

Current remediation, 11 October 2026: audit E02 links for `prob-025`, `stat-012`, `stat-013`, `stat-019`, `process-003`, `process-018`, `process-027`, `process-029`, `measure-019`, `measure-020`, and `calc-017` are now resolved through ten new entries and the existing continuous-mapping theorem. The older gap inventory below is historical; additional broad Reference gaps remain. The library has 132 entries and 193 linked MCQs. [Full remediation](../../../docs/AUDIT_REMEDIATION.md).

# Question/reference mapping review — 2026-10-07

Current Stage 1, 11 October 2026: **330 questions / 122 references / 188 linked / 142 unlinked**. All 50 Programming/ML additions link references, including reuse of the existing bias–variance result. Added 10 Programming and 12 ML entries; existing mappings are unchanged. See [STAGE_1_REVIEW.md](../../features/quick-practice/data/STAGE_1_REVIEW.md) for IDs and sources. The Batch B and Finance snapshots below retain their historical counts.

Finance extension (11 October 2026): the app now contains 280 questions. The 100 Finance questions have self-contained explanations and no `knowledgeIds`; the reference bank and all 138 mathematical links remain unchanged. Total unlinked questions are now 142. The mathematical mapping audit below retains its Batch B scope. See [Finance review](../../features/quick-practice/data/FINANCE_REVIEW.md).

After Batch B the bank has 180 questions. 138 have validated reference links; 42 original questions do not. All 60 items in Batches A/B link supporting references; the original mappings are unchanged. Links denote relevant concepts or prerequisites, not proof that all necessary material is covered. No questions were removed in this task. The earlier [content review](../../features/quick-practice/data/CONTENT_REVIEW.md) still applies. This is an author audit, not independent academic review.

## Priority gaps and flags

| Questions | Gap / next review |
| --- | --- |
| `prob-025` | Lindeberg triangular-array CLT is absent. Do not substitute the i.i.d. CLT. |
| `stat-020` | Boundary likelihood-ratio result is absent. Clarified independent normal sampling and numerator convention; the stated mixture is exact in this model, not a universal boundary law. |
| `process-029` | Pure-birth nonexplosion criterion is absent; add its holding-time assumptions and criterion. |
| `measure-019` | Egorov's finite-measure theorem is absent. The moving-interval counterexample is explained, but the theorem needs an entry. |
| `process-027` | Modifications versus indistinguishability are not yet introduced in the reference. |
| `process-003`, `process-014` | Markov-property links are prerequisites only; finite-chain ergodicity/stationary-distribution results are missing. |
| `process-028` | The UI/L1 proposition covers this question because a.s. convergence and an integrable limit are assumed. Batch A now supplies martingale convergence and UI closure references; the original link is unchanged. |
| `calc-017` | Strong-solution definition does not supply the global Lipschitz existence/uniqueness theorem. |
| `stat-012`, `stat-019` | Confidence-interval and first-order delta entries do not supply the exact Student pivot or second-order delta result. |
| `measure-020`, `process-018` | RN chain rule and conditional Poisson/binomial identity need explicit statements beyond their current prerequisite links. |
| `calc-023` | Fixed vague “conditions ensuring” wording: now specifies Lipschitz coefficients, bounded continuous payoff/discount and representation of a bounded classical solution. Does not claim these alone establish classical solvability. Correct-answer index unchanged. |
| `calc-016`, `calc-026` | Some distractors are deliberately elementary (path differentiability, existence without existence assumptions). Review difficulty calibration and use stronger distractors only when they test the intended distinction. |

Other specialised terminology still needs entries: CTMC holding times/generators, Gaussian processes, Lévy processes, product measures/Fubini/Tonelli, regression and Bayesian conjugacy. The Poisson entry introduces càdlàg; the Itô entry introduces predictability; filtration introduces the usual conditions; Basu introduces completeness and ancillary statistics.

## Unlinked inventory

| Subject | IDs without knowledge links |
| --- | --- |
| Probability (14) | `prob-001`, `002`, `009`, `010`, `011`, `012`, `013`, `014`, `016`, `017`, `019`, `020`, `024`, `025` |
| Statistics (8) | `stat-001`, `002`, `008`, `010`, `013`, `014`, `015`, `020` |
| Measure Theory (9) | `measure-008`, `009`, `010`, `011`, `012`, `015`, `016`, `017`, `019` |
| Stochastic Processes (10) | `process-007`, `008`, `015`, `016`, `017`, `024`, `025`, `026`, `027`, `029` |
| Stochastic Calculus (1) | `calc-015` |

Short IDs in each row retain the first ID's prefix. These gaps are deliberate rather than links to vaguely adjacent concepts. The canonical syllabus-informed audit and staged expansion plan now live in [CURRICULUM_MAP.md](../../../CURRICULUM_MAP.md). Use its prioritised gaps and next-batch allocation before expanding towards ~300 questions. Its focus audit also clarifies prerequisite-only links and the direct continuous-mapping route for `stat-019`.

## Batch A follow-up

Added 22 references; see [Batch A review](../../features/quick-practice/data/BATCH_A_REVIEW.md). Product measure/Tonelli/Fubini now exist, so the original unlinked product questions can receive reviewed links later. Conditional variance has no incoming question link yet; cross-isometry is linked as supporting material rather than directly tested.

## Batch B follow-up — 8 October 2026

Added 28 references and 30 linked questions; see [BATCH_B_REVIEW.md](../../features/quick-practice/data/BATCH_B_REVIEW.md). Some earlier gaps now have entries: independence/Borel–Cantelli, risk/score, completeness/ancillarity/Lehmann–Scheffé, test power/p-values/inversion, OLS algebra, π–λ/extension, absolute continuity, signed integration, Markov balance/positive recurrence, CTMC jumps/explosion, and SDE uniqueness. Previous links are unchanged. The ordinary OLS entry is not Gauss–Markov, the jump construction is not a finite-state semigroup theorem, and the explosive pure-birth example is not the general nonexplosion criterion. Do not backfill those links as if these results were covered.
