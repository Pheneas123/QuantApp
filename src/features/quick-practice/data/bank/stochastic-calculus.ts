import type { MultipleChoiceQuestion } from '../schema';
const m = String.raw;

export default [
  {
    id: "calc-001", category: "Stochastic Calculus",
    knowledgeIds: ['def-brownian-motion'],
    subcategory: "Brownian motion properties", difficulty: "easy",
    questionType: "property_recognition",
    prompt: m`For standard Brownian motion $(W_t)$, what is the distribution of $W_t-W_s$ when $0\le s<t$?`,
    answers: [
      m`$N(0,t-s)$`,
      m`$N(0,t+s)$`,
      m`$N(t-s,1)$`,
      m`$N(0,(t-s)^2)$`,
    ],
    correctAnswer: 0,
    explanation: m`By stationary increments, $W_t-W_s$ has the law of $W_{t-s}$. Thus its mean is zero and its variance is $t-s$; $\sqrt{t-s}$ is the standard deviation.`,
  },
  {
    id: "calc-002", category: "Stochastic Calculus",
    knowledgeIds: ['def-quadratic-variation'],
    subcategory: "Quadratic variation", difficulty: "easy",
    questionType: "theorem_recall",
    prompt: m`What is the quadratic variation $[W]_t$ of standard Brownian motion?`,
    answers: [
      m`$0$`,
      m`$t$`,
      m`$W_t^2$`,
      m`$\sqrt t$`,
    ],
    correctAnswer: 1,
    explanation: m`Squared increments accumulate to elapsed time in the quadratic-variation limit. The random square Wₜ² is not itself the quadratic variation.`,
  },
  {
    id: "calc-003", category: "Stochastic Calculus",
    hints: [m`Differentiate $f(x)=x^2$ twice.`, m`The second-order term uses Brownian quadratic variation, not ordinary path variation.`],
    knowledgeIds: ['thm-ito-formula'],
    subcategory: "Ito's lemma", difficulty: "medium",
    questionType: "short_calculation",
    prompt: m`By Itô's formula, which expression equals $d(W_t^2)$ for standard Brownian motion?`,
    answers: [
      m`$2W_t\,dW_t$`,
      m`$W_t\,dt+2\,dW_t$`,
      m`$2W_t\,dW_t+dt$`,
      m`$2W_t\,dW_t+2dt$`,
    ],
    correctAnswer: 2,
    explanation: m`The first derivative of x² gives 2Wₜ dWₜ and half the second derivative times d[W]ₜ contributes dt.`,
  },
  {
    id: "calc-004", category: "Stochastic Calculus",
    knowledgeIds: ['def-brownian-motion', 'def-martingale'],
    subcategory: "Brownian motion properties", difficulty: "easy",
    questionType: "short_calculation",
    prompt: m`For standard Brownian motion in its natural filtration, what is $E[W_5\mid\mathcal F_2]$ when the observed value of $W_2$ is 1.3?`,
    answers: [
      m`0`,
      m`1.3`,
      m`3`,
      m`3.25`,
    ],
    correctAnswer: 1,
    explanation: m`The future increment has conditional mean zero, so the best conditional mean is the current value. The elapsed time determines the conditional variance, not a drift.`,
  },
  {
    id: "calc-006", category: "Stochastic Calculus",
    knowledgeIds: ['cor-nonnegative-local-martingale', 'def-local-martingale'],
    subcategory: "Local martingales", difficulty: "hard",
    questionType: "implication",
    prompt: m`A nonnegative local martingale with integrable initial value is necessarily which of the following?`,
    answers: [
      m`A uniformly integrable martingale.`,
      m`A supermartingale.`,
      m`A process with constant expectation.`,
      m`A submartingale.`,
    ],
    correctAnswer: 1,
    explanation: m`Conditional Fatou applied to a localising sequence gives the supermartingale inequality. A strict local martingale need not preserve its expectation.`,
  },
  {
    id: "calc-007", category: "Stochastic Calculus",
    knowledgeIds: ['def-ito-integral'],
    subcategory: "Stochastic integration", difficulty: "medium",
    questionType: "definition_recognition",
    prompt: m`For a predictable elementary integrand $H_s=\xi1_{(a,b]}(s)$, with bounded $\mathcal F_a$-measurable $\xi$, what is $\int_0^t H_s\,dW_s$?`,
    answers: [
      m`$\xi(W_{t\wedge b}-W_{t\wedge a})$`,
      m`$\xi(W_{t\wedge b}+W_{t\wedge a})$`,
      m`$\xi(W_b-W_a)$ for every $t\ge0$`,
      m`$\xi((t\wedge b)-(t\wedge a))$`,
    ],
    correctAnswer: 0,
    explanation: m`The stochastic integral multiplies the known coefficient by the Brownian increment across the part of (a,b] already traversed. It is zero before a and stops changing after b.`,
  },
  {
    "id": "calc-008",
    "category": "Stochastic Calculus",
    "knowledgeIds": [
      "thm-ito-isometry"
    ],
    "subcategory": "Ito integral",
    "difficulty": "medium",
    "questionType": "theorem_recall",
    "prompt": "Let $W$ be standard Brownian motion relative to $(\\mathcal F_t)$ under $P$, with the usual conditions; predictability is relative to this filtration. Let $H$ be predictable and $E\\int_0^T H_s^2\\,ds<\\infty$. Which identity is the Itô isometry?",
    "answers": [
      "$E[(\\int_0^T H_s\\,dW_s)^2]=(E\\int_0^T H_s\\,ds)^2$.",
      "$E[(\\int_0^T H_s\\,dW_s)^2]=E\\int_0^T H_s^2\\,ds$.",
      "$E[(\\int_0^T H_s\\,dW_s)^2]=E[(\\int_0^T H_s\\,ds)^2]$.",
      "$E[(\\int_0^T H_s\\,dW_s)^2]=\\int_0^T(EH_s)^2\\,ds$."
    ],
    "correctAnswer": 1,
    "explanation": "Orthogonality of Brownian increments converts the second moment of the stochastic integral into the expected integral of the squared integrand."
  },
  {
    "id": "calc-009",
    "category": "Stochastic Calculus",
    "knowledgeIds": [
      "def-ito-integral",
      "thm-ito-isometry"
    ],
    "subcategory": "Ito integral",
    "difficulty": "medium",
    "questionType": "theorem_conditions",
    "prompt": "Let $W$ be standard Brownian motion relative to $(\\mathcal F_t)$ under $P$, with the usual conditions; predictability is relative to this filtration. For a predictable $H$, which condition on a fixed finite horizon $T$ guarantees that $M_t=\\int_0^t H_s\\,dW_s$ is a square-integrable martingale for $t\\le T$?",
    "answers": [
      "$\\int_0^T H_s^2\\,ds<\\infty$ almost surely.",
      "$E\\int_0^T|H_s|\\,ds<\\infty$.",
      "$E\\int_0^T H_s^2\\,ds<\\infty$.",
      "$E|H_t|<\\infty$ for each $t\\le T$."
    ],
    "correctAnswer": 2,
    "explanation": "Finite expected quadratic energy gives square integrability through the isometry. Almost sure finite energy alone gives a local construction without the same moment guarantee."
  },
  {
    id: "calc-010", category: "Stochastic Calculus",
    knowledgeIds: ['thm-ito-formula'],
    subcategory: "Ito's lemma", difficulty: "medium",
    questionType: "theorem_recall",
    prompt: m`Let $dX_t=b_t\,dt+\sigma_t\,dW_t$ and $f\in C^{1,2}$. Which expression is the drift term in $df(t,X_t)$?`,
    answers: [
      m`$(f_t+b_tf_x+\sigma_tf_{xx})\,dt$`,
      m`$(f_t+b_tf_x+\sigma_t^2f_{xx})\,dt$`,
      m`$(f_t+b_tf_x-\tfrac12\sigma_t^2f_{xx})\,dt$`,
      m`$(f_t+b_tf_x+\tfrac12\sigma_t^2f_{xx})\,dt$`,
    ],
    correctAnswer: 3,
    explanation: m`The quadratic-variation contribution is one half of the second spatial derivative times σₜ²dt. All derivatives are evaluated at (t,Xₜ).`,
  },
  {
    id: "calc-011", category: "Stochastic Calculus",
    knowledgeIds: ['thm-ito-formula', 'def-quadratic-variation'],
    subcategory: "Semimartingales", difficulty: "medium",
    questionType: "theorem_recall",
    prompt: m`For continuous semimartingales $X,Y$, which is the stochastic product rule?`,
    answers: [
      m`$d(XY)=X\,dY+Y\,dX+d[X,Y]$.`,
      m`$d(XY)=X\,dY+Y\,dX$.`,
      m`$d(XY)=X\,dY+Y\,dX-d[X,Y]$.`,
      m`$d(XY)=X\,dY+Y\,dX+\tfrac12d[X,Y]$.`,
    ],
    correctAnswer: 0,
    explanation: m`The cross-increment terms converge to covariation. Unlike the second derivative term in Itô's formula for a single function, the product correction has coefficient one.`,
  },
  {
    id: "calc-012", category: "Stochastic Calculus",
    knowledgeIds: ['def-continuous-semimartingale'],
    subcategory: "Semimartingales", difficulty: "medium",
    questionType: "definition_recognition",
    prompt: m`Which decomposition characterises a continuous semimartingale $X$ relative to its filtration?`,
    answers: [
      m`X=M+A with M a continuous martingale and A a deterministic smooth function.`,
      m`X=M+A with M a continuous local martingale and A continuous adapted of locally finite variation.`,
      m`X=M+A with M a continuous adapted process and A continuous of zero quadratic variation.`,
      m`X=M+A with M a continuous local martingale and A an arbitrary continuous adapted process.`,
    ],
    correctAnswer: 1,
    explanation: m`The finite-variation part may be random, and the martingale part need only be local. Zero quadratic variation is not in general the same as finite variation.`,
  },
  {
    id: "calc-013", category: "Stochastic Calculus",
    knowledgeIds: ['def-local-martingale', 'def-quadratic-variation'],
    subcategory: "Continuous martingales", difficulty: "hard",
    questionType: "implication",
    prompt: m`A continuous local martingale $M$ starts at zero and has locally finite-variation paths almost surely. What must hold?`,
    answers: [
      m`M can have deterministic nonzero linear drift.`,
      m`M can be any compensated Poisson process.`,
      m`M is indistinguishable from the zero process.`,
      m`M need only have mean zero at every fixed time.`,
    ],
    correctAnswer: 2,
    explanation: m`A continuous finite-variation process has zero quadratic variation. A continuous local martingale with zero quadratic variation is constant, hence zero here.`,
  },
  {
    id: "calc-014", category: "Stochastic Calculus",
    knowledgeIds: ['thm-ito-formula'],
    subcategory: "Stochastic differential equations", difficulty: "medium",
    questionType: "short_calculation",
    prompt: m`For $dX_t=\mu X_t\,dt+\sigma X_t\,dW_t$, constants $\mu,\sigma$ and $X_0=x>0$, which is the solution?`,
    answers: [
      m`$X_t=x\exp(\mu t+\sigma W_t)$`,
      m`$X_t=x\exp((\mu+\tfrac12\sigma^2)t+\sigma W_t)$`,
      m`$X_t=x\exp((\mu-\tfrac12\sigma)t+\sigma W_t)$`,
      m`$X_t=x\exp((\mu-\tfrac12\sigma^2)t+\sigma W_t)$`,
    ],
    correctAnswer: 3,
    explanation: m`Apply Itô's formula to log X. Its drift is μ−σ²/2, which is the correction absent from ordinary differential calculus.`,
  },
  {
    id: "calc-015", category: "Stochastic Calculus",
    subcategory: "Stochastic differential equations", difficulty: "medium",
    questionType: "short_calculation",
    prompt: m`The Ornstein–Uhlenbeck equation is $dX_t=\kappa(\theta-X_t)\,dt+\sigma\,dW_t$, with constants $\kappa>0$ and $X_0=x$. What is $E[X_t]$?`,
    answers: [
      m`$\theta+(x-\theta)e^{-\kappa t}$`,
      m`$x+\kappa\theta t$`,
      m`$\theta+(x-\theta)e^{\kappa t}$`,
      m`$xe^{-\kappa t}$`,
    ],
    correctAnswer: 0,
    explanation: m`Taking expectation yields m′=κ(θ−m), m(0)=x. The mean tends to θ at exponential rate κ.`,
  },
  {
    "id": "calc-016",
    "category": "Stochastic Calculus",
    "knowledgeIds": [
      "def-strong-solution",
      "def-weak-solution"
    ],
    "subcategory": "Strong and weak solutions",
    "difficulty": "medium",
    "questionType": "definition_recognition",
    "prompt": "What distinguishes a strong solution from weak existence for a Brownian SDE with a specified initial condition?",
    "answers": [
      "A strong solution may choose a new probability space and Brownian motion to realise the initial law.",
      "A strong solution is constructed from the prescribed Brownian motion and initial data.",
      "Strong existence only specifies a path law, without constructing a process driven by the prescribed noise.",
      "A strong solution may use future Brownian increments to determine its present state."
    ],
    "correctAnswer": 1,
    "explanation": "Strong solvability requires a solution driven by the given noise and initial data. Weak existence allows the probability space and driving Brownian motion to be chosen as part of the solution."
  },
  {
    "id": "calc-017",
    "category": "Stochastic Calculus",
    "knowledgeIds": [
      "def-strong-solution",
      "thm-global-strong-sde"
    ],
    "subcategory": "Existence and uniqueness",
    "difficulty": "medium",
    "questionType": "theorem_conditions",
    "prompt": "For $dX_t=b(X_t)\\,dt+\\sigma(X_t)\\,dW_t$ on $\\mathbb R$, which standard coefficient hypothesis ensures a unique global strong solution for square-integrable initial data independent of future Brownian increments?",
    "answers": [
      "b and σ are continuous, with no growth bound.",
      "b and σ are locally Lipschitz, with no growth bound.",
      "b and σ are globally Lipschitz.",
      "b and σ are bounded and Borel measurable."
    ],
    "correctAnswer": 2,
    "explanation": "Global Lipschitz continuity gives linear growth and the usual Picard existence and pathwise uniqueness theorem. Local Lipschitz alone allows explosion, and bounded measurable coefficients alone do not ensure pathwise uniqueness."
  },
  {
    "id": "calc-018",
    "category": "Stochastic Calculus",
    "knowledgeIds": [
      "thm-girsanov"
    ],
    "subcategory": "Girsanov theorem",
    "difficulty": "hard",
    "questionType": "theorem_recall",
    "prompt": "Let $W$ be standard Brownian motion relative to $(\\mathcal F_t)$ under $P$, with the usual conditions; predictability is relative to this filtration. On $[0,T]$, let predictable $\\theta$ satisfy Novikov's condition and set $Z_T=\\exp(-\\int_0^T\\theta_s\\,dW_s-\\frac12\\int_0^T\\theta_s^2\\,ds)$. Under $dQ=Z_T\\,dP$, which process is Brownian?",
    "answers": [
      "$W_t-\\int_0^t\\theta_s\\,ds$",
      "$W_t+\\int_0^t\\theta_s\\,dW_s$",
      "$W_t-\\frac12\\int_0^t\\theta_s^2\\,ds$",
      "$W_t+\\int_0^t\\theta_s\\,ds$"
    ],
    "correctAnswer": 3,
    "explanation": "The negative stochastic-integral sign in the density corresponds to adding the integrated θ to W under Q. The direction of measure change fixes the drift sign."
  },
  {
    "id": "calc-019",
    "category": "Stochastic Calculus",
    "knowledgeIds": [
      "thm-novikov"
    ],
    "subcategory": "Girsanov theorem",
    "difficulty": "hard",
    "questionType": "theorem_conditions",
    "prompt": "Let $W$ be standard Brownian motion relative to $(\\mathcal F_t)$ under $P$, with the usual conditions; predictability is relative to this filtration. For predictable $\\theta$ on $[0,T]$, which is Novikov's sufficient condition for the stochastic exponential of $\\int\\theta\\,dW$ to be a true martingale?",
    "answers": [
      "$E\\exp(\\tfrac12\\int_0^T\\theta_s^2\\,ds)<\\infty$.",
      "$\\exp(\\tfrac12 E\\int_0^T\\theta_s^2\\,ds)<\\infty$.",
      "$E\\int_0^T|\\theta_s|\\,ds<\\infty$.",
      "$\\int_0^T\\theta_s^2\\,ds<\\infty$ almost surely."
    ],
    "correctAnswer": 0,
    "explanation": "Novikov controls the expectation of the exponential quadratic energy, not merely the exponential of its expectation. It is sufficient, not necessary."
  },
  {
    id: "calc-020", category: "Stochastic Calculus",
    knowledgeIds: ['thm-martingale-representation'],
    subcategory: "Martingale representation", difficulty: "hard",
    questionType: "theorem_conditions",
    prompt: m`For $W$ on $[0,T]$, which filtration assumption gives the Brownian representation $M_t=M_0+\int_0^tH_s\,dW_s$ for every square-integrable martingale in that filtration?`,
    answers: [
      m`Any filtration containing W's past, even with independent new noise.`,
      m`The completed, right-continuous natural filtration of W.`,
      m`Any filtration with respect to which W is adapted.`,
      m`Any filtration making Wₜ normal with variance t.`,
    ],
    correctAnswer: 1,
    explanation: m`The Brownian filtration contains no extra martingale noise beyond W. An enlarged filtration with an independent Brownian motion supplies martingales that cannot all be represented using W alone.`,
  },
  {
    id: "calc-021", category: "Stochastic Calculus",
    knowledgeIds: ['def-infinitesimal-generator'],
    subcategory: "Infinitesimal generators", difficulty: "medium",
    questionType: "definition_recall",
    prompt: m`For $dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t$, what is the formal generator on smooth test functions $f$?`,
    answers: [
      m`$Lf=bf'+\sigma f''$`,
      m`$Lf=bf'+\sigma^2f''$`,
      m`$Lf=bf'+\tfrac12\sigma^2f''$`,
      m`$Lf=-bf'+\tfrac12\sigma^2f''$`,
    ],
    correctAnswer: 2,
    explanation: m`The generator is the drift of f(Xₜ) in Itô's formula. The diffusion contributes half the squared volatility times the second derivative.`,
  },
  {
    id: "calc-022", category: "Stochastic Calculus",
    knowledgeIds: ['def-infinitesimal-generator'],
    subcategory: "Kolmogorov equations", difficulty: "medium",
    questionType: "theorem_recall",
    prompt: m`A time-homogeneous diffusion has generator $L$ and smooth transition density $p(t,x,y)$. Which is its forward equation, with $L^*$ the formal adjoint?`,
    answers: [
      m`$\partial_t p=L_x^*p$`,
      m`$\partial_t p=-L_y^*p$`,
      m`$\partial_t p=L_yp$`,
      m`$\partial_t p=L_y^*p$`,
    ],
    correctAnswer: 3,
    explanation: m`The forward equation evolves the density in the terminal variable y using the adjoint. The backward equation acts with L on the starting variable x.`,
  },
  {
    id: "calc-023", category: "Stochastic Calculus",
    knowledgeIds: ['thm-feynman-kac'],
    subcategory: "Feynman-Kac", difficulty: "hard",
    questionType: "theorem_recall",
    prompt: m`Let $dX_s=b(X_s)\,ds+\sigma(X_s)\,dW_s$ have globally Lipschitz coefficients and generator $L$, with bounded continuous $r,g$ and finite $T$. Which terminal-value PDE gives a bounded classical solution the representation $u(t,x)=E_{t,x}[e^{-\int_t^T r(X_s)\,ds}g(X_T)]$?`,
    answers: [
      m`$u_t+Lu-ru=0,\quad u(T,x)=g(x)$.`,
      m`$u_t+Lu+ru=0,\quad u(T,x)=g(x)$.`,
      m`$u_t-Lu-ru=0,\quad u(T,x)=g(x)$.`,
      m`$u_t+Lu-ru=g,\quad u(T,x)=0$.`,
    ],
    correctAnswer: 0,
    explanation: m`Applying Itô to the discounted u(s,Xₛ) makes its drift proportional to uₜ+Lu−ru. The payoff is imposed at the terminal time.`,
  },
  {
    "id": "calc-024",
    "category": "Stochastic Calculus",
    "knowledgeIds": [
      "def-martingale-problem"
    ],
    "subcategory": "Martingale problems",
    "difficulty": "hard",
    "questionType": "definition_recognition",
    "prompt": "On canonical continuous-path space, what does solving the martingale problem for $(L,C_c^\\infty)$ with initial law $\\nu$ require? Use the true-martingale convention in the canonical filtration; assume the displayed integrals are well-defined and the compensated test processes integrable at every finite time.",
    "answers": [
      "$X_0\\sim\\nu$ and $f(X_t)-f(X_0)$ is a martingale for each test $f$.",
      "$X_0\\sim\\nu$ and $f(X_t)-f(X_0)-\\int_0^tLf(X_s)\\,ds$ is a martingale for each test $f$.",
      "$X_0\\sim\\nu$ and $f(X_t)-f(X_0)+\\int_0^tLf(X_s)\\,ds$ is a martingale for each test $f$.",
      "$X_0\\sim\\nu$ and $Lf(X_t)-Lf(X_0)-\\int_0^tf(X_s)\\,ds$ is a martingale for each test $f$."
    ],
    "correctAnswer": 1,
    "explanation": "The generator specifies the compensating drift for every test function, relative to the canonical filtration. This formulates the dynamics through laws without first specifying a driving Brownian motion."
  },
  {
    id: "calc-025", category: "Stochastic Calculus",
    knowledgeIds: ['thm-dambis-dubins-schwarz'],
    subcategory: "Continuous martingales", difficulty: "hard",
    questionType: "theorem_recall",
    prompt: m`Let $M$ be a continuous local martingale with $M_0=0$ and $[M]_\infty=\infty$ a.s. Dambis–Dubins–Schwarz gives which representation for a Brownian motion $B$ in the time-changed filtration?`,
    answers: [
      m`$M_t=B_t$ for every $t\ge0$.`,
      m`$M_t=[M]_tB_t$ for every $t\ge0$.`,
      m`$M_t=B_{[M]_t}$ for every $t\ge0$.`,
      m`$M_t=B_{E([M]_t)}$ for every $t\ge0$.`,
    ],
    correctAnswer: 2,
    explanation: m`Quadratic variation serves as the random Brownian clock. Its divergence ensures the inverse clock covers every Brownian time without needing an extension.`,
  },
  {
    id: "calc-026", category: "Stochastic Calculus",
    knowledgeIds: ['thm-yamada-watanabe'],
    subcategory: "Strong and weak solutions", difficulty: "hard",
    questionType: "theorem_recall",
    prompt: m`For a standard finite-dimensional Brownian SDE, which implication is the Yamada–Watanabe theorem?`,
    answers: [
      m`Weak existence and uniqueness in law imply pathwise uniqueness.`,
      m`Pathwise uniqueness alone implies weak existence.`,
      m`Weak existence alone implies a unique strong solution.`,
      m`Weak existence and pathwise uniqueness imply strong existence and uniqueness in law.`,
    ],
    correctAnswer: 3,
    explanation: m`Weak existence supplies a solution law, while pathwise uniqueness makes the solution determined by its initial data and driving noise. Uniqueness in law alone is weaker than pathwise uniqueness.`,
  },
] satisfies MultipleChoiceQuestion[];
