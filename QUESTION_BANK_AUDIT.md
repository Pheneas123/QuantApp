# QuantPocket — Independent Academic Question Bank Audit

**Audit date: 11 October 2026. Scope: all 330 existing questions, as present in this workspace.**

## Executive summary

All **330/330** questions were individually reviewed across **eight categories and 89 populated subsections**. Each prompt, all four choices, the canonical key, explanation, assumptions, difficulty, notation/code and relevant Reference links were examined. Appendix B records an independent mathematical or technical basis for every item; it is not a list produced by treating the keys as authoritative.

**No critical mathematical error or verified incorrect canonical answer was found under the intended standard subject conventions. This is not an unconditional academic approval.** One item has a verified formal ambiguity affecting the uniqueness of its answer: `prog-binary-search` uses Big-O choices that are simultaneously valid upper bounds. One ML item has a verified technical incompleteness: its permitted integer-tensor inputs make the full loss expression invalid. Seven additional groups need minor assumption/convention clarifications. The report also identifies substantial difficulty inflation, weak distractors, incomplete Reference support and repeated objectives.

| Finding class | Count | Interpretation |
| --- | ---: | --- |
| Questions individually reviewed | 330 | Complete census; no sampling |
| Critical mathematical/technical errors | 0 | None verified in this review |
| Verified incorrect canonical keys | 0 | Intended formula/output keys checked independently |
| Verified major ambiguities | 1 item | B01; three offered asymptotic upper bounds are valid |
| Minor technical/editorial findings | 8 groups / 12 distinct items | N08 verified technical incompleteness; N01–N07 potential concerns under literal or alternative conventions |
| Difficulty recalibration candidates | 47 items | Editorial recommendations, not empirically measured errors |
| Targeted distractor improvements | 7 items | Potential educational weaknesses, E01 |
| Priority supporting-reference gaps | 11 items | Observed gaps/prerequisite-only links, E02 |
| Substantially repetitive or closely overlapping groups | 3 groups | R01, R03 and R06; not exact duplicate prompts |
| Complementary shared-construction/theorem groups | 3 groups | R02, R04 and R05; no defect established |
| PyTorch items not executed in their actual framework | 4 items | U01; documented semantics and analytical checks, with execution limitation explicit |

These counts overlap and must not be added to obtain a number of defective questions. In particular, a correct item can have both a difficulty concern and a Reference gap. A missing link is not a wrong answer. A potential ambiguity is not presented as a verified mathematical error.

The main corrective priorities are: resolve B01; state the tensor assumptions in N08; make the listed theorem/code/timing assumptions explicit; calibrate the candidate labels; and improve explanatory support and distractor discrimination. **No question, answer key, ID, Reference entry or progress record was changed. No new questions were added, and nothing was committed, pushed or deployed.**

## Scope, independence and method

Before reviewing content, I read `STATUS.md`, `CONTENT_STYLE.md`, `CURRICULUM_EXPANSION.md`, the question-bank authoring guide, feature/Reference documentation, the schema and taxonomy, assembly modules, maths/code renderer, session grading and existing validation/test implementations. No applicable `AGENTS.md` was found in this repository or its ancestor directories. The available Git directory did not expose a usable repository; preservation was checked through source-file hashes rather than a Git diff.

The four-choice schema stores a zero-based canonical index; displayed choices are shuffled. Prompts, choices and explanations are rendered through `MathText`; fenced code is literal, while prose maths is processed by KaTeX. Explanations and related Reference links appear only after submission. Optional `workedSolution` is not displayed. Consequently, an assumption supplied only in a later explanation or related Reference cannot make a standalone prompt fully explicit.

The Reference library contains 122 entries: concise definitions, theorem versions, results and related links. It is supporting material, not an independent oracle for the bank. Its statements, assumptions and relevant scope were read alongside the question mappings. This audit covers the questions, rather than constituting a separate complete certification of every Reference theorem.

For each item I established the expected result from its definition, a derivation, state enumeration, a counterexample or language/API semantics, then compared that result with **all** choices. I separately considered whether an alternative choice can be valid, whether the explanation proves what the prompt actually asks, and whether the required reasoning matches its label. Numerical checks use independently supplied inputs; for example, the binomial option was checked by solving statewise replication rather than copying its authored risk-neutral formula. Existing author reviews were treated as background and were not used as proof of correctness.

Symbolic formula questions were assessed as asking for a generally valid expression. Two formulas coinciding at an isolated value such as `n=1` does not, by itself, make a different general formula correct. B01 is different: its alternative upper bounds remain valid throughout the asymptotic range.

Severity definitions:

- **Critical:** a verified false keyed result, materially false technical explanation or invalid outcome that would systematically teach/grading-test the wrong concept.
- **Major:** a substantive failure of answer uniqueness or missing conditions preventing a defensible single answer.
- **Minor:** a correction or clarification that preserves the intended answer, or a local educational weakness.
- **Informational:** useful scope/overlap observations without an established defect.

**Verified** means the mathematical/technical claim or incompleteness is established by derivation, execution or an identified primary specification. **Potential concern** means ordinary conventions can resolve the item, or the concern is pedagogical/editorial and needs judgement. High confidence in a calculation is distinct from confidence in a difficulty recommendation.

The source snapshot, serialised as `JSON.stringify(questions)` in assembled order, has SHA-256:

```text
3d7ccf1dbd1ce9d3a68235ee118b355e93dc589827610d00bdabe8adbc508dd2
```

## Coverage by category

| Category | Existing | Reviewed | Subsections | Easy | Medium | Hard | Linked items | B01/N01–N08 items |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Probability | 37 | 37 | 12 | 14 | 17 | 6 | 23 | 1 |
| Statistics | 28 | 28 | 9 | 12 | 12 | 4 | 20 | 0 |
| Measure Theory | 34 | 34 | 9 | 13 | 15 | 6 | 25 | 0 |
| Stochastic Processes | 44 | 44 | 12 | 16 | 19 | 9 | 34 | 1 |
| Stochastic Calculus | 37 | 37 | 17 | 6 | 21 | 10 | 36 | 5 |
| Finance | 100 | 100 | 10 | 30 | 40 | 30 | 0 | 2 |
| Programming | 25 | 25 | 10 | 8 | 10 | 7 | 25 | 3 |
| Machine Learning | 25 | 25 | 10 | 8 | 11 | 6 | 25 | 1 |
| Total | 330 | 330 | 89 | 107 | 145 | 78 | 188 | 13 |

Appendix A gives the subsection counts. Appendix B contains exactly 330 distinct question IDs, with the category, subsection, existing difficulty, canonical index, review disposition, independent basis and finding codes. The retired `calc-005` is not an existing item and was not counted. Both expansion batches were reviewed within their subject categories.

## Critical errors

**None verified.** In particular, the audit did not find an incorrect numerical key, an incorrect deterministic programming output, an incorrect required compilation-failure classification, or a claimed guaranteed output for C++ undefined behaviour. The lack of critical findings does not resolve B01 or the assumption and educational findings below.

## Major ambiguities

### B01 — Big-O choices do not form a unique-answer question

