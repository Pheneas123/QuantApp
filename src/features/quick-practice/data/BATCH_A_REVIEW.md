# Batch A content review — 7 October 2026

Accepted scope: exactly 30 questions, **6 Easy / 18 Medium / 6 Hard**, at the eleven topic allocations in CURRICULUM_MAP.md. Added 22 supporting knowledge objects. Every new question has a concise explanation and explicit knowledge links; no new families or cosmetic numerical variants. All 120 prior questions and 50 prior references were compared record-for-record and remain unchanged. This is author review, not independent academic certification.

## Source and assumption checks

The [Oxford B8.1 notes](https://courses.maths.ox.ac.uk/mod/resource/view.php?id=61941), sections 2–6, support integration, convergence, conditioning and discrete martingale scope. [Alan Bain’s Stochastic Calculus notes](https://www.chiark.greenend.org.uk/~alanb/stoc-calc.pdf) support progressive measurability, continuous stopping, localisation and stochastic integration. Statements are original summaries with deliberately explicit versions, not copied questions.

Additional direct checks: reverse Fatou follows by applying Fatou to a common integrable upper envelope minus fn; cross-isometry follows by polarising Itô isometry; correlated bracket follows by bilinearity; a common integrable dominator permits conditional dominated convergence for local martingales. Product references require sigma-finite spaces. Continuous sampling uses a càdlàg true martingale, usual conditions and a deterministic finite bound. Brownian local integration distinguishes pathwise energy from expected energy. Conditional variance requires L2. Continuous mapping specifies its discontinuity-set condition; Slutsky requires a constant limit.

## Item review

Canonical positions are spread 8/8/7/7; displayed choices are shuffled by the unchanged session code. Distractors were checked for competing correct answers and conspicuous wording/length clues, including boundary cases. The nonblocking audit remains a screening aid, not a mathematical proof.

| Question ID | Objective / correctness and distractor review |
| --- | --- |
| `prob-ce-partition-mean` | Conditional cell means are 1 and 5; other options sum cells, ignore information or choose endpoints. |
| `prob-ce-known-factor` | Bounded known factor is sufficient. Independence alone does not guarantee conditional factorisation (independent fair bits conditioned on parity supply a counterexample). |
| `prob-ce-jensen-direction` | Conditional Jensen retains the conditional expectation on the right; neither reversal nor unconditional replacement is universal. |
| `prob-ce-nonnested-tower` | Enumerating four bit pairs gives (1/2,U); nestedness is essential. This uses the planned tower-failure alternative, not a conditional-variance question. |
| `prob-lp-difference-definition` | Moment of the difference defines Lp; matching moments/means and a single threshold do not. |
| `prob-subsequence-quantifiers` | Every subsequence must admit further a.s. extraction; some extraction is too weak and L1 is too strong. |
| `prob-equal-laws-not-probability` | Identical Bernoulli laws with independent coupling give probability of disagreement 1/2. |
| `prob-slutsky-random-denominator` | Constant nonzero denominator gives joint convergence without independence; normal variance scales by 1/4. |
| `measure-dct-tail-envelope` | Only x⁻² is a common integrable bound on this infinite-measure domain; all displayed inequalities hold. |
| `measure-signed-monotone-failure` | Signed increasing functions have infinite negative integrals; distinct from the existing positive escaping-mass family. |
| `measure-scheffe-density-limit` | Scheffé gives L1 only. Narrow vanishing-mass spikes obstruct L2/uniform conclusions; zeros or tiny values of the limit obstruct entropy claims. |
| `measure-reverse-fatou-upper-bound` | Apply Fatou to g−fn; lower bounds, bounded L1 norms and a.e. convergence permit escaping mass. |
| `measure-product-rectangle` | Rectangle products characterise the product probability measure; competing identities fail for general rectangles. |
| `measure-fubini-signed-integral` | Absolute integral bounded by 2; the two signed terms each integrate to 1. Direct nonnegative Tonelli on f is invalid. |
| `process-conditional-drift-sign` | Negative conditional drift gives supermartingale, negation gives submartingale. Reworked to avoid duplicating the existing square-martingale item. |
| `process-doob-maximum-bound` | Apply maximal inequality to M² at level 36: 3/36. The Lp constant 4 produces the weaker distractor. |
| `process-martingale-mass-loss` | Eventual tail implies a.s. zero; expectation stays 1. This separates L1 boundedness from UI and L1 convergence. |
| `process-hitting-time-event` | Hitting by n is the finite union of past hits; current position alone does not record past visits. |
| `process-stopped-information` | Stopped information requires intersection with {tau≤t} in Ft, not ambient measurability or future survival. |
| `process-bounded-walk-square` | Enumerating all eight length-three paths gives stopped-square mean 5/2; bounded optional stopping justifies the identity. |
| `process-continuous-sampling-bound` | Deterministic horizon ensures integrability and sampling. The doubling martingale embedded at integers with first-tail stopping refutes all three alternatives. |
| `process-continuity-measurability` | Adapted continuous implies predictable implies progressive; merely adapted need not be jointly measurable. |
| `calc-qv-drift-plus-noise` | Continuous finite variation contributes zero; diffusion coefficient is squared. |
| `calc-integral-bracket-random` | Integral bracket is pathwise squared energy, not its expectation, ordinary integral squared or M². |
| `calc-correlated-covariation` | Bilinearity gives 6ρt. Restrict 0<ρ<1 and t>0 so no competing formula coincides; specify correlated standard Brownian motions. |
| `calc-isometry-time-integrand` | Isometry integrates s², giving 8/3; squaring the ordinary integral gives 4 instead. |
| `calc-finite-energy-infinite-moment` | Independent initial enlargement preserves Brownian increments. E|Y| finite makes YW a true martingale, but infinite EY² prevents L2. This is not another energy-condition recall item. |
| `calc-elementary-left-information` | Only the left-endpoint coefficient is measurable when the interval begins; other coefficients contain future Brownian information. |
| `calc-localising-sequence-definition` | Localising stopping times increase to infinity and stopped processes must be true martingales; constant means are insufficient. |
| `calc-bounded-local-criterion` | One common bound gives dominated convergence and UI over all times. Nonnegativity, pointwise integrability and L1 boundedness are weaker. |

## Reference scope and remaining gaps

Conditional variance is available as a supporting reference but has no direct question yet; the Batch A allocation chose its alternative non-nested-tower objective. Cross-isometry has a prerequisite link from the variance calculation, not a direct covariance calculation. The original 42 unlinked questions were not silently remapped; some now have suitable references available for a later mapping review. No Batch B content was added.

## Verification

Bank/reference validation, all 39 individual unit tests and production build pass. The new regression tests enforce the exact allocation and independently enumerate finite conditional and bounded-stopping examples. Production-browser and PWA results are recorded in STATUS.md. UI, schemas, stored history key and format are unchanged. No deployment or new real-iPhone test is part of this batch.
