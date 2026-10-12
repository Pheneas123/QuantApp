import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-credit-simple-interest', category: 'Finance', subcategory: 'Loans and credit', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'A £1,000 loan charges 6% simple interest per year for two years, with all principal and interest due at the end. What is the total repayment?',
    answers: ['£1,123.60', '£1,120.00', '£1,060.00', '£1,012.00'], correctAnswer: 1,
    explanation: m`Simple interest is $I=PrT$, where $P$ is principal, $r$ the annual rate and $T$ time in years. Here $I=1000(0.06)(2)=120$ pounds, so repayment is £1,120. Compound interest would instead earn interest on prior interest.`,
  },
  {
    id: 'fin-credit-compound-interest', category: 'Finance', subcategory: 'Loans and credit', difficulty: 'easy', questionType: 'short_calculation',
    prompt: '£1,000 grows at 5% annual effective interest for two years with no withdrawals. What is the final balance?',
    answers: ['£1,100.00', '£1,050.00', '£1,102.50', '£1,010.00'], correctAnswer: 2,
    explanation: m`Annual compounding gives $P(1+r)^T=1000(1.05)^2=1102.50$ pounds. The second year earns interest on both the original principal and the first year’s £50 interest.`,
  },
  {
    id: 'fin-credit-secured', category: 'Finance', subcategory: 'Loans and credit', difficulty: 'easy', questionType: 'implication',
    prompt: 'A loan is secured by collateral. Which conclusion is justified?',
    answers: ['Default becomes impossible.', 'Recovery must always equal the loan balance.', 'Collateral removes all legal and valuation uncertainty.', 'Collateral may reduce loss on default but does not prevent default.'], correctAnswer: 3,
    explanation: 'Security gives a claim on specified assets, subject to contractual and legal arrangements. Borrowers can still default, collateral can lose value and enforcement can cost money. A secured claim is not necessarily risk-free.',
  },
  {
    id: 'fin-credit-effective-rate', category: 'Finance', subcategory: 'Loans and credit', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A nominal annual interest rate is 12%, compounded monthly. Ignoring fees, what is the effective annual rate, approximately?',
    answers: ['12.68%', '12.00%', '1.00%', '14.40%'], correctAnswer: 0,
    explanation: m`The monthly rate is $0.12/12=0.01$. The annual accumulation factor is $(1.01)^{12}$, so the effective rate is $(1.01)^{12}-1\approx0.126825$, or 12.68%. A nominal quotation is not itself the effective annual rate.`,
  },
  {
    id: 'fin-credit-amortisation', category: 'Finance', subcategory: 'Loans and credit', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A loan has £10,000 outstanding, a monthly interest rate of 0.5%, and a £300 payment at month-end. With no fees, what principal remains immediately after the payment?',
    answers: ['£9,700', '£9,750', '£9,950', '£10,050'], correctAnswer: 1,
    explanation: m`Interest for the month is $10000(0.005)=50$ pounds. Of the £300 payment, £250 reduces principal. Equivalently, the new balance is $10000(1.005)-300=9750$ pounds.`,
  },
  {
    id: 'fin-credit-annuity', category: 'Finance', subcategory: 'Loans and credit', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A £1,000 loan is repaid with two equal payments at the ends of years 1 and 2. Interest is 10% annual effective. What is each payment to the nearest penny?',
    answers: ['£500.00', '£550.00', '£576.19', '£605.00'], correctAnswer: 2,
    explanation: m`For principal $P$, periodic rate $r$ and $n$ end-period payments, $A=Pr/[1-(1+r)^{-n}]$. Here $A=1000(0.1)/[1-(1.1)^{-2}]=576.19$ pounds. The payment includes interest and principal; £550 would leave a residual balance.`,
  },
  {
    id: 'fin-credit-ecl', category: 'Finance', subcategory: 'Loans and credit', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'For a simplified one-year credit exposure, default probability is 2%, loss given default is 60%, and exposure at default is £500,000. Treat loss given default and exposure as fixed and ignore discounting. What is expected loss?',
    answers: ['£10,000', '£300,000', '£16,667', '£6,000'], correctAnswer: 3,
    explanation: m`Expected loss is $\mathrm{PD}\times\mathrm{LGD}\times\mathrm{EAD}=0.02(0.60)(500000)=6000$ pounds. LGD is the fraction lost conditional on default. This simplified calculation is not a full accounting provision with multiple scenarios and discounting.`,
  },
  {
    "id": "fin-credit-risk-neutral-bond",
    "category": "Finance",
    "subcategory": "Loans and credit",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A bond pays £100 at year 1 if there is no default, and £40 at year 1 if default occurs. Risk-neutral one-year default probability is 5%; the risk-free annual effective rate is 4%. Under this model, what is the price to the nearest penny?",
    "answers": [
      "£93.27",
      "£96.15",
      "£95.00",
      "£97.00"
    ],
    "correctAnswer": 0,
    "explanation": "The risk-neutral expected payment is $0.95(100)+0.05(40)=97$. Discounting gives $97/1.04=93.27$ pounds. Physical default probabilities cannot generally replace risk-neutral ones for pricing; the recovery is explicitly paid at maturity here."
  },
  {
    "id": "fin-credit-dependent-ecl",
    "category": "Finance",
    "subcategory": "Loans and credit",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Two equally likely economic scenarios have conditional default probabilities 1% and 9%, with fixed losses on default of £100,000 and £200,000 respectively. Ignoring discounting, what is the unconditional expected loss?",
    "answers": [
      "£7,500",
      "£9,500",
      "£10,000",
      "£15,000"
    ],
    "correctAnswer": 1,
    "explanation": "Average the conditional expected losses: $0.5(0.01\\times100000)+0.5(0.09\\times200000)=9500$ pounds. Multiplying average PD, 5%, by average loss, £150,000, gives £7,500 and misses the association between default probability and loss severity."
  },
  {
    "id": "fin-credit-hazard-spread",
    "category": "Finance",
    "subcategory": "Loans and credit",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "In a simplified continuous-premium CDS model with constant risk-neutral default intensity $\\lambda=0.03$ per year, recovery fraction $R=0.40$, and identical discount/survival weighting in both legs, the par spread is $s=(1-R)\\lambda$. What is $s$ in basis points per year?",
    "answers": [
      "300 bp",
      "120 bp",
      "180 bp",
      "500 bp"
    ],
    "correctAnswer": 2,
    "explanation": "The protection leg’s expected payment rate is $(1-R)\\lambda=0.6(0.03)=0.018$ of notional per year. Equal leg weights imply that same premium rate. Since 1 bp is $10^{-4}$, $0.018=180$ bp. Discrete premium schedules and recovery conventions require refinements."
  },
] satisfies MultipleChoiceQuestion[];
