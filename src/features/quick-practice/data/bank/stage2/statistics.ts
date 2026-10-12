import type { MultipleChoiceQuestion } from '../../schema';

// Stage 2: independently reviewed additions; original bank files remain intact.
export default [
  {
    "id": "s2-stat-uniform-max-rate",
    "category": "Statistics",
    "subcategory": "Estimation",
    "difficulty": "hard",
    "questionType": "implication",
    "prompt": "Let $X_i$ be i.i.d. uniform on (0,θ), θ>0, and $M_n=\\max_iX_i$. What is the limiting law of $n(\\theta-M_n)/\\theta$?",
    "answers": [
      "A point mass at zero.",
      "$\\operatorname{Exp}(1)$",
      "$N(0,1)$",
      "$\\chi^2_1$"
    ],
    "correctAnswer": 1,
    "explanation": "For fixed z≥0 and n>z, P(n(θ−M_n)/θ>z)=P(M_n<θ(1−z/n))=(1−z/n)^n→e^(−z). For z<0 the variable is nonnegative. This is an exponential limit at rate n, not a regular root-n normal MLE limit: the support depends on θ.",
    "objectiveIds": [
      "lo-statistics-estimation",
      "lo-statistics-asymptotic-statistics"
    ],
    "knowledgeIds": [
      "def-maximum-likelihood",
      "thm-continuous-mapping"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compute the CDF of the maximum from independence.",
      "Express the scaled-error survival event as a bound on every observation."
    ]
  },
  {
    "id": "s2-stat-cramer-rao-transformed",
    "category": "Statistics",
    "subcategory": "Estimation",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In an i.i.d. $N(\\mu,9)$ sample of size 36, T is unbiased for $\\mu^2$ for every real μ and has finite variance, with the usual differentiation regularity. At μ=2, what Cramér–Rao lower bound follows for Var(T)?",
    "answers": [
      "1",
      "16",
      "4",
      "1/4"
    ],
    "correctAnswer": 2,
    "explanation": "The sample information for μ is 36/9=4. For g(μ)=μ² the bound is [g′(μ)]²/I_n=(2μ)²/4, giving 4 at μ=2. The bound need not be attained; unbiasedness for μ² does not turn it into the mean-estimation bound 1/I_n.",
    "objectiveIds": [
      "lo-statistics-estimation",
      "lo-statistical-information"
    ],
    "knowledgeIds": [
      "thm-cramer-rao",
      "def-likelihood-score"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use information for the whole sample and the derivative of the estimand."
    ]
  },
  {
    "id": "s2-stat-oracle-shrinkage",
    "category": "Statistics",
    "subcategory": "Bias, variance and MSE",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "At a fixed parameter value θ=2, an unbiased estimator Z has variance 1. Among estimators aZ with a a real constant, what a minimises MSE at this θ?",
    "answers": [
      "1",
      "1/2",
      "2/5",
      "4/5"
    ],
    "correctAnswer": 3,
    "explanation": "MSE(aZ)=a²+4(a−1)²=5a²−8a+4. Its derivative vanishes at a=4/5 and its second derivative is positive. This is a pointwise oracle calculation, not a rule usable without knowing θ; unbiasedness is not a requirement here.",
    "objectiveIds": [
      "lo-statistics-bias-variance-and-mse"
    ],
    "knowledgeIds": [
      "result-bias-variance"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Write both the variance and squared bias as functions of a."
    ]
  },
  {
    "id": "s2-stat-sample-variance-bias",
    "category": "Statistics",
    "subcategory": "Bias, variance and MSE",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "For n≥2 i.i.d. real observations with finite variance σ²>0, define $V_n=n^{-1}\\sum_i(X_i-\\bar X)^2$. What is its bias as an estimator of σ²?",
    "answers": [
      "$-\\sigma^2/n$",
      "$0$",
      "$\\sigma^2/n$",
      "$-\\sigma^2/(n-1)$"
    ],
    "correctAnswer": 0,
    "explanation": "Using sum(X_i−mean)²=sum(X_i−μ)²−n(mean−μ)², its expectation is nσ²−σ²=(n−1)σ². Division by n gives E[V_n]=(1−1/n)σ², hence bias −σ²/n. Normality is not needed for this expectation identity.",
    "objectiveIds": [
      "lo-statistics-bias-variance-and-mse"
    ],
    "knowledgeIds": [
      "result-sample-variance"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Expand around the true mean before taking expectations."
    ]
  },
  {
    "id": "s2-stat-normal-constrained-mle",
    "category": "Statistics",
    "subcategory": "Maximum likelihood",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "Independent observations 2 and 3 come from $N(\\mu,1)$ with μ constrained to [0,1]. What is the maximum likelihood estimate of μ?",
    "answers": [
      "1.25",
      "1",
      "2.5",
      "0"
    ],
    "correctAnswer": 1,
    "explanation": "Maximising the likelihood minimises (2−μ)²+(3−μ)². Its unconstrained minimiser is 2.5; on [0,1] the loss decreases up to the right boundary, so the constrained estimate is 1. A score root outside the parameter space is not an admissible MLE.",
    "objectiveIds": [
      "lo-statistics-maximum-likelihood"
    ],
    "knowledgeIds": [
      "def-maximum-likelihood"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Find the unconstrained minimiser, then inspect the feasible interval."
    ]
  },
  {
    "id": "s2-stat-multinomial-boundary",
    "category": "Statistics",
    "subcategory": "Maximum likelihood",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A multinomial sample has counts (3,1,0) in three categories, with $p_j\\ge0$ and $\\sum_jp_j=1$. Which vector maximises the likelihood?",
    "answers": [
      "$(1/2,1/4,1/4)$",
      "$(2/3,1/3,0)$",
      "$(3/4,1/4,0)$",
      "$(1/3,1/3,1/3)$"
    ],
    "correctAnswer": 2,
    "explanation": "The parameter-dependent likelihood is p₁³p₂. Positive mass on the unobserved category leaves less for the observed categories and reduces the maximum, so p₃=0. Maximising 3log(p₁)+log(1−p₁) gives p₁=3/4. A zero count permits a boundary estimate; adding pseudocounts would be a different procedure.",
    "objectiveIds": [
      "lo-statistics-maximum-likelihood"
    ],
    "knowledgeIds": [
      "def-maximum-likelihood"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "First decide whether assigning mass to the zero-count category can help."
    ]
  },
  {
    "id": "s2-stat-bernoulli-logit-information",
    "category": "Statistics",
    "subcategory": "Maximum likelihood",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "For one Bernoulli observation X, write $p=1/(1+e^{-\\theta})$ with θ real. What is Fisher information for θ?",
    "answers": [
      "$1/[p(1-p)]$",
      "$p^2$",
      "$1$",
      "$p(1-p)$"
    ],
    "correctAnswer": 3,
    "explanation": "The log-likelihood is Xθ−log(1+e^θ), with score X−p. Its variance/second moment is p(1−p), since E[X−p]=0. Information for p itself is 1/[p(1−p)]; parametrisation changes the information.",
    "objectiveIds": [
      "lo-statistics-maximum-likelihood",
      "lo-statistical-information"
    ],
    "knowledgeIds": [
      "def-likelihood-score",
      "ml-cross-entropy"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Differentiate with respect to the logit, not directly with respect to p."
    ]
  },
  {
    "id": "s2-stat-poisson-conditional",
    "category": "Statistics",
    "subcategory": "Sufficiency",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Three independent $\\operatorname{Poisson}(\\lambda)$ observations, λ>0, have sum T=2. What is $P(X_1=0\\mid T=2)$, and does it depend on λ?",
    "answers": [
      "4/9, independent of λ.",
      "e^(−λ), dependent on λ.",
      "1/3, independent of λ.",
      "1/2, dependent on λ."
    ],
    "correctAnswer": 0,
    "explanation": "Given the total, X₁ is Binomial(2,1/3), so the probability is (2/3)²=4/9. The common rate cancels from the joint mass divided by the total mass. T is sufficient by likelihood factorisation; the observations can also be viewed as unit-interval Poisson increments.",
    "objectiveIds": [
      "lo-statistics-sufficiency"
    ],
    "knowledgeIds": [
      "def-sufficiency",
      "result-poisson-sums",
      "result-conditional-poisson"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compare the joint mass with the mass of the sum."
    ]
  },
  {
    "id": "s2-stat-normal-two-statistics",
    "category": "Statistics",
    "subcategory": "Sufficiency",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "For n≥2 i.i.d. $N(\\mu,\\sigma^2)$ observations with both parameters unknown and σ²>0, which statistic is sufficient?",
    "answers": [
      "$\\sum_i1_{\\{X_i>0\\}}$ alone.",
      "$\\left(\\sum_iX_i,\\sum_iX_i^2\\right)$",
      "$\\bar X$ alone.",
      "$X_1$ alone."
    ],
    "correctAnswer": 1,
    "explanation": "The exponent expands as −(sum x_i²−2μ sum x_i+nμ²)/(2σ²); all data dependence involving parameters passes through the two displayed sums. A mean alone loses residual variation needed for the unknown variance. Factorisation works without making the observations deterministic functions of the statistic.",
    "objectiveIds": [
      "lo-statistics-sufficiency"
    ],
    "knowledgeIds": [
      "def-sufficiency"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Expand the quadratic in the joint normal density."
    ]
  },
  {
    "id": "s2-stat-known-variance-interval",
    "category": "Statistics",
    "subcategory": "Confidence intervals",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "An i.i.d. normal sample has n=25, known population standard deviation 10 and observed mean 3. Using 1.96 as the standard-normal 97.5% quantile, what is the two-sided 95% mean interval, to two decimal places?",
    "answers": [
      "$[-16.60,22.60]$",
      "$[2.216,3.784]$",
      "$[-0.92,6.92]$",
      "$[1.04,4.96]$"
    ],
    "correctAnswer": 2,
    "explanation": "The exact normal pivot uses standard error 10/√25=2. The margin is 1.96×2=3.92, giving [−0.92,6.92], up to rounding of the critical value. Using the population deviation instead of the standard error makes the interval too wide; a Student pivot is unnecessary with known variance.",
    "objectiveIds": [
      "lo-statistics-confidence-intervals"
    ],
    "knowledgeIds": [
      "def-confidence-interval",
      "result-normal-mean-pivot"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Convert population standard deviation into a standard error."
    ]
  },
  {
    "id": "s2-stat-exponential-lower-bound",
    "category": "Statistics",
    "subcategory": "Confidence intervals",
    "difficulty": "hard",
    "questionType": "implication",
    "prompt": "For n≥2 i.i.d. exponential observations of unknown rate λ>0, let $M=\\min_iX_i$. Which L(M) makes $[L(M),\\infty)$ an exact 95% confidence interval for λ?",
    "answers": [
      "$-\\log(0.05)/(nM)$",
      "$-\\log(0.95)/M$",
      "$-n\\log(0.95)/M$",
      "$-\\log(0.95)/(nM)$"
    ],
    "correctAnswer": 3,
    "explanation": "P(M>m)=e^(−nλm), so nλM is Exp(1). The event λ≥c/(nM) is nλM≥c, with probability e^(−c). Setting this to 0.95 gives c=−log(0.95). Using −log(0.05) gives only 5% coverage for this lower interval; reversing the bound changes the event.",
    "objectiveIds": [
      "lo-statistics-confidence-intervals"
    ],
    "knowledgeIds": [
      "result-exponential-minimum",
      "thm-test-confidence-duality"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Find the survival law of the minimum.",
      "Translate coverage of a lower bound into a survival event for a parameter-free pivot."
    ]
  },
  {
    "id": "s2-stat-binomial-errors",
    "category": "Statistics",
    "subcategory": "Hypothesis testing",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Test $H_0:p=1/2$ against larger p using three independent Bernoulli trials, rejecting only if all three succeed. At p=4/5, what are the Type I and Type II error probabilities?",
    "answers": [
      "$1/8$ and $61/125$",
      "$1/8$ and $64/125$",
      "$1/2$ and $1/5$",
      "$7/8$ and $61/125$"
    ],
    "correctAnswer": 0,
    "explanation": "Under the null rejection has probability (1/2)³=1/8. At the stated alternative power is (4/5)³=64/125, so Type II error is 1−64/125=61/125. Power is not Type II error, and its probability uses the alternative law.",
    "objectiveIds": [
      "lo-statistics-hypothesis-testing"
    ],
    "knowledgeIds": [
      "def-test-power"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Evaluate rejection under the null and non-rejection under the alternative separately."
    ]
  },
  {
    "id": "s2-stat-discrete-p-value",
    "category": "Statistics",
    "subcategory": "Hypothesis testing",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Under $H_0:p=1/2$, four independent Bernoulli trials produce three successes. For the one-sided alternative p>1/2, what is the exact nonrandomised upper-tail p-value?",
    "answers": [
      "11/16",
      "5/16",
      "1/4",
      "1/16"
    ],
    "correctAnswer": 1,
    "explanation": "It is P₀(S≥3)=choose(4,3)/16+choose(4,4)/16=5/16. The observed point probability 1/4 omits the more extreme all-success outcome. A discrete p-value need not be uniformly distributed under the null.",
    "objectiveIds": [
      "lo-statistics-hypothesis-testing"
    ],
    "knowledgeIds": [
      "def-valid-p-value",
      "def-test-power"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Sum probabilities of the observed result and every more extreme result."
    ]
  },
  {
    "id": "s2-stat-randomised-size",
    "category": "Statistics",
    "subcategory": "Hypothesis testing",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Under $H_0:p=1/2$, S is the success count in two independent Bernoulli trials. Reject if S=2, never reject if S=0, and reject with probability r if S=1. What r gives exact size 1/2?",
    "answers": [
      "3/4",
      "1",
      "1/2",
      "1/4"
    ],
    "correctAnswer": 2,
    "explanation": "The null masses are 1/4,1/2,1/4. Rejection probability is 1/4+r/2. Equating it to 1/2 gives r=1/2. Randomisation is conditional on a boundary outcome, rather than adding r directly to the overall size.",
    "objectiveIds": [
      "lo-statistics-hypothesis-testing"
    ],
    "knowledgeIds": [
      "def-test-power",
      "thm-neyman-pearson"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Average the rejection probability over the null count distribution."
    ]
  },
  {
    "id": "s2-stat-ols-line-fit",
    "category": "Statistics",
    "subcategory": "Regression",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Fit $y_i=\\alpha+\\beta x_i+\\varepsilon_i$ by ordinary least squares to x=(0,1,2), y=(1,2,2). What is $(\\hat\\alpha,\\hat\\beta)$?",
    "answers": [
      "$(1,1/2)$",
      "$(5/3,1)$",
      "$(1/2,7/6)$",
      "$(7/6,1/2)$"
    ],
    "correctAnswer": 3,
    "explanation": "The means are x̄=1 and ȳ=5/3. The centred cross sum is 1 and x-square sum is 2, so β̂=1/2. Then α̂=ȳ−β̂x̄=7/6. Minimisation is deterministic here and requires no error-distribution assumption.",
    "objectiveIds": [
      "lo-statistics-regression"
    ],
    "knowledgeIds": [
      "def-ordinary-least-squares"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Centre both coordinates for the slope, then recover the intercept."
    ]
  },
  {
    "id": "s2-stat-heteroskedastic-variance",
    "category": "Statistics",
    "subcategory": "Regression",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In the no-intercept model $Y_i=\\beta x_i+\\varepsilon_i$, x=(1,2), errors are independent and centred with variances (1,9). What is the variance of the OLS slope?",
    "answers": [
      "37/25",
      "1/5",
      "10/25",
      "9/5"
    ],
    "correctAnswer": 0,
    "explanation": "β̂=(Y₁+2Y₂)/5. Its random part is (ε₁+2ε₂)/5, with variance (1+4×9)/25=37/25. OLS remains unbiased, but a homoskedastic σ²/(sum x_i²) formula is not licensed by these unequal variances.",
    "objectiveIds": [
      "lo-statistics-regression"
    ],
    "knowledgeIds": [
      "def-ordinary-least-squares",
      "thm-gauss-markov",
      "result-bias-variance"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Write the slope as a linear combination of the two observations."
    ]
  },
  {
    "id": "s2-stat-omitted-variable-bias",
    "category": "Statistics",
    "subcategory": "Regression",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "Centred variables obey $Y=\\beta X+\\gamma Z+\\varepsilon$, with finite second moments, Var(X)>0 and Cov(X,ε)=0. What is the population slope if Y is regressed only on X?",
    "answers": [
      "$\\beta-\\gamma\\operatorname{Var}(Z)/\\operatorname{Var}(X)$",
      "$\\beta+\\gamma\\operatorname{Cov}(X,Z)/\\operatorname{Var}(X)$",
      "$\\beta$ regardless of Z.",
      "$\\beta+\\gamma$"
    ],
    "correctAnswer": 1,
    "explanation": "The population least-squares slope is Cov(X,Y)/Var(X). Expanding covariance gives βVar(X)+γCov(X,Z), because the error cross term is zero. An omitted variable affects the slope only through its effect and its association with X; centring alone does not eliminate that term.",
    "objectiveIds": [
      "lo-statistics-regression"
    ],
    "knowledgeIds": [
      "def-ordinary-least-squares",
      "result-linear-regression"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use the covariance-to-variance formula for a centred population regression."
    ]
  },
  {
    "id": "s2-stat-gamma-poisson-predictive",
    "category": "Statistics",
    "subcategory": "Bayesian inference",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A Poisson rate λ has Gamma(shape 2, rate 1) prior. Given λ, two unit-exposure counts are independent Poisson(λ); their observed sum is 3. What is the posterior predictive probability that a further unit-exposure count is zero?",
    "answers": [
      "$(1/2)^5$",
      "$(3/4)^2$",
      "$(3/4)^5$",
      "$e^{-5/3}$"
    ],
    "correctAnswer": 2,
    "explanation": "The likelihood contributes λ³e^(−2λ), giving Gamma(5,3) posterior. Conditional zero-count probability is e^(−λ); averaging against this posterior gives (3/(3+1))⁵. Substituting the posterior mean inside an exponential is not the predictive mixture.",
    "objectiveIds": [
      "lo-statistics-bayesian-inference"
    ],
    "knowledgeIds": [
      "result-conjugate-updates"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Update both shape and rate, then integrate the zero-count probability."
    ]
  },
  {
    "id": "s2-stat-normal-normal-update",
    "category": "Statistics",
    "subcategory": "Bayesian inference",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Let $\\theta\\sim N(0,1)$ and $Y\\mid\\theta\\sim N(\\theta,4)$, where the second normal argument is variance. After observing Y=3, what is the posterior mean and variance?",
    "answers": [
      "$(3/2,5)$",
      "$(3/5,1/5)$",
      "$(12/5,4/5)$",
      "$(3/5,4/5)$"
    ],
    "correctAnswer": 3,
    "explanation": "Prior precision is 1 and observation precision is 1/4, giving posterior variance 1/(1+1/4)=4/5. The mean is (0+3/4)/(5/4)=3/5. Precision weights are inverse variances; averaging the two variances is not a Bayesian update.",
    "objectiveIds": [
      "lo-statistics-bayesian-inference"
    ],
    "knowledgeIds": [
      "result-conjugate-updates"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Add precisions, then form a precision-weighted mean."
    ]
  },
  {
    "id": "s2-stat-dependent-predictive-trials",
    "category": "Statistics",
    "subcategory": "Bayesian inference",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A Bernoulli probability has a uniform Beta(1,1) prior. Two observed trials both succeed. What is the posterior predictive probability that two further conditionally independent trials both succeed?",
    "answers": [
      "3/5",
      "9/16",
      "3/4",
      "1/2"
    ],
    "correctAnswer": 0,
    "explanation": "The posterior is Beta(3,1), and the joint predictive probability is E[p²|data]=3×4/(4×5)=3/5. Multiplying the two marginal predictive success probabilities gives (3/4)²=9/16, which ignores dependence induced by the shared uncertain p.",
    "objectiveIds": [
      "lo-statistics-bayesian-inference"
    ],
    "knowledgeIds": [
      "result-conjugate-updates"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Average the conditional joint probability p², not the square of an average."
    ]
  },
  {
    "id": "s2-stat-log-mean-delta",
    "category": "Statistics",
    "subcategory": "Asymptotic statistics",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "$X_i$ are i.i.d. exponential with mean μ>0. What is the limiting law of $\\sqrt n(\\log\\bar X_n-\\log\\mu)$?",
    "answers": [
      "$\\operatorname{Exp}(1)$",
      "$N(0,1)$",
      "$N(0,\\mu^2)$",
      "$N(0,1/\\mu^2)$"
    ],
    "correctAnswer": 1,
    "explanation": "Exponential observations have variance μ². The sample-mean CLT has limiting variance μ²; the derivative of log at μ is 1/μ. The delta variance is (1/μ)²μ²=1. Each sample mean is positive almost surely, so the logarithm is defined.",
    "objectiveIds": [
      "lo-statistics-asymptotic-statistics"
    ],
    "knowledgeIds": [
      "thm-iid-clt",
      "thm-delta-method",
      "result-exponential-minimum"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Combine the sample-mean variance with the derivative of the transformation."
    ]
  },
  {
    "id": "s2-stat-poisson-studentisation",
    "category": "Statistics",
    "subcategory": "Asymptotic statistics",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "$X_i$ are i.i.d. Poisson(λ), λ>0. Define $Z_n=\\sqrt n(\\bar X_n-\\lambda)/\\sqrt{\\bar X_n}$ when the mean is positive, and Z_n=0 otherwise. What is its limiting law?",
    "answers": [
      "$t_{n-1}$ exactly.",
      "A point mass at zero.",
      "$N(0,1)$",
      "$N(0,\\lambda)$"
    ],
    "correctAnswer": 2,
    "explanation": "The CLT gives numerator limit N(0,λ), and the law of large numbers gives √mean→√λ in probability. Slutsky yields N(0,1). The zero-mean event has probability e^(−nλ)→0, so the stated convention does not alter the limit. This is asymptotic, not an exact Student pivot.",
    "objectiveIds": [
      "lo-statistics-asymptotic-statistics"
    ],
    "knowledgeIds": [
      "thm-iid-clt",
      "thm-slutsky",
      "thm-strong-law",
      "result-poisson-sums"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use consistency of the estimated standard deviation and then Slutsky."
    ]
  }
] satisfies MultipleChoiceQuestion[];
