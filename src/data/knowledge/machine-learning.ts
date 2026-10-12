import type { KnowledgeObject } from './schema';

export default [
  {
    "id": "ml-validation-leakage",
    "name": "Training, selection and leakage boundaries",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Machine learning foundations",
    "statement": "Fit learned preprocessing and predictors using training rows only, separately within each validation fold. Use validation results for selection, then assess the fixed selected procedure on an untouched test set.",
    "assumptions": "The held-out sampling design must match the evaluation goal; time series need additional causal constraints.",
    "intuition": "Even an unsupervised scaler or PCA can leak information when fitted on held-out rows.",
    "relatedKnowledgeIds": [
      "ml-causal-validation",
      "result-bias-variance"
    ]
  },
  {
    "id": "ml-cross-entropy",
    "name": "Logits, sigmoid and cross-entropy loss",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Supervised learning",
    "statement": "For a binary logit z, positive-class probability is $\\sigma(z)=1/(1+e^{-z})$. Binary cross-entropy is $-[y\\log p+(1-y)\\log(1-p)]$. For mutually exclusive classes, cross-entropy from logits is log-sum-exp of all logits minus the true-class logit.",
    "assumptions": "Targets are valid class indicators or distributions as required by the chosen API. PyTorch CrossEntropyLoss accepts raw logits; class-index targets use long integer type. BCEWithLogitsLoss combines sigmoid with a numerically stable binary loss.",
    "intuition": "Do not apply an extra softmax before a logits-based cross-entropy API.",
    "relatedKnowledgeIds": [
      "ml-validation-loop"
    ]
  },
  {
    "id": "ml-ensemble-variance",
    "name": "Variance of correlated ensemble predictions",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Supervised learning",
    "statement": "If two scalar prediction errors have variance v and correlation $\\rho$, the variance of their equal-weight average is $v(1+\\rho)/2$. This follows from $\\operatorname{Var}((X+Y)/2)=[\\operatorname{Var}X+\\operatorname{Var}Y+2\\operatorname{Cov}(X,Y)]/4$.",
    "assumptions": "Finite second moments and equal positive variance. The formula does not establish an improvement in bias or classification accuracy.",
    "relatedKnowledgeIds": [
      "result-bias-variance"
    ]
  },
  {
    "id": "ml-kmeans",
    "name": "K-means assignment and centre updates",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Unsupervised learning",
    "statement": "For squared Euclidean k-means, assign each observation to a nearest centre with centres fixed, then update each non-empty cluster’s centre to its mean. Alternating these steps does not increase the objective, but may reach a local optimum.",
    "assumptions": "Specify a tie rule and an empty-cluster policy where needed. Feature scaling and initialisation affect the result.",
    "intuition": "Clustering does not use class labels and does not automatically recover meaningful economic regimes."
  },
  {
    "id": "ml-pca",
    "name": "Principal components of centred data",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Unsupervised learning",
    "statement": "For centred data with covariance matrix $\\Sigma$, a unit first principal-component direction maximises $u^T\\Sigma u$ and is an eigenvector for the largest eigenvalue. Its sign is arbitrary; repeated top eigenvalues can make the direction non-unique.",
    "assumptions": "Finite covariance; standard covariance PCA without whitening. Centre features and decide whether scaling is appropriate; fit transformations only on training data.",
    "intuition": "Largest variance is not necessarily the most predictive direction.",
    "relatedKnowledgeIds": [
      "ml-validation-leakage"
    ]
  },
  {
    "id": "ml-gradient-descent",
    "name": "Gradient descent, momentum and quadratic stability",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "statement": "Gradient descent uses $w_{t+1}=w_t-\\eta\\nabla L(w_t)$. One momentum convention is $v_t=\\beta v_{t-1}+g_t$, $w_t=w_{t-1}-\\eta v_t$. For $L(w)=a w^2/2$, a>0, convergence from every start holds exactly when $0<\\eta<2/a$.",
    "assumptions": "The stability result is for exact gradients, scalar quadratic loss and constant step size. Other momentum conventions and noisy gradients require separate analysis.",
    "intuition": "A learning rate that is too large can produce oscillation or divergence.",
    "relatedKnowledgeIds": [
      "ml-backpropagation"
    ]
  },
  {
    "id": "ml-backpropagation",
    "name": "Backpropagation and accumulated gradients",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Neural networks and deep learning",
    "statement": "Reverse-mode differentiation applies the chain rule along computational paths and sums contributions where paths meet. PyTorch backward accumulates into gradient buffers; clear them before independent minibatch updates unless accumulation is intentional.",
    "assumptions": "Differentiable operations or the framework’s specified derivative conventions. A detached target is treated as constant during the backward pass.",
    "intuition": "The optimiser step changes parameters; it does not itself clear previous gradients.",
    "relatedKnowledgeIds": [
      "ml-gradient-descent",
      "ml-validation-loop"
    ]
  },
  {
    "id": "ml-bellman",
    "name": "Bellman backups, Q-learning and SARSA",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Reinforcement learning",
    "statement": "For a policy, $V^\\pi(s)=E_\\pi[R_{t+1}+\\gamma V^\\pi(S_{t+1})\\mid S_t=s]$. Q-learning targets $r+\\gamma\\max_{a'}Q(s',a')$; SARSA targets $r+\\gamma Q(s',a_{next})$ using the actual next action. The update is Q plus learning rate times target minus old Q.",
    "assumptions": "Standard discounted MDP, or a well-defined finite episodic return. Set continuation to zero at true terminal states. Time-limit truncation is not necessarily MDP termination.",
    "intuition": "The target and the updated estimate differ unless the learning rate is one. Function approximation requires additional convergence care.",
    "relatedKnowledgeIds": [
      "ml-validation-loop"
    ]
  },
  {
    "id": "ml-variational-inference",
    "name": "MAP objectives and variational evidence bounds",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Probabilistic and Bayesian machine learning",
    "statement": "MAP maximises likelihood times prior. A fixed isotropic Gaussian prior of variance $\\tau^2$ adds $\\|w\\|^2/(2\\tau^2)$ to total negative log-likelihood. Variational inference uses $\\log p(x)=\\mathrm{ELBO}(q)+\\mathrm{KL}(q\\|p(z\\mid x))$.",
    "assumptions": "The MAP penalty is for the summed, not sample-averaged, likelihood. For the ELBO identity assume admissible densities and finite terms.",
    "intuition": "Maximising the bound minimises the specified posterior KL; an approximate family may never contain the exact posterior."
  },
  {
    "id": "ml-causal-validation",
    "name": "Causal sequence modelling and walk-forward validation",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Time series and sequential machine learning",
    "statement": "At each simulated decision time, use only information then available. Train on earlier periods and validate on later ones; exclude training labels whose information intervals cross the boundary. Causal attention masks future scores before the softmax.",
    "assumptions": "Choose gaps or embargoes from label horizons and the evaluation design. True termination and administrative truncation also need separate treatment in RL.",
    "intuition": "A chronological row split alone does not remove future-derived features or overlapping labels.",
    "relatedKnowledgeIds": [
      "ml-validation-leakage"
    ]
  },
  {
    "id": "ml-classification-metrics",
    "name": "Classification precision, recall and accuracy",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Evaluation and generalisation",
    "statement": "For positive-class counts, precision is $TP/(TP+FP)$ and recall is $TP/(TP+FN)$. Accuracy is the fraction of all labels predicted correctly.",
    "assumptions": "Denominators must be positive for these ratios; otherwise state the reporting convention. Choose metrics to match class balance and decision costs.",
    "intuition": "Predicting only the majority class can yield high accuracy while missing every positive case."
  },
  {
    "id": "ml-validation-loop",
    "name": "PyTorch training, evaluation and target handling",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "statement": "For ordinary validation, model.eval() selects evaluation behaviour for modules such as dropout and batch normalisation; torch.no_grad() disables gradient recording. In training, reset gradients before independent backward calls and step the optimiser afterwards. Check tensor shapes before computing paired losses.",
    "assumptions": "PyTorch 2.x ordinary tensors, module modes and autograd. Deliberate gradient accumulation or validation requiring derivatives are separate cases.",
    "intuition": "A scalar loss can still hide an incorrect broadcast. A semi-gradient RL target should be detached and must omit continuation at true termination.",
    "relatedKnowledgeIds": [
      "ml-backpropagation",
      "ml-bellman",
      "prog-numpy-broadcasting"
    ]
  }
] satisfies KnowledgeObject[];
