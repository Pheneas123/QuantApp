Stage 2 implemented locally (11 October 2026): **450 MCQs**, 6 Guided Problems (23 parts), 6 Written Problems, 170 References, 102 objectives and 29 prerequisite edges. All original content is preserved. See [Stage 2 review](docs/STAGE_2_REVIEW.md) and [coverage](docs/LEARNING_COVERAGE.md). Historical difficulty quotas are not binding. Stages 3 and 4 remain future work.

# Balanced curriculum roadmap — 11 October 2026

The agreed target is **800 Quick Practice questions: 100 in each of eight categories**. Stages 1 and 2 are implemented locally; Stages 3 and 4 are planned work. Finance stays at 100 throughout this initiative.

This plan supersedes the older separate 300-question mathematics and 300-question Finance targets for this initiative. [CURRICULUM_MAP.md](CURRICULUM_MAP.md) retains useful mathematics objectives and historical batch allocations; [FINANCE_REVIEW.md](src/features/quick-practice/data/FINANCE_REVIEW.md) retains Finance coverage gaps. Neither historical quota authorises additional questions in this task.

## Exact budgets

Each “add” column is the number of new questions in that stage, not a cumulative total.

| Category | After Stage 1 | Stage 2 add → total | Stage 3 add → total | Stage 4 add → total | Remaining after Stage 2 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Probability | 37 | 13 → 50 | 25 → 75 | 25 → 100 | 50 |
| Statistics | 28 | 22 → 50 | 25 → 75 | 25 → 100 | 50 |
| Measure Theory | 34 | 16 → 50 | 25 → 75 | 25 → 100 | 50 |
| Stochastic Processes | 44 | 6 → 50 | 25 → 75 | 25 → 100 | 50 |
| Stochastic Calculus | 37 | 13 → 50 | 25 → 75 | 25 → 100 | 50 |
| Finance | 100 | 0 → 100 | 0 → 100 | 0 → 100 | 0 |
| Programming | 25 | 25 → 50 | 25 → 75 | 25 → 100 | 50 |
| Machine Learning | 25 | 25 → 50 | 25 → 75 | 25 → 100 | 50 |
| **Total** | **330** | **120 → 450** | **175 → 625** | **175 → 800** | **350** |

Stage 1 added exactly 50 to the verified baseline of 280. The remaining budget after Stage 1 is **470**, rather than the prompt’s earlier informal reference to 520 remaining questions.

## Stage 2 implemented: all non-Finance categories at 50

Author distinct objectives within the budgets above. Keep all ten Programming and ML subsections populated, add supporting references before questions that need them, and calibrate difficulty by reasoning rather than obscure names. The existing metadata union, static subject modules, filter logic and reference graph already support these additions; no mode or storage redesign is needed.

Programming priorities: pointers and const correctness; strings, map/set and sorting/searching; construction/destruction and slicing; copy/move and templates; Python slicing/comprehensions, classes, exceptions and context managers; NumPy indexing and reductions; algorithm/data-structure selection; concrete debugging fixes; cancellation and numerical algorithms. Later stages can add exception guarantees and basic concurrency with explicit C++ version and thread assumptions.

ML priorities: linear regression and regularisation; trees, boosting, SVMs and k-nearest neighbours; mixture models and additional PCA applications; SGD/Adam and loss selection; activations, dropout, normalisation and CNN/sequence shapes; MDPs, dynamic programming, Monte Carlo/TD and exploration; Gaussian processes/MCMC and uncertainty; autoregression, stationarity and forecasting; cross-validation and metrics; executable training/validation fixes. Continue applied reasoning across the curriculum, beyond the dedicated implementation subsection.

Stage 2 adds 13/22/16/6/13/0/25/25 by category in roadmap order. It has 18 Easy, 92 Medium and 10 Hard additions, with 116 applied/reasoning items, 118 hinted items and all 120 linked to References/objectives. Recognition-only objectives fall from 28 to 6. [The full review](docs/STAGE_2_REVIEW.md) records subsection allocations and verification. Historical per-topic assertions in `tests/batchB.test.ts` now explicitly filter the original mathematics records; new Stage 2 assertions verify exact final totals.

The current remaining budget is **350**, exactly 175 at each future stage. The earlier 470 figure described the Stage 1 snapshot.

## Stages 3 and 4

Add 25 questions to each of the seven non-Finance categories at each stage. Review breadth, prerequisites and gaps before each batch; reserve increasingly substantive applications and conditions for later questions rather than producing numeric variants of the initial examples. Exact subsection/difficulty quotas require that review and are not yet agreed. Topic coverage and difficulty calibration matter alongside equal category totals.

## Completion criteria for each future stage

Preserve IDs, canonical answers, references, `quant-pocket.attempts.v1` and legacy records. Use four distinct plausible choices and a useful explanation. Run schema/reference validation, content and independent calculation/code checks, unit tests, the editorial audit and production build. Exercise mobile code/maths, grading, review/unseen modes, reference return and offline progress in the production browser. Archive the outgoing numbered status before replacing the current overview and latest update. Commit, push and deployment require explicit authorisation.

Stage 1 inventory, references, verification and limitations are in [STAGE_1_REVIEW.md](src/features/quick-practice/data/STAGE_1_REVIEW.md).
