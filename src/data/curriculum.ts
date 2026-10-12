/** Single source of truth for category/subcategory membership. Add topics here first. */
export const curriculum = {
  Probability: [
    'Probability spaces', 'Conditional probability', 'Independence', 'Random variables',
    'Common distributions', 'Expectation', 'Conditional expectation', 'Generating functions',
    'Modes of convergence', 'Laws of large numbers', 'Central limit theorem', 'Concentration inequalities',
  ],
  Statistics: [
    'Estimation', 'Bias, variance and MSE', 'Maximum likelihood', 'Sufficiency',
    'Hypothesis testing', 'Confidence intervals', 'Regression', 'Bayesian inference', 'Asymptotic statistics',
  ],
  'Measure Theory': [
    'Sigma-algebras', 'Measures', 'Measurable functions', 'Lebesgue integration',
    'Almost sure / almost everywhere concepts', 'Convergence theorems', 'Product measures',
    'Radon-Nikodym theorem', 'Probability measures',
  ],
  'Stochastic Processes': [
    'General definitions', 'Filtrations', 'Random walks', 'Markov chains',
    'Continuous-time Markov chains', 'Poisson processes', 'Martingales', 'Stopping times',
    'Brownian motion', 'Gaussian processes', 'Birth-death processes', 'Levy processes',
  ],
  'Stochastic Calculus': [
    'Brownian motion properties', 'Quadratic variation', 'Stochastic integration', 'Ito integral',
    "Ito's lemma", 'Continuous martingales', 'Local martingales', 'Semimartingales',
    'Stochastic differential equations', 'Strong and weak solutions', 'Existence and uniqueness',
    'Girsanov theorem', 'Martingale representation', 'Feynman-Kac', 'Infinitesimal generators',
    'Kolmogorov equations', 'Martingale problems',
  ],
  Finance: [
    'Financial markets and instruments', 'Market microstructure', 'Bonds and fixed income',
    'Loans and credit', 'Forwards and futures', 'Options', 'Swaps and other derivatives',
    'Portfolio theory and asset pricing', 'Financial risk management',
    'Quantitative pricing and numerical finance',
  ],
  Programming: [
    'C++ fundamentals', 'C++ STL and algorithms', 'C++ object-oriented programming and memory',
    'Modern C++', 'Python fundamentals', 'Python data structures', 'NumPy and scientific Python',
    'Algorithms and complexity', 'Debugging and code analysis', 'Numerical and quantitative programming',
  ],
  'Machine Learning': [
    'Machine learning foundations', 'Supervised learning', 'Unsupervised learning',
    'Optimisation and training', 'Neural networks and deep learning', 'Reinforcement learning',
    'Probabilistic and Bayesian machine learning', 'Time series and sequential machine learning',
    'Evaluation and generalisation', 'Applied machine learning and implementation',
  ],
} as const;

export type Category = keyof typeof curriculum;
export type Subcategory<C extends Category = Category> = (typeof curriculum)[C][number];
export const categories = Object.keys(curriculum) as Category[];
