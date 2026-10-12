# Batch B content review — 8 October 2026

Accepted scope: exactly **30 questions: 12 Easy / 14 Medium / 4 Hard**, with subject allocation **Probability 4 / Statistics 8 / Measure Theory 8 / Stochastic Processes 6 / Stochastic Calculus 4**. Added **28 supporting reference objects**. Every new question has four answers, one canonical correct index, a concise explanation and relevant knowledge links. No new families. All 150 previous question records and 72 previous reference records were compared record-for-record and remain unchanged. This is author review, not independent academic certification.

## Source and assumption checks

The canonical LSE/Oxford/Cambridge scope and remaining budgets come from [CURRICULUM_MAP.md](../../../../CURRICULUM_MAP.md). Supporting statements are original summaries and questions are independently authored.

| Check | Source / precise scope |
| --- | --- |
| Events, Borel–Cantelli, outer measures and extension | [Oxford B8.1 notes](https://courses.maths.ox.ac.uk/mod/resource/view.php?id=61941), sections 1–3. Sigma-finite uniqueness reduces to finite restrictions on a disjoint countable cover. The pairwise-independent refinement is checked directly by tail-count variance below, not attributed to the notes' stronger independence formulation. |
| Completeness, ancillarity and unbiased optimality | Berkeley's [Completeness](https://stat210a.berkeley.edu/fall-2024/reader/completeness.html) and [Unbiased Estimation](https://stat210a.berkeley.edu/fall-2024/reader/unbiased-estimation.html). Finite-variance comparison is restricted to unbiased estimators; parameter-independent conditional versions are explicit. |
| Test definitions | Berkeley's [Hypothesis Testing](https://stat210a.berkeley.edu/fall-2024/reader/hypothesis-testing.html). P-value validity and confidence-set inversion are additionally checked directly through their probability inequalities; randomisation is included in power. |
| Markov foundations and CTMC jumps | [Durham APTS notes, §§3.6–3.10](https://maths.dur.ac.uk/users/nicholas.georgiou/ASP24/prelim/_book/markov-chains.html). This primary teaching source supplements the Cambridge scope because attempted Cambridge PDF fetches failed. Infinite-state normalisation and the explosive example are verified directly below; the rough CTMC guide is not treated as a complete explosion theorem. |
| Integrands and SDE solution notions | [Bain, Stochastic Calculus](https://www.chiark.greenend.org.uk/~alanb/stoc-calc.pdf) for continuous local integration; [Oxford Etheridge notes, §3.2](https://www.stats.ox.ac.uk/~etheridg/pdecdt.pdf) for solution/uniqueness definitions. Our weak-solution convention includes strong solutions, as in the existing schema/reference conventions. |

## Allocation and difficulty review

The map records each exact subtopic addition and remaining E/M/H budget. Basic definitions fill Easy slots; application/assumption distinctions use Medium. The four Hard items require a second-moment Borel–Cantelli refinement, failure of absolute integrability, infinite-state balance/normalisation, or generator-versus-semigroup conservativity. No per-subject Hard quota was invented.

Markov and CTMC topics had only five remaining question slots; the sixth Processes question covers càdlàg paths in General definitions. Borel–Cantelli's tail-event application belongs to Probability spaces, with a cross-topic link to its canonical Independence reference. Modes of convergence and Stopping times remain at their existing full budgets. No Batch C content was started.

## Item review

Canonical answer positions are distributed 8/8/7/7 within Batch B; displayed order still uses the unchanged session shuffler. Every item was reviewed for uniqueness, plausible distractors, wording/length clues, assumption scope and overlap with the existing 150. The nonblocking source-length audit has no flagged items after revision.

| Question ID | Objective / correctness and distractor review |
| --- | --- |
| `prob-mutual-independence-subsets` | Definition tests all subcollections, not another three-bit calculation. The claim concerns general n, including n≥3. |
| `prob-summable-events-limsup` | P01 uses countable event operations and continuity; the theorem has its canonical reference under Independence. No deterministic eventual bound is implied. |
| `prob-pairwise-borel-cantelli` | Hard condition refinement: mutual independence is stronger than needed. Alternating independent Bernoulli events refutes adjacent independence and a positive lower bound; shrinking nested events refute vanishing probabilities. |
| `prob-dependent-average-failure` | Dependence counterexample to averaging, distinct from same-law versus convergence of individual variables. |
| `stat-risk-expectation` | Separates sampling risk from posterior averaging and loss of the mean; no new MSE identity duplicate. |
| `stat-score-parameter-derivative` | Parameter derivative, data derivative, raw density derivative and curvature are distinct definitions. |
| `stat-ancillary-law` | Not a reworded Basu hypothesis; contrasts a new definition with sufficiency and moment-only criteria. |
| `stat-lehmann-scheffe-scope` | Comparison class and loss distinguish the theorem from the earlier Rao–Blackwell improvement item. |
| `stat-power-function` | The last distractor excludes partly randomised rejection; it is not generally power. |
| `stat-valid-p-value-inequality` | Characterisation rather than merely sufficiency makes exact-uniformity distractor unambiguously too strong. |
| `stat-confidence-test-inversion` | Universal guarantee includes conservative tests; exact-size subset may omit the true parameter. |
| `stat-ols-residual-orthogonality` | An algebraic foundation, not a repeat of Gauss–Markov covariance conditions. |
| `measure-pi-lambda-closure` | Abstract closure result complements the existing determining-class question. |
| `measure-outer-measure-subadditivity` | Tests construction precursor rather than ordinary measure continuity. |
| `measure-extension-sigma-finite` | Distinguishes countable cover from uncountable local covers; other conditions do not replace sigma-finiteness. |
| `measure-discrete-rn-density` | First direct density calculation, different from existing RN representation/chain-rule recall. |
| `measure-mixed-absolute-continuity` | Finite measures isolate null-set direction, not the old failure of sigma-finiteness. |
| `measure-law-pushforward` | Defines law rather than measurable-map criterion; avoids requiring a density. |
| `measure-signed-integral-cancellation` | Separates principal value from Lebesgue integrability; unlike escaping-mass examples. |
| `measure-fubini-order-failure` | Nonintegrable singularity at a corner produces two finite, unequal iterated integrals; signed counterpart to Batch A valid Fubini. |
| `process-cadlag-path-definition` | Uses one remaining General definitions Easy slot because Markov/CTMC combined have only five slots. |
| `process-stationary-two-state-balance` | First stationary-law calculation; all distractors are probability vectors. |
| `process-stationary-not-reversible` | Directed cycle tests pairwise versus global flow, not a second aperiodicity recall item. |
| `process-infinite-chain-invariant-mass` | Hard: solve invariant recurrence and normalisation on a two-sided infinite state space; counting measure is not a probability. |
| `process-embedded-jump-probability` | Adds the jump destination law; existing items test rates, holding times and matrix exponential. |
| `process-conservative-explosive-chain` | Tests generator versus minimal-semigroup conservativity, not another recall of the reciprocal-rate criterion. |
| `calc-local-integrand-bracket-measure` | General bracket-weighted integrability differs from existing Brownian energy items; definition, not merely a sufficient-condition question. |
| `calc-deterministic-integral-law` | All four laws have mean zero and variance v; only the Gaussian law follows from deterministic Brownian integration. This avoids coincident variance-formula distractors at v=1. |
| `calc-sde-integral-definition` | Adds integral meaning rather than another explicit linear SDE solution. Terminal-state coefficients are generally anticipative. |
| `calc-pathwise-uniqueness-definition` | Separates coupling from law; existing question distinguished strong construction from weak existence. |

## Direct mathematical checks and revisions

- **Pairwise Borel–Cantelli:** for each fixed tail start m, the sum of indicators through N has variance at most its diverging mean. Chebyshev makes the chance of no occurrence tend to zero. Intersect the resulting probability-one tail-union events over countably many m. Alternating two independent fair events makes adjacent events independent, but the infinitely-often event has probability 3/4. Shrinking nested events of probability 1/n refute the vanishing-probabilities alternative.
- **Extension uniqueness:** countably generated and positive-mass conditions do not replace sigma-finiteness. On an interval algebra, the premeasure assigning infinity to nonempty intervals admits both the measure that is zero on countable Borel sets/infinite otherwise, and the measure that is zero on Lebesgue-null Borel sets/infinite otherwise. They disagree on the Cantor set. Adding all singleton generators, with mass zero, gives pointwise finite-mass neighbourhoods but still no uniqueness. A countable cover is the critical missing hypothesis in that distractor.
- **Fubini failure:** differentiating y/(x²+y²) in y and −x/(x²+y²) in x gives the stated integrand. The iterated integrals are π/4 and −π/4. Each section is integrable; the double absolute integral is not. Symmetry cannot justify cancellation.
- **Invariant mass:** two-state choices were checked against both balance and normalisation. The directed cycle preserves uniform mass but violates pairwise reverse flow. For the lazy walk on all integers, stationary weights are affine; global nonnegativity forces a constant, which cannot be a probability vector.
- **Explosion:** independent holding means 2⁻ⁿ sum to 2. Tonelli gives finite expected lifetime, hence a.s. finite explosion and loss of mass from the original state space for some finite time. This is not a claim that every unbounded-rate chain explodes.
- **Gaussian-integral revision:** discarded variance-formula distractors that coincided at v=1 or when the ordinary integral of h vanished. The final four candidate laws all have mean zero and variance v but are different for every v>0; Gaussianity follows from deterministic integrands, not from matching moments.
- **Definition boundaries:** n≥3 avoids collapsing mutual/pairwise independence. Valid p-values need only be super-uniform, not exactly uniform. Test inversion keeps nonrejected parameters. General local-martingale integrability uses bracket energy, with finite expected energy explicitly stronger. Pathwise uniqueness compares identical initial values and noise on the same filtered space.

## Reference scope and remaining gaps

Existing mappings were preserved: 138 of 180 questions now have explicit links; the original 42 remain unlinked. Some now have supporting references available, but backfilling them needs a separate version-aware review. The new CTMC explosion example does not replace the full pure-birth nonexplosion criterion. Finite-state semigroup equations, Gaussian independence, zero–one law, RN chain rule, Cramér–Rao, Gauss–Markov and exact normal pivots still need reference work. Completeness has a supporting definition link but no standalone definition question; likewise information is defined but not directly tested. No full worked solutions, new UI or schema changes were added.

## Verification

Bank/reference validation and editorial audit pass. All 43 individual unit tests pass, including exact subject/topic/difficulty allocation, all per-topic budget caps, atomic density and stationary-law calculations, finite counterexample enumeration, British English, LaTeX and persistent-history/session regressions. Production build succeeds with the existing chunk-size warning (~713 kB main JS). Production Chromium rendered all 180 questions and 100 references at 320px/390px without page overflow or KaTeX errors. Feedback/setup/reference navigation, legacy history, offline restart, offline attempts, KaTeX/fonts/reference access and updates without data loss pass. No deployment or new real-iPhone test is claimed.

**Next task:** Batch C, only after this reviewed and validated Batch B is accepted; retain its planned subject allocation and use remaining topic/difficulty budgets.
