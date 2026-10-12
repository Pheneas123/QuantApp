# Academic audit remediation — 11 October 2026

B01 and N08 corrected; N01–N07 conventions now appear in the standalone prompts. IDs, canonical indices and correct-answer strings are unchanged. All seven E01 items now use plausible misconception distractors; no underlying task was replaced. Eleven E02 targets have direct supporting links (continuous mapping reused for stat-019). New references are authored summaries, not semantic certification.

## Confirmed corrections

| Finding | Implemented correction |
| --- | --- |
| B01: prog-binary-search | Asks for the tightest asymptotic upper bound, making the intended logarithmic answer unique |
| N08: ml-loss-broadcast-bug | Real floating tensors, compatible dtype and the same device are explicit |
| N01: prob-025 | Finite independent centred square-integrable rows, strictly positive finite total variance, and no cross-row independence requirement |
| N02: process-007 | Designated real measurable state space and discrete time; explanation separates index terminology from continuous marginal distributions |
| N03: calc-008/009/018/019 | Brownian motion is relative to the stated filtration with usual conditions |
| N04: calc-024 | True-martingale convention with well-defined integrable compensators and canonical filtration |
| N05: prog-sort-unique/prog-lambda-copy | Necessary headers and execution inside main are explicit |
| N06: fin-options-early-call | Strictly positive strike is explicit |
| N07: fin-micro-adverse-selection | Undiscounted profit ignores funding/carry under the given horizon |

E01 revised calc-016, fin-options-volatility-smile, fin-swaps-wrong-way, fin-risk-frtb, fin-pricing-calibration, ml-pca-direction and ml-attention-mask. False choices reflect specific theorem, financial-dependence, objective-function or information-flow mistakes. The retained canonical string for wrong-way risk is shorter than the distractor descriptions; the nonblocking length signal is disclosed in the verification report.

E02 added thm-lindeberg-feller, result-student-pivot, thm-gauss-markov, thm-finite-chain-ergodicity, result-conditional-poisson, def-process-versions, result-pure-birth-explosion, thm-egorov, result-rn-chain and thm-global-strong-sde. stat-019 links the existing thm-continuous-mapping, removing the inappropriate first-order delta-method link. Stationarity versus aperiodic convergence, finite-measure Egorov assumptions, zero-product RN conventions and the nonexplosion proof are explicit. Reference totals are now 132, with 193 linked / 137 unlinked MCQs.

## Difficulty decisions

All 47 candidate prompts, prerequisites and actual reasoning were inspected. These are editorial judgements without learner calibration. Three labels retained; 44 changed, including two departures from the suggested label.

