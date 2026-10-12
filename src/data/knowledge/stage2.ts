import type { KnowledgeObject } from './schema';

export default [
  {
    "id": "result-bayes-partitions",
    "name": "Conditioning and sampling partitions",
    "type": "key_result",
    "category": "Probability",
    "subcategory": "Conditional probability",
    "statement": "For a finite partition $(H_i)$, $P(H_j\\mid E)=P(E\\mid H_j)P(H_j)/\\sum_iP(E\\mid H_i)P(H_i)$. Conditional independence of signals given each $H_i$ permits multiplying their conditional likelihoods, not their unconditional probabilities. A sampling mechanism determines $P(H_i)$; uniform selection of groups need not equal uniform selection of individuals.",
    "assumptions": "All partition probabilities used as conditioning events are positive and P(E)>0.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-poisson-sums",
    "name": "Independent Poisson sums and conditional allocation",
    "type": "key_result",
    "category": "Probability",
    "subcategory": "Common distributions",
    "statement": "If independent $X\\sim\\operatorname{Poisson}(a)$ and $Y\\sim\\operatorname{Poisson}(b)$, then $X+Y\\sim\\operatorname{Poisson}(a+b)$ and $X\\mid X+Y=n\\sim\\operatorname{Binomial}(n,a/(a+b))$. This follows by dividing the joint mass by the sum mass.",
    "assumptions": "a,b>0; n is a nonnegative integer.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-hypergeometric-sampling",
    "name": "Sampling without replacement",
    "type": "key_result",
    "category": "Probability",
    "subcategory": "Common distributions",
    "statement": "From N distinct objects containing K successes, a uniform sample of size n without replacement has success count $H$ with $P(H=k)=\\binom Kk\\binom{N-K}{n-k}/\\binom Nn$. Sequential success probabilities change as objects are removed.",
    "assumptions": "Integers 0≤K≤N and 0≤n≤N; k is in the feasible support.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-indicator-expectation",
    "name": "Counting with indicators",
    "type": "key_result",
    "category": "Probability",
    "subcategory": "Expectation",
    "statement": "For events $A_1,\\ldots,A_m$, the count $C=\\sum_j1_{A_j}$ satisfies $E[C]=\\sum_jP(A_j)$ without any independence assumption. With n independent draws from m equally likely labels, the expected number of distinct labels is $m[1-(1-1/m)^n]$.",
    "assumptions": "Finite m; for the distinct-label formula, draws are independent and uniform, with replacement.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-generating-functions",
    "name": "Probability generating and characteristic functions",
    "type": "key_result",
    "category": "Probability",
    "subcategory": "Generating functions",
    "statement": "For nonnegative integer X, $G_X(s)=E[s^X]=\\sum_{k\\ge0}P(X=k)s^k$ for 0≤s≤1. Coefficients are probabilities and $G_X\\prime(1-)=E[X]$, possibly infinite. Independent sums multiply PGFs. Binomial(n,p) has $(1-p+ps)^n$; Poisson(λ) has $e^{\\lambda(s-1)}$. Independently retaining each of X objects with probability p gives $G_Y(s)=G_X(1-p+ps)$, hence Poisson(λp) when X is Poisson(λ). For any real-valued X, its characteristic function is $\\varphi_X(t)=E[e^{itX}]$, with i²=−1. Scaling gives $\\varphi_{aX}(t)=\\varphi_X(at)$; independent sums multiply characteristic functions. These identities require no moment assumptions, since the integrand has absolute value one.",
    "assumptions": "n is a nonnegative integer, λ≥0, 0≤p≤1. Thinning uses independent Bernoulli marks independent of X. Characteristic-function statements concern real-valued variables and real a,t; no finite moments are required.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-hoeffding-bound",
    "name": "Hoeffding bound for a bounded sample mean",
    "type": "key_result",
    "category": "Probability",
    "subcategory": "Concentration inequalities",
    "statement": "For independent $X_i\\in[0,1]$, $P(|\\bar X-E\\bar X|\\ge\\varepsilon)\\le2\\exp(-2n\\varepsilon^2)$. To make this upper bound at most δ, it suffices that $n\\ge\\log(2/\\delta)/(2\\varepsilon^2)$, rounded up. This is a sufficient bound, not generally the smallest sample size achieving the actual probability.",
    "assumptions": "n≥1; ε>0; 0<δ<1; boundedness holds almost surely; identical distributions are unnecessary.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "thm-cramer-rao",
    "name": "Cramér–Rao bound for a scalar estimand",
    "type": "theorem",
    "category": "Statistics",
    "subcategory": "Estimation",
    "statement": "Let U estimate g(θ) without bias. With sample score Sθ of mean zero, information $I_n(\\theta)=E[S_\\theta^2]$, and $E[(U-g(\\theta))S_\\theta]=g\\prime(\\theta)$, Cauchy–Schwarz gives $\\operatorname{Var}_\\theta(U)\\ge g\\prime(\\theta)^2/I_n(\\theta)$. Independent identically distributed regular observations give $I_n=nI_1$. Parameter-dependent support may invalidate the score identity.",
    "assumptions": "Scalar differentiable g; 0<I_n(θ)<∞; finite variance of U; differentiation of its expectation under the integral is justified; regular parameter-independent support is a usual sufficient condition.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-sample-variance",
    "name": "Second-moment bias of the empirical variance",
    "type": "key_result",
    "category": "Statistics",
    "subcategory": "Bias, variance and MSE",
    "statement": "For $V_n=n^{-1}\\sum_i(X_i-\\bar X)^2$, the identity $\\sum_i(X_i-\\bar X)^2=\\sum_i(X_i-\\mu)^2-n(\\bar X-\\mu)^2$ gives $E[V_n]=(n-1)\\sigma^2/n$. Thus $nV_n/(n-1)$ is unbiased for σ² when n≥2; normality is unnecessary.",
    "assumptions": "Independent identically distributed observations with finite second moment, mean μ and variance σ²; n≥1 for V_n.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-normal-mean-pivot",
    "name": "Known-variance normal mean interval",
    "type": "key_result",
    "category": "Statistics",
    "subcategory": "Confidence intervals",
    "statement": "For independent $N(\\mu,\\sigma^2)$ observations, $Z=\\sqrt n(\\bar X-\\mu)/\\sigma\\sim N(0,1)$ exactly. An exact central (1−α) interval for μ is $\\bar X\\pm z_{1-\\alpha/2}\\sigma/\\sqrt n$. Plugging in estimated variance changes the pivot and generally requires another argument.",
    "assumptions": "n≥1, σ>0 known, 0<α<1; z denotes the standard normal quantile. Using a rounded quantile makes the stated confidence level correspondingly approximate.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-exponential-minimum",
    "name": "Exponential moments and the sample minimum",
    "type": "key_result",
    "category": "Statistics",
    "subcategory": "Estimation",
    "statement": "In the rate convention, $X\\sim\\operatorname{Exp}(\\lambda)$ has survival $e^{-\\lambda x}$ for x≥0, mean 1/λ and variance 1/λ². For n independent copies, $M=\\min_iX_i$ has survival $e^{-n\\lambda x}$, and $n\\lambda M\\sim\\operatorname{Exp}(1)$. These identities permit exact one-sided confidence bounds and delta-method variance calculations.",
    "assumptions": "λ>0; n≥1. Rate and scale are reciprocals.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-linear-regression",
    "name": "Population slope and omitted-variable effect",
    "type": "key_result",
    "category": "Statistics",
    "subcategory": "Regression",
    "statement": "With an intercept, the population least-squares slope of Y on X is $\\operatorname{Cov}(X,Y)/\\operatorname{Var}(X)$. If $Y=\\alpha+\\beta X+\\gamma Z+\\varepsilon$ and $\\operatorname{Cov}(X,\\varepsilon)=0$, it equals $\\beta+\\gamma\\operatorname{Cov}(X,Z)/\\operatorname{Var}(X)$. This is a projection identity; it does not by itself justify a causal interpretation.",
    "assumptions": "X,Y,Z,ε have finite second moments and Var(X)>0; the model identity and zero covariance with ε are assumed for the omitted-variable formula.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-conjugate-updates",
    "name": "Beta, Gamma and normal conjugate updates",
    "type": "key_result",
    "category": "Statistics",
    "subcategory": "Bayesian inference",
    "statement": "Beta(a,b) with s successes in n Bernoulli trials updates to Beta(a+s,b+n−s). Gamma(a,b), with b a rate, paired with conditionally independent Poisson(λtᵢ) counts of total s and total exposure T updates to Gamma(a+s,b+T). Its next count over exposure u has predictive zero probability $(b/(b+u))^a$ using the posterior a,b. A N(m₀,v₀) prior for a normal mean and one observation of known variance v gives posterior variance $(1/v_0+1/v)^{-1}$ and mean that variance times $(m_0/v_0+y/v)$. Posterior predictive joint events integrate the conditional joint likelihood; replacing the latent parameter by its posterior mean generally loses dependence.",
    "assumptions": "Positive prior shape/rate parameters and variances; exposures nonnegative; the relevant likelihood observations are independent conditional on the latent parameter. Gamma uses shape/rate, not shape/scale.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-measure-continuity",
    "name": "Continuity of a measure on monotone sets",
    "type": "key_result",
    "category": "Measure Theory",
    "subcategory": "Measures",
    "statement": "For $A_n\\uparrow A$, $\\mu(A_n)\\uparrow\\mu(A)$, allowing ∞. For $A_n\\downarrow A$ with $\\mu(A_1)<\\infty$, $\\mu(A_n)\\downarrow\\mu(A)$. The finite starting mass in the decreasing case is essential: counting measure on {n,n+1,…} stays infinite although the intersection is empty.",
    "assumptions": "μ is a countably additive nonnegative measure; every A_n is measurable.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-measure-completion",
    "name": "Completion and measurable null subsets",
    "type": "key_result",
    "category": "Measure Theory",
    "subcategory": "Measures",
    "statement": "The completion of (Ω,F,μ) adds all subsets N of F-measurable null sets and their unions with F-measurable sets, assigning N measure zero. Completed Lebesgue measure therefore measures every subset of a null Borel set, including subsets that are not Borel. An indicator is measurable precisely when its underlying set is measurable in the chosen sigma-algebra.",
    "assumptions": "μ is a measure. Borel measurability and measurability in the completed sigma-algebra are distinct notions.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-brownian-reflection",
    "name": "Brownian maximum via reflection",
    "type": "key_result",
    "category": "Stochastic Processes",
    "subcategory": "Brownian motion",
    "statement": "For standard Brownian motion W starting at zero, $P(\\sup_{0\\le s\\le T}W_s\\ge a)=2P(W_T\\ge a)=2[1-\\Phi(a/\\sqrt T)]$. Reflecting a path after its first hit of a pairs paths ending below a with paths ending above a.",
    "assumptions": "a>0, T>0; Φ is the standard normal distribution function.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-joint-gaussian-conditioning",
    "name": "Joint Gaussianity and conditional moments",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Probabilistic and Bayesian machine learning",
    "statement": "Joint Gaussianity means every finite linear combination is normal (degenerate normals allowed). Gaussian marginals alone do not imply it. For jointly Gaussian vectors X,Y with invertible covariance ΣYY, $E[X\\mid Y=y]=m_X+\\Sigma_{XY}\\Sigma_{YY}^{-1}(y-m_Y)$ and conditional covariance is $\\Sigma_{XX}-\\Sigma_{XY}\\Sigma_{YY}^{-1}\\Sigma_{YX}$. In a jointly Gaussian vector, zero cross-covariance implies independence; conditioning can introduce nonzero cross-covariance.",
    "assumptions": "Finite dimensional jointly Gaussian vectors for the conditional formula; ΣYY is positive definite. The zero-covariance implication requires joint Gaussianity.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-compound-poisson",
    "name": "Compound Poisson increments and moments",
    "type": "key_result",
    "category": "Stochastic Processes",
    "subcategory": "Levy processes",
    "statement": "For a rate-λ Poisson process N and independent identically distributed marks Jₖ independent of N, $X_t=\\sum_{k=1}^{N_t}J_k$ is a compound Poisson Lévy process. With finite second moment of J, $E[X_t]=\\lambda tE[J]$ and $\\operatorname{Var}(X_t)=\\lambda tE[J^2]$, obtained from conditional moments and total variance. The second moment, rather than only Var(J), incorporates the random count.",
    "assumptions": "λ≥0; independent marks and Poisson count; càdlàg construction; E[J²]<∞ for the stated moments.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-two-state-ctmc",
    "name": "Transient probability for a two-state chain",
    "type": "key_result",
    "category": "Stochastic Processes",
    "subcategory": "Continuous-time Markov chains",
    "statement": "For row generator $Q=\\begin{pmatrix}-a&a\\\\b&-b\\end{pmatrix}$ and start in state 0, $p(t)=P(X_t=1)$ obeys $p\\prime=a(1-p)-bp$, p(0)=0. Thus $p(t)=a(1-e^{-(a+b)t})/(a+b)$. Its limit a/(a+b) is the stationary mass of state 1.",
    "assumptions": "a,b>0; time-homogeneous finite-state CTMC; row-vector probability convention.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-independent-sum-moments",
    "name": "Moments of an independent increment sum",
    "type": "key_result",
    "category": "Stochastic Processes",
    "subcategory": "Random walks",
    "statement": "For independent identically distributed increments ξ with finite variance v and mean m, $S_n=\\sum_{i=1}^n\\xi_i$ has mean nm, variance nv and $E[S_n^2]=nv+n^2m^2$. The last term must be retained for a biased walk.",
    "assumptions": "Integer n≥0; finite second moment; no zero-mean assumption.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-stratonovich-conversion",
    "name": "Scalar Itô–Stratonovich conversion",
    "type": "key_result",
    "category": "Stochastic Calculus",
    "subcategory": "Stochastic integration",
    "statement": "For scalar $dX=a(X)\\,dt+b(X)\\circ dW$, the corresponding Itô equation is $dX=[a(X)+\\tfrac12b(X)b\\prime(X)]\\,dt+b(X)\\,dW$. In particular b(x)=cx adds c²x/2 to the drift. Stratonovich’s ordinary chain rule and Itô’s second-order correction describe the same process after this conversion.",
    "assumptions": "W is Brownian relative to a filtration satisfying the usual conditions; X is an adapted continuous semimartingale; coefficients have sufficient differentiability and local regularity, with solutions considered up to explosion.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "prog-container-operations",
    "name": "STL lookup, bounds and invalidation contracts",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "C++ STL and algorithms",
    "statement": "In C++20, map.find(key) does not insert; operator[] inserts a value-initialised mapped value when the key is absent. vector.erase(it) returns the next surviving iterator and invalidates iterators/references at or after the erased position. reserve changes capacity, not size, so indices at or beyond size remain invalid. On a range sorted by comp, lower_bound finds the first element for which comp(element,value) is false; upper_bound finds the first for which comp(value,element) is true. A descending range requires a matching comparator.",
    "assumptions": "C++20; ordinary standard-library containers and valid preconditions. No execution result is guaranteed for out-of-size vector indexing.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "prog-construction-dispatch",
    "name": "Virtual dispatch during construction and destruction",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "statement": "In C++20, a virtual call on the object being constructed or destroyed dispatches within that constructor/destructor’s class, not to a more derived override. Base construction precedes derived construction; derived destruction precedes base destruction. Deleting a derived object through a base pointer requires a virtual base destructor for this ordinary ownership pattern.",
    "assumptions": "C++20; calls refer to the object under construction/destruction; no call to a pure virtual function; single ordinary inheritance in the examples.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "prog-aliasing-ownership",
    "name": "Aliasing shared ownership and exclusive replacement",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "statement": "A shared_ptr aliasing constructor shares the owner’s control block while storing another supplied pointer. Resetting the original owner does not destroy its managed object while an alias shares ownership; the stored pointer must remain valid. Moving a unique_ptr transfers exclusive ownership; move-assignment releases a distinct old destination resource and leaves the source empty.",
    "assumptions": "C++20; ordinary nonarray pointers, valid alias into the managed live object, ordinary deleters, no concurrent unsynchronised mutation or self-move.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "prog-value-semantics",
    "name": "Value categories, forwarding and callable ownership",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "Modern C++",
    "statement": "In C++20 a named variable is an lvalue expression even when its declared type is T&&. std::forward<T> preserves the argument category deduced by a forwarding-reference template. std::move casts to an rvalue category but preserves const; a const object ordinarily cannot bind to a nonconst T&& move constructor and may therefore be copied. Capturing a unique_ptr by move makes a closure move-only. C++20 std::function requires its stored callable type to be CopyConstructible, so that closure cannot be stored directly there.",
    "assumptions": "C++20; ordinary nonconst move constructors and const-reference copy constructors for the copy example; std::function, rather than newer move-only callable wrappers.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "prog-python-context-copy",
    "name": "Python context, copying and container contracts",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "Python data structures",
    "statement": "In Python 3 a context manager’s truthy __exit__ return suppresses the exception passed to it. copy.deepcopy uses a memo so repeated references to one inner object remain repeated references to one copied inner object, without sharing that inner object with the source. List iterators advance by index through the live list, so replacements and later appends may affect remaining iteration. Dictionary keys must be hashable: a tuple containing a list is not hashable. Slice assignment xs[:] = values mutates the existing list and preserves its aliases.",
    "assumptions": "Python 3 built-in lists/tuples/dictionaries, ordinary context-manager protocol and copy.deepcopy without custom copying hooks. These guarantees differ from shallow copying and snapshot iteration.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "prog-numpy-indexing",
    "name": "NumPy indexing, repeated updates and masking",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "NumPy and scientific Python",
    "statement": "NumPy basic slicing returns a view, while advanced integer or Boolean indexing returns a copy for these ordinary ndarray examples. Buffered advanced assignment a[idx] += 1 does not reliably accumulate repeated indices; np.add.at performs unbuffered updates and accumulates each occurrence. NaN multiplied by zero is still NaN. To calculate a finite-pair loss, select valid pairs before arithmetic and divide by their count. mean(axis=axes, keepdims=True) retains reduced axes of length one, permitting compatible broadcasting.",
    "assumptions": "NumPy 1.x/2.x ordinary ndarrays; valid indices, finite surviving values and at least one retained pair; operations have the stated dtypes and shapes.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "prog-parallel-moments",
    "name": "Merging centred second-moment accumulators",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "Numerical and quantitative programming",
    "statement": "For disjoint batches of sizes nA,nB>0, means mA,mB and centred square sums M2A,M2B, write δ=mB−mA and n=nA+nB. The combined mean is $m_A+\\delta n_B/n$ and combined $M2=M2_A+M2_B+\\delta^2n_An_B/n$. Expanding about each batch mean makes cross terms vanish. M2/n is the population-style empirical variance; M2/(n−1) is the unbiased sample-variance normalisation under independent identical sampling.",
    "assumptions": "Finite scalar observations; exact arithmetic identities. Floating-point evaluation is generally more stable than subtracting large raw second moments but is not exact or immune to overflow.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-logsumexp",
    "name": "Stable two-term log-sum-exp",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "Numerical and quantitative programming",
    "statement": "For finite real a,b, let m=max(a,b). Then $\\log(e^a+e^b)=m+\\log(e^{a-m}+e^{b-m})$. For a≤b it is $b+\\log1p(e^{a-b})$. The exponential arguments are nonpositive, avoiding overflow of the separate large exponentials.",
    "assumptions": "Finite real inputs representable by the chosen floating-point type; rounding remains possible and exceptionally large final results can exceed its range.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-distance-scaling",
    "name": "Feature scaling in nearest neighbours and clustering",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Supervised learning",
    "statement": "Euclidean squared distance is $\\sum_j(x_j-z_j)^2$; scaling coordinate j by c changes its contribution by c². Hence nearest-neighbour decisions and Euclidean k-means assignments generally change with feature scaling. For fixed nonempty k-means clusters, minimising the sum of squared distances sets each centre to that cluster’s mean.",
    "assumptions": "Finite vectors and ordinary Euclidean distance; fixed scaling applied to both training and query vectors; nearest-neighbour ties need a rule; k-means mean updates assume nonempty clusters.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-regularised-linear-models",
    "name": "Penalised linear losses and quadratic stability",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "statement": "For $L(w)=\\tfrac12\\|Xw-y\\|^2+\\tfrac\\lambda2\\|w\\|^2$, the gradient is $X^T(Xw-y)+\\lambda w$, and λ>0 gives unique minimiser $(X^TX+\\lambda I)^{-1}X^Ty$. For positive diagonal preconditioner D, the iteration uses I−ηDH; DH is similar to the symmetric D^(1/2)HD^(1/2), so its largest eigenvalue replaces λmax(H). A positive-definite quadratic with Hessian H has ordinary gradient-descent error update $(I-\\eta H)e$; convergence from every initial point requires $0<\\eta<2/\\lambda_{\\max}(H)$. For hinge loss max(0,1−ys), its active-region score derivative is −y; the kink requires a subgradient.",
    "assumptions": "Finite real design matrix; λ>0 for unique ridge solution; symmetric positive-definite H and constant step for the stability equivalence; binary y∈{−1,1} and s≠y at the hinge boundary.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-adam-step",
    "name": "Adam first-step bias correction",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Optimisation and training",
    "statement": "Adam initialises m₀=v₀=0, then $m_t=\\beta_1m_{t-1}+(1-\\beta_1)g_t$ and $v_t=\\beta_2v_{t-1}+(1-\\beta_2)g_t^2$ coordinatewise. Bias correction divides by $1-\\beta_1^t$ and $1-\\beta_2^t$. At t=1, these become g₁ and g₁², so with ε=0 and nonzero gradient the step is η times its sign.",
    "assumptions": "0≤β₁,β₂<1; update w←w−η m̂/(sqrt(v̂)+ε), no weight decay. ε=0 is used only with nonzero denominator; this is an update identity, not a general convergence guarantee.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-neural-shapes-dropout",
    "name": "Convolution shape and inverted dropout moments",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Neural networks and deep learning",
    "statement": "An ordinary 2D convolution has output height $\\lfloor(H+2p-d(k-1)-1)/s\\rfloor+1$ and the analogous width. With groups=1 it has Cout·Cin·k² weight parameters and, if enabled, Cout biases. In inverted dropout, a scalar training activation x becomes xB/q with B∼Bernoulli(q), giving mean x and variance $x^2(1-q)/q$. Evaluation uses the unmasked activation.",
    "assumptions": "Positive valid integer convolution dimensions, dilation d and stride s, symmetric padding p; same square kernel on both axes. Dropout keep probability 0<q≤1, mask independent of x conditional on the supplied activation; PyTorch p denotes drop probability 1−q.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-softmax-loss",
    "name": "Multiclass cross-entropy gradient",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Neural networks and deep learning",
    "statement": "For finite logits z and target class t, $p_j=e^{z_j}/\\sum_ke^{z_k}$ and $\\ell=\\log\\sum_ke^{z_k}-z_t$. Its gradient is $p-e_t$, whose coordinates sum to zero. Adding a common constant to all logits leaves the probabilities and loss unchanged. Stabilised log-sum-exp permits evaluating the same loss without overflow.",
    "assumptions": "One mutually exclusive class target; at least two classes; ordinary unweighted per-example loss, no smoothing. Mean reduction divides summed per-example gradients by sample count.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-policy-gradient",
    "name": "Likelihood-ratio gradient and baseline condition",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Reinforcement learning",
    "statement": "For differentiable positive probabilities πθ(a) over a finite action set and θ-independent reward r(a), $\\nabla E_\\pi[r(A)]=E_\\pi[r(A)\\nabla\\log\\pi_\\theta(A)]$. Subtracting a baseline independent of A leaves this expectation unchanged since $E_\\pi[\\nabla\\log\\pi_\\theta(A)]=0$. An arbitrary action-dependent baseline can bias it; choosing b(A)=r(A) makes the estimate identically zero even when the true gradient is nonzero.",
    "assumptions": "Finite actions, positive differentiable normalised probabilities; rewards fixed while differentiating. For a state-dependent baseline the identity is conditional on the state and the baseline is not differentiated through in the score-function estimator.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-linear-time-series",
    "name": "Causal AR forecasts and stability",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Time series and sequential machine learning",
    "statement": "For causal $X_t=\\phi X_{t-1}+\\varepsilon_t$ with independent mean-zero innovations of variance σ², $E[X_{t+h}\\mid\\mathcal F_t]=\\phi^hX_t$ and forecast error variance is $\\sigma^2\\sum_{j=0}^{h-1}\\phi^{2j}$. For $X_t=a_1X_{t-1}+a_2X_{t-2}+\\varepsilon_t$, a stationary causal solution exists when the companion-matrix eigenvalues lie inside the unit circle, equivalently the zeros of $1-a_1z-a_2z^2$ lie outside. These are reciprocal root conventions.",
    "assumptions": "Innovations independent of past history; finite σ²; integer h≥1; |φ|<1 for the stationary AR(1) setting; AR(2) stability claim concerns the causal solution.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-f1-auc",
    "name": "Binary F1 and tie-aware ROC AUC",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Evaluation and generalisation",
    "statement": "With a positive class, $F1=2TP/(2TP+FP+FN)$ when the denominator is positive. Empirical ROC AUC is the fraction of positive–negative score pairs ordered correctly, with half credit for ties: $P(s_+>s_-)+\\tfrac12P(s_+=s_-)$. Higher scores must indicate the positive class. AUC uses all scores and does not require choosing a classification threshold.",
    "assumptions": "Binary labels; both positive and negative observations exist for AUC; ordinary unweighted observations and pairwise tie convention.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-microbatch-weighting",
    "name": "Sample-weighted gradient accumulation",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "statement": "If microbatch i contains nᵢ contributing examples and returns their mean loss Lᵢ, the full sample mean is $L=\\sum_i(n_i/N)L_i$, N=Σnᵢ. At fixed parameters, backpropagating each weighted mean accumulates the gradient of L. Clear gradients before accumulation and take one optimiser step afterwards. Equal weighting of unequal batch means changes the objective.",
    "assumptions": "Differentiable independent per-example loss; parameters held fixed; no cross-example operations such as training batch normalisation; no class weights or ignored samples changing the reduction denominator.",
    "tags": [
      "stage-2"
    ]
  },
  {
    "id": "result-class-index-loss",
    "name": "PyTorch multiclass class-index contract",
    "type": "key_result",
    "category": "Machine Learning",
    "subcategory": "Applied machine learning and implementation",
    "statement": "In PyTorch 2.x, functional.cross_entropy accepts real floating unnormalised logits of shape (B,C) and long class indices of shape (B,) with values in [0,C). Default reduction is mean, combining log-softmax and negative log-likelihood. Floating probability targets use a different same-shape (B,C) interface. Applying softmax to logits first changes the input interpreted by this loss. binary_cross_entropy_with_logits models independent binary targets with corresponding target shape and is a different contract.",
    "assumptions": "B>0, C≥2; common device; valid indices; ordinary unweighted loss, no ignored indices or smoothing; finite logits.",
    "tags": [
      "stage-2"
    ]
  }
] satisfies KnowledgeObject[];
