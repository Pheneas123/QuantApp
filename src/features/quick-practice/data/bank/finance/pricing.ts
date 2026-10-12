import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-pricing-replication', category: 'Finance', subcategory: 'Quantitative pricing and numerical finance', difficulty: 'easy', questionType: 'implication',
    prompt: 'In a frictionless market, a tradable portfolio exactly replicates a claim’s cash flows in every possible state. What must hold if there is no arbitrage?',
    answers: ['The claim must be more expensive because it is called a derivative.', 'The claim and replicating portfolio have the same current value.', 'The claim is priced only by its physical expected payoff.', 'The claim has zero value whenever its payoff is uncertain.'], correctAnswer: 1,
    explanation: 'Identical attainable future cash flows must have identical prices under no arbitrage. Otherwise buy the cheaper position and sell the dearer one to receive cash now with offsetting future obligations. Replication, not the label of the instrument, fixes its value.',
  },
  {
    id: 'fin-pricing-monte-carlo', category: 'Finance', subcategory: 'Quantitative pricing and numerical finance', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'Four risk-neutral Monte Carlo paths produce maturity payoffs £0, £10, £20 and £30. The deterministic maturity discount factor is 0.95. What is the estimated current value?',
    answers: ['£15.00', '£15.79', '£14.25', '£57.00'], correctAnswer: 2,
    explanation: m`Estimate the risk-neutral expected payoff by the sample average: $(0+10+20+30)/4=15$ pounds. Discount to today: $0.95(15)=14.25$. Four paths give a noisy estimate; the example illustrates the estimator rather than sufficient simulation accuracy.`,
  },
  {
    "id": "fin-pricing-calibration",
    "category": "Finance",
    "subcategory": "Quantitative pricing and numerical finance",
    "difficulty": "easy",
    "questionType": "concept_identification",
    "prompt": "What is model calibration to option market prices?",
    "answers": [
      "Estimating physical-return parameters solely from historical returns.",
      "Selecting parameters to maximise an in-sample trading strategy return.",
      "Adjusting observed option quotes to match fixed model parameters.",
      "Selecting model parameters to fit observed prices according to a specified objective."
    ],
    "correctAnswer": 3,
    "explanation": "Calibration estimates parameters by comparing model and market prices, for example through weighted squared errors. A good fit is neither proof of a correct model nor a guarantee of stable hedging. Historical estimation and risk-neutral calibration can target different quantities."
  },
  {
    id: 'fin-pricing-gbm-log', category: 'Finance', subcategory: 'Quantitative pricing and numerical finance', difficulty: 'medium', questionType: 'short_calculation',
    prompt: m`Under the risk-neutral measure, a non-dividend-paying share satisfies $dS_t/S_t=r\,dt+\sigma\,dW_t$ with $r=0.05$ and $\sigma=0.20$. What is the drift of $\log S_t$ per year?`,
    answers: ['0.03', '0.05', '0.07', '−0.15'], correctAnswer: 0,
    explanation: m`Itô’s lemma for $f(S)=\log S$ gives $d\log S=(r-\tfrac12\sigma^2)dt+\sigma dW$. Since $\tfrac12(0.20)^2=0.02$, log drift is $0.05-0.02=0.03$. The price’s percentage drift and log drift are different.`,
  },
  {
    id: 'fin-pricing-antithetic', category: 'Finance', subcategory: 'Quantitative pricing and numerical finance', difficulty: 'medium', questionType: 'short_calculation',
    prompt: m`Two unbiased payoff estimators $X,Y$ each have variance 4 and covariance −2. What is the variance of the antithetic pair average $(X+Y)/2$?`,
    answers: ['2', '1', '4', '0'], correctAnswer: 1,
    explanation: m`Variance of the average is $[\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)]/4=(4+4-4)/4=1$. Negative covariance improves on the variance 2 of an independent pair average. Pairing opposite random draws does not universally guarantee negative payoff covariance.`,
  },
  {
    id: 'fin-pricing-numerical-delta', category: 'Finance', subcategory: 'Quantitative pricing and numerical finance', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A pricing function gives £8.40 at spot £101 and £7.20 at spot £99. Using a centred spot bump of £1 about £100, what is the numerical delta?',
    answers: ['1.20', '7.80', '0.60', '−0.60'], correctAnswer: 2,
    explanation: m`The central difference is $[V(S+h)-V(S-h)]/(2h)$. With $h=1$, delta is $(8.40-7.20)/2=0.60$. It measures price change per pound of spot change; bump size balances discretisation bias against numerical or Monte Carlo noise.`,
  },
  {
    id: 'fin-pricing-hull-white', category: 'Finance', subcategory: 'Quantitative pricing and numerical finance', difficulty: 'medium', questionType: 'property_recognition',
    prompt: m`In the one-factor Hull–White short-rate model $dr_t=[\theta(t)-a r_t]dt+\sigma dW_t$, with $a,\sigma>0$, what role can the deterministic function $\theta(t)$ play?`,
    answers: ['It forces every rate path to be positive.', 'It removes all random movements from rates.', 'It is necessarily the same constant in every yield curve.', 'It allows the model to fit the initial discount curve under suitable regularity.'], correctAnswer: 3,
    explanation: 'The time-dependent drift can be chosen consistently with the observed initial term structure. The Gaussian short rate may still be negative. Fitting today’s curve does not automatically fit every interest-rate option or establish that future rate dynamics are correct.',
  },
  {
    id: 'fin-pricing-numeraire', category: 'Finance', subcategory: 'Quantitative pricing and numerical finance', difficulty: 'hard', questionType: 'theorem_recall',
    prompt: m`Let $N_t>0$ be a tradable numéraire and $Q^N$ its associated pricing measure. For a payoff $H_T$ replicated by a strategy whose relative value $V/N$ is a true martingale, which valuation identity holds?`,
    answers: [m`$V_t=N_t E^{Q^N}[H_T/N_T\mid\mathcal F_t]$`, m`$V_t=E^{Q^N}[H_T\mid\mathcal F_t]$ for every numéraire`, m`$V_t=N_T E^{Q^N}[H_T/N_t\mid\mathcal F_t]$`, m`$V_t=N_t E^{P}[H_T N_T\mid\mathcal F_t]$`], correctAnswer: 0,
    explanation: m`Under the numéraire measure, the suitably integrable relative value $V/N$ is a martingale, so $V_t/N_t=E^{Q^N}[H_T/N_T\mid\mathcal F_t]$. The numéraire and measure must change together. For $N_t$ equal to a maturity-$T$ zero-coupon bond, $N_T=1$, yielding the forward-measure pricing formula.`,
  },
  {
    "id": "fin-pricing-explicit-stability",
    "category": "Finance",
    "subcategory": "Quantitative pricing and numerical finance",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "After a change of variables, a pricing PDE becomes $u_\\tau=\\kappa u_{xx}$. Forward Euler in $\\tau$ and centred differences in $x$ require $\\kappa\\Delta\\tau/(\\Delta x)^2\\le1/2$ for stability on a uniform grid. If $\\kappa=0.02$ and $\\Delta x=0.1$, what is the largest permitted $\\Delta\\tau$?",
    "answers": [
      "0.50",
      "0.25",
      "0.10",
      "2.50"
    ],
    "correctAnswer": 1,
    "explanation": "Rearrange the stability condition: $\\Delta\\tau\\le(\\Delta x)^2/(2\\kappa)=0.01/0.04=0.25$. Refining space without reducing the explicit time step can destabilise the computation. The Black–Scholes PDE $V_t+\\tfrac12\\sigma^2S^2V_{SS}+rSV_S-rV=0$ can be transformed to a heat equation with appropriate variables and boundary data."
  },
  {
    id: 'fin-pricing-model-structure', category: 'Finance', subcategory: 'Quantitative pricing and numerical finance', difficulty: 'hard', questionType: 'property_recognition',
    prompt: 'Which combination correctly distinguishes standard Vasicek, CIR and Heston models with positive mean-reversion and volatility parameters?',
    answers: ['Vasicek short rates are strictly positive; CIR rates are Gaussian.', 'CIR has constant diffusion; Heston assumes deterministic variance.', 'Vasicek rates are Gaussian; CIR uses square-root rate diffusion; Heston uses stochastic square-root variance.', 'All three force the equity price itself to mean-revert to a fixed constant.'], correctAnswer: 2,
    explanation: m`Vasicek has $dr=\kappa(\theta-r)dt+\sigma dW$ and permits negative rates. CIR has $dr=\kappa(\theta-r)dt+\sigma\sqrt r\,dW$ and nonnegative rates; $2\kappa\theta\ge\sigma^2$ prevents hitting zero from a positive start. Heston uses a CIR-type variance process $dv=\kappa(\theta-v)dt+\xi\sqrt v\,dW^v$ coupled to equity returns, potentially with correlated Brownian drivers.`,
  },
] satisfies MultipleChoiceQuestion[];
