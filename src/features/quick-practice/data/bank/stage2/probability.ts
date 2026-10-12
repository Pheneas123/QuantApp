import type { MultipleChoiceQuestion } from '../../schema';

// Stage 2: independently reviewed additions; original bank files remain intact.
export default [
  {
    "id": "s2-prob-two-signals",
    "category": "Probability",
    "subcategory": "Conditional probability",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A condition has prior probability $1/5$. Given condition status, two test results are independent. Each test has sensitivity $4/5$ and false-positive probability $1/5$. After one positive and one negative result, what is the posterior probability of the condition?",
    "answers": [
      "1/5",
      "1/2",
      "4/5",
      "1/17"
    ],
    "correctAnswer": 0,
    "explanation": "The likelihood of this ordered pair is $(4/5)(1/5)=4/25$ with the condition and $(1/5)(4/5)=4/25$ without it. Equal likelihoods leave the prior unchanged. Conditional independence justifies multiplying within each status; it does not make the tests independent marginally.",
    "objectiveIds": [
      "lo-probability-conditional-probability"
    ],
    "knowledgeIds": [
      "result-bayes-partitions"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compare the likelihood of the whole result pair under each status.",
      "Multiply the two conditional rates before applying Bayes."
    ]
  },
  {
    "id": "s2-prob-sampling-scheme",
    "category": "Probability",
    "subcategory": "Conditional probability",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Box A has one red and two blue balls; box B has three red and three blue balls. Scheme I chooses uniformly among all nine balls. Scheme II chooses a box uniformly, then a ball uniformly from that box. Given a red ball, what is the pair $(P_I(B\\mid R),P_{II}(B\\mid R))$?",
    "answers": [
      "$(2/3,2/3)$",
      "$(3/4,3/5)$",
      "$(1/2,1/2)$",
      "$(3/5,3/4)$"
    ],
    "correctAnswer": 1,
    "explanation": "Scheme I makes the four red balls equally likely, of which three are in B. Scheme II has red contributions $(1/2)(1/3)=1/6$ and $(1/2)(1/2)=1/4$, so B has posterior $(1/4)/(1/6+1/4)=3/5$. Uniform boxes and uniform balls induce different priors.",
    "objectiveIds": [
      "lo-probability-conditional-probability"
    ],
    "knowledgeIds": [
      "result-bayes-partitions"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Write the box-selection probability separately for each scheme.",
      "Compare each box’s contribution to the total red probability."
    ]
  },
  {
    "id": "s2-prob-conditioning-dependence",
    "category": "Probability",
    "subcategory": "Independence",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Independent fair bits $U,V$ are conditioned on $C=\\{U+V\\ge1\\}$. What is $(P(U=1,V=1\\mid C),P(U=1\\mid C)P(V=1\\mid C))$?",
    "answers": [
      "$(1/3,1/3)$",
      "$(1/2,1/4)$",
      "$(1/3,4/9)$",
      "$(1/4,1/4)$"
    ],
    "correctAnswer": 2,
    "explanation": "The conditional sample space is {(1,0),(0,1),(1,1)}, with equal probabilities. The joint probability is 1/3 and each marginal is 2/3, giving product 4/9. Conditioning can destroy independence even when the original variables are independent.",
    "objectiveIds": [
      "lo-probability-independence"
    ],
    "knowledgeIds": [
      "result-bayes-partitions",
      "def-mutual-independence"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Remove (0,0), then enumerate the remaining outcomes."
    ]
  },
  {
    "id": "s2-prob-mixed-transform",
    "category": "Probability",
    "subcategory": "Random variables",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Let $U\\sim U(0,1)$ and $Y=\\max(0,2U-1)$. What are $P(Y=0)$ and $P(Y\\le y)$ for $0<y<1$?",
    "answers": [
      "$0$ and $y$",
      "$1/2$ and $y/2$",
      "$1$ and $1$",
      "$1/2$ and $(1+y)/2$"
    ],
    "correctAnswer": 3,
    "explanation": "All U≤1/2 map to zero, creating an atom of mass 1/2. For 0<y<1, Y≤y iff U≤(1+y)/2, whose probability is (1+y)/2. A density on (0,1) alone would miss the atom.",
    "objectiveIds": [
      "lo-probability-random-variables"
    ],
    "knowledgeIds": [
      "def-pushforward-measure"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Find the preimage of zero before calculating the positive part of the CDF."
    ]
  },
  {
    "id": "s2-prob-poisson-competition",
    "category": "Probability",
    "subcategory": "Common distributions",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Independent counts $X\\sim\\operatorname{Poisson}(2)$ and $Y\\sim\\operatorname{Poisson}(3)$ are observed to satisfy $X+Y=2$. What is $P(X=0\\mid X+Y=2)$?",
    "answers": [
      "9/25",
      "3/5",
      "4/25",
      "9/50"
    ],
    "correctAnswer": 0,
    "explanation": "Conditioning independent Poisson counts on their total yields Binomial(2,2/5) for X. Thus both events being assigned to Y has probability (3/5)²=9/25. The rates determine a share; they are not the conditional count itself.",
    "objectiveIds": [
      "lo-probability-common-distributions"
    ],
    "knowledgeIds": [
      "result-poisson-sums"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Write the joint Poisson mass and divide by the mass of the total."
    ]
  },
  {
    "id": "s2-prob-without-replacement",
    "category": "Probability",
    "subcategory": "Common distributions",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "Three balls are drawn uniformly without replacement from five red and five blue balls. What is the probability that all three are red?",
    "answers": [
      "1/6",
      "1/12",
      "1/8",
      "3/10"
    ],
    "correctAnswer": 1,
    "explanation": "The conditional red probabilities are 5/10, 4/9 and 3/8; their product is 1/12. Using (1/2)³ incorrectly treats successive draws as independent. Equivalently, choose(5,3)/choose(10,3)=10/120.",
    "objectiveIds": [
      "lo-probability-common-distributions"
    ],
    "knowledgeIds": [
      "result-hypergeometric-sampling"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Update the remaining numbers of red and total balls after each draw."
    ]
  },
  {
    "id": "s2-prob-distinct-indicators",
    "category": "Probability",
    "subcategory": "Expectation",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Three independent draws are made uniformly from five labels, with replacement. What is the expected number of distinct labels observed?",
    "answers": [
      "9/5",
      "64/25",
      "61/25",
      "3"
    ],
    "correctAnswer": 2,
    "explanation": "Let I_j indicate that label j appears. Its absence probability is (4/5)³, so E[sum I_j]=5(1−(4/5)³)=61/25. The indicators are dependent, but linearity of expectation does not require their independence.",
    "objectiveIds": [
      "lo-probability-expectation"
    ],
    "knowledgeIds": [
      "result-indicator-expectation"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use one indicator for each possible label.",
      "Calculate the probability a fixed label never appears."
    ]
  },
  {
    "id": "s2-prob-total-variance-mixture",
    "category": "Probability",
    "subcategory": "Conditional expectation",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "First draw $Q$ uniformly from {1/4,3/4}, then draw $X\\mid Q\\sim\\operatorname{Bernoulli}(Q)$. What is $(E[\\operatorname{Var}(X\\mid Q)],\\operatorname{Var}(E[X\\mid Q]),\\operatorname{Var}(X))$?",
    "answers": [
      "$(1/4,0,1/4)$",
      "$(3/16,1/4,7/16)$",
      "$(1/16,3/16,1/4)$",
      "$(3/16,1/16,1/4)$"
    ],
    "correctAnswer": 3,
    "explanation": "Q(1−Q)=3/16 in both states. E[X|Q]=Q has mean 1/2 and variance 1/16. Total variance adds these terms to 1/4; ignoring variation of the conditional mean loses a component.",
    "objectiveIds": [
      "lo-probability-conditional-expectation"
    ],
    "knowledgeIds": [
      "prop-conditional-variance"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Separate within-state variance from variation of the state means."
    ]
  },
  {
    "id": "s2-prob-pgf-coefficient",
    "category": "Probability",
    "subcategory": "Generating functions",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A nonnegative integer variable N has PGF $G(s)=((1+s)/2)^3$. What are $P(N=2)$ and $E[N]$?",
    "answers": [
      "$3/8$ and $3/2$",
      "$1/8$ and $3/2$",
      "$3/8$ and $3$",
      "$3/4$ and $1/2$"
    ],
    "correctAnswer": 0,
    "explanation": "Expanding the polynomial gives coefficient 3/8 on s². Differentiating gives G′(1)=3/2. A coefficient extracts a probability; a derivative at one extracts a factorial moment, not that same probability.",
    "objectiveIds": [
      "lo-probability-generating-functions"
    ],
    "knowledgeIds": [
      "result-generating-functions"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Expand for the probability, differentiate for the mean."
    ]
  },
  {
    "id": "s2-prob-poisson-thinning",
    "category": "Probability",
    "subcategory": "Generating functions",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "$N\\sim\\operatorname{Poisson}(4)$. Conditional on N, independently retain each of its N items with probability 1/4. If K is the retained count, which is its PGF?",
    "answers": [
      "$\\exp(4(s/4-1))$",
      "$\\exp(s-1)$",
      "$\\exp(4(s-1))$",
      "$(3+s)/4$"
    ],
    "correctAnswer": 1,
    "explanation": "E[s^K|N]=(3/4+s/4)^N. Substitution in the Poisson PGF exp(4(z−1)) yields exp(s−1), identifying Poisson(1). Retaining a quarter of a random count is not rounding N/4.",
    "objectiveIds": [
      "lo-probability-generating-functions"
    ],
    "knowledgeIds": [
      "result-generating-functions",
      "result-poisson-sums"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Condition on the original count before averaging over it."
    ]
  },
  {
    "id": "s2-prob-cauchy-average",
    "category": "Probability",
    "subcategory": "Laws of large numbers",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "Independent standard Cauchy variables have characteristic function $\\varphi(t)=e^{-|t|}$. What does the characteristic function of their average show?",
    "answers": [
      "The average has variance 1/n and therefore tends to zero.",
      "The average is exactly normal for n≥2.",
      "Every average has the same Cauchy law, so it does not converge in probability to zero.",
      "The average converges in probability to zero by independence alone."
    ],
    "correctAnswer": 2,
    "explanation": "Independence gives φ_average(t)=∏exp(−|t|/n)=exp(−|t|). Thus P(|average|>1)=1/2 for every n. The Cauchy distribution has no finite absolute first moment, so the usual i.i.d. strong law is inapplicable.",
    "objectiveIds": [
      "lo-probability-laws-of-large-numbers"
    ],
    "knowledgeIds": [
      "result-generating-functions",
      "thm-strong-law"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Apply the scaling rule to each characteristic function, then multiply."
    ]
  },
  {
    "id": "s2-prob-binomial-normal-approximation",
    "category": "Probability",
    "subcategory": "Central limit theorem",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "$S\\sim\\operatorname{Binomial}(400,1/2)$. Using the classical normal approximation and ignoring continuity correction, approximate $P(S>220)$. Use $\\Phi(2)=0.9772$.",
    "answers": [
      "0.9772",
      "0.1587",
      "0.5",
      "0.0228"
    ],
    "correctAnswer": 3,
    "explanation": "The mean is 200 and standard deviation sqrt(400×1/2×1/2)=10. The threshold has z-score 2, giving upper tail 1−Φ(2)=0.0228. This is an approximation, not an exact binomial identity; the variance is not the standard deviation.",
    "objectiveIds": [
      "lo-probability-central-limit-theorem"
    ],
    "knowledgeIds": [
      "thm-iid-clt"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Centre by the mean and divide by the standard deviation."
    ]
  },
  {
    "id": "s2-prob-hoeffding-budget",
    "category": "Probability",
    "subcategory": "Concentration inequalities",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "For independent observations in [0,1], two-sided Hoeffding gives $P(|\\bar X-E\\bar X|\\ge0.1)\\le2e^{-0.02n}$. What is the smallest integer n for which this bound is at most 0.05? Use $\\log40\\approx3.688879$.",
    "answers": [
      "185",
      "184",
      "92",
      "370"
    ],
    "correctAnswer": 0,
    "explanation": "We need exp(−0.02n)≤1/40, or n≥log(40)/0.02≈184.44395. Rounding up gives 185. Dropping the two-sided factor or rounding down fails the requested guarantee.",
    "objectiveIds": [
      "lo-probability-concentration-inequalities"
    ],
    "knowledgeIds": [
      "result-hoeffding-bound"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Take logarithms after isolating the exponential."
    ]
  }
] satisfies MultipleChoiceQuestion[];