**Question:** [prog-binary-search](src/features/quick-practice/data/bank/programming.ts#L369) — Programming / Algorithms and complexity  
**Severity:** Major. **Status:** Verified formal ambiguity. **Confidence:** High.

The question asks for the worst-case number of binary-search comparisons “asymptotically”, with choices `O(log n)`, `O(1)`, `O(n)` and `O(n log n)`. The keyed `O(log n)` result is true, but so are the last two upper bounds. If `T(n)=Θ(log n)`, then for sufficiently large `n`, `T(n)≤c log n≤c n≤c n log n`. Only the constant bound fails. This follows from the definition of Big-O as an asymptotic upper bound. [NIST, Big-O notation](https://xlinux.nist.gov/dads/HTML/bigOnotation.html).

The explanation correctly derives logarithmic growth; it does not turn the other valid bounds into false statements. Structural validation checks that the four strings differ, not that their meanings are exclusive.

**Recommended correction:** ask “Which of the following is the tightest asymptotic upper bound on the worst-case number of comparisons?” This preserves the current choices and canonical key. Alternatively, use Θ notation consistently for a tight-bound question. No correction was implemented.

## Minor corrections and assumption clarifications

### N01

**Questions and scope:**

- [prob-025](src/features/quick-practice/data/bank/probability.ts#L354) — Probability / Central limit theorem

**Severity:** Minor. **Status:** Potential concern. **Confidence:** Medium.

**Specific problem:** The row index set is never specified, although the explanation asserts a triangular-array CLT.

**Reasoning:** The standard finite-row statement uses 1≤k≤k_n with 0<s_n²<∞. Positivity alone does not state finiteness, and an infinite row additionally needs a well-defined sum. The displayed large-term Lindeberg expression is correct under the intended finite-row convention.

**Recommended correction:** Specify finite rows 1≤k≤k_n and finite positive s_n². Keep the existing correct option.

### N02

**Questions and scope:**

- [process-007](src/features/quick-practice/data/bank/stochastic-processes.ts#L96) — Stochastic Processes / General definitions

**Severity:** Minor. **Status:** Potential concern. **Confidence:** Medium.

**Specific problem:** Taking values in R does not by itself distinguish a real state-space model from a discrete-valued process embedded in R.

**Reasoning:** An integer-valued random walk is also real-valued. The intended answer is correct when the designated state space is R; the question does not clearly distinguish the chosen measurable state space from the support of the variables.

**Recommended correction:** Say explicitly that the model's state space is (R,B(R)), with discrete time index N0. Avoid equating continuous state space with a continuous marginal distribution.

### N03

**Questions and scope:**

- [calc-008](src/features/quick-practice/data/bank/stochastic-calculus.ts#L96) — Stochastic Calculus / Ito integral
- [calc-009](src/features/quick-practice/data/bank/stochastic-calculus.ts#L111) — Stochastic Calculus / Ito integral
- [calc-018](src/features/quick-practice/data/bank/stochastic-calculus.ts#L245) — Stochastic Calculus / Girsanov theorem
- [calc-019](src/features/quick-practice/data/bank/stochastic-calculus.ts#L260) — Stochastic Calculus / Girsanov theorem

**Severity:** Minor. **Status:** Potential concern. **Confidence:** High for mathematical dependency; medium for editorial severity.

**Specific problem:** W and its relationship to the filtration are implicit in these theorem statements.

**Reasoning:** Predictability is relative to a filtration, and the isometry, martingale guarantee, Novikov and Girsanov require W to be Brownian relative to that filtration. Merely preserving its Brownian marginal/path law after revealing WT is insufficient: the process then fails the martingale condition. The related Reference entries state the missing scope, but they appear after submission.

**Recommended correction:** Add W is standard Brownian relative to the stated filtration; use the usual conditions for the local-martingale/measure-change formulation. Preserve all four intended keys.

### N04

**Questions and scope:**

- [calc-024](src/features/quick-practice/data/bank/stochastic-calculus.ts#L335) — Stochastic Calculus / Martingale problems

**Severity:** Minor. **Status:** Potential concern. **Confidence:** High.

**Specific problem:** The prompt does not identify the true-martingale convention or requirements making the compensator well-defined.

**Reasoning:** The Reference entry explicitly chooses true martingales, notes integrability and acknowledges local-martingale formulations. For a generic operator L and test domain, these are part of the definition; compact support of f alone does not automatically bound an unrestricted Lf. The designated compensation formula has the correct sign.

**Recommended correction:** State that the true-martingale convention in the canonical filtration is used and the integrals/processes are well-defined and integrable. This is a convention clarification, not evidence that the compensation formula is wrong.

### N05

**Questions and scope:**

- [prog-sort-unique](src/features/quick-practice/data/bank/programming.ts#L63) — Programming / C++ STL and algorithms
- [prog-lambda-copy](src/features/quick-practice/data/bank/programming.ts#L178) — Programming / Modern C++

**Severity:** Minor. **Status:** Potential concern. **Confidence:** High.

**Specific problem:** Executable statement snippets omit their function/block context.

**Reasoning:** std::sort/erase and std::cout statements cannot be placed directly at namespace scope. The verifier supplies a main wrapper, whereas these prompts only specify headers. The intended outputs are correct and were executed successfully inside main.

**Recommended correction:** Add the same statements run inside main assumption used in prog-reference-alias. Retain the existing outputs and keys.

### N06

**Questions and scope:**

- [fin-options-early-call](src/features/quick-practice/data/bank/finance/options.ts#L54) — Finance / Options

**Severity:** Minor. **Status:** Potential concern. **Confidence:** High for the boundary calculation; medium for whether conventional strike terminology already resolves it.

**Specific problem:** Strict suboptimality of early exercise also uses a strictly positive strike, which is only introduced in the explanation.

**Reasoning:** C≥S−K exp(−rτ)>S−K requires K>0 as well as r>0 and τ>0. With K=0, a zero-strike no-dividend call is worth S and exercising can be value-neutral. Conventional positive-strike calls satisfy the intended argument.

**Recommended correction:** Specify a strictly positive strike in the prompt. Keep the existing no-dividend and positive-interest assumptions.

### N07

**Questions and scope:**

- [fin-micro-adverse-selection](src/features/quick-practice/data/bank/finance/microstructure.ts#L48) — Finance / Market microstructure

**Severity:** Minor. **Status:** Potential concern. **Confidence:** Medium.

**Specific problem:** An eventual asset value is compared directly with a current sale price without a timing/financing convention.

**Reasoning:** Under the intended undiscounted mark-out P&L convention, expected value is 100.4 and the required ask is 100.5. If all profit is evaluated at a later date with current sale proceeds and cost accumulating at gross return G, the zero-profit equation is (a−0.10)G−100.4=0, giving a=0.10+100.4/G. A present-value convention likewise needs the discounting of the future value.

**Recommended correction:** State that funding, discounting and inventory carry are ignored and profit is the undiscounted sale price minus eventual value minus sale cost.

### N08

**Questions and scope:**

- [ml-loss-broadcast-bug](src/features/quick-practice/data/bank/machine-learning.ts#L448) — Machine Learning / Applied machine learning and implementation

**Severity:** Minor. **Status:** Verified technical incompleteness. **Confidence:** High; API restriction documented, PyTorch execution unavailable.

**Specific problem:** Shapes alone do not guarantee that the full loss expression runs: dtype and device assumptions are omitted.

**Reasoning:** pred=torch.tensor([[1],[2]]) and target=torch.tensor([1,2]) have the stated B=2 shapes and integer dtype. Their squared difference has shape (2,2) and remains integer. PyTorch's documented mean API requires floating-point or complex input, so the final mean is invalid for this permitted example. Reshaping fixes pairing but does not fix integer mean. The intended floating-point broadcast diagnosis is correct.

**Recommended correction:** Specify ordinary real floating-point prediction tensors and numeric targets on the same device, with compatible arithmetic dtypes. Preserve target.reshape(B,1) as the pairing correction.

N03 follows the same filtration dependency exposed by `process-030`: a Brownian path law alone is insufficient when terminal information is known early. The correct isometry/measure-change formulations in the Reference make the intended convention clear, but the quiz prompts should carry it themselves.

For N08, the documented input-type restriction is independent of the shape analysis: `(B,1)` minus `(B,)` broadcasts to `(B,B)`, but an integer result cannot be passed to the ordinary mean operation without an appropriate cast. This finding is based on the official API requirement, not on a purported local PyTorch run. [PyTorch 2.8, mean](https://docs.pytorch.org/docs/2.8/generated/torch.mean.html), [PyTorch 2.8, broadcasting](https://docs.pytorch.org/docs/2.8/notes/broadcasting.html).

## Difficulty calibration concerns

The current labels contain 107 Easy, 145 Medium and 78 Hard items. Their distribution is not evidence of calibration. Finance assigns exactly 3/4/3 in each subsection; the authoring guide also assigns certain Programming/ML topic families to Hard. Several questions fit those editorial topic rules while asking only introductory arithmetic, a familiar lifetime rule or a direct one-step inference. The resulting labels are not comparable measures of reasoning demand.

The following **47 item-level candidates** warrant recalibration. Each row has **Minor editorial severity, Potential concern status and Medium confidence**. The suggested tier is an independent examiner judgement; no label was changed and no empirical item-difficulty or discrimination estimates are available.

| Finding family | Question / category / subsection | Current → suggested | Specific reasoning |
| --- | --- | --- | --- |
| D01 | [prob-022](src/features/quick-practice/data/bank/probability.ts#L309) — Probability / Conditional expectation | Hard → Medium | Standard L2 conditional-expectation projection identity; no construction or counterexample is required. |
| D01 | [prob-023](src/features/quick-practice/data/bank/probability.ts#L324) — Probability / Modes of convergence | Hard → Medium | One pointwise-limit argument and height-times-width integral establish the result. |
| D01 | [prob-ce-nonnested-tower](src/features/quick-practice/data/bank/batch-a.ts#L57) — Probability / Conditional expectation | Hard → Medium | Four equally likely bit outcomes suffice; the non-nesting distinction is useful but finite. |
| D01 | [stat-006](src/features/quick-practice/data/bank/statistics.ts#L79) — Statistics / Sufficiency | Hard → Medium | Recognises the standard completeness premise of Basu; no ancillary construction or completeness proof. |
| D01 | [stat-008](src/features/quick-practice/data/bank/statistics.ts#L109) — Statistics / Estimation | Medium → Easy | Direct definition of ordinary consistency, matching the guide's core-definition tier. |
| D01 | [stat-019](src/features/quick-practice/data/bank/statistics.ts#L269) — Statistics / Asymptotic statistics | Hard → Easy | Normal sample-mean scaling and squaring give an exact undergraduate chi-square identity. |
| D01 | [measure-020](src/features/quick-practice/data/bank/measure-theory.ts#L283) — Measure Theory / Radon-Nikodym theorem | Hard → Medium | RN chain rule follows by one substitution; the zero-product convention is already supplied. |
| D01 | [measure-signed-monotone-failure](src/features/quick-practice/data/bank/batch-a.ts#L159) — Measure Theory / Convergence theorems | Hard → Medium | Read the monotone direction and infinite negative-tail integral; no difficult limiting construction. |
| D01 | [process-008](src/features/quick-practice/data/bank/stochastic-processes.ts#L110) — Stochastic Processes / General definitions | Medium → Easy | Core definition of finite-dimensional distributions without an application. |
| D01 | [process-023](src/features/quick-practice/data/bank/stochastic-processes.ts#L331) — Stochastic Processes / Brownian motion | Medium → Easy | Independent Brownian increment leaves covariance equal to the earlier variance. |
| D01 | [process-027](src/features/quick-practice/data/bank/stochastic-processes.ts#L388) — Stochastic Processes / General definitions | Hard → Medium | Useful quantifier distinction, resolved immediately by P(U=t)=0 and a pathwise spike. |
| D01 | [process-030](src/features/quick-practice/data/bank/stochastic-processes.ts#L431) — Stochastic Processes / Filtrations | Hard → Medium | The terminal value is already known at time zero; the conditional-expectation failure is immediate. |
| D02 | [fin-markets-crossed-arbitrage](src/features/quick-practice/data/bank/finance/markets.ts#L48) — Finance / Financial markets and instruments | Hard → Medium | All trading/fill assumptions are supplied; subtracting the two-sided fees supplies the entire calculation. |
| D02 | [fin-markets-maintenance-margin](src/features/quick-practice/data/bank/finance/markets.ts#L54) — Finance / Financial markets and instruments | Hard → Medium | One linear equation for the margin boundary, without liquidation or variable financing. |
| D02 | [fin-markets-fx-triangle](src/features/quick-practice/data/bank/finance/markets.ts#L60) — Finance / Financial markets and instruments | Hard → Medium | Three executable conversion factors are given; unit-aware multiplication is sufficient. |
| D02 | [fin-micro-twap](src/features/quick-practice/data/bank/finance/microstructure.ts#L36) — Finance / Market microstructure | Medium → Easy | Equal allocation is 12000/6; no optimisation or execution uncertainty is assessed. |
| D02 | [fin-micro-imbalance](src/features/quick-practice/data/bank/finance/microstructure.ts#L42) — Finance / Market microstructure | Medium → Easy | The formula is supplied; direct substitution produces 0.5. |
| D02 | [fin-micro-adverse-selection](src/features/quick-practice/data/bank/finance/microstructure.ts#L48) — Finance / Market microstructure | Hard → Medium | The fill-conditioned distribution is given; calculate its mean and add the specified cost. |
| D02 | [fin-micro-execution-tradeoff](src/features/quick-practice/data/bank/finance/microstructure.ts#L60) — Finance / Market microstructure | Hard → Easy | Two-outcome expected-cost arithmetic, with all probabilities and prices given. |
| D02 | [fin-bonds-bootstrap](src/features/quick-practice/data/bank/finance/bonds.ts#L48) — Finance / Bonds and fixed income | Hard → Medium | Isolate a single unknown discount factor in a two-cash-flow linear equation. |
| D02 | [fin-bonds-convexity](src/features/quick-practice/data/bank/finance/bonds.ts#L54) — Finance / Bonds and fixed income | Hard → Easy | Duration/convexity formula and every input are supplied; the task is substitution. |
| D02 | [fin-bonds-duration-hedge](src/features/quick-practice/data/bank/finance/bonds.ts#L60) — Finance / Bonds and fixed income | Hard → Medium | First-order hedge ratio is no more involved than the Medium delta-hedge item. |
| D02 | [fin-credit-risk-neutral-bond](src/features/quick-practice/data/bank/finance/credit.ts#L48) — Finance / Loans and credit | Hard → Medium | The risk-neutral probabilities, recovery timing and rate are supplied; discount one expected payment. |
| D02 | [fin-credit-dependent-ecl](src/features/quick-practice/data/bank/finance/credit.ts#L54) — Finance / Loans and credit | Hard → Medium | Average two conditional losses; useful dependence lesson without a joint-law derivation. |
| D02 | [fin-credit-hazard-spread](src/features/quick-practice/data/bank/finance/credit.ts#L60) — Finance / Loans and credit | Hard → Easy | The par-spread formula is given; only multiplication and conversion to basis points are asked. |
| D02 | [fin-forwards-cash-carry-arbitrage](src/features/quick-practice/data/bank/finance/forwards.ts#L48) — Finance / Forwards and futures | Hard → Medium | The exact strategy is supplied; its financed-delivery P&L is a simple comparison. |
| D02 | [fin-forwards-existing-value](src/features/quick-practice/data/bank/finance/forwards.ts#L60) — Finance / Forwards and futures | Hard → Medium | Standard share-minus-discounted-strike identity; comparable pricing in the bank is Medium. |
| D02 | [fin-options-butterfly-arbitrage](src/features/quick-practice/data/bank/finance/options.ts#L48) — Finance / Options | Hard → Medium | The strategy and nonnegative payoff are supplied; the requested quantity is just the initial signed cost. |
| D02 | [fin-options-volatility-smile](src/features/quick-practice/data/bank/finance/options.ts#L60) — Finance / Options | Hard → Medium | Different fitted volatilities cannot equal one common value; no surface-arbitrage test is required. |
| D02 | [fin-swaps-fra-settlement](src/features/quick-practice/data/bank/finance/swaps.ts#L48) — Finance / Swaps and other derivatives | Hard → Easy | The settlement formula is explicitly supplied; only arithmetic is needed. |
| D02 | [fin-swaps-cva](src/features/quick-practice/data/bank/finance/swaps.ts#L54) — Finance / Swaps and other derivatives | Hard → Medium | Fixed exposure, default probability, LGD and discount factor require one expected-loss product. |
| D02 | [fin-swaps-wrong-way](src/features/quick-practice/data/bank/finance/swaps.ts#L60) — Finance / Swaps and other derivatives | Hard → Easy | Direct terminology recognition with implausible distractors; no joint exposure/default analysis. |
| D02 | [fin-portfolio-factor-residual](src/features/quick-practice/data/bank/finance/portfolio.ts#L54) — Finance / Portfolio theory and asset pricing | Hard → Medium | Variance addition after squaring a factor loading; compare the covariance exercise prob-013 (Easy). |
| D02 | [fin-pricing-explicit-stability](src/features/quick-practice/data/bank/finance/pricing.ts#L54) — Finance / Quantitative pricing and numerical finance | Hard → Easy | The stability inequality is supplied; rearrange it for one step-size input. |
| D03 | [prog-vector-invalidation](src/features/quick-practice/data/bank/programming.ts#L101) — Programming / C++ STL and algorithms | Hard → Medium | Basic vector reallocation rule with no allocator, exception or partial-invalidation subtlety. |
| D03 | [prog-dangling-reference](src/features/quick-practice/data/bank/programming.ts#L158) — Programming / C++ object-oriented programming and memory | Hard → Medium | An ordinary automatic local object ends on return; this is core C++ lifetime reasoning. |
| D03 | [prog-span-lifetime](src/features/quick-practice/data/bank/programming.ts#L197) — Programming / Modern C++ | Hard → Medium | Basic non-owning-view lifetime failure; the same storage-lifetime reasoning appears in dangling-reference. |
| D03 | [prog-closure-binding](src/features/quick-practice/data/bank/programming.ts#L254) — Programming / Python fundamentals | Hard → Medium | A standard Python shared-cell closure pattern; no nested rebinding or generator interaction. |
| D03 | [prog-pairwise-memory](src/features/quick-practice/data/bank/programming.ts#L349) — Programming / NumPy and scientific Python | Hard → Medium | Two shape expansions give (n,n,d), followed by element counting. |
| D03 | [prog-signed-overflow](src/features/quick-practice/data/bank/programming.ts#L426) — Programming / Debugging and code analysis | Hard → Medium | Direct classification of built-in signed overflow; no optimisation-dependent reasoning. |
| D03 | [prog-welford-variance](src/features/quick-practice/data/bank/programming.ts#L464) — Programming / Numerical and quantitative programming | Hard → Medium | Recognises a standard recurrence; alternatives do not maintain even the running mean/M2 invariant. |
| D04 | [ml-quadratic-stability](src/features/quick-practice/data/bank/machine-learning.ts#L161) — Machine Learning / Optimisation and training | Hard → Medium | Scalar geometric-sequence condition; no multivariate spectrum, noisy gradient or momentum stability. |
| D04 | [ml-attention-mask](src/features/quick-practice/data/bank/machine-learning.ts#L199) — Machine Learning / Neural networks and deep learning | Hard → Medium | Standard causal-attention convention, without a tensor-shape or cross-layer information-flow derivation. |
| D04 | [ml-sarsa-off-policy](src/features/quick-practice/data/bank/machine-learning.ts#L256) — Machine Learning / Reinforcement learning | Hard → Medium | Direct one-step on-policy versus greedy target comparison. |
| D04 | [ml-elbo-identity](src/features/quick-practice/data/bank/machine-learning.ts#L294) — Machine Learning / Probabilistic and Bayesian machine learning | Hard → Medium | The identity is supplied; rearranging a fixed-evidence equation does not test a variational derivation. |
| D04 | [ml-overlapping-labels](src/features/quick-practice/data/bank/machine-learning.ts#L333) — Machine Learning / Time series and sequential machine learning | Hard → Medium | One five-day label extends beyond a stated boundary; no complex purging design is needed. |
| D04 | [ml-terminal-target](src/features/quick-practice/data/bank/machine-learning.ts#L468) — Machine Learning / Applied machine learning and implementation | Hard → Medium | The prompt already distinguishes true terminal states; apply the standard finite bootstrap mask. |

Useful comparisons explain the concern more clearly than equal quotas:

- `fin-options-delta-hedge` is Medium, while `fin-bonds-duration-hedge` is Hard; both divide or multiply a stated first-order sensitivity to obtain a hedge position.
- `prob-013` is Easy, while `fin-portfolio-factor-residual` is Hard; the latter applies the same variance identity after squaring one loading, with zero covariance already supplied.
- `stat-019` is Hard even though its distribution is exact for every sample size and requires no higher-order asymptotic derivation.
- `fin-pricing-explicit-stability`, `fin-credit-hazard-spread` and `fin-swaps-fra-settlement` supply the specialised formula/inequality, then ask for elementary substitution. Their terminology does not establish the difficulty of the task actually posed.
- All six ML Hard items have correct intended reasoning, but most assess a standard local convention or a one-dimensional calculation. The bank does not currently test the depth implied by an advanced label consistently across subjects.

Calibration should record both prerequisite level and reasoning demand, then use learner response data and distractor selection to refine labels. Recognition questions remain useful; the recommendation is to give them credit for the competency they actually assess.

## Educational improvement recommendations

### E01 — Make distractors diagnose plausible misconceptions

Each row below has **Minor educational severity, Potential concern status and Medium confidence**. The keyed answers are correct. The concern is that some items can be answered by dismissing impossible guarantees or unrelated concepts, so four choices do not provide four meaningful alternatives.

| Question / category / subsection | Specific problem and reasoning | Recommended improvement |
| --- | --- | --- |
| [calc-016](src/features/quick-practice/data/bank/stochastic-calculus.ts#L215) — Stochastic Calculus / Strong and weak solutions | Three distractors claim differentiable paths, densities or non-integral strong SDEs. These are useful beginner misconceptions but provide weak discrimination at Medium. | Use competing filtration/noise/initial-data descriptions to test the actual strong/weak distinction. |
| [fin-options-volatility-smile](src/features/quick-practice/data/bank/finance/options.ts#L60) — Finance / Options | Distractors about zero physical mean, different realised returns and automatic arbitrage make a Hard item largely eliminable without option-model knowledge. | Use plausible interpretations of calibration, local volatility and model mismatch; keep the single-volatility objective distinct from surface arbitrage. |
| [fin-swaps-wrong-way](src/features/quick-practice/data/bank/finance/swaps.ts#L60) — Finance / Swaps and other derivatives | Only one option names a risk; the others are categorical guarantees or independence. This is weak discrimination for Hard. | Use comparable descriptions of right-way, wrong-way and general exposure/default dependence. |
| [fin-risk-frtb](src/features/quick-practice/data/bank/finance/risk.ts#L54) — Finance / Financial risk management | Two distractors describe averaging profitable scenarios or eliminating model risk, leaving only an ES-versus-VaR binary distinction. | Use comparable confidence levels, stress scopes and liquidity-horizon conventions; keep the framework/version explicit. |
| [fin-pricing-calibration](src/features/quick-practice/data/bank/finance/pricing.ts#L18) — Finance / Quantitative pricing and numerical finance | Wrong choices assert guaranteed profits, future-price certainty or permanent error removal. The question tests rejection of guarantees more than understanding of calibration. | Contrast market-price fitting with historical parameter estimation and specified calibration objectives at the intended introductory level. |
| [ml-pca-direction](src/features/quick-practice/data/bank/machine-learning.ts#L104) — Machine Learning / Unsupervised learning | Zero vector after centring and a covariance-independent diagonal line are easily dismissed; the practical objective is only largest versus smallest eigenvalue. | Use actual alternative directions or explicit covariance/correlation-PCA distinctions without introducing a sign ambiguity. |
| [ml-attention-mask](src/features/quick-practice/data/bank/machine-learning.ts#L199) — Machine Learning / Neural networks and deep learning | Removing position or increasing dimension are weak alternatives. The only plausible distinction is mask timing. | Use comparable attention-mask placements or shifted target/input configurations that assess causal flow. |

These recommendations concern future editorial work on the listed existing items. They do not authorise changing their established intent, reusing IDs or silently rewriting the current bank.

### E02 — Provide the exact supporting result, not only a prerequisite

Each row has **Minor educational severity, Verified support-gap status and High confidence in the observed gap**. The effect on learning is an editorial judgement. These findings do not make the questions' answers incorrect; their explanations usually supply a correct short argument. A relevant prerequisite link should not be described as complete theorem coverage.

| Question / category / subsection | Observed support gap | Recommended support |
| --- | --- | --- |
| [prob-025](src/features/quick-practice/data/bank/probability.ts#L354) — Probability / Central limit theorem | Unlinked; the library has only an i.i.d. CLT, which does not cover triangular arrays. | Provide finite-row Lindeberg–Feller assumptions, normalisation and conclusion before adding a direct link. |
| [stat-012](src/features/quick-practice/data/bank/statistics.ts#L167) — Statistics / Confidence intervals | Linked confidence-interval definition does not prove the normal/chi-square independence giving the exact Student pivot. | Provide the exact normal-sample Student pivot; retain confidence intervals as a prerequisite. |
| [stat-013](src/features/quick-practice/data/bank/statistics.ts#L182) — Statistics / Regression | Unlinked; the OLS entry proves algebraic normal equations, not the BLUE comparison. | Provide a fixed-design Gauss–Markov result with full rank, zero mean and spherical error covariance. |
| [stat-019](src/features/quick-practice/data/bank/statistics.ts#L269) — Statistics / Asymptotic statistics | Linked first-order delta theorem explicitly excludes a zero derivative, so it cannot establish this nondegenerate squared-mean limit. | Link the existing continuous-mapping theorem for the direct argument; label first-order delta as a contrast only. |
| [process-003](src/features/quick-practice/data/bank/stochastic-processes.ts#L36) — Stochastic Processes / Markov chains | Linked Markov-property definition does not cover finite-chain transition convergence. | Provide finite irreducible aperiodic ergodicity, separating stationary existence from convergence. |
| [process-018](src/features/quick-practice/data/bank/stochastic-processes.ts#L256) — Stochastic Processes / Poisson processes | The Poisson reference omits the conditional binomial count identity. | Add the count-split derivation or conditional uniform-arrival result with 0<s<t. |
| [process-027](src/features/quick-practice/data/bank/stochastic-processes.ts#L388) — Stochastic Processes / General definitions | Unlinked; modification versus indistinguishability is absent from the library. | State the different fixed-time and simultaneous-all-times quantifiers. |
| [process-029](src/features/quick-practice/data/bank/stochastic-processes.ts#L417) — Stochastic Processes / Birth-death processes | Unlinked; the explosion entry covers a special 2^n example, not the reciprocal-rate criterion. | Provide the independent exponential holding-time criterion and distinguish finite expected explosion from its converse. |
| [measure-019](src/features/quick-practice/data/bank/measure-theory.ts#L269) — Measure Theory / Almost sure / almost everywhere concepts | Unlinked; the finite-measure Egorov theorem is absent. | Provide Egorov with finite total measure and a.e. convergence; connect the moving-interval counterexample. |
| [measure-020](src/features/quick-practice/data/bank/measure-theory.ts#L283) — Measure Theory / Radon-Nikodym theorem | The linked RN existence theorem does not state or derive the density chain rule. | Add the chain rule with the zero-on-f=0 convention and a short change-of-measure proof. |
| [calc-017](src/features/quick-practice/data/bank/stochastic-calculus.ts#L230) — Stochastic Calculus / Existence and uniqueness | The strong-solution definition does not supply the global Lipschitz existence/uniqueness result. | Provide a nonexplosive global strong existence/pathwise uniqueness theorem with initial-data conditions. |

More broadly, **142 questions are unlinked: 42 mathematics and all 100 Finance questions**. Their explanations were still reviewed. This is a documented library limitation rather than a broken-link error. Appendix B shows each item's link count. For Finance, reviewable compounding, instrument-pricing and loss-quantile conventions would be particularly useful supporting material during later authorised reference work.

Additional recommendations are to distinguish exact identities from approximations in feedback, retain explicit conditions on no-arbitrage trades and stopping theorems, and explain the most plausible distractor after giving the result. The existing notes on discrete ES boundary weighting, physical versus risk-neutral default, truncated versus terminal RL transitions and canonical/shuffled grading are worth preserving.

The balanced roadmap should guide later authorised expansion, with distinct learning objectives rather than numeric reskins. This audit has not added questions or implemented any expansion.

## Duplicate and substantially repetitive content findings

There are **no exact duplicate prompts** after whitespace normalisation. This was checked structurally and supplemented by semantic comparison across categories. Exact-string uniqueness does not measure independent syllabus coverage. The three near-repeat findings and three complementary reuse groups below distinguish those cases explicitly.

### R01

**Questions and scope:**

- [prob-023](src/features/quick-practice/data/bank/probability.ts#L324) — Probability / Modes of convergence
- [measure-005](src/features/quick-practice/data/bank/measure-theory.ts#L66) — Measure Theory / Convergence theorems

**Severity:** Minor educational. **Status:** Verified shared construction; near-repeat. **Confidence:** High.

**Reasoning:** Both use exactly n·1_(0,1/n), eventual pointwise zero and integral 1. One asks the UI conclusion and the other asks which formula has that property. The shared escaping-mass family is explicitly declared, so this is intentional rather than an ID collision.

**Recommended action:** Keep both IDs; make the different probability/measure objectives explicit and review whether their explanations and distractors earn separate practice exposure.

### R03

**Questions and scope:**

- [prob-006](src/features/quick-practice/data/bank/probability.ts#L79) — Probability / Modes of convergence
- [process-028](src/features/quick-practice/data/bank/stochastic-processes.ts#L402) — Stochastic Processes / Martingales

**Severity:** Minor educational. **Status:** Verified substantially repetitive objective. **Confidence:** High.

**Reasoning:** Both ask the same UI equivalence with L1 convergence under probability/a.s. convergence and an integrable limit. The martingale premise in process-028 is mathematically unnecessary for the requested answer.

**Recommended action:** Retain the IDs and histories; clarify this repeated objective and consider a future editorial revision that uses a genuinely martingale-specific closure property while preserving the item's established intent.

### R06

**Questions and scope:**

- [prog-dangling-reference](src/features/quick-practice/data/bank/programming.ts#L158) — Programming / C++ object-oriented programming and memory
- [prog-span-lifetime](src/features/quick-practice/data/bank/programming.ts#L197) — Programming / Modern C++

**Severity:** Minor educational. **Status:** Potentially excessive repetition in a small bank. **Confidence:** Medium.

**Reasoning:** Both return a non-owning handle into an ordinary local owner and ask why subsequent reading is invalid. Reference binding and span ownership are distinct topics, but the reasoning is nearly identical and both are labelled Hard.

**Recommended action:** Keep both; explain the reference/view contrast and calibrate their labels before giving two separate advanced-credit signals.

### R02

**Questions and scope:**

- [prob-009](src/features/quick-practice/data/bank/probability.ts#L124) — Probability / Independence
- [prob-ce-nonnested-tower](src/features/quick-practice/data/bank/batch-a.ts#L57) — Probability / Conditional expectation

**Severity:** Informational. **Status:** Complementary reuse; no defect established. **Confidence:** High.

**Reasoning:** The same fair-bit parity construction tests pairwise-versus-mutual independence in one item and failure of a non-nested tower identity in the other. These are distinct objectives.

**Recommended action:** Retain both; optionally document their shared construction without conflating their independent progress.

### R04

**Questions and scope:**

- [process-006](src/features/quick-practice/data/bank/stochastic-processes.ts#L81) — Stochastic Processes / Stopping times
- [process-021](src/features/quick-practice/data/bank/stochastic-processes.ts#L301) — Stochastic Processes / Stopping times
- [process-continuous-sampling-bound](src/features/quick-practice/data/bank/batch-a.ts#L346) — Stochastic Processes / Stopping times

**Severity:** Informational. **Status:** Related theorem family; no exact duplicate. **Confidence:** High.

**Reasoning:** All contrast bounded stopping with insufficient weaker assumptions, but the walk counterexample, discrete theorem and càdlàg continuous conditional theorem supply distinguishable objectives.

**Recommended action:** Retain the discrete/continuous path and filtration distinctions explicitly; monitor concentration of this family in mixed sessions.

### R05

**Questions and scope:**

- [prob-013](src/features/quick-practice/data/bank/probability.ts#L180) — Probability / Expectation
- [fin-portfolio-variance](src/features/quick-practice/data/bank/finance/portfolio.ts#L24) — Finance / Portfolio theory and asset pricing
- [fin-pricing-antithetic](src/features/quick-practice/data/bank/finance/pricing.ts#L30) — Finance / Quantitative pricing and numerical finance
- [ml-forest-correlation](src/features/quick-practice/data/bank/machine-learning.ts#L65) — Machine Learning / Supervised learning

**Severity:** Informational. **Status:** Cross-subject transfer; no defect established. **Confidence:** High.

**Reasoning:** All use variance-of-a-sum algebra. Portfolio risk, antithetic sampling and ensemble correlation are meaningful applications, unlike a mere change of numeric values.

**Recommended action:** Retain their applied distinctions; do not count them as four independent underlying mathematical competencies.

The only declared `familyId` group is the two-item `escaping-mass` group. The sampler has no family-based exclusion, so related items can occur together in a session. This is an educational observation, not a proposed feature implementation. No ID was retired or deleted during this audit.

## Independent mathematical and technical checks

The following more delicate items were checked beyond recognition of their theorem names:

1. **Pairwise Borel–Cantelli (`prob-pairwise-borel-cantelli`).** For a fixed tail starting at `m`, let `S(m,N)` count its occurrences. Pairwise independence gives `Var S≤E S`; therefore `P(S=0)≤1/E S→0`. Every infinite tail contains an occurrence almost surely, and intersecting these countably many probability-one events gives infinitely many occurrences. Adjacent independence alone is insufficient: alternate two independent fair-bit events, whose union has probability 3/4.
2. **Pure-birth nonexplosion (`process-029`).** For independent holding times `H_n~Exp(λ_n)`, set `T=ΣH_n`. For `c>0`, `E[e^(−cT)]=∏λ_n/(λ_n+c)`. Its logarithm is `−Σlog(1+c/λ_n)`, which diverges to `−∞` exactly when `Σ1/λ_n` diverges. The expectation is then zero, so `T=∞` almost surely. If the reciprocal series converges, `E[T]<∞`, hence `T<∞` almost surely. This independently verifies the equivalence, rather than incorrectly inferring a.s. divergence from infinite expectation alone.
3. **RN counterexample (`measure-006`).** Counting measure on the uncountable interval has no nonempty null set, so Lebesgue measure is absolutely continuous with respect to it. A density would integrate to zero on each singleton, forcing its value to zero at every point; it cannot then give total mass one. The dominating measure is not sigma-finite.
4. **Fubini failure (`measure-fubini-order-failure`).** The y-section antiderivative `y/(x²+y²)` gives `1/(1+x²)`; the x-section gives `−1/(1+y²)`. Their integrals are `π/4` and `−π/4`. In polar coordinates the absolute integrand contributes `|cos(2θ)| dr/r`, divergent near the origin. Both finite iterated values coexist with failure of absolute integrability.
5. **Boundary LR and squared normal mean (`stat-020`, `stat-019`).** The constrained normal MLE is `max(0,mean)` and the LR statistic is `max(0,Z)²` for exactly standard normal `Z`. The mixture is exact in this model, not a universal boundary law. Separately, `n·mean²=Z²` is exactly χ² with one degree of freedom for every `n`, not merely in the limit.
6. **Local versus true integrability (`calc-finite-energy-infinite-moment`).** Independence gives `E|YW_t|=E|Y|E|W_t|<∞` and the conditional martingale identity, while `E[(YW_t)²]=tE[Y²]=∞` for `t>0`. Independent enlargement at time zero preserves the Brownian increment condition. Pathwise finite energy does not imply an expected-energy bound.
7. **Girsanov sign and Feynman–Kac scope (`calc-018`, `calc-023`).** For constant θ, weighting the normal increment by `exp(−θW_T−θ²T/2)` shifts its mean to `−θT`, confirming the positive correction `W_t+∫θ ds`. For Feynman–Kac, discounting a bounded classical solution gives a bounded local martingale with drift proportional to `u_t+Lu−ru`; boundedness makes it a true martingale. The prompt represents an assumed classical solution and correctly avoids claiming its existence from Lipschitz coefficients alone.
8. **SDE uniqueness and time change (`calc-017`, `calc-025`, `calc-026`).** Global Lipschitz coefficients imply linear growth, whereas local Lipschitz alone can explode, for example the deterministic drift `b(x)=x²` from a positive initial point. DDS includes divergent terminal quadratic variation; the inverse clock therefore covers every Brownian time. Weak existence and pathwise uniqueness are both needed for Yamada–Watanabe. The prescribed-noise solution distinctions were checked against a primary university treatment. [Oxford, Stochastic Analysis and PDEs, §3.2](https://www.stats.ox.ac.uk/~etheridg/pdecdt.pdf).
9. **Finance conventions.** All **68** Finance `short_calculation` items were recalculated: **63 numeric-choice items and five mixed-text items**. Every result matched exactly one offered option under the intended assumptions, with rounding tolerances corresponding to pennies/percentages/four-place quotes. Checks include loan terminal-balance recursion, EUR/GBP unit cancellation, statewise binomial replication, the butterfly payoff in every price region, the discrete VaR convolution and equal-weight wealth paths. These establish the calculations, not practical executability beyond the prompt's stated market assumptions.
10. **Framework facts.** `fin-risk-frtb` matches the Basel measure's 97.5% one-tailed confidence, liquidity-horizon scaling and stressed calibration in MAR33.3–33.5. This confirms the framework description, not any jurisdiction's adoption timetable. [BIS, Basel Framework, market risk](https://www.bis.org/committees/bcbs/basel-framework/standard/mar?allChapters=true).

For programming, the observed deterministic outputs were compared with the actual option strings. C++20 required rejections for the const-reference binding and `unique_ptr` copy were reproduced. Signed overflow and the two returned dangling handles were syntax-checked but not executed; language rules, not an observed crash or apparent successful read, establish their undefined behaviour. Reallocation invalidation and representable-result requirements were also checked in the C++20 draft. [WG21 N4861, C++20 draft, §7.1 and §22.3.11.5](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/n4861.pdf).

The advanced theorem conditions were also corroborated directly: Novikov's finite-horizon exponential-energy condition in EPFL's notes and the unbounded-bracket DDS statement in Obłój's university-hosted notes. The CIR Feller inequality, including equality and a positive initial state, agrees with the primary time-change paper hosted by its author. [EPFL, Stochastic Calculus II, §4.1](https://ipgold.epfl.ch/~leveque/Lecture_Notes/sc2_final.pdf), [Obłój, Theorem 2.3.6](https://people.maths.ox.ac.uk/obloj/Paris12_2.pdf), [Mendoza-Arriaga et al., §3.2](https://users.iems.northwestern.edu/~rmendoza/Rafael%20Mendoza-Paper-1-TC.pdf).

The Python results follow iterator consumption, definition-time mutable defaults, shared closure cells and shallow object sharing. NumPy broadcasting, slicing and materialised shape checks were executed. [Python, function definitions](https://docs.python.org/3/reference/compound_stmts.html#function-definitions), [NumPy, broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html).

ML scalar results were derived independently: logistic probability 0.75, ensemble error variance 3, gradient iterate 1.4, momentum iterate 4.92, backprop derivative 24, Bellman value 11, Q-learning update 5.7, precision 0.75 and recall 0.60. The backprop derivative was also checked by a centred numerical difference. MAP's Gaussian penalty uses total negative log-likelihood, and the stated finite-term ELBO identity has the correct KL direction. Tensor pairing was verified in NumPy as an analogue, not represented as PyTorch execution.

## Validation results and limitations

| Check | Result | What it establishes |
| --- | --- | --- |
| `npm run validate:bank` | Passed: 330 questions; 122 Reference objects; 188 linked questions | Schema, taxonomy, IDs, exact prompts and reference targets |
| `npm test` | Passed: all 12 test files; no failures | Existing automated regressions and authored calculation fixtures |
| `npm run audit:bank` | Passed; no configured answer-length flags; correct option uniquely longest in 54/330; canonical positions 78/91/88/73 | Editorial signals only; shuffling makes canonical-position totals a weak cue |
| `npm run test:code` | Passed after resolving sandbox process restriction | Seven Python/NumPy outputs; IndexError; five C++20 outputs; two required rejections; three syntax-only UB examples; numerical/shape checks |
| Independent audit numerical script | Passed: all 68 Finance calculations and additional counterexample/replication/derivative checks | Independently supplied values checked against every offered option, including non-key options |
| Coverage integrity | Passed: 330 distinct ledger IDs; no missing or extra ID | Every existing record accounted for |
| Source preservation | 81 files under `src/`, `tests/` and `scripts/` unchanged by SHA-256 | Bank, Reference, rendering, grading and test/script sources retained |

Local tools were **Python 3.14.7, NumPy 2.5.3 and g++ 16.2.1 with `-std=c++20`**. Compiler acceptance or observed output is not a proof of behaviour for every implementation; the language-standard reasoning matters separately. PyTorch and SymPy are not installed. No dependencies were installed to perform this audit.

No production build or browser/live-device suite was rerun: the task changed only this Markdown report, and existing rendering tests were inspected and unit-tested. This audit therefore makes no fresh Safari, iPhone, deployment or live-site claim. Passing a KaTeX parser establishes syntactic rendering, not mathematical meaning.

### U01 — Questions not fully verified by framework execution

**Severity:** Informational verification limitation. **Status:** Not fully executed in the specified framework. **Confidence:** High for documented rules; no claim of observed PyTorch runtime behaviour.

- [ml-eval-grad-mode](src/features/quick-practice/data/bank/machine-learning.ts#L409) — Machine Learning / Applied machine learning and implementation
- [ml-gradient-accumulation](src/features/quick-practice/data/bank/machine-learning.ts#L428) — Machine Learning / Applied machine learning and implementation
- [ml-loss-broadcast-bug](src/features/quick-practice/data/bank/machine-learning.ts#L448) — Machine Learning / Applied machine learning and implementation
- [ml-terminal-target](src/features/quick-practice/data/bank/machine-learning.ts#L468) — Machine Learning / Applied machine learning and implementation

All four have been analytically/documentarily reviewed, but their actual PyTorch operations were **not executed locally**. `model.eval()` and `no_grad()` are separate controls; backward accumulation is documented; tensor broadcasting is documented and checked with NumPy; terminal masking is checked algebraically and against the distinction between termination and external truncation. [PyTorch 2.8, autograd mechanics](https://docs.pytorch.org/docs/2.8/notes/autograd.html), [PyTorch 2.8, backward](https://docs.pytorch.org/docs/2.8/generated/torch.Tensor.backward.html), [Gymnasium, handling time limits](https://gymnasium.farama.org/tutorials/gymnasium_basics/handling_time_limits/).

`prog-binary-search` also cannot be certified as a unique-answer item as currently written (B01). N08 cannot be certified as a dtype-unconditional runnable expression. The N01–N07 concerns remain conditional on interpreting the omitted conventions as intended; they are explicitly recorded rather than silently supplied. **No question was omitted or abandoned without review.** Empirical difficulty and distractor performance remain unverified for the whole bank because no learner response data were supplied.

## Appendix A — Subsection coverage

### Probability

| Subsection | Questions reviewed | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| Independence | 5 | 2 | 2 | 1 |
| Conditional probability | 2 | 2 | 0 | 0 |
| Modes of convergence | 8 | 2 | 4 | 2 |
| Conditional expectation | 7 | 1 | 4 | 2 |
| Central limit theorem | 2 | 0 | 1 | 1 |
| Probability spaces | 2 | 1 | 1 | 0 |
| Random variables | 1 | 1 | 0 | 0 |
| Common distributions | 2 | 1 | 1 | 0 |
| Expectation | 2 | 1 | 1 | 0 |
| Generating functions | 2 | 1 | 1 | 0 |
| Laws of large numbers | 2 | 1 | 1 | 0 |
| Concentration inequalities | 2 | 1 | 1 | 0 |

### Statistics

| Subsection | Questions reviewed | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| Estimation | 3 | 2 | 1 | 0 |
| Bias, variance and MSE | 2 | 2 | 0 | 0 |
| Sufficiency | 5 | 1 | 3 | 1 |
| Maximum likelihood | 4 | 2 | 1 | 1 |
| Confidence intervals | 3 | 1 | 2 | 0 |
| Hypothesis testing | 5 | 2 | 2 | 1 |
| Regression | 2 | 1 | 1 | 0 |
| Bayesian inference | 2 | 1 | 1 | 0 |
| Asymptotic statistics | 2 | 0 | 1 | 1 |

### Measure Theory

| Subsection | Questions reviewed | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| Sigma-algebras | 3 | 2 | 1 | 0 |
| Convergence theorems | 8 | 2 | 4 | 2 |
| Radon-Nikodym theorem | 5 | 1 | 2 | 2 |
| Measurable functions | 2 | 2 | 0 | 0 |
| Measures | 4 | 2 | 2 | 0 |
| Lebesgue integration | 2 | 1 | 1 | 0 |
| Almost sure / almost everywhere concepts | 3 | 1 | 1 | 1 |
| Product measures | 5 | 1 | 3 | 1 |
| Probability measures | 2 | 1 | 1 | 0 |

### Stochastic Processes

| Subsection | Questions reviewed | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| Poisson processes | 4 | 3 | 1 | 0 |
| Martingales | 6 | 2 | 2 | 2 |
| Markov chains | 7 | 3 | 3 | 1 |
| Stopping times | 7 | 1 | 4 | 2 |
| General definitions | 4 | 2 | 1 | 1 |
| Filtrations | 4 | 2 | 1 | 1 |
| Random walks | 1 | 1 | 0 | 0 |
| Continuous-time Markov chains | 5 | 1 | 3 | 1 |
| Brownian motion | 2 | 1 | 1 | 0 |
| Gaussian processes | 1 | 0 | 1 | 0 |
| Birth-death processes | 2 | 0 | 1 | 1 |
| Levy processes | 1 | 0 | 1 | 0 |

### Stochastic Calculus

| Subsection | Questions reviewed | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| Brownian motion properties | 2 | 2 | 0 | 0 |
| Quadratic variation | 4 | 2 | 2 | 0 |
| Ito's lemma | 2 | 0 | 2 | 0 |
| Local martingales | 3 | 0 | 2 | 1 |
| Stochastic integration | 3 | 0 | 3 | 0 |
| Ito integral | 5 | 1 | 3 | 1 |
| Semimartingales | 2 | 0 | 2 | 0 |
| Continuous martingales | 2 | 0 | 0 | 2 |
| Stochastic differential equations | 3 | 1 | 2 | 0 |
| Strong and weak solutions | 3 | 0 | 2 | 1 |
| Existence and uniqueness | 1 | 0 | 1 | 0 |
| Girsanov theorem | 2 | 0 | 0 | 2 |
| Martingale representation | 1 | 0 | 0 | 1 |
| Infinitesimal generators | 1 | 0 | 1 | 0 |
| Kolmogorov equations | 1 | 0 | 1 | 0 |
| Feynman-Kac | 1 | 0 | 0 | 1 |
| Martingale problems | 1 | 0 | 0 | 1 |

### Finance

| Subsection | Questions reviewed | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| Financial markets and instruments | 10 | 3 | 4 | 3 |
| Market microstructure | 10 | 3 | 4 | 3 |
| Bonds and fixed income | 10 | 3 | 4 | 3 |
| Loans and credit | 10 | 3 | 4 | 3 |
| Forwards and futures | 10 | 3 | 4 | 3 |
| Options | 10 | 3 | 4 | 3 |
| Swaps and other derivatives | 10 | 3 | 4 | 3 |
| Portfolio theory and asset pricing | 10 | 3 | 4 | 3 |
| Financial risk management | 10 | 3 | 4 | 3 |
| Quantitative pricing and numerical finance | 10 | 3 | 4 | 3 |

### Programming

| Subsection | Questions reviewed | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| C++ fundamentals | 3 | 2 | 1 | 0 |
| C++ STL and algorithms | 3 | 1 | 1 | 1 |
| C++ object-oriented programming and memory | 3 | 1 | 1 | 1 |
| Modern C++ | 2 | 0 | 1 | 1 |
| Python fundamentals | 3 | 1 | 1 | 1 |
| Python data structures | 2 | 1 | 1 | 0 |
| NumPy and scientific Python | 3 | 1 | 1 | 1 |
| Algorithms and complexity | 2 | 1 | 1 | 0 |
| Debugging and code analysis | 2 | 0 | 1 | 1 |
| Numerical and quantitative programming | 2 | 0 | 1 | 1 |

### Machine Learning

| Subsection | Questions reviewed | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| Machine learning foundations | 2 | 1 | 1 | 0 |
| Supervised learning | 2 | 1 | 1 | 0 |
| Unsupervised learning | 2 | 1 | 1 | 0 |
| Optimisation and training | 3 | 1 | 1 | 1 |
| Neural networks and deep learning | 2 | 0 | 1 | 1 |
| Reinforcement learning | 3 | 1 | 1 | 1 |
| Probabilistic and Bayesian machine learning | 2 | 0 | 1 | 1 |
| Time series and sequential machine learning | 2 | 0 | 1 | 1 |
| Evaluation and generalisation | 3 | 2 | 1 | 0 |
| Applied machine learning and implementation | 4 | 1 | 2 | 1 |

## Appendix B — Complete item-by-item review ledger

**Key** is the unchanged zero-based canonical bank index (0–3), not a shuffled display letter. **Links** counts linked Reference objects. **Disposition** assesses the intended answer; finding codes record qualifications. `Reviewed` means the key and explanation are defensible in the stated or ordinary subject setting, not that every difficulty label or distractor is endorsed. `Conditional` points to an assumption/convention concern; `Ambiguous` marks B01; `Docs/analysis` records the PyTorch execution limitation. Every row's basis is an independent result or rule used to assess the choices.

### Probability — 37 reviewed

| Question ID | Subsection | Difficulty | Key | Links | Disposition | Independent verification basis | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [prob-001](src/features/quick-practice/data/bank/probability.ts#L6) | Independence | Easy | 1 | 0 | Reviewed | P(A∩B)=0.4×0.5=0.2; only option 1 matches. | — |
| [prob-002](src/features/quick-practice/data/bank/probability.ts#L20) | Conditional probability | Easy | 2 | 0 | Reviewed | Conditional outcomes {2,4,6}; 2 favourable of 3. | — |
| [prob-003](src/features/quick-practice/data/bank/probability.ts#L34) | Modes of convergence | Easy | 2 | 3 | Reviewed | a.s. implies probability by dominated convergence on deviation indicators; converse/moment implications fail. | — |
| [prob-004](src/features/quick-practice/data/bank/probability.ts#L49) | Conditional expectation | Medium | 1 | 1 | Reviewed | G-measurability plus integrability and all G-event integral identities give the unique conditional expectation. | — |
| [prob-005](src/features/quick-practice/data/bank/probability.ts#L64) | Central limit theorem | Medium | 2 | 1 | Reviewed | Classical i.i.d. normalised CLT needs finite positive variance; zero variance makes denominator undefined. | — |
| [prob-006](src/features/quick-practice/data/bank/probability.ts#L79) | Modes of convergence | Hard | 3 | 1 | Reviewed | Probability convergence plus UI is equivalent to L1 convergence; bounded means/tightness are insufficient. | R03 |
| [prob-007](src/features/quick-practice/data/bank/probability.ts#L94) | Probability spaces | Easy | 0 | 1 | Reviewed | Unit total mass distinguishes probability measures. | — |
| [prob-008](src/features/quick-practice/data/bank/probability.ts#L109) | Random variables | Easy | 1 | 1 | Reviewed | All real half-lines generate the Borel sigma-algebra; integer thresholds/singletons alone are insufficient. | — |
| [prob-009](src/features/quick-practice/data/bank/probability.ts#L124) | Independence | Medium | 2 | 0 | Reviewed | Four bit outcomes give uniform pairs but constrain parity, disproving mutual independence. | R02 |
| [prob-010](src/features/quick-practice/data/bank/probability.ts#L138) | Conditional probability | Easy | 3 | 0 | Reviewed | Joint-probability identities yield P(B\|A)P(A)/P(B). | — |
| [prob-011](src/features/quick-practice/data/bank/probability.ts#L152) | Common distributions | Easy | 0 | 0 | Reviewed | Exponential survival ratio is exp(−λt), including s=0 or t=0. | — |
| [prob-012](src/features/quick-practice/data/bank/probability.ts#L166) | Common distributions | Medium | 1 | 0 | Reviewed | Monotone transformation gives P(U≥exp(−y))=1−exp(−y). | — |
| [prob-013](src/features/quick-practice/data/bank/probability.ts#L180) | Expectation | Easy | 2 | 0 | Reviewed | Centred square expansion gives the +2 covariance cross term. | R05 |
| [prob-014](src/features/quick-practice/data/bank/probability.ts#L194) | Expectation | Medium | 3 | 0 | Reviewed | Independence factors E[XY]; converse fails, e.g. symmetric X and Y=X². Explanation could say linear association more precisely. | — |
| [prob-015](src/features/quick-practice/data/bank/probability.ts#L208) | Conditional expectation | Medium | 0 | 1 | Reviewed | Nested sigma-algebras yield the tower identity by the defining integral identities. | — |
| [prob-016](src/features/quick-practice/data/bank/probability.ts#L223) | Generating functions | Easy | 1 | 0 | Reviewed | PGF is E[s^N]; bounded for 0<s<1. | — |
| [prob-017](src/features/quick-practice/data/bank/probability.ts#L237) | Generating functions | Medium | 2 | 0 | Reviewed | Modulus-one integrand ensures existence; Fourier uniqueness identifies the law. | — |
| [prob-018](src/features/quick-practice/data/bank/probability.ts#L251) | Laws of large numbers | Easy | 3 | 1 | Reviewed | Integrability is sufficient for the i.i.d. SLLN with finite mean. | — |
| [prob-019](src/features/quick-practice/data/bank/probability.ts#L266) | Concentration inequalities | Easy | 0 | 0 | Reviewed | Markov applied to (X−μ)² gives σ²/a². | — |
| [prob-020](src/features/quick-practice/data/bank/probability.ts#L280) | Concentration inequalities | Medium | 1 | 0 | Reviewed | Independent deterministically bounded variables justify the stated one-sided Hoeffding bound. | — |
| [prob-021](src/features/quick-practice/data/bank/probability.ts#L294) | Modes of convergence | Medium | 2 | 2 | Reviewed | Portmanteau at a constant yields probability convergence; tails do not ensure moments or a.s. convergence. | — |
| [prob-022](src/features/quick-practice/data/bank/probability.ts#L309) | Conditional expectation | Hard | 3 | 1 | Reviewed | CE is the L2(G) orthogonal projection; residual orthogonal to G, not all F. Difficulty concern D01. | D01 |
| [prob-023](src/features/quick-practice/data/bank/probability.ts#L324) | Modes of convergence | Hard | 0 | 2 | Reviewed | Pointwise eventual zero; integral and large-n tail integral both equal 1. Difficulty/repetition concerns D01/R01. | D01, R01 |
| [prob-024](src/features/quick-practice/data/bank/probability.ts#L340) | Independence | Medium | 1 | 0 | Reviewed | Joint Gaussian characteristic function factors iff cross covariance vanishes, including degeneracy. | — |
| [prob-025](src/features/quick-practice/data/bank/probability.ts#L354) | Central limit theorem | Hard | 2 | 0 | Conditional | Lindeberg controls truncated large-term variance; normalised row variance equals 1. Row-index clarity concern N01. | N01, E02 |
| [prob-ce-partition-mean](src/features/quick-practice/data/bank/batch-a.ts#L6) | Conditional expectation | Easy | 0 | 2 | Reviewed | Within-cell means are (0+2)/2=1 and (4+6)/2=5. | — |
| [prob-ce-known-factor](src/features/quick-practice/data/bank/batch-a.ts#L23) | Conditional expectation | Medium | 1 | 1 | Reviewed | Bounded G-measurable factor may be pulled out; independence alone does not supply G-measurability. | — |
| [prob-ce-jensen-direction](src/features/quick-practice/data/bank/batch-a.ts#L40) | Conditional expectation | Medium | 2 | 1 | Reviewed | Conditional Jensen retains conditional RHS and has ≤ direction for convex φ. | — |
| [prob-ce-nonnested-tower](src/features/quick-practice/data/bank/batch-a.ts#L57) | Conditional expectation | Hard | 3 | 2 | Reviewed | Parity independent of U gives 1/2, whereas conditioning on U gives U. Difficulty/repetition concerns D01/R02. | D01, R02 |
| [prob-lp-difference-definition](src/features/quick-practice/data/bank/batch-a.ts#L74) | Modes of convergence | Easy | 0 | 1 | Reviewed | Lp convergence is convergence of the pth absolute difference moment to zero. | — |
| [prob-subsequence-quantifiers](src/features/quick-practice/data/bank/batch-a.ts#L91) | Modes of convergence | Medium | 1 | 1 | Reviewed | Every subsequence must have an a.s.-convergent further subsequence; some alone is insufficient. | — |
| [prob-equal-laws-not-probability](src/features/quick-practice/data/bank/batch-a.ts#L108) | Modes of convergence | Medium | 2 | 2 | Reviewed | Identical laws give distributional convergence but mismatch probability stays 1/2. | — |
| [prob-slutsky-random-denominator](src/features/quick-practice/data/bank/batch-a.ts#L125) | Modes of convergence | Medium | 3 | 2 | Reviewed | Slutsky gives Z/2 with variance 1/4; independence unnecessary. | — |
| [prob-mutual-independence-subsets](src/features/quick-practice/data/bank/batch-b.ts#L6) | Independence | Easy | 0 | 1 | Reviewed | Product probabilities are needed for every subcollection, not pairs/full collection alone. | — |
| [prob-summable-events-limsup](src/features/quick-practice/data/bank/batch-b.ts#L23) | Probability spaces | Medium | 1 | 1 | Reviewed | Tail-union probabilities vanish; random last occurrence need not have a deterministic bound. | — |
| [prob-pairwise-borel-cantelli](src/features/quick-practice/data/bank/batch-b.ts#L40) | Independence | Hard | 2 | 2 | Reviewed | Pairwise independence gives Var(tail count)≤E(count); Chebyshev makes each infinite tail contain an event a.s. | — |
| [prob-dependent-average-failure](src/features/quick-practice/data/bank/batch-b.ts#L57) | Laws of large numbers | Medium | 3 | 1 | Reviewed | Every average equals Z, so deviation probability from zero equals 1. | — |

### Statistics — 28 reviewed

| Question ID | Subsection | Difficulty | Key | Links | Disposition | Independent verification basis | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [stat-001](src/features/quick-practice/data/bank/statistics.ts#L6) | Estimation | Easy | 3 | 0 | Reviewed | Linearity gives E[mean]=μ without independence. | — |
| [stat-002](src/features/quick-practice/data/bank/statistics.ts#L20) | Bias, variance and MSE | Easy | 0 | 0 | Reviewed | Independence eliminates covariances, giving nσ²/n²=σ²/n. | — |
| [stat-003](src/features/quick-practice/data/bank/statistics.ts#L34) | Sufficiency | Medium | 1 | 1 | Reviewed | Bernoulli likelihood factors through the success count; minimum/maximum/first datum are insufficient for n≥3. | — |
| [stat-004](src/features/quick-practice/data/bank/statistics.ts#L49) | Maximum likelihood | Easy | 0 | 1 | Reviewed | Observed x fixed; maximise density over θ, assuming a maximiser exists. | — |
| [stat-005](src/features/quick-practice/data/bank/statistics.ts#L64) | Confidence intervals | Medium | 2 | 1 | Reviewed | Coverage averages random intervals over samples at each fixed θ, not posterior uncertainty. | — |
| [stat-006](src/features/quick-practice/data/bank/statistics.ts#L79) | Sufficiency | Hard | 1 | 2 | Reviewed | Completeness plus sufficiency gives Basu independence from ancillary statistics. Difficulty concern D01. | D01 |
| [stat-007](src/features/quick-practice/data/bank/statistics.ts#L94) | Bias, variance and MSE | Easy | 0 | 1 | Reviewed | Centred expansion gives variance plus squared bias. | — |
| [stat-008](src/features/quick-practice/data/bank/statistics.ts#L109) | Estimation | Medium | 1 | 0 | Reviewed | Pointwise-in-θ probability convergence defines consistency; unbiasedness or vanishing variance alone is insufficient. | D01 |
| [stat-009](src/features/quick-practice/data/bank/statistics.ts#L123) | Maximum likelihood | Medium | 2 | 1 | Reviewed | Score n/λ−S=0 gives λ=n/S; log-likelihood strictly concave and tends down at both ends. | — |
| [stat-010](src/features/quick-practice/data/bank/statistics.ts#L138) | Hypothesis testing | Easy | 3 | 0 | Reviewed | Test level bounds the supremum of null rejection probabilities. | — |
| [stat-011](src/features/quick-practice/data/bank/statistics.ts#L152) | Hypothesis testing | Medium | 0 | 1 | Reviewed | Neyman–Pearson rejects large alternative/null likelihood ratios, with randomisation at threshold. | — |
| [stat-012](src/features/quick-practice/data/bank/statistics.ts#L167) | Confidence intervals | Easy | 1 | 1 | Reviewed | Normal mean and independent chi-square sample variance give the exact t(n−1) pivot. | E02 |
| [stat-013](src/features/quick-practice/data/bank/statistics.ts#L182) | Regression | Medium | 2 | 0 | Reviewed | Full-rank fixed design and spherical finite error covariance give OLS BLUE without normality. | E02 |
| [stat-014](src/features/quick-practice/data/bank/statistics.ts#L196) | Bayesian inference | Easy | 3 | 0 | Reviewed | Multiplying kernels adds s and n−s to the Beta prior shape parameters. | — |
| [stat-015](src/features/quick-practice/data/bank/statistics.ts#L210) | Bayesian inference | Medium | 0 | 0 | Reviewed | Posterior quadratic risk equals posterior variance plus (action−posterior mean)². | — |
| [stat-016](src/features/quick-practice/data/bank/statistics.ts#L224) | Asymptotic statistics | Medium | 1 | 1 | Reviewed | Linear delta expansion multiplies normal variance by [g′(θ)]². | — |
| [stat-017](src/features/quick-practice/data/bank/statistics.ts#L239) | Sufficiency | Medium | 2 | 2 | Reviewed | Tower preserves mean; total variance gives non-strict variance reduction. | — |
| [stat-018](src/features/quick-practice/data/bank/statistics.ts#L254) | Maximum likelihood | Hard | 3 | 1 | Reviewed | Interior score is −1/θ; moving support endpoint supplies the missing boundary derivative. | — |
| [stat-019](src/features/quick-practice/data/bank/statistics.ts#L269) | Asymptotic statistics | Hard | 0 | 1 | Reviewed | √n mean is exactly N(0,1); n times its square is χ²(1) for every n. Difficulty concern D01. | D01, E02 |
| [stat-020](src/features/quick-practice/data/bank/statistics.ts#L284) | Hypothesis testing | Hard | 1 | 0 | Reviewed | Constrained MLE=max(0,mean); LR is max(0,Z)², yielding half atom/half χ²(1), exactly. | — |
| [stat-risk-expectation](src/features/quick-practice/data/bank/batch-b.ts#L74) | Estimation | Easy | 0 | 1 | Reviewed | Risk averages realised loss under Pθ; it is neither loss of mean action nor posterior loss. | — |
| [stat-score-parameter-derivative](src/features/quick-practice/data/bank/batch-b.ts#L91) | Maximum likelihood | Easy | 1 | 1 | Reviewed | Score differentiates log-density in θ at fixed data; second derivative is information. | — |
| [stat-ancillary-law](src/features/quick-practice/data/bank/batch-b.ts#L108) | Sufficiency | Easy | 2 | 2 | Reviewed | Entire sampling law parameter-independent defines ancillary, not just a moment. | — |
| [stat-lehmann-scheffe-scope](src/features/quick-practice/data/bank/batch-b.ts#L125) | Sufficiency | Medium | 3 | 2 | Reviewed | Complete sufficient unbiased function is UMVU within unbiased finite-variance estimators, not all estimators. | — |
| [stat-power-function](src/features/quick-practice/data/bank/batch-b.ts#L142) | Hypothesis testing | Easy | 0 | 1 | Reviewed | Randomised rejection probability averages to Eθφ; P(φ=1) loses boundary randomisation. | — |
| [stat-valid-p-value-inequality](src/features/quick-practice/data/bank/batch-b.ts#L159) | Hypothesis testing | Medium | 1 | 1 | Reviewed | Valid p-values are super-uniform under every null θ, including discrete models. | — |
| [stat-confidence-test-inversion](src/features/quick-practice/data/bank/batch-b.ts#L176) | Confidence intervals | Medium | 2 | 1 | Reviewed | Exclusion of true θ equals rejection; coverage is ≥1−α, with no interval-shape guarantee. | — |
| [stat-ols-residual-orthogonality](src/features/quick-practice/data/bank/batch-b.ts#L193) | Regression | Easy | 3 | 1 | Reviewed | Normal equations give Xᵀr=0, and yᵀr=\|\|r\|\|² generally nonzero. | — |

### Measure Theory — 34 reviewed

| Question ID | Subsection | Difficulty | Key | Links | Disposition | Independent verification basis | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [measure-001](src/features/quick-practice/data/bank/measure-theory.ts#L6) | Sigma-algebras | Easy | 2 | 1 | Reviewed | Countable-union closure is required; arbitrary union/subset/image closure is not. | — |
| [measure-002](src/features/quick-practice/data/bank/measure-theory.ts#L21) | Convergence theorems | Easy | 3 | 1 | Reviewed | Nonnegative monotone convergence allows infinite integrals without a dominating envelope. | — |
| [measure-003](src/features/quick-practice/data/bank/measure-theory.ts#L36) | Radon-Nikodym theorem | Medium | 0 | 1 | Reviewed | Sigma-finite absolute continuity gives nonnegative measurable RN density; positivity/boundedness not guaranteed. | — |
| [measure-004](src/features/quick-practice/data/bank/measure-theory.ts#L51) | Measurable functions | Easy | 2 | 1 | Reviewed | All measurable-target inverse images define measurability; singleton tests need not suffice. | — |
| [measure-005](src/features/quick-practice/data/bank/measure-theory.ts#L66) | Convergence theorems | Medium | 3 | 2 | Reviewed | Height n times support length 1/n gives integral 1 and pointwise eventual zero. Repetition concern R01. | R01 |
| [measure-006](src/features/quick-practice/data/bank/measure-theory.ts#L82) | Radon-Nikodym theorem | Hard | 0 | 1 | Reviewed | Counting-null sets are only empty; singleton identities force any putative density to vanish everywhere. | — |
| [measure-007](src/features/quick-practice/data/bank/measure-theory.ts#L97) | Sigma-algebras | Easy | 1 | 1 | Reviewed | Intersection of all containing sigma-algebras gives the smallest containing sigma-algebra. | — |
| [measure-008](src/features/quick-practice/data/bank/measure-theory.ts#L112) | Measures | Easy | 2 | 0 | Reviewed | Disjoint increments prove continuity from below without finite total mass. | — |
| [measure-009](src/features/quick-practice/data/bank/measure-theory.ts#L126) | Measures | Medium | 3 | 0 | Reviewed | Finite initial mass permits complement subtraction; infinite counting tails disprove sigma-finiteness alone. | — |
| [measure-010](src/features/quick-practice/data/bank/measure-theory.ts#L140) | Lebesgue integration | Easy | 0 | 0 | Reviewed | Disjoint simple-function integral is sum of coefficient times level-set measure. | — |
| [measure-011](src/features/quick-practice/data/bank/measure-theory.ts#L154) | Almost sure / almost everywhere concepts | Medium | 1 | 0 | Reviewed | Completeness includes every subset of every measurable null set. | — |
| [measure-012](src/features/quick-practice/data/bank/measure-theory.ts#L168) | Almost sure / almost everywhere concepts | Easy | 2 | 0 | Reviewed | Disagreement set must be null, irrespective of cardinality or topology. | — |
| [measure-013](src/features/quick-practice/data/bank/measure-theory.ts#L182) | Convergence theorems | Easy | 3 | 1 | Reviewed | Fatou is integral(liminf)≤liminf(integrals) for nonnegative functions. | — |
| [measure-014](src/features/quick-practice/data/bank/measure-theory.ts#L197) | Convergence theorems | Medium | 0 | 1 | Reviewed | A single integrable absolute envelope gives DCT; bounded L1 norms or pointwise bounds do not. | — |
| [measure-015](src/features/quick-practice/data/bank/measure-theory.ts#L212) | Product measures | Medium | 1 | 0 | Reviewed | Tonelli uses product-measurability and nonnegativity on sigma-finite products. | — |
| [measure-016](src/features/quick-practice/data/bank/measure-theory.ts#L226) | Product measures | Medium | 2 | 0 | Reviewed | Absolute integrability gives finite Fubini integrals and integrable sections a.e. | — |
| [measure-017](src/features/quick-practice/data/bank/measure-theory.ts#L240) | Probability measures | Medium | 3 | 0 | Reviewed | Agreement on a generating pi-system determines probability measures on the generated sigma-algebra. | — |
| [measure-018](src/features/quick-practice/data/bank/measure-theory.ts#L254) | Measurable functions | Easy | 0 | 1 | Reviewed | Pointwise finite limits remain measurable via countable level-set operations. | — |
| [measure-019](src/features/quick-practice/data/bank/measure-theory.ts#L269) | Almost sure / almost everywhere concepts | Hard | 1 | 0 | Reviewed | Each fixed point eventually leaves; uniformity would require deleting an infinite-measure tail union. | E02 |
| [measure-020](src/features/quick-practice/data/bank/measure-theory.ts#L283) | Radon-Nikodym theorem | Hard | 2 | 1 | Reviewed | Change of measure in ∫g dν yields gf; the stated zero-on-f=0 convention handles ν-null versions. | D01, E02 |
| [measure-dct-tail-envelope](src/features/quick-practice/data/bank/batch-a.ts#L142) | Convergence theorems | Medium | 0 | 1 | Reviewed | f_n≤1/(nx²)≤x⁻² and ∫₁∞x⁻²=1; other envelopes are nonintegrable or n-dependent. | — |
| [measure-signed-monotone-failure](src/features/quick-practice/data/bank/batch-a.ts#L159) | Convergence theorems | Hard | 1 | 1 | Reviewed | Retreating negative tail increases to zero but each integral is −∞. Difficulty concern D01. | D01 |
| [measure-scheffe-density-limit](src/features/quick-practice/data/bank/batch-a.ts#L176) | Convergence theorems | Medium | 2 | 1 | Reviewed | Integral of \|fn−f\| equals total masses minus twice integral(min(fn,f)); DCT yields zero. | — |
| [measure-reverse-fatou-upper-bound](src/features/quick-practice/data/bank/batch-a.ts#L193) | Convergence theorems | Hard | 3 | 1 | Reviewed | Fatou on g−fn gives reversed limsup inequality; upper envelope makes extended integral well-defined. | — |
| [measure-product-rectangle](src/features/quick-practice/data/bank/batch-a.ts#L210) | Product measures | Easy | 0 | 1 | Reviewed | Probability-product measure multiplies rectangle masses; generating rectangles determine it uniquely. | — |
| [measure-fubini-signed-integral](src/features/quick-practice/data/bank/batch-a.ts#L227) | Product measures | Medium | 1 | 2 | Reviewed | Absolute bound (x+y)e^(−x−y) integrates to 2; equal x/y contributions cancel to 0. | — |
| [measure-pi-lambda-closure](src/features/quick-practice/data/bank/batch-b.ts#L210) | Sigma-algebras | Medium | 0 | 1 | Reviewed | Containing lambda-system contains sigma(C); it need not itself be a sigma-algebra. | — |
| [measure-outer-measure-subadditivity](src/features/quick-practice/data/bank/batch-b.ts#L227) | Measures | Easy | 1 | 1 | Reviewed | Outer-measure definition requires countable subadditivity on all subsets. | — |
| [measure-extension-sigma-finite](src/features/quick-practice/data/bank/batch-b.ts#L244) | Measures | Medium | 2 | 1 | Reviewed | Countable finite-mass algebra cover gives uniqueness of the premeasure extension. | — |
| [measure-discrete-rn-density](src/features/quick-practice/data/bank/batch-b.ts#L261) | Radon-Nikodym theorem | Easy | 3 | 2 | Reviewed | Atomic ν/μ ratios are 1/2 and 3, not normalised probabilities. | — |
| [measure-mixed-absolute-continuity](src/features/quick-practice/data/bank/batch-b.ts#L278) | Radon-Nikodym theorem | Medium | 0 | 1 | Reviewed | ν-null implies λ-null; {0} disproves ν≪λ. | — |
| [measure-law-pushforward](src/features/quick-practice/data/bank/batch-b.ts#L295) | Probability measures | Easy | 1 | 1 | Reviewed | Law(A)=P(X⁻¹(A)); a realised indicator is not a law. | — |
| [measure-signed-integral-cancellation](src/features/quick-practice/data/bank/batch-b.ts#L312) | Lebesgue integration | Medium | 2 | 1 | Reviewed | Each half-line has logarithmically divergent absolute integral; principal value is not Lebesgue integral. | — |
| [measure-fubini-order-failure](src/features/quick-practice/data/bank/batch-b.ts#L329) | Product measures | Hard | 3 | 2 | Reviewed | Inner derivatives give ±1/(1+coordinate²); outer integrals ±π/4; polar absolute integral diverges. | — |

### Stochastic Processes — 44 reviewed

| Question ID | Subsection | Difficulty | Key | Links | Disposition | Independent verification basis | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [process-001](src/features/quick-practice/data/bank/stochastic-processes.ts#L6) | Poisson processes | Easy | 1 | 1 | Reviewed | Poisson(λt) has mean λt. | — |
| [process-002](src/features/quick-practice/data/bank/stochastic-processes.ts#L21) | Martingales | Easy | 2 | 1 | Reviewed | Adapted integrable process with E[Mt\|Fs]=Ms is a martingale. | — |
| [process-003](src/features/quick-practice/data/bank/stochastic-processes.ts#L36) | Markov chains | Medium | 3 | 1 | Reviewed | Finite irreducible chains converge from every state when aperiodic; reversible alternation is a counterexample. | E02 |
| [process-004](src/features/quick-practice/data/bank/stochastic-processes.ts#L51) | Stopping times | Medium | 0 | 1 | Reviewed | {τ≤t} must be decidable at t, not merely later. | — |
| [process-005](src/features/quick-practice/data/bank/stochastic-processes.ts#L66) | Poisson processes | Easy | 2 | 1 | Reviewed | Specified stationary independent Poisson increments identify homogeneous Poisson counting process. | — |
| [process-006](src/features/quick-practice/data/bank/stochastic-processes.ts#L81) | Stopping times | Hard | 1 | 1 | Reviewed | Walk first reaches 1 a.s. but ET=∞ and E[ST]=1; stopped family cannot be UI. | R04 |
| [process-007](src/features/quick-practice/data/bank/stochastic-processes.ts#L96) | General definitions | Easy | 0 | 0 | Conditional | Integer time and chosen real state space give intended classification; state-space wording concern N02. | N02 |
| [process-008](src/features/quick-practice/data/bank/stochastic-processes.ts#L110) | General definitions | Medium | 1 | 0 | Reviewed | Finite-dimensional distributions are all finite joint time-vector laws, not individual marginals. | D01 |
| [process-009](src/features/quick-practice/data/bank/stochastic-processes.ts#L124) | Filtrations | Easy | 2 | 1 | Reviewed | Filtration sigma-algebras increase with time. | — |
| [process-010](src/features/quick-practice/data/bank/stochastic-processes.ts#L139) | Filtrations | Easy | 3 | 1 | Reviewed | Adaptedness requires each Xt to be Ft-measurable. | — |
| [process-011](src/features/quick-practice/data/bank/stochastic-processes.ts#L154) | Random walks | Easy | 0 | 2 | Reviewed | E[S(n+1)²\|Fn]=Sn²+1, so Sn²−n is a martingale. | — |
| [process-012](src/features/quick-practice/data/bank/stochastic-processes.ts#L169) | Markov chains | Easy | 1 | 1 | Reviewed | Next-step law conditional on full past is the present-state row of P. | — |
| [process-013](src/features/quick-practice/data/bank/stochastic-processes.ts#L184) | Markov chains | Easy | 2 | 1 | Reviewed | Conditioning at the intermediate state yields matrix multiplication sum over k. | — |
| [process-014](src/features/quick-practice/data/bank/stochastic-processes.ts#L199) | Markov chains | Easy | 3 | 1 | Reviewed | Stationarity for a probability row vector is πP=π. | — |
| [process-015](src/features/quick-practice/data/bank/stochastic-processes.ts#L214) | Continuous-time Markov chains | Medium | 0 | 0 | Reviewed | Conservative finite-state generator has nonnegative off-diagonal rates and zero row sums. | — |
| [process-016](src/features/quick-practice/data/bank/stochastic-processes.ts#L228) | Continuous-time Markov chains | Easy | 1 | 0 | Reviewed | Holding-time survival exp(−qit) gives rate qi and mean 1/qi. | — |
| [process-017](src/features/quick-practice/data/bank/stochastic-processes.ts#L242) | Continuous-time Markov chains | Medium | 2 | 0 | Reviewed | Finite generator semigroup solves P′=PQ, P0=I, giving exp(tQ). | — |
| [process-018](src/features/quick-practice/data/bank/stochastic-processes.ts#L256) | Poisson processes | Medium | 3 | 1 | Reviewed | Conditional Poisson split yields Binomial(n,s/t), independently of λ. | E02 |
| [process-019](src/features/quick-practice/data/bank/stochastic-processes.ts#L271) | Poisson processes | Easy | 0 | 2 | Reviewed | Mean conditional increment λ(t−s) is compensated by subtracting λt. | — |
| [process-020](src/features/quick-practice/data/bank/stochastic-processes.ts#L286) | Martingales | Medium | 1 | 1 | Reviewed | Conditional Jensen makes the square a submartingale, without necessarily constant expectation. | — |
| [process-021](src/features/quick-practice/data/bank/stochastic-processes.ts#L301) | Stopping times | Medium | 2 | 1 | Reviewed | Bounded stopping permits a finite martingale-difference sum; the other conditions alone do not. | R04 |
| [process-022](src/features/quick-practice/data/bank/stochastic-processes.ts#L316) | Brownian motion | Easy | 3 | 1 | Reviewed | Brownian paths have infinite total variation on every nontrivial compact interval. | — |
| [process-023](src/features/quick-practice/data/bank/stochastic-processes.ts#L331) | Brownian motion | Medium | 0 | 1 | Reviewed | Independent future increment leaves covariance Var(Ws)=s. | D01 |
| [process-024](src/features/quick-practice/data/bank/stochastic-processes.ts#L346) | Gaussian processes | Medium | 1 | 0 | Reviewed | All finite joint vectors must be Gaussian; Gaussian marginals alone are insufficient. | — |
| [process-025](src/features/quick-practice/data/bank/stochastic-processes.ts#L360) | Birth-death processes | Medium | 2 | 0 | Reviewed | Birth flow πiλi balances reverse death flow π(i+1)μ(i+1); normalisation and nonexplosion are explicit. | — |
| [process-026](src/features/quick-practice/data/bank/stochastic-processes.ts#L374) | Levy processes | Medium | 3 | 0 | Reviewed | Stationary independent increments plus stochastic continuity characterise Lévy processes with the specified path version. | — |
| [process-027](src/features/quick-practice/data/bank/stochastic-processes.ts#L388) | General definitions | Hard | 0 | 0 | Reviewed | Each fixed-time spike has probability zero; every sample path has one spike. Difficulty concern D01. | D01, E02 |
| [process-028](src/features/quick-practice/data/bank/stochastic-processes.ts#L402) | Martingales | Hard | 1 | 2 | Reviewed | UI plus probability convergence is equivalent to L1 convergence; martingale assumption unused. Repetition concern R03. | R03 |
| [process-029](src/features/quick-practice/data/bank/stochastic-processes.ts#L417) | Birth-death processes | Hard | 2 | 0 | Reviewed | Independent exponential holding-time Laplace product vanishes iff ∑1/λn diverges; otherwise time is finite a.s. | E02 |
| [process-030](src/features/quick-practice/data/bank/stochastic-processes.ts#L431) | Filtrations | Hard | 3 | 2 | Reviewed | G0 knows WT; E[WT\|G0]=WT≠W0, while adaptedness remains. Difficulty concern D01. | D01 |
| [process-conditional-drift-sign](src/features/quick-practice/data/bank/batch-a.ts#L244) | Martingales | Easy | 2 | 2 | Reviewed | Nonpositive conditional drift defines supermartingale; negation gives submartingale. | — |
| [process-doob-maximum-bound](src/features/quick-practice/data/bank/batch-a.ts#L261) | Martingales | Medium | 3 | 2 | Reviewed | Apply nonnegative maximal inequality to M² at level 36: 3/36=1/12. | — |
| [process-martingale-mass-loss](src/features/quick-practice/data/bank/batch-a.ts#L278) | Martingales | Hard | 0 | 2 | Reviewed | Fair conditional doubling preserves mean 1; first tail eventually kills process, with no L1 convergence. | — |
| [process-hitting-time-event](src/features/quick-practice/data/bank/batch-a.ts#L295) | Stopping times | Easy | 1 | 1 | Reviewed | Union of adapted hit events through n is exactly {τ≤n} and belongs to Fn. | — |
| [process-stopped-information](src/features/quick-practice/data/bank/batch-a.ts#L312) | Stopping times | Medium | 2 | 1 | Reviewed | Definition of Fτ tests A∩{τ≤t} in Ft. | — |
| [process-bounded-walk-square](src/features/quick-practice/data/bank/batch-a.ts#L329) | Stopping times | Medium | 3 | 2 | Reviewed | Four barrier paths give square 4 and four nonbarrier paths square 1; average 5/2, also E[T]. | — |
| [process-continuous-sampling-bound](src/features/quick-practice/data/bank/batch-a.ts#L346) | Stopping times | Hard | 0 | 2 | Reviewed | Bounded sampling holds for true càdlàg martingales; first-tail doubling contradicts other choices. Repetition concern R04. | R04 |
| [process-continuity-measurability](src/features/quick-practice/data/bank/batch-a.ts#L363) | Filtrations | Medium | 1 | 2 | Reviewed | Adapted continuous paths are left-continuous, hence predictable, hence progressive. | — |
| [process-cadlag-path-definition](src/features/quick-practice/data/bank/batch-b.ts#L346) | General definitions | Easy | 0 | 1 | Reviewed | Right-continuity and finite left limits allow jumps. | — |
| [process-stationary-two-state-balance](src/features/quick-practice/data/bank/batch-b.ts#L363) | Markov chains | Medium | 1 | 2 | Reviewed | π0/3=π1/2 plus total mass 1 gives (3/5,2/5). | — |
| [process-stationary-not-reversible](src/features/quick-practice/data/bank/batch-b.ts#L380) | Markov chains | Medium | 2 | 1 | Reviewed | Uniform mass cycles invariantly, but forward 0→1 flow 1/3 has zero reverse flow. | — |
| [process-infinite-chain-invariant-mass](src/features/quick-practice/data/bank/batch-b.ts#L397) | Markov chains | Hard | 3 | 2 | Reviewed | Stationarity forces affine weights on Z; nonnegativity forces constant, not summable unless zero. | — |
| [process-embedded-jump-probability](src/features/quick-practice/data/bank/batch-b.ts#L414) | Continuous-time Markov chains | Medium | 0 | 1 | Reviewed | Normalise outgoing transition rate qij by total positive exit rate qi. | — |
| [process-conservative-explosive-chain](src/features/quick-practice/data/bank/batch-b.ts#L431) | Continuous-time Markov chains | Hard | 1 | 2 | Reviewed | Expected holding-time sum ∑2⁻ⁿ=2 implies finite explosion a.s.; killed minimal mass drops below 1. | — |

### Stochastic Calculus — 37 reviewed

| Question ID | Subsection | Difficulty | Key | Links | Disposition | Independent verification basis | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [calc-001](src/features/quick-practice/data/bank/stochastic-calculus.ts#L6) | Brownian motion properties | Easy | 0 | 1 | Reviewed | Standard Brownian increment is centred normal with variance t−s, not standard deviation t−s. | — |
| [calc-002](src/features/quick-practice/data/bank/stochastic-calculus.ts#L21) | Quadratic variation | Easy | 1 | 1 | Reviewed | Brownian quadratic variation equals elapsed time t. | — |
| [calc-003](src/features/quick-practice/data/bank/stochastic-calculus.ts#L36) | Ito's lemma | Medium | 2 | 1 | Reviewed | Itô with f(x)=x² yields 2W dW+dt. | — |
| [calc-004](src/features/quick-practice/data/bank/stochastic-calculus.ts#L51) | Brownian motion properties | Easy | 1 | 2 | Reviewed | Natural-filtration future increment mean is zero, giving observed conditional mean 1.3. | — |
| [calc-006](src/features/quick-practice/data/bank/stochastic-calculus.ts#L66) | Local martingales | Hard | 1 | 2 | Reviewed | Nonnegative localisation and conditional Fatou give integrability and supermartingale inequality. | — |
| [calc-007](src/features/quick-practice/data/bank/stochastic-calculus.ts#L81) | Stochastic integration | Medium | 0 | 1 | Reviewed | Elementary integral is ξ times Brownian increment over the truncated (a,b] interval. | — |
| [calc-008](src/features/quick-practice/data/bank/stochastic-calculus.ts#L96) | Ito integral | Medium | 1 | 1 | Conditional | Expected squared predictable energy is the Itô-integral second moment. | N03 |
| [calc-009](src/features/quick-practice/data/bank/stochastic-calculus.ts#L111) | Ito integral | Medium | 2 | 2 | Conditional | Finite expected quadratic energy gives a square-integrable martingale; pathwise energy alone is weaker. | N03 |
| [calc-010](src/features/quick-practice/data/bank/stochastic-calculus.ts#L126) | Ito's lemma | Medium | 3 | 1 | Reviewed | Itô drift is ft+bfx+½σ²fxx, derivatives evaluated on the process. | — |
| [calc-011](src/features/quick-practice/data/bank/stochastic-calculus.ts#L141) | Semimartingales | Medium | 0 | 2 | Reviewed | Bilinear Itô expansion gives +d[X,Y] with coefficient 1. | — |
| [calc-012](src/features/quick-practice/data/bank/stochastic-calculus.ts#L156) | Semimartingales | Medium | 1 | 1 | Reviewed | Continuous semimartingale splits into continuous local martingale and adapted locally finite variation. | — |
| [calc-013](src/features/quick-practice/data/bank/stochastic-calculus.ts#L171) | Continuous martingales | Hard | 2 | 2 | Reviewed | Continuous finite variation gives zero bracket; local martingale with zero bracket is constant. | — |
| [calc-014](src/features/quick-practice/data/bank/stochastic-calculus.ts#L186) | Stochastic differential equations | Medium | 3 | 1 | Reviewed | Differentiating proposed exponential gives drift μ only with log correction −σ²/2. | — |
| [calc-015](src/features/quick-practice/data/bank/stochastic-calculus.ts#L201) | Stochastic differential equations | Medium | 0 | 0 | Reviewed | Integrating-factor OU solution gives θ+(x−θ)e^(−κt). | — |
| [calc-016](src/features/quick-practice/data/bank/stochastic-calculus.ts#L215) | Strong and weak solutions | Medium | 1 | 2 | Reviewed | Strong solution uses prescribed noise/initial data; weak existence permits choosing space/noise. Weak-distractor concern E01. | E01 |
| [calc-017](src/features/quick-practice/data/bank/stochastic-calculus.ts#L230) | Existence and uniqueness | Medium | 2 | 1 | Reviewed | Global Lipschitz implies linear growth and unique global strong solution; local alone allows explosion. | E02 |
| [calc-018](src/features/quick-practice/data/bank/stochastic-calculus.ts#L245) | Girsanov theorem | Hard | 3 | 1 | Conditional | Negative density stochastic-integral sign gives positive Brownian drift correction under Q. Filtration clarity concern N03. | N03 |
| [calc-019](src/features/quick-practice/data/bank/stochastic-calculus.ts#L260) | Girsanov theorem | Hard | 0 | 1 | Conditional | Novikov is expectation of exp(½ energy), sufficient but not necessary. Filtration clarity concern N03. | N03 |
| [calc-020](src/features/quick-practice/data/bank/stochastic-calculus.ts#L275) | Martingale representation | Hard | 1 | 1 | Reviewed | Augmented Brownian natural filtration has representation property; added independent Brownian noise defeats it. | — |
| [calc-021](src/features/quick-practice/data/bank/stochastic-calculus.ts#L290) | Infinitesimal generators | Medium | 2 | 1 | Reviewed | Formal generator bf′+½σ²f″ is the Itô drift of f(X). | — |
| [calc-022](src/features/quick-practice/data/bank/stochastic-calculus.ts#L305) | Kolmogorov equations | Medium | 3 | 1 | Reviewed | Forward density PDE applies formal adjoint in terminal y; backward acts in starting x. | — |
| [calc-023](src/features/quick-practice/data/bank/stochastic-calculus.ts#L320) | Feynman-Kac | Hard | 0 | 1 | Reviewed | Discounted u along diffusion has zero drift for ut+Lu−ru=0 with terminal g; boundedness removes localisation. | — |
| [calc-024](src/features/quick-practice/data/bank/stochastic-calculus.ts#L335) | Martingale problems | Hard | 1 | 1 | Conditional | Generator-compensated test processes must be martingales under the library's true-martingale convention. Clarity concern N04. | N04 |
| [calc-025](src/features/quick-practice/data/bank/stochastic-calculus.ts#L350) | Continuous martingales | Hard | 2 | 1 | Reviewed | DDS random clock is [M]t; divergence ensures Brownian inverse clock exists for all times. | — |
| [calc-026](src/features/quick-practice/data/bank/stochastic-calculus.ts#L365) | Strong and weak solutions | Hard | 3 | 1 | Reviewed | Weak existence plus pathwise uniqueness yields strong existence and uniqueness in law; conditions do not create weak existence. | — |
| [calc-qv-drift-plus-noise](src/features/quick-practice/data/bank/batch-a.ts#L380) | Quadratic variation | Easy | 2 | 2 | Reviewed | Continuous finite-variation drift contributes zero; coefficient 2 gives bracket 4t. | — |
| [calc-integral-bracket-random](src/features/quick-practice/data/bank/batch-a.ts#L397) | Quadratic variation | Medium | 3 | 1 | Reviewed | Integral bracket is ∫Ws²ds; t²/2 is only its expectation. | — |
| [calc-correlated-covariation](src/features/quick-practice/data/bank/batch-a.ts#L414) | Quadratic variation | Medium | 0 | 2 | Reviewed | Bilinearity gives 2×3×ρt=6ρt; finite-variation drift contributes zero. | — |
| [calc-isometry-time-integrand](src/features/quick-practice/data/bank/batch-a.ts#L431) | Ito integral | Medium | 1 | 2 | Reviewed | Centred integral variance ∫₀²s²ds=8/3. | — |
| [calc-finite-energy-infinite-moment](src/features/quick-practice/data/bank/batch-a.ts#L448) | Ito integral | Hard | 2 | 3 | Reviewed | Independent integrable Y makes YW a true L1 martingale; second moment tE[Y²]=∞ for t>0. | — |
| [calc-elementary-left-information](src/features/quick-practice/data/bank/batch-a.ts#L465) | Stochastic integration | Medium | 3 | 2 | Reviewed | Only Wa event coefficient is known at a; future Brownian coefficients are not elementary predictable. | — |
| [calc-localising-sequence-definition](src/features/quick-practice/data/bank/batch-a.ts#L482) | Local martingales | Medium | 0 | 1 | Reviewed | Increasing stopping times tending to infinity must yield true stopped martingales, not merely constant means. | — |
| [calc-bounded-local-criterion](src/features/quick-practice/data/bank/batch-a.ts#L499) | Local martingales | Medium | 1 | 2 | Reviewed | Uniform deterministic bound permits dominated removal of localisation and gives global UI. | — |
| [calc-local-integrand-bracket-measure](src/features/quick-practice/data/bank/batch-b.ts#L448) | Stochastic integration | Medium | 2 | 1 | Reviewed | Pathwise ∫H²d[M] finite on each finite horizon defines the local energy condition. | — |
| [calc-deterministic-integral-law](src/features/quick-practice/data/bank/batch-b.ts#L465) | Ito integral | Easy | 3 | 1 | Reviewed | Deterministic L2 step approximations are normal; limit is N(0,∫h²). | — |
| [calc-sde-integral-definition](src/features/quick-practice/data/bank/batch-b.ts#L482) | Stochastic differential equations | Easy | 0 | 1 | Reviewed | Drift integrates b(Xs) against ds and diffusion σ(Xs) against dWs, both at running time s. | — |
| [calc-pathwise-uniqueness-definition](src/features/quick-practice/data/bank/batch-b.ts#L499) | Strong and weak solutions | Medium | 1 | 1 | Reviewed | Same filtered space, noise and initial point require indistinguishable solutions, stronger than equality in law. | — |

### Finance — 100 reviewed

| Question ID | Subsection | Difficulty | Key | Links | Disposition | Independent verification basis | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [fin-markets-primary](src/features/quick-practice/data/bank/finance/markets.ts#L6) | Financial markets and instruments | Easy | 1 | 0 | Reviewed | New issuance raises issuer capital in the primary equity market. | — |
| [fin-markets-spread](src/features/quick-practice/data/bank/finance/markets.ts#L12) | Financial markets and instruments | Easy | 2 | 0 | Reviewed | Buy ask 50.10, sell bid 49.90; P&L −0.20. | — |
| [fin-markets-claims](src/features/quick-practice/data/bank/finance/markets.ts#L18) | Financial markets and instruments | Easy | 3 | 0 | Reviewed | Debt specifies contractual obligations, while ordinary equity is residual ownership; default remains possible. | — |
| [fin-markets-leverage-return](src/features/quick-practice/data/bank/finance/markets.ts#L24) | Financial markets and instruments | Medium | 0 | 0 | Reviewed | Assets 180 minus debt 100 leave equity 80, giving −20% equity return. | — |
| [fin-markets-short-dividend](src/features/quick-practice/data/bank/finance/markets.ts#L30) | Financial markets and instruments | Medium | 1 | 0 | Reviewed | 10×(40−35−1)=40 after dividend compensation. | — |
| [fin-markets-liquidity](src/features/quick-practice/data/bank/finance/markets.ts#L36) | Financial markets and instruments | Medium | 2 | 0 | Reviewed | Shallow depth may force a large order to higher asks despite identical best spread. | — |
| [fin-markets-otc](src/features/quick-practice/data/bank/finance/markets.ts#L42) | Financial markets and instruments | Medium | 3 | 0 | Reviewed | OTC trading and central clearing/collateral are distinct arrangements. | — |
| [fin-markets-crossed-arbitrage](src/features/quick-practice/data/bank/finance/markets.ts#L48) | Financial markets and instruments | Hard | 0 | 0 | Reviewed | 100×(100.40−100.10−0.10)=20 with the explicitly guaranteed simultaneous fills. | D02 |
| [fin-markets-maintenance-margin](src/features/quick-practice/data/bank/finance/markets.ts#L54) | Financial markets and instruments | Hard | 2 | 0 | Reviewed | (100P−6000)/(100P)=0.25 gives P=80; breach is below the boundary. | D02 |
| [fin-markets-fx-triangle](src/features/quick-practice/data/bank/finance/markets.ts#L60) | Financial markets and instruments | Hard | 3 | 0 | Reviewed | 1000×1.20×0.90×0.95=1026, hence cycle profit 26. | D02 |
| [fin-micro-limit](src/features/quick-practice/data/bank/finance/microstructure.ts#L6) | Market microstructure | Easy | 1 | 0 | Reviewed | Buy limit imposes maximum 25 with no fill guarantee. | — |
| [fin-micro-priority](src/features/quick-practice/data/bank/finance/microstructure.ts#L12) | Market microstructure | Easy | 2 | 0 | Reviewed | Highest bid first, then earliest time gives A under the specified matching rule. | — |
| [fin-micro-stop-gap](src/features/quick-practice/data/bank/finance/microstructure.ts#L18) | Market microstructure | Easy | 3 | 0 | Reviewed | Stop-market trigger gives no execution floor after the gap. | — |
| [fin-micro-walk-book](src/features/quick-practice/data/bank/finance/microstructure.ts#L24) | Market microstructure | Medium | 0 | 0 | Reviewed | 100 at 10 plus 50 at 10.03 costs 1501.50; divided by 150 gives 10.01. | — |
| [fin-micro-vwap](src/features/quick-practice/data/bank/finance/microstructure.ts#L30) | Market microstructure | Medium | 1 | 0 | Reviewed | (100×20+300×22)/400=21.50. | — |
| [fin-micro-twap](src/features/quick-practice/data/bank/finance/microstructure.ts#L36) | Market microstructure | Medium | 2 | 0 | Reviewed | Equal scheduled quantity is 12000/6=2000; benchmark-price execution is not guaranteed. | D02 |
| [fin-micro-imbalance](src/features/quick-practice/data/bank/finance/microstructure.ts#L42) | Market microstructure | Medium | 3 | 0 | Reviewed | (900−300)/(900+300)=0.5 under the explicitly defined convention. | D02 |
| [fin-micro-adverse-selection](src/features/quick-practice/data/bank/finance/microstructure.ts#L48) | Market microstructure | Hard | 0 | 0 | Conditional | Fill-conditioned expected mark is 100.4; plus sale cost gives ask 100.5. Timing concern N07. | N07, D02 |
| [fin-micro-inventory](src/features/quick-practice/data/bank/finance/microstructure.ts#L54) | Market microstructure | Hard | 1 | 0 | Reviewed | Lower fixed-width quote centre lowers ask to encourage sales and bid to deter purchases. | — |
| [fin-micro-execution-tradeoff](src/features/quick-practice/data/bank/finance/microstructure.ts#L60) | Market microstructure | Hard | 2 | 0 | Reviewed | Expected limit-policy cost 100.04 minus immediate 100.02 gives +0.02. | D02 |
| [fin-bonds-coupon](src/features/quick-practice/data/bank/finance/bonds.ts#L6) | Bonds and fixed income | Easy | 1 | 0 | Reviewed | Annual coupon 60 divided into two equal payments gives 30. | — |
| [fin-bonds-zero-price](src/features/quick-practice/data/bank/finance/bonds.ts#L12) | Bonds and fixed income | Easy | 2 | 0 | Reviewed | 1000/1.05=952.380952, rounding to 952.38 under annual effective yield. | — |
| [fin-bonds-yield-direction](src/features/quick-practice/data/bank/finance/bonds.ts#L18) | Bonds and fixed income | Easy | 3 | 0 | Reviewed | Positive unchanged future cash flows have negative derivative with respect to admissible yield. | — |
| [fin-bonds-dirty](src/features/quick-practice/data/bank/finance/bonds.ts#L24) | Bonds and fixed income | Medium | 0 | 0 | Reviewed | Accrual 4×90/360=1; dirty price 98+1=99. | — |
| [fin-bonds-spot-price](src/features/quick-practice/data/bank/finance/bonds.ts#L30) | Bonds and fixed income | Medium | 1 | 0 | Reviewed | Discounted cash flows 4.8+94.5=99.3. | — |
| [fin-bonds-forward-rate](src/features/quick-practice/data/bank/finance/bonds.ts#L36) | Bonds and fixed income | Medium | 2 | 0 | Reviewed | 1.05²/1.04−1=0.06009615 gives 6.01% annual forward. | — |
| [fin-bonds-dv01](src/features/quick-practice/data/bank/finance/bonds.ts#L42) | Bonds and fixed income | Medium | 3 | 0 | Reviewed | First-order loss 4×2000000×0.0001=800. | — |
| [fin-bonds-bootstrap](src/features/quick-practice/data/bank/finance/bonds.ts#L48) | Bonds and fixed income | Hard | 0 | 0 | Reviewed | Unknown D2=(100−4.8)/105=0.9066667, rounded 0.9067. | D02 |
| [fin-bonds-convexity](src/features/quick-practice/data/bank/finance/bonds.ts#L54) | Bonds and fixed income | Hard | 1 | 0 | Reviewed | −0.1+0.006=−0.094 relative change; approximate price 90.60. | D02 |
| [fin-bonds-duration-hedge](src/features/quick-practice/data/bank/finance/bonds.ts#L60) | Bonds and fixed income | Hard | 2 | 0 | Reviewed | Short n units gives −1200+80n=0, hence n=15. | D02 |
| [fin-credit-simple-interest](src/features/quick-practice/data/bank/finance/credit.ts#L6) | Loans and credit | Easy | 1 | 0 | Reviewed | Simple interest 1000×0.06×2=120; repayment 1120. | — |
| [fin-credit-compound-interest](src/features/quick-practice/data/bank/finance/credit.ts#L12) | Loans and credit | Easy | 2 | 0 | Reviewed | 1000×1.05²=1102.50. | — |
| [fin-credit-secured](src/features/quick-practice/data/bank/finance/credit.ts#L18) | Loans and credit | Easy | 3 | 0 | Reviewed | Collateral may reduce LGD without eliminating default or recovery uncertainty. | — |
| [fin-credit-effective-rate](src/features/quick-practice/data/bank/finance/credit.ts#L24) | Loans and credit | Medium | 0 | 0 | Reviewed | 1.01¹²−1=0.126825 gives 12.68% effective annual rate. | — |
| [fin-credit-amortisation](src/features/quick-practice/data/bank/finance/credit.ts#L30) | Loans and credit | Medium | 1 | 0 | Reviewed | Interest 50 and payment 300 leave principal 9750. | — |
| [fin-credit-annuity](src/features/quick-practice/data/bank/finance/credit.ts#L36) | Loans and credit | Medium | 2 | 0 | Reviewed | Two-payment balance recursion gives payment 1210/2.1=576.190476, rounded 576.19. | — |
| [fin-credit-ecl](src/features/quick-practice/data/bank/finance/credit.ts#L42) | Loans and credit | Medium | 3 | 0 | Reviewed | Fixed conditional loss 0.6×500000=300000 times default mass 0.02 gives 6000. | — |
| [fin-credit-risk-neutral-bond](src/features/quick-practice/data/bank/finance/credit.ts#L48) | Loans and credit | Hard | 0 | 0 | Reviewed | State-weighted maturity cash 97 discounted by 1.04 gives 93.269231, rounded 93.27. | D02 |
| [fin-credit-dependent-ecl](src/features/quick-practice/data/bank/finance/credit.ts#L54) | Loans and credit | Hard | 1 | 0 | Reviewed | Conditional losses 1000 and 18000 average to 9500; product of averages is incorrect. | D02 |
| [fin-credit-hazard-spread](src/features/quick-practice/data/bank/finance/credit.ts#L60) | Loans and credit | Hard | 2 | 0 | Reviewed | Provided idealised formula gives 0.6×0.03=0.018=180 bp; formula-substitution difficulty concern D02. | D02 |
| [fin-forwards-payoff](src/features/quick-practice/data/bank/finance/forwards.ts#L6) | Forwards and futures | Easy | 1 | 0 | Reviewed | Long delivery payoff ST−K=112−100=12. | — |
| [fin-futures-marking](src/features/quick-practice/data/bank/finance/forwards.ts#L12) | Forwards and futures | Easy | 2 | 0 | Reviewed | Two contracts ×10 multiplier ×7-point rise gives receipt 140. | — |
| [fin-futures-initial-margin](src/features/quick-practice/data/bank/finance/forwards.ts#L18) | Forwards and futures | Easy | 3 | 0 | Reviewed | Initial margin safeguards close-out exposure; variation margin handles daily value changes. | — |
| [fin-forwards-carry](src/features/quick-practice/data/bank/finance/forwards.ts#L24) | Forwards and futures | Medium | 0 | 0 | Reviewed | Funded purchase costs 100×1.05=105 at delivery; annual-effective convention explicit. | — |
| [fin-forwards-dividend-yield](src/features/quick-practice/data/bank/finance/forwards.ts#L30) | Forwards and futures | Medium | 1 | 0 | Reviewed | 200 exp((0.04−0.01)×2)=212.367309, rounded 212.37. | — |
| [fin-forwards-basis-hedge](src/features/quick-practice/data/bank/finance/forwards.ts#L36) | Forwards and futures | Medium | 2 | 0 | Reviewed | Spot sale 75 plus futures gain 3 gives effective sale 78. | — |
| [fin-forwards-convenience](src/features/quick-practice/data/bank/finance/forwards.ts#L42) | Forwards and futures | Medium | 3 | 0 | Reviewed | Positive horizon and price give ∂F/∂y=−TF; rising convenience yield lowers carry price. | — |
| [fin-forwards-cash-carry-arbitrage](src/features/quick-practice/data/bank/finance/forwards.ts#L48) | Forwards and futures | Hard | 0 | 0 | Reviewed | Deliver for 110 and repay 105 leaves riskless profit 5 under given trading assumptions. | D02 |
| [fin-forwards-fx-covered](src/features/quick-practice/data/bank/finance/forwards.ts#L54) | Forwards and futures | Hard | 1 | 0 | Reviewed | Buy/invest 1/1.02 EUR financed by GBP; maturity repayment 0.85×1.05/1.02=0.8750 GBP. | — |
| [fin-forwards-existing-value](src/features/quick-practice/data/bank/finance/forwards.ts#L60) | Forwards and futures | Hard | 2 | 0 | Reviewed | Replicating long has share minus discounted strike: 108−100/1.04=11.846154, rounded 11.85. | D02 |
| [fin-options-call-profit](src/features/quick-practice/data/bank/finance/options.ts#L6) | Options | Easy | 1 | 0 | Reviewed | Payoff 8 minus premium 3 gives profit 5, ignoring financing as specified. | — |
| [fin-options-put-payoff](src/features/quick-practice/data/bank/finance/options.ts#L12) | Options | Easy | 2 | 0 | Reviewed | max(60−52,0)=8 before premium. | — |
| [fin-options-exercise-style](src/features/quick-practice/data/bank/finance/options.ts#L18) | Options | Easy | 3 | 0 | Reviewed | European expiry-only versus American earlier exercise rights is the standard distinction. | — |
| [fin-options-parity](src/features/quick-practice/data/bank/finance/options.ts#L24) | Options | Medium | 0 | 0 | Reviewed | C−P=S−KD=5, hence P=5 with the stated European/no-dividend assumptions. | — |
| [fin-options-intrinsic-time](src/features/quick-practice/data/bank/finance/options.ts#L30) | Options | Medium | 1 | 0 | Reviewed | Immediate-exercise payoff 5; residual price component 9−5=4; exercise rights not inferred. | — |
| [fin-options-binomial](src/features/quick-practice/data/bank/finance/options.ts#L36) | Options | Medium | 2 | 0 | Reviewed | Replication delta=1/2 and cash=−40/1.05 give price 11.904762, rounded 11.90. | — |
| [fin-options-delta-hedge](src/features/quick-practice/data/bank/finance/options.ts#L42) | Options | Medium | 3 | 0 | Reviewed | Short call delta −10×100×0.6=−600; buy 600 shares. | — |
| [fin-options-butterfly-arbitrage](src/features/quick-practice/data/bank/finance/options.ts#L48) | Options | Hard | 0 | 0 | Reviewed | Cost −2 gives receipt 2; piecewise payoff 0, S−90, 110−S, 0 is nonnegative. | D02 |
| [fin-options-early-call](src/features/quick-practice/data/bank/finance/options.ts#L54) | Options | Hard | 1 | 0 | Conditional | For K>0,r>0,τ>0 European lower bound S−Kexp(−rτ)>S−K; American value no smaller. Missing-strike concern N06. | N06 |
| [fin-options-volatility-smile](src/features/quick-practice/data/bank/finance/options.ts#L60) | Options | Hard | 2 | 0 | Reviewed | Distinct implied volatilities cannot be fitted by one constant; does not establish arbitrage. | D02, E01 |
| [fin-swaps-irs](src/features/quick-practice/data/bank/finance/swaps.ts#L6) | Swaps and other derivatives | Easy | 1 | 0 | Reviewed | Fixed/floating interest streams on notional identify single-currency IRS; notional not exchanged. | — |
| [fin-swaps-payment](src/features/quick-practice/data/bank/finance/swaps.ts#L12) | Swaps and other derivatives | Easy | 2 | 0 | Reviewed | Receive 1000000×0.5×(0.05−0.04)=5000. | — |
| [fin-swaps-cds-direction](src/features/quick-practice/data/bank/finance/swaps.ts#L18) | Swaps and other derivatives | Easy | 3 | 0 | Reviewed | Protection buyer pays premiums and receives settlement after a contractually covered credit event. | — |
| [fin-swaps-par-rate](src/features/quick-practice/data/bank/finance/swaps.ts#L24) | Swaps and other derivatives | Medium | 0 | 0 | Reviewed | Single-curve par floating PV 0.10 versus fixed annuity 1.86 gives 5.376344%, rounded 5.38%. | — |
| [fin-swaps-caplet](src/features/quick-practice/data/bank/finance/swaps.ts#L30) | Swaps and other derivatives | Medium | 1 | 0 | Reviewed | End-period cash payoff 2000000×0.25×0.01=5000, not discounted current value. | — |
| [fin-swaps-total-return](src/features/quick-practice/data/bank/finance/swaps.ts#L36) | Swaps and other derivatives | Medium | 2 | 0 | Reviewed | Asset return 40000 minus half-year financing 20000 gives net receipt 20000. | — |
| [fin-swaps-swaption](src/features/quick-practice/data/bank/finance/swaps.ts#L42) | Swaps and other derivatives | Medium | 3 | 0 | Reviewed | Payer strike 3% versus par 5% gives positive annuity×(S−K) value. | — |
| [fin-swaps-fra-settlement](src/features/quick-practice/data/bank/finance/swaps.ts#L48) | Swaps and other derivatives | Hard | 0 | 0 | Reviewed | Start-date receipt 10000/1.03=9708.737864, rounded 9708.74 under given settlement rule. | D02 |
| [fin-swaps-cva](src/features/quick-practice/data/bank/finance/swaps.ts#L54) | Swaps and other derivatives | Hard | 1 | 0 | Reviewed | Discounted unilateral fixed exposure loss 0.95×0.02×0.6×100000=1140. | D02 |
| [fin-swaps-wrong-way](src/features/quick-practice/data/bank/finance/swaps.ts#L60) | Swaps and other derivatives | Hard | 2 | 0 | Reviewed | Exposure increasing as default propensity rises is wrong-way risk; recognition-level difficulty concern. | D02, E01 |
| [fin-portfolio-total-return](src/features/quick-practice/data/bank/finance/portfolio.ts#L6) | Portfolio theory and asset pricing | Easy | 1 | 0 | Reviewed | (104−100+2)/100=6%, with reinvestment explicitly excluded. | — |
| [fin-portfolio-log-return](src/features/quick-practice/data/bank/finance/portfolio.ts#L12) | Portfolio theory and asset pricing | Easy | 2 | 0 | Reviewed | log(1.1)=0.09531018 gives 9.53% log return. | — |
| [fin-portfolio-diversification](src/features/quick-practice/data/bank/finance/portfolio.ts#L18) | Portfolio theory and asset pricing | Easy | 3 | 0 | Reviewed | Equal-weight equal-volatility variance is σ²(1+ρ)/2, lower for lower correlation. | — |
| [fin-portfolio-variance](src/features/quick-practice/data/bank/finance/portfolio.ts#L24) | Portfolio theory and asset pricing | Medium | 0 | 0 | Reviewed | Equal independent-risk weights give variance 0.02; volatility 14.142136%, rounded 14.14%. | R05 |
| [fin-portfolio-capm](src/features/quick-practice/data/bank/finance/portfolio.ts#L30) | Portfolio theory and asset pricing | Medium | 1 | 0 | Reviewed | 3%+1.2×(8%−3%)=9% expected model return. | — |
| [fin-portfolio-sharpe](src/features/quick-practice/data/bank/finance/portfolio.ts#L36) | Portfolio theory and asset pricing | Medium | 2 | 0 | Reviewed | Same-horizon expected excess return 8% divided by excess volatility 16%=0.5. | — |
| [fin-portfolio-information-ratio](src/features/quick-practice/data/bank/finance/portfolio.ts#L42) | Portfolio theory and asset pricing | Medium | 3 | 0 | Reviewed | Expected active return 2% over tracking error 4%=0.5. | — |
| [fin-portfolio-minimum-variance](src/features/quick-practice/data/bank/finance/portfolio.ts#L48) | Portfolio theory and asset pricing | Hard | 0 | 0 | Reviewed | Positive quadratic v(w)=0.01w²+0.04(1−w)² minimises at w=0.8. | — |
| [fin-portfolio-factor-residual](src/features/quick-practice/data/bank/finance/portfolio.ts#L54) | Portfolio theory and asset pricing | Hard | 1 | 0 | Reviewed | Uncorrelated factor/residual variance 1.5²×0.04+0.01=0.10. | D02 |
| [fin-portfolio-rebalancing](src/features/quick-practice/data/bank/finance/portfolio.ts#L60) | Portfolio theory and asset pricing | Hard | 2 | 0 | Reviewed | After first period 60/40; equal-weight rebalance gives 100 terminal wealth, holding gives 96. | — |
| [fin-risk-funding](src/features/quick-practice/data/bank/finance/risk.ts#L6) | Financial risk management | Easy | 1 | 0 | Reviewed | Inability to meet imminent cash obligations despite valuable assets illustrates funding liquidity risk. | — |
| [fin-risk-var-meaning](src/features/quick-practice/data/bank/finance/risk.ts#L12) | Financial risk management | Easy | 2 | 0 | Reviewed | Continuous CDF at 99% quantile gives 1% exceedance probability; no maximum-loss guarantee. | — |
| [fin-risk-stress](src/features/quick-practice/data/bank/finance/risk.ts#L18) | Financial risk management | Easy | 3 | 0 | Reviewed | Scenario stress can assess severity without an assigned exact probability. | — |
| [fin-risk-normal-var](src/features/quick-practice/data/bank/finance/risk.ts#L24) | Financial risk management | Medium | 0 | 0 | Reviewed | Given z=2.326, 10000+2.326×50000=126300 loss quantile. | — |
| [fin-risk-discrete-es](src/features/quick-practice/data/bank/finance/risk.ts#L30) | Financial risk management | Medium | 1 | 0 | Reviewed | Worst five equally weighted outcomes total 140; ES=28 with explicit atom-weight convention. | — |
| [fin-risk-backtest-exceptions](src/features/quick-practice/data/bank/finance/risk.ts#L36) | Financial risk management | Medium | 2 | 0 | Reviewed | Expected count 250×0.01=2.5 by linearity; independence unnecessary for its mean. | — |
| [fin-risk-garch](src/features/quick-practice/data/bank/finance/risk.ts#L42) | Financial risk management | Medium | 3 | 0 | Reviewed | 0.00001+0.1×0.0004+0.85×0.0004=0.00039 conditional variance. | — |
| [fin-risk-var-nonsubadditive](src/features/quick-practice/data/bank/finance/risk.ts#L48) | Financial risk management | Hard | 0 | 0 | Reviewed | Mass at sum zero 0.9216; mass through 100 is 0.9984; 95% VaR(sum)=100 while each VaR=0. | — |
| [fin-risk-frtb](src/features/quick-practice/data/bank/finance/risk.ts#L54) | Financial risk management | Hard | 1 | 0 | Reviewed | BIS MAR33.3–33.5 confirms 97.5% one-tail ES, liquidity horizons and stressed calibration; framework-level statement verified. | E01 |
| [fin-risk-time-scaling](src/features/quick-practice/data/bank/finance/risk.ts#L60) | Financial risk management | Hard | 2 | 0 | Reviewed | Sum of ten i.i.d. centred Gaussians has standard deviation √10σ; corresponding quantile scales exactly. | — |
| [fin-pricing-replication](src/features/quick-practice/data/bank/finance/pricing.ts#L6) | Quantitative pricing and numerical finance | Easy | 1 | 0 | Reviewed | Replicable equal statewise cash flows must have equal prices in the stipulated frictionless no-arbitrage model. | — |
| [fin-pricing-monte-carlo](src/features/quick-practice/data/bank/finance/pricing.ts#L12) | Quantitative pricing and numerical finance | Easy | 2 | 0 | Reviewed | Risk-neutral sample mean 15 times deterministic discount 0.95 gives estimate 14.25. | — |
| [fin-pricing-calibration](src/features/quick-practice/data/bank/finance/pricing.ts#L18) | Quantitative pricing and numerical finance | Easy | 3 | 0 | Reviewed | Parameters minimise a specified model/market fit objective; fit does not prove model truth. | E01 |
| [fin-pricing-gbm-log](src/features/quick-practice/data/bank/finance/pricing.ts#L24) | Quantitative pricing and numerical finance | Medium | 0 | 0 | Reviewed | Itô log correction 0.05−0.2²/2=0.03 per year; no-dividend model explicit. | — |
| [fin-pricing-antithetic](src/features/quick-practice/data/bank/finance/pricing.ts#L30) | Quantitative pricing and numerical finance | Medium | 1 | 0 | Reviewed | Pair-average variance (4+4+2×(−2))/4=1; negative payoff covariance is explicit. | R05 |
| [fin-pricing-numerical-delta](src/features/quick-practice/data/bank/finance/pricing.ts#L36) | Quantitative pricing and numerical finance | Medium | 2 | 0 | Reviewed | Centred difference (8.4−7.2)/(101−99)=0.6 per spot pound. | — |
| [fin-pricing-hull-white](src/features/quick-practice/data/bank/finance/pricing.ts#L42) | Quantitative pricing and numerical finance | Medium | 3 | 0 | Reviewed | Time-dependent deterministic drift can fit initial curve; Gaussian short rates need not remain positive. | — |
| [fin-pricing-numeraire](src/features/quick-practice/data/bank/finance/pricing.ts#L48) | Quantitative pricing and numerical finance | Hard | 0 | 0 | Reviewed | Stated true martingale V/N yields conditional payoff/numeraire expectation times Nt. | — |
| [fin-pricing-explicit-stability](src/features/quick-practice/data/bank/finance/pricing.ts#L54) | Quantitative pricing and numerical finance | Hard | 1 | 0 | Reviewed | Heat-scheme amplification bound gives Δτ≤0.1²/(2×0.02)=0.25; supplied inequality makes item elementary. | D02 |
| [fin-pricing-model-structure](src/features/quick-practice/data/bank/finance/pricing.ts#L60) | Quantitative pricing and numerical finance | Hard | 2 | 0 | Reviewed | Vasicek Gaussian, CIR square-root nonnegative rates, Heston square-root stochastic variance; Feller ≥ boundary condition correct. | — |

### Programming — 25 reviewed

| Question ID | Subsection | Difficulty | Key | Links | Disposition | Independent verification basis | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [prog-reference-alias](src/features/quick-practice/data/bank/programming.ts#L6) | C++ fundamentals | Easy | 1 | 1 | Reviewed | Reference aliases x; r+=2 leaves x=5, confirmed in C++20 execution. | — |
| [prog-integer-division](src/features/quick-practice/data/bank/programming.ts#L25) | C++ fundamentals | Easy | 2 | 1 | Reviewed | Integer 5/2 gives 2, then converts to double; default stream prints 2. | — |
| [prog-const-reference](src/features/quick-practice/data/bank/programming.ts#L44) | C++ fundamentals | Medium | 3 | 1 | Reviewed | Mutable int& binding would discard const, so ill-formed; required compilation rejection confirmed. | — |
| [prog-sort-unique](src/features/quick-practice/data/bank/programming.ts#L63) | C++ STL and algorithms | Medium | 0 | 1 | Conditional | Sort gives 1,1,2,3,3; logical distinct prefix size 3; erase resizes to 3. Execution-context concern N05. | N05 |
| [prog-hash-lookup](src/features/quick-practice/data/bank/programming.ts#L82) | C++ STL and algorithms | Easy | 1 | 1 | Reviewed | Suitable hashing gives average constant lookup; all-collision case linear worst case. | — |
| [prog-vector-invalidation](src/features/quick-practice/data/bank/programming.ts#L101) | C++ STL and algorithms | Hard | 2 | 1 | Reviewed | C++20 reallocation invalidates old element pointer; obtain new data pointer; do not dereference/subtract/delete old pointer. | D03 |
| [prog-virtual-dispatch](src/features/quick-practice/data/bank/programming.ts#L120) | C++ object-oriented programming and memory | Easy | 3 | 1 | Reviewed | Live Base reference to Derived dispatches virtual f to return 2, with no slicing. | — |
| [prog-unique-move](src/features/quick-practice/data/bank/programming.ts#L139) | C++ object-oriented programming and memory | Medium | 0 | 1 | Reviewed | unique_ptr copy constructor is deleted; compilation rejection confirmed; moving would transfer and empty source. | — |
| [prog-dangling-reference](src/features/quick-practice/data/bank/programming.ts#L158) | C++ object-oriented programming and memory | Hard | 1 | 2 | Reviewed | Local int lifetime ends on return; const does not rescue lifetime; subsequent read is UB under C++20. | D03, R06 |
| [prog-lambda-copy](src/features/quick-practice/data/bank/programming.ts#L178) | Modern C++ | Medium | 2 | 1 | Conditional | Mutable closure increments captured copy to 2 while outer x remains 1; prints 2 1. Execution-context concern N05. | N05 |
| [prog-span-lifetime](src/features/quick-practice/data/bank/programming.ts#L197) | Modern C++ | Hard | 3 | 1 | Reviewed | span is non-owning; local vector deallocates storage; returned view dangles. C++20 syntax accepted, UB read not executed. | D03, R06 |
| [prog-generator-exhaustion](src/features/quick-practice/data/bank/programming.ts#L216) | Python fundamentals | Easy | 0 | 1 | Reviewed | Generator yields 0,1,4; sum consumes it; prints 5 []. | — |
| [prog-mutable-default](src/features/quick-practice/data/bank/programming.ts#L235) | Python fundamentals | Medium | 1 | 1 | Reviewed | Default list created once; sequential calls append into same object and print lengths 1 2. | — |
| [prog-closure-binding](src/features/quick-practice/data/bank/programming.ts#L254) | Python fundamentals | Hard | 2 | 1 | Reviewed | All closures read final comprehension cell i=2; default-argument snapshot would distinguish iterations. | D03 |
| [prog-tuple-mutable-member](src/features/quick-practice/data/bank/programming.ts#L273) | Python data structures | Easy | 3 | 1 | Reviewed | Tuple element references unchanged but nested list mutates; output ([1,3],2). | — |
| [prog-shallow-copy](src/features/quick-practice/data/bank/programming.ts#L292) | Python data structures | Medium | 0 | 1 | Reviewed | Outer list copy shares inner [1], so append via b is visible as [1,9] in a. | — |
| [prog-numpy-broadcast](src/features/quick-practice/data/bank/programming.ts#L311) | NumPy and scientific Python | Easy | 1 | 1 | Reviewed | (2,1)+(3,) yields (2,3): [[11,21,31],[12,22,32]]. | — |
| [prog-numpy-view](src/features/quick-practice/data/bank/programming.ts#L330) | NumPy and scientific Python | Medium | 2 | 1 | Reviewed | Basic slice shares storage; b[0] mutates a[1]; output [0,99,2,3]. | — |
| [prog-pairwise-memory](src/features/quick-practice/data/bank/programming.ts#L349) | NumPy and scientific Python | Hard | 3 | 2 | Reviewed | Broadcast (n,1,d)−(1,n,d) allocates (n,n,d); quadratic-in-n output storage. | D03 |
| [prog-binary-search](src/features/quick-practice/data/bank/programming.ts#L369) | Algorithms and complexity | Easy | 0 | 1 | Ambiguous | Tight worst-case comparisons Θ(log n); options O(n) and O(n log n) are also upper bounds. Verified major ambiguity B01. | B01 |
| [prog-dynamic-array-amortised](src/features/quick-practice/data/bank/programming.ts#L388) | Algorithms and complexity | Medium | 1 | 1 | Reviewed | Writes plus geometric resize moves total Θ(n); alternative quadratic explanation falsely assumes moving each append. | — |
| [prog-off-by-one](src/features/quick-practice/data/bank/programming.ts#L407) | Debugging and code analysis | Medium | 2 | 1 | Reviewed | Indices 0,1,2 succeed, index 3 raises IndexError before print; runtime confirmed. | — |
| [prog-signed-overflow](src/features/quick-practice/data/bank/programming.ts#L426) | Debugging and code analysis | Hard | 3 | 1 | Reviewed | INT_MAX+1 exceeds signed representable range and is UB under C++20; syntax checked, never executed. | D03 |
| [prog-stable-sum](src/features/quick-practice/data/bank/programming.ts#L445) | Numerical and quantitative programming | Medium | 0 | 1 | Reviewed | math.fsum tracks partial sums; provided cancellation example returns 1.0; no universal exactness claim. | — |
| [prog-welford-variance](src/features/quick-practice/data/bank/programming.ts#L464) | Numerical and quantitative programming | Hard | 1 | 1 | Reviewed | Mean update δ/n and centred increment δ(x−new mean) maintain M2=sum squared residuals. | D03 |

### Machine Learning — 25 reviewed

| Question ID | Subsection | Difficulty | Key | Links | Disposition | Independent verification basis | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [ml-learning-curves](src/features/quick-practice/data/bank/machine-learning.ts#L6) | Machine learning foundations | Easy | 0 | 2 | Reviewed | Rising representative validation error with falling fit error signals overfitting; no universal certainty about realised outcomes. | — |
| [ml-fold-preprocessing](src/features/quick-practice/data/bank/machine-learning.ts#L26) | Machine learning foundations | Medium | 1 | 2 | Reviewed | Learn scaler/PCA/classifier solely within training folds to avoid unsupervised leakage. | — |
| [ml-logistic-probability](src/features/quick-practice/data/bank/machine-learning.ts#L46) | Supervised learning | Easy | 2 | 1 | Reviewed | Sigmoid(log3)=1/(1+1/3)=0.75. | — |
| [ml-forest-correlation](src/features/quick-practice/data/bank/machine-learning.ts#L65) | Supervised learning | Medium | 3 | 2 | Reviewed | Covariance ρv=2; variance of average (4+4+4)/4=3. | R05 |
| [ml-kmeans-assignment](src/features/quick-practice/data/bank/machine-learning.ts#L85) | Unsupervised learning | Easy | 0 | 1 | Reviewed | Squared distances 9 versus 1 assign point 3 to centre 4. | — |
| [ml-pca-direction](src/features/quick-practice/data/bank/machine-learning.ts#L104) | Unsupervised learning | Medium | 1 | 1 | Reviewed | Rayleigh quotient 9u1²+u2² maximised at first axis; sign ambiguity correctly removed. | E01 |
| [ml-gradient-step](src/features/quick-practice/data/bank/machine-learning.ts#L123) | Optimisation and training | Easy | 2 | 1 | Reviewed | Gradient 2(1−3)=−4; update 1−0.1(−4)=1.4. | — |
| [ml-momentum-step](src/features/quick-practice/data/bank/machine-learning.ts#L142) | Optimisation and training | Medium | 3 | 1 | Reviewed | Specified v=0.9×2−1=0.8; w=5−0.1×0.8=4.92. | — |
| [ml-quadratic-stability](src/features/quick-practice/data/bank/machine-learning.ts#L161) | Optimisation and training | Hard | 0 | 1 | Reviewed | Iterate multiplier 1−ηa must have absolute value below 1; η endpoints do not converge for every start. | D04 |
| [ml-backprop-chain](src/features/quick-practice/data/bank/machine-learning.ts#L180) | Neural networks and deep learning | Medium | 1 | 1 | Reviewed | Local derivatives multiply to (4−1)×4×2=24; numerical differentiation confirms. | — |
| [ml-attention-mask](src/features/quick-practice/data/bank/machine-learning.ts#L199) | Neural networks and deep learning | Hard | 2 | 1 | Reviewed | Future attention logits must be masked before softmax to exclude future values from weighted sums. | D04, E01 |
| [ml-bellman-value](src/features/quick-practice/data/bank/machine-learning.ts#L218) | Reinforcement learning | Easy | 3 | 1 | Reviewed | Deterministic policy backup 2+0.9×10=11. | — |
| [ml-q-learning-update](src/features/quick-practice/data/bank/machine-learning.ts#L237) | Reinforcement learning | Medium | 0 | 1 | Reviewed | Target 7.4, TD error 3.4; half-step changes 4 to 5.7. | — |
| [ml-sarsa-off-policy](src/features/quick-practice/data/bank/machine-learning.ts#L256) | Reinforcement learning | Hard | 1 | 1 | Reviewed | SARSA uses realised next action value 1; Q-learning uses maximum 5 for nonterminal transition. | D04 |
| [ml-map-regularisation](src/features/quick-practice/data/bank/machine-learning.ts#L275) | Probabilistic and Bayesian machine learning | Medium | 2 | 1 | Reviewed | Gaussian negative log prior adds \|\|w\|\|²/(2τ²) to summed negative log-likelihood. | — |
| [ml-elbo-identity](src/features/quick-practice/data/bank/machine-learning.ts#L294) | Probabilistic and Bayesian machine learning | Hard | 3 | 1 | Reviewed | Fixed evidence implies ELBO=evidence−KL; increasing bound decreases KL. Difficulty concern D04. | D04 |
| [ml-walk-forward](src/features/quick-practice/data/bank/machine-learning.ts#L313) | Time series and sequential machine learning | Medium | 0 | 2 | Reviewed | Earlier training/later validation plus actual information availability preserve causal forecast direction. | — |
| [ml-overlapping-labels](src/features/quick-practice/data/bank/machine-learning.ts#L333) | Time series and sequential machine learning | Hard | 1 | 1 | Reviewed | T−1 label ends at T+4, so its realised price is unavailable at validation start T. | D04 |
| [ml-accuracy-imbalance](src/features/quick-practice/data/bank/machine-learning.ts#L352) | Evaluation and generalisation | Easy | 2 | 1 | Reviewed | TN=95,FN=5,TP=0: accuracy 95%, recall 0%. | — |
| [ml-test-set-role](src/features/quick-practice/data/bank/machine-learning.ts#L371) | Evaluation and generalisation | Easy | 3 | 1 | Reviewed | Untouched test measures fixed selected procedure under its sampling design; uncertainty/shift remain. | — |
| [ml-precision-recall](src/features/quick-practice/data/bank/machine-learning.ts#L390) | Evaluation and generalisation | Medium | 0 | 1 | Reviewed | Precision 18/24=0.75; recall 18/30=0.60. | — |
| [ml-eval-grad-mode](src/features/quick-practice/data/bank/machine-learning.ts#L409) | Applied machine learning and implementation | Easy | 1 | 1 | Docs/analysis | PyTorch 2.8 documentation separates module evaluation from no-grad recording; no local PyTorch execution. U01. | U01 |
| [ml-gradient-accumulation](src/features/quick-practice/data/bank/machine-learning.ts#L428) | Applied machine learning and implementation | Medium | 2 | 2 | Docs/analysis | PyTorch backward accumulates gradients; independent minibatches need zero_grad/reset; API documentation verified, not executed. U01. | U01 |
| [ml-loss-broadcast-bug](src/features/quick-practice/data/bank/machine-learning.ts#L448) | Applied machine learning and implementation | Medium | 3 | 2 | Docs/analysis | PyTorch trailing-dimension rules yield (B,B); reshape target to (B,1) gives pairwise residuals; NumPy analogue executed. U01. | N08, U01 |
| [ml-terminal-target](src/features/quick-practice/data/bank/machine-learning.ts#L468) | Applied machine learning and implementation | Hard | 0 | 2 | Docs/analysis | True episodic termination removes bootstrap value; finite q_next allows numeric mask; documentation/scalar verification only. U01. | D04, U01 |

## Preservation and follow-up boundary

This audit creates only `QUESTION_BANK_AUDIT.md` in the project. Its recommendations are reviewable proposals, not implemented content edits. Any later correction should preserve the stable question's intent and ID, document the wording change and assess whether its canonical answer can remain fixed. No progress migration or historical regrading was attempted. The 800-question roadmap remains planning context, not an authorisation to add content during this audit.
