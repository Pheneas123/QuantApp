import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-forwards-payoff', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'A long forward requires buying one unit for £100 at maturity. The spot price then is £112. What is its maturity payoff, ignoring fees?',
    answers: ['−£12', '£12', '£112', '£100'], correctAnswer: 1,
    explanation: m`A long forward receives an asset worth $S_T$ and pays delivery price $K$. Its payoff is $S_T-K=112-100=12$ pounds. A newly agreed fair forward generally has zero initial value, but its later payoff need not be zero.`,
  },
  {
    id: 'fin-futures-marking', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'You hold two long futures contracts, each with a multiplier of £10 per index point. The settlement price rises from 4,000 to 4,007 today. What is today’s variation margin cash flow to you?',
    answers: ['−£140', '£70', '£140', '£14'], correctAnswer: 2,
    explanation: m`Daily marking to market transfers $nM\Delta F$, with contract count $n=2$, multiplier $M=10$ and change $\Delta F=7$. Thus $2(10)(7)=140$ pounds is received by the long. The short pays the corresponding amount.`,
  },
  {
    id: 'fin-futures-initial-margin', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'easy', questionType: 'property_recognition',
    prompt: 'What is the principal purpose of initial margin on a futures position?',
    answers: ['To pay the full notional upfront.', 'To guarantee a positive return.', 'To replace daily settlement.', 'To collateralise losses during default close-out.'], correctAnswer: 3,
    explanation: 'Initial margin is a performance safeguard rather than the purchase price of the underlying. Variation margin settles changes in value. Margin does not cap losses or guarantee profitability, and requirements can change.',
  },
  {
    id: 'fin-forwards-carry', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A non-dividend-paying share costs £100. Borrowing and lending are available at 5% annual effective for one year, with frictionless trading. What is its one-year no-arbitrage forward delivery price?',
    answers: ['£105', '£95', '£100', '£110'], correctAnswer: 0,
    explanation: m`Buying the share today with borrowed cash costs $S_0(1+r)^T$ at delivery. With $S_0=100$, $r=0.05$, $T=1$, the forward price is £105. This uses annual effective compounding; $100e^{0.05}$ would use a different rate convention.`,
  },
  {
    id: 'fin-forwards-dividend-yield', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'medium', questionType: 'short_calculation',
    prompt: m`An equity index has spot level 200, continuous risk-free rate $r=0.04$ and continuous dividend yield $q=0.01$. Under frictionless carry pricing, what is its two-year forward level to two decimal places?`,
    answers: ['216.66', '212.37', '206.00', '188.35'], correctAnswer: 1,
    explanation: m`Reinvested dividends reduce net financing cost. The forward level is $F_{0,T}=S_0e^{(r-q)T}=200e^{(0.04-0.01)2}=212.37$. The continuous yield and rate are assumed constant over the two years.`,
  },
  {
    id: 'fin-forwards-basis-hedge', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A producer owns one unit of a commodity and shorts one matching-unit futures contract at £80. At the hedge’s close, spot is £75 and futures is £77. Ignoring costs and settlement timing, what effective sale price is obtained?',
    answers: ['£80', '£72', '£78', '£82'], correctAnswer: 2,
    explanation: m`The spot sale earns £75 and the short futures gains $80-77=3$ pounds. The effective price is £78. Writing basis as $b=S-F$, the outcome is $F_0+b_T=80+(75-77)=78$; nonzero closing basis leaves basis risk.`,
  },
  {
    id: 'fin-forwards-convenience', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'medium', questionType: 'implication',
    prompt: m`In the commodity carry model $F=S e^{(r+u-y)T}$, $u$ is the continuous storage-cost rate and $y$ the convenience yield. Holding other inputs fixed, what does increasing $y$ do?`,
    answers: ['Raises the forward price.', 'Leaves the forward price unchanged.', 'Makes storage costs zero.', 'Lowers the forward price.'], correctAnswer: 3,
    explanation: m`Convenience yield represents benefits of holding physical inventory. It enters net carry with a minus sign, so $\partial F/\partial y=-TF<0$ for $T>0$. If $y>r+u$, the model gives a forward below spot, a form of backwardation.`,
  },
  {
    "id": "fin-forwards-cash-carry-arbitrage",
    "category": "Finance",
    "subcategory": "Forwards and futures",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A non-dividend-paying asset costs £100, one-year borrowing costs 5% annual effective, and its forward delivery price is £110. Assume no fees, unrestricted trading and certain delivery. What maturity profit results from borrowing £100, buying the asset and shorting the forward?",
    "answers": [
      "£5",
      "£10",
      "−£5",
      "£0"
    ],
    "correctAnswer": 0,
    "explanation": "Deliver the asset into the short forward for £110 and repay $100(1.05)=105$ pounds. Net profit is £5 with zero net initial cash. Under the stated conditions, the forward quote is above its £105 cash-and-carry price."
  },
  {
    id: 'fin-forwards-fx-covered', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'hard', questionType: 'short_calculation',
    prompt: 'Spot EUR/GBP is quoted as £0.85 per €1. Annual effective GBP and EUR rates are 5% and 2%. Under covered interest parity with unrestricted borrowing and lending, what is the one-year forward price in GBP per EUR, to four decimal places?',
    answers: ['£0.8257', '£0.8750', '£0.8500', '£0.8925'], correctAnswer: 1,
    explanation: m`With domestic GBP and foreign EUR, $F=S_0(1+r_{\mathrm{GBP}})/(1+r_{\mathrm{EUR}})=0.85(1.05)/(1.02)=0.8750$. Financing pounds and investing euros replicates the forward exchange. The rate ratio reverses if the quote convention is reversed.`,
  },
  {
    id: 'fin-forwards-existing-value', category: 'Finance', subcategory: 'Forwards and futures', difficulty: 'hard', questionType: 'short_calculation',
    prompt: 'An existing long forward on one non-dividend-paying share has delivery price £100, with one year remaining. Spot is £108 and the remaining-period annual effective risk-free rate is 4%. Assume frictionless trading. What is its current value to the nearest penny?',
    answers: ['£8.00', '£12.32', '£11.85', '£108.00'], correctAnswer: 2,
    explanation: m`Value of the existing long is $V=S-KD(T)$, where $D(T)=1/1.04$. Thus $V=108-100/1.04=11.85$ pounds. The new fair delivery price is $108(1.04)=112.32$, but a delivery price is not a contract’s present value.`,
  },
] satisfies MultipleChoiceQuestion[];
