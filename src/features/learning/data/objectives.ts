import type { LearningObjective } from '../schema';
import { stage2Objectives } from './stage2Objectives';
export const objectives = [
  {
    "id": "lo-probability-probability-spaces",
    "category": "Probability",
    "subcategories": [
      "Probability spaces"
    ],
    "description": "Use probability axioms and tail-event bounds in a probability model.",
    "knowledgeIds": [
      "def-probability-space"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-conditional-probability",
    "category": "Probability",
    "subcategories": [
      "Conditional probability"
    ],
    "description": "Condition correctly on positive-probability events.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-independence",
    "category": "Probability",
    "subcategories": [
      "Independence"
    ],
    "description": "Distinguish pairwise, mutual and conditional independence.",
    "knowledgeIds": [
      "def-mutual-independence",
      "lemma-borel-cantelli-first",
      "lemma-borel-cantelli-pairwise"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-random-variables",
    "category": "Probability",
    "subcategories": [
      "Random variables"
    ],
    "description": "Relate a random variable to its law and transformations.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-common-distributions",
    "category": "Probability",
    "subcategories": [
      "Common distributions"
    ],
    "description": "Identify models from support and assumptions.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-expectation",
    "category": "Probability",
    "subcategories": [
      "Expectation"
    ],
    "description": "Use expectation, covariance and moment bounds correctly.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-conditional-expectation",
    "category": "Probability",
    "subcategories": [
      "Conditional expectation"
    ],
    "description": "Characterise and apply conditional expectation as information projection.",
    "knowledgeIds": [
      "def-conditional-expectation",
      "prop-conditional-expectation-properties",
      "prop-conditional-variance"
    ],
    "prerequisiteIds": [
      "lo-probability-expectation"
    ]
  },
  {
    "id": "lo-probability-generating-functions",
    "category": "Probability",
    "subcategories": [
      "Generating functions"
    ],
    "description": "Choose PGF, MGF or characteristic function appropriately.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-modes-of-convergence",
    "category": "Probability",
    "subcategories": [
      "Modes of convergence"
    ],
    "description": "Distinguish modes and know when expectations converge.",
    "knowledgeIds": [
      "def-almost-sure-convergence",
      "def-convergence-probability",
      "def-convergence-distribution",
      "prop-uniform-integrability",
      "def-lp-convergence",
      "thm-subsequence-principle",
      "thm-continuous-mapping",
      "thm-slutsky"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-laws-of-large-numbers",
    "category": "Probability",
    "subcategories": [
      "Laws of large numbers"
    ],
    "description": "Select an appropriate law of large numbers.",
    "knowledgeIds": [
      "thm-strong-law",
      "thm-weak-law-finite-variance"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-central-limit-theorem",
    "category": "Probability",
    "subcategories": [
      "Central limit theorem"
    ],
    "description": "Recognise normal limits and their scope.",
    "knowledgeIds": [
      "thm-iid-clt",
      "thm-lindeberg-feller"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-probability-concentration-inequalities",
    "category": "Probability",
    "subcategories": [
      "Concentration inequalities"
    ],
    "description": "Match a tail bound to its assumptions.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-estimation",
    "category": "Statistics",
    "subcategories": [
      "Estimation"
    ],
    "description": "Compute estimator expectations and assess consistency or risk under a sampling model.",
    "knowledgeIds": [
      "thm-rao-blackwell",
      "def-statistical-risk"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-bias-variance-and-mse",
    "category": "Statistics",
    "subcategories": [
      "Bias, variance and MSE"
    ],
    "description": "Quantify squared-error trade-offs.",
    "knowledgeIds": [
      "result-bias-variance"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-maximum-likelihood",
    "category": "Statistics",
    "subcategories": [
      "Maximum likelihood"
    ],
    "description": "Form and maximise likelihood without dropping support.",
    "knowledgeIds": [
      "def-maximum-likelihood",
      "def-likelihood-score"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-sufficiency",
    "category": "Statistics",
    "subcategories": [
      "Sufficiency"
    ],
    "description": "Separate sufficiency, minimal sufficiency and completeness.",
    "knowledgeIds": [
      "def-sufficiency",
      "thm-basu",
      "def-ancillary-statistic",
      "def-complete-statistic",
      "thm-lehmann-scheffe"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-hypothesis-testing",
    "category": "Statistics",
    "subcategories": [
      "Hypothesis testing"
    ],
    "description": "Distinguish level, size, power and likelihood-ratio conventions.",
    "knowledgeIds": [
      "thm-neyman-pearson",
      "def-test-power",
      "def-valid-p-value"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-confidence-intervals",
    "category": "Statistics",
    "subcategories": [
      "Confidence intervals"
    ],
    "description": "Interpret coverage and construct intervals from pivots.",
    "knowledgeIds": [
      "def-confidence-interval",
      "thm-test-confidence-duality",
      "result-student-pivot"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-regression",
    "category": "Statistics",
    "subcategories": [
      "Regression"
    ],
    "description": "Identify OLS assumptions and limitations.",
    "knowledgeIds": [
      "def-ordinary-least-squares",
      "thm-gauss-markov"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-bayesian-inference",
    "category": "Statistics",
    "subcategories": [
      "Bayesian inference"
    ],
    "description": "Update a prior and choose a decision under stated loss.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-statistics-asymptotic-statistics",
    "category": "Statistics",
    "subcategories": [
      "Asymptotic statistics"
    ],
    "description": "Use continuous mapping and delta-method expansions for scaled estimators.",
    "knowledgeIds": [
      "thm-delta-method"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-sigma-algebras",
    "category": "Measure Theory",
    "subcategories": [
      "Sigma-algebras"
    ],
    "description": "Recognise generated and product sigma-algebras.",
    "knowledgeIds": [
      "def-sigma-algebra",
      "thm-pi-lambda"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-measures",
    "category": "Measure Theory",
    "subcategories": [
      "Measures"
    ],
    "description": "Distinguish finite/sigma-finite/complete measures and extensions.",
    "knowledgeIds": [
      "def-outer-measure",
      "thm-premeasure-extension"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-measurable-functions",
    "category": "Measure Theory",
    "subcategories": [
      "Measurable functions"
    ],
    "description": "Check measurability using inverse images, generators and pointwise limits.",
    "knowledgeIds": [
      "def-measurable-function"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-lebesgue-integration",
    "category": "Measure Theory",
    "subcategories": [
      "Lebesgue integration"
    ],
    "description": "Build the integral and recognise legitimate manipulations.",
    "knowledgeIds": [
      "def-signed-lebesgue-integral"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-almost-sure-almost-everywhere-concepts",
    "category": "Measure Theory",
    "subcategories": [
      "Almost sure / almost everywhere concepts"
    ],
    "description": "Distinguish null-set equality, completeness and almost uniform convergence.",
    "knowledgeIds": [
      "thm-egorov"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-convergence-theorems",
    "category": "Measure Theory",
    "subcategories": [
      "Convergence theorems"
    ],
    "description": "Choose a convergence theorem and test every assumption.",
    "knowledgeIds": [
      "thm-monotone-convergence",
      "thm-dominated-convergence",
      "lemma-fatou",
      "lemma-scheffe",
      "lemma-reverse-fatou"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-product-measures",
    "category": "Measure Theory",
    "subcategories": [
      "Product measures"
    ],
    "description": "Construct product measures and interchange integrals lawfully.",
    "knowledgeIds": [
      "def-product-measure",
      "thm-tonelli",
      "thm-fubini"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-radon-nikodym-theorem",
    "category": "Measure Theory",
    "subcategories": [
      "Radon-Nikodym theorem"
    ],
    "description": "Recognise a density between measures and its uniqueness class.",
    "knowledgeIds": [
      "thm-radon-nikodym",
      "def-absolute-continuity-measures",
      "result-rn-chain"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-measure-theory-probability-measures",
    "category": "Measure Theory",
    "subcategories": [
      "Probability measures"
    ],
    "description": "Identify probability laws using pushforwards and determining classes.",
    "knowledgeIds": [
      "def-pushforward-measure"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-general-definitions",
    "category": "Stochastic Processes",
    "subcategories": [
      "General definitions"
    ],
    "description": "Distinguish time/state modelling, finite-dimensional laws and pathwise equality or regularity.",
    "knowledgeIds": [
      "def-cadlag-path",
      "def-process-versions"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-filtrations",
    "category": "Stochastic Processes",
    "subcategories": [
      "Filtrations"
    ],
    "description": "Identify which information is available and what measurability is needed.",
    "knowledgeIds": [
      "def-filtration",
      "def-adapted-process",
      "def-progressive-measurability",
      "def-predictable-process"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-random-walks",
    "category": "Stochastic Processes",
    "subcategories": [
      "Random walks"
    ],
    "description": "Use simple random walks as martingale examples.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-markov-chains",
    "category": "Stochastic Processes",
    "subcategories": [
      "Markov chains"
    ],
    "description": "Classify states and distinguish stationarity from convergence.",
    "knowledgeIds": [
      "def-markov-property",
      "prop-stationarity-detailed-balance",
      "thm-countable-chain-positive-recurrence",
      "thm-finite-chain-ergodicity"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-continuous-time-markov-chains",
    "category": "Stochastic Processes",
    "subcategories": [
      "Continuous-time Markov chains"
    ],
    "description": "Translate between jump rates, holding times and transitions.",
    "knowledgeIds": [
      "def-ctmc-jump-construction",
      "prop-ctmc-explosion"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-poisson-processes",
    "category": "Stochastic Processes",
    "subcategories": [
      "Poisson processes"
    ],
    "description": "Identify counting processes and condition on event counts.",
    "knowledgeIds": [
      "def-poisson-process",
      "result-conditional-poisson"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-martingales",
    "category": "Stochastic Processes",
    "subcategories": [
      "Martingales"
    ],
    "description": "Use martingale/submartingale tools with correct moment assumptions.",
    "knowledgeIds": [
      "def-martingale",
      "def-submartingale",
      "def-supermartingale",
      "thm-doob-maximal",
      "thm-doob-lp",
      "thm-martingale-convergence-discrete",
      "thm-ui-martingale-closure"
    ],
    "prerequisiteIds": [
      "lo-probability-conditional-expectation",
      "lo-stochastic-processes-filtrations"
    ]
  },
  {
    "id": "lo-stochastic-processes-stopping-times",
    "category": "Stochastic Processes",
    "subcategories": [
      "Stopping times"
    ],
    "description": "Recognise stopping times and justify optional sampling.",
    "knowledgeIds": [
      "def-stopping-time",
      "thm-optional-stopping",
      "def-stopped-sigma-algebra",
      "thm-optional-sampling-continuous"
    ],
    "prerequisiteIds": [
      "lo-stochastic-processes-filtrations"
    ]
  },
  {
    "id": "lo-stochastic-processes-brownian-motion",
    "category": "Stochastic Processes",
    "subcategories": [
      "Brownian motion"
    ],
    "description": "Relate Brownian paths, increments and stopping behaviour.",
    "knowledgeIds": [
      "def-brownian-motion"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-gaussian-processes",
    "category": "Stochastic Processes",
    "subcategories": [
      "Gaussian processes"
    ],
    "description": "Recognise joint Gaussianity and covariance specifications.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-birth-death-processes",
    "category": "Stochastic Processes",
    "subcategories": [
      "Birth-death processes"
    ],
    "description": "Check invariant laws and explosion in birth–death models.",
    "knowledgeIds": [
      "result-pure-birth-explosion"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-processes-levy-processes",
    "category": "Stochastic Processes",
    "subcategories": [
      "Levy processes"
    ],
    "description": "Identify Lévy processes and distinguish diffusion from jump parts.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-brownian-motion-properties",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Brownian motion properties"
    ],
    "description": "Use conditional Brownian laws in stochastic-calculus settings.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-quadratic-variation",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Quadratic variation"
    ],
    "description": "Compute variation/covariation and distinguish brackets.",
    "knowledgeIds": [
      "def-quadratic-variation",
      "thm-stochastic-integral-brackets"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-stochastic-integration",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Stochastic integration"
    ],
    "description": "Identify admissible integrands and stochastic integration conventions.",
    "knowledgeIds": [
      "def-continuous-local-integrand"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-ito-integral",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Ito integral"
    ],
    "description": "Use isometry and distinguish local from true L2 integrals.",
    "knowledgeIds": [
      "def-ito-integral",
      "thm-ito-isometry",
      "thm-ito-cross-isometry",
      "thm-deterministic-wiener-integral"
    ],
    "prerequisiteIds": [
      "lo-stochastic-processes-brownian-motion",
      "lo-stochastic-processes-filtrations"
    ]
  },
  {
    "id": "lo-stochastic-calculus-ito-s-lemma",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Ito's lemma"
    ],
    "description": "Apply the stochastic chain rule with the correct correction.",
    "knowledgeIds": [
      "thm-ito-formula"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-continuous-martingales",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Continuous martingales"
    ],
    "description": "Use finite-variation and bracket properties of continuous martingales and represent them by random clocks.",
    "knowledgeIds": [
      "thm-levy-characterisation",
      "thm-dambis-dubins-schwarz"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-local-martingales",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Local martingales"
    ],
    "description": "Distinguish local, true and uniformly integrable martingales.",
    "knowledgeIds": [
      "def-local-martingale",
      "cor-nonnegative-local-martingale",
      "thm-bounded-local-martingale"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-semimartingales",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Semimartingales"
    ],
    "description": "Decompose continuous semimartingales and apply their stochastic product rule.",
    "knowledgeIds": [
      "def-continuous-semimartingale"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-stochastic-differential-equations",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Stochastic differential equations"
    ],
    "description": "Recognise and solve elementary SDE models.",
    "knowledgeIds": [
      "def-integral-sde"
    ],
    "prerequisiteIds": [
      "lo-ito-transform"
    ]
  },
  {
    "id": "lo-stochastic-calculus-strong-and-weak-solutions",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Strong and weak solutions"
    ],
    "description": "Separate prescribed noise from existence in law.",
    "knowledgeIds": [
      "def-strong-solution",
      "def-weak-solution",
      "thm-yamada-watanabe",
      "def-sde-uniqueness-notions"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-existence-and-uniqueness",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Existence and uniqueness"
    ],
    "description": "Check sufficient hypotheses for local/global well-posedness.",
    "knowledgeIds": [
      "thm-global-strong-sde"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-girsanov-theorem",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Girsanov theorem"
    ],
    "description": "Track measure, density, signs and true-martingale conditions.",
    "knowledgeIds": [
      "thm-girsanov",
      "thm-novikov"
    ],
    "prerequisiteIds": [
      "lo-stochastic-calculus-ito-integral",
      "lo-stochastic-processes-martingales"
    ]
  },
  {
    "id": "lo-stochastic-calculus-martingale-representation",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Martingale representation"
    ],
    "description": "Identify when Brownian representation holds.",
    "knowledgeIds": [
      "thm-martingale-representation"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-feynman-kac",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Feynman-Kac"
    ],
    "description": "Connect a terminal-value PDE and a stochastic representation.",
    "knowledgeIds": [
      "thm-feynman-kac"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-infinitesimal-generators",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Infinitesimal generators"
    ],
    "description": "Distinguish a formal differential expression from an operator.",
    "knowledgeIds": [
      "def-infinitesimal-generator"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-kolmogorov-equations",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Kolmogorov equations"
    ],
    "description": "Distinguish forward/backward equations and variables.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-stochastic-calculus-martingale-problems",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Martingale problems"
    ],
    "description": "Identify dynamics through laws and test functions.",
    "knowledgeIds": [
      "def-martingale-problem"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-financial-markets-and-instruments",
    "category": "Finance",
    "subcategories": [
      "Financial markets and instruments"
    ],
    "description": "Distinguish financial claims and calculate leverage, margin and executable trading cash flows.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-market-microstructure",
    "category": "Finance",
    "subcategories": [
      "Market microstructure"
    ],
    "description": "Calculate execution costs and interpret order, inventory and adverse-selection effects under stated conventions.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-bonds-and-fixed-income",
    "category": "Finance",
    "subcategories": [
      "Bonds and fixed income"
    ],
    "description": "Price fixed cash flows and calculate yield, duration, convexity and hedge sensitivities.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-loans-and-credit",
    "category": "Finance",
    "subcategories": [
      "Loans and credit"
    ],
    "description": "Calculate repayment and contingent credit loss under explicit probability and recovery assumptions.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-forwards-and-futures",
    "category": "Finance",
    "subcategories": [
      "Forwards and futures"
    ],
    "description": "Distinguish forward delivery prices, contract values and futures settlement; apply carry and hedging arguments.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-options",
    "category": "Finance",
    "subcategories": [
      "Options"
    ],
    "description": "Calculate option payoffs, parity and replication; distinguish exercise and volatility calibration conditions.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-swaps-and-other-derivatives",
    "category": "Finance",
    "subcategories": [
      "Swaps and other derivatives"
    ],
    "description": "Calculate derivative cash flows and valuation adjustments; distinguish exposure and counterparty dependence.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-portfolio-theory-and-asset-pricing",
    "category": "Finance",
    "subcategories": [
      "Portfolio theory and asset pricing"
    ],
    "description": "Calculate return, covariance and risk-adjusted performance; construct portfolio weights under stated constraints.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-financial-risk-management",
    "category": "Finance",
    "subcategories": [
      "Financial risk management"
    ],
    "description": "Calculate and interpret loss quantiles, tail averages, stress scenarios and scaling assumptions.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-finance-quantitative-pricing-and-numerical-finance",
    "category": "Finance",
    "subcategories": [
      "Quantitative pricing and numerical finance"
    ],
    "description": "Apply replication, numerical pricing and calibration with their modelling and discretisation assumptions.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-c-fundamentals",
    "category": "Programming",
    "subcategories": [
      "C++ fundamentals"
    ],
    "description": "Trace C++ references, integer arithmetic and const binding under C++20 rules.",
    "knowledgeIds": [
      "prog-ref-binding",
      "prog-arithmetic-semantics"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-c-stl-and-algorithms",
    "category": "Programming",
    "subcategories": [
      "C++ STL and algorithms"
    ],
    "description": "Apply STL range operations and container complexity and invalidation rules.",
    "knowledgeIds": [
      "prog-stl-invalidation"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-c-object-oriented-programming-and-memory",
    "category": "Programming",
    "subcategories": [
      "C++ object-oriented programming and memory"
    ],
    "description": "Distinguish polymorphic dispatch, ownership and storage lifetime in C++.",
    "knowledgeIds": [
      "prog-virtual-dispatch",
      "prog-raii"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-modern-c",
    "category": "Programming",
    "subcategories": [
      "Modern C++"
    ],
    "description": "Trace lambda captures and distinguish owning containers from non-owning C++ views.",
    "knowledgeIds": [
      "prog-lambda-capture"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-python-fundamentals",
    "category": "Programming",
    "subcategories": [
      "Python fundamentals"
    ],
    "description": "Trace Python bindings, iterator consumption, defaults and closure cells.",
    "knowledgeIds": [
      "prog-python-binding"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-python-data-structures",
    "category": "Programming",
    "subcategories": [
      "Python data structures"
    ],
    "description": "Distinguish container immutability, nested mutability and shallow copying in Python.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-numpy-and-scientific-python",
    "category": "Programming",
    "subcategories": [
      "NumPy and scientific Python"
    ],
    "description": "Calculate array broadcasting shapes and distinguish views from materialised arrays.",
    "knowledgeIds": [
      "prog-numpy-broadcasting"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-algorithms-and-complexity",
    "category": "Programming",
    "subcategories": [
      "Algorithms and complexity"
    ],
    "description": "Derive tight asymptotic bounds and amortised costs under a stated access model.",
    "knowledgeIds": [
      "prog-big-o"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-debugging-and-code-analysis",
    "category": "Programming",
    "subcategories": [
      "Debugging and code analysis"
    ],
    "description": "Diagnose index errors and distinguish undefined behaviour from deterministic outputs.",
    "knowledgeIds": [],
    "prerequisiteIds": []
  },
  {
    "id": "lo-programming-numerical-and-quantitative-programming",
    "category": "Programming",
    "subcategories": [
      "Numerical and quantitative programming"
    ],
    "description": "Choose stable summation and centred online moment calculations.",
    "knowledgeIds": [
      "prog-numerical-stability"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-machine-learning-foundations",
    "category": "Machine Learning",
    "subcategories": [
      "Machine learning foundations"
    ],
    "description": "Diagnose learning curves and prevent preprocessing leakage across validation boundaries.",
    "knowledgeIds": [
      "ml-validation-leakage"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-supervised-learning",
    "category": "Machine Learning",
    "subcategories": [
      "Supervised learning"
    ],
    "description": "Calculate classification probabilities and ensemble error variance.",
    "knowledgeIds": [
      "ml-cross-entropy",
      "ml-ensemble-variance"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-unsupervised-learning",
    "category": "Machine Learning",
    "subcategories": [
      "Unsupervised learning"
    ],
    "description": "Apply distance-based clustering and maximise projected variance for covariance PCA.",
    "knowledgeIds": [
      "ml-kmeans",
      "ml-pca"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-optimisation-and-training",
    "category": "Machine Learning",
    "subcategories": [
      "Optimisation and training"
    ],
    "description": "Calculate gradient and momentum updates and determine scalar iteration stability.",
    "knowledgeIds": [
      "ml-gradient-descent"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-neural-networks-and-deep-learning",
    "category": "Machine Learning",
    "subcategories": [
      "Neural networks and deep learning"
    ],
    "description": "Apply the chain rule to backpropagation and prevent future-token information flow.",
    "knowledgeIds": [
      "ml-backpropagation"
    ],
    "prerequisiteIds": [
      "lo-machine-learning-optimisation-and-training"
    ]
  },
  {
    "id": "lo-machine-learning-reinforcement-learning",
    "category": "Machine Learning",
    "subcategories": [
      "Reinforcement learning"
    ],
    "description": "Calculate Bellman, Q-learning and SARSA targets under stated policy and termination assumptions.",
    "knowledgeIds": [
      "ml-bellman"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-probabilistic-and-bayesian-machine-learning",
    "category": "Machine Learning",
    "subcategories": [
      "Probabilistic and Bayesian machine learning"
    ],
    "description": "Relate Gaussian MAP penalties and variational evidence bounds to posterior inference.",
    "knowledgeIds": [
      "ml-variational-inference"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-time-series-and-sequential-machine-learning",
    "category": "Machine Learning",
    "subcategories": [
      "Time series and sequential machine learning"
    ],
    "description": "Design chronological validation with causal feature and label information.",
    "knowledgeIds": [
      "ml-causal-validation"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-evaluation-and-generalisation",
    "category": "Machine Learning",
    "subcategories": [
      "Evaluation and generalisation"
    ],
    "description": "Calculate classification metrics and distinguish model selection from final evaluation.",
    "knowledgeIds": [
      "ml-classification-metrics"
    ],
    "prerequisiteIds": []
  },
  {
    "id": "lo-machine-learning-applied-machine-learning-and-implementation",
    "category": "Machine Learning",
    "subcategories": [
      "Applied machine learning and implementation"
    ],
    "description": "Diagnose gradient recording, accumulation, tensor pairing and terminal bootstrap errors.",
    "knowledgeIds": [
      "ml-validation-loop"
    ],
    "prerequisiteIds": [
      "lo-programming-numpy-and-scientific-python",
      "lo-machine-learning-optimisation-and-training"
    ]
  },
  {
    "id": "lo-uniform-integrability",
    "category": "Probability",
    "subcategories": [
      "Modes of convergence"
    ],
    "description": "Use uniform integrability to distinguish probability convergence from L1 convergence.",
    "knowledgeIds": [
      "prop-uniform-integrability"
    ],
    "prerequisiteIds": [
      "lo-probability-expectation"
    ]
  },
  {
    "id": "lo-variance-sum",
    "category": "Probability",
    "subcategories": [
      "Expectation"
    ],
    "description": "Calculate variance of a linear combination, retaining covariance terms.",
    "knowledgeIds": [
      "ml-ensemble-variance"
    ],
    "prerequisiteIds": [
      "lo-probability-expectation"
    ]
  },
  {
    "id": "lo-storage-lifetime",
    "category": "Programming",
    "subcategories": [
      "C++ object-oriented programming and memory",
      "Modern C++"
    ],
    "description": "Identify non-owning handles whose referenced storage has expired.",
    "knowledgeIds": [
      "prog-raii",
      "prog-ref-binding"
    ],
    "prerequisiteIds": [
      "lo-programming-c-fundamentals"
    ]
  },
  {
    "id": "lo-quadratic-variation",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Quadratic variation"
    ],
    "description": "Compute quadratic variation and separate it from its expectation.",
    "knowledgeIds": [
      "def-quadratic-variation"
    ],
    "prerequisiteIds": [
      "lo-stochastic-processes-brownian-motion"
    ]
  },
  {
    "id": "lo-ito-transform",
    "category": "Stochastic Calculus",
    "subcategories": [
      "Ito's lemma",
      "Stochastic differential equations"
    ],
    "description": "Apply the second-derivative correction when transforming a Brownian SDE.",
    "knowledgeIds": ["thm-ito-formula"],
    "prerequisiteIds": [
      "lo-quadratic-variation",
      "lo-stochastic-calculus-ito-integral"
    ]
  },
  ...stage2Objectives
] satisfies LearningObjective[];