| Item | Decision | Rationale |
| --- | --- | --- |
| `prob-022` | hard → medium | Standard L2 conditional-expectation projection identity; no construction or counterexample is required. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prob-023` | hard → medium | One pointwise-limit argument and height-times-width integral establish the result. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prob-ce-nonnested-tower` | hard → medium | Four equally likely bit outcomes suffice; the non-nesting distinction is useful but finite. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `stat-006` | hard → medium | Recognises the standard completeness premise of Basu; no ancillary construction or completeness proof. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `stat-008` | medium → easy | Direct definition of ordinary consistency, matching the guide's core-definition tier. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `stat-019` | hard → medium | Transfer from the exact normal sample-mean law to a squared statistic is a short two-step distribution argument. |
| `measure-020` | hard → medium | RN chain rule follows by one substitution; the zero-product convention is already supplied. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `measure-signed-monotone-failure` | hard → hard | Extended signed integration and the direction of monotonicity demand a substantive failure-case argument. |
| `process-008` | medium → easy | Core definition of finite-dimensional distributions without an application. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `process-023` | medium → easy | Independent Brownian increment leaves covariance equal to the earlier variance. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `process-027` | hard → medium | Useful quantifier distinction, resolved immediately by P(U=t)=0 and a pathwise spike. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `process-030` | hard → medium | The terminal value is already known at time zero; the conditional-expectation failure is immediate. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-markets-crossed-arbitrage` | hard → medium | All trading/fill assumptions are supplied; subtracting the two-sided fees supplies the entire calculation. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-markets-maintenance-margin` | hard → hard | Constructing the equity-to-market-value boundary is model formulation rather than supplied-formula substitution. |
| `fin-markets-fx-triangle` | hard → medium | Three executable conversion factors are given; unit-aware multiplication is sufficient. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-micro-twap` | medium → easy | Equal allocation is 12000/6; no optimisation or execution uncertainty is assessed. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-micro-imbalance` | medium → easy | The formula is supplied; direct substitution produces 0.5. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-micro-adverse-selection` | hard → medium | The fill-conditioned distribution is given; calculate its mean and add the specified cost. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-micro-execution-tradeoff` | hard → easy | Two-outcome expected-cost arithmetic, with all probabilities and prices given. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-bonds-bootstrap` | hard → medium | Isolate a single unknown discount factor in a two-cash-flow linear equation. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-bonds-convexity` | hard → easy | Duration/convexity formula and every input are supplied; the task is substitution. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-bonds-duration-hedge` | hard → medium | First-order hedge ratio is no more involved than the Medium delta-hedge item. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-credit-risk-neutral-bond` | hard → medium | The risk-neutral probabilities, recovery timing and rate are supplied; discount one expected payment. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-credit-dependent-ecl` | hard → medium | Average two conditional losses; useful dependence lesson without a joint-law derivation. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-credit-hazard-spread` | hard → easy | The par-spread formula is given; only multiplication and conversion to basis points are asked. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-forwards-cash-carry-arbitrage` | hard → medium | The exact strategy is supplied; its financed-delivery P&L is a simple comparison. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-forwards-existing-value` | hard → hard | Requires constructing the value of an existing contract and distinguishing delivery price from forward value. |
| `fin-options-butterfly-arbitrage` | hard → medium | The strategy and nonnegative payoff are supplied; the requested quantity is just the initial signed cost. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-options-volatility-smile` | hard → medium | Different fitted volatilities cannot equal one common value; no surface-arbitrage test is required. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-swaps-fra-settlement` | hard → easy | The settlement formula is explicitly supplied; only arithmetic is needed. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-swaps-cva` | hard → medium | Fixed exposure, default probability, LGD and discount factor require one expected-loss product. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-swaps-wrong-way` | hard → medium | Revised comparable dependence distractors require distinguishing exposure/default direction. |
| `fin-portfolio-factor-residual` | hard → medium | Variance addition after squaring a factor loading; compare the covariance exercise prob-013 (Easy). Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `fin-pricing-explicit-stability` | hard → easy | The stability inequality is supplied; rearrange it for one step-size input. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prog-vector-invalidation` | hard → medium | Basic vector reallocation rule with no allocator, exception or partial-invalidation subtlety. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prog-dangling-reference` | hard → medium | An ordinary automatic local object ends on return; this is core C++ lifetime reasoning. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prog-span-lifetime` | hard → medium | Basic non-owning-view lifetime failure; the same storage-lifetime reasoning appears in dangling-reference. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prog-closure-binding` | hard → medium | A standard Python shared-cell closure pattern; no nested rebinding or generator interaction. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prog-pairwise-memory` | hard → medium | Two shape expansions give (n,n,d), followed by element counting. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prog-signed-overflow` | hard → medium | Direct classification of built-in signed overflow; no optimisation-dependent reasoning. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `prog-welford-variance` | hard → medium | Recognises a standard recurrence; alternatives do not maintain even the running mean/M2 invariant. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `ml-quadratic-stability` | hard → medium | Scalar geometric-sequence condition; no multivariate spectrum, noisy gradient or momentum stability. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `ml-attention-mask` | hard → medium | Standard causal-attention convention, without a tensor-shape or cross-layer information-flow derivation. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `ml-sarsa-off-policy` | hard → medium | Direct one-step on-policy versus greedy target comparison. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `ml-elbo-identity` | hard → medium | The identity is supplied; rearranging a fixed-evidence equation does not test a variational derivation. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `ml-overlapping-labels` | hard → medium | One five-day label extends beyond a stated boundary; no complex purging design is needed. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |
| `ml-terminal-target` | hard → medium | The prompt already distinguishes true terminal states; apply the standard finite bootstrap mask. Reconsidered against the actual prompt: the prerequisite topic is separate from the supplied calculation or local recognition step. |

## Overlap

R01: escaping-mass construction connects pointwise/integral limits and UI. R03: UI plus probability convergence is the same core competency across two contexts. R06: references and spans share storage-lifetime reasoning. R02 parity/conditional expectation, R04 discrete/continuous bounded stopping, and R05 covariance applications are useful transfer. All IDs remain; shared objective and family mappings identify overlap without merging attempt history.

## Verification

Results, primary sources, preserved-record fingerprints, numerical/compiler checks and browser regressions are recorded in [PLATFORM_VERIFICATION.md](PLATFORM_VERIFICATION.md). U01 remains an execution limitation because PyTorch is unavailable; no heavyweight framework was installed for four examples. Difficulty and distractor discrimination still need learner evidence. The audit's original report remains unchanged; resolved assumptions, distractors and Reference gaps do not imply independent certification of the complete bank.
