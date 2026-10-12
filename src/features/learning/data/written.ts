import type { WrittenProblem } from '../schema';
const m=String.raw;
export const writtenProblems = [
 {
  id:'written-student-interval',practiceMode:'written',title:'Derive an exact normal-sample interval',category:'Statistics',subcategory:'Confidence intervals',difficulty:'medium',contentVersion:1,
  objectiveIds:['lo-statistics-confidence-intervals'],knowledgeIds:['result-student-pivot'],
  statement:m`An i.i.d. normal sample of size 16 has sample mean 10 and unbiased sample standard deviation 4. Derive a two-sided 95% confidence interval for the population mean with unknown variance. Use $t_{15,0.975}=2.131$. Explain why a standard-normal critical value is not exact here.`,
  assumptions:m`The population is $N(\mu,\sigma^2)$ with unknown $\sigma^2>0$. The critical value is supplied; no table lookup is required.`,
  hints:['Start with a statistic whose law does not involve the unknown mean or variance.',m`Use $T=\sqrt n(\bar X-\mu)/S$ and its Student law.`,m`Invert $|T|\le t_{n-1,0.975}$ to isolate $\mu$.`],
  criteria:['State the normal-sample independence and chi-square variance law.','Use 15 degrees of freedom and S/√n = 1.','Obtain [7.869, 12.131] and interpret repeated-sampling coverage.'],
  solution:m`Key idea: use an exact pivot, then invert its probability statement.
For an independent normal sample, $Z=\sqrt n(\bar X-\mu)/\sigma\sim N(0,1)$ and $V=(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$ are independent. This follows by orthogonally decomposing the jointly normal sample into its mean direction and residual subspace. Consequently $T=Z/\sqrt{V/(n-1)}=\sqrt n(\bar X-\mu)/S\sim t_{n-1}$.
By symmetry, $P_\mu(-2.131\le T\le2.131)=0.95$ (up to the supplied critical value’s rounding). Isolating $\mu$ gives $[\bar X-2.131S/\sqrt n,\bar X+2.131S/\sqrt n]$. The estimated standard error is $4/4=1$, hence the realised interval is $[7.869,12.131]$.
A normal critical value 1.96 would ignore the extra variability in the estimated standard deviation and is not an exact finite-sample pivot. The population mean is fixed in this frequentist interpretation: 95% describes coverage across repetitions of this sampling-and-interval procedure, rather than a posterior probability for this realised interval.`,
 },
 {
  id:'written-escaping-mass',practiceMode:'written',title:'Pointwise limits without integral convergence',category:'Measure Theory',subcategory:'Convergence theorems',difficulty:'medium',contentVersion:1,
  objectiveIds:['lo-measure-theory-convergence-theorems','lo-uniform-integrability'],familyId:'escaping-mass',knowledgeIds:['thm-dominated-convergence','prop-uniform-integrability'],
  statement:m`On $(0,1)$ with Lebesgue measure, let $f_n(x)=n1_{(0,1/n)}(x)$. Prove pointwise convergence, compute every integral, and show that no single integrable function can dominate all $|f_n|$. Decide whether the sequence is uniformly integrable.`,
  hints:['For fixed x > 0, decide when 1/n is below x.',m`Compute height times width. If an integrable envelope existed, what would dominated convergence imply?`,m`For any fixed $K$, examine $\int |f_n|1_{\{|f_n|>K\}}$ when $n>K$.`],
  criteria:['Prove pointwise convergence for every x in (0,1).','Compute integral 1 and explain failure of L1 convergence.','Use DCT to disprove an integrable envelope and tail integrals to disprove UI.'],
  solution:m`For every fixed $x\in(0,1)$, choose $N>1/x$. For $n\ge N$, $1/n<x$, so $f_n(x)=0$. Thus $f_n\to0$ everywhere on the domain. Nevertheless $\int_0^1f_n(x)dx=n\times(1/n)=1$ for every $n$. In particular the $L^1$ distance from zero is always one.
Suppose an integrable $g$ dominated $|f_n|$ almost everywhere for every $n$. The countable union of the exceptional null sets is null, so the domination holds simultaneously off one null set. DCT would then imply $\int f_n\to\int0=0$, contradicting the constant integral. Such an envelope cannot exist.
For any $K>0$, choose an integer $n>K$. Wherever $f_n$ is nonzero it equals $n>K$, so $\int |f_n|1_{\{|f_n|>K\}}=1$. The supremum over $n$ therefore never approaches zero as $K\to\infty$, disproving uniform integrability. Bounded $L^1$ norms alone do not give UI. This same escaping-mass construction appears in Probability; it is a shared competency, not independent syllabus breadth.`,
 },
 {
  id:'written-ou',practiceMode:'written',title:'Solve an Ornstein–Uhlenbeck equation',category:'Stochastic Calculus',subcategory:'Stochastic differential equations',difficulty:'hard',contentVersion:1,
  objectiveIds:['lo-stochastic-calculus-stochastic-differential-equations','lo-ito-transform'],knowledgeIds:['thm-ito-formula','thm-ito-isometry','thm-global-strong-sde'],
  statement:m`Solve $dX_t=\kappa(\theta-X_t)dt+\sigma dW_t$ with deterministic $X_0=x$, $\kappa>0$, and constant real $\theta,\sigma$. Derive $EX_t$, $\operatorname{Var}(X_t)$, and their limits as $t\to\infty$.`,
  assumptions:'W is standard Brownian relative to a filtration satisfying the usual conditions. All coefficients are deterministic.',
  hints:[m`Subtract $\theta$ and multiply by $e^{\kappa t}$.`,m`Use the product rule; $e^{\kappa t}$ has finite variation, hence no cross-variation correction.`,m`Apply isometry to the deterministic integrand $\sigma e^{-\kappa(t-s)}$.`],
  criteria:['Cancel the drift with an integrating factor.','Obtain the stochastic convolution and its mean.','Compute σ²(1−e^(−2κt))/(2κ), including its limiting value.'],
  solution:m`Set $Y_t=X_t-\theta$. Then $dY_t=-\kappa Y_tdt+\sigma dW_t$. Applying the product rule to the deterministic finite-variation factor gives
$$d(e^{\kappa t}Y_t)=\sigma e^{\kappa t}dW_t.$$
Integrating and dividing by $e^{\kappa t}$ yields
$$X_t=\theta+(x-\theta)e^{-\kappa t}+\sigma\int_0^t e^{-\kappa(t-s)}dW_s.$$
For fixed $t$ the integrand is deterministic and square-integrable; the stochastic integral is centred normal. Isometry gives
$$\operatorname{Var}(X_t)=\sigma^2\int_0^t e^{-2\kappa(t-s)}ds=\frac{\sigma^2}{2\kappa}(1-e^{-2\kappa t}).$$
Its expectation is $\theta+(x-\theta)e^{-\kappa t}$. The limiting mean is $\theta$ and limiting variance $\sigma^2/(2\kappa)$; when $\sigma=0$ the solution is deterministic. Global Lipschitz coefficients ensure a unique nonexplosive strong solution. No differentiability of Brownian paths was used. Writing an ordinary differential equation with a formal derivative of W would not justify the stochastic convolution.`,
 },
 {
  id:'written-binomial-put',practiceMode:'written',title:'Replicate a one-step European put',category:'Finance',subcategory:'Options',difficulty:'medium',contentVersion:1,
  objectiveIds:['lo-finance-options'],
  statement:'A share costs £100 and will be £120 or £80 after one year. A risk-free account earns 5% over the year. A European put has strike £100. Find its state payoffs, a replicating stock-and-cash portfolio, the no-arbitrage price and the risk-neutral probability. Verify that both methods agree.',
  assumptions:'One-step frictionless model; borrowing and short selling are allowed at the same rate, no dividends or default, and trades are executable.',
  hints:['Write the two put payoffs before constructing the hedge.','Let Δ be shares and B the cash held at time zero. Set 120Δ + 1.05B and 80Δ + 1.05B equal to the payoffs.','Subtract the two equations to solve for Δ; the pricing probability is not a supplied physical probability.'],
  criteria:['Obtain payoffs 0 and 20.','Solve Δ = −1/2 and B = 60/1.05.','Obtain price 50/7 ≈ £7.14 and risk-neutral up probability 5/8.'],
  solution:m`The payoffs are $(100-120)^+=0$ and $(100-80)^+=20$. Replication requires $120\Delta+1.05B=0$ and $80\Delta+1.05B=20$. Subtracting gives $40\Delta=-20$, hence $\Delta=-1/2$. The first equation then gives $1.05B=60$, so $B=400/7\approx57.142857$ pounds.
The initial portfolio value is $100\Delta+B=-50+400/7=50/7\approx7.142857$ pounds. Its maturity stock liability is financed by the cash account: the two state values are exactly the put payoffs. Equal statewise cash flows must have equal prices under the stated trading assumptions.
The risk-neutral up probability $q$ solves $120q+80(1-q)=105$, giving $q=25/40=5/8$. The inequalities $80<105<120$ make it a valid probability. Discounted expected payoff is $[q\times0+(1-q)20]/1.05=50/7$, matching replication. No physical expected-return assumption is needed. Forgetting that B is cash today, rather than its maturity value, omits the discounting.`,
 },
 {
  id:'written-python-default',practiceMode:'written',title:'Repair a shared mutable default',category:'Programming',subcategory:'Python fundamentals',difficulty:'medium',contentVersion:1,
  objectiveIds:['lo-programming-python-fundamentals'],knowledgeIds:['prog-python-binding'],
  statement:'In Python 3, explain both printed results, then repair the function so omitted arguments create a fresh list on every call while explicit lists are still mutated in place. Include checks of both behaviours.\n```python\ndef add(x, xs=[]):\n    xs.append(x)\n    return xs\nprint(add(1))\nprint(add(2))\n```',
  hints:['When is a default argument expression evaluated?','Use an immutable sentinel and create the list inside the function.','Check identity as well as value for an explicitly supplied list.'],
  criteria:['Explain outputs [1] and [1, 2] through definition-time default evaluation.','Use None as the default and allocate a fresh list only when it is None.','Verify separate omitted calls and identity of an explicit list.'],
  solution:'The list in the default is created once when the def statement executes. Both omitted calls use that same object, so the first print is [1] and the second is [1, 2]. A later call can also mutate a previously returned reference to the shared list. The repair below preserves explicit-list mutation while allocating a fresh list for omitted arguments. None is the documented sentinel; it is not a valid list argument in this API.\n```python\ndef add(x, xs=None):\n    if xs is None:\n        xs = []\n    xs.append(x)\n    return xs\n\na = add(1)\nb = add(2)\nassert a == [1] and b == [2]\nassert a is not b\nexplicit = [9]\nresult = add(3, explicit)\nassert result is explicit\nassert explicit == [9, 3]\n```\nTesting only one omitted call would miss the bug. Replacing xs on every call would avoid sharing but would silently break the requested explicit-list behaviour. Using a truthiness test instead of is None would also discard a deliberately supplied empty list.',
 },
 {
  id:'written-logistic-gradient',practiceMode:'written',title:'Derive a stable binary logistic loss',category:'Machine Learning',subcategory:'Supervised learning',difficulty:'hard',contentVersion:1,
  objectiveIds:['lo-machine-learning-supervised-learning','lo-machine-learning-optimisation-and-training'],knowledgeIds:['ml-cross-entropy','ml-backpropagation'],
  statement:m`For a feature vector $x$, parameters $w,b$, logit $z=w^Tx+b$ and label $y\in\{0,1\}$, derive gradients of binary cross-entropy with respect to $w,b$. Give a numerically stable logits-based loss expression. Evaluate the loss and gradients for $x=(2,-1)$, $w=(0,0)$, $b=0$, $y=1$.`,
  assumptions:'One example, natural logarithms, no regularisation. Ordinary derivatives apply; this is a derivation exercise without automatic grading.',
  hints:[m`Use $p=1/(1+e^{-z})$ and $dp/dz=p(1-p)$.`,m`Differentiate $-y\log p-(1-y)\log(1-p)$ and simplify before applying the chain rule.`,m`Rewrite the loss as $\log(1+e^z)-yz$, then avoid forming a large $e^z$.`],
  criteria:['Derive ∂L/∂z = p − y and propagate it to x and the intercept.','Use max(z,0) − yz + log(1 + exp(−|z|)).','Obtain loss log 2, gradient w = (−1, 0.5), gradient b = −0.5.'],
  solution:m`The loss is $L=-y\log p-(1-y)\log(1-p)$. Since $p'=p(1-p)$,
$$\frac{\partial L}{\partial z}=\left(-\frac yp+\frac{1-y}{1-p}\right)p(1-p)=p-y.$$
The chain rule then gives $\nabla_wL=(p-y)x$ and $\partial L/\partial b=p-y$. The logits form is $L=\log(1+e^z)-yz$. To avoid overflow for large positive z, use the algebraically identical expression
$$L=\max(z,0)-yz+\log(1+e^{-|z|}).$$
The exponential now lies between zero and one; an implementation should use log1p for its final logarithm. At zero logit, $p=1/2$ and $L=\log2\approx0.693147$. With $y=1$, $p-y=-1/2$, so $\nabla_wL=(-1,1/2)$ and $\partial L/\partial b=-1/2$.
A gradient-descent step subtracts these gradients, raising the logit for this positive example. For a batch, summing versus averaging changes the gradient scale; the prompt specifies a single example. Multiplying by p(1−p) a second time after simplifying p−y would be an erroneous extra chain-rule factor.`,
 },
] satisfies WrittenProblem[];
