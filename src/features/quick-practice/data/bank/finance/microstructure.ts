import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-micro-limit', category: 'Finance', subcategory: 'Market microstructure', difficulty: 'easy', questionType: 'concept_identification',
    prompt: 'Which order expresses an instruction to buy a share at £25 or less, without guaranteeing execution?',
    answers: ['A market buy order', 'A buy limit order at £25', 'A market sell order', 'An unconditional instruction to buy at any price'], correctAnswer: 1,
    explanation: 'A buy limit sets the maximum purchase price. It may remain unfilled if no eligible seller is available or orders ahead of it consume the supply. A market order prioritises immediacy rather than a specified price ceiling.',
  },
  {
    id: 'fin-micro-priority', category: 'Finance', subcategory: 'Market microstructure', difficulty: 'easy', questionType: 'property_recognition',
    prompt: 'In a pure price–time priority book with no hidden orders, buy orders A and B both bid £10. A arrived first. Buy order C bids £9.99. Which receives an incoming eligible sell order first?',
    answers: ['B, because it is newer', 'C, because it is cheaper', 'A, because it is earliest at the best bid', 'All three must share the fill equally'], correctAnswer: 2,
    explanation: 'Higher buy prices have priority. At the same price, earlier orders have priority in this specified matching rule. Other venues may use different allocation rules, such as pro rata.',
  },
  {
    id: 'fin-micro-stop-gap', category: 'Finance', subcategory: 'Market microstructure', difficulty: 'easy', questionType: 'implication',
    prompt: 'A sell stop-market order triggers at £90. The market gaps directly from £92 to £85. Which statement is correct?',
    answers: ['Execution at £90 is guaranteed.', 'The order becomes a limit order at £90.', 'The order cannot execute below £90.', 'The triggered market order may execute around £85 or worse.'], correctAnswer: 3,
    explanation: 'The stop price is a trigger, not a guaranteed execution price. Once triggered, a stop-market order seeks available bids, which can be far below the trigger after a gap. A stop-limit has different execution risks.',
  },
  {
    id: 'fin-micro-walk-book', category: 'Finance', subcategory: 'Market microstructure', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'The ask book contains 100 shares at £10.00 and 200 at £10.03. A market buy fills 150 shares against this unchanged book. Ignoring fees, what is its average execution price?',
    answers: ['£10.01', '£10.03', '£10.02', '£10.00'], correctAnswer: 0,
    explanation: m`The order takes 100 shares at £10.00 and 50 at £10.03. The volume-weighted price is $(100\times10+50\times10.03)/150=10.01$ pounds. The best ask applies only to the first 100 shares.`,
  },
  {
    id: 'fin-micro-vwap', category: 'Finance', subcategory: 'Market microstructure', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'Trades in a benchmark window are 100 shares at £20 and 300 at £22. What is the volume-weighted average price (VWAP)?',
    answers: ['£21.00', '£21.50', '£22.00', '£20.50'], correctAnswer: 1,
    explanation: m`VWAP is $\sum_i v_i p_i/\sum_i v_i$, where $v_i$ is traded volume and $p_i$ is price. Here $(100\times20+300\times22)/400=21.50$ pounds. An unweighted average would be £21.`,
  },
  {
    "id": "fin-micro-twap",
    "category": "Finance",
    "subcategory": "Market microstructure",
    "difficulty": "easy",
    "questionType": "property_recognition",
    "prompt": "A basic TWAP algorithm must buy 12,000 shares over six equal time intervals. Ignoring adaptive changes, which schedule matches that objective?",
    "answers": [
      "Buy everything in the interval with the most historical volume.",
      "Buy 6,000 shares in each interval.",
      "Target 2,000 shares in each interval.",
      "Guarantee a fill exactly at the day’s VWAP."
    ],
    "correctAnswer": 2,
    "explanation": "A basic time-weighted schedule allocates equal quantity to equal time intervals: $12000/6=2000$. This does not guarantee execution at the TWAP benchmark and need not follow the market’s volume profile."
  },
  {
    "id": "fin-micro-imbalance",
    "category": "Finance",
    "subcategory": "Market microstructure",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "At the best prices, bid depth is $B=900$ shares and ask depth is $A=300$. Using imbalance $I=(B-A)/(B+A)$, what is $I$?",
    "answers": [
      "−0.5",
      "2",
      "0.25",
      "0.5"
    ],
    "correctAnswer": 3,
    "explanation": "Substitution gives $I=(900-300)/(900+300)=600/1200=0.5$. Positive imbalance means more displayed bid depth under this definition. It is a signal, not a guarantee that prices will rise."
  },
  {
    "id": "fin-micro-adverse-selection",
    "category": "Finance",
    "subcategory": "Market microstructure",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Conditional on a dealer’s ask being lifted, the asset’s eventual value is £102 with probability 0.6 and £98 otherwise. A sale incurs a £0.10 cost per share. For zero conditional expected profit on this sale, what ask is required? Ignore funding, discounting and inventory carry; profit is undiscounted sale price minus eventual value minus sale cost.",
    "answers": [
      "£100.50",
      "£100.80",
      "£100.10",
      "£99.30"
    ],
    "correctAnswer": 0,
    "explanation": "Conditional expected value is $0.6(102)+0.4(98)=100.4$. For ask $a$, expected sale profit is $a-100.4-0.1$, so $a=100.5$. Conditioning on a fill captures informed order flow; an unconditional midpoint can miss adverse selection."
  },
  {
    id: 'fin-micro-inventory', category: 'Finance', subcategory: 'Market microstructure', difficulty: 'hard', questionType: 'implication',
    prompt: 'A dealer is excessively long an asset. Holding the spread width fixed and assuming fill probability falls as a quote becomes less attractive, which quote adjustment encourages inventory reduction?',
    answers: ['Raise both bid and ask.', 'Lower both bid and ask.', 'Raise the bid and lower the ask.', 'Keep both bid and ask fixed.'], correctAnswer: 1,
    explanation: 'Lowering the bid discourages further purchases, while lowering the ask encourages customers to buy from the dealer. Together these shift the quote centre downward and favour selling inventory. Actual optimal quotes also depend on adverse selection and volatility.',
  },
  {
    "id": "fin-micro-execution-tradeoff",
    "category": "Finance",
    "subcategory": "Market microstructure",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "You must buy one share. Buying immediately costs £100.02. A limit order at £100 fills with probability 0.6; if unfilled, a later compulsory purchase costs £100.10. Ignoring fees and risk preferences, what is the limit policy’s expected cost minus the immediate cost?",
    "answers": [
      "−£0.02",
      "£0.04",
      "£0.02",
      "−£0.04"
    ],
    "correctAnswer": 2,
    "explanation": "Expected cost is $0.6(100)+0.4(100.10)=100.04$. Relative to £100.02, it is £0.02 more expensive. A limit price improves filled trades but does not remove the opportunity cost of failing to execute."
  },
] satisfies MultipleChoiceQuestion[];
