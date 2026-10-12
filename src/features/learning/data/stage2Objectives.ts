import type { LearningObjective } from '../schema';

export const stage2Objectives = [
  {
    "id": "lo-statistical-information",
    "category": "Statistics",
    "subcategories": [
      "Estimation",
      "Maximum likelihood"
    ],
    "description": "Calculate scalar Fisher information and regular unbiased-estimation lower bounds.",
    "knowledgeIds": [
      "thm-cramer-rao",
      "def-likelihood-score"
    ],
    "prerequisiteIds": [
      "lo-statistics-maximum-likelihood"
    ]
  },
  {
    "id": "lo-regularised-linear-models",
    "category": "Machine Learning",
    "subcategories": [
      "Supervised learning",
      "Optimisation and training"
    ],
    "description": "Differentiate penalised linear losses, solve ridge systems and analyse coupled quadratic training stability.",
    "knowledgeIds": [
      "result-regularised-linear-models"
    ],
    "prerequisiteIds": [
      "lo-statistics-regression",
      "lo-machine-learning-optimisation-and-training"
    ]
  },
  {
    "id": "lo-gaussian-conditioning",
    "category": "Machine Learning",
    "subcategories": [
      "Probabilistic and Bayesian machine learning"
    ],
    "description": "Calculate latent Gaussian posterior moments and diagnose induced conditional dependence.",
    "knowledgeIds": [
      "result-joint-gaussian-conditioning"
    ],
    "prerequisiteIds": [
      "lo-probability-conditional-expectation",
      "lo-stochastic-processes-gaussian-processes"
    ]
  },
  {
    "id": "lo-cpp-value-semantics",
    "category": "Programming",
    "subcategories": [
      "Modern C++",
      "C++ object-oriented programming and memory"
    ],
    "description": "Trace copies, moves, forwarding and callable ownership under C++20 value-category rules.",
    "knowledgeIds": [
      "prog-value-semantics",
      "prog-aliasing-ownership"
    ],
    "prerequisiteIds": [
      "lo-programming-c-fundamentals",
      "lo-programming-c-object-oriented-programming-and-memory"
    ]
  },
  {
    "id": "lo-neural-layer-analysis",
    "category": "Machine Learning",
    "subcategories": [
      "Neural networks and deep learning"
    ],
    "description": "Derive convolution shapes and parameter counts, dropout moments and multiclass loss gradients.",
    "knowledgeIds": [
      "result-neural-shapes-dropout",
      "result-softmax-loss"
    ],
    "prerequisiteIds": [
      "lo-programming-numpy-and-scientific-python"
    ]
  },
  {
    "id": "lo-policy-gradient",
    "category": "Machine Learning",
    "subcategories": [
      "Reinforcement learning"
    ],
    "description": "Derive finite-action score-function gradients and check unbiased-baseline conditions.",
    "knowledgeIds": [
      "result-policy-gradient"
    ],
    "prerequisiteIds": [
      "lo-probability-expectation",
      "lo-machine-learning-optimisation-and-training"
    ]
  },
  {
    "id": "lo-linear-time-series",
    "category": "Machine Learning",
    "subcategories": [
      "Time series and sequential machine learning"
    ],
    "description": "Calculate causal autoregressive forecasts and interpret stability using consistent root conventions.",
    "knowledgeIds": [
      "result-linear-time-series"
    ],
    "prerequisiteIds": [
      "lo-variance-sum"
    ]
  },
  {
    "id": "lo-distance-based-prediction",
    "category": "Machine Learning",
    "subcategories": [
      "Supervised learning",
      "Unsupervised learning"
    ],
    "description": "Analyse feature scaling in nearest-neighbour prediction and mean updates in Euclidean clustering.",
    "knowledgeIds": [
      "result-distance-scaling"
    ],
    "prerequisiteIds": []
  }
] satisfies LearningObjective[];
