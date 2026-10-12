import type { MultipleChoiceQuestion } from '../schema';
const m = String.raw;

export default [
  {
    id: "stat-001", category: "Statistics",
    subcategory: "Estimation", difficulty: "easy",
    questionType: "short_calculation",
    prompt: m`If $X_1,\ldots,X_n$ are integrable with common mean $\mu$, what is $E[\bar X_n]$?`,
    answers: [
      m`$n\mu$`,
      m`$\mu/n$`,
      m`$0$`,
      m`$\mu$`,
    ],
    correctAnswer: 3,
    explanation: m`Linearity of expectation gives nμ/n=μ. Independence is not required for this expectation.`,
  },
  {
    id: "stat-002", category: "Statistics",
    subcategory: "Bias, variance and MSE", difficulty: "easy",
    questionType: "short_calculation",
    prompt: m`For independent observations with common variance $\sigma^2$, what is $\operatorname{Var}(\bar X_n)$?`,
    answers: [
      m`$\sigma^2/n$`,
      m`$\sigma^2$`,
      m`$n\sigma^2$`,
      m`$\sigma/\sqrt n$`,
    ],
    correctAnswer: 0,
    explanation: m`The sum has variance nσ² and dividing by n multiplies variance by 1/n². The standard error is σ/√n, not the variance.`,
  },
  {
    id: "stat-003", category: "Statistics",
    knowledgeIds: ['def-sufficiency'],
    subcategory: "Sufficiency", difficulty: "medium",
    questionType: "property_recognition",
    prompt: m`For $n\ge3$ i.i.d. Bernoulli$(p)$ observations with $0<p<1$, which statistic is sufficient for $p$?`,
    answers: [
      m`$X_1$`,
      m`$\sum_{i=1}^nX_i$`,
      m`$\min_i X_i$`,
      m`$\max_i X_i$`,
    ],
    correctAnswer: 1,
    explanation: m`The likelihood is p raised to the number of successes times (1−p) raised to the number of failures. It factors through the sum; the other statistics lose relevant success-count information.`,
  },
  {
    id: "stat-004", category: "Statistics",
    knowledgeIds: ['def-maximum-likelihood'],
    subcategory: "Maximum likelihood", difficulty: "easy",
    questionType: "definition_recognition",
    prompt: m`Given observed $x$ and model densities $f_\theta$, which optimisation defines an MLE when a maximiser exists?`,
    answers: [
      m`Maximise $f_\theta(x)$ over $\theta$.`,
      m`Maximise $f_\theta(x)$ over $x$ at fixed $\theta$.`,
      m`Maximise $f_\theta(x)\pi(\theta)$ over $\theta$ for a specified prior.`,
      m`Minimise $E_\theta[(T(X)-\theta)^2]$ over estimators $T$.`,
    ],
    correctAnswer: 0,
    explanation: m`Maximum likelihood treats the observed data as fixed and varies the parameter. Including a prior instead gives a maximum a posteriori criterion.`,
  },
  {
    id: "stat-005", category: "Statistics",
    knowledgeIds: ['def-confidence-interval'],
    subcategory: "Confidence intervals", difficulty: "medium",
    questionType: "true_false_conceptual",
    prompt: m`What does exact 95% frequentist coverage of an interval procedure $C(X)$ mean?`,
    answers: [
      m`For the realised data, $\theta$ has conditional probability 0.95 of lying in $C(X)$.`,
      m`For each fixed $\theta$, a future observation lies in $C(X)$ with probability 0.95.`,
      m`For each fixed $\theta$, $P_\theta\{\theta\in C(X)\}=0.95$ over repeated samples.`,
      m`For each realised interval, 95% of possible parameter values lie in $C(X)$.`,
    ],
    correctAnswer: 2,
    explanation: m`The randomness is in the sample and hence the interval. The parameter is fixed; a posterior probability statement needs a Bayesian model.`,
  },
  {
    "id": "stat-006",
    "category": "Statistics",
    "knowledgeIds": [
      "thm-basu",
      "def-sufficiency"
    ],
    "subcategory": "Sufficiency",
    "difficulty": "medium",
    "questionType": "theorem_conditions",
    "prompt": "Basu's theorem makes a sufficient statistic $T$ independent of every ancillary statistic. Which additional property of $T$ gives the standard theorem?",
    "answers": [
      "Consistency.",
      "Completeness.",
      "Asymptotic normality.",
      "Minimal sufficiency alone."
    ],
    "correctAnswer": 1,
    "explanation": "Completeness together with sufficiency gives the independence conclusion. Minimal sufficiency by itself does not give Basu's theorem."
  },
  {
    id: "stat-007", category: "Statistics",
    knowledgeIds: ['result-bias-variance'],
    subcategory: "Bias, variance and MSE", difficulty: "easy",
    questionType: "theorem_recall",
    prompt: m`For an estimator $T$ with finite second moment, which identity is the MSE decomposition at $\theta$?`,
    answers: [
      m`$E_\theta[(T-\theta)^2]=\operatorname{Var}_\theta(T)+(E_\theta T-\theta)^2$.`,
      m`$E_\theta[(T-\theta)^2]=\operatorname{Var}_\theta(T)+(E_\theta T-\theta)$.`,
      m`$E_\theta[(T-\theta)^2]=\operatorname{Var}_\theta(T)-(E_\theta T-\theta)^2$.`,
      m`$E_\theta[(T-\theta)^2]=(\operatorname{Var}_\theta T)^2+(E_\theta T-\theta)^2$.`,
    ],
    correctAnswer: 0,
    explanation: m`Centre T around its expectation. The cross term has expectation zero, leaving variance plus squared bias.`,
  },
  {
    "id": "stat-008",
    "category": "Statistics",
    "subcategory": "Estimation",
    "difficulty": "easy",
    "questionType": "definition_recall",
    "prompt": "What does consistency of estimators $T_n$ for $\\theta$ mean?",
    "answers": [
      "$E_\\theta T_n=\\theta$ for every $n$ and $\\theta$.",
      "$P_\\theta(|T_n-\\theta|>\\varepsilon)\\to0$ for every $\\varepsilon>0$ and $\\theta$.",
      "$\\operatorname{Var}_\\theta(T_n)\\to0$ for every $\\theta$, regardless of bias.",
      "$\\sqrt n(T_n-\\theta)$ converges almost surely to zero for every $\\theta$."
    ],
    "correctAnswer": 1,
    "explanation": "Consistency is convergence in probability to the parameter. Unbiasedness at finite sample sizes and vanishing variance alone are different properties."
  },
  {
    id: "stat-009", category: "Statistics",
    knowledgeIds: ['def-maximum-likelihood'],
    subcategory: "Maximum likelihood", difficulty: "medium",
    questionType: "short_calculation",
    prompt: m`For $n$ i.i.d. exponential observations with rate $\lambda>0$ and sum $S>0$, what is the MLE of $\lambda$?`,
    answers: [
      m`$S/n$`,
      m`$1/S$`,
      m`$n/S$`,
      m`$S$`,
    ],
    correctAnswer: 2,
    explanation: m`The log likelihood is $n\log\lambda-\lambda S$. Its derivative vanishes at $n/S$, and its second derivative is negative.`,
  },
  {
    id: "stat-010", category: "Statistics",
    subcategory: "Hypothesis testing", difficulty: "easy",
    questionType: "definition_recognition",
    prompt: m`For a composite null $\Theta_0$, what does a test of level at most $\alpha$ guarantee?`,
    answers: [
      m`$\sup_{\theta\notin\Theta_0}P_\theta(\text{accept }H_0)\le\alpha$.`,
      m`$P(H_0\text{ is true}\mid\text{reject }H_0)\le\alpha$.`,
      m`$\inf_{\theta\notin\Theta_0}P_\theta(\text{reject }H_0)\le\alpha$.`,
      m`$\sup_{\theta\in\Theta_0}P_\theta(\text{reject }H_0)\le\alpha$.`,
    ],
    correctAnswer: 3,
    explanation: m`Level controls the worst-case rejection probability under the null. It is not a posterior probability that the null is true.`,
  },
  {
    id: "stat-011", category: "Statistics",
    knowledgeIds: ['thm-neyman-pearson'],
    subcategory: "Hypothesis testing", difficulty: "medium",
    questionType: "theorem_recall",
    prompt: m`For testing simple densities $f_0$ against $f_1$, the Neyman–Pearson most powerful test of a given level rejects for which observations, allowing boundary randomisation?`,
    answers: [
      m`Large $f_1(x)/f_0(x)$.`,
      m`Small $f_1(x)/f_0(x)$.`,
      m`Large $f_0(x)f_1(x)$.`,
      m`Small $f_0(x)+f_1(x)$.`,
    ],
    correctAnswer: 0,
    explanation: m`A large likelihood ratio favours the alternative relative to the null. A threshold and possibly boundary randomisation achieve the required size.`,
  },
  {
    "id": "stat-012",
    "category": "Statistics",
    "knowledgeIds": [
      "def-confidence-interval",
      "result-student-pivot"
    ],
    "subcategory": "Confidence intervals",
    "difficulty": "easy",
    "questionType": "theorem_conditions",
    "prompt": "For $n\\ge2$, under which sampling assumption does $(\\bar X-\\mu)/(S/\\sqrt n)$ have exactly a $t_{n-1}$ law, with $S^2$ the usual unbiased sample variance?",
    "answers": [
      "Independent observations with a common finite mean and variance.",
      "I.i.d. normal observations with positive variance.",
      "I.i.d. symmetric observations with positive finite variance.",
      "Uncorrelated normal marginals with arbitrary joint dependence."
    ],
    "correctAnswer": 1,
    "explanation": "For an i.i.d. normal sample, the standardised mean is normal and independent of the scaled chi-square sample variance. Finite variance or symmetry alone gives no exact t law."
  },
  {
    "id": "stat-013",
    "category": "Statistics",
    "subcategory": "Regression",
    "difficulty": "medium",
    "questionType": "theorem_conditions",
    "prompt": "In the fixed-design model $Y=X\\beta+\\varepsilon$, assume $X$ has full column rank and $E\\varepsilon=0$. Which covariance assumption gives the usual Gauss–Markov BLUE conclusion for OLS?",
    "answers": [
      "$\\operatorname{Cov}(\\varepsilon)=\\operatorname{diag}(\\sigma_1^2,\\ldots,\\sigma_n^2)$ with unrestricted unequal entries.",
      "$\\operatorname{Cov}(\\varepsilon)=\\sigma^2\\mathbf1\\mathbf1^\\top$ with $\\sigma^2>0$.",
      "$\\operatorname{Cov}(\\varepsilon)=\\sigma^2 I$ with $0<\\sigma^2<\\infty$.",
      "$\\operatorname{Cov}(\\varepsilon)=\\Sigma$ with an arbitrary positive definite $\\Sigma$."
    ],
    "correctAnswer": 2,
    "explanation": "Homoskedastic uncorrelated errors make OLS minimum-variance among linear unbiased estimators. Normality is not needed for this conclusion.",
    "knowledgeIds": [
      "thm-gauss-markov"
    ]
  },
  {
    id: "stat-014", category: "Statistics",
    subcategory: "Bayesian inference", difficulty: "easy",
    questionType: "short_calculation",
    prompt: m`A Bernoulli success probability has prior $\operatorname{Beta}(a,b)$, with $a,b>0$. After $s$ successes in $n$ independent trials, what is its posterior?`,
    answers: [
      m`$\operatorname{Beta}(a+n,b+s)$`,
      m`$\operatorname{Beta}(a+n-s,b+s)$`,
      m`$\operatorname{Beta}(a+s,b+n)$`,
      m`$\operatorname{Beta}(a+s,b+n-s)$`,
    ],
    correctAnswer: 3,
    explanation: m`Multiply the prior kernel $p^{a-1}(1-p)^{b-1}$ by the likelihood $p^s(1-p)^{n-s}$. Successes add to the first shape parameter and failures to the second.`,
  },
  {
    id: "stat-015", category: "Statistics",
    subcategory: "Bayesian inference", difficulty: "medium",
    questionType: "property_recognition",
    prompt: m`If the posterior of $\theta$ has finite second moment, which action minimises posterior expected squared-error loss $E[(a-\theta)^2\mid X]$?`,
    answers: [
      m`The posterior mean.`,
      m`The posterior median.`,
      m`The posterior mode.`,
      m`The posterior 0.95 quantile.`,
    ],
    correctAnswer: 0,
    explanation: m`The posterior risk equals the posterior variance plus the square of the difference between a and the posterior mean. The latter term is minimised at the mean.`,
  },
  {
    id: "stat-016", category: "Statistics",
    knowledgeIds: ['thm-delta-method'],
    subcategory: "Asymptotic statistics", difficulty: "medium",
    questionType: "theorem_recall",
    prompt: m`Suppose $\sqrt n(T_n-\theta)\Rightarrow N(0,v)$ with $v>0$, and $g$ is differentiable at $\theta$ with $g'(\theta)\ne0$. What is the delta-method limit for $\sqrt n(g(T_n)-g(\theta))$?`,
    answers: [
      m`$N(0,g'(\theta)v)$`,
      m`$N(0,[g'(\theta)]^2v)$`,
      m`$N(0,v/[g'(\theta)]^2)$`,
      m`$N(g'(\theta),v)$`,
    ],
    correctAnswer: 1,
    explanation: m`The first-order expansion multiplies the limiting centred normal variable by g′(θ), so its variance is multiplied by the square.`,
  },
  {
    id: "stat-017", category: "Statistics",
    knowledgeIds: ['thm-rao-blackwell', 'def-conditional-expectation'],
    subcategory: "Sufficiency", difficulty: "medium",
    questionType: "implication",
    prompt: m`Let $U$ be square-integrable and unbiased for $g(\theta)$, and let $T$ be sufficient. The Rao–Blackwell theorem uses $V=E[U\mid T]$ with a version independent of $\theta$. Which conclusion holds?`,
    answers: [
      m`V is unbiased and has strictly smaller variance at every θ.`,
      m`V is biased but always has smaller mean squared error.`,
      m`V is unbiased and has variance no greater than that of U.`,
      m`V is unbiased and necessarily independent of U.`,
    ],
    correctAnswer: 2,
    explanation: m`Total expectation preserves unbiasedness, and the total variance identity shows Var(V)≤Var(U). Equality is possible when U already depends only on T.`,
  },
  {
    id: "stat-018", category: "Statistics",
    knowledgeIds: ['def-maximum-likelihood'],
    subcategory: "Maximum likelihood", difficulty: "hard",
    questionType: "counterexample_recognition",
    prompt: m`For i.i.d. $U(0,\theta)$ observations, $\theta>0$, why does the usual identity $E_\theta[\partial_\theta\log f_\theta(X)]=0$ fail for the interior score of one observation?`,
    answers: [
      m`The density cannot be normalised for every positive θ.`,
      m`The parameter is not identifiable from the distribution.`,
      m`The single-observation variance is infinite.`,
      m`The support depends on θ, so a boundary term is lost by naive differentiation.`,
    ],
    correctAnswer: 3,
    explanation: m`Inside the support the score is $-1/\theta$, whose expectation is not zero. Differentiating the integral also changes its upper endpoint; regular fixed-support score arguments cannot omit that term.`,
  },
  {
    "id": "stat-019",
    "category": "Statistics",
    "knowledgeIds": [
      "thm-continuous-mapping"
    ],
    "subcategory": "Asymptotic statistics",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Let $X_i$ be i.i.d. $N(0,1)$ and $T_n=\\bar X_n^2$. What is the limiting distribution of $nT_n$?",
    "answers": [
      "$\\chi^2_1$",
      "$N(0,1)$",
      "$\\chi^2_2$",
      "$N(0,2)$"
    ],
    "correctAnswer": 0,
    "explanation": "$\\sqrt n\\,\\bar X_n$ is exactly standard normal, so its square is $\\chi^2_1$. The first derivative of $x^2$ vanishes at zero; a nondegenerate first-order delta approximation is inappropriate."
  },
  {
    id: "stat-020", category: "Statistics",
    subcategory: "Hypothesis testing", difficulty: "hard",
    questionType: "concept_identification",
    prompt: m`For $n$ i.i.d. $N(\theta,\sigma^2)$ observations with known $\sigma^2>0$ and parameter space $\theta\ge0$, test $H_0:\theta=0$ against $H_1:\theta>0$. Under $H_0$, what is the law of $2\log(\sup_{\theta\ge0}L(\theta)/L(0))$?`,
    answers: [
      m`$\chi^2_1$ without an atom at zero.`,
      m`$\tfrac12\delta_0+\tfrac12\chi^2_1$.`,
      m`$\tfrac12\chi^2_1+\tfrac12\chi^2_2$.`,
      m`$N(0,1)$ without truncation.`,
    ],
    correctAnswer: 1,
    explanation: m`The constrained MLE is $\max(0,\bar X)$. The statistic is $(\max(0,Z))^2$ for standard normal $Z$, so half its mass is at zero; the usual interior Wilks law does not apply.`,
  },
] satisfies MultipleChoiceQuestion[];
