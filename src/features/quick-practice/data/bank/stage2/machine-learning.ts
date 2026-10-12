import type { MultipleChoiceQuestion } from '../../schema';

// Stage 2: independently reviewed additions; original bank files remain intact.
export default [
  {
    "id": "s2-ml-grouped-validation",
    "category": "Machine Learning",
    "subcategory": "Machine learning foundations",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "A medical classifier should generalise to previously unseen patients. Each patient has multiple correlated visits. Which train/validation split matches that target?",
    "answers": [
      "Split visits randomly, allowing the same patient in both partitions.",
      "Group by diagnosis only, mixing each patient across partitions.",
      "Duplicate a patient’s visits into both partitions to balance class counts.",
      "Assign every visit of a given patient to the same partition."
    ],
    "correctAnswer": 3,
    "explanation": "Patient identity is the independent evaluation unit for the stated target. Sharing a patient across partitions can let a model exploit patient-specific information, yielding optimistic performance for new patients. Grouping must be combined with fitting preprocessing only on training groups; stratifying labels alone does not remove identity leakage.",
    "objectiveIds": [
      "lo-machine-learning-machine-learning-foundations"
    ],
    "knowledgeIds": [
      "ml-validation-leakage"
    ],
    "tags": [
      "stage-2",
      "concept"
    ],
    "hints": [
      "Identify the unit that must be new at evaluation time."
    ]
  },
  {
    "id": "s2-ml-selection-optimism",
    "category": "Machine Learning",
    "subcategory": "Machine learning foundations",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Two models each have true error 1/2. Their independent validation-error estimates each equal 0 or 1 with probability 1/2. Select the model with the smaller estimate. What is the expected selected validation estimate?",
    "answers": [
      "1/4",
      "1/2",
      "3/4",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "The minimum is one only if both estimates are one, an event of probability 1/4; otherwise it is zero. Its expectation is 1/4 despite both individual estimates being unbiased at 1/2. Selection changes the estimate’s distribution, explaining the need for independent final evaluation.",
    "objectiveIds": [
      "lo-machine-learning-evaluation-and-generalisation"
    ],
    "knowledgeIds": [
      "ml-validation-leakage"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Enumerate the four pairs of validation estimates before selecting."
    ]
  },
  {
    "id": "s2-ml-ridge-diagonal-solution",
    "category": "Machine Learning",
    "subcategory": "Supervised learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Minimise $\\tfrac12\\|y-Xw\\|^2+\\tfrac12\\|w\\|^2$ with $X^TX=\\operatorname{diag}(1,4)$ and $X^Ty=(2,8)^T$. What is the unique minimiser?",
    "answers": [
      "$(2/3,4/3)^T$",
      "$(1,8/5)^T$",
      "$(2,2)^T$",
      "$(1,4)^T$"
    ],
    "correctAnswer": 1,
    "explanation": "The gradient equation is (XᵀX+I)w=Xᵀy. Adding the penalty changes the diagonal to (2,5), giving w=(1,8/5). The one-half conventions give a penalty gradient w, not 2w. The positive definite Hessian makes this stationary point the unique minimiser.",
    "objectiveIds": [
      "lo-regularised-linear-models"
    ],
    "knowledgeIds": [
      "result-regularised-linear-models"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Differentiate both the data loss and the penalty using their one-half factors."
    ]
  },
  {
    "id": "s2-ml-hinge-active-gradient",
    "category": "Machine Learning",
    "subcategory": "Supervised learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "For one example, $L(w,b)=\\max(0,1-y(w^Tx+b))$, y=1 and x=(2,−1). At a point where $w^Tx+b=1/2$, what is $(\\nabla_wL,\\partial L/\\partial b)$?",
    "answers": [
      "$((0,0),0)$",
      "$((-1,1/2),-1/2)$",
      "$((-2,1),-1)$",
      "$((2,-1),1)$"
    ],
    "correctAnswer": 2,
    "explanation": "The margin is below one, so the active branch is 1−y(wᵀx+b). Its derivatives are −yx=(−2,1) and −y=−1. This point is away from the kink, so no subgradient ambiguity arises. A logistic probability factor would differentiate a different loss.",
    "objectiveIds": [
      "lo-regularised-linear-models"
    ],
    "knowledgeIds": [
      "result-regularised-linear-models"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Choose the active branch before differentiating."
    ]
  },
  {
    "id": "s2-ml-metric-scaling-neighbour",
    "category": "Machine Learning",
    "subcategory": "Supervised learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A one-nearest-neighbour classifier uses Euclidean distance. Training points A=(1,100) with label 1 and B=(2,0) with label 0 are queried at (0,0). What are its predictions before and after dividing the second coordinate of every point by 100?",
    "answers": [
      "1 before, 0 after.",
      "0 before and after.",
      "1 before and after.",
      "0 before, 1 after."
    ],
    "correctAnswer": 3,
    "explanation": "Before scaling, distances are √10001 and 2, so B is nearest. After scaling, they are √2 and 2, so A is nearest. Consistent feature scaling changes the metric and can change predictions; scaling only the query would not be the stated operation.",
    "objectiveIds": [
      "lo-distance-based-prediction"
    ],
    "knowledgeIds": [
      "result-distance-scaling"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compare squared distances under each metric; no square roots are needed for ranking."
    ]
  },
  {
    "id": "s2-ml-centred-pca-rank",
    "category": "Machine Learning",
    "subcategory": "Unsupervised learning",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "A real data matrix has three observations and five features. Features are centred across observations before covariance PCA. What is the largest possible number of strictly positive covariance eigenvalues?",
    "answers": [
      "2",
      "3",
      "5",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "The centred rows sum to zero, making the data matrix rank at most 3−1=2. The covariance matrix XᵀX/(3−1) has the same rank and cannot have more than two positive eigenvalues. Feature count alone does not determine the rank, and centring removes a row degree of freedom.",
    "objectiveIds": [
      "lo-machine-learning-unsupervised-learning"
    ],
    "knowledgeIds": [
      "ml-pca"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Find the linear dependence created by centring before considering the covariance matrix."
    ]
  },
  {
    "id": "s2-ml-kmeans-update-objective",
    "category": "Machine Learning",
    "subcategory": "Unsupervised learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "One-dimensional k-means has data {0,2,9} and centres (0,10), with squared Euclidean distance. After assignment and then a mean update, what are the new centres and the sum of squared distances to assigned centres?",
    "answers": [
      "$(2,9)$ and $4$",
      "$(1,9)$ and $2$",
      "$(0,10)$ and $5$",
      "$(1,9)$ and $1$"
    ],
    "correctAnswer": 1,
    "explanation": "Points 0 and 2 join the first centre and 9 the second. Their updated means are 1 and 9. The squared-error sum is (0−1)²+(2−1)²+(9−9)²=2, down from 5. Means minimise within-cluster squared error; distances must be squared and all points counted.",
    "objectiveIds": [
      "lo-machine-learning-unsupervised-learning",
      "lo-distance-based-prediction"
    ],
    "knowledgeIds": [
      "ml-kmeans",
      "result-distance-scaling"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Complete the assignment step before moving any centre."
    ]
  },
  {
    "id": "s2-ml-adam-first-step",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Adam starts with w₀=1 and m₀=v₀=0. Use β₁=0.9, β₂=0.999, gradient g₁=2, learning rate 0.1 and ε=0. With both standard bias corrections, what is w₁?",
    "answers": [
      "0.98",
      "Approximately 0.6838.",
      "0.9",
      "0.8"
    ],
    "correctAnswer": 2,
    "explanation": "m₁=0.2 and v₁=0.004. Corrections give m̂₁=m₁/(1−0.9)=2 and v̂₁=v₁/(1−0.999)=4. The step is 0.1×2/√4=0.1, giving 0.9. The last distractor uses uncorrected moments; g₁ is nonzero so ε=0 causes no division problem.",
    "objectiveIds": [
      "lo-machine-learning-optimisation-and-training"
    ],
    "knowledgeIds": [
      "result-adam-step"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compute and correct the first and second moments separately."
    ]
  },
  {
    "id": "s2-ml-matrix-gradient-stability",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "difficulty": "hard",
    "questionType": "implication",
    "prompt": "For $L(w)=\\tfrac12w^THw$ with $H=\\begin{pmatrix}4&2\\\\2&4\\end{pmatrix}$, the preconditioned iteration $w_{k+1}=w_k-\\eta D\\nabla L(w_k)$ uses $D=\\operatorname{diag}(1,2)$. Which constant step-size range is necessary and sufficient for convergence to zero from every initial vector?",
    "answers": [
      "$0<\\eta<1/3$",
      "$0<\\eta<1/6$",
      "$\\eta=1/(3+\\sqrt3)$",
      "$0<\\eta<1/(3+\\sqrt3)$"
    ],
    "correctAnswer": 3,
    "explanation": "The error update is (I−ηDH)w, not (I−ηH)w. DH=[[4,2],[4,8]] is similar to the symmetric positive-definite matrix D^(1/2)HD^(1/2). Its eigenvalues solve λ²−12λ+24=0, giving 6±2√3. All modes contract exactly when 0<η<2/(6+2√3)=1/(3+√3). Equality leaves a multiplier −1; 1/6 is sufficient but unnecessarily restrictive, while 1/3 ignores preconditioning.",
    "objectiveIds": [
      "lo-machine-learning-optimisation-and-training",
      "lo-regularised-linear-models"
    ],
    "knowledgeIds": [
      "result-regularised-linear-models",
      "ml-gradient-descent"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Form the actual iteration matrix, including D.",
      "Use similarity to a symmetric positive-definite matrix to justify analysing its eigenvalues."
    ]
  },
  {
    "id": "s2-ml-gradient-descent-saddle",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "For $L(x,y)=(x^2-y^2)/2$, exact gradient descent uses a constant 0<η<1 and starts at (1,0). Which statement describes the limit?",
    "answers": [
      "It converges to (0,0), which is a saddle rather than a local minimum.",
      "It converges to a strict local minimum at (0,0).",
      "It necessarily diverges from every initial point because the loss has a negative-curvature direction.",
      "It remains at (1,0) because the starting y-gradient is zero."
    ],
    "correctAnswer": 0,
    "explanation": "The updates are x_(k+1)=(1−η)x_k and y_(k+1)=(1+η)y_k. Starting with y₀=0 keeps that unstable coordinate identically zero; the x coordinate contracts to zero. The origin is a saddle, since the loss is positive along x and negative along y. Convergence of a particular trajectory does not prove it found a minimum.",
    "objectiveIds": [
      "lo-machine-learning-optimisation-and-training"
    ],
    "knowledgeIds": [
      "ml-gradient-descent",
      "result-regularised-linear-models"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Write a separate recurrence for each coordinate.",
      "Check whether the chosen initial point has any component in the unstable direction."
    ]
  },
  {
    "id": "s2-ml-convolution-shape-parameters",
    "category": "Machine Learning",
    "subcategory": "Neural networks and deep learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A 2D convolution takes input shape (2,3,7,7) in batch/channel/height/width order. It has 4 output channels, a 3×3 kernel, stride 2, padding 1, dilation 1, groups 1 and one bias per output channel. What are output shape and trainable parameter count?",
    "answers": [
      "(2,3,4,4) and 108",
      "(2,4,4,4) and 112",
      "(2,4,3,3) and 112",
      "(2,4,4,4) and 40"
    ],
    "correctAnswer": 1,
    "explanation": "Each spatial size is floor((7+2−3)/2)+1=4. The output channel count is four. There are 4×3×3×3 kernel weights plus four biases, totalling 112. Batch size does not multiply the parameter count, and stride affects spatial size rather than the kernel’s channel connections.",
    "objectiveIds": [
      "lo-neural-layer-analysis"
    ],
    "knowledgeIds": [
      "result-neural-shapes-dropout"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compute spatial dimensions and parameter count as separate quantities."
    ]
  },
  {
    "id": "s2-ml-inverted-dropout-variance",
    "category": "Machine Learning",
    "subcategory": "Neural networks and deep learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "For a fixed activation x=2, inverted dropout during training returns Y=Mx/q, with M∼Bernoulli(q) and keep probability q=1/2. What are E[Y] and Var(Y)?",
    "answers": [
      "2 and 2",
      "4 and 0",
      "2 and 4",
      "1 and 1"
    ],
    "correctAnswer": 2,
    "explanation": "Y is four with probability 1/2 and zero otherwise. Its mean is two, second moment eight and variance eight−four=4. Inverted scaling preserves the mean but adds variance; evaluation would return the original activation deterministically.",
    "objectiveIds": [
      "lo-neural-layer-analysis"
    ],
    "knowledgeIds": [
      "result-neural-shapes-dropout"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Write the two possible outputs before calculating moments."
    ]
  },
  {
    "id": "s2-ml-softmax-gradient-invariance",
    "category": "Machine Learning",
    "subcategory": "Neural networks and deep learning",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "For finite logits z, softmax probabilities p and one-hot class y, the single-example cross-entropy loss is −log(p_y). Which describes its logit gradient and a common shift z↦z+c1?",
    "answers": [
      "Gradient $p-e_y$ sums to one; the shift raises loss by c.",
      "Gradient is $p$; the shift changes only the correct-class probability.",
      "Gradient is $e_y-p$; the shift leaves only the predicted class unchanged.",
      "Gradient $p-e_y$ sums to zero; the shift leaves probabilities and loss unchanged."
    ],
    "correctAnswer": 3,
    "explanation": "Differentiating log(sum exp z)−z_y yields p−e_y; summing components gives 1−1=0. Multiplying every exponential by e^c cancels in softmax, so a common finite shift leaves all probabilities and loss unchanged. Negating the gradient would reverse the descent direction.",
    "objectiveIds": [
      "lo-machine-learning-neural-networks-and-deep-learning",
      "lo-neural-layer-analysis"
    ],
    "knowledgeIds": [
      "result-softmax-loss",
      "result-logsumexp"
    ],
    "tags": [
      "stage-2",
      "concept"
    ],
    "hints": [
      "Differentiate the log-normaliser and the correct-class logit separately."
    ]
  },
  {
    "id": "s2-ml-bellman-fixed-point",
    "category": "Machine Learning",
    "subcategory": "Reinforcement learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "At state s, action a yields reward 1 and returns to s; action b yields reward 0 and terminates. With discount γ=1/2 and no other rewards, what is the optimal value V*(s)?",
    "answers": [
      "2",
      "1",
      "1/2",
      "Infinity"
    ],
    "correctAnswer": 0,
    "explanation": "The Bellman equation is V=max(1+V/2,0), whose solution is two with a optimal. Repeated use of a yields the convergent reward sum 1+1/2+1/4+...=2. A single backup from zero gives one, not the fixed point; discounting prevents an infinite value.",
    "objectiveIds": [
      "lo-machine-learning-reinforcement-learning"
    ],
    "knowledgeIds": [
      "ml-bellman"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Solve the optimality fixed point, not just one iteration from zero."
    ]
  },
  {
    "id": "s2-ml-policy-gradient-bandit",
    "category": "Machine Learning",
    "subcategory": "Reinforcement learning",
    "difficulty": "hard",
    "questionType": "short_calculation",
    "prompt": "A two-action bandit chooses a with $p=\\sigma(\\theta)=1/4$ and b otherwise. Rewards are R(a)=2,R(b)=0. What is $dE[R]/d\\theta$, and what is the expectation of the score estimator $(R-1)\\partial_\\theta\\log\\pi_\\theta(A)$?",
    "answers": [
      "Both are 1/4.",
      "Both are 3/8.",
      "The derivative is 1/2 and the estimator mean is 3/8.",
      "The derivative is 3/8 and the estimator mean is zero."
    ],
    "correctAnswer": 1,
    "explanation": "E[R]=2p, so the derivative is 2p(1−p)=3/8. Scores are 1−p=3/4 for a and −p=−1/4 for b. The baseline estimator mean is (1/4)(1)(3/4)+(3/4)(−1)(−1/4)=3/8. The action-independent baseline contributes zero expected score but need not make each sample zero.",
    "objectiveIds": [
      "lo-policy-gradient"
    ],
    "knowledgeIds": [
      "result-policy-gradient"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Differentiate the expected reward directly for an independent check.",
      "Average the two action-specific score terms under their policy probabilities."
    ]
  },
  {
    "id": "s2-ml-action-dependent-baseline",
    "category": "Machine Learning",
    "subcategory": "Reinforcement learning",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In a two-action bandit, πθ(a)=σ(θ)∈(0,1), R(a)=2 and R(b)=0. Someone uses b(A)=R(A) in $(R(A)-b(A))\\partial_\\theta\\log\\pi_\\theta(A)$ without any correction. What follows?",
    "answers": [
      "The estimator is unbiased because each centred reward has mean zero.",
      "The true gradient is zero because the policy probabilities sum to one.",
      "The estimator is identically zero but the true gradient is positive, so this action-dependent baseline is biased.",
      "Every action-dependent baseline is automatically unbiased."
    ],
    "correctAnswer": 2,
    "explanation": "Subtracting exactly the realised reward makes every sample zero. Yet E[R]=2σ(θ) has derivative 2σ(θ)(1−σ(θ))>0. The familiar zero expected score argument applies to a baseline independent of the sampled action conditional on state; arbitrary action-dependent baselines need an additional correction.",
    "objectiveIds": [
      "lo-policy-gradient"
    ],
    "knowledgeIds": [
      "result-policy-gradient"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compare the sample estimator with a direct derivative of the expected reward."
    ]
  },
  {
    "id": "s2-ml-gaussian-predictive-noise",
    "category": "Machine Learning",
    "subcategory": "Probabilistic and Bayesian machine learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A jointly Gaussian latent value f* and noisy training observation Y have mean zero and covariance $\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$. After Y=2, what are the conditional mean and variance of f*?",
    "answers": [
      "$(2,1)$",
      "$(1,3/2)$",
      "$(0,1)$",
      "$(1,1/2)$"
    ],
    "correctAnswer": 3,
    "explanation": "Gaussian conditioning gives mean Cov(f*,Y)Var(Y)⁻¹Y=1×(1/2)×2=1, and variance 1−1×(1/2)×1=1/2. This is latent uncertainty; adding a future independent observation-noise variance would answer a different predictive question.",
    "objectiveIds": [
      "lo-gaussian-conditioning"
    ],
    "knowledgeIds": [
      "result-joint-gaussian-conditioning"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use the covariance with the observed variable, then subtract the explained variance."
    ]
  },
  {
    "id": "s2-ml-gaussian-induced-covariance",
    "category": "Machine Learning",
    "subcategory": "Probabilistic and Bayesian machine learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Independent f₁,f₂∼N(0,1) and ε∼N(0,2) produce Y=f₁+f₂+ε. What is Cov(f₁,f₂|Y), and are f₁,f₂ conditionally independent?",
    "answers": [
      "−1/4; no.",
      "0; yes.",
      "1/4; no.",
      "−1/2; yes."
    ],
    "correctAnswer": 0,
    "explanation": "Var(Y)=4 and each Cov(f_i,Y)=1. The conditional cross covariance is 0−1×(1/4)×1=−1/4. The conditional pair is jointly Gaussian, so the nonzero covariance rules out conditional independence. Conditioning on a shared noisy sum couples initially independent latent variables.",
    "objectiveIds": [
      "lo-gaussian-conditioning"
    ],
    "knowledgeIds": [
      "result-joint-gaussian-conditioning"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Subtract the covariance explained through the shared observation."
    ]
  },
  {
    "id": "s2-ml-ar-forecast-uncertainty",
    "category": "Machine Learning",
    "subcategory": "Time series and sequential machine learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "$X_{t+1}=X_t/2+\\varepsilon_{t+1}$ with independent centred innovations of variance 1, independent of the past. Given X_t=4, what are E[X_{t+2}|X_t] and the conditional two-step forecast-error variance?",
    "answers": [
      "1 and 1/4",
      "1 and 5/4",
      "2 and 1",
      "1 and 2"
    ],
    "correctAnswer": 1,
    "explanation": "Expanding twice gives X_(t+2)=X_t/4+ε_(t+1)/2+ε_(t+2). The conditional mean is one and the new independent-noise variance is 1/4+1=5/4. It is not just the one-step innovation variance; older forecast innovations are propagated through the dynamics.",
    "objectiveIds": [
      "lo-linear-time-series"
    ],
    "knowledgeIds": [
      "result-linear-time-series",
      "result-independent-sum-moments"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Expand the recursion through both forecast steps before taking moments."
    ]
  },
  {
    "id": "s2-ml-ar-two-stability",
    "category": "Machine Learning",
    "subcategory": "Time series and sequential machine learning",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "Consider $X_t=1.2X_{t-1}-0.32X_{t-2}+\\varepsilon_t$, with i.i.d. centred innovations of finite positive variance. Does it admit a causal finite-variance covariance-stationary solution? Use the companion matrix $A=\\begin{pmatrix}1.2&-0.32\\\\1&0\\end{pmatrix}$.",
    "answers": [
      "No: absolute coefficient sum exceeds one, a necessary stationarity condition.",
      "Yes: every AR(2) with a negative second coefficient is stationary.",
      "Yes: A has eigenvalues 0.8 and 0.4, both inside the unit circle.",
      "No: the coefficient 1.2 exceeds one, which alone forbids every stationary AR(2)."
    ],
    "correctAnswer": 2,
    "explanation": "The companion characteristic polynomial is λ²−1.2λ+0.32=(λ−0.8)(λ−0.4). Its powers decay geometrically, allowing a causal square-integrable innovation sum. The lag-polynomial roots are reciprocals and lie outside the unit circle; confusing those two conventions reverses the test. Simple coefficient tests are not necessary conditions here.",
    "objectiveIds": [
      "lo-linear-time-series"
    ],
    "knowledgeIds": [
      "result-linear-time-series"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Factor the companion matrix’s characteristic polynomial."
    ]
  },
  {
    "id": "s2-ml-f1-counts",
    "category": "Machine Learning",
    "subcategory": "Evaluation and generalisation",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "A binary classifier has TP=3, FP=1 and FN=2. What is positive-class F1, using the harmonic mean of precision and recall?",
    "answers": [
      "3/4",
      "3/5",
      "1/2",
      "2/3"
    ],
    "correctAnswer": 3,
    "explanation": "Precision is 3/4 and recall 3/5. Their harmonic mean is 2TP/(2TP+FP+FN)=6/9=2/3. F1 is neither precision nor recall, and an arithmetic mean is not the defined metric.",
    "objectiveIds": [
      "lo-machine-learning-evaluation-and-generalisation"
    ],
    "knowledgeIds": [
      "result-f1-auc",
      "ml-classification-metrics"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Express the harmonic mean directly in confusion-matrix counts."
    ]
  },
  {
    "id": "s2-ml-auc-tied-rank",
    "category": "Machine Learning",
    "subcategory": "Evaluation and generalisation",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Positive scores are {0.9,0.2}; negative scores are {0.8,0.1,0.2}. Empirical ROC AUC is the fraction of positive/negative pairs correctly ordered, counting ties as half. What is the AUC?",
    "answers": [
      "3/4",
      "2/3",
      "5/6",
      "1/2"
    ],
    "correctAnswer": 0,
    "explanation": "The 0.9 positive beats all three negatives. The 0.2 positive beats 0.1, loses to 0.8 and ties 0.2. The total is 3+1+1/2=4.5 wins over six pairs, giving 0.75. Ignoring ties gives 2/3; counting ties fully gives 5/6.",
    "objectiveIds": [
      "lo-machine-learning-evaluation-and-generalisation"
    ],
    "knowledgeIds": [
      "result-f1-auc"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Enumerate all six cross-class pairs and apply the half-tie rule."
    ]
  },
  {
    "id": "s2-ml-unequal-microbatch-weighting",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In PyTorch 2.x, two microbatches contain 1 and 3 examples. Each scalar loss_i is the unweighted mean of independent per-example losses at the same parameter values. Gradients are cleared once, and the optimiser steps only after both backward calls. Which weighting reproduces the full four-example mean gradient?",
    "answers": [
      "Step after each backward call, using loss_i/4.",
      "Call backward on loss_1/4 and 3*loss_2/4.",
      "Call backward on loss_1/2 and loss_2/2.",
      "Call backward on loss_1 and loss_2 without scaling."
    ],
    "correctAnswer": 1,
    "explanation": "The full mean loss is (1×loss₁+3×loss₂)/4, so differentiating gives those same weights. Equal microbatch weighting overweights the single-example batch. Parameters must stay fixed, and batch-dependent operations such as batch normalisation are excluded by the independent per-example premise. No class weights or ignored examples alter the denominators.",
    "objectiveIds": [
      "lo-machine-learning-applied-machine-learning-and-implementation"
    ],
    "knowledgeIds": [
      "result-microbatch-weighting",
      "ml-backpropagation"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Weight each mean by its number of contributing examples."
    ]
  },
  {
    "id": "s2-ml-class-index-loss-shape",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In PyTorch 2.x, finite real floating logits have shape (B,C), B>0, C≥2, and mutually exclusive target class indices are long integers of shape (B,) in [0,C). Tensors share a device. Which ordinary unweighted loss call correctly implements mean multiclass cross-entropy?",
    "answers": [
      "torch.nn.functional.binary_cross_entropy_with_logits(logits, target)",
      "torch.nn.functional.cross_entropy(logits, target.float())",
      "torch.nn.functional.cross_entropy(logits, target)",
      "torch.nn.functional.cross_entropy(logits.softmax(1), target)"
    ],
    "correctAnswer": 2,
    "explanation": "cross_entropy takes unnormalised logits and these integer indices, combining log-softmax with negative log-likelihood. Pre-softmaxed probabilities would be reinterpreted as logits. BCE needs a different target representation and independent-label interpretation; converting these indices to float does not create valid class-probability targets of shape (B,C).",
    "objectiveIds": [
      "lo-machine-learning-applied-machine-learning-and-implementation"
    ],
    "knowledgeIds": [
      "result-softmax-loss",
      "result-class-index-loss"
    ],
    "tags": [
      "stage-2",
      "concept"
    ],
    "hints": [
      "Check both the representation of predictions and the dtype/shape of class-index targets."
    ]
  },
  {
    "id": "s2-ml-nan-mask-loss",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3 with NumPy, this loss is NaN because NaN*0 is still NaN. Which expression instead gives the mean squared error over the finite predictions only?\n```python\nimport numpy as np\npred = np.array([1.0, np.nan, 3.0])\ntarget = np.array([0.0, 2.0, 1.0])\nmask = np.isfinite(pred)\nwrong = (((pred - target) ** 2) * mask).sum() / mask.sum()\n```",
    "answers": [
      "np.nan_to_num(pred - target).mean(), giving 1.0",
      "((pred - target) ** 2).mean(), giving 2.5",
      "np.nansum((pred - target) ** 2) / len(pred), giving 2.5",
      "((pred[mask] - target[mask]) ** 2).mean(), giving 2.5"
    ],
    "correctAnswer": 3,
    "explanation": "Boolean indexing removes the invalid pair before computing and averaging the two remaining squared errors, 1 and 4, yielding 2.5. A full-length denominator gives 5/3, not the mean over valid pairs. Replacing an error by zero without squaring computes a different quantity. This prompt has finite targets and a nonempty valid mask.",
    "objectiveIds": [
      "lo-machine-learning-applied-machine-learning-and-implementation"
    ],
    "knowledgeIds": [
      "prog-numpy-indexing",
      "prog-numerical-stability"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Discard the invalid pair before arithmetic and use the valid-pair count as the denominator."
    ]
  }
] satisfies MultipleChoiceQuestion[];
