import type { MultipleChoiceQuestion } from '../schema';

// Stage 1: deliberately authored examples; Python 3 and C++20 unless stated otherwise.
export default [
  {
    "id": "ml-learning-curves",
    "category": "Machine Learning",
    "subcategory": "Machine learning foundations",
    "difficulty": "easy",
    "questionType": "concept_identification",
    "prompt": "As model capacity increases, training error keeps falling but validation error starts rising. The validation split is representative and untouched during fitting. What is the most direct diagnosis?",
    "answers": [
      "Overfitting as the generalisation gap grows.",
      "Underfitting because training error is falling.",
      "Proof that the validation labels are always wrong.",
      "Proof that the model’s expected test error is zero."
    ],
    "correctAnswer": 0,
    "explanation": "The model is fitting training-specific variation that does not transfer to held-out data. Regularisation, reduced capacity or more suitable data may help. Falling training loss alone is not evidence of improving generalisation.",
    "knowledgeIds": [
      "ml-validation-leakage",
      "result-bias-variance"
    ]
  },
  {
    "id": "ml-fold-preprocessing",
    "category": "Machine Learning",
    "subcategory": "Machine learning foundations",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "During cross-validation, a scaler and PCA are fitted once on the entire dataset before the folds are created. Which correction prevents leakage into each validation fold?",
    "answers": [
      "Fit only the classifier inside each fold; keep the global transforms.",
      "Fit the scaler, PCA and classifier using only that fold’s training data.",
      "Fit transforms on the validation fold and the classifier on training.",
      "Tune all parameters on the final test set."
    ],
    "correctAnswer": 1,
    "explanation": "Preprocessing learns properties of the data even without labels. Each fold’s validation rows must remain outside fitting of both transformations and the predictor. A pipeline fitted independently within each fold enforces the correct boundary.",
    "knowledgeIds": [
      "ml-validation-leakage",
      "ml-pca"
    ]
  },
  {
    "id": "ml-logistic-probability",
    "category": "Machine Learning",
    "subcategory": "Supervised learning",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "A binary logistic model has logit $z=\\log 3$. With positive-class probability $p=1/(1+e^{-z})$, what is $p$?",
    "answers": [
      "0.25",
      "0.50",
      "0.75",
      "3.00"
    ],
    "correctAnswer": 2,
    "explanation": "Since $e^{-\\log 3}=1/3$, $p=1/(1+1/3)=3/4=0.75$. A logit is a log-odds value, not a probability; the sigmoid maps it into (0,1).",
    "knowledgeIds": [
      "ml-cross-entropy"
    ]
  },
  {
    "id": "ml-forest-correlation",
    "category": "Machine Learning",
    "subcategory": "Supervised learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Two base predictors have equal error variance $v=4$ and error correlation $\\rho=0.5$. What is the error variance of their equally weighted average?",
    "answers": [
      "4",
      "2",
      "1",
      "3"
    ],
    "correctAnswer": 3,
    "explanation": "The average has variance $(v+v+2\\rho v)/4=v(1+\\rho)/2=4(1.5)/2=3$. Averaging reduces variance less when errors are correlated. This calculation alone says nothing about bias or a guarantee of better classification accuracy.",
    "knowledgeIds": [
      "ml-ensemble-variance",
      "result-bias-variance"
    ]
  },
  {
    "id": "ml-kmeans-assignment",
    "category": "Machine Learning",
    "subcategory": "Unsupervised learning",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "In one-dimensional k-means with squared Euclidean distance, fixed centres are 0 and 4. Which centre receives a point at 3 in the assignment step?",
    "answers": [
      "The centre at 4.",
      "The centre at 0.",
      "Both centres must receive half the point.",
      "Neither centre, because the point is not a centre."
    ],
    "correctAnswer": 0,
    "explanation": "Squared distances are (3−0)²=9 and (3−4)²=1, so the centre at 4 is nearer. The assignment step minimises distance for fixed centres; the separate update step recomputes cluster means.",
    "knowledgeIds": [
      "ml-kmeans"
    ]
  },
  {
    "id": "ml-pca-direction",
    "category": "Machine Learning",
    "subcategory": "Unsupervised learning",
    "difficulty": "medium",
    "questionType": "property_recognition",
    "prompt": "Centred two-dimensional data have covariance $\\begin{pmatrix}9&0\\\\0&1\\end{pmatrix}$. What is the one-dimensional first principal-component subspace?",
    "answers": [
      "The second coordinate axis, because its variance is smallest.",
      "The first coordinate axis, because its eigenvalue is largest.",
      "The line $x_1=x_2$, treating positive variance on both axes as equal weights.",
      "The line $x_1=3x_2$, treating standard deviations as component weights."
    ],
    "correctAnswer": 1,
    "explanation": "PCA maximises projected variance among unit directions. The covariance eigenvalues are 9 and 1, so a first component is $(1,0)$ or its negative. The question asks for the subspace to avoid the arbitrary sign convention.",
    "knowledgeIds": [
      "ml-pca"
    ]
  },
  {
    "id": "ml-gradient-step",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "For $L(w)=(w-3)^2$, gradient descent starts at $w=1$ with learning rate $\\eta=0.1$. What is the next iterate?",
    "answers": [
      "0.6",
      "1.2",
      "1.4",
      "3.0"
    ],
    "correctAnswer": 2,
    "explanation": "The derivative is $L'(w)=2(w-3)=-4$. The update is $w_{new}=w-\\eta L'(w)=1-0.1(-4)=1.4$. The negative gradient moves towards the minimum.",
    "knowledgeIds": [
      "ml-gradient-descent"
    ]
  },
  {
    "id": "ml-momentum-step",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Use momentum $v_t=\\beta v_{t-1}+g_t$ and $w_t=w_{t-1}-\\eta v_t$. With $v_{t-1}=2$, $g_t=-1$, $\\beta=0.9$, $w_{t-1}=5$ and $\\eta=0.1$, what is $w_t$?",
    "answers": [
      "5.10",
      "4.80",
      "5.08",
      "4.92"
    ],
    "correctAnswer": 3,
    "explanation": "The specified convention gives $v_t=0.9(2)-1=0.8$ and $w_t=5-0.1(0.8)=4.92$. Other momentum conventions may scale the gradient by $1-\\beta$; they must not be substituted into this explicitly stated recurrence.",
    "knowledgeIds": [
      "ml-gradient-descent"
    ]
  },
  {
    "id": "ml-quadratic-stability",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "difficulty": "medium",
    "questionType": "theorem_conditions",
    "prompt": "For $L(w)=\\tfrac12 a w^2$ with $a>0$, constant-step gradient descent must converge to zero from every starting point. Which condition on $\\eta$ is necessary and sufficient?",
    "answers": [
      "$0<\\eta<2/a$",
      "$\\eta>2/a$",
      "$\\eta=2/a$",
      "$\\eta=0$"
    ],
    "correctAnswer": 0,
    "explanation": "The recurrence is $w_{t+1}=(1-\\eta a)w_t$. Convergence for every start requires $|1-\\eta a|<1$, equivalent to $0<\\eta<2/a$. At the upper boundary, nonzero iterates alternate signs without shrinking.",
    "knowledgeIds": [
      "ml-gradient-descent"
    ]
  },
  {
    "id": "ml-backprop-chain",
    "category": "Machine Learning",
    "subcategory": "Neural networks and deep learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "Let $h=wx$, $y=h^2$ and $L=\\tfrac12(y-t)^2$. At $x=2$, $w=1$ and target $t=1$, what is $\\partial L/\\partial w$?",
    "answers": [
      "12",
      "24",
      "6",
      "48"
    ],
    "correctAnswer": 1,
    "explanation": "Here $h=2$, $y=4$ and $y-t=3$. The chain rule gives $(\\partial L/\\partial y)(\\partial y/\\partial h)(\\partial h/\\partial w)=(y-t)(2h)x=3(4)(2)=24$. Backpropagation multiplies local derivatives and sums contributions when paths merge.",
    "knowledgeIds": [
      "ml-backpropagation"
    ]
  },
  {
    "id": "ml-attention-mask",
    "category": "Machine Learning",
    "subcategory": "Neural networks and deep learning",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "A Transformer decoder trains next-token predictions on a whole sequence in parallel. What prevents a position from using later tokens as input evidence?",
    "answers": [
      "Masking future value vectors after unmasked softmax, leaving their scores in the normalisation.",
      "Masking future positions only after weighted attention outputs are computed.",
      "Masking future-position attention scores before their softmax.",
      "Masking earlier-position scores before softmax while keeping future positions visible."
    ],
    "correctAnswer": 2,
    "explanation": "The causal mask excludes future keys from each position’s attention probability distribution. Applying it after weighted outputs are formed is too late: future values have already contributed. Positional encodings describe order but do not enforce causal information flow.",
    "knowledgeIds": [
      "ml-causal-validation"
    ]
  },
  {
    "id": "ml-bellman-value",
    "category": "Machine Learning",
    "subcategory": "Reinforcement learning",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "A state under a fixed policy has deterministic immediate reward 2 and transitions to a state valued at 10. With discount $\\gamma=0.9$, what does the Bellman expectation backup give?",
    "answers": [
      "2",
      "9",
      "12",
      "11"
    ],
    "correctAnswer": 3,
    "explanation": "The policy backup is $V(s)=E[R+\\gamma V(S')\\mid s]$. Here it is $2+0.9(10)=11$. This uses the immediate reward plus a discounted continuation, not their undiscounted sum.",
    "knowledgeIds": [
      "ml-bellman"
    ]
  },
  {
    "id": "ml-q-learning-update",
    "category": "Machine Learning",
    "subcategory": "Reinforcement learning",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "For a nonterminal transition, Q-learning uses $Q\\leftarrow Q+\\alpha[r+\\gamma\\max_{a'}Q(s',a')-Q]$. With $Q=4$, $r=2$, $\\gamma=0.9$, next maximum 6 and $\\alpha=0.5$, what is the updated value?",
    "answers": [
      "5.7",
      "7.4",
      "3.7",
      "4.7"
    ],
    "correctAnswer": 0,
    "explanation": "The target is $2+0.9(6)=7.4$. The TD error is $7.4-4=3.4$, and the update is $4+0.5(3.4)=5.7$. The target is not the updated estimate unless the learning rate is 1.",
    "knowledgeIds": [
      "ml-bellman"
    ]
  },
  {
    "id": "ml-sarsa-off-policy",
    "category": "Machine Learning",
    "subcategory": "Reinforcement learning",
    "difficulty": "medium",
    "questionType": "property_recognition",
    "prompt": "A nonterminal transition has next-action values 5 and 1. An exploratory behaviour policy selects the action valued at 1. Holding the reward and discount fixed, how do one-step SARSA and Q-learning targets differ?",
    "answers": [
      "Both always use 5, regardless of the selected action.",
      "SARSA uses the selected action’s 1; Q-learning uses the maximum 5.",
      "SARSA uses 5; Q-learning uses the selected action’s 1.",
      "Both omit all next-state values for nonterminal transitions."
    ],
    "correctAnswer": 1,
    "explanation": "SARSA bootstraps from the actual next action under the behaviour policy, while Q-learning uses a greedy next-action value. This distinguishes on-policy and off-policy targets; it does not guarantee convergence with arbitrary function approximation.",
    "knowledgeIds": [
      "ml-bellman"
    ]
  },
  {
    "id": "ml-map-regularisation",
    "category": "Machine Learning",
    "subcategory": "Probabilistic and Bayesian machine learning",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "A parameter vector $w$ has likelihood $p(D\\mid w)$ and prior $N(0,\\tau^2 I)$ with fixed $\\tau>0$. Which objective has the same minimisers as MAP estimation?",
    "answers": [
      "Negative log-likelihood minus $\\|w\\|^2/(2\\tau^2)$.",
      "Only negative log-likelihood, independent of $\\tau$.",
      "Negative log-likelihood plus $\\|w\\|^2/(2\\tau^2)$.",
      "Negative log-likelihood plus $\\tau^2\\|w\\|^2/2$ for every $\\tau$."
    ],
    "correctAnswer": 2,
    "explanation": "The negative log prior contributes $\\|w\\|^2/(2\\tau^2)$ plus a constant independent of w. MAP minimises negative log-likelihood plus this penalty. Smaller prior variance strengthens shrinkage. The coefficient would change if the likelihood objective were averaged over samples.",
    "knowledgeIds": [
      "ml-variational-inference"
    ]
  },
  {
    "id": "ml-elbo-identity",
    "category": "Machine Learning",
    "subcategory": "Probabilistic and Bayesian machine learning",
    "difficulty": "medium",
    "questionType": "theorem_recall",
    "prompt": "For an admissible density $q(z)$ and finite terms, $\\log p(x)=\\mathrm{ELBO}(q)+\\mathrm{KL}(q\\|p(z\\mid x))$. What follows when $p(x)$ is fixed?",
    "answers": [
      "Minimising ELBO minimises the posterior KL.",
      "Maximising ELBO maximises the posterior KL.",
      "ELBO is always greater than log evidence.",
      "Maximising ELBO minimises the stated KL divergence."
    ],
    "correctAnswer": 3,
    "explanation": "Evidence is constant with respect to q. Increasing ELBO therefore decreases the nonnegative KL term. The identity also gives $\\mathrm{ELBO}(q)\\le\\log p(x)$, with equality when q equals the posterior almost everywhere. A restricted variational family may not achieve equality.",
    "knowledgeIds": [
      "ml-variational-inference"
    ]
  },
  {
    "id": "ml-walk-forward",
    "category": "Machine Learning",
    "subcategory": "Time series and sequential machine learning",
    "difficulty": "medium",
    "questionType": "property_recognition",
    "prompt": "You predict tomorrow’s return using only information available by today’s close. Which validation split best preserves this forecast direction?",
    "answers": [
      "Train on earlier dates, validate on later dates, and respect feature/label availability.",
      "Randomly mix future observations into the training set.",
      "Train on later dates and validate on earlier dates.",
      "Use future prices to normalise each training observation."
    ],
    "correctAnswer": 0,
    "explanation": "Walk-forward validation keeps training information earlier than the held-out prediction period. Features and labels must also be available at each simulated decision time. Chronological ordering alone cannot repair features already constructed with future information.",
    "knowledgeIds": [
      "ml-causal-validation",
      "ml-validation-leakage"
    ]
  },
  {
    "id": "ml-overlapping-labels",
    "category": "Machine Learning",
    "subcategory": "Time series and sequential machine learning",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "A training observation at day t has a label equal to its realised return from t to t+5. Validation begins at T, but training includes rows through T−1. Why can this leak validation-period information even with a chronological split?",
    "answers": [
      "Chronological splits necessarily remove all label leakage.",
      "Training labels extend into the validation period.",
      "Five-day labels make all returns independent.",
      "Only the feature dimension can cause leakage."
    ],
    "correctAnswer": 1,
    "explanation": "For example, the label starting at T−1 uses a price at T+4. It would not be known when validation starts at T. Exclude training rows whose label-information intervals cross the boundary, with any additional embargo determined by the evaluation design.",
    "knowledgeIds": [
      "ml-causal-validation"
    ]
  },
  {
    "id": "ml-accuracy-imbalance",
    "category": "Machine Learning",
    "subcategory": "Evaluation and generalisation",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "A test set contains 95 negative and 5 positive cases. A classifier predicts negative for every case. What are its accuracy and positive-class recall?",
    "answers": [
      "95% accuracy; 95% recall",
      "5% accuracy; 0% recall",
      "95% accuracy; 0% recall",
      "100% accuracy; 100% recall"
    ],
    "correctAnswer": 2,
    "explanation": "It correctly labels all 95 negatives, giving 95/100 accuracy. It finds none of the five positives, so recall is 0/5=0. High accuracy alone can conceal complete failure on the minority class.",
    "knowledgeIds": [
      "ml-classification-metrics"
    ]
  },
  {
    "id": "ml-test-set-role",
    "category": "Machine Learning",
    "subcategory": "Evaluation and generalisation",
    "difficulty": "easy",
    "questionType": "property_recognition",
    "prompt": "After repeated model selection using validation data, what is the proper role of an untouched final test set?",
    "answers": [
      "Fit preprocessing parameters using its rows.",
      "Select the best learning rate after examining each test score.",
      "Guarantee performance under every future distribution.",
      "Estimate the selected model’s performance under the test sampling conditions."
    ],
    "correctAnswer": 3,
    "explanation": "A final test set estimates performance after selection decisions are fixed. Repeated tuning to its results turns it into additional validation data. Its estimate still has sampling uncertainty and may not represent future distribution shifts.",
    "knowledgeIds": [
      "ml-validation-leakage"
    ]
  },
  {
    "id": "ml-precision-recall",
    "category": "Machine Learning",
    "subcategory": "Evaluation and generalisation",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "A binary classifier has 18 true positives, 6 false positives and 12 false negatives. What are positive-class precision and recall?",
    "answers": [
      "0.75 precision; 0.60 recall",
      "0.60 precision; 0.75 recall",
      "0.75 precision; 0.75 recall",
      "0.60 precision; 0.60 recall"
    ],
    "correctAnswer": 0,
    "explanation": "Precision is TP/(TP+FP)=18/24=0.75. Recall is TP/(TP+FN)=18/30=0.60. The denominators count predicted positives and actual positives respectively. True negatives are unnecessary for these two metrics.",
    "knowledgeIds": [
      "ml-classification-metrics"
    ]
  },
  {
    "id": "ml-eval-grad-mode",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "difficulty": "easy",
    "questionType": "implication",
    "prompt": "In PyTorch 2.x, which statement correctly distinguishes model.eval() and torch.no_grad() for ordinary validation?",
    "answers": [
      "eval() disables autograd; no_grad() changes dropout behaviour.",
      "eval() changes module mode; no_grad() suppresses recording.",
      "Both calls do exactly the same thing.",
      "Neither affects validation behaviour or memory use."
    ],
    "correctAnswer": 1,
    "explanation": "eval() selects evaluation behaviour for modules such as dropout and batch normalisation; it does not itself disable autograd. no_grad() suppresses gradient recording but does not change the model’s training/evaluation mode. Ordinary validation commonly needs both.",
    "knowledgeIds": [
      "ml-validation-loop"
    ]
  },
  {
    "id": "ml-gradient-accumulation",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In a PyTorch 2.x loop intended to perform one independent optimiser step per minibatch, what is missing? Assume opt owns the model parameters.\n```python\nfor x, y in loader:\n    loss = criterion(model(x), y)\n    loss.backward()\n    opt.step()\n```",
    "answers": [
      "A softmax after opt.step().",
      "An extra backward() before every forward pass.",
      "Clear gradients before each independent minibatch backward pass.",
      "A call to model.eval() before every training batch."
    ],
    "correctAnswer": 2,
    "explanation": "backward accumulates gradients in parameter buffers. Without opt.zero_grad() or an equivalent reset, previous minibatches contribute to later steps. Accumulation can be intentional, but this loop’s stated objective requires clearing gradients before the next independent backward pass.",
    "knowledgeIds": [
      "ml-validation-loop",
      "ml-backpropagation"
    ]
  },
  {
    "id": "ml-loss-broadcast-bug",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In PyTorch 2.x, pred and target are real floating-point tensors on the same device with compatible arithmetic dtypes. pred has shape (B, 1) and target has shape (B,), with B>1. What does this expression do, and what matches each prediction to its own target?\n```python\nloss = ((pred - target) ** 2).mean()\n```",
    "answers": [
      "It forms B independent errors; no fix is needed.",
      "It necessarily raises a shape error before subtraction.",
      "It forms (B, 1, B) errors; summing instead of averaging fixes pairing.",
      "It forms (B, B) errors; reshape target to (B, 1) before subtracting."
    ],
    "correctAnswer": 3,
    "explanation": "Trailing-axis broadcasting expands (B,1) and (B,) to (B,B), comparing every prediction with every target. target.reshape(B,1) aligns the pairs. A mean over the unintended matrix can run without error, so checking only that the loss is scalar is insufficient.",
    "knowledgeIds": [
      "prog-numpy-broadcasting",
      "ml-validation-loop"
    ]
  },
  {
    "id": "ml-terminal-target",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In episodic Q-learning with true terminal states, the next-state maximum is finite. What correction is needed for this detached target? Distinguish terminal transitions from time-limit truncations.\n```python\nwith torch.no_grad():\n    q_next = net(next_s).max(1).values\n    target = reward + gamma * q_next\n```",
    "answers": [
      "Use reward + gamma * (1 - terminal.float()) * q_next.",
      "Always omit the continuation for every transition.",
      "Multiply the immediate reward by gamma and leave continuation unmasked.",
      "Remove no_grad() so the target learns through the same backward pass."
    ],
    "correctAnswer": 0,
    "explanation": "At true termination there is no future episodic return, so the target is reward alone. The mask removes bootstrap value only for terminal transitions. A time-limit truncation need not imply a terminal MDP state. Detaching the target also avoids differentiating through the bootstrap in this semi-gradient update.",
    "knowledgeIds": [
      "ml-bellman",
      "ml-validation-loop"
    ]
  },
] satisfies MultipleChoiceQuestion[];
