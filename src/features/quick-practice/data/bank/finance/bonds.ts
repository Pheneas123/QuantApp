import type { MultipleChoiceQuestion } from '../../schema';
const m = String.raw;

export default [
  {
    id: 'fin-bonds-coupon', category: 'Finance', subcategory: 'Bonds and fixed income', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'A bond has £1,000 face value and a 6% annual coupon rate, paid semi-annually in equal instalments. What is each coupon payment?',
    answers: ['£60', '£30', '£6', '£120'], correctAnswer: 1,
    explanation: m`Annual coupon cash is $1000\times0.06=60$ pounds. Two equal payments give $60/2=30$ pounds each. The coupon rate applies to face value, not the changing market price.`,
  },
  {
    id: 'fin-bonds-zero-price', category: 'Finance', subcategory: 'Bonds and fixed income', difficulty: 'easy', questionType: 'short_calculation',
    prompt: 'A default-free zero-coupon bond pays £1,000 in one year. With a 5% annual effective discount rate, what is its price to the nearest penny?',
    answers: ['£950.00', '£1,050.00', '£952.38', '£995.00'], correctAnswer: 2,
    explanation: m`Present value is $P=F/(1+y)^T$, with face payment $F=1000$, annual effective yield $y=0.05$ and $T=1$. Thus $P=1000/1.05=952.38$ pounds. Subtracting 5% of face value is not compound discounting.`,
  },
  {
    id: 'fin-bonds-yield-direction', category: 'Finance', subcategory: 'Bonds and fixed income', difficulty: 'easy', questionType: 'implication',
    prompt: 'A conventional fixed-rate bond has positive future cash flows. If its yield rises while those cash flows remain unchanged, what happens to its price?',
    answers: ['It must rise.', 'It remains equal to face value.', 'Its coupon rate rises automatically.', 'It falls.'], correctAnswer: 3,
    explanation: 'A higher yield discounts each positive cash flow more heavily, reducing present value. The contractual coupon rate stays fixed. Embedded options or changes in expected cash flows require additional analysis.',
  },
  {
    id: 'fin-bonds-dirty', category: 'Finance', subcategory: 'Bonds and fixed income', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A bond’s clean price is £98 per £100 face value. Its £4 annual coupon accrues linearly, and 90 days of the specified 360-day coupon period have elapsed. What is the dirty price per £100 face value?',
    answers: ['£99', '£98', '£102', '£97'], correctAnswer: 0,
    explanation: m`Accrued interest is $4(90/360)=1$ pound per £100 face. Dirty price, the cash settlement price here, is clean price plus accrued interest: $98+1=99$. The specified fraction controls the calculation rather than an assumed day-count convention.`,
  },
  {
    id: 'fin-bonds-spot-price', category: 'Finance', subcategory: 'Bonds and fixed income', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A default-free bond pays £5 in one year and £105 in two years. Discount factors for these dates are 0.96 and 0.90. What is its price?',
    answers: ['£110.00', '£99.30', '£100.80', '£94.50'], correctAnswer: 1,
    explanation: m`Discount each cash flow at its own date: $P=5D(1)+105D(2)=5(0.96)+105(0.90)=99.30$ pounds. A single yield need not equal either spot rate. Omitting the first coupon loses £4.80 of present value.`,
  },
  {
    id: 'fin-bonds-forward-rate', category: 'Finance', subcategory: 'Bonds and fixed income', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'Annual effective one- and two-year spot rates are 4% and 5%. What is the one-year forward rate for borrowing from year 1 to year 2, approximately?',
    answers: ['1.00%', '5.00%', '6.01%', '9.00%'], correctAnswer: 2,
    explanation: m`No arbitrage gives $(1.05)^2=1.04(1+f_{1,2})$. Hence $f_{1,2}=1.1025/1.04-1=0.060096\ldots$, or about 6.01%. Subtracting spot rates ignores their different investment horizons.`,
  },
  {
    id: 'fin-bonds-dv01', category: 'Finance', subcategory: 'Bonds and fixed income', difficulty: 'medium', questionType: 'short_calculation',
    prompt: 'A bond position has market value £2,000,000 and modified duration 4 years. Ignoring convexity, what is its approximate loss for a parallel yield rise of 1 basis point?',
    answers: ['£8,000', '£80', '£200', '£800'], correctAnswer: 3,
    explanation: m`For modified duration $D_{\mathrm{mod}}$, $\Delta P\approx-D_{\mathrm{mod}}P\Delta y$. One basis point is $10^{-4}$, so the loss is $4(2000000)(0.0001)=800$ pounds. DV01 is commonly reported as this positive loss magnitude.`,
  },
  {
    "id": "fin-bonds-bootstrap",
    "category": "Finance",
    "subcategory": "Bonds and fixed income",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A default-free two-year annual-coupon bond costs £100 and pays £5 at year 1 and £105 at year 2. The one-year discount factor is 0.96. What two-year discount factor is implied, to four decimal places?",
    "answers": [
      "0.9067",
      "0.9524",
      "0.9600",
      "0.9500"
    ],
    "correctAnswer": 0,
    "explanation": "Bootstrapping isolates the unknown final discount factor: $100=5(0.96)+105D(2)$. Therefore $D(2)=(100-4.8)/105=0.906666\\ldots$. This uses the earlier date’s known discount factor rather than assigning one common factor to all payments."
  },
  {
    "id": "fin-bonds-convexity",
    "category": "Finance",
    "subcategory": "Bonds and fixed income",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "A bond has price £100, modified duration 5 and convexity 30, with yields expressed as decimals. For a yield rise of $0.02$, what price does $\\Delta P/P\\approx-D\\Delta y+\\tfrac12 C(\\Delta y)^2$ predict?",
    "answers": [
      "£90.00",
      "£90.60",
      "£89.40",
      "£110.60"
    ],
    "correctAnswer": 1,
    "explanation": "The fractional change is $-5(0.02)+\\tfrac12(30)(0.02)^2=-0.10+0.006=-0.094$. Thus the approximate price is $100(1-0.094)=90.60$ pounds. Positive convexity offsets part of the duration loss; this is a local approximation."
  },
  {
    "id": "fin-bonds-duration-hedge",
    "category": "Finance",
    "subcategory": "Bonds and fixed income",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A long bond portfolio loses £1,200 for a 1 bp parallel yield rise. One hedge bond, when held long, loses £80 for that rise. Which position approximately neutralises this first-order yield exposure?",
    "answers": [
      "Buy 15 hedge bonds.",
      "Short 1.5 hedge bonds.",
      "Short 15 hedge bonds.",
      "Buy 80 hedge bonds."
    ],
    "correctAnswer": 2,
    "explanation": "A short hedge bond gains £80 on the specified rise. If $n$ bonds are shorted, net change is $-1200+80n$, so $n=15$. This hedges parallel first-order sensitivity only; curve-shape changes, convexity and spread risk remain."
  },
] satisfies MultipleChoiceQuestion[];
