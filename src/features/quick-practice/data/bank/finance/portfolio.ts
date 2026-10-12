import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-portfolio-total-return', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'A share starts at £100, ends at £104 and pays a £2 dividend during the period. Ignoring reinvestment and costs, what is the simple total return?',
    answers: ['4%', '6%', '2%', '104%'], correctAnswer: 1,
    explanation: m`Simple total return is $(P_1-P_0+D)/P_0$, where $D$ is cash income. Here $(104-100+2)/100=0.06=6\%$. Looking only at price appreciation omits the dividend.`,
  },
  {
    id: 'fin-portfolio-log-return', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'A non-dividend-paying asset rises from £100 to £110. What is its logarithmic return, approximately?',
    answers: ['10.00%', '11.00%', '9.53%', '−9.53%'], correctAnswer: 2,
    explanation: m`Log return is $\log(P_1/P_0)=\log(1.1)=0.09531\ldots$, or about 9.53%. Simple return is 10%. Log returns add across consecutive periods when calculated on a consistent total-return series.`,
  },
  {
    id: 'fin-portfolio-diversification', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'easy', questionType: 'implication',
    prompt: 'Two assets have equal positive volatility. You invest half in each. Compared with perfect positive correlation, what generally happens when their correlation is lower, holding all other inputs fixed?',
    answers: ['Expected return necessarily doubles.', 'Every loss becomes impossible.', 'Portfolio volatility necessarily equals zero.', 'Portfolio variance is lower.'], correctAnswer: 3,
    explanation: m`For equal volatility $\sigma$ and equal weights, variance is $\tfrac12\sigma^2(1+\rho)$. Lower correlation $\rho$ reduces the covariance contribution. Diversification reduces risk here but does not guarantee returns or zero volatility unless the specific cancellation conditions hold.`,
  },
  {
    id: 'fin-portfolio-variance', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'Two assets each have annual volatility 20%, correlation zero, and equal portfolio weights. What is the portfolio’s annual volatility, approximately?',
    answers: ['14.14%', '20.00%', '10.00%', '28.28%'], correctAnswer: 0,
    explanation: m`Variance is $w_1^2\sigma_1^2+w_2^2\sigma_2^2+2w_1w_2\rho\sigma_1\sigma_2$. Here it is $0.25(0.2)^2+0.25(0.2)^2=0.02$. Volatility is $\sqrt{0.02}=14.14\%$, not the average of the individual variances or volatilities.`,
  },
  {
    id: 'fin-portfolio-capm', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'Under CAPM, the risk-free rate is 3%, expected market return is 8% and an asset’s beta is 1.2. What is its model-implied expected return?',
    answers: ['9.6%', '9.0%', '6.0%', '13.2%'], correctAnswer: 1,
    explanation: m`CAPM gives $E[R_i]=r_f+\beta_i(E[R_m]-r_f)$. Thus $3\%+1.2(8\%-3\%)=9\%$. Beta scales the market risk premium, not the entire market return. This is a model relationship rather than a guaranteed realised return.`,
  },
  {
    id: 'fin-portfolio-sharpe', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A portfolio’s annual expected return is 10%, the annual risk-free rate is 2%, and annual excess-return volatility is 16%. What is its Sharpe ratio?',
    answers: ['0.625', '2', '0.5', '0.125'], correctAnswer: 2,
    explanation: m`Sharpe ratio is expected excess return divided by excess-return standard deviation: $(0.10-0.02)/0.16=0.5$. All inputs use the same horizon. It measures excess reward per unit of total volatility, unlike a ratio based on benchmark-relative tracking error.`,
  },
  {
    id: 'fin-portfolio-information-ratio', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A manager has expected annual return 2 percentage points above a benchmark and annual tracking error 4%. What is the information ratio?',
    answers: ['2', '0.25', '8', '0.5'], correctAnswer: 3,
    explanation: m`Information ratio is expected active return divided by tracking error, the standard deviation of portfolio-minus-benchmark returns. Thus $0.02/0.04=0.5$. Subtracting the risk-free rate would answer a different question.`,
  },
  {
    id: 'fin-portfolio-minimum-variance', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'hard', questionType: 'short_calculation',
    prompt: 'Two assets have volatilities 10% and 20% and zero correlation. A fully invested portfolio may choose any weights summing to one. What weight in the first asset minimises variance?',
    answers: ['80%', '50%', '20%', '67%'], correctAnswer: 0,
    explanation: m`Let $w$ be the first weight. Variance is $v(w)=0.01w^2+0.04(1-w)^2$. Setting $v'(w)=0.02w-0.08(1-w)=0$ gives $w=0.8$. The positive second derivative confirms a minimum; lower volatility receives more weight.`,
  },
  {
    "id": "fin-portfolio-factor-residual",
    "category": "Finance",
    "subcategory": "Portfolio theory and asset pricing",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In a one-factor excess-return model $R=\\beta F+\\varepsilon$, $\\beta=1.5$, $\\operatorname{Var}(F)=0.04$, $\\operatorname{Var}(\\varepsilon)=0.01$ and $\\operatorname{Cov}(F,\\varepsilon)=0$. What is $\\operatorname{Var}(R)$?",
    "answers": [
      "0.07",
      "0.10",
      "0.05",
      "0.025"
    ],
    "correctAnswer": 1,
    "explanation": "Variance is $\\beta^2\\operatorname{Var}(F)+\\operatorname{Var}(\\varepsilon)+2\\beta\\operatorname{Cov}(F,\\varepsilon)$. Here $1.5^2(0.04)+0.01=0.10$. Beta is squared in the variance contribution; residual risk does not vanish for a single asset."
  },
  {
    id: 'fin-portfolio-rebalancing', category: 'Finance', subcategory: 'Portfolio theory and asset pricing', difficulty: 'hard', questionType: 'short_calculation',
    prompt: 'Initially £100 is split equally between two assets. In period 1 their gross returns are 1.2 and 0.8; in period 2 they are 0.8 and 1.2. Ignore costs. What is terminal wealth if you rebalance to equal weights between periods, versus holding the initial units throughout?',
    answers: ['£96 rebalanced; £100 held', '£100 under both policies', '£100 rebalanced; £96 held', '£104 rebalanced; £96 held'], correctAnswer: 2,
    explanation: m`After period 1 holdings are £60 and £40. Rebalancing restores £50 each, and period 2 yields $50(0.8)+50(1.2)=100$. Without trading, $50(1.2)(0.8)+50(0.8)(1.2)=96$. This path demonstrates a difference, not a universal advantage of rebalancing.`,
  },
] satisfies MultipleChoiceQuestion[];
