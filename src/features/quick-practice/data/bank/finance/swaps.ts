import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-swaps-irs', category: 'Finance', subcategory: 'Swaps and other derivatives', difficulty: 'easy', questionType: 'concept_identification',
    prompt: 'Which description matches a conventional single-currency fixed-for-floating interest-rate swap?',
    answers: ['Exchanging ordinary shares for a bond permanently.', 'Exchanging fixed and floating interest payments on a reference notional.', 'Purchasing insurance against every operational loss.', 'Exchanging two currencies only at the current spot rate.'], correctAnswer: 1,
    explanation: 'The counterparties exchange interest streams calculated on a notional amount. In a conventional single-currency swap the notional itself is not exchanged. The floating reference and payment conventions must be specified in the contract.',
  },
  {
    id: 'fin-swaps-payment', category: 'Finance', subcategory: 'Swaps and other derivatives', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'On one swap payment date you pay fixed at 4% and receive floating at 5%, both on £1,000,000 with an accrual fraction of 0.5. What is your net cash flow?',
    answers: ['Pay £5,000.', 'Receive £10,000.', 'Receive £5,000.', 'Pay £20,000.'], correctAnswer: 2,
    explanation: m`Net receipt is $N\alpha(L-K)$, with notional $N$, accrual fraction $\alpha$, floating rate $L$ and fixed rate $K$. Here $1000000(0.5)(0.05-0.04)=5000$ pounds. Annual rates must be scaled to the payment period.`,
  },
  {
    id: 'fin-swaps-cds-direction', category: 'Finance', subcategory: 'Swaps and other derivatives', difficulty: 'easy', questionType: 'property_recognition',
    prompt: 'In a conventional credit default swap, what does the protection buyer do?',
    answers: ['Receive premiums and pay the default settlement.', 'Buy shares of the reference entity automatically.', 'Receive every coupon on the reference bond without paying anything.', 'Pay premiums and receive a contractual settlement after a covered credit event.'], correctAnswer: 3,
    explanation: 'The protection buyer pays for specified credit protection. A covered event triggers settlement according to the contract, often based on loss relative to recovery. The seller bears that contingent obligation; not every fall in a bond’s market price triggers payment.',
  },
  {
    id: 'fin-swaps-par-rate', category: 'Finance', subcategory: 'Swaps and other derivatives', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'In a single-curve model, a two-year annual-pay swap starts today. Discount factors at years 1 and 2 are 0.96 and 0.90. With a par floating leg and no spread, what fixed rate makes its initial value zero, approximately?',
    answers: ['5.38%', '10.00%', '3.23%', '4.00%'], correctAnswer: 0,
    explanation: m`The floating leg’s PV per unit notional is $1-D(2)=0.10$. Fixed-leg PV is $K\sum_i\alpha_iD(t_i)=K(0.96+0.90)$, with annual fractions $\alpha_i=1$. Hence $K=0.10/1.86=5.38\%$. Multi-curve pricing uses separately projected floating rates.`,
  },
  {
    id: 'fin-swaps-caplet', category: 'Finance', subcategory: 'Swaps and other derivatives', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A caplet pays at the end of its accrual period on £2,000,000 notional, accrual fraction 0.25 and strike 3%. The reference rate fixed at the period’s start is 4%. What is the payment?',
    answers: ['£20,000', '£5,000', '£15,000', '£0'], correctAnswer: 1,
    explanation: m`The caplet payoff is $N\alpha\max(L-K,0)$. Substitution gives $2000000(0.25)(0.04-0.03)=5000$ pounds. This is the future cash payment, not its discounted value today.`,
  },
  {
    id: 'fin-swaps-total-return', category: 'Finance', subcategory: 'Swaps and other derivatives', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'You receive the total return on a £1,000,000 reference position and pay financing of 4% per year for half a year, calculated simply on that initial notional. The asset rises 3% and pays income of 1% of initial value. Ignoring fees, what is your net period receipt?',
    answers: ['£40,000', '£30,000', '£20,000', '£0'], correctAnswer: 2,
    explanation: m`Total return is $1000000(0.03+0.01)=40000$ pounds. Financing is $1000000(0.04)(0.5)=20000$ pounds. Net receipt is £20,000. A total return swap transfers income and price changes without necessarily transferring legal ownership.`,
  },
  {
    id: 'fin-swaps-swaption', category: 'Finance', subcategory: 'Swaps and other derivatives', difficulty: 'medium', questionType: 'implication',
    prompt: 'A European payer swaption grants the right to enter a swap paying fixed at 3% and receiving floating. At exercise the comparable market par swap rate is 5%. Ignoring the already paid premium, why is exercise attractive?',
    answers: ['The holder can receive fixed at 5% under the contract.', 'The contract forces payment of 5% rather than 3%.', 'A payer swaption can only be exercised when rates fall.', 'Paying fixed at 3% is favourable relative to the market’s 5% fixed rate.'], correctAnswer: 3,
    explanation: m`A payer swaption benefits when the par swap rate $S$ exceeds strike $K$. Its swap value on exercise is proportional to the positive swap annuity times $S-K$. A receiver swaption instead grants the right to receive fixed.`,
  },
  {
    "id": "fin-swaps-fra-settlement",
    "category": "Finance",
    "subcategory": "Swaps and other derivatives",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "An FRA pays fixed $K=0.04$ and receives floating $L=0.06$ on £1,000,000 for accrual fraction $\\alpha=0.5$. It settles at the period’s start using $N\\alpha(L-K)/(1+\\alpha L)$. What receipt results to the nearest penny?",
    "answers": [
      "£9,708.74",
      "£10,000.00",
      "£10,300.00",
      "−£9,708.74"
    ],
    "correctAnswer": 0,
    "explanation": "The end-period interest difference is $1000000(0.5)(0.06-0.04)=10000$ pounds. Start-period settlement discounts it by $1+0.5(0.06)=1.03$, giving $10000/1.03=9708.74$. Receiving floating makes the difference positive when $L>K$."
  },
  {
    "id": "fin-swaps-cva",
    "category": "Finance",
    "subcategory": "Swaps and other derivatives",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In a simplified unilateral one-date CVA model, risk-neutral counterparty default probability is 2%, loss given default is 60%, positive exposure on default is fixed at £100,000, and the date’s discount factor is 0.95. Ignore own default. What credit valuation adjustment is deducted from the risk-free value?",
    "answers": [
      "£1,200",
      "£1,140",
      "£1,900",
      "£57,000"
    ],
    "correctAnswer": 1,
    "explanation": "CVA is discounted expected counterparty loss: $D\\times\\mathrm{PD}\\times\\mathrm{LGD}\\times E^+=0.95(0.02)(0.6)(100000)=1140$ pounds. Only positive exposure is at risk in this unilateral model. A full model integrates exposure and default over time."
  },
  {
    "id": "fin-swaps-wrong-way",
    "category": "Finance",
    "subcategory": "Swaps and other derivatives",
    "difficulty": "medium",
    "questionType": "concept_identification",
    "prompt": "You have positive exposure to a counterparty precisely in scenarios where its credit quality deteriorates sharply. What risk does this association describe?",
    "answers": [
      "Right-way risk: exposure falls as default propensity rises.",
      "Independent exposure and default propensity.",
      "Wrong-way risk",
      "Credit-spread risk with exposure falling as credit quality deteriorates."
    ],
    "correctAnswer": 2,
    "explanation": "Wrong-way risk means exposure tends to increase when the counterparty becomes more likely to default. Independent exposure/default modelling can then understate expected losses. Collateral, netting and currency arrangements require their own modelling rather than an automatic independence assumption."
  },
] satisfies MultipleChoiceQuestion[];
