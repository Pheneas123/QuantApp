Current Stage 2 (11 October 2026): **450 MCQs**, 170 References, 102 objectives, 29 prerequisite edges, 6 Guided Problems (23 parts), 6 Written Problems and the same 89 populated subsection pairs. [Stage 2 review](docs/STAGE_2_REVIEW.md) records all current allocations; historical mathematics inventories and quotas below retain their scope. Stages 3/4 remain 625/800, adding 175 each.

# QuantPocket Curriculum Map

Historical Stage 1 initiative, 11 October 2026: **330 questions, eight categories, 122 references, 89 populated pairs**. The [balanced curriculum roadmap](CURRICULUM_EXPANSION.md) is the agreed current quota plan: **100 per category, 800 total**, with Finance held at 100. It supersedes the separate 300-question mathematics/Finance targets below for this initiative. The earlier inventory, objectives and batch budgets are preserved as historical mathematics planning. Use root status for current implementation and the balanced roadmap for further allocations.

Audit updated: 8 October 2026 (initial academic-source audit: 7 October). Current release after Batch B: **180 Quick Practice questions, 100 knowledge objects, 59 category/subcategory pairs**. Original planning baseline: 120 questions / 50 references. This document is the canonical **content plan**, not a claim of complete academic coverage or university endorsement. [STATUS.md](STATUS.md) remains the source of truth for implemented application behaviour; [curriculum.ts](src/data/curriculum.ts) remains the runtime taxonomy. Follow [CONTENT_STYLE.md](CONTENT_STYLE.md).

Finance extension, 11 October 2026: the whole app now has **280 questions across 69 category/subcategory pairs**. The mathematical inventories and 300-question mathematical targets below remain the Batch B plan (180 questions / 59 pairs). Finance adds an independent initial 100-question bank and a separate 300-question target; see [FINANCE_REVIEW.md](src/features/quick-practice/data/FINANCE_REVIEW.md) for its inventory, review and remaining 200 questions. It does not consume the mathematical Batch C budgets or claim complete Finance coverage.

## Scope and academic basis

The objective is university-level recall, recognition, theorem conditions, implications, counterexamples and short calculations that fit a phone. Long proofs, extended derivations and coding projects are outside Quick Practice. Difficulty remains exactly Easy / Medium / Hard; institutional course levels are not new data fields. Easy covers foundational and accessible master's material; Medium tests deeper applications and distinctions; Hard tests advanced conditions, implications and counterexamples. A theorem's name alone does not make a question Hard.

The scope below is QuantPocket's synthesis of the existing bank, the user's priorities and official course descriptions. **Objectives, coverage ratings, question counts and batch priorities are editorial decisions**, not university-prescribed quotas. Source codes beside topics identify supporting course families, not a claim that every suggested example or theorem variant appears explicitly in that outline. New theorem statements still need exact-version source checks when authored.

### Sources consulted

Links were inspected on the audit date. LSE and Cambridge sources below are 2026/27 unless stated otherwise; Oxford sources are the publicly available 2025/26 course pages. Cambridge's PDFs are linked from its current [Part III guide](https://www.maths.cam.ac.uk/postgrad/part-iii/part-iii-guide-courses), which explicitly describes its outlines as informal and subject to change. Oxford C8.1/C8.2 link some older lecture notes; the course synopsis, not an assumed current note edition, is used here. Some older LSE calendar URLs now redirect to the calendar index, so the working current URLs are used.

