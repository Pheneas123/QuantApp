import type { ItemMapping } from '../schema';
import { stage2Mappings } from './stage2Mappings';
/** Explicit reviewed mappings; no runtime inference from taxonomy. */
export const quickMappings: Record<string, ItemMapping> = {
  ...stage2Mappings,
  "prob-007": {
    "objectiveIds": [
      "lo-probability-probability-spaces"
    ]
  },
  "prob-summable-events-limsup": {
    "objectiveIds": [
      "lo-probability-probability-spaces"
    ]
  },
  "prob-002": {
    "objectiveIds": [
      "lo-probability-conditional-probability"
    ]
  },
  "prob-010": {
    "objectiveIds": [
      "lo-probability-conditional-probability"
    ]
  },
  "prob-001": {
    "objectiveIds": [
      "lo-probability-independence"
    ]
  },
  "prob-009": {
    "objectiveIds": [
      "lo-probability-independence"
    ],
    "familyId": "fair-bit-parity"
  },
  "prob-024": {
    "objectiveIds": [
      "lo-probability-independence"
    ]
  },
  "prob-mutual-independence-subsets": {
    "objectiveIds": [
      "lo-probability-independence"
    ]
  },
  "prob-pairwise-borel-cantelli": {
    "objectiveIds": [
      "lo-probability-independence"
    ]
  },
  "prob-008": {
    "objectiveIds": [
      "lo-probability-random-variables"
    ]
  },
  "prob-011": {
    "objectiveIds": [
      "lo-probability-common-distributions"
    ]
  },
  "prob-012": {
    "objectiveIds": [
      "lo-probability-common-distributions"
    ]
  },
  "prob-013": {
    "objectiveIds": [
      "lo-probability-expectation",
      "lo-variance-sum"
    ],
    "familyId": "variance-transfer"
  },
  "prob-014": {
    "objectiveIds": [
      "lo-probability-expectation"
    ]
  },
  "prob-004": {
    "objectiveIds": [
      "lo-probability-conditional-expectation"
    ]
  },
  "prob-015": {
    "objectiveIds": [
      "lo-probability-conditional-expectation"
    ]
  },
  "prob-022": {
    "objectiveIds": [
      "lo-probability-conditional-expectation"
    ]
  },
  "prob-ce-partition-mean": {
    "objectiveIds": [
      "lo-probability-conditional-expectation"
    ]
  },
  "prob-ce-known-factor": {
    "objectiveIds": [
      "lo-probability-conditional-expectation"
    ]
  },
  "prob-ce-jensen-direction": {
    "objectiveIds": [
      "lo-probability-conditional-expectation"
    ]
  },
  "prob-ce-nonnested-tower": {
    "objectiveIds": [
      "lo-probability-conditional-expectation"
    ],
    "familyId": "fair-bit-parity"
  },
  "prob-016": {
    "objectiveIds": [
      "lo-probability-generating-functions"
    ]
  },
  "prob-017": {
    "objectiveIds": [
      "lo-probability-generating-functions"
    ]
  },
  "prob-003": {
    "objectiveIds": [
      "lo-probability-modes-of-convergence"
    ]
  },
  "prob-006": {
    "objectiveIds": [
      "lo-probability-modes-of-convergence",
      "lo-uniform-integrability"
    ],
    "familyId": "ui-l1"
  },
  "prob-021": {
    "objectiveIds": [
      "lo-probability-modes-of-convergence"
    ]
  },
  "prob-023": {
    "objectiveIds": [
      "lo-probability-modes-of-convergence",
      "lo-uniform-integrability"
    ],
    "familyId": "escaping-mass"
  },
  "prob-lp-difference-definition": {
    "objectiveIds": [
      "lo-probability-modes-of-convergence"
    ]
  },
  "prob-subsequence-quantifiers": {
    "objectiveIds": [
      "lo-probability-modes-of-convergence"
    ]
  },
  "prob-equal-laws-not-probability": {
    "objectiveIds": [
      "lo-probability-modes-of-convergence"
    ]
  },
  "prob-slutsky-random-denominator": {
    "objectiveIds": [
      "lo-probability-modes-of-convergence"
    ]
  },
  "prob-018": {
    "objectiveIds": [
      "lo-probability-laws-of-large-numbers"
    ]
  },
  "prob-dependent-average-failure": {
    "objectiveIds": [
      "lo-probability-laws-of-large-numbers"
    ]
  },
  "prob-005": {
    "objectiveIds": [
      "lo-probability-central-limit-theorem"
    ]
  },
  "prob-025": {
    "objectiveIds": [
      "lo-probability-central-limit-theorem"
    ]
  },
  "prob-019": {
    "objectiveIds": [
      "lo-probability-concentration-inequalities"
    ]
  },
  "prob-020": {
    "objectiveIds": [
      "lo-probability-concentration-inequalities"
    ]
  },
  "stat-001": {
    "objectiveIds": [
      "lo-statistics-estimation"
    ]
  },
  "stat-008": {
    "objectiveIds": [
      "lo-statistics-estimation"
    ]
  },
  "stat-risk-expectation": {
    "objectiveIds": [
      "lo-statistics-estimation"
    ]
  },
  "stat-002": {
    "objectiveIds": [
      "lo-statistics-bias-variance-and-mse"
    ]
  },
  "stat-007": {
    "objectiveIds": [
      "lo-statistics-bias-variance-and-mse"
    ]
  },
  "stat-004": {
    "objectiveIds": [
      "lo-statistics-maximum-likelihood"
    ]
  },
  "stat-009": {
    "objectiveIds": [
      "lo-statistics-maximum-likelihood"
    ]
  },
  "stat-018": {
    "objectiveIds": [
      "lo-statistics-maximum-likelihood"
    ]
  },
  "stat-score-parameter-derivative": {
    "objectiveIds": [
      "lo-statistics-maximum-likelihood"
    ]
  },
  "stat-003": {
    "objectiveIds": [
      "lo-statistics-sufficiency"
    ]
  },
  "stat-006": {
    "objectiveIds": [
      "lo-statistics-sufficiency"
    ]
  },
  "stat-017": {
    "objectiveIds": [
      "lo-statistics-sufficiency"
    ]
  },
  "stat-ancillary-law": {
    "objectiveIds": [
      "lo-statistics-sufficiency"
    ]
  },
  "stat-lehmann-scheffe-scope": {
    "objectiveIds": [
      "lo-statistics-sufficiency"
    ]
  },
  "stat-010": {
    "objectiveIds": [
      "lo-statistics-hypothesis-testing"
    ]
  },
  "stat-011": {
    "objectiveIds": [
      "lo-statistics-hypothesis-testing"
    ]
  },
  "stat-020": {
    "objectiveIds": [
      "lo-statistics-hypothesis-testing"
    ]
  },
  "stat-power-function": {
    "objectiveIds": [
      "lo-statistics-hypothesis-testing"
    ]
  },
  "stat-valid-p-value-inequality": {
    "objectiveIds": [
      "lo-statistics-hypothesis-testing"
    ]
  },
  "stat-005": {
    "objectiveIds": [
      "lo-statistics-confidence-intervals"
    ]
  },
  "stat-012": {
    "objectiveIds": [
      "lo-statistics-confidence-intervals"
    ]
  },
  "stat-confidence-test-inversion": {
    "objectiveIds": [
      "lo-statistics-confidence-intervals"
    ]
  },
  "stat-013": {
    "objectiveIds": [
      "lo-statistics-regression"
    ]
  },
  "stat-ols-residual-orthogonality": {
    "objectiveIds": [
      "lo-statistics-regression"
    ]
  },
  "stat-014": {
    "objectiveIds": [
      "lo-statistics-bayesian-inference"
    ]
  },
  "stat-015": {
    "objectiveIds": [
      "lo-statistics-bayesian-inference"
    ]
  },
  "stat-016": {
    "objectiveIds": [
      "lo-statistics-asymptotic-statistics"
    ]
  },
  "stat-019": {
    "objectiveIds": [
      "lo-statistics-asymptotic-statistics"
    ]
  },
  "measure-001": {
    "objectiveIds": [
      "lo-measure-theory-sigma-algebras"
    ]
  },
  "measure-007": {
    "objectiveIds": [
      "lo-measure-theory-sigma-algebras"
    ]
  },
  "measure-pi-lambda-closure": {
    "objectiveIds": [
      "lo-measure-theory-sigma-algebras"
    ]
  },
  "measure-008": {
    "objectiveIds": [
      "lo-measure-theory-measures"
    ]
  },
  "measure-009": {
    "objectiveIds": [
      "lo-measure-theory-measures"
    ]
  },
  "measure-outer-measure-subadditivity": {
    "objectiveIds": [
      "lo-measure-theory-measures"
    ]
  },
  "measure-extension-sigma-finite": {
    "objectiveIds": [
      "lo-measure-theory-measures"
    ]
  },
  "measure-004": {
    "objectiveIds": [
      "lo-measure-theory-measurable-functions"
    ]
  },
  "measure-018": {
    "objectiveIds": [
      "lo-measure-theory-measurable-functions"
    ]
  },
  "measure-010": {
    "objectiveIds": [
      "lo-measure-theory-lebesgue-integration"
    ]
  },
  "measure-signed-integral-cancellation": {
    "objectiveIds": [
      "lo-measure-theory-lebesgue-integration"
    ]
  },
  "measure-011": {
    "objectiveIds": [
      "lo-measure-theory-almost-sure-almost-everywhere-concepts"
    ]
  },
  "measure-012": {
    "objectiveIds": [
      "lo-measure-theory-almost-sure-almost-everywhere-concepts"
    ]
  },
  "measure-019": {
    "objectiveIds": [
      "lo-measure-theory-almost-sure-almost-everywhere-concepts"
    ]
  },
  "measure-002": {
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ]
  },
  "measure-005": {
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ],
    "familyId": "escaping-mass"
  },
  "measure-013": {
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ]
  },
  "measure-014": {
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ]
  },
  "measure-dct-tail-envelope": {
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ]
  },
  "measure-signed-monotone-failure": {
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ]
  },
  "measure-scheffe-density-limit": {
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ]
  },
  "measure-reverse-fatou-upper-bound": {
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ]
  },
  "measure-015": {
    "objectiveIds": [
      "lo-measure-theory-product-measures"
    ]
  },
  "measure-016": {
    "objectiveIds": [
      "lo-measure-theory-product-measures"
    ]
  },
  "measure-product-rectangle": {
    "objectiveIds": [
      "lo-measure-theory-product-measures"
    ]
  },
  "measure-fubini-signed-integral": {
    "objectiveIds": [
      "lo-measure-theory-product-measures"
    ]
  },
  "measure-fubini-order-failure": {
    "objectiveIds": [
      "lo-measure-theory-product-measures"
    ]
  },
  "measure-003": {
    "objectiveIds": [
      "lo-measure-theory-radon-nikodym-theorem"
    ]
  },
  "measure-006": {
    "objectiveIds": [
      "lo-measure-theory-radon-nikodym-theorem"
    ]
  },
  "measure-020": {
    "objectiveIds": [
      "lo-measure-theory-radon-nikodym-theorem"
    ]
  },
  "measure-discrete-rn-density": {
    "objectiveIds": [
      "lo-measure-theory-radon-nikodym-theorem"
    ]
  },
  "measure-mixed-absolute-continuity": {
    "objectiveIds": [
      "lo-measure-theory-radon-nikodym-theorem"
    ]
  },
  "measure-017": {
    "objectiveIds": [
      "lo-measure-theory-probability-measures"
    ]
  },
  "measure-law-pushforward": {
    "objectiveIds": [
      "lo-measure-theory-probability-measures"
    ]
  },
  "process-007": {
    "objectiveIds": [
      "lo-stochastic-processes-general-definitions"
    ]
  },
  "process-008": {
    "objectiveIds": [
      "lo-stochastic-processes-general-definitions"
    ]
  },
  "process-027": {
    "objectiveIds": [
      "lo-stochastic-processes-general-definitions"
    ]
  },
  "process-cadlag-path-definition": {
    "objectiveIds": [
      "lo-stochastic-processes-general-definitions"
    ]
  },
  "process-009": {
    "objectiveIds": [
      "lo-stochastic-processes-filtrations"
    ]
  },
  "process-010": {
    "objectiveIds": [
      "lo-stochastic-processes-filtrations"
    ]
  },
  "process-030": {
    "objectiveIds": [
      "lo-stochastic-processes-filtrations"
    ]
  },
  "process-continuity-measurability": {
    "objectiveIds": [
      "lo-stochastic-processes-filtrations"
    ]
  },
  "process-011": {
    "objectiveIds": [
      "lo-stochastic-processes-random-walks"
    ]
  },
  "process-003": {
    "objectiveIds": [
      "lo-stochastic-processes-markov-chains"
    ]
  },
  "process-012": {
    "objectiveIds": [
      "lo-stochastic-processes-markov-chains"
    ]
  },
  "process-013": {
    "objectiveIds": [
      "lo-stochastic-processes-markov-chains"
    ]
  },
  "process-014": {
    "objectiveIds": [
      "lo-stochastic-processes-markov-chains"
    ]
  },
  "process-stationary-two-state-balance": {
    "objectiveIds": [
      "lo-stochastic-processes-markov-chains"
    ]
  },
  "process-stationary-not-reversible": {
    "objectiveIds": [
      "lo-stochastic-processes-markov-chains"
    ]
  },
  "process-infinite-chain-invariant-mass": {
    "objectiveIds": [
      "lo-stochastic-processes-markov-chains"
    ]
  },
  "process-015": {
    "objectiveIds": [
      "lo-stochastic-processes-continuous-time-markov-chains"
    ]
  },
  "process-016": {
    "objectiveIds": [
      "lo-stochastic-processes-continuous-time-markov-chains"
    ]
  },
  "process-017": {
    "objectiveIds": [
      "lo-stochastic-processes-continuous-time-markov-chains"
    ]
  },
  "process-embedded-jump-probability": {
    "objectiveIds": [
      "lo-stochastic-processes-continuous-time-markov-chains"
    ]
  },
  "process-conservative-explosive-chain": {
    "objectiveIds": [
      "lo-stochastic-processes-continuous-time-markov-chains"
    ]
  },
  "process-001": {
    "objectiveIds": [
      "lo-stochastic-processes-poisson-processes"
    ]
  },
  "process-005": {
    "objectiveIds": [
      "lo-stochastic-processes-poisson-processes"
    ]
  },
  "process-018": {
    "objectiveIds": [
      "lo-stochastic-processes-poisson-processes"
    ]
  },
  "process-019": {
    "objectiveIds": [
      "lo-stochastic-processes-poisson-processes"
    ]
  },
  "process-002": {
    "objectiveIds": [
      "lo-stochastic-processes-martingales"
    ]
  },
  "process-020": {
    "objectiveIds": [
      "lo-stochastic-processes-martingales"
    ]
  },
  "process-028": {
    "objectiveIds": [
      "lo-stochastic-processes-martingales",
      "lo-uniform-integrability"
    ],
    "familyId": "ui-l1"
  },
  "process-conditional-drift-sign": {
    "objectiveIds": [
      "lo-stochastic-processes-martingales"
    ]
  },
  "process-doob-maximum-bound": {
    "objectiveIds": [
      "lo-stochastic-processes-martingales"
    ]
  },
  "process-martingale-mass-loss": {
    "objectiveIds": [
      "lo-stochastic-processes-martingales"
    ]
  },
  "process-004": {
    "objectiveIds": [
      "lo-stochastic-processes-stopping-times"
    ]
  },
  "process-006": {
    "objectiveIds": [
      "lo-stochastic-processes-stopping-times"
    ],
    "familyId": "bounded-stopping"
  },
  "process-021": {
    "objectiveIds": [
      "lo-stochastic-processes-stopping-times"
    ],
    "familyId": "bounded-stopping"
  },
  "process-hitting-time-event": {
    "objectiveIds": [
      "lo-stochastic-processes-stopping-times"
    ]
  },
  "process-stopped-information": {
    "objectiveIds": [
      "lo-stochastic-processes-stopping-times"
    ]
  },
  "process-bounded-walk-square": {
    "objectiveIds": [
      "lo-stochastic-processes-stopping-times"
    ]
  },
  "process-continuous-sampling-bound": {
    "objectiveIds": [
      "lo-stochastic-processes-stopping-times"
    ],
    "familyId": "bounded-stopping"
  },
  "process-022": {
    "objectiveIds": [
      "lo-stochastic-processes-brownian-motion"
    ]
  },
  "process-023": {
    "objectiveIds": [
      "lo-stochastic-processes-brownian-motion"
    ]
  },
  "process-024": {
    "objectiveIds": [
      "lo-stochastic-processes-gaussian-processes"
    ]
  },
  "process-025": {
    "objectiveIds": [
      "lo-stochastic-processes-birth-death-processes"
    ]
  },
  "process-029": {
    "objectiveIds": [
      "lo-stochastic-processes-birth-death-processes"
    ]
  },
  "process-026": {
    "objectiveIds": [
      "lo-stochastic-processes-levy-processes"
    ]
  },
  "calc-001": {
    "objectiveIds": [
      "lo-stochastic-calculus-brownian-motion-properties"
    ]
  },
  "calc-004": {
    "objectiveIds": [
      "lo-stochastic-calculus-brownian-motion-properties"
    ]
  },
  "calc-002": {
    "objectiveIds": [
      "lo-stochastic-calculus-quadratic-variation",
      "lo-quadratic-variation"
    ]
  },
  "calc-qv-drift-plus-noise": {
    "objectiveIds": [
      "lo-stochastic-calculus-quadratic-variation",
      "lo-quadratic-variation"
    ]
  },
  "calc-integral-bracket-random": {
    "objectiveIds": [
      "lo-stochastic-calculus-quadratic-variation",
      "lo-quadratic-variation"
    ]
  },
  "calc-correlated-covariation": {
    "objectiveIds": [
      "lo-stochastic-calculus-quadratic-variation",
      "lo-quadratic-variation"
    ]
  },
  "calc-007": {
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-integration"
    ]
  },
  "calc-elementary-left-information": {
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-integration"
    ]
  },
  "calc-local-integrand-bracket-measure": {
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-integration"
    ]
  },
  "calc-008": {
    "objectiveIds": [
      "lo-stochastic-calculus-ito-integral"
    ]
  },
  "calc-009": {
    "objectiveIds": [
      "lo-stochastic-calculus-ito-integral"
    ]
  },
  "calc-isometry-time-integrand": {
    "objectiveIds": [
      "lo-stochastic-calculus-ito-integral"
    ]
  },
  "calc-finite-energy-infinite-moment": {
    "objectiveIds": [
      "lo-stochastic-calculus-ito-integral"
    ]
  },
  "calc-deterministic-integral-law": {
    "objectiveIds": [
      "lo-stochastic-calculus-ito-integral"
    ]
  },
  "calc-003": {
    "objectiveIds": [
      "lo-stochastic-calculus-ito-s-lemma",
      "lo-ito-transform"
    ]
  },
  "calc-010": {
    "objectiveIds": [
      "lo-stochastic-calculus-ito-s-lemma",
      "lo-ito-transform"
    ]
  },
  "calc-013": {
    "objectiveIds": [
      "lo-stochastic-calculus-continuous-martingales"
    ]
  },
  "calc-025": {
    "objectiveIds": [
      "lo-stochastic-calculus-continuous-martingales"
    ]
  },
  "calc-006": {
    "objectiveIds": [
      "lo-stochastic-calculus-local-martingales"
    ]
  },
  "calc-localising-sequence-definition": {
    "objectiveIds": [
      "lo-stochastic-calculus-local-martingales"
    ]
  },
  "calc-bounded-local-criterion": {
    "objectiveIds": [
      "lo-stochastic-calculus-local-martingales"
    ]
  },
  "calc-011": {
    "objectiveIds": [
      "lo-stochastic-calculus-semimartingales"
    ]
  },
  "calc-012": {
    "objectiveIds": [
      "lo-stochastic-calculus-semimartingales"
    ]
  },
  "calc-014": {
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-differential-equations",
      "lo-ito-transform"
    ]
  },
  "calc-015": {
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-differential-equations"
    ]
  },
  "calc-sde-integral-definition": {
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-differential-equations"
    ]
  },
  "calc-016": {
    "objectiveIds": [
      "lo-stochastic-calculus-strong-and-weak-solutions"
    ]
  },
  "calc-026": {
    "objectiveIds": [
      "lo-stochastic-calculus-strong-and-weak-solutions"
    ]
  },
  "calc-pathwise-uniqueness-definition": {
    "objectiveIds": [
      "lo-stochastic-calculus-strong-and-weak-solutions"
    ]
  },
  "calc-017": {
    "objectiveIds": [
      "lo-stochastic-calculus-existence-and-uniqueness"
    ]
  },
  "calc-018": {
    "objectiveIds": [
      "lo-stochastic-calculus-girsanov-theorem"
    ]
  },
  "calc-019": {
    "objectiveIds": [
      "lo-stochastic-calculus-girsanov-theorem"
    ]
  },
  "calc-020": {
    "objectiveIds": [
      "lo-stochastic-calculus-martingale-representation"
    ]
  },
  "calc-023": {
    "objectiveIds": [
      "lo-stochastic-calculus-feynman-kac"
    ]
  },
  "calc-021": {
    "objectiveIds": [
      "lo-stochastic-calculus-infinitesimal-generators"
    ]
  },
  "calc-022": {
    "objectiveIds": [
      "lo-stochastic-calculus-kolmogorov-equations"
    ]
  },
  "calc-024": {
    "objectiveIds": [
      "lo-stochastic-calculus-martingale-problems"
    ]
  },
  "fin-markets-primary": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-spread": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-claims": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-leverage-return": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-short-dividend": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-liquidity": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-otc": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-crossed-arbitrage": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-maintenance-margin": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-markets-fx-triangle": {
    "objectiveIds": [
      "lo-finance-financial-markets-and-instruments"
    ]
  },
  "fin-micro-limit": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-priority": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-stop-gap": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-walk-book": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-vwap": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-twap": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-imbalance": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-adverse-selection": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-inventory": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-micro-execution-tradeoff": {
    "objectiveIds": [
      "lo-finance-market-microstructure"
    ]
  },
  "fin-bonds-coupon": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-zero-price": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-yield-direction": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-dirty": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-spot-price": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-forward-rate": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-dv01": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-bootstrap": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-convexity": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-bonds-duration-hedge": {
    "objectiveIds": [
      "lo-finance-bonds-and-fixed-income"
    ]
  },
  "fin-credit-simple-interest": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-compound-interest": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-secured": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-effective-rate": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-amortisation": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-annuity": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-ecl": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-risk-neutral-bond": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-dependent-ecl": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-credit-hazard-spread": {
    "objectiveIds": [
      "lo-finance-loans-and-credit"
    ]
  },
  "fin-forwards-payoff": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-futures-marking": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-futures-initial-margin": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-forwards-carry": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-forwards-dividend-yield": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-forwards-basis-hedge": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-forwards-convenience": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-forwards-cash-carry-arbitrage": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-forwards-fx-covered": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-forwards-existing-value": {
    "objectiveIds": [
      "lo-finance-forwards-and-futures"
    ]
  },
  "fin-options-call-profit": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-put-payoff": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-exercise-style": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-parity": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-intrinsic-time": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-binomial": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-delta-hedge": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-butterfly-arbitrage": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-early-call": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-options-volatility-smile": {
    "objectiveIds": [
      "lo-finance-options"
    ]
  },
  "fin-swaps-irs": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-payment": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-cds-direction": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-par-rate": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-caplet": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-total-return": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-swaption": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-fra-settlement": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-cva": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-swaps-wrong-way": {
    "objectiveIds": [
      "lo-finance-swaps-and-other-derivatives"
    ]
  },
  "fin-portfolio-total-return": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing"
    ]
  },
  "fin-portfolio-log-return": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing"
    ]
  },
  "fin-portfolio-diversification": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing"
    ]
  },
  "fin-portfolio-variance": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing",
      "lo-variance-sum"
    ],
    "familyId": "variance-transfer"
  },
  "fin-portfolio-capm": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing"
    ]
  },
  "fin-portfolio-sharpe": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing"
    ]
  },
  "fin-portfolio-information-ratio": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing"
    ]
  },
  "fin-portfolio-minimum-variance": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing"
    ]
  },
  "fin-portfolio-factor-residual": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing",
      "lo-variance-sum"
    ]
  },
  "fin-portfolio-rebalancing": {
    "objectiveIds": [
      "lo-finance-portfolio-theory-and-asset-pricing"
    ]
  },
  "fin-risk-funding": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-var-meaning": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-stress": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-normal-var": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-discrete-es": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-backtest-exceptions": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-garch": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-var-nonsubadditive": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-frtb": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-risk-time-scaling": {
    "objectiveIds": [
      "lo-finance-financial-risk-management"
    ]
  },
  "fin-pricing-replication": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance"
    ]
  },
  "fin-pricing-monte-carlo": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance"
    ]
  },
  "fin-pricing-calibration": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance"
    ]
  },
  "fin-pricing-gbm-log": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance",
      "lo-ito-transform"
    ]
  },
  "fin-pricing-antithetic": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance",
      "lo-variance-sum"
    ],
    "familyId": "variance-transfer"
  },
  "fin-pricing-numerical-delta": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance"
    ]
  },
  "fin-pricing-hull-white": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance"
    ]
  },
  "fin-pricing-numeraire": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance"
    ]
  },
  "fin-pricing-explicit-stability": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance"
    ]
  },
  "fin-pricing-model-structure": {
    "objectiveIds": [
      "lo-finance-quantitative-pricing-and-numerical-finance"
    ]
  },
  "prog-reference-alias": {
    "objectiveIds": [
      "lo-programming-c-fundamentals"
    ]
  },
  "prog-integer-division": {
    "objectiveIds": [
      "lo-programming-c-fundamentals"
    ]
  },
  "prog-const-reference": {
    "objectiveIds": [
      "lo-programming-c-fundamentals"
    ]
  },
  "prog-sort-unique": {
    "objectiveIds": [
      "lo-programming-c-stl-and-algorithms"
    ]
  },
  "prog-hash-lookup": {
    "objectiveIds": [
      "lo-programming-c-stl-and-algorithms"
    ]
  },
  "prog-vector-invalidation": {
    "objectiveIds": [
      "lo-programming-c-stl-and-algorithms"
    ]
  },
  "prog-virtual-dispatch": {
    "objectiveIds": [
      "lo-programming-c-object-oriented-programming-and-memory"
    ]
  },
  "prog-unique-move": {
    "objectiveIds": [
      "lo-programming-c-object-oriented-programming-and-memory"
    ]
  },
  "prog-dangling-reference": {
    "objectiveIds": [
      "lo-programming-c-object-oriented-programming-and-memory",
      "lo-storage-lifetime"
    ],
    "familyId": "expired-storage"
  },
  "prog-lambda-copy": {
    "objectiveIds": [
      "lo-programming-modern-c"
    ]
  },
  "prog-span-lifetime": {
    "objectiveIds": [
      "lo-programming-modern-c",
      "lo-storage-lifetime"
    ],
    "familyId": "expired-storage"
  },
  "prog-generator-exhaustion": {
    "objectiveIds": [
      "lo-programming-python-fundamentals"
    ]
  },
  "prog-mutable-default": {
    "objectiveIds": [
      "lo-programming-python-fundamentals"
    ]
  },
  "prog-closure-binding": {
    "objectiveIds": [
      "lo-programming-python-fundamentals"
    ]
  },
  "prog-tuple-mutable-member": {
    "objectiveIds": [
      "lo-programming-python-data-structures"
    ]
  },
  "prog-shallow-copy": {
    "objectiveIds": [
      "lo-programming-python-data-structures"
    ]
  },
  "prog-numpy-broadcast": {
    "objectiveIds": [
      "lo-programming-numpy-and-scientific-python"
    ]
  },
  "prog-numpy-view": {
    "objectiveIds": [
      "lo-programming-numpy-and-scientific-python"
    ]
  },
  "prog-pairwise-memory": {
    "objectiveIds": [
      "lo-programming-numpy-and-scientific-python"
    ]
  },
  "prog-binary-search": {
    "objectiveIds": [
      "lo-programming-algorithms-and-complexity"
    ]
  },
  "prog-dynamic-array-amortised": {
    "objectiveIds": [
      "lo-programming-algorithms-and-complexity"
    ]
  },
  "prog-off-by-one": {
    "objectiveIds": [
      "lo-programming-debugging-and-code-analysis"
    ]
  },
  "prog-signed-overflow": {
    "objectiveIds": [
      "lo-programming-debugging-and-code-analysis"
    ]
  },
  "prog-stable-sum": {
    "objectiveIds": [
      "lo-programming-numerical-and-quantitative-programming"
    ]
  },
  "prog-welford-variance": {
    "objectiveIds": [
      "lo-programming-numerical-and-quantitative-programming"
    ]
  },
  "ml-learning-curves": {
    "objectiveIds": [
      "lo-machine-learning-machine-learning-foundations"
    ]
  },
  "ml-fold-preprocessing": {
    "objectiveIds": [
      "lo-machine-learning-machine-learning-foundations"
    ]
  },
  "ml-logistic-probability": {
    "objectiveIds": [
      "lo-machine-learning-supervised-learning"
    ]
  },
  "ml-forest-correlation": {
    "objectiveIds": [
      "lo-machine-learning-supervised-learning",
      "lo-variance-sum"
    ],
    "familyId": "variance-transfer"
  },
  "ml-kmeans-assignment": {
    "objectiveIds": [
      "lo-machine-learning-unsupervised-learning"
    ]
  },
  "ml-pca-direction": {
    "objectiveIds": [
      "lo-machine-learning-unsupervised-learning"
    ]
  },
  "ml-gradient-step": {
    "objectiveIds": [
      "lo-machine-learning-optimisation-and-training"
    ]
  },
  "ml-momentum-step": {
    "objectiveIds": [
      "lo-machine-learning-optimisation-and-training"
    ]
  },
  "ml-quadratic-stability": {
    "objectiveIds": [
      "lo-machine-learning-optimisation-and-training"
    ]
  },
  "ml-backprop-chain": {
    "objectiveIds": [
      "lo-machine-learning-neural-networks-and-deep-learning"
    ]
  },
  "ml-attention-mask": {
    "objectiveIds": [
      "lo-machine-learning-neural-networks-and-deep-learning"
    ]
  },
  "ml-bellman-value": {
    "objectiveIds": [
      "lo-machine-learning-reinforcement-learning"
    ]
  },
  "ml-q-learning-update": {
    "objectiveIds": [
      "lo-machine-learning-reinforcement-learning"
    ]
  },
  "ml-sarsa-off-policy": {
    "objectiveIds": [
      "lo-machine-learning-reinforcement-learning"
    ]
  },
  "ml-map-regularisation": {
    "objectiveIds": [
      "lo-machine-learning-probabilistic-and-bayesian-machine-learning"
    ]
  },
  "ml-elbo-identity": {
    "objectiveIds": [
      "lo-machine-learning-probabilistic-and-bayesian-machine-learning"
    ]
  },
  "ml-walk-forward": {
    "objectiveIds": [
      "lo-machine-learning-time-series-and-sequential-machine-learning"
    ]
  },
  "ml-overlapping-labels": {
    "objectiveIds": [
      "lo-machine-learning-time-series-and-sequential-machine-learning"
    ]
  },
  "ml-accuracy-imbalance": {
    "objectiveIds": [
      "lo-machine-learning-evaluation-and-generalisation"
    ]
  },
  "ml-test-set-role": {
    "objectiveIds": [
      "lo-machine-learning-evaluation-and-generalisation"
    ]
  },
  "ml-precision-recall": {
    "objectiveIds": [
      "lo-machine-learning-evaluation-and-generalisation"
    ]
  },
  "ml-eval-grad-mode": {
    "objectiveIds": [
      "lo-machine-learning-applied-machine-learning-and-implementation"
    ]
  },
  "ml-gradient-accumulation": {
    "objectiveIds": [
      "lo-machine-learning-applied-machine-learning-and-implementation"
    ]
  },
  "ml-loss-broadcast-bug": {
    "objectiveIds": [
      "lo-machine-learning-applied-machine-learning-and-implementation"
    ]
  },
  "ml-terminal-target": {
    "objectiveIds": [
      "lo-machine-learning-applied-machine-learning-and-implementation"
    ]
  }
};
