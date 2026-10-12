import type { MultipleChoiceQuestion } from '../../schema';

// Stage 2: independently reviewed additions; original bank files remain intact.
export default [
  {
    "id": "s2-measure-generated-atoms",
    "category": "Measure Theory",
    "subcategory": "Sigma-algebras",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "On Ω={1,2,3,4,5}, let A={1,2} and B={2,3}. How many sets belong to σ(A,B)?",
    "answers": [
      "4",
      "8",
      "32",
      "16"
    ],
    "correctAnswer": 3,
    "explanation": "The nonempty atoms are A∩B={2}, A∖B={1}, B∖A={3} and (A∪B)ᶜ={4,5}. Every measurable set is a union of these four atoms, giving 2⁴=16. Points 4 and 5 cannot be separated by the generated information.",
    "objectiveIds": [
      "lo-measure-theory-sigma-algebras"
    ],
    "knowledgeIds": [
      "def-sigma-algebra"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Partition the space by membership in A and B."
    ]
  },
  {
    "id": "s2-measure-union-not-sigma",
    "category": "Measure Theory",
    "subcategory": "Sigma-algebras",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "On Ω={1,2,3,4}, put A={1,2}, B={1,3}, F=σ(A), G=σ(B). Why is F∪G not a sigma-algebra?",
    "answers": [
      "A∩B={1} is absent from F∪G.",
      "Ω is absent from F∪G.",
      "Complements of A and B are absent.",
      "F and G themselves are not sigma-algebras."
    ],
    "correctAnswer": 0,
    "explanation": "F contains only ∅,Ω,A,Aᶜ, and G only ∅,Ω,B,Bᶜ. Their union contains A and B but not their intersection {1}. Each component is closed under complements, yet taking a union of two sigma-algebras need not preserve finite intersections or unions.",
    "objectiveIds": [
      "lo-measure-theory-sigma-algebras"
    ],
    "knowledgeIds": [
      "def-sigma-algebra"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "List both four-element collections and check a cross-collection intersection."
    ]
  },
  {
    "id": "s2-measure-partition-function",
    "category": "Measure Theory",
    "subcategory": "Measurable functions",
    "difficulty": "easy",
    "questionType": "implication",
    "prompt": "On Ω={1,2,3,4}, let F=σ({1,2}). Which list (f(1),f(2),f(3),f(4)) defines an F-measurable real function?",
    "answers": [
      "(0,0,0,1)",
      "(0,0,1,1)",
      "(0,1,0,1)",
      "(0,1,1,0)"
    ],
    "correctAnswer": 1,
    "explanation": "The atoms of F are {1,2} and {3,4}. A measurable real function must be constant on each atom; otherwise a Borel preimage separates indistinguishable points. Only (0,0,1,1) is constant on both atoms.",
    "objectiveIds": [
      "lo-measure-theory-measurable-functions"
    ],
    "knowledgeIds": [
      "def-measurable-function",
      "def-sigma-algebra"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Identify the sets that the available information can distinguish."
    ]
  },
  {
    "id": "s2-measure-countable-supremum",
    "category": "Measure Theory",
    "subcategory": "Measurable functions",
    "difficulty": "easy",
    "questionType": "implication",
    "prompt": "Real measurable f_n have a finite pointwise supremum f. Which identity proves f is measurable using strict superlevel sets?",
    "answers": [
      "$\\{f>a\\}=\\bigcup_n\\{f_n\\ge a\\}$",
      "$\\{f>a\\}=\\bigcap_n\\{f_n\\ge a\\}$",
      "$\\{f>a\\}=\\bigcup_n\\{f_n>a\\}$",
      "$\\{f>a\\}=\\bigcap_n\\{f_n>a\\}$"
    ],
    "correctAnswer": 2,
    "explanation": "A supremum exceeds a iff at least one term exceeds a. The resulting countable union is measurable. An intersection requires every term to exceed the threshold, and replacing > by ≥ incorrectly includes sequences with supremum exactly a.",
    "objectiveIds": [
      "lo-measure-theory-measurable-functions"
    ],
    "knowledgeIds": [
      "def-measurable-function"
    ],
    "tags": [
      "stage-2",
      "concept"
    ]
  },
  {
    "id": "s2-measure-decreasing-infinite-mass",
    "category": "Measure Theory",
    "subcategory": "Measures",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "On positive integers with counting measure, let A_n={n,n+1,...}. What is (μ(∩_n A_n), lim_n μ(A_n))?",
    "answers": [
      "$(\\infty,\\infty)$",
      "$(0,0)$",
      "$(1,0)$",
      "$(0,\\infty)$"
    ],
    "correctAnswer": 3,
    "explanation": "No fixed integer belongs to every tail, so the intersection is empty and has mass zero. Each tail is infinite and has mass infinity. Continuity from above requires finite mass of an initial set; continuity from below does not justify this decreasing sequence.",
    "objectiveIds": [
      "lo-measure-theory-measures"
    ],
    "knowledgeIds": [
      "result-measure-continuity"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Evaluate the intersection and each individual mass separately."
    ]
  },
  {
    "id": "s2-measure-completion-indicator",
    "category": "Measure Theory",
    "subcategory": "Measures",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "Let C be the Cantor set and N a non-Borel subset of C. Which is true of 1_N on [0,1] with its Borel sigma-algebra versus the completed Lebesgue sigma-algebra?",
    "answers": [
      "It is Lebesgue measurable but not Borel measurable.",
      "It is Borel measurable but not Lebesgue measurable.",
      "It is measurable in neither space.",
      "It is continuous because C has measure zero."
    ],
    "correctAnswer": 0,
    "explanation": "C is Borel and Lebesgue-null, so completion contains every subset N. A Borel-measurable indicator would have Borel preimage N of {1}, contradicting the premise. Null measure is not continuity and does not put N into the uncompleted Borel sigma-algebra.",
    "objectiveIds": [
      "lo-measure-theory-measures"
    ],
    "knowledgeIds": [
      "def-measurable-function",
      "result-measure-completion"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use the preimage of {1} and the definition of completion."
    ]
  },
  {
    "id": "s2-measure-overlapping-simple",
    "category": "Measure Theory",
    "subcategory": "Lebesgue integration",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "With Lebesgue measure on [0,1], let $s=1_{[0,3/4]}+2\\,1_{[1/4,1]}$. What is its integral?",
    "answers": [
      "3",
      "9/4",
      "3/2",
      "2"
    ],
    "correctAnswer": 1,
    "explanation": "Linearity gives length([0,3/4])+2length([1/4,1])=3/4+3/2=9/4. The overlap is counted with value three, as required by the sum; it is not discarded. A disjoint atom representation gives the same answer.",
    "objectiveIds": [
      "lo-measure-theory-lebesgue-integration"
    ],
    "knowledgeIds": [
      "def-signed-lebesgue-integral"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "The function is a sum, so overlap contributes both terms."
    ]
  },
  {
    "id": "s2-measure-improper-versus-lebesgue",
    "category": "Measure Theory",
    "subcategory": "Lebesgue integration",
    "difficulty": "hard",
    "questionType": "implication",
    "prompt": "The improper integral $\\lim_{R\\to\\infty}\\int_1^R\\sin(x)/x\\,dx$ converges. What is the status of the signed Lebesgue integral over [1,∞)?",
    "answers": [
      "Positive infinity because the integrand is nonnegative.",
      "Zero because sine has zero average on each period.",
      "Undefined as a signed Lebesgue integral: both positive and negative parts have infinite integrals.",
      "Finite because every convergent improper integral is Lebesgue integrable."
    ],
    "correctAnswer": 2,
    "explanation": "Dirichlet cancellation gives improper convergence. On fixed subintervals of each positive and negative sine lobe, |sin x| is bounded below by a positive constant while 1/x is comparable to 1/k in the kth period. Both part integrals therefore dominate divergent harmonic sums. Signed Lebesgue integration cannot subtract infinity from infinity.",
    "objectiveIds": [
      "lo-measure-theory-lebesgue-integration"
    ],
    "knowledgeIds": [
      "def-signed-lebesgue-integral"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Separate cancellation in ordered truncations from integrability of the positive and negative parts.",
      "Use a fixed-width part of each lobe where the absolute sine is bounded away from zero."
    ]
  },
  {
    "id": "s2-measure-mct-infinite-limit",
    "category": "Measure Theory",
    "subcategory": "Convergence theorems",
    "difficulty": "easy",
    "questionType": "implication",
    "prompt": "On [0,∞) with Lebesgue measure, let $f_n(x)=x1_{[0,n]}(x)$. What can monotone convergence conclude?",
    "answers": [
      "The theorem fails because the limit is not integrable.",
      "The integrals converge to zero because each support is bounded.",
      "The theorem requires the entire space to have finite measure.",
      "$\\int f_n=n^2/2\\uparrow\\int x\\,dx=\\infty$."
    ],
    "correctAnswer": 3,
    "explanation": "The functions are nonnegative and increase pointwise to x. Their integrals are n²/2 and diverge to infinity, a permitted extended value in monotone convergence. Neither a finite-measure space nor an integrable limit is required.",
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ],
    "knowledgeIds": [
      "thm-monotone-convergence"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Check monotonicity before deciding whether infinity is allowed."
    ]
  },
  {
    "id": "s2-measure-log-dct",
    "category": "Measure Theory",
    "subcategory": "Convergence theorems",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "For x∈[0,1], set $f_n(x)=n\\log(1+x/n)$. What is $\\lim_n\\int_0^1 f_n(x)\\,dx$, and what justifies passing the limit inside?",
    "answers": [
      "1/2, by DCT with envelope x.",
      "1, by DCT with envelope n.",
      "0, because log(1+x/n) tends to zero.",
      "Infinity, because the prefactor n diverges."
    ],
    "correctAnswer": 0,
    "explanation": "For fixed x, nlog(1+x/n)→x. The inequality 0≤log(1+u)≤u for u≥0 gives 0≤f_n(x)≤x, a single integrable envelope. DCT yields ∫₀¹x dx=1/2. A varying envelope n does not itself meet DCT, and the small logarithm must be considered with its prefactor.",
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ],
    "knowledgeIds": [
      "thm-dominated-convergence"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Find the pointwise limit of the entire product.",
      "Bound log(1+u) by u."
    ]
  },
  {
    "id": "s2-measure-strict-fatou",
    "category": "Measure Theory",
    "subcategory": "Convergence theorems",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "On [0,1], even-indexed f_n indicate [0,1/2] and odd-indexed f_n indicate (1/2,1]. What is $(\\int\\liminf_n f_n,\\liminf_n\\int f_n)$?",
    "answers": [
      "$(1,1/2)$",
      "$(0,1/2)$",
      "$(1/2,1/2)$",
      "$(0,0)$"
    ],
    "correctAnswer": 1,
    "explanation": "At every point the sequence alternates between zero and one, so its liminf is zero. Each integral is 1/2. Fatou gives a strict inequality here. Boundedness supplies an envelope, but DCT still lacks a pointwise limit.",
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ],
    "knowledgeIds": [
      "lemma-fatou",
      "thm-dominated-convergence"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compute the pointwise liminf before taking any integral."
    ]
  },
  {
    "id": "s2-measure-uniform-infinite-domain",
    "category": "Measure Theory",
    "subcategory": "Convergence theorems",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "On R with Lebesgue measure, $f_n(x)=1/n$. Which statement correctly compares uniform convergence and integrals?",
    "answers": [
      "The functions do not converge pointwise because R is infinite.",
      "Each integral equals 1/n.",
      "f_n→0 uniformly, but every integral is infinity.",
      "Uniform convergence forces the integrals to tend to zero on any measure space."
    ],
    "correctAnswer": 2,
    "explanation": "The uniform norm is 1/n→0, but a positive constant over an infinite-measure space has infinite integral. A common constant envelope is not integrable. Uniform convergence controls the integral on finite-measure spaces, not automatically on R.",
    "objectiveIds": [
      "lo-measure-theory-convergence-theorems"
    ],
    "knowledgeIds": [
      "thm-dominated-convergence",
      "def-lp-convergence"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Separate a supremum over x from an integral over an infinite domain."
    ]
  },
  {
    "id": "s2-measure-tonelli-singular-kernel",
    "category": "Measure Theory",
    "subcategory": "Product measures",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "For $f(x,y)=1/(x+y)$ on (0,1)², what is the double integral and a valid justification despite the singularity at the boundary?",
    "answers": [
      "$\\infty$; every boundary singularity is nonintegrable.",
      "$\\log2$; symmetry halves the integral.",
      "$0$; exchanging x and y changes the sign.",
      "$2\\log2$; Tonelli first, then finite integrability permits Fubini."
    ],
    "correctAnswer": 3,
    "explanation": "The kernel is nonnegative, so Tonelli applies before integrability is known. Integrating in y gives log(x+1)−log x. Integrating in x from zero to one gives 2log2, proving finite absolute integral and hence also licensing Fubini. Symmetry does not halve the domain or reverse the sign.",
    "objectiveIds": [
      "lo-measure-theory-product-measures"
    ],
    "knowledgeIds": [
      "thm-tonelli",
      "thm-fubini"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use nonnegativity first, then calculate an iterated logarithmic integral."
    ]
  },
  {
    "id": "s2-measure-continuous-density-expectation",
    "category": "Measure Theory",
    "subcategory": "Radon-Nikodym theorem",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "On [0,1], ν has density $d\\nu/dx=2x$ relative to Lebesgue measure. What is $\\int x\\,d\\nu$?",
    "answers": [
      "2/3",
      "1/2",
      "1/3",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "Change of measure gives ∫₀¹x(2x)dx=2/3. The density integrates to one; it reweights x and cannot be omitted. Integrating only the density computes ν’s total mass instead of the requested expectation.",
    "objectiveIds": [
      "lo-measure-theory-radon-nikodym-theorem"
    ],
    "knowledgeIds": [
      "thm-radon-nikodym"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Multiply the integrand by the Radon–Nikodym density."
    ]
  },
  {
    "id": "s2-measure-mixture-absolute-continuity",
    "category": "Measure Theory",
    "subcategory": "Radon-Nikodym theorem",
    "difficulty": "easy",
    "questionType": "implication",
    "prompt": "On Borel subsets of [0,1], let μ be Lebesgue measure and $\\nu=(\\mu+\\delta_0)/2$. Which statement is true?",
    "answers": [
      "ν and μ are mutually singular because ν has an atom.",
      "ν is not absolutely continuous with respect to μ because ν({0})=1/2.",
      "ν≪μ because half its mass has a Lebesgue density.",
      "ν has Lebesgue density 1/2 and total mass one."
    ],
    "correctAnswer": 1,
    "explanation": "The μ-null singleton {0} has ν-mass 1/2, disproving ν≪μ. A density 1/2 represents only the continuous part and integrates to 1/2. The measures are not mutually singular: ν also contains a positive Lebesgue component.",
    "objectiveIds": [
      "lo-measure-theory-radon-nikodym-theorem"
    ],
    "knowledgeIds": [
      "def-absolute-continuity-measures"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Test absolute continuity on a singleton supporting the atom."
    ]
  },
  {
    "id": "s2-measure-pushforward-grouping",
    "category": "Measure Theory",
    "subcategory": "Probability measures",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "On {a,b,c}, P has masses (1/2,1/3,1/6). A map T sends a to 0 and b,c to 1. What is the pushforward law of T?",
    "answers": [
      "$\\tfrac12\\delta_0+\\tfrac13\\delta_1$",
      "$\\delta_1$",
      "$\\tfrac12\\delta_0+\\tfrac12\\delta_1$",
      "$\\tfrac13\\delta_0+\\tfrac23\\delta_1$"
    ],
    "correctAnswer": 2,
    "explanation": "Pushforward mass at an output is the mass of its preimage. T⁻¹({1})={b,c} has probability 1/3+1/6=1/2, while output zero has mass 1/2. Distinct input points can contribute to the same output atom.",
    "objectiveIds": [
      "lo-measure-theory-probability-measures"
    ],
    "knowledgeIds": [
      "def-pushforward-measure"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Collect all input points that map to each output."
    ]
  }
] satisfies MultipleChoiceQuestion[];