| Code | Official source | Contribution to this plan |
| --- | --- | --- |
| L1 | [LSE ST206: Probability and Distribution Theory](https://www.lse.ac.uk/resources/calendar2026-2027/courseGuides/ST/2026_ST206.htm) | Foundations, conditional laws, transformations, moments and generating functions. |
| L2 | [LSE ST216: Statistical Inference](https://www.lse.ac.uk/resources/calendar2026-2027/courseGuides/ST/2026_ST216.htm) | Estimation, sufficiency, likelihood, testing, intervals, regression and Bayesian foundations. |
| L3 | [LSE ST302: Stochastic Processes](https://www.lse.ac.uk/resources/calendar2026-2027/courseGuides/ST/2026_ST302.htm) | Discrete/continuous Markov models, random walks, counting processes and introductory Brownian/SDE calculations. |
| L4 | [LSE ST552: Probability and Mathematical Statistics I](https://www.lse.ac.uk/resources/calendar2026-2027/courseGuides/ST/2026_ST552.htm) | Measure-theoretic foundations, convergence, transforms and rigorous inference. |
| L5 | [LSE ST553: Probability and Mathematical Statistics II](https://www.lse.ac.uk/resources/calendar2026-2027/courseGuides/ST/2026_ST553.htm) | Conditional expectation, martingale tools, concentration, recurrence and diffusion foundations. |
| L6 | [LSE ST409: Stochastic Processes](https://www.lse.ac.uk/resources/calendar2026-2027/courseGuides/ST/2026_ST409.htm) | Master's-level bridge from martingales/counting processes to Brownian calculus and SDEs. Its public outline is broad; it does not establish particular advanced theorem versions. |
| O1 | [Oxford B8.1: Probability, Measure and Martingales, 2025/26](https://courses.maths.ox.ac.uk/course/view.php?id=6066) | Measure/extension/integration, conditional expectation, uniform integrability, discrete martingale inequalities and convergence. |
| O2 | [Oxford B8.2: Continuous Martingales and Stochastic Calculus, 2025/26](https://courses.maths.ox.ac.uk/course/view.php?id=6085) | Continuous-time foundations, Brownian stopping properties, variation, integration and Itô calculus. |
| O3 | [Oxford C8.1: Stochastic Differential Equations, 2025/26](https://courses.maths.ox.ac.uk/course/view.php?id=6105) | Lévy characterisation, DDS, Girsanov, representation and SDE well-posedness; local times form a later extension. |
| O4 | [Oxford C8.2: Stochastic Analysis and PDEs, 2025/26](https://courses.maths.ox.ac.uk/course/view.php?id=6135) | Semigroups, generator domains, martingale problems and PDE representations. |
| C1 | [Cambridge Part III: Advanced Probability](https://www.maths.cam.ac.uk/postgrad/part-iii/files/GtC/Probability/Advanced_Probability.pdf) | Weak convergence, martingale/Brownian foundations, Poisson random measures and Lévy processes. |
| C2 | [Cambridge Part III: Stochastic Calculus](https://www.maths.cam.ac.uk/postgrad/part-iii/files/GtC/Probability/Stochastic%20Calculus%20with%20Applications.pdf) | Continuous calculus, representation/time change, strong/weak SDEs and martingale problems. |
| C3 | [Cambridge Part II guide, 2026/27](https://www.maths.cam.ac.uk/undergrad/files/coursesII.pdf), printed pp. 5, 11–12 | Probability and Measure, Principles of Statistics, Statistical Modelling and Applied Probability: breadth and prerequisites. This is the informal guide; the formal Schedules PDF could not be retrieved in this audit. |
| C4 | [Cambridge Part III: Modern Statistical Methods](https://www.maths.cam.ac.uk/postgrad/part-iii/files/GtC/Statistics/Modern_Statistical_Methods_Shah.pdf) | Later extensions: penalised regression and multiple testing. |
| C5 | [Cambridge Part III: Topics in Statistical Theory](https://www.maths.cam.ac.uk/postgrad/part-iii/files/GtC/Statistics/Richard_N.pdf) | Later extensions: nonparametric Bayesian inference and minimax/contraction rates. |

LSE ST202 is [marked suspended in 2026/27](https://www.lse.ac.uk/resources/calendar2026-2027/courseGuides/ST/2026_ST202.htm); use ST206/ST216 for current foundational scope. No additional institution was needed for this first map. Individual content-source checks already recorded in the bank/reference review notes remain valid; this map does not retroactively supply per-question provenance.

## Audit method and conventions

Counts were calculated from `src/features/quick-practice/data/questions.ts` and `src/data/knowledge/index.ts`, after their runtime validators ran. Prompts, explanations and reference statements were inspected to distinguish actual coverage from category labels. Batch B adds 30 questions and 28 references after Batch A. All previous 150 question records and 72 reference records are unchanged; UI, schema and persistence are unchanged.

- Each question counts once, under its stored category/subcategory. Brownian questions in Probability/Processes/Calculus do not inflate one another's totals.
- **E/M/H** means Easy / Medium / Hard. Targets are final totals at the 300-question milestone, including existing questions, not numbers to add. Zero Hard in a foundational topic is deliberate.
- Question IDs below retain their complete canonical IDs. Reference aliases **K01–K100** are document-only shortcuts; the inventory gives actual IDs, names, types and incoming question-link counts. They are not new schema identifiers.
- **Owned refs** means entries stored in that exact topic. **Linked refs** means the union of explicit `knowledgeIds` on its questions, including cross-subject/prerequisite links. Neither counts transitive related-concept edges. Missing-result notes qualify what those references actually cover.
- Type codes: **D** `definition_recall`; **DR** `definition_recognition`; **TR** `theorem_recall`; **TC** `theorem_conditions`; **PR** `property_recognition`; **CI** `concept_identification`; **TF** `true_false_conceptual`; **S** `short_calculation`; **I** `implication`; **C** `counterexample_recognition`.
- **Suitable types** are a selected set, not a requirement to use all ten everywhere. **Absent suitable types** is their set difference from current stored types. A present type can still lack the key objective: one theorem-conditions question does not test all theorems in a topic.
- **Missing:** no direct question on the specified topic/objective. **Thin:** isolated examples or important foundational/results/skills gaps. **Reasonable:** several complementary tests and useful references cover the initial core, with explicit remaining gaps. **Strong:** balanced recall, conditions, implications/failure cases and applications across the intended scope, backed by adequate references. Ratings are editorial, not a count threshold. No current broad topic is rated strong.

The same result should have one canonical home. Conditional expectation and convergence modes belong primarily to Probability; general integration theorems to Measure Theory; discrete martingales/stopping to Stochastic Processes; local/continuous calculus to Stochastic Calculus. Cross-topic links are preferable to duplicated definitions. Keep current ASCII taxonomy labels such as `Ito integral` and `Levy processes` for compatibility; authored mathematical prose uses Itô and Lévy.

### Prerequisite order

1. Probability spaces and measure/integration → random variables, distributions, expectation.
2. Convergence and conditional expectation → discrete martingales, filtrations and stopping.
3. Brownian motion and continuous-time regularity → local martingales, quadratic variation and stochastic integration.
4. Itô calculus → representation, change of measure and SDE well-posedness → generators, martingale problems and PDE links.
5. In parallel: sampling/estimation → likelihood/sufficiency/testing → asymptotic and Bayesian inference. Use convergence references rather than duplicating limit theorems in Statistics.

## Current bank and proposed 300-question allocation

| Subject | Current Q (E/M/H) | Owned references | Linked / unlinked Q | Target Q (E/M/H) | Add |
| --- | --- | ---: | --- | --- | ---: |
| Probability | 37 (14/17/6) | 18 | 23 / 14 | 60 (26/24/10) | 23 |
| Statistics | 28 (12/12/4) | 17 | 20 / 8 | 50 (15/24/11) | 22 |
| Measure Theory | 34 (13/15/6) | 17 | 25 / 9 | 50 (15/23/12) | 16 |
| Stochastic Processes | 44 (16/19/9) | 23 | 34 / 10 | 65 (19/31/15) | 21 |
| Stochastic Calculus | 37 (6/21/10) | 25 | 36 / 1 | 75 (8/37/30) | 38 |
| **Total** | **180 (61/84/35)** | **100** | **138 / 42** | **300 (83/139/78)** | **120** |

Target balance is **27.7% Easy, 46.3% Medium, 26.0% Hard**. Add 22 Easy, 55 Medium and 43 Hard questions to the current 61/84/35. This weights deeper work towards stochastic analysis without making foundations artificially difficult. Counts are planning budgets; reject a weak or duplicate question rather than fill a quota.

## Probability

### P01 — Probability spaces

- **Objective:** Identify a valid probability model and its events. Course basis: [L1](#sources-consulted), [O1](#sources-consulted).
- **Definitions:** probability space, event, null event. **Results:** countable additivity and continuity of probability.
- **Recognition:** distinguish a measure from a probability measure. **Short calculation:** probability of a disjoint union or complement.
- **Current:** 2 questions, E/M/H **1/1/0**: `prob-007`, `prob-summable-events-limsup`. Types: D, I. Owned refs: K01. Linked refs: K01, K74.
- **Gaps:** Added a countable tail-event application using the first Borel–Cantelli lemma, linked to its canonical Independence entry. Remaining: measure axioms/continuity reference and basic non-example. Suitable types: D, DR, PR, C; absent suitable types: DR, PR, C. **Coverage: thin. Target: 3 (2/1/0).**

### P02 — Conditional probability

- **Objective:** Condition correctly on positive-probability events. Course basis: [L1](#sources-consulted).
- **Definitions:** conditional probability and conditional law. **Results:** Bayes and total probability.
- **Recognition:** distinguish conditioning from intersection; denominator requirements. **Short calculation:** a finite partition/Bayes calculation.
- **Current:** 2 questions, E/M/H **2/0/0**: `prob-002`, `prob-010`. Types: TR, S. Owned refs: none. Linked refs: none.
- **Gaps:** conditional probability, Bayes and total probability entries. Suitable types: DR, TR, S, C; absent suitable types: DR, C. **Coverage: thin. Target: 4 (3/1/0).**

### P03 — Independence

- **Objective:** Distinguish pairwise, mutual and conditional independence. Course basis: [L1](#sources-consulted), [L4](#sources-consulted), [O1](#sources-consulted).
- **Definitions:** independence of events, variables and sigma-algebras; tail sigma-algebra. **Results:** Gaussian independence criterion; Borel–Cantelli and Kolmogorov zero–one law.
- **Recognition:** test converses and independence hypotheses. **Short calculation:** product probabilities and a three-bit counterexample.
- **Current:** 5 questions, E/M/H **2/2/1**: `prob-001`, `prob-009`, `prob-024`, `prob-mutual-independence-subsets`, `prob-pairwise-borel-cantelli`. Types: DR, TC, S, C. Owned refs: K73, K74, K75. Linked refs: K73, K75.
- **Gaps:** Mutual independence and both Borel–Cantelli directions now referenced; pairwise sufficiency tested. Five-question budget filled. Remaining reference gaps: Gaussian independence, conditional independence and tail zero–one law. Suitable types: DR, TC, C, S; absent suitable types: none; deepen the objectives above. **Coverage: reasonable. Target: 5 (2/2/1).**

### P04 — Random variables

- **Objective:** Relate a random variable to its law and transformations. Course basis: [L1](#sources-consulted), [O1](#sources-consulted).
- **Definitions:** random variable, pushforward law, CDF, joint/marginal law. **Results:** measurable transformations; distribution-function properties.
- **Recognition:** a law versus a density; atoms and mixed laws. **Short calculation:** marginalisation and a one-dimensional change of variable.
- **Current:** 1 questions, E/M/H **1/0/0**: `prob-008`. Types: DR. Owned refs: none. Linked refs: K03.
- **Gaps:** pushforward/CDF entry and transformations; current reference only defines measurability. Suitable types: DR, PR, S, I; absent suitable types: PR, S, I. **Coverage: thin. Target: 4 (2/2/0).**

### P05 — Common distributions

- **Objective:** Identify models from support and assumptions. Course basis: [L1](#sources-consulted).
- **Definitions:** Bernoulli, binomial, Poisson, exponential, normal and gamma laws. **Results:** memorylessness; sums of independent normal/Poisson variables.
- **Recognition:** rate versus scale; variance versus standard deviation. **Short calculation:** moments or a transformed CDF.
- **Current:** 2 questions, E/M/H **1/1/0**: `prob-011`, `prob-012`. Types: PR, S. Owned refs: none. Linked refs: none.
- **Gaps:** distribution/parameter conventions entries; only exponential examples currently. Suitable types: DR, PR, S, TF; absent suitable types: DR, TF. **Coverage: thin. Target: 4 (3/1/0).**

### P06 — Expectation

- **Objective:** Use expectation, covariance and moment bounds correctly. Course basis: [L1](#sources-consulted), [O1](#sources-consulted).
- **Definitions:** integrability, variance, covariance, Lp norms. **Results:** variance-of-sum, Jensen, Cauchy–Schwarz.
- **Recognition:** zero covariance does not generally imply independence. **Short calculation:** covariance or variance of a short sum.
- **Current:** 2 questions, E/M/H **1/1/0**: `prob-013`, `prob-014`. Types: TR, TF. Owned refs: none. Linked refs: none.
- **Gaps:** expectation/moment inequalities entries and integrability checks. Suitable types: TR, TC, S, I; absent suitable types: TC, S, I. **Coverage: thin. Target: 4 (2/2/0).**

### P07 — Conditional expectation

- **Objective:** Characterise and apply conditional expectation as information projection. Course basis: [O1](#sources-consulted), [C1](#sources-consulted), [L4](#sources-consulted).
- **Definitions:** conditional expectation, conditional variance, regular conditional law. **Results:** tower, taking out what is known, conditional Jensen, total variance.
- **Recognition:** measurability/integrability; nested versus unrelated sigma-algebras; L1 versus L2. **Short calculation:** finite-partition conditional mean; Gaussian conditional mean; total variance.
- **Current:** 7 questions, E/M/H **1/4/2**: `prob-004`, `prob-015`, `prob-022`, `prob-ce-partition-mean`, `prob-ce-known-factor`, `prob-ce-jensen-direction`, `prob-ce-nonnested-tower`. Types: DR, TR, TC, PR, S, C. Owned refs: K11, K51, K52. Linked refs: K11, K51.
- **Gaps:** Batch A adds partition, pull-out, Jensen and non-nested tower tests plus conditional variance reference. Remaining: Gaussian conditioning and a direct total-variance calculation. Suitable types: DR, TR, PR, TC, S, C; absent suitable types: none; deepen the objectives above. **Coverage: reasonable. Target: 8 (2/4/2).**

### P08 — Generating functions

- **Objective:** Choose PGF, MGF or characteristic function appropriately. Course basis: [L1](#sources-consulted), [L4](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** PGF, MGF, characteristic function. **Results:** uniqueness, convolution multiplication, Lévy continuity theorem.
- **Recognition:** characteristic functions always exist; MGFs may not. **Short calculation:** moments from derivatives; characteristic function of an independent sum.
- **Current:** 2 questions, E/M/H **1/1/0**: `prob-016`, `prob-017`. Types: DR, PR. Owned refs: none. Linked refs: none.
- **Gaps:** all transform definitions/results; continuity theorem prerequisites. Suitable types: DR, PR, TR, S, TC; absent suitable types: TR, S, TC. **Coverage: thin. Target: 5 (2/2/1).**

### P09 — Modes of convergence

- **Objective:** Distinguish modes and know when expectations converge. Course basis: [O1](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** almost sure, probability, distribution, Lp convergence; uniform integrability. **Results:** implication diagram, subsequence principle, Vitali; continuous mapping and Slutsky.
- **Recognition:** missing converses, constant limits, escaping mass, bounded moments versus UI. **Short calculation:** moments of a rare-large-value sequence.
- **Current:** 8 questions, E/M/H **2/4/2**: `prob-003`, `prob-006`, `prob-021`, `prob-023`, `prob-lp-difference-definition`, `prob-subsequence-quantifiers`, `prob-equal-laws-not-probability`, `prob-slutsky-random-denominator`. Types: DR, TR, TC, S, I, C. Owned refs: K04, K05, K06, K12, K53, K54, K55, K56. Linked refs: K04, K05, K06, K08, K12, K53, K54, K55, K56.
- **Gaps:** Initial eight-question budget filled; Lp, subsequence quantifiers, converse failure and Slutsky/CMT now covered. Later review: discontinuity-set conditions and random-limit joint-convergence failures. Suitable types: DR, I, C, TC, S; absent suitable types: none; deepen the objectives above. **Coverage: reasonable. Target: 8 (2/4/2).**

### P10 — Laws of large numbers

- **Objective:** Select an appropriate law of large numbers. Course basis: [L4](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** sample average; weak versus strong laws. **Results:** i.i.d. integrable SLLN; finite-variance WLLN.
- **Recognition:** a.s. versus probability convergence; independence and moment assumptions. **Short calculation:** variance bound for a sample average.
- **Current:** 2 questions, E/M/H **1/1/0**: `prob-018`, `prob-dependent-average-failure`. Types: TC, C. Owned refs: K14, K76. Linked refs: K14, K76.
- **Gaps:** Finite-variance weak law and dependent-copy failure added. Remaining: non-i.i.d. sufficient hypotheses and further strong/weak-law distinctions. Suitable types: TR, TC, I, C; absent suitable types: TR, I. **Coverage: thin. Target: 4 (2/1/1).**

### P11 — Central limit theorem

- **Objective:** Recognise normal limits and their scope. Course basis: [L4](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** standardisation; triangular array; Lindeberg condition. **Results:** i.i.d. CLT; Lindeberg–Feller sufficient direction with precise row assumptions.
- **Recognition:** non-finite variance; no universal CLT for dependent arrays. **Short calculation:** standard error or standardised sum.
- **Current:** 2 questions, E/M/H **0/1/1**: `prob-005`, `prob-025`. Types: TC. Owned refs: K13. Linked refs: K13.
- **Gaps:** triangular-array CLT reference; basic application and counterexample types. Suitable types: TR, TC, C, S; absent suitable types: TR, C, S. **Coverage: thin. Target: 6 (2/2/2).**

### P12 — Concentration inequalities

- **Objective:** Match a tail bound to its assumptions. Course basis: [L5](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** tail probability, sub-Gaussian proxy. **Results:** Markov, Chebyshev, Chernoff and Hoeffding bounds.
- **Recognition:** boundedness versus variance assumptions; one-sided versus two-sided bounds. **Short calculation:** plug values into a bound and choose a Chernoff parameter.
- **Current:** 2 questions, E/M/H **1/1/0**: `prob-019`, `prob-020`. Types: TR, TC. Owned refs: none. Linked refs: none.
- **Gaps:** all tail-bound entries; basic Markov and Chernoff questions. Suitable types: TR, TC, S, C; absent suitable types: S, C. **Coverage: thin. Target: 5 (2/2/1).**

## Statistics

### S01 — Estimation

- **Objective:** Compare estimators under an explicit loss and sampling model. Course basis: [L2](#sources-consulted), [L4](#sources-consulted).
- **Definitions:** estimator, bias, consistency, risk, Fisher information. **Results:** Cramér–Rao bound; Rao–Blackwell.
- **Recognition:** unbiasedness versus consistency/efficiency; regularity of the score. **Short calculation:** expectation of sample mean; simple information calculation.
- **Current:** 3 questions, E/M/H **2/1/0**: `stat-001`, `stat-008`, `stat-risk-expectation`. Types: D, DR, S. Owned refs: K45, K77. Linked refs: K77.
- **Gaps:** Risk/estimator definition added. Remaining: standalone consistency definition, Cramér–Rao theorem with score regularity and efficiency distinctions. Suitable types: DR, PR, TC, S, I; absent suitable types: PR, TC, I. **Coverage: thin. Target: 5 (2/2/1).**

### S02 — Bias, variance and MSE

- **Objective:** Quantify squared-error trade-offs. Course basis: [L2](#sources-consulted).
- **Definitions:** bias, variance, MSE. **Results:** bias–variance identity.
- **Recognition:** biased estimators can have lower risk. **Short calculation:** MSE comparison for two estimators.
- **Current:** 2 questions, E/M/H **2/0/0**: `stat-002`, `stat-007`. Types: TR, S. Owned refs: K50. Linked refs: K50.
- **Gaps:** core identity exists; add worked recognition/calculation coverage and an unbiasedness counterexample. Suitable types: TR, S, C, I; absent suitable types: C, I. **Coverage: thin. Target: 4 (2/2/0).**

### S03 — Maximum likelihood

- **Objective:** Form and maximise likelihood without dropping support. Course basis: [L2](#sources-consulted), [C3](#sources-consulted).
- **Definitions:** likelihood, log-likelihood, score, observed/expected information. **Results:** invariance; consistency/asymptotic normality under stated regularity.
- **Recognition:** boundary optima; parameter-dependent support; stationary point need not maximise. **Short calculation:** Bernoulli/exponential MLE or score.
- **Current:** 4 questions, E/M/H **2/1/1**: `stat-004`, `stat-009`, `stat-018`, `stat-score-parameter-derivative`. Types: DR, S, C. Owned refs: K48, K78. Linked refs: K48, K78.
- **Gaps:** Score and information definitions now present; score recognition added. Remaining: invariance and regular MLE limit theorem; information is defined but not directly tested. Suitable types: DR, S, TC, C, PR; absent suitable types: TC, PR. **Coverage: thin. Target: 6 (2/3/1).**

### S04 — Sufficiency

- **Objective:** Separate sufficiency, minimal sufficiency and completeness. Course basis: [L2](#sources-consulted), [L4](#sources-consulted).
- **Definitions:** sufficient, minimal sufficient, complete, ancillary statistics. **Results:** factorisation, Rao–Blackwell, Lehmann–Scheffé, Basu.
- **Recognition:** identify the exact extra hypothesis in each theorem. **Short calculation:** sufficient statistic from a factored likelihood.
- **Current:** 5 questions, E/M/H **1/3/1**: `stat-003`, `stat-006`, `stat-017`, `stat-ancillary-law`, `stat-lehmann-scheffe-scope`. Types: DR, TR, TC, PR, I. Owned refs: K43, K44, K79, K80, K81. Linked refs: K11, K43, K44, K45, K79, K80, K81.
- **Gaps:** Completeness, ancillarity and Lehmann–Scheffé references added, with ancillarity recognition and unbiased comparison-class question. Remaining: minimal sufficiency and separating examples. Suitable types: DR, TR, TC, I, C, S; absent suitable types: C, S. **Coverage: reasonable. Target: 7 (1/4/2).**

### S05 — Hypothesis testing

- **Objective:** Distinguish level, size, power and likelihood-ratio conventions. Course basis: [L2](#sources-consulted), [C3](#sources-consulted).
- **Definitions:** test function, size, power, p-value, simple/composite hypotheses. **Results:** Neyman–Pearson, regular Wilks, test/interval duality.
- **Recognition:** failure of interior asymptotics at a boundary; power versus size. **Short calculation:** a simple rejection probability or likelihood ratio.
- **Current:** 5 questions, E/M/H **2/2/1**: `stat-010`, `stat-011`, `stat-020`, `stat-power-function`, `stat-valid-p-value-inequality`. Types: DR, TR, PR, CI. Owned refs: K47, K82, K83. Linked refs: K47, K82, K83.
- **Gaps:** Power/size and valid p-value references and questions added. Remaining: regular Wilks, exact normal-boundary mixture, UMP versus most powerful and rejection calculations. Suitable types: DR, TR, TC, CI, C, S; absent suitable types: TC, C, S. **Coverage: reasonable. Target: 8 (2/4/2).**

### S06 — Confidence intervals

- **Objective:** Interpret coverage and construct intervals from pivots. Course basis: [L2](#sources-consulted), [C3](#sources-consulted).
- **Definitions:** confidence procedure, pivot, credible interval. **Results:** normal/t/chi-square pivots; inversion of tests.
- **Recognition:** exact versus asymptotic coverage; random interval versus fixed parameter. **Short calculation:** a short normal or t interval.
- **Current:** 3 questions, E/M/H **1/2/0**: `stat-005`, `stat-012`, `stat-confidence-test-inversion`. Types: TC, PR, TF. Owned refs: K49, K84. Linked refs: K49, K84.
- **Gaps:** Test inversion reference and recognition added. Remaining: exact normal/t/chi-square pivots and a direct interval calculation. Suitable types: DR, TC, TF, S, C; absent suitable types: DR, S, C. **Coverage: thin. Target: 5 (2/2/1).**

### S07 — Regression

- **Objective:** Identify OLS assumptions and limitations. Course basis: [L2](#sources-consulted), [C3](#sources-consulted).
- **Definitions:** design matrix, projection, residual, linear model; GLM link. **Results:** Gauss–Markov; normal-theory inference.
- **Recognition:** homoscedasticity versus normality; rank; ridge is not BLUE. **Short calculation:** fitted value or variance in a small orthogonal design.
- **Current:** 2 questions, E/M/H **1/1/0**: `stat-013`, `stat-ols-residual-orthogonality`. Types: TC, PR. Owned refs: K85. Linked refs: K85.
- **Gaps:** OLS/projection reference and residual orthogonality added. Remaining: Gauss–Markov theorem, normal-theory inference and GLM definitions; the algebraic entry does not supply BLUE. Suitable types: DR, TC, S, C, PR; absent suitable types: DR, S, C. **Coverage: thin. Target: 5 (1/3/1).**

### S08 — Bayesian inference

- **Objective:** Update a prior and choose a decision under stated loss. Course basis: [L2](#sources-consulted), [C3](#sources-consulted).
- **Definitions:** prior, posterior, posterior predictive, Bayes action. **Results:** Bayes rule for densities; beta–binomial conjugacy.
- **Recognition:** credible versus confidence intervals; posterior mean versus MAP. **Short calculation:** conjugate update or predictive success probability.
- **Current:** 2 questions, E/M/H **1/1/0**: `stat-014`, `stat-015`. Types: PR, S. Owned refs: none. Linked refs: none.
- **Gaps:** Bayesian definitions, conjugacy and loss-dependent Bayes actions. Suitable types: DR, S, PR, TF, C; absent suitable types: DR, TF, C. **Coverage: thin. Target: 5 (2/2/1).**

### S09 — Asymptotic statistics

- **Objective:** Apply first/second-order asymptotics with checked regularity. Course basis: [C3](#sources-consulted), [L4](#sources-consulted).
- **Definitions:** asymptotic normality, asymptotic variance, stochastic order. **Results:** delta method, Slutsky, regular MLE limits.
- **Recognition:** vanishing derivative; parameter boundary; consistency alone insufficient. **Short calculation:** delta variance or squared-normal limit.
- **Current:** 2 questions, E/M/H **0/1/1**: `stat-016`, `stat-019`. Types: TR, S. Owned refs: K46. Linked refs: K46.
- **Gaps:** second-order delta and regular limit results; Slutsky/CMT now exist as Probability references, but the original stat-019 links remain unchanged. Suitable types: TR, TC, S, I, C; absent suitable types: TC, I, C. **Coverage: thin. Target: 5 (1/2/2).**

## Measure Theory

### M01 — Sigma-algebras

- **Objective:** Recognise generated and product sigma-algebras. Course basis: [O1](#sources-consulted), [L4](#sources-consulted).
- **Definitions:** sigma-algebra, Borel sigma-algebra, pi-system, lambda-system. **Results:** pi–lambda and monotone-class theorems.
- **Recognition:** countable closure versus arbitrary unions. **Short calculation:** sigma-algebra generated by a finite partition.
- **Current:** 3 questions, E/M/H **2/1/0**: `measure-001`, `measure-007`, `measure-pi-lambda-closure`. Types: D, TR, PR. Owned refs: K02, K86. Linked refs: K02, K86.
- **Gaps:** π–λ reference and closure theorem question added. Remaining: monotone-class theorem and an explicit non-example. Suitable types: D, DR, PR, C; absent suitable types: DR, C. **Coverage: thin. Target: 4 (2/2/0).**

### M02 — Measures

- **Objective:** Distinguish finite/sigma-finite/complete measures and extensions. Course basis: [O1](#sources-consulted), [L4](#sources-consulted).
- **Definitions:** measure, outer measure, premeasure, sigma-finiteness. **Results:** continuity from above/below; Carathéodory extension with uniqueness assumptions.
- **Recognition:** why finite mass matters for decreasing sets. **Short calculation:** limit of nested-set measures.
- **Current:** 4 questions, E/M/H **2/2/0**: `measure-008`, `measure-009`, `measure-outer-measure-subadditivity`, `measure-extension-sigma-finite`. Types: DR, TC, PR. Owned refs: K87, K88. Linked refs: K87, K88.
- **Gaps:** Outer measure and premeasure extension/uniqueness references and questions added. Remaining: dedicated ordinary-measure/continuity entry and a non-sigma-finite extension counterexample. Suitable types: DR, TC, C, S; absent suitable types: C, S. **Coverage: reasonable. Target: 5 (2/2/1).**

### M03 — Measurable functions

- **Objective:** Check maps by inverse images and generators. Course basis: [O1](#sources-consulted).
- **Definitions:** measurable map, simple function, measurable limit. **Results:** closure under composition, limits and countable suprema.
- **Recognition:** images need not be measurable; completion caveats. **Short calculation:** inverse image of a finite-valued map.
- **Current:** 2 questions, E/M/H **2/0/0**: `measure-004`, `measure-018`. Types: DR, TR. Owned refs: K03. Linked refs: K03.
- **Gaps:** simple-function approximation and closure result; current definition plus limit recall is narrow. Suitable types: DR, TR, PR, C; absent suitable types: PR, C. **Coverage: thin. Target: 4 (2/2/0).**

### M04 — Lebesgue integration

- **Objective:** Build the integral and recognise legitimate manipulations. Course basis: [L4](#sources-consulted), [O1](#sources-consulted).
- **Definitions:** nonnegative integral, positive/negative parts, integrable function, Lp equivalence class. **Results:** linearity, Hölder, Minkowski; Lp completeness.
- **Recognition:** undefined infinity minus infinity; finite measure versus general Lp inclusions. **Short calculation:** simple-function integral and an Lp norm.
- **Current:** 2 questions, E/M/H **1/1/0**: `measure-010`, `measure-signed-integral-cancellation`. Types: DR, C. Owned refs: K91. Linked refs: K91.
- **Gaps:** Signed integral reference and principal-value cancellation counterexample added. Remaining: nonnegative integral construction, Hölder/Minkowski and Lp completeness. Suitable types: DR, TR, TC, S, C; absent suitable types: TR, TC, S. **Coverage: thin. Target: 5 (2/2/1).**

### M05 — Almost sure / almost everywhere concepts

- **Objective:** Distinguish null-set equality, completeness and almost uniform convergence. Course basis: [O1](#sources-consulted), [C3](#sources-consulted).
- **Definitions:** almost everywhere, completed space, almost uniform convergence. **Results:** Egorov on finite measure; Lusin under regularity conditions.
- **Recognition:** single exceptional set; failure on infinite measure. **Short calculation:** measure of exceptional sets for a moving/spiking sequence.
- **Current:** 3 questions, E/M/H **1/1/1**: `measure-011`, `measure-012`, `measure-019`. Types: DR, TF, C. Owned refs: none. Linked refs: none.
- **Gaps:** a.e./completion definitions, Egorov and Lusin; no exact-topic reference exists. Suitable types: DR, TF, TC, C, I; absent suitable types: TC, I. **Coverage: thin. Target: 7 (2/3/2).**

### M06 — Convergence theorems

- **Objective:** Choose a convergence theorem and test every assumption. Course basis: [O1](#sources-consulted), [L4](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** domination, monotonicity, uniform integrability. **Results:** MCT, Fatou, DCT, Vitali, Scheffé; reverse Fatou with an integrable bound.
- **Recognition:** exchange limit/integral versus merely an inequality. **Short calculation:** limits of simple integrals; escaping mass.
- **Current:** 8 questions, E/M/H **2/4/2**: `measure-002`, `measure-005`, `measure-013`, `measure-014`, `measure-dct-tail-envelope`, `measure-signed-monotone-failure`, `measure-scheffe-density-limit`, `measure-reverse-fatou-upper-bound`. Types: TR, TC, CI, C. Owned refs: K07, K08, K09, K57, K58. Linked refs: K07, K08, K09, K12, K57, K58.
- **Gaps:** Scheffé/reverse Fatou and two distinct envelope/sign failures added. Remaining: Egorov reference, general-measure UI/Vitali and Lusin scope. Suitable types: TR, TC, C, I, S; absent suitable types: I, S. **Coverage: reasonable. Target: 9 (2/4/3).**

### M07 — Product measures

- **Objective:** Construct product measures and interchange integrals lawfully. Course basis: [O1](#sources-consulted), [L4](#sources-consulted).
- **Definitions:** product sigma-algebra, sections, product measure. **Results:** Tonelli; Fubini for integrable signed functions.
- **Recognition:** nonnegative versus absolutely integrable hypotheses; sigma-finite scope. **Short calculation:** evaluate a simple iterated integral.
- **Current:** 5 questions, E/M/H **1/3/1**: `measure-015`, `measure-016`, `measure-product-rectangle`, `measure-fubini-signed-integral`, `measure-fubini-order-failure`. Types: DR, TC, S, C. Owned refs: K59, K60, K61. Linked refs: K59, K60, K61, K91.
- **Gaps:** Added finite but unequal iterated integrals as a Fubini failure case. One Hard slot remains for section/integrability subtleties; core product/Tonelli/Fubini references present. Suitable types: DR, TC, C, S; absent suitable types: none; deepen the objectives above. **Coverage: reasonable. Target: 6 (1/3/2).**

### M08 — Radon-Nikodym theorem

- **Objective:** Recognise a density between measures and its uniqueness class. Course basis: [O1](#sources-consulted), [L4](#sources-consulted).
- **Definitions:** absolute continuity, singularity, RN derivative. **Results:** sigma-finite RN; density chain rule; Lebesgue decomposition.
- **Recognition:** lack of sigma-finiteness; a.e. uniqueness versus pointwise equality. **Short calculation:** discrete density or product of RN derivatives.
- **Current:** 5 questions, E/M/H **1/2/2**: `measure-003`, `measure-006`, `measure-020`, `measure-discrete-rn-density`, `measure-mixed-absolute-continuity`. Types: TR, PR, S, C. Owned refs: K10, K89. Linked refs: K10, K89.
- **Gaps:** Absolute continuity/singularity reference, discrete density and mixed-atom counterexample added. Remaining: RN chain rule and Lebesgue decomposition reference, with one Medium question slot. Suitable types: DR, TR, TC, PR, C, S; absent suitable types: DR, TC. **Coverage: reasonable. Target: 6 (1/3/2).**

### M09 — Probability measures

- **Objective:** Identify laws from determining classes and understand weak convergence. Course basis: [O1](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** probability law, pushforward, tightness, weak convergence. **Results:** uniqueness on generating pi-systems; Portmanteau and Prokhorov with Polish-space hypotheses.
- **Recognition:** equality on generators versus arbitrary classes; tightness versus convergence. **Short calculation:** simple weak-limit/atom example.
- **Current:** 2 questions, E/M/H **1/1/0**: `measure-017`, `measure-law-pushforward`. Types: DR, TC. Owned refs: K90. Linked refs: K90.
- **Gaps:** Pushforward definition and question added. π–λ now available as prerequisite for the original determining-class item. Remaining: a dedicated measure-uniqueness statement, tightness and weak-convergence results. Suitable types: DR, TC, I, C; absent suitable types: I, C. **Coverage: thin. Target: 4 (1/2/1).**

## Stochastic Processes

### SP01 — General definitions

- **Objective:** Distinguish a process, its finite-dimensional laws and its paths. Course basis: [C1](#sources-consulted), [O2](#sources-consulted).
- **Definitions:** process, finite-dimensional distribution, modification, indistinguishability, cadlag. **Results:** Kolmogorov extension and continuity criterion with stated state-space/moment assumptions.
- **Recognition:** same one-time laws do not determine path equality. **Short calculation:** covariance/moment increment check for a continuity criterion.
- **Current:** 4 questions, E/M/H **2/1/1**: `process-007`, `process-008`, `process-027`, `process-cadlag-path-definition`. Types: D, DR, CI, TF. Owned refs: K92. Linked refs: K92.
- **Gaps:** Càdlàg path definition and recognition added. Remaining: modifications/indistinguishability, finite-dimensional distributions and Kolmogorov extension/continuity references. Suitable types: D, DR, CI, TF, C; absent suitable types: C. **Coverage: thin. Target: 5 (2/2/1).**

### SP02 — Filtrations

- **Objective:** Identify which information is available and what measurability is needed. Course basis: [O1](#sources-consulted), [O2](#sources-consulted).
- **Definitions:** filtration, usual conditions, adapted, progressive, predictable. **Results:** continuous adapted implies predictable; stopping-time measurability under stated hypotheses.
- **Recognition:** future information destroys Brownian increment independence. **Short calculation:** test adaptedness of a shifted process.
- **Current:** 4 questions, E/M/H **2/1/1**: `process-009`, `process-010`, `process-030`, `process-continuity-measurability`. Types: DR, I, C. Owned refs: K15, K16, K68, K69. Linked refs: K15, K16, K23, K68, K69.
- **Gaps:** Progressive/predictable definitions and continuous-path implication added. Remaining: adapted càdlàg process that is not predictable; usual augmentation/reference scope. Suitable types: DR, PR, C, I; absent suitable types: PR. **Coverage: reasonable. Target: 5 (2/2/1).**

### SP03 — Random walks

- **Objective:** Use simple random walks as martingale examples. Course basis: [L3](#sources-consulted).
- **Definitions:** increments, hitting time, recurrence. **Results:** gambler's ruin via valid optional stopping; square-compensated walk.
- **Recognition:** choose a martingale and justify stopping. **Short calculation:** finite-barrier hit probability or expected duration.
- **Current:** 1 questions, E/M/H **1/0/0**: `process-011`. Types: PR. Owned refs: none. Linked refs: K18, K19.
- **Gaps:** random-walk and gambler's-ruin references. Suitable types: PR, TC, S, C; absent suitable types: TC, S, C. **Coverage: thin. Target: 4 (2/2/0).**

### SP04 — Markov chains

- **Objective:** Classify states and distinguish stationarity from convergence. Course basis: [L3](#sources-consulted), [L5](#sources-consulted).
- **Definitions:** communicating class, recurrence, period, invariant law, reversibility. **Results:** Chapman–Kolmogorov; finite irreducible stationary law; aperiodic convergence; detailed balance.
- **Recognition:** periodic counterexample; finite versus countably infinite states. **Short calculation:** solve a two-state stationary law.
- **Current:** 7 questions, E/M/H **3/3/1**: `process-003`, `process-012`, `process-013`, `process-014`, `process-stationary-two-state-balance`, `process-stationary-not-reversible`, `process-infinite-chain-invariant-mass`. Types: D, DR, TR, TC, S, C. Owned refs: K21, K93, K94. Linked refs: K21, K93, K94.
- **Gaps:** Seven-question budget filled: stationary calculation, irreversible invariant cycle and infinite-state normalisation failure added. Stationarity/detailed balance and positive recurrence now referenced. Remaining reference gaps: full state classification and exact aperiodic convergence theorem. Suitable types: D, DR, TR, TC, S, C; absent suitable types: none; deepen the objectives above. **Coverage: reasonable. Target: 7 (3/3/1).**

### SP05 — Continuous-time Markov chains

- **Objective:** Translate between jump rates, holding times and transitions. Course basis: [L3](#sources-consulted).
- **Definitions:** Q-matrix, holding time, embedded jump chain, explosion. **Results:** finite-state transition semigroup and forward/backward equations.
- **Recognition:** row conventions; finite-state guarantees versus infinite-state explosion. **Short calculation:** exponential waiting probability; simple matrix exponential.
- **Current:** 5 questions, E/M/H **1/3/1**: `process-015`, `process-016`, `process-017`, `process-embedded-jump-probability`, `process-conservative-explosive-chain`. Types: DR, TR, PR, I. Owned refs: K95, K96. Linked refs: K95, K96.
- **Gaps:** Five-question budget filled: jump-destination law and conservative-generator/explosive-minimal-chain distinction added. Rates/jump construction and explosion referenced. Remaining: precise finite-state semigroup/equation entry; original matrix-exponential question remains unlinked. Suitable types: DR, PR, TR, S, TC; absent suitable types: S, TC. **Coverage: reasonable. Target: 5 (1/3/1).**

### SP06 — Poisson processes

- **Objective:** Identify counting processes and condition on event counts. Course basis: [L3](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** homogeneous Poisson, compensator, compound Poisson. **Results:** exponential waiting times; conditional binomial law; thinning/superposition.
- **Recognition:** stationary versus independent increments; natural filtration. **Short calculation:** conditional count or compound-Poisson mean.
- **Current:** 4 questions, E/M/H **3/1/0**: `process-001`, `process-005`, `process-018`, `process-019`. Types: PR, CI, S. Owned refs: K22. Linked refs: K18, K22.
- **Gaps:** conditional-binomial, thinning and compound-Poisson entries. Suitable types: DR, CI, PR, S, TC; absent suitable types: DR, TC. **Coverage: thin. Target: 6 (3/2/1).**

### SP07 — Martingales

- **Objective:** Use martingale/submartingale tools with correct moment assumptions. Course basis: [O1](#sources-consulted), [O2](#sources-consulted), [L5](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** martingale, sub/supermartingale, martingale transform, closed/UI martingale. **Results:** discrete Doob decomposition; maximal/Lp inequalities; upcrossing and convergence; UI closure.
- **Recognition:** a.s. convergence need not be L1; nonnegative supermartingale convergence scope. **Short calculation:** conditional mean or a Doob probability bound.
- **Current:** 6 questions, E/M/H **2/2/2**: `process-002`, `process-020`, `process-028`, `process-conditional-drift-sign`, `process-doob-maximum-bound`, `process-martingale-mass-loss`. Types: DR, TC, PR, S, I, C. Owned refs: K18, K19, K20, K62, K63, K64, K65. Linked refs: K12, K18, K19, K20, K62, K63, K64, K65.
- **Gaps:** Doob inequalities, a.s. convergence and UI closure now referenced; drift recognition, bound and mass-loss example added. Remaining: martingale transforms/Doob decomposition and further Lp applications. Suitable types: DR, TR, TC, I, C, S; absent suitable types: TR. **Coverage: reasonable. Target: 9 (2/4/3).**

### SP08 — Stopping times

- **Objective:** Recognise stopping times and justify optional sampling. Course basis: [O1](#sources-consulted), [O2](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** stopping time, stopped process, stopped sigma-algebra. **Results:** bounded-time and UI optional sampling; continuous-time versions.
- **Recognition:** hitting versus last-exit times; finite a.s. is not bounded/integrability control. **Short calculation:** finite-barrier stopped expectation.
- **Current:** 7 questions, E/M/H **1/4/2**: `process-004`, `process-006`, `process-021`, `process-hitting-time-event`, `process-stopped-information`, `process-bounded-walk-square`, `process-continuous-sampling-bound`. Types: DR, TC, PR, S, C. Owned refs: K17, K24, K66, K67. Linked refs: K17, K18, K24, K65, K66, K67.
- **Gaps:** Seven-question budget filled with hitting event, stopped information, bounded calculation and continuous bounded sampling. Remaining: explicit continuous unbounded UI sampling version and path-regularity non-examples. Suitable types: DR, TC, C, S, I; absent suitable types: I. **Coverage: reasonable. Target: 7 (1/4/2).**

### SP09 — Brownian motion

- **Objective:** Relate Brownian paths, increments and stopping behaviour. Course basis: [O2](#sources-consulted), [C1](#sources-consulted).
- **Definitions:** Brownian motion relative to a filtration. **Results:** scaling, reflection principle, strong Markov property.
- **Recognition:** deterministic versus stopping times; infinite variation versus finite QV. **Short calculation:** maximum/hitting probability using reflection.
- **Current:** 2 questions, E/M/H **1/1/0**: `process-022`, `process-023`. Types: TR, PR. Owned refs: K23. Linked refs: K23.
- **Gaps:** reflection and strong Markov entries; construction/regularity references later. Suitable types: DR, PR, TR, TC, S, C; absent suitable types: DR, TC, S, C. **Coverage: thin. Target: 6 (2/3/1).**

### SP10 — Gaussian processes

- **Objective:** Recognise joint Gaussianity and covariance specifications. Course basis: [C1](#sources-consulted).
- **Definitions:** Gaussian process, covariance kernel, Brownian bridge. **Results:** Gaussian conditioning; mean/covariance determine Gaussian finite-dimensional laws.
- **Recognition:** normal marginals alone are insufficient. **Short calculation:** bridge variance or conditional Gaussian mean.
- **Current:** 1 questions, E/M/H **0/1/0**: `process-024`. Types: DR. Owned refs: none. Linked refs: none.
- **Gaps:** Gaussian-process/conditioning/bridge references. Suitable types: DR, PR, S, C; absent suitable types: PR, S, C. **Coverage: thin. Target: 3 (1/2/0).**

### SP11 — Birth-death processes

- **Objective:** Check invariant laws and explosion in birth–death models. Course basis: [L3](#sources-consulted).
- **Definitions:** birth/death rates, minimal process, explosion time. **Results:** detailed balance and normalisation; reciprocal-rate pure-birth nonexplosion criterion.
- **Recognition:** balance equations do not guarantee a probability law. **Short calculation:** geometric stationary weights or a reciprocal series.
- **Current:** 2 questions, E/M/H **0/1/1**: `process-025`, `process-029`. Types: TR, TC. Owned refs: none. Linked refs: none.
- **Gaps:** birth–death, stationary weights and pure-birth nonexplosion references. Suitable types: DR, TR, TC, S, C; absent suitable types: DR, S, C. **Coverage: thin. Target: 4 (0/2/2).**

### SP12 — Levy processes

- **Objective:** Identify Lévy processes and distinguish diffusion from jump parts. Course basis: [C1](#sources-consulted), [L3](#sources-consulted).
- **Definitions:** stationary independent increments, stochastic continuity, Lévy measure, Poisson random measure. **Results:** Lévy–Khintchine with a fixed truncation convention; compound-Poisson special case.
- **Recognition:** Brownian motion versus compound Poisson; finite activity versus finite variation. **Short calculation:** compound-Poisson characteristic exponent.
- **Current:** 1 questions, E/M/H **0/1/0**: `process-026`. Types: DR. Owned refs: none. Linked refs: none.
- **Gaps:** Lévy-process definition, Lévy measure/Poisson random measure and Lévy–Khintchine; only one definition question exists. Suitable types: DR, CI, TR, TC, C, S; absent suitable types: CI, TR, TC, C, S. **Coverage: thin. Target: 4 (0/2/2).**

## Stochastic Calculus

### SC01 — Brownian motion properties

- **Objective:** Use conditional Brownian laws in stochastic-calculus settings. Course basis: [L3](#sources-consulted), [O2](#sources-consulted).
- **Definitions:** Brownian increment and filtration-relative Brownian motion. **Results:** conditional Gaussian law; Brownian polynomial/exponential martingales.
- **Recognition:** variance/standard deviation and anticipating information. **Short calculation:** conditional second moment or Gaussian increment probability.
- **Current:** 2 questions, E/M/H **2/0/0**: `calc-001`, `calc-004`. Types: PR, S. Owned refs: none. Linked refs: K18, K23.
- **Gaps:** Brownian martingale examples; no duplicate Brownian definition needed. Suitable types: PR, S, TC, C; absent suitable types: TC, C. **Coverage: thin. Target: 4 (2/2/0).**

### SC02 — Quadratic variation

- **Objective:** Compute variation/covariation and distinguish brackets. Course basis: [O2](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** quadratic variation, covariation, predictable bracket. **Results:** finite-variation continuous paths have zero QV; integral bracket identity.
- **Recognition:** square of value versus QV; optional versus predictable bracket with jumps. **Short calculation:** QV of sigma times Brownian motion plus drift; correlated covariation.
- **Current:** 4 questions, E/M/H **2/2/0**: `calc-002`, `calc-qv-drift-plus-noise`, `calc-integral-bracket-random`, `calc-correlated-covariation`. Types: TR, PR, S. Owned refs: K25, K70. Linked refs: K25, K70.
- **Gaps:** Continuous integral brackets and correlated covariation added. Remaining: bracket failure conditions and optional/predictable jump-bracket distinction. Suitable types: DR, TR, S, I, C; absent suitable types: DR, I, C. **Coverage: reasonable. Target: 6 (2/3/1).**

### SC03 — Stochastic integration

- **Objective:** Identify admissible integrands and stochastic integration conventions. Course basis: [O2](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** predictable elementary process; integrator; local integrability. **Results:** construction by completion/localisation; associativity under hypotheses.
- **Recognition:** Itô versus pathwise integration; adaptedness alone insufficient. **Short calculation:** elementary integral on a clipped interval.
- **Current:** 3 questions, E/M/H **0/3/0**: `calc-007`, `calc-elementary-left-information`, `calc-local-integrand-bracket-measure`. Types: DR. Owned refs: K97. Linked refs: K26, K69, K97.
- **Gaps:** Continuous-local-martingale integrability reference and bracket-weighted definition added. Remaining: basic integral properties and a localisation/approximation failure case. Suitable types: DR, TC, CI, S, C; absent suitable types: TC, CI, S, C. **Coverage: reasonable. Target: 5 (1/3/1).**

### SC04 — Ito integral

- **Objective:** Use isometry and distinguish local from true L2 integrals. Course basis: [O2](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** Brownian Itô integral, square-integrable integrand. **Results:** Itô isometry and martingale property; covariance identity.
- **Recognition:** finite pathwise energy versus finite expected energy. **Short calculation:** variance/covariance of deterministic-integrand integrals.
- **Current:** 5 questions, E/M/H **1/3/1**: `calc-008`, `calc-009`, `calc-isometry-time-integrand`, `calc-finite-energy-infinite-moment`, `calc-deterministic-integral-law`. Types: TR, TC, S, I. Owned refs: K26, K27, K71, K98. Linked refs: K18, K26, K27, K71, K98.
- **Gaps:** Deterministic-integrand Gaussian-law reference and question added. Only one Hard question slot remains, for random-integrand/cross-isometry or construction subtleties. Suitable types: DR, TR, TC, S, I, C; absent suitable types: DR, C. **Coverage: reasonable. Target: 6 (1/3/2).**

### SC05 — Ito's lemma

- **Objective:** Apply the stochastic chain rule with the correct correction. Course basis: [O2](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** C1,2 regularity and differential notation. **Results:** one-dimensional and multidimensional Itô formula.
- **Recognition:** factor one half; cross terms; non-smooth functions need another theorem. **Short calculation:** square, exponential, logarithm or two-variable product.
- **Current:** 2 questions, E/M/H **0/2/0**: `calc-003`, `calc-010`. Types: TR, S. Owned refs: K28. Linked refs: K28.
- **Gaps:** multidimensional version; local time/Tanaka explicitly later. Suitable types: TR, TC, S, C; absent suitable types: TC, C. **Coverage: thin. Target: 6 (1/4/1).**

### SC06 — Continuous martingales

- **Objective:** Recognise Brownian motion from martingale structure and use random clocks. Course basis: [O3](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** continuous local martingale; inverse QV clock. **Results:** Lévy characterisation; DDS; constant continuous finite-variation local martingale.
- **Recognition:** continuity, initial value, filtration and infinite-clock conditions. **Short calculation:** bracket of a time-scaled Brownian martingale.
- **Current:** 2 questions, E/M/H **0/0/2**: `calc-013`, `calc-025`. Types: TR, I. Owned refs: K34, K35. Linked refs: K25, K29, K35.
- **Gaps:** zero-QV constant theorem; Lévy has a reference but no direct question; DDS lacks conditions/counterexample coverage. Suitable types: TR, TC, I, C, S; absent suitable types: TC, C, S. **Coverage: thin. Target: 7 (0/3/4).**

### SC07 — Local martingales

- **Objective:** Distinguish local, true and uniformly integrable martingales. Course basis: [O2](#sources-consulted), [O3](#sources-consulted).
- **Definitions:** localising sequence; strict local martingale. **Results:** nonnegative local implies supermartingale; bounded local implies true martingale.
- **Recognition:** stopping does not automatically permit expectation limits. **Short calculation:** test expectation loss in a stated example.
- **Current:** 3 questions, E/M/H **0/2/1**: `calc-006`, `calc-localising-sequence-definition`, `calc-bounded-local-criterion`. Types: DR, TC, I. Owned refs: K29, K42, K72. Linked refs: K29, K42, K72.
- **Gaps:** Localising sequence and bounded-local criterion added. Remaining: a reviewed strict-local-martingale example and integrability failure conditions. Suitable types: DR, I, TC, C, S; absent suitable types: C, S. **Coverage: thin. Target: 5 (0/2/3).**

### SC08 — Semimartingales

- **Objective:** Distinguish continuous semimartingales from more general jump processes. Course basis: [O2](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** local-martingale plus adapted finite-variation decomposition; cadlag semimartingale. **Results:** continuous product rule; jump-corrected product formula.
- **Recognition:** zero QV does not imply finite variation; special versus general semimartingale. **Short calculation:** covariation/product differential.
- **Current:** 2 questions, E/M/H **0/2/0**: `calc-011`, `calc-012`. Types: DR, TR. Owned refs: K30. Linked refs: K25, K28, K30.
- **Gaps:** general cadlag definition and jump formula; current entry deliberately covers only continuous processes. Suitable types: DR, TR, PR, TC, C; absent suitable types: PR, TC, C. **Coverage: thin. Target: 5 (0/3/2).**

### SC09 — Stochastic differential equations

- **Objective:** Recognise and solve elementary SDE models. Course basis: [L3](#sources-consulted), [O3](#sources-consulted).
- **Definitions:** integral SDE, geometric Brownian motion, Ornstein–Uhlenbeck. **Results:** explicit linear solutions and their moments.
- **Recognition:** drift of X versus log X; long-run OU mean/variance. **Short calculation:** GBM transform or OU conditional mean/variance.
- **Current:** 3 questions, E/M/H **1/2/0**: `calc-014`, `calc-015`, `calc-sde-integral-definition`. Types: DR, S. Owned refs: K99. Linked refs: K28, K99.
- **Gaps:** Integral SDE definition/reference added. Remaining: explicit linear-model solution entries and deeper coefficient/model distinctions. Suitable types: DR, S, PR, C; absent suitable types: PR, C. **Coverage: thin. Target: 5 (1/3/1).**

### SC10 — Strong and weak solutions

- **Objective:** Separate prescribed noise from existence in law. Course basis: [O3](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** strong/weak solution; pathwise uniqueness; uniqueness in law. **Results:** Yamada–Watanabe standard nonexplosive version.
- **Recognition:** existence versus uniqueness; invalid converses. **Short calculation:** classify a simple coefficient/example rather than force arithmetic.
- **Current:** 3 questions, E/M/H **0/2/1**: `calc-016`, `calc-026`, `calc-pathwise-uniqueness-definition`. Types: DR, TR. Owned refs: K100, K31, K32, K39. Linked refs: K100, K31, K32, K39.
- **Gaps:** Pathwise uniqueness versus uniqueness in law now has a dedicated reference and recognition question. Remaining: two Hard slots for separating examples/invalid converses, without repeating Yamada–Watanabe recall. Suitable types: DR, TR, TC, I, C; absent suitable types: TC, I, C. **Coverage: reasonable. Target: 5 (0/2/3).**

### SC11 — Existence and uniqueness

- **Objective:** Check sufficient hypotheses for local/global well-posedness. Course basis: [O3](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** Lipschitz, linear growth, explosion/local solution. **Results:** global Lipschitz strong existence/pathwise uniqueness; local version up to explosion.
- **Recognition:** local Lipschitz alone need not prevent explosion; bounded Borel not enough generally. **Short calculation:** coefficient growth/Lipschitz check.
- **Current:** 1 questions, E/M/H **0/1/0**: `calc-017`. Types: TC. Owned refs: none. Linked refs: K31.
- **Gaps:** global theorem and local-explosion formulation; strong-solution definition is not a substitute. Suitable types: TC, C, I, S; absent suitable types: C, I, S. **Coverage: thin. Target: 4 (0/2/2).**

### SC12 — Girsanov theorem

- **Objective:** Track measure, density, signs and true-martingale conditions. Course basis: [O3](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** stochastic exponential, equivalent measure, density process. **Results:** Brownian Girsanov; Novikov sufficient condition.
- **Recognition:** sufficient versus necessary; local exponential may fail to define a probability density. **Short calculation:** constant-drift change of measure.
- **Current:** 2 questions, E/M/H **0/0/2**: `calc-018`, `calc-019`. Types: TR, TC. Owned refs: K33, K41. Linked refs: K33, K41.
- **Gaps:** stochastic-exponential definition; more sign/density examples before broader Girsanov variants. Suitable types: TR, TC, S, C, I; absent suitable types: S, C, I. **Coverage: thin. Target: 5 (0/2/3).**

### SC13 — Martingale representation

- **Objective:** Identify when Brownian representation holds. Course basis: [O3](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** Brownian natural augmented filtration; predictable representation. **Results:** finite-horizon L2 representation and uniqueness of integrand.
- **Recognition:** enlarged filtration can introduce orthogonal noise. **Short calculation:** identify H for W_T or W_T squared minus T.
- **Current:** 1 questions, E/M/H **0/0/1**: `calc-020`. Types: TC. Owned refs: K36. Linked refs: K36.
- **Gaps:** elementary explicit representations; local/other-noise variants deferred. Suitable types: TR, TC, C, S; absent suitable types: TR, C, S. **Coverage: thin. Target: 3 (0/1/2).**

### SC14 — Feynman-Kac

- **Objective:** Connect a terminal-value PDE and a stochastic representation. Course basis: [O4](#sources-consulted).
- **Definitions:** discount, terminal data, classical solution. **Results:** bounded-classical-solution Feynman–Kac; uniqueness in that class.
- **Recognition:** representation does not prove regularity/existence; sign of discount. **Short calculation:** recover PDE from constant discount or heat semigroup.
- **Current:** 1 questions, E/M/H **0/0/1**: `calc-023`. Types: TR. Owned refs: K38. Linked refs: K38.
- **Gaps:** inhomogeneous/source-term variant later; first test stated assumptions and direction. Suitable types: TR, TC, S, C; absent suitable types: TC, S, C. **Coverage: thin. Target: 3 (0/1/2).**

### SC15 — Infinitesimal generators

- **Objective:** Distinguish a formal differential expression from an operator. Course basis: [O4](#sources-consulted).
- **Definitions:** Feller semigroup, generator, domain, adjoint. **Results:** Itô drift identification; Dynkin formula with conditions.
- **Recognition:** boundary/domain matters; drift coefficient versus volatility squared. **Short calculation:** apply L to x and x squared.
- **Current:** 1 questions, E/M/H **0/1/0**: `calc-021`. Types: D. Owned refs: K37. Linked refs: K37.
- **Gaps:** semigroup/domain and Dynkin formula entries; current generator entry is only a concise starting point. Suitable types: D, DR, PR, S, TC; absent suitable types: DR, PR, S, TC. **Coverage: thin. Target: 2 (0/2/0).**

### SC16 — Kolmogorov equations

- **Objective:** Distinguish forward/backward equations and variables. Course basis: [O4](#sources-consulted), [L3](#sources-consulted).
- **Definitions:** transition density, formal adjoint, forward/backward evolution. **Results:** Kolmogorov equations under regularity/domain assumptions.
- **Recognition:** initial versus terminal state; adjoint and sign conventions. **Short calculation:** form the forward equation for constant-coefficient diffusion.
- **Current:** 1 questions, E/M/H **0/1/0**: `calc-022`. Types: TR. Owned refs: none. Linked refs: K37.
- **Gaps:** dedicated equation statements; generator intuition does not supply their assumptions. Suitable types: TR, TC, S, C; absent suitable types: TC, S, C. **Coverage: thin. Target: 2 (0/1/1).**

### SC17 — Martingale problems

- **Objective:** Identify dynamics through laws and test functions. Course basis: [O4](#sources-consulted), [C2](#sources-consulted).
- **Definitions:** canonical law, test-function domain, martingale problem, well-posedness. **Results:** SDE-to-martingale-problem implication; equivalence under specified hypotheses.
- **Recognition:** local versus true martingale formulations; initial law must be given. **Short calculation:** test the compensating drift for a simple polynomial.
- **Current:** 1 questions, E/M/H **0/0/1**: `calc-024`. Types: DR. Owned refs: K40. Linked refs: K40.
- **Gaps:** well-posedness/equivalence statement; current definition is only continuous-path/true-martingale. Suitable types: DR, TC, I, C; absent suitable types: TC, I, C. **Coverage: thin. Target: 2 (0/0/2).**

## Focus audit: important gaps hidden by broad topic totals

These are **overlapping objective-level views**, not additional subcategories or extra questions to add to the totals. “Missing” means no direct question on that objective; a neighbouring question or a prerequisite link is not counted. The targets above reserve space for these objectives within existing topics.

| Objective | Direct question evidence | Current reference position | Coverage / next action |
| --- | --- | --- | --- |
| Conditional expectation | Batch A adds `prob-ce-partition-mean`, `prob-ce-known-factor`, `prob-ce-jensen-direction`, `prob-ce-nonnested-tower`; topic total 7 (1/4/2). This is a topic pool, not a count of direct tests of every objective. | K11, K51, K52; see exact statements and topic row. | Batch A adds partition, pull-out, Jensen and non-nested tower tests plus conditional variance reference. Remaining: Gaussian conditioning and a direct total-variance calculation. |
| Convergence implications and UI | Batch A adds `prob-lp-difference-definition`, `prob-subsequence-quantifiers`, `prob-equal-laws-not-probability`, `prob-slutsky-random-denominator`; topic total 8 (2/4/2). This is a topic pool, not a count of direct tests of every objective. | K04, K05, K06, K12, K53, K54, K55, K56; see exact statements and topic row. | Initial eight-question budget filled; Lp, subsequence quantifiers, converse failure and Slutsky/CMT now covered. Later review: discontinuity-set conditions and random-limit joint-convergence failures. |
| Advanced integration convergence | Batch A adds `measure-dct-tail-envelope`, `measure-signed-monotone-failure`, `measure-scheffe-density-limit`, `measure-reverse-fatou-upper-bound`; topic total 8 (2/4/2). This is a topic pool, not a count of direct tests of every objective. | K07, K08, K09, K57, K58; see exact statements and topic row. | Scheffé/reverse Fatou and two distinct envelope/sign failures added. Remaining: Egorov reference, general-measure UI/Vitali and Lusin scope. |
| Stopping-time definition | Batch A adds `process-hitting-time-event`, `process-stopped-information`, `process-bounded-walk-square`, `process-continuous-sampling-bound`; topic total 7 (1/4/2). This is a topic pool, not a count of direct tests of every objective. | K17, K24, K66, K67; see exact statements and topic row. | Seven-question budget filled with hitting event, stopped information, bounded calculation and continuous bounded sampling. Remaining: explicit continuous unbounded UI sampling version and path-regularity non-examples. |
| Optional stopping/sampling | Batch A adds `process-hitting-time-event`, `process-stopped-information`, `process-bounded-walk-square`, `process-continuous-sampling-bound`; topic total 7 (1/4/2). This is a topic pool, not a count of direct tests of every objective. | K17, K24, K66, K67; see exact statements and topic row. | Seven-question budget filled with hitting event, stopped information, bounded calculation and continuous bounded sampling. Remaining: explicit continuous unbounded UI sampling version and path-regularity non-examples. |
| Martingale convergence and bounds | Batch A adds `process-conditional-drift-sign`, `process-doob-maximum-bound`, `process-martingale-mass-loss`; topic total 6 (2/2/2). This is a topic pool, not a count of direct tests of every objective. | K18, K19, K20, K62, K63, K64, K65; see exact statements and topic row. | Doob inequalities, a.s. convergence and UI closure now referenced; drift recognition, bound and mass-loss example added. Remaining: martingale transforms/Doob decomposition and further Lp applications. |
| Local martingale definition and localisation | Batch A adds `calc-localising-sequence-definition`, `calc-bounded-local-criterion`; topic total 3 (0/2/1). This is a topic pool, not a count of direct tests of every objective. | K29, K42, K72; see exact statements and topic row. | Localising sequence and bounded-local criterion added. Remaining: a reviewed strict-local-martingale example and integrability failure conditions. |
| Brownian motion | `process-022`, `process-023`, `calc-001`, `calc-004` (4; 3/1/0); `process-030` separately tests enlargement. | Core definition/properties present. | Thin: reflection, strong Markov and sample-path condition tests absent. |
| Quadratic variation / covariation | Batch A adds `calc-qv-drift-plus-noise`, `calc-integral-bracket-random`, `calc-correlated-covariation`; topic total 4 (2/2/0). This is a topic pool, not a count of direct tests of every objective. | K25, K70; see exact statements and topic row. | Continuous integral brackets and correlated covariation added. Remaining: bracket failure conditions and optional/predictable jump-bracket distinction. |
| Itô isometry / admissibility | `calc-008`, `calc-009`, `calc-isometry-time-integrand`, `calc-finite-energy-infinite-moment`, `calc-deterministic-integral-law`; Ito integral topic total 5 (1/3/1). `calc-local-integrand-bracket-measure` adds a general-integrator definition in Stochastic integration. | K26, K27, K71, K98 plus K97 for bracket-weighted local integrability. | Initial definition, variance and deterministic-Gaussian coverage is reasonable; the remaining Ito integral slot is Hard. Direct random-integrand/cross-isometry and construction subtleties remain. |
| Itô formula / semimartingales | `calc-003`, `calc-010` and `calc-011`, `calc-012` (4; 0/4/0); `calc-014` is an application. | Continuous one-dimensional formula/decomposition only. | Thin: multidimensional cross terms and precise jump/general-semimartingale scope missing. |
| Dambis–Dubins–Schwarz | `calc-025` (1; 0/0/1) | Accurate infinite-QV version with inverse clock and time-changed filtration. | Thin: conditions, flat clock and finite-terminal-QV variant recognition missing. |
| Lévy characterisation | None (0; 0/0/0). | `thm-levy-characterisation` exists, with no incoming question link. | Missing question coverage; add theorem recognition plus a failed-continuity/bracket comparison. |
| Girsanov / Novikov | `calc-018`, `calc-019` (2; 0/0/2) | Finite-horizon Brownian version and Novikov present. | Thin: density normalisation, constant-drift calculation and necessity-versus-sufficiency distinction. |
| Martingale representation | `calc-020` (1; 0/0/1) | L2 result in augmented Brownian natural filtration. | Thin: explicit integrands and counterexample with extra independent noise. |
| SDE existence / uniqueness | `calc-017` (1; 0/1/0) | Strong-solution definition only; no Lipschitz existence theorem. | Thin: theorem reference, explosion scope and coefficient checks first. |
| Strong versus weak solutions | `calc-016`, `calc-026`, `calc-pathwise-uniqueness-definition` (3; 0/2/1) | Both solution definitions, Yamada–Watanabe and uniqueness notions exist. | Reasonable initial recognition; separating examples and invalid converse tests remain. |
| Generators / Kolmogorov equations | `calc-021`, `calc-022` (2; 0/2/0); CTMC questions remain in Processes. | Generator definition; equations only mentioned informally. | Thin: domain/adjoint recognition, Dynkin and precise equation hypotheses. |
| Feynman–Kac / martingale problem | `calc-023`, `calc-024` (2; 0/0/2) | Bounded-classical representation and continuous-path true-martingale definition. | Thin: do not confuse representation with PDE solvability or a local problem with a true-martingale problem. |
| Lévy processes | `process-026` (1; 0/1/0) | No dedicated reference. | Thin: definition, Lévy–Khintchine/truncation, compound-Poisson example and jump-activity distinction. |

### Audit corrections and cautions

The historical reference mapping review flags `process-028` as needing a full martingale convergence/closure theorem. More precisely, its current question **assumes a.s. convergence and an integrable limit**; the existing UI/L1 proposition is sufficient for that specific equivalence. Batch A supplied martingale convergence and UI closure references for the broader learning objective, but the present link is not mathematically inadequate for the question as written.

Similarly, `stat-019` can be solved directly by the normal law and continuous mapping; a second-order delta entry is useful curriculum coverage, not a mandatory premise of that particular example. `stat-017` sits in Sufficiency while its linked Rao–Blackwell entry is stored in Estimation; `calc-001` uses the Brownian reference in Processes. These are valid cross-topic links, not taxonomy errors. Do not move IDs or duplicate entries to make topic counts look fuller.

The existing `escaping-mass` family (`prob-023`, `measure-005`) deliberately tests two viewpoints of one example. Expansion should introduce other counterexamples instead of repeatedly changing the same spike's parameters. Existing Hard labels such as DDS/Yamada–Watanabe recall should be reviewed for distractor depth; do not silently relabel the bank merely to hit a proposed balance.

## Prioritised expansion plan

A milestone of 300 is an initial breadth/depth target, not “completion” of the university courses. The original five-subject budgets add **180** from 120; after Batch B, **120** remain, and each question must consume exactly one subtopic slot. Write in small reviewed batches, filling prerequisite/reference gaps before testing advanced consequences.

| Order | New Q: Probability / Statistics / Measure / Processes / Calculus | Total / bank afterwards | Main purpose |
| --- | --- | --- | --- |
| A — complete | 8 / 0 / 6 / 8 / 8 | 30 / 150 | Conditional expectation, convergence, integration hypotheses, stopping, martingales and elementary integral/QV skills. Exact allocation below. |
| B — complete | 4 / 8 / 8 / 6 / 4 | 30 / 180 | Independence/Borel–Cantelli, inference definitions, product/extension/RN foundations, Markov/CTMC references, integrand/solution definitions. |
| C — continuous analysis | 3 / 0 / 2 / 8 / 17 | 30 / 210 | Brownian strong Markov/reflection, local/continuous martingales, Lévy characterisation, DDS, isometry and multidimensional Itô; advanced convergence links. |
| D — inference and well-posedness | 5 / 10 / 4 / 3 / 8 | 30 / 240 | Transforms/limits, sufficiency/testing/regression, density/product results, birth–death explosion, strong/weak solutions and Lipschitz/explosion distinctions. |
| E — measure change and applications | 8 / 6 / 6 / 5 / 5 | 30 / 270 | Probability calculations/concentration, Bayesian/interval/asymptotic skills, remaining convergence references, Lévy models, Girsanov and representation. |
| F — close reviewed gaps | 7 / 6 / 4 / 5 / 8 | 30 / 300 | Remaining target slots; generator/PDE/martingale-problem distinctions, missing types and failure cases. Re-audit before authoring, rather than filling arbitrary numerical variants. |
| **Total additions** | **35 / 30 / 30 / 35 / 50** | **180 / 300** | Original 120-to-300 plan; A and B are complete. Remaining C–F add 120: 23 / 22 / 16 / 21 / 38 by subject. |

Batch themes after B are provisional; the per-topic budgets and actual gaps take precedence. Do not exceed a filled topic to preserve a theme. Some missing definitions should be added even when their question is scheduled in a later batch, to support existing questions.

### Batch A — implemented: 30 questions, 6 Easy / 18 Medium / 6 Hard

| Existing subcategory | Add (E/M/H) | Distinct objectives, not parameter variants |
| --- | --- | --- |
| Probability / Conditional expectation | 4 (1/2/1) | Finite partition; taking out what is known; conditional Jensen; conditional variance/tower failure with non-nested information. |
| Probability / Modes of convergence | 4 (1/3/0) | Lp definition; subsequence implication; a converse counterexample; a Slutsky/continuous-mapping distinction. |
| Measure Theory / Convergence theorems | 4 (0/2/2) | Two assumption-selection/failure cases; Scheffé recognition; reverse-Fatou envelope. Keep distinct from the existing escaping-mass family. |
| Measure Theory / Product measures | 2 (1/1/0) | Product measure definition; a short Tonelli/Fubini application with sign/integrability check. |
| Stochastic Processes / Martingales | 3 (1/1/1) | Sub/supermartingale recognition; simple Doob bound; a.s. versus L1 convergence conditions. |
| Stochastic Processes / Stopping times | 4 (1/2/1) | Hitting-time recognition; stopped sigma-algebra; valid bounded stopping calculation; continuous-time sampling hypotheses. |
| Stochastic Processes / Filtrations | 1 (0/1/0) | Adapted versus progressive/predictable under specified path regularity. |
| Stochastic Calculus / Quadratic variation | 3 (1/2/0) | Drift-plus-Brownian QV; integral bracket; correlated covariation. |
| Stochastic Calculus / Ito integral | 2 (0/1/1) | Isometry variance calculation; pathwise energy versus true L2 martingale guarantee. |
| Stochastic Calculus / Stochastic integration | 1 (0/1/0) | Predictable elementary integrand/non-anticipation recognition. |
| Stochastic Calculus / Local martingales | 2 (0/2/0) | Localising-sequence definition; bounded-local true-martingale criterion. |
| **Total** | **30 (6/18/6)** | All within the final subtopic/difficulty budgets. |

Completed with 22 new references (K51–K72): conditional expectation properties/variance, Lp/subsequence/Slutsky, Scheffé/reverse Fatou, product measure/Fubini/Tonelli, Doob and martingale convergence, stopped sigma-algebra/continuous optional sampling, predictable integrands, integral brackets and bounded-local criterion. Reuse existing definitions when sufficient; this is a scope list rather than a forced count of new objects. New IDs must be unique and meaningful; do not preassign or reuse retired `calc-005`.

### Batch B — implemented: 30 questions, 12 Easy / 14 Medium / 4 Hard

Subject additions are exactly **4 / 8 / 8 / 6 / 4**. Difficulty follows the remaining per-topic budgets and the actual demands of each item. Basic inference definitions use Easy slots; the four Hard items concern pairwise Borel–Cantelli, failed integral interchange, infinite-state invariant mass and explosion. No Hard quota was forced into elementary definitions.

| Subject / subcategory | Added E/M/H | Remaining E/M/H to 300 | Batch B objective |
| --- | --- | --- | --- |
| Probability / Probability spaces | 0/1/0 | 1/0/0 | prob-summable-events-limsup |
| Probability / Independence | 1/0/1 | 0/0/0 | prob-mutual-independence-subsets, prob-pairwise-borel-cantelli |
| Probability / Laws of large numbers | 0/1/0 | 1/0/1 | prob-dependent-average-failure |
| Statistics / Estimation | 1/0/0 | 0/1/1 | stat-risk-expectation |
| Statistics / Maximum likelihood | 1/0/0 | 0/2/0 | stat-score-parameter-derivative |
| Statistics / Sufficiency | 1/1/0 | 0/1/1 | stat-ancillary-law, stat-lehmann-scheffe-scope |
| Statistics / Hypothesis testing | 1/1/0 | 0/2/1 | stat-power-function, stat-valid-p-value-inequality |
| Statistics / Confidence intervals | 0/1/0 | 1/0/1 | stat-confidence-test-inversion |
| Statistics / Regression | 1/0/0 | 0/2/1 | stat-ols-residual-orthogonality |
| Measure Theory / Sigma-algebras | 0/1/0 | 0/1/0 | measure-pi-lambda-closure |
| Measure Theory / Measures | 1/1/0 | 0/0/1 | measure-outer-measure-subadditivity, measure-extension-sigma-finite |
| Measure Theory / Lebesgue integration | 0/1/0 | 1/1/1 | measure-signed-integral-cancellation |
| Measure Theory / Product measures | 0/0/1 | 0/0/1 | measure-fubini-order-failure |
| Measure Theory / Radon-Nikodym theorem | 1/1/0 | 0/1/0 | measure-discrete-rn-density, measure-mixed-absolute-continuity |
| Measure Theory / Probability measures | 1/0/0 | 0/1/1 | measure-law-pushforward |
| Stochastic Processes / General definitions | 1/0/0 | 0/1/0 | process-cadlag-path-definition |
| Stochastic Processes / Markov chains | 0/2/1 | 0/0/0 | process-stationary-two-state-balance, process-stationary-not-reversible, process-infinite-chain-invariant-mass |
| Stochastic Processes / Continuous-time Markov chains | 0/1/1 | 0/0/0 | process-embedded-jump-probability, process-conservative-explosive-chain |
| Stochastic Calculus / Stochastic integration | 0/1/0 | 1/0/1 | calc-local-integrand-bracket-measure |
| Stochastic Calculus / Ito integral | 1/0/0 | 0/0/1 | calc-deterministic-integral-law |
| Stochastic Calculus / Stochastic differential equations | 1/0/0 | 0/1/1 | calc-sde-integral-definition |
| Stochastic Calculus / Strong and weak solutions | 0/1/0 | 0/0/2 | calc-pathwise-uniqueness-definition |

Borel–Cantelli remains canonically referenced under Independence; the Probability spaces item exercises tail-event operations. The sixth Processes item uses the remaining Easy General definitions slot for càdlàg paths: Markov chains and CTMCs together had only five remaining slots. Their topic budgets are now filled; broaden their references later without silently adding extra questions. Added references K73–K100 support every new item. Existing reference entries/links remain unchanged. See [BATCH_B_REVIEW.md](src/features/quick-practice/data/BATCH_B_REVIEW.md) for all 30 review decisions and exact checks. **Batch C has not begun.**

## Highest-priority missing references

P0 rows are completed in Batch A; Batch B fills the foundation subsets noted below. Remaining P1/P2 proposals are still open. Choose exact assumptions, scope and type before assigning IDs. Prefer separate small entries when results have materially different hypotheses.

| Priority | References to add or extend | Why / existing questions already affected |
| --- | --- | --- |
| Complete — Batch A | Conditional Jensen/pull-out, total conditional variance; Lp convergence, subsequence principle, continuous mapping and Slutsky | Supports P07/P09; expands beyond `prob-004`, `prob-015`, `prob-022`, `prob-003`, `prob-006`, `prob-021`, `prob-023`. |
| Complete — Batch A | Product measure, Tonelli and Fubini; Scheffé and reverse Fatou | Existing `measure-015`, `measure-016` have no links; advanced interchange gaps. Keep sigma-finite and domination conditions explicit. |
| Complete — Batch A | Doob maximal/Lp inequalities; discrete martingale a.s. convergence and UI closure | `process-020`, `process-028` currently supply only introductory implications/equivalence. Distinguish theorem conclusions. |
| Complete — Batch A | Stopped sigma-algebra; continuous-time optional sampling; predictable/progressive measurability | `process-004`, `process-006`, `process-021` and the integration prerequisites. Do not weaken the existing discrete theorem. |
| Complete — Batch A | Stochastic-integral QV/covariance; bounded-local true-martingale criterion | Supports `calc-002`, `calc-006`, `calc-008`, `calc-009`, `calc-013` and first short applications. |
| P1 — existing unlinked theorems | Lindeberg–Feller; Egorov; pure-birth nonexplosion; exact normal-boundary LR mixture | `prob-025`, `measure-019`, `process-029`, `stat-020` currently lack the precise reference. The new explosion entry covers a specific pure-birth example, not the full necessary-and-sufficient reciprocal-rate criterion. These take priority over exotic new results. |
| P1 | Global Lipschitz SDE well-posedness; local solution/explosion (uniqueness definitions completed in B) | `calc-017`, `calc-016`, `calc-026`; a definition or Yamada–Watanabe alone is not the Lipschitz theorem. |
| P1 | Markov-chain state classification and convergence; finite-state CTMC semigroup/equations (stationarity/reversibility, positive recurrence, jump construction and explosion completed in B) | `process-003`, `process-014` links are partial; `process-015`–`process-017` have no references. |
| P1 | Brownian strong Markov/reflection; Gaussian process/conditioning; modification/indistinguishability | Missing process foundations behind Brownian and path-regularity questions. |
| P1 | Bayes/total probability; Gaussian/conditional independence; generating/characteristic functions; Markov/Chebyshev/Hoeffding; zero–one law (mutual independence and Borel–Cantelli completed in B) | Large unlinked Probability block and important absent results. No duplicate elementary Brownian conditional-mean variants. |
| P1 | Cramér–Rao/minimal sufficiency, exact normal pivots, regular Wilks and MLE limits, Gauss–Markov, Bayesian conjugacy (score/information definitions, Lehmann–Scheffé, power/p-values, test inversion and OLS algebra completed in B) | Most Statistics gaps are foundations or theorem conditions rather than advanced new model families. |
| P1 | RN chain rule/decomposition; completion/a.e.; nonnegative integral construction and Lp inequalities (outer measure, extension/uniqueness, π–λ and signed integrability completed in B) | `measure-017`, `measure-020` and currently thin measure foundations. |
| P2 — later reviewed batches | Lévy processes/measure, Poisson random measures and Lévy–Khintchine; compound-Poisson/thinning and birth–death laws | `process-018`, `process-025`, `process-026`; fix truncation and rate conventions. |
| P2 | Multidimensional Itô, general càdlàg semimartingale/jump product rule, stochastic exponential | Current continuous one-dimensional entries must retain their explicit scope. |
| P2 | Feller semigroup/domain, Dynkin, Kolmogorov forward/backward equations, martingale-problem well-posedness/equivalence | `calc-021`–`calc-024` currently test isolated expressions/definitions. |
| P2 | Portmanteau/Prokhorov, Lusin, Lebesgue decomposition, second-order delta | Advanced but reusable supporting coverage. State space, finiteness, regularity and derivative assumptions must accompany results. |

Do **not** add duplicate DDS, Lévy characterisation, Novikov, Girsanov, Brownian representation or Yamada–Watanabe entries merely because few questions link them. Their immediate gap is question coverage. Extensions should receive separate versioned concepts only when mathematically distinct, with related links to the existing entry.

## Question-type priorities

All ten schema types already occur. “Missing types” means **topic-specific omissions**, not a missing enum value. Prioritise conditions and counterexamples on advanced results, definition recognition for unintroduced objects, and short calculations that exercise a different skill from recalling a formula. Concept-identification items should name a process/result from its properties. All formats retain exactly four plausible choices.

| Type | Current | Target | Add |
| --- | ---: | ---: | ---: |
| `definition_recall` | 6 | 10 | 4 |
| `definition_recognition` | 36 | 40 | 4 |
| `theorem_recall` | 28 | 40 | 12 |
| `theorem_conditions` | 29 | 60 | 31 |
| `property_recognition` | 22 | 30 | 8 |
| `concept_identification` | 4 | 15 | 11 |
| `true_false_conceptual` | 4 | 10 | 6 |
| `short_calculation` | 23 | 40 | 17 |
| `implication` | 10 | 25 | 15 |
| `counterexample_recognition` | 18 | 30 | 12 |
| **Total** | **180** | **300** | **120** |

These type totals are an independent editorial allocation, not an already-scheduled joint topic/type matrix. Topic objectives and mathematical quality take precedence if a later re-audit warrants adjustment. The target retains 260/300 non-calculation questions; calculations are 13.3%, so the bank remains strongly focused on recall and recognition.

## Boundary of the 300-question milestone

Cover the core objectives in the 59 rows first. The following are visible extensions, not hidden commitments within a small topic quota:

| Later extension | Current direct coverage | Prerequisite and reason to defer |
| --- | --- | --- |
| Local times, Tanaka and Itô–Meyer | 0 questions; no dedicated reference | O3 explicitly includes them. First establish smooth Itô and continuous local martingales; add a separate version-specific reference before testing non-smooth formulae. |
| Burkholder–Davis–Gundy and Kunita–Watanabe | 0 questions; no dedicated reference | O3/C2 motivate them. Introduce after bracket/isometry/Doob coverage; advanced norm estimates should not displace basic recognition. |
| Lévy–Itô decomposition and jump-driven SDEs | 0 questions; no dedicated reference | After SP12's Lévy measure/characteristic exponent and semimartingale jump foundations. This is a QuantPocket extension beyond the initial continuous-calculus emphasis. |
| Donsker, general large deviations and functional weak convergence | 0 questions; no dedicated reference | C1 supports this direction. Tightness/Portmanteau and characteristic functions come first. |
| Scale/speed, Green functions, Dirichlet problems and Hille–Yosida | 0 direct questions; current generator/Feynman–Kac entries are prerequisites only | O4 supports the extension. First secure generator domains and terminal-value representations; broad PDE theory needs more than formula recall. |
| Full U/V-statistic theory, sequential testing, exchangeability/de Finetti, ergodic theory and filtering | 0 direct questions; no dedicated references | L4/L5 supply the direction. Reserve a later systematic block after current inference/martingale gaps. |
| High-dimensional/nonparametric statistics, posterior contraction, minimax theory and modern multiple testing | 0 questions; no dedicated references | C4/C5 support these future directions. The first 300 concentrates on mathematical-statistics prerequisites. |

Within the current 300 scope, narrow recognition of Lusin/Prokhorov and a càdlàg semimartingale is allowed; exhaustive proofs, general-space refinements and an entire jump calculus are not implied. Do not treat the current broad subcategory names as adequate descriptions of all these future extensions. New taxonomy entries can be proposed later without renaming existing IDs or changing saved history.

## Reference inventory: all 100 existing objects

This inventory audits every existing object, including references with no incoming question links. Counts are incoming **explicit question links**, not direct concept tests and not related-reference edges. A zero is an opportunity to use an existing reference, not an orphan to delete. Names and type values are reproduced from the bank; only document aliases are new.

| Alias | Existing ID / name | Type | Stored subject / subcategory | Q links |
| --- | --- | --- | --- | ---: |
| K01 | `def-probability-space` — Probability space | `definition` | Probability / Probability spaces | 1 |
| K02 | `def-sigma-algebra` — Sigma-algebra | `definition` | Measure Theory / Sigma-algebras | 2 |
| K03 | `def-measurable-function` — Measurable function | `definition` | Measure Theory / Measurable functions | 3 |
| K04 | `def-almost-sure-convergence` — Almost sure convergence | `definition` | Probability / Modes of convergence | 1 |
| K05 | `def-convergence-probability` — Convergence in probability | `definition` | Probability / Modes of convergence | 3 |
| K06 | `def-convergence-distribution` — Convergence in distribution | `definition` | Probability / Modes of convergence | 3 |
| K07 | `thm-monotone-convergence` — Monotone convergence theorem | `theorem` | Measure Theory / Convergence theorems | 2 |
| K08 | `thm-dominated-convergence` — Dominated convergence theorem | `theorem` | Measure Theory / Convergence theorems | 4 |
| K09 | `lemma-fatou` — Fatou's lemma | `lemma` | Measure Theory / Convergence theorems | 1 |
| K10 | `thm-radon-nikodym` — Radon–Nikodym theorem (sigma-finite version) | `theorem` | Measure Theory / Radon-Nikodym theorem | 4 |
| K11 | `def-conditional-expectation` — Conditional expectation | `definition` | Probability / Conditional expectation | 6 |
| K12 | `prop-uniform-integrability` — Uniform integrability and L¹ convergence | `proposition` | Probability / Modes of convergence | 4 |
| K13 | `thm-iid-clt` — Central limit theorem (i.i.d. finite-variance version) | `theorem` | Probability / Central limit theorem | 1 |
| K14 | `thm-strong-law` — Strong law of large numbers (i.i.d. version) | `theorem` | Probability / Laws of large numbers | 1 |
| K15 | `def-filtration` — Filtration | `definition` | Stochastic Processes / Filtrations | 2 |
| K16 | `def-adapted-process` — Adapted process | `definition` | Stochastic Processes / Filtrations | 1 |
| K17 | `def-stopping-time` — Stopping time | `definition` | Stochastic Processes / Stopping times | 2 |
| K18 | `def-martingale` — Martingale | `definition` | Stochastic Processes / Martingales | 7 |
| K19 | `def-submartingale` — Submartingale | `definition` | Stochastic Processes / Martingales | 3 |
| K20 | `def-supermartingale` — Supermartingale | `definition` | Stochastic Processes / Martingales | 1 |
| K21 | `def-markov-property` — Markov property (time-homogeneous version) | `definition` | Stochastic Processes / Markov chains | 4 |
| K22 | `def-poisson-process` — Homogeneous Poisson process | `definition` | Stochastic Processes / Poisson processes | 4 |
| K23 | `def-brownian-motion` — Standard Brownian motion | `definition` | Stochastic Processes / Brownian motion | 5 |
| K24 | `thm-optional-stopping` — Optional stopping (discrete-time versions) | `theorem` | Stochastic Processes / Stopping times | 3 |
| K25 | `def-quadratic-variation` — Quadratic variation (continuous semimartingales) | `definition` | Stochastic Calculus / Quadratic variation | 5 |
| K26 | `def-ito-integral` — Itô integral (Brownian L² construction) | `definition` | Stochastic Calculus / Ito integral | 4 |
| K27 | `thm-ito-isometry` — Itô isometry | `theorem` | Stochastic Calculus / Ito integral | 4 |
| K28 | `thm-ito-formula` — Itô's formula (one-dimensional continuous version) | `theorem` | Stochastic Calculus / Ito's lemma | 4 |
| K29 | `def-local-martingale` — Local martingale (càdlàg version) | `definition` | Stochastic Calculus / Local martingales | 4 |
| K30 | `def-continuous-semimartingale` — Continuous semimartingale | `definition` | Stochastic Calculus / Semimartingales | 1 |
| K31 | `def-strong-solution` — Strong solution (Brownian SDE) | `definition` | Stochastic Calculus / Strong and weak solutions | 2 |
| K32 | `def-weak-solution` — Weak solution (Brownian SDE) | `definition` | Stochastic Calculus / Strong and weak solutions | 1 |
| K33 | `thm-girsanov` — Girsanov theorem (Brownian finite-horizon version) | `theorem` | Stochastic Calculus / Girsanov theorem | 1 |
| K34 | `thm-levy-characterisation` — Lévy characterisation of Brownian motion | `theorem` | Stochastic Calculus / Continuous martingales | 0 |
| K35 | `thm-dambis-dubins-schwarz` — Dambis–Dubins–Schwarz theorem | `theorem` | Stochastic Calculus / Continuous martingales | 1 |
| K36 | `thm-martingale-representation` — Brownian martingale representation (L² version) | `theorem` | Stochastic Calculus / Martingale representation | 1 |
| K37 | `def-infinitesimal-generator` — Infinitesimal generator (Itô diffusions) | `definition` | Stochastic Calculus / Infinitesimal generators | 2 |
| K38 | `thm-feynman-kac` — Feynman–Kac formula (terminal-value representation) | `theorem` | Stochastic Calculus / Feynman-Kac | 1 |
| K39 | `thm-yamada-watanabe` — Yamada–Watanabe theorem (Brownian SDE) | `theorem` | Stochastic Calculus / Strong and weak solutions | 1 |
| K40 | `def-martingale-problem` — Martingale problem (continuous-path version) | `definition` | Stochastic Calculus / Martingale problems | 1 |
| K41 | `thm-novikov` — Novikov's condition | `theorem` | Stochastic Calculus / Girsanov theorem | 1 |
| K42 | `cor-nonnegative-local-martingale` — Nonnegative local martingales are supermartingales | `corollary` | Stochastic Calculus / Local martingales | 1 |
| K43 | `def-sufficiency` — Sufficient statistic | `definition` | Statistics / Sufficiency | 3 |
| K44 | `thm-basu` — Basu's theorem | `theorem` | Statistics / Sufficiency | 1 |
| K45 | `thm-rao-blackwell` — Rao–Blackwell theorem (squared-error version) | `theorem` | Statistics / Estimation | 1 |
| K46 | `thm-delta-method` — Delta method (first-order scalar version) | `theorem` | Statistics / Asymptotic statistics | 2 |
| K47 | `thm-neyman-pearson` — Neyman–Pearson lemma (simple hypotheses) | `lemma` | Statistics / Hypothesis testing | 1 |
| K48 | `def-maximum-likelihood` — Maximum likelihood estimator | `definition` | Statistics / Maximum likelihood | 3 |
| K49 | `def-confidence-interval` — Confidence interval | `definition` | Statistics / Confidence intervals | 2 |
| K50 | `result-bias-variance` — Bias–variance decomposition | `key_result` | Statistics / Bias, variance and MSE | 1 |
| K51 | `prop-conditional-expectation-properties` — Conditional expectation: pull-out and Jensen | `proposition` | Probability / Conditional expectation | 4 |
| K52 | `prop-conditional-variance` — Conditional variance and total variance | `proposition` | Probability / Conditional expectation | 0 |
| K53 | `def-lp-convergence` — Lᵖ convergence (finite p) | `definition` | Probability / Modes of convergence | 1 |
| K54 | `thm-subsequence-principle` — Subsequence principle for convergence in probability | `theorem` | Probability / Modes of convergence | 1 |
| K55 | `thm-continuous-mapping` — Continuous mapping theorem (Euclidean version) | `theorem` | Probability / Modes of convergence | 1 |
| K56 | `thm-slutsky` — Slutsky theorem (constant limit) | `theorem` | Probability / Modes of convergence | 1 |
| K57 | `lemma-scheffe` — Scheffé lemma (nonnegative functions) | `lemma` | Measure Theory / Convergence theorems | 1 |
| K58 | `lemma-reverse-fatou` — Reverse Fatou lemma (integrable upper envelope) | `lemma` | Measure Theory / Convergence theorems | 1 |
| K59 | `def-product-measure` — Product measure (sigma-finite spaces) | `definition` | Measure Theory / Product measures | 1 |
| K60 | `thm-tonelli` — Tonelli theorem (sigma-finite version) | `theorem` | Measure Theory / Product measures | 1 |
| K61 | `thm-fubini` — Fubini theorem (integrable functions) | `theorem` | Measure Theory / Product measures | 2 |
| K62 | `thm-doob-maximal` — Doob maximal inequality (discrete nonnegative version) | `theorem` | Stochastic Processes / Martingales | 1 |
| K63 | `thm-doob-lp` — Doob Lᵖ inequality (discrete finite horizon) | `theorem` | Stochastic Processes / Martingales | 1 |
| K64 | `thm-martingale-convergence-discrete` — Submartingale convergence (discrete time) | `theorem` | Stochastic Processes / Martingales | 1 |
| K65 | `thm-ui-martingale-closure` — Uniformly integrable martingales (discrete time) | `theorem` | Stochastic Processes / Martingales | 2 |
| K66 | `def-stopped-sigma-algebra` — Sigma-algebra at a stopping time | `definition` | Stochastic Processes / Stopping times | 1 |
| K67 | `thm-optional-sampling-continuous` — Optional sampling (bounded continuous-time stopping times) | `theorem` | Stochastic Processes / Stopping times | 1 |
| K68 | `def-progressive-measurability` — Progressively measurable process | `definition` | Stochastic Processes / Filtrations | 1 |
| K69 | `def-predictable-process` — Predictable process | `definition` | Stochastic Processes / Filtrations | 2 |
| K70 | `thm-stochastic-integral-brackets` — Quadratic variation and covariation of Brownian integrals | `theorem` | Stochastic Calculus / Quadratic variation | 3 |
| K71 | `thm-ito-cross-isometry` — Itô cross-isometry | `theorem` | Stochastic Calculus / Ito integral | 1 |
| K72 | `thm-bounded-local-martingale` — Bounded local martingale criterion | `theorem` | Stochastic Calculus / Local martingales | 1 |
| K73 | `def-mutual-independence` — Mutual independence | `definition` | Probability / Independence | 2 |
| K74 | `lemma-borel-cantelli-first` — First Borel–Cantelli lemma | `lemma` | Probability / Independence | 1 |
| K75 | `lemma-borel-cantelli-pairwise` — Second Borel–Cantelli lemma (pairwise independent version) | `lemma` | Probability / Independence | 1 |
| K76 | `thm-weak-law-finite-variance` — Weak law (independent common-variance version) | `theorem` | Probability / Laws of large numbers | 1 |
| K77 | `def-statistical-risk` — Estimator and risk | `definition` | Statistics / Estimation | 1 |
| K78 | `def-likelihood-score` — Likelihood score and Fisher information | `definition` | Statistics / Maximum likelihood | 1 |
| K79 | `def-ancillary-statistic` — Ancillary statistic | `definition` | Statistics / Sufficiency | 1 |
| K80 | `def-complete-statistic` — Complete statistic | `definition` | Statistics / Sufficiency | 1 |
| K81 | `thm-lehmann-scheffe` — Lehmann–Scheffé theorem (finite-variance version) | `theorem` | Statistics / Sufficiency | 1 |
| K82 | `def-test-power` — Test function, power and size | `definition` | Statistics / Hypothesis testing | 1 |
| K83 | `def-valid-p-value` — Valid p-value | `definition` | Statistics / Hypothesis testing | 1 |
| K84 | `thm-test-confidence-duality` — Confidence sets by inversion of tests | `theorem` | Statistics / Confidence intervals | 1 |
| K85 | `def-ordinary-least-squares` — Ordinary least squares and residuals | `definition` | Statistics / Regression | 1 |
| K86 | `thm-pi-lambda` — Dynkin π–λ theorem | `theorem` | Measure Theory / Sigma-algebras | 1 |
| K87 | `def-outer-measure` — Outer measure | `definition` | Measure Theory / Measures | 1 |
| K88 | `thm-premeasure-extension` — Carathéodory extension (sigma-finite uniqueness) | `theorem` | Measure Theory / Measures | 1 |
| K89 | `def-absolute-continuity-measures` — Absolute continuity and singularity of measures | `definition` | Measure Theory / Radon-Nikodym theorem | 2 |
| K90 | `def-pushforward-measure` — Pushforward probability measure | `definition` | Measure Theory / Probability measures | 1 |
| K91 | `def-signed-lebesgue-integral` — Signed Lebesgue integral | `definition` | Measure Theory / Lebesgue integration | 2 |
| K92 | `def-cadlag-path` — Càdlàg path | `definition` | Stochastic Processes / General definitions | 1 |
| K93 | `prop-stationarity-detailed-balance` — Stationarity and detailed balance (discrete chains) | `proposition` | Stochastic Processes / Markov chains | 3 |
| K94 | `thm-countable-chain-positive-recurrence` — Invariant probability and positive recurrence | `theorem` | Stochastic Processes / Markov chains | 2 |
| K95 | `def-ctmc-jump-construction` — CTMC rates, holding times and jump chain | `definition` | Stochastic Processes / Continuous-time Markov chains | 2 |
| K96 | `prop-ctmc-explosion` — Minimal CTMC and explosion | `proposition` | Stochastic Processes / Continuous-time Markov chains | 1 |
| K97 | `def-continuous-local-integrand` — Integrands for continuous local martingales | `definition` | Stochastic Calculus / Stochastic integration | 1 |
| K98 | `thm-deterministic-wiener-integral` — Gaussian law of a deterministic Brownian integral | `theorem` | Stochastic Calculus / Ito integral | 1 |
| K99 | `def-integral-sde` — Brownian SDE in integral form | `definition` | Stochastic Calculus / Stochastic differential equations | 1 |
| K100 | `def-sde-uniqueness-notions` — Pathwise uniqueness and uniqueness in law | `definition` | Stochastic Calculus / Strong and weak solutions | 1 |

Zero incoming question links: `thm-levy-characterisation`, `prop-conditional-variance`. These remain useful; related edges do not count as direct question coverage. The original 42 unlinked questions remain unchanged. A separate mapping review should link newly available references only where their stated versions support the old questions.

## Maintaining and using this map

The audited files are [questions.ts](src/features/quick-practice/data/questions.ts), its five subject arrays plus `bank/batch-a.ts` and `bank/batch-b.ts`, [knowledge/index.ts](src/data/knowledge/index.ts), its four original arrays plus `batch-a.ts`/`batch-b.ts` and the shared taxonomy. The full-ID lists in the 59 topic rows partition the 180-question bank; the K inventory lists all 100 references. Keep those inventories and their counts current when accepting a batch.

For each new question, record one primary learning objective from this map, a deliberate question type, justified difficulty, exact theorem version and relevant existing/new knowledge IDs. It must have four distinct plausible choices, a unique correct answer and a concise British-English explanation that remains valid after shuffling. Use shared families only for intentional variants. Do not copy university exam questions or confuse a course-outline link with verification of a theorem's assumptions.

Run `npm run validate:bank` and `npm test` after data changes. Then run the production build and relevant `test:bank`, `test:reference` and PWA checks when accepting the batch, as described in the existing project documentation. Recompute category/subcategory counts, difficulty splits, present types and incoming reference links from the imported arrays; never infer them from the prose in this map. Update this map and STATUS together. Mathematical review is additional to schema/LaTeX tests.

Batch A and B reviews record item-level decisions and supporting sources. Batch B validation, 43 unit tests and production build pass; browser/offline results are recorded in STATUS.md. All 59 topic inventories, 180 question IDs, 100 reference entries and remaining subject/difficulty budgets reconcile. Prior records and persistence formats remain unchanged.

**Next development task:** implement Batch C only after reviewing the accepted [Batch B review](src/features/quick-practice/data/BATCH_B_REVIEW.md) and validation results. Batch C has not begun; retain its 3 / 0 / 2 / 8 / 17 subject allocation and select exact objectives from remaining topic/difficulty slots.
