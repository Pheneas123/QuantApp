import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-options-call-profit', category: 'Finance', subcategory: 'Options', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'You buy a call with strike £50 for a £3 premium. At expiry the share is £58. Ignoring interest and fees, what is your profit per share?',
    answers: ['£8', '£5', '£11', '−£3'], correctAnswer: 1,
    explanation: m`The call payoff is $\max(S_T-K,0)=8$ pounds. Profit subtracts the premium: $8-3=5$ pounds. Payoff and profit differ because the premium is paid to acquire the option.`,
  },
  {
    id: 'fin-options-put-payoff', category: 'Finance', subcategory: 'Options', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'A long put has strike £60. The share price at expiry is £52. What is its payoff per share before subtracting the premium?',
    answers: ['−£8', '£0', '£8', '£52'], correctAnswer: 2,
    explanation: m`A put confers the right to sell at $K$. Its payoff is $\max(K-S_T,0)=\max(60-52,0)=8$ pounds. The holder can abandon an out-of-the-money put, so its payoff is never negative.`,
  },
  {
    id: 'fin-options-exercise-style', category: 'Finance', subcategory: 'Options', difficulty: 'easy', questionType: 'property_recognition',
    prompt: 'Which statement describes the standard distinction between European and American exercise styles?',
    answers: ['European options trade only in Europe; American options trade only in America.', 'European options require immediate exercise; American options forbid it.', 'European options are always calls; American options are always puts.', 'European exercise is only at expiry; American exercise may also occur earlier.'], correctAnswer: 3,
    explanation: 'The labels describe exercise rights, not trading location or payoff direction. Both calls and puts can have either style. A larger exercise opportunity set does not mean the holder should always exercise early.',
  },
  {
    id: 'fin-options-parity', category: 'Finance', subcategory: 'Options', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'European call and put options share strike £100 and maturity. A non-dividend-paying share costs £100, the strike’s discount factor is 0.95 and the call costs £10. Under frictionless put–call parity, what is the put price?',
    answers: ['£5', '£10', '£15', '£0'], correctAnswer: 0,
    explanation: m`Parity is $C-P=S_0-KD(T)$ for European options on a non-dividend-paying share. Here $10-P=100-95=5$, hence $P=5$ pounds. Discounting the strike is essential because it is paid at maturity.`,
  },
  {
    id: 'fin-options-intrinsic-time', category: 'Finance', subcategory: 'Options', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A call costs £9, with share price £105 and strike £100. Using intrinsic value as the immediate-exercise payoff, what are its intrinsic value and remaining time value?',
    answers: ['£9 intrinsic and £0 time', '£5 intrinsic and £4 time', '£4 intrinsic and £5 time', '£0 intrinsic and £9 time'], correctAnswer: 1,
    explanation: m`Intrinsic value is $\max(S-K,0)=5$ pounds. Time value under this decomposition is option price minus intrinsic value: $9-5=4$ pounds. This decomposition does not itself imply that immediate exercise is allowed or optimal.`,
  },
  {
    id: 'fin-options-binomial', category: 'Finance', subcategory: 'Options', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'In a one-period binomial model, a share at £100 ends at £120 or £80. The risk-free gross return is 1.05. A European call has strike £100. What is its no-arbitrage price, approximately?',
    answers: ['£10.00', '£12.50', '£11.90', '£9.52'], correctAnswer: 2,
    explanation: m`The risk-neutral up probability is $p=(1.05-0.8)/(1.2-0.8)=0.625$. Call payoffs are £20 and £0. Price is $[0.625(20)+0.375(0)]/1.05=11.90$ pounds. The physical up probability is unnecessary in this complete model.`,
  },
  {
    id: 'fin-options-delta-hedge', category: 'Finance', subcategory: 'Options', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'You are short 10 call contracts, each on 100 shares. Each call’s delta is 0.60 per underlying share. Which stock position makes the combined position locally delta-neutral?',
    answers: ['Short 600 shares.', 'Buy 1,000 shares.', 'Buy 60 shares.', 'Buy 600 shares.'], correctAnswer: 3,
    explanation: m`The short calls have delta $-10(100)(0.60)=-600$ share-equivalents. Buying 600 shares adds +600. Delta neutrality offsets first-order small spot moves only; gamma, volatility changes and hedge rebalancing still matter.`,
  },
  {
    "id": "fin-options-butterfly-arbitrage",
    "category": "Finance",
    "subcategory": "Options",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "European calls on the same asset and maturity have strikes £90, £100 and £110 and prices £14, £10 and £4. Assume frictionless trading. Buy one £90 call, sell two £100 calls and buy one £110 call. What initial cash is received by this nonnegative-payoff butterfly?",
    "answers": [
      "£2",
      "£0",
      "£4",
      "£10"
    ],
    "correctAnswer": 0,
    "explanation": "Cost is $14-2(10)+4=-2$ pounds, so £2 is received. Payoff is $(S_T-90)^+-2(S_T-100)^++(S_T-110)^+$, where $x^+=\\max(x,0)$. It is zero outside [90,110] and nonnegative inside. The quotes violate convexity in strike and permit arbitrage."
  },
  {
    "id": "fin-options-early-call",
    "category": "Finance",
    "subcategory": "Options",
    "difficulty": "hard",
    "questionType": "implication",
    "prompt": "In the frictionless Black–Scholes model with strictly positive interest rates, a strictly positive strike, no dividends and time remaining, why is early exercise of an in-the-money American call suboptimal?",
    "answers": [
      "A call has a negative payoff when in the money.",
      "Exercise gives up remaining optionality and pays the strike earlier than necessary.",
      "American calls forbid exercise before maturity.",
      "The call’s delta must be zero before expiry."
    ],
    "correctAnswer": 1,
    "explanation": "The European call lower bound is $C\\ge S-Ke^{-r\\tau}$, which exceeds $S-K$ for $r>0$, $K>0$, $\\tau>0$. The American call is worth at least the European call. Immediate exercise yields only $S-K$, sacrificing value; dividends can change this conclusion."
  },
  {
    "id": "fin-options-volatility-smile",
    "category": "Finance",
    "subcategory": "Options",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "Calls of the same maturity have systematically different Black–Scholes implied volatilities across strikes, using consistent spot, dividend and rate inputs. What does this show about a single constant-volatility Black–Scholes fit?",
    "answers": [
      "A single constant volatility still fits every strike because implied volatility only describes physical returns.",
      "The differences determine a unique local-volatility surface without additional assumptions.",
      "One constant volatility cannot match all these market prices simultaneously.",
      "The differences alone establish a violation of no-arbitrage across strikes."
    ],
    "correctAnswer": 2,
    "explanation": "Implied volatility is the model volatility that reproduces each individual price. Strike dependence shows a limitation of the single-volatility lognormal model. A smile can be compatible with no arbitrage; arbitrage checks must use price relationships, not simply unequal implied volatilities."
  },
] satisfies MultipleChoiceQuestion[];
