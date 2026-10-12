import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-risk-funding', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'easy', questionType: 'concept_identification',
    prompt: 'A firm owns valuable long-term assets but cannot obtain cash in time to meet tomorrow’s margin payment. Which risk is most directly illustrated?',
    answers: ['Only equity-price volatility', 'Funding liquidity risk', 'A guaranteed accounting profit', 'The absence of counterparty exposure'], correctAnswer: 1,
    explanation: 'Funding liquidity risk concerns meeting cash obligations when due. Valuable assets may be difficult or costly to sell quickly, connecting funding liquidity with market liquidity. An apparently solvent balance sheet alone does not ensure timely cash availability.',
  },
  {
    id: 'fin-risk-var-meaning', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'easy', questionType: 'property_recognition',
    prompt: 'A continuous one-day loss distribution has 99% VaR of £1 million. Which interpretation is correct under the model?',
    answers: ['Loss can never exceed £1 million.', 'Expected loss is exactly £1 million.', 'The probability of a loss exceeding £1 million is 1%.', 'A £1 million profit occurs with probability 99%.'], correctAnswer: 2,
    explanation: 'VaR is a loss quantile for a specified horizon and confidence level. Continuity gives a 1% exceedance probability here. It is neither the maximum possible loss nor the average loss in the tail; model estimates need not match realised frequencies exactly.',
  },
  {
    id: 'fin-risk-stress', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'easy', questionType: 'property_recognition',
    prompt: 'Which statement correctly distinguishes a stress scenario from a probabilistic risk forecast?',
    answers: ['Every stress scenario needs an exact estimated probability.', 'Stress testing measures only routine daily fluctuations.', 'A stress loss always equals the model’s 99% VaR.', 'A stress scenario can explore severe conditions without an exact probability.'], correctAnswer: 3,
    explanation: 'Stress testing asks how a portfolio behaves under specified shocks, including combinations poorly represented in historical samples. It complements quantile-based forecasts. A scenario’s severity does not itself determine its probability.',
  },
  {
    id: 'fin-risk-normal-var', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'medium', questionType: 'short_calculation',
    prompt: m`One-day loss is normal with mean £10,000 and standard deviation £50,000. Using the 99% standard-normal quantile $z=2.326$, what is the model’s 99% one-day VaR?`,
    answers: ['£126,300', '£116,300', '£106,300', '£60,000'], correctAnswer: 0,
    explanation: m`For $L\sim N(\mu,\sigma^2)$, $\mathrm{VaR}_{0.99}=\mu+z\sigma$. Thus $10000+2.326(50000)=126300$ pounds. Loss is defined as positive here; using a profit distribution requires reversing the tail and sign appropriately.`,
  },
  {
    id: 'fin-risk-discrete-es', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'In 100 equally likely scenarios, losses are £0 in 95, £10 in 4 and £100 in 1. Define 95% Expected Shortfall as the average loss in the worst 5% of scenarios. What is it?',
    answers: ['£100', '£28', '£10', '£1.40'], correctAnswer: 1,
    explanation: m`The worst five scenarios contain four £10 losses and one £100 loss, giving $(4(10)+100)/5=28$ pounds. For distributions with atoms, tail averaging must specify how the quantile boundary is weighted; the equally likely scenario definition removes that ambiguity.`,
  },
  {
    id: 'fin-risk-backtest-exceptions', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A correctly calibrated continuous 99% daily VaR model is observed for 250 days. What is the expected number of exceedances, regardless of whether exceedances are independent?',
    answers: ['0', '25', '2.5', '1'], correctAnswer: 2,
    explanation: m`Each day’s exceedance indicator has expectation 0.01, so linearity gives $E[\sum_{t=1}^{250}I_t]=250(0.01)=2.5$. Independence is needed for a binomial count distribution, not for this mean. The realised count must be an integer, but its expectation need not be.`,
  },
  {
    id: 'fin-risk-garch', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'medium', questionType: 'short_calculation',
    prompt: m`A GARCH(1,1) variance forecast uses $h_{t+1}=\omega+\alpha\varepsilon_t^2+\beta h_t$. With $\omega=0.00001$, $\alpha=0.1$, $\beta=0.85$, $\varepsilon_t=0.02$ and $h_t=0.0004$, what is $h_{t+1}$?`,
    answers: ['0.00235', '0.00035', '0.00040', '0.00039'], correctAnswer: 3,
    explanation: m`Square the shock before weighting it: $0.00001+0.1(0.02)^2+0.85(0.0004)=0.00001+0.00004+0.00034=0.00039$. This is conditional variance, not volatility; volatility would be its square root.`,
  },
  {
    id: 'fin-risk-var-nonsubadditive', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'hard', questionType: 'counterexample_recognition',
    prompt: m`Independent losses $X,Y$ each equal £100 with probability 0.04 and £0 otherwise. Define $\mathrm{VaR}_{0.95}(L)=\inf\{x:P(L\le x)\ge0.95\}$. Which statement is correct?`,
    answers: [m`Individual VaRs are £0 each; the sum’s VaR is £100.`, m`Individual VaRs are £0 each; the sum’s VaR is £0.`, m`Individual VaRs are £100 each; the sum’s VaR is £200.`, m`Individual VaRs are £0 each; the sum’s VaR is £200.`], correctAnswer: 0,
    explanation: m`Each individual has $P(X=0)=0.96>0.95$. The sum has $P(X+Y=0)=0.96^2=0.9216<0.95$, but $P(X+Y\le100)=1-0.04^2=0.9984$. Its 95% quantile is £100, exceeding the sum of individual VaRs. Thus VaR need not be subadditive.`,
  },
  {
    "id": "fin-risk-frtb",
    "category": "Finance",
    "subcategory": "Financial risk management",
    "difficulty": "hard",
    "questionType": "property_recognition",
    "prompt": "In the Basel revised market-risk framework (FRTB), which description captures the internal-model Expected Shortfall measure’s core design?",
    "answers": [
      "99% one-tailed Expected Shortfall with a single liquidity horizon and current calibration.",
      "97.5% one-tailed Expected Shortfall with stressed calibration and risk-factor liquidity horizons.",
      "97.5% one-tailed Expected Shortfall with current calibration and one universal liquidity horizon.",
      "97.5% one-tailed VaR with stressed calibration and risk-factor liquidity horizons."
    ],
    "correctAnswer": 1,
    "explanation": "The Basel framework’s internal-model market-risk measure uses 97.5% one-tailed Expected Shortfall, a stressed calibration and differing liquidity horizons. This is a design principle, not a claim about every jurisdiction’s implementation timetable or the complete capital formula. Simulation still depends on model assumptions."
  },
  {
    id: 'fin-risk-time-scaling', category: 'Finance', subcategory: 'Financial risk management', difficulty: 'hard', questionType: 'theorem_conditions',
    prompt: 'Under which assumptions is scaling a zero-mean one-day loss quantile by the square root of 10 exact for a ten-day additive loss?',
    answers: ['Any loss process, provided the sample is large.', 'Perfectly correlated daily losses with arbitrary tails.', 'Independent identically distributed zero-mean Gaussian daily losses.', 'A GARCH process with known current variance, regardless of subsequent shocks.'], correctAnswer: 2,
    explanation: m`For independent daily Gaussian losses with mean zero and variance $\sigma^2$, their sum is Gaussian with variance $10\sigma^2$. Its quantile therefore scales by $\sqrt{10}$. Nonzero means scale linearly, while serial dependence, changing conditional volatility or non-Gaussian tails can invalidate this exact rule.`,
  },
] satisfies MultipleChoiceQuestion[];
