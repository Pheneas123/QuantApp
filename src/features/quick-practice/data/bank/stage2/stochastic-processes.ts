import type { MultipleChoiceQuestion } from '../../schema';

// Stage 2: independently reviewed additions; original bank files remain intact.
export default [
  {
    "id": "s2-process-reflection-barrier",
    "category": "Stochastic Processes",
    "subcategory": "Brownian motion",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "W is standard Brownian motion with W₀=0. Using the reflection principle and Φ(1)=0.8413, what is $P(\\max_{0\\le t\\le1}W_t\\ge1)$ to four decimal places?",
    "answers": [
      "0.1587",
      "0.8413",
      "0.6826",
      "0.3174"
    ],
    "correctAnswer": 3,
    "explanation": "For a positive barrier, reflection pairs paths that hit the barrier and finish below it with paths finishing above it. Thus P(max W≥1)=2P(W₁≥1)=2(1−Φ(1))=0.3174. The final-time upper tail alone misses paths that hit and later fall back.",
    "objectiveIds": [
      "lo-stochastic-processes-brownian-motion"
    ],
    "knowledgeIds": [
      "result-brownian-reflection"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Distinguish hitting the barrier from finishing beyond it."
    ]
  },
  {
    "id": "s2-process-normal-marginals-counterexample",
    "category": "Stochastic Processes",
    "subcategory": "Gaussian processes",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "Let X∼N(0,1), and let an independent fair sign S take values ±1. Set Y=SX. Which statement about (X,Y) is correct?",
    "answers": [
      "Both marginals are standard normal and covariance is zero, but the pair is not jointly Gaussian.",
      "The pair is jointly Gaussian and independent because covariance is zero.",
      "Y is not normal because S is discrete.",
      "Cov(X,Y)=1 because |X|=|Y|."
    ],
    "correctAnswer": 0,
    "explanation": "Symmetry gives Y∼N(0,1), and E[XY]=E[S]E[X²]=0. Yet |Y|=|X| almost surely, so they are dependent. A jointly Gaussian zero-covariance pair would be independent; moreover X+Y has an atom at zero, incompatible with a nondegenerate normal sum.",
    "objectiveIds": [
      "lo-stochastic-processes-gaussian-processes"
    ],
    "knowledgeIds": [
      "result-joint-gaussian-conditioning"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Calculate covariance, then look for a deterministic relation between the absolute values."
    ]
  },
  {
    "id": "s2-process-compound-poisson-moments",
    "category": "Stochastic Processes",
    "subcategory": "Levy processes",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Let N be a rate-2 Poisson process, independent of i.i.d. jumps J taking +1 with probability 3/4 and −1 otherwise. For $X_t=\\sum_{k=1}^{N_t}J_k$, what are E[X_t] and Var(X_t)?",
    "answers": [
      "$0$ and $2t$",
      "$t$ and $2t$",
      "$t$ and $3t/2$",
      "$2t$ and $2t$"
    ],
    "correctAnswer": 1,
    "explanation": "E[J]=1/2 and E[J²]=1. Conditioning on N gives E[X_t]=2tE[J]=t and Var(X_t)=2tVar(J)+Var(N_t)(E[J])²=2tE[J²]=2t. Holding N fixed would omit the random-count component. This compound Poisson process has stationary independent increments and càdlàg paths.",
    "objectiveIds": [
      "lo-stochastic-processes-levy-processes"
    ],
    "knowledgeIds": [
      "result-compound-poisson",
      "prop-conditional-variance"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Condition on the number of jumps.",
      "Add variance from the random count as well as from jump values."
    ]
  },
  {
    "id": "s2-process-two-state-transient",
    "category": "Stochastic Processes",
    "subcategory": "Continuous-time Markov chains",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "A CTMC starts in state 0 and has generator $Q=\\begin{pmatrix}-2&2\\\\3&-3\\end{pmatrix}$. What is $P(X_t=1)$?",
    "answers": [
      "$\\frac35(1-e^{-5t})$",
      "$\\frac25e^{-5t}$",
      "$\\frac25(1-e^{-5t})$",
      "$1-e^{-2t}$"
    ],
    "correctAnswer": 2,
    "explanation": "Writing p(t)=P(X_t=1), the forward equation is p′=2(1−p)−3p=2−5p with p(0)=0. Solving gives (2/5)(1−e^(−5t)). A first-jump probability ignores returns to state zero; stationary mass is the long-time limit, not the initial value.",
    "objectiveIds": [
      "lo-stochastic-processes-continuous-time-markov-chains"
    ],
    "knowledgeIds": [
      "result-two-state-ctmc"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Balance instantaneous inflow and outflow for state 1."
    ]
  },
  {
    "id": "s2-process-biased-walk-second-moment",
    "category": "Stochastic Processes",
    "subcategory": "Random walks",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "$S_4=\\sum_{i=1}^4\\xi_i$, with independent ±1 increments and P(ξ_i=1)=3/4. What is E[S₄²]?",
    "answers": [
      "4",
      "3",
      "16",
      "7"
    ],
    "correctAnswer": 3,
    "explanation": "Each increment has mean 1/2 and variance 3/4. Thus E[S₄]=2 and Var(S₄)=3, giving E[S₄²]=3+2²=7. The familiar fair-walk expression E[S_n²]=n does not apply to a walk with nonzero drift.",
    "objectiveIds": [
      "lo-stochastic-processes-random-walks",
      "lo-variance-sum"
    ],
    "knowledgeIds": [
      "result-independent-sum-moments"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compute variance and square of the mean separately."
    ]
  },
  {
    "id": "s2-process-absorption-with-holding",
    "category": "Stochastic Processes",
    "subcategory": "Markov chains",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "States 0 and 2 are absorbing. From state 1, each step goes to 0 with probability 1/5, stays at 1 with probability 1/2, or goes to 2 with probability 3/10. Starting at 1, what is the probability of eventual absorption at 2?",
    "answers": [
      "3/5",
      "3/10",
      "1/2",
      "2/5"
    ],
    "correctAnswer": 0,
    "explanation": "First-step analysis gives h=3/10+(1/2)h, so h=3/5. Holding steps delay absorption but do not add competing exit destinations. The probability of never leaving is the limit of (1/2)^n, namely zero; counting only the next-step probability misses later exits.",
    "objectiveIds": [
      "lo-stochastic-processes-markov-chains"
    ],
    "knowledgeIds": [
      "def-markov-property"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Condition on the first transition and include the chance of returning to the same problem."
    ]
  }
] satisfies MultipleChoiceQuestion[];
