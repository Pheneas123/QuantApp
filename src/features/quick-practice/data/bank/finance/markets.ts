import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-markets-primary', category: 'Finance', subcategory: 'Financial markets and instruments', difficulty: 'easy', questionType: 'concept_identification',
    prompt: 'A company issues new shares to investors to raise capital. In which market does this transaction occur?',
    answers: ['The secondary equity market', 'The primary equity market', 'The foreign-exchange spot market', 'The securities lending market'], correctAnswer: 1,
    explanation: 'The primary market places newly issued securities and raises money for the issuer. In a secondary-market sale, existing securities change hands and the seller normally receives the proceeds.',
  },
  {
    id: 'fin-markets-spread', category: 'Finance', subcategory: 'Financial markets and instruments', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'A share is quoted at a £49.90 bid and £50.10 ask. You buy one share and immediately sell it at these unchanged quotes. Ignoring fees, what is your profit?',
    answers: ['£0.20', '£0.00', '−£0.20', '−£0.10'], correctAnswer: 2,
    explanation: m`A buyer pays the ask and a seller receives the bid. Profit is $49.90-50.10=-0.20$ pounds. The £0.10 half-spread is the cost relative to the midpoint on one side only.`,
  },
  {
    id: 'fin-markets-claims', category: 'Finance', subcategory: 'Financial markets and instruments', difficulty: 'easy', questionType: 'property_recognition',
    prompt: 'For an ordinary company with conventional debt and ordinary shares, which statement correctly distinguishes the claims?',
    answers: ['Ordinary shareholders receive guaranteed coupons.', 'Bondholders own a residual share of all profits.', 'Debt and equity always have equal priority in insolvency.', 'Debt has contractual payments; ordinary equity is a residual ownership claim.'], correctAnswer: 3,
    explanation: 'Debt specifies contractual obligations, although default can prevent payment. Ordinary equity participates in residual value after higher-priority claims. Ownership does not guarantee a dividend or repayment of the investment.',
  },
  {
    id: 'fin-markets-leverage-return', category: 'Finance', subcategory: 'Financial markets and instruments', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'You buy £200 of shares using £100 of equity and £100 of borrowing. The shares fall by 10%. Ignoring interest, fees and margin calls, what is the return on your equity?',
    answers: ['−20%', '−10%', '−5%', '20%'], correctAnswer: 0,
    explanation: m`Asset value falls to $200(0.9)=180$. Debt remains £100, so equity becomes £80. The equity return is $(80-100)/100=-20\%$. Borrowing magnifies losses as well as gains.`,
  },
  {
    id: 'fin-markets-short-dividend', category: 'Finance', subcategory: 'Financial markets and instruments', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'You short 10 shares at £40 each and cover at £35 each. During the trade you must pay £1 per share in lieu of a dividend to the lender. Ignoring other costs, what is your profit?',
    answers: ['£50', '£40', '£60', '−£40'], correctAnswer: 1,
    explanation: m`Short-sale profit is sale proceeds minus repurchase cost minus dividend compensation: $10(40-35-1)=40$ pounds. A short seller does not retain dividends paid on borrowed shares.`,
  },
  {
    id: 'fin-markets-liquidity', category: 'Finance', subcategory: 'Financial markets and instruments', difficulty: 'medium', questionType: 'implication',
    prompt: 'Two shares have the same quoted spread, but one has much less depth near the best prices. What is the most defensible implication for a large immediate buy order?',
    answers: ['The two orders must have identical execution costs.', 'The shallower book guarantees a lower average purchase price.', 'The shallower book may require trading at higher ask prices.', 'Quoted spreads determine market depth uniquely.'], correctAnswer: 2,
    explanation: 'The best spread describes a small trade at the top of the book. A large order consumes available depth and may reach worse prices. Tight quotes alone do not establish sufficient liquidity for the desired size.',
  },
  {
    id: 'fin-markets-otc', category: 'Finance', subcategory: 'Financial markets and instruments', difficulty: 'medium', questionType: 'true_false_conceptual',
    prompt: 'Which statement about over-the-counter (OTC) derivatives is correct?',
    answers: ['OTC contracts cannot use collateral.', 'Every OTC derivative is cleared by an exchange.', 'OTC contracts eliminate counterparty risk by definition.', 'OTC terms can be negotiated, and some OTC contracts are centrally cleared.'], correctAnswer: 3,
    explanation: 'OTC describes trading outside an exchange, often with negotiable terms. Clearing and collateral are separate arrangements. They can reduce counterparty exposure but do not make all risks disappear.',
  },
  {
    "id": "fin-markets-crossed-arbitrage",
    "category": "Finance",
    "subcategory": "Financial markets and instruments",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "The same fungible share has an executable ask of £100.10 on venue A and bid of £100.40 on venue B for 100 shares. Fees are £0.05 per share per side. Assume simultaneous guaranteed fills and no transfer restrictions. What locked-in profit is available?",
    "answers": [
      "£20",
      "£30",
      "£10",
      "£40"
    ],
    "correctAnswer": 0,
    "explanation": "Buy on A and sell on B. Net profit per share is $100.40-100.10-2(0.05)=0.20$ pounds, so 100 shares earn £20. Without simultaneous fills or fungibility this quote comparison need not produce a riskless trade."
  },
  {
    id: 'fin-markets-maintenance-margin', category: 'Finance', subcategory: 'Financial markets and instruments', difficulty: 'hard', questionType: 'short_calculation',
    prompt: 'A margin account holds 100 shares and owes a fixed £6,000. Maintenance equity must be at least 25% of the shares’ market value. Ignoring interest and fees, below which share price is the requirement breached?',
    answers: ['£60', '£75', '£80', '£100'], correctAnswer: 2,
    explanation: m`For share price $P$, equity is $100P-6000$. At the boundary, $100P-6000=0.25(100P)$, hence $75P=6000$ and $P=80$ pounds. Below £80, the equity fraction is less than 25%.`,
  },
  {
    "id": "fin-markets-fx-triangle",
    "category": "Finance",
    "subcategory": "Financial markets and instruments",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "With no spreads or fees, £1 converts to $1.20, $1 converts to €0.90, and €1 converts to £0.95. All quotes are simultaneously executable. Starting with £1,000, what profit does the cycle GBP → USD → EUR → GBP produce?",
    "answers": [
      "−£26",
      "£80",
      "£0",
      "£26"
    ],
    "correctAnswer": 3,
    "explanation": "The cycle multiplier is $1.20\\times0.90\\times0.95=1.026$. The final amount is £1,026 and profit is £26. Currency units cancel along the cycle; reversing a quote without taking its reciprocal would be incorrect."
  },
] satisfies MultipleChoiceQuestion[];
