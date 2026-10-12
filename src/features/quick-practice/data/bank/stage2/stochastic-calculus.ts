import type { MultipleChoiceQuestion } from '../../schema';

// Stage 2: independently reviewed additions; original bank files remain intact.
export default [
  {
    "id": "s2-calc-bridge-qv",
    "category": "Stochastic Calculus",
    "subcategory": "Quadratic variation",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "For standard Brownian W, let $X_t=W_t-tW_1$ for 0≤t≤1. Consider pathwise quadratic variation along the standard dyadic partitions. Almost surely, what is $[X]_1$, despite X₁=0?",
    "answers": [
      "$W_1^2$",
      "1",
      "0",
      "1/2"
    ],
    "correctAnswer": 1,
    "explanation": "For each path, tW₁ is continuous finite variation, hence has zero quadratic variation and zero covariation with W. Thus [X]_t=[W]_t=t. The bridge’s terminal value and its terminal variance being zero do not make accumulated quadratic variation zero. X is not adapted to the original Brownian natural filtration; this argument is explicitly pathwise.",
    "objectiveIds": [
      "lo-stochastic-calculus-quadratic-variation",
      "lo-quadratic-variation"
    ],
    "knowledgeIds": [
      "def-quadratic-variation"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "The random coefficient is fixed along each path; examine the variation of its time-linear term."
    ]
  },
  {
    "id": "s2-calc-disjoint-integral-covariation",
    "category": "Stochastic Calculus",
    "subcategory": "Quadratic variation",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "W is Brownian in a usual filtration. Let $M_t=\\int_0^t1_{(0,1]}(s)dW_s$ and $N_t=\\int_0^t1_{(1,2]}(s)dW_s$. What is [M,N]₂?",
    "answers": [
      "2",
      "$W_1(W_2-W_1)$",
      "0",
      "1"
    ],
    "correctAnswer": 2,
    "explanation": "Brownian-integral covariation is ∫₀²1_(0,1](s)1_(1,2](s)ds=0, since the supports do not overlap. Covariation is not the product of terminal values. These bounded deterministic integrands meet all finite-horizon square-integrability requirements.",
    "objectiveIds": [
      "lo-stochastic-calculus-quadratic-variation",
      "lo-quadratic-variation"
    ],
    "knowledgeIds": [
      "thm-stochastic-integral-brackets"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Multiply the integrands before integrating in time."
    ]
  },
  {
    "id": "s2-calc-brownian-cube",
    "category": "Stochastic Calculus",
    "subcategory": "Ito's lemma",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "W is standard Brownian relative to a filtration satisfying the usual conditions. What is d(W_t³)?",
    "answers": [
      "$3W_t^2dW_t$",
      "$3W_t^2dW_t+6W_tdt$",
      "$3W_tdt+3W_t^2dt$",
      "$3W_t^2dW_t+3W_tdt$"
    ],
    "correctAnswer": 3,
    "explanation": "For f(x)=x³, f′=3x² and f″=6x. The Itô correction is (1/2)6W_tdt=3W_tdt. Polynomials have the required local smoothness, and Brownian moments justify finite-horizon integrability here.",
    "objectiveIds": [
      "lo-stochastic-calculus-ito-s-lemma",
      "lo-ito-transform"
    ],
    "knowledgeIds": [
      "thm-ito-formula"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compute both derivatives and include the factor one half."
    ]
  },
  {
    "id": "s2-calc-sine-correction",
    "category": "Stochastic Calculus",
    "subcategory": "Ito's lemma",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "W is standard Brownian in a usual filtration. What is the differential of sin(W_t)?",
    "answers": [
      "$\\cos(W_t)dW_t-\\tfrac12\\sin(W_t)dt$",
      "$\\cos(W_t)dW_t$",
      "$\\cos(W_t)dW_t+\\tfrac12\\sin(W_t)dt$",
      "$-\\sin(W_t)dW_t+\\cos(W_t)dt$"
    ],
    "correctAnswer": 0,
    "explanation": "The derivatives are cos(x) and −sin(x), so Itô gives the displayed diffusion and negative half-sine drift. Omitting the drift applies ordinary calculus incorrectly; differentiating only once does not determine the stochastic drift. The derivatives are bounded.",
    "objectiveIds": [
      "lo-stochastic-calculus-ito-s-lemma",
      "lo-ito-transform"
    ],
    "knowledgeIds": [
      "thm-ito-formula"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "The second derivative changes the sign of the drift correction."
    ]
  },
  {
    "id": "s2-calc-reciprocal-gbm",
    "category": "Stochastic Calculus",
    "subcategory": "Ito's lemma",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "Let $X_t>0$ solve $dX_t=\\mu X_tdt+\\sigma X_tdW_t$, with constants μ and σ>0 and positive deterministic initial value, in a usual Brownian filtration. For Y_t=1/X_t, what SDE follows?",
    "answers": [
      "$dY_t=-\\mu Y_tdt+\\sigma Y_tdW_t$",
      "$dY_t=(\\sigma^2-\\mu)Y_tdt-\\sigma Y_tdW_t$",
      "$dY_t=-\\mu Y_tdt-\\sigma Y_tdW_t$",
      "$dY_t=(\\mu-\\sigma^2)Y_tdt+\\sigma Y_tdW_t$"
    ],
    "correctAnswer": 1,
    "explanation": "f′(x)=−x^(−2) and f″(x)=2x^(−3). Multiplying by drift and diffusion gives −μY and −σY; the second-order drift adds σ²Y. Positivity follows from the explicit GBM solution and avoids division by zero. The reciprocal is not obtained by just negating the original drift.",
    "objectiveIds": [
      "lo-stochastic-calculus-ito-s-lemma",
      "lo-ito-transform"
    ],
    "knowledgeIds": [
      "thm-ito-formula",
      "def-integral-sde"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Apply both derivatives of x↦1/x.",
      "Rewrite all remaining inverse powers as Y."
    ]
  },
  {
    "id": "s2-calc-time-brownian-product",
    "category": "Stochastic Calculus",
    "subcategory": "Semimartingales",
    "difficulty": "easy",
    "questionType": "implication",
    "prompt": "For standard Brownian W in a usual filtration, set Y_t=tW_t. What is dY_t?",
    "answers": [
      "$W_t\\,dW_t+t\\,dt$",
      "$t\\,dW_t$",
      "$W_tdt+t\\,dW_t$",
      "$t\\,dW_t+dt$"
    ],
    "correctAnswer": 2,
    "explanation": "The product rule gives W_t d(t)+t dW_t+d[t,W]_t. The time process has finite variation, so the bracket term is zero. The drift W_tdt still remains; zero covariation does not mean the time factor has no derivative.",
    "objectiveIds": [
      "lo-stochastic-calculus-semimartingales"
    ],
    "knowledgeIds": [
      "def-continuous-semimartingale",
      "thm-ito-formula"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Treat t as a finite-variation process in the product rule."
    ]
  },
  {
    "id": "s2-calc-stratonovich-conversion",
    "category": "Stochastic Calculus",
    "subcategory": "Stochastic integration",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In a usual Brownian filtration, $dX_t=aX_tdt+bX_t\\circ dW_t$ is a Stratonovich SDE with real a, b=2 and deterministic X₀>0. Which is its Itô form?",
    "answers": [
      "$dX_t=(a-b^2/2)X_tdt+bX_tdW_t$",
      "$dX_t=aX_tdt+bX_tdW_t$",
      "$dX_t=(a+b/2)X_tdt+bX_tdW_t$",
      "$dX_t=(a+b^2/2)X_tdt+bX_tdW_t$"
    ],
    "correctAnswer": 3,
    "explanation": "The Stratonovich-to-Itô correction is (1/2)σ(x)σ′(x). Here σ(x)=bx and σ′=b, so the added drift is b²x/2. The reverse conversion subtracts it. Constant diffusion would have zero derivative, but multiplicative diffusion does not.",
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-integration"
    ],
    "knowledgeIds": [
      "result-stratonovich-conversion"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Differentiate the diffusion coefficient, not the drift coefficient."
    ]
  },
  {
    "id": "s2-calc-anticipating-constant",
    "category": "Stochastic Calculus",
    "subcategory": "Stochastic integration",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "W is Brownian in its usual augmented natural filtration on [0,1]. H_t=W₁ for all t. Left-endpoint sums give W₁². Which conclusion about treating this as an ordinary predictable Itô integral is valid?",
    "answers": [
      "It is not an admissible predictable Itô integrand in this filtration; E[W₁²]=1 does not contradict the martingale mean-zero rule.",
      "Every left-endpoint sum defines a predictable Itô integral, so its mean must be zero.",
      "H is predictable because it is constant in t, so the sums have mean zero.",
      "The sums equal zero because H has no time variation."
    ],
    "correctAnswer": 0,
    "explanation": "W₁ is not known before time one, so H is not adapted or predictable in the stated filtration. The sums telescope to W₁(W₁−W₀)=W₁², but they are not the predictable Itô construction. Time regularity does not supply the missing information constraint.",
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-integration"
    ],
    "knowledgeIds": [
      "def-predictable-process",
      "def-ito-integral"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Ask whether the coefficient is measurable using information available at each left endpoint."
    ]
  },
  {
    "id": "s2-calc-stationary-ou-covariance",
    "category": "Stochastic Calculus",
    "subcategory": "Stochastic differential equations",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In a usual Brownian filtration, $dX_t=-2X_tdt+2dW_t$. Let X₀∼N(0,1), independent of all future Brownian increments. What is Cov(X_t,X_{t+h}) for t,h≥0?",
    "answers": [
      "$4h$",
      "$e^{-2h}$",
      "$1-e^{-4h}$",
      "$e^{-2t}$"
    ],
    "correctAnswer": 1,
    "explanation": "The solution from t is X_(t+h)=e^(−2h)X_t+2∫_t^(t+h)e^(−2(t+h-s))dW_s. The new integral is independent of X_t and centred. The initial variance 1=σ²/(2κ) is stationary, so covariance is e^(−2h)Var(X_t)=e^(−2h). It depends on the lag, not the observation origin.",
    "objectiveIds": [
      "lo-stochastic-calculus-stochastic-differential-equations"
    ],
    "knowledgeIds": [
      "thm-ito-isometry",
      "def-integral-sde"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Solve from time t, separating existing state from fresh noise.",
      "Check whether the initial variance is the stationary variance."
    ]
  },
  {
    "id": "s2-calc-gaussian-tilted-mean",
    "category": "Stochastic Calculus",
    "subcategory": "Girsanov theorem",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "W is Brownian under P in a usual filtration. For T>0 define $dQ/dP=\\exp(-2W_T-2T)$. What is E_Q[W_T]?",
    "answers": [
      "$0$",
      "$-T$",
      "$-2T$",
      "$2T$"
    ],
    "correctAnswer": 2,
    "explanation": "The exponential density is normalised since E_P[e^(−2W_T)]=e^(2T). Girsanov makes W_t+2t Brownian under Q, so E_Q[W_T]=−2T. Equivalently differentiating the normal MGF under the tilt gives the same result. A deterministic integrand satisfies Novikov on a finite horizon.",
    "objectiveIds": [
      "lo-stochastic-calculus-girsanov-theorem"
    ],
    "knowledgeIds": [
      "thm-girsanov",
      "thm-novikov"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Track the sign of the density exponent and of the new Brownian drift."
    ]
  },
  {
    "id": "s2-calc-heat-terminal-cosine",
    "category": "Stochastic Calculus",
    "subcategory": "Feynman-Kac",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "For a fixed finite T, solve the bounded backward heat problem $u_t+\\tfrac12u_{xx}=0$, $u(T,x)=\\cos x$. Which function is its bounded classical solution?",
    "answers": [
      "$u(t,x)=e^{(T-t)/2}\\cos x$",
      "$u(t,x)=e^{-(T-t)}\\cos x$",
      "$u(t,x)=\\cos x$",
      "$u(t,x)=e^{-(T-t)/2}\\cos x$"
    ],
    "correctAnswer": 3,
    "explanation": "With X_T=x+(W_T−W_t), Feynman–Kac gives E[cos X_T]=cos(x)e^(−(T−t)/2), using the centred normal characteristic function. Direct differentiation verifies cancellation in the PDE and the terminal condition. The plus exponential sign would solve the wrong time direction.",
    "objectiveIds": [
      "lo-stochastic-calculus-feynman-kac"
    ],
    "knowledgeIds": [
      "thm-feynman-kac"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use a normal increment’s characteristic function or verify the separated PDE directly."
    ]
  },
  {
    "id": "s2-calc-ou-generator-square",
    "category": "Stochastic Calculus",
    "subcategory": "Infinitesimal generators",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "For $dX_t=-\\kappa X_tdt+\\sigma dW_t$ with κ>0 and σ>0, apply the formal differential generator to f(x)=x². What is Lf(x)? This asks for the formal expression, not membership in a particular operator domain.",
    "answers": [
      "$-2\\kappa x^2+\\sigma^2$",
      "$-\\kappa x^2+\\sigma^2$",
      "$-2\\kappa x^2+2\\sigma^2$",
      "$-2\\kappa x+\\sigma$"
    ],
    "correctAnswer": 0,
    "explanation": "The first derivative is 2x and the second is 2. Thus (−κx)(2x)+(σ²/2)2=−2κx²+σ². Stating the formal calculation avoids assuming the unbounded test function lies in a chosen generator domain.",
    "objectiveIds": [
      "lo-stochastic-calculus-infinitesimal-generators"
    ],
    "knowledgeIds": [
      "def-infinitesimal-generator"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Multiply each coefficient by the corresponding derivative."
    ]
  },
  {
    "id": "s2-calc-cubic-terminal-representation",
    "category": "Stochastic Calculus",
    "subcategory": "Martingale representation",
    "difficulty": "hard",
    "questionType": "implication",
    "prompt": "W is Brownian in its usual augmented natural filtration and T>0 is fixed. For $M_t=E[W_T^3\\mid\\mathcal F_t]$, which H_t satisfies $M_t=M_0+\\int_0^tH_s\\,dW_s$ for 0≤t≤T?",
    "answers": [
      "$W_t^3+3(T-t)W_t$",
      "$3W_t^2+3(T-t)$",
      "$3W_t^2$",
      "$3W_t^2+3t$"
    ],
    "correctAnswer": 1,
    "explanation": "Condition on W_t and expand (W_t+Z)³ with independent Z∼N(0,T−t). This gives M_t=W_t³+3(T−t)W_t. Itô yields drift 3W_tdt−3W_tdt=0 and diffusion H_t=3W_t²+3(T−t). Brownian fourth moments ensure E∫₀ᵀH_t²dt<∞. The conditional value M_t is not itself the integrand.",
    "objectiveIds": [
      "lo-stochastic-calculus-martingale-representation",
      "lo-ito-transform"
    ],
    "knowledgeIds": [
      "thm-martingale-representation",
      "thm-ito-formula"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "First compute the conditional cubic moment of a normal increment.",
      "Apply Itô to that time-dependent conditional value and check drift cancellation."
    ]
  }
] satisfies MultipleChoiceQuestion[];
