import type { MultipleChoiceQuestion } from '../schema';

// Stage 1: deliberately authored examples; Python 3 and C++20 unless stated otherwise.
export default [
  {
    "id": "prog-reference-alias",
    "category": "Programming",
    "subcategory": "C++ fundamentals",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "In C++20, what does this print? Assume the usual headers and that the statements run inside main.\n```cpp\nint x = 3;\nint& r = x;\nr += 2;\nstd::cout << x;\n```",
    "answers": [
      "3",
      "5",
      "2",
      "Compilation error"
    ],
    "correctAnswer": 1,
    "explanation": "A reference aliases its bound object. Updating r updates x, so x becomes 3 + 2 = 5. Assignment through a reference does not rebind it.",
    "knowledgeIds": [
      "prog-ref-binding"
    ]
  },
  {
    "id": "prog-integer-division",
    "category": "Programming",
    "subcategory": "C++ fundamentals",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "In C++20, what does this print? Assume iostream is included and the statements run inside main.\n```cpp\ndouble x = 5 / 2;\nstd::cout << x;\n```",
    "answers": [
      "2.5",
      "3",
      "2",
      "Compilation error"
    ],
    "correctAnswer": 2,
    "explanation": "Both operands of 5 / 2 are integers, so division produces 2 before conversion to double. A floating operand, such as 5.0 / 2, is needed for 2.5.",
    "knowledgeIds": [
      "prog-arithmetic-semantics"
    ]
  },
  {
    "id": "prog-const-reference",
    "category": "Programming",
    "subcategory": "C++ fundamentals",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In C++20, what is the status of this code? Assume it appears inside main.\n```cpp\nconst int x = 4;\nint& r = x;\n```",
    "answers": [
      "Well-formed; r can modify x.",
      "Undefined behaviour only when r is read.",
      "Well-formed; r is automatically const.",
      "Compilation error: const cannot bind to int&."
    ],
    "correctAnswer": 3,
    "explanation": "Binding int& directly to const int would discard const qualification and is ill-formed. const int& r = x is valid. A compile-time binding error is different from undefined behaviour in an accepted programme.",
    "knowledgeIds": [
      "prog-ref-binding"
    ]
  },
  {
    "id": "prog-sort-unique",
    "category": "Programming",
    "subcategory": "C++ STL and algorithms",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In C++20, what is v.size() after this code? Assume vector and algorithm are included. The statements run inside main.\n```cpp\nstd::vector<int> v{3, 1, 3, 2, 1};\nstd::sort(v.begin(), v.end());\nauto e = std::unique(v.begin(), v.end());\nv.erase(e, v.end());\n```",
    "answers": [
      "3",
      "5",
      "2",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Sorting makes equal values adjacent. unique compacts the distinct prefix and returns its new logical end; it does not resize the vector. Erasing the tail leaves {1, 2, 3}, so the size is 3.",
    "knowledgeIds": [
      "prog-stl-invalidation"
    ]
  },
  {
    "id": "prog-hash-lookup",
    "category": "Programming",
    "subcategory": "C++ STL and algorithms",
    "difficulty": "easy",
    "questionType": "property_recognition",
    "prompt": "For std::unordered_map in C++20, with n stored entries and constant-cost hashing and equality, which lookup complexity description is correct?",
    "answers": [
      "Worst-case O(1) for every possible hash function.",
      "Average O(1), but worst-case O(n).",
      "Average O(log n), but worst-case O(1).",
      "Always O(n log n)."
    ],
    "correctAnswer": 1,
    "explanation": "Hash-table lookup is constant time on average under suitable hashing, but collisions can place many keys in one bucket and cause linear worst-case work. Average and worst-case bounds are distinct.",
    "knowledgeIds": [
      "prog-big-o"
    ]
  },
  {
    "id": "prog-vector-invalidation",
    "category": "Programming",
    "subcategory": "C++ STL and algorithms",
    "difficulty": "medium",
    "questionType": "theorem_conditions",
    "prompt": "In C++20, v is a non-empty vector and p points to its first element. A push_back causes reallocation. Which action is valid afterwards?",
    "answers": [
      "Dereference p because the first index still exists.",
      "Subtract p from the new v.data().",
      "Discard p and obtain a new pointer from v.data().",
      "Delete p to release the old vector storage."
    ],
    "correctAnswer": 2,
    "explanation": "Reallocation invalidates all element pointers, references and iterators. The first logical element still exists in new storage, but the old pointer no longer designates it. The vector owns its storage; the caller must not delete an element pointer.",
    "knowledgeIds": [
      "prog-stl-invalidation"
    ]
  },
  {
    "id": "prog-virtual-dispatch",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "In C++20, what is the value returned by b.f()?\n```cpp\nstruct Base {\n  virtual int f() const { return 1; }\n};\nstruct Derived : Base {\n  int f() const override { return 2; }\n};\nDerived d;\nBase& b = d;\n```",
    "answers": [
      "1",
      "Compilation error",
      "Undefined behaviour",
      "2"
    ],
    "correctAnswer": 3,
    "explanation": "A virtual call through a Base reference dispatches to the Derived override for the actual object. There is no slicing: b is a reference to d rather than a copied Base object. No deletion through a base pointer occurs here.",
    "knowledgeIds": [
      "prog-virtual-dispatch"
    ]
  },
  {
    "id": "prog-unique-move",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In C++20, what happens when compiling this code? Assume memory is included.\n```cpp\nauto p = std::make_unique<int>(7);\nauto q = p;\n```",
    "answers": [
      "Compilation fails because unique_ptr is not copyable.",
      "It creates two independent owning pointers.",
      "It compiles and transfers ownership to q.",
      "It compiles, but reading p always causes undefined behaviour."
    ],
    "correctAnswer": 0,
    "explanation": "unique_ptr has exclusive ownership and a deleted copy constructor. auto q = std::move(p) explicitly moves ownership and leaves p empty; q then owns the same allocated int, not a duplicate allocation.",
    "knowledgeIds": [
      "prog-raii"
    ]
  },
  {
    "id": "prog-dangling-reference",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In C++20, which statement describes calling bad() and then reading its returned reference?\n```cpp\nconst int& bad() {\n  int x = 7;\n  return x;\n}\n```",
    "answers": [
      "It always reads 7 because const extends x’s lifetime.",
      "The read has undefined behaviour because x’s lifetime has ended.",
      "A mandatory compilation error prevents every compiler from accepting it.",
      "The reference owns a heap-allocated copy of x."
    ],
    "correctAnswer": 1,
    "explanation": "The local int has automatic storage duration and dies on return. The returned reference dangles, and reading through it is undefined behaviour. const does not extend an ordinary local variable’s lifetime through a returned reference; warnings are not a required rejection.",
    "knowledgeIds": [
      "prog-ref-binding",
      "prog-raii"
    ]
  },
  {
    "id": "prog-lambda-copy",
    "category": "Programming",
    "subcategory": "Modern C++",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In C++20, what does this print? Assume iostream is included. The statements run inside main.\n```cpp\nint x = 1;\nauto f = [x]() mutable { return ++x; };\nstd::cout << f() << \" \" << x;\n```",
    "answers": [
      "2 2",
      "1 1",
      "2 1",
      "Compilation error"
    ],
    "correctAnswer": 2,
    "explanation": "The lambda stores its own copied x. mutable permits updating that captured copy, so f returns 2 while the outer x remains 1. Capturing by reference would instead update the outer object.",
    "knowledgeIds": [
      "prog-lambda-capture"
    ]
  },
  {
    "id": "prog-span-lifetime",
    "category": "Programming",
    "subcategory": "Modern C++",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In C++20, assuming vector and span are included, why is reading through the result of make_view() invalid?\n```cpp\nstd::span<const int> make_view() {\n  std::vector<int> v{1, 2};\n  return {v.data(), v.size()};\n}\n```",
    "answers": [
      "span copies all vector elements into itself.",
      "The returned span automatically keeps v alive.",
      "The size becomes zero on return, preventing any read.",
      "span does not own the storage, which is destroyed with v."
    ],
    "correctAnswer": 3,
    "explanation": "span is a non-owning view. Returning a pointer-and-length view is syntactically valid, but the local vector releases its storage on return. Reading the resulting dangling view is undefined behaviour. Keep the owner alive or return an owning container.",
    "knowledgeIds": [
      "prog-raii"
    ]
  },
  {
    "id": "prog-generator-exhaustion",
    "category": "Programming",
    "subcategory": "Python fundamentals",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "In Python 3, what is printed?\n```python\ng = (x * x for x in range(3))\nprint(sum(g), list(g))\n```",
    "answers": [
      "5 []",
      "5 [0, 1, 4]",
      "3 []",
      "Runtime error: generators cannot be summed"
    ],
    "correctAnswer": 0,
    "explanation": "The generator yields 0, 1 and 4, whose sum is 5. sum consumes it, so a later list(g) is empty. A generator is an iterator, not a reusable materialised list.",
    "knowledgeIds": [
      "prog-python-binding"
    ]
  },
  {
    "id": "prog-mutable-default",
    "category": "Programming",
    "subcategory": "Python fundamentals",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3, what is printed by the two fresh calls shown?\n```python\ndef add(x, items=[]):\n    items.append(x)\n    return len(items)\nprint(add(1), add(2))\n```",
    "answers": [
      "1 1",
      "1 2",
      "2 2",
      "Runtime error: list defaults are forbidden"
    ],
    "correctAnswer": 1,
    "explanation": "The default list is created once when the function is defined and reused by both calls. Its lengths become 1 and then 2. Use items=None and allocate a new list inside the function when each call should have its own list.",
    "knowledgeIds": [
      "prog-python-binding"
    ]
  },
  {
    "id": "prog-closure-binding",
    "category": "Programming",
    "subcategory": "Python fundamentals",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3, what is printed?\n```python\nfs = [lambda: i for i in range(3)]\nprint([f() for f in fs])\n```",
    "answers": [
      "[0, 1, 2]",
      "[0, 0, 0]",
      "[2, 2, 2]",
      "Runtime error: i is undefined in every lambda"
    ],
    "correctAnswer": 2,
    "explanation": "The lambdas capture the comprehension’s shared binding of i, which is 2 after construction. They read it when called. Using lambda i=i: i snapshots each iteration’s value in a default argument, yielding [0, 1, 2].",
    "knowledgeIds": [
      "prog-python-binding"
    ]
  },
  {
    "id": "prog-tuple-mutable-member",
    "category": "Programming",
    "subcategory": "Python data structures",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "In Python 3, what is printed?\n```python\nt = ([1], 2)\nt[0].append(3)\nprint(t)\n```",
    "answers": [
      "([1], 2)",
      "([1], 3)",
      "Runtime error",
      "([1, 3], 2)"
    ],
    "correctAnswer": 3,
    "explanation": "Tuple immutability prevents replacing its element bindings. It does not make a referenced list immutable. The list is changed in place while the tuple continues to reference the same list and integer.",
    "knowledgeIds": [
      "prog-python-binding"
    ]
  },
  {
    "id": "prog-shallow-copy",
    "category": "Programming",
    "subcategory": "Python data structures",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3, what is printed?\n```python\na = [[1], [2]]\nb = a.copy()\nb[0].append(9)\nprint(a[0])\n```",
    "answers": [
      "[1, 9]",
      "[1]",
      "[9]",
      "Runtime error: copy is recursive"
    ],
    "correctAnswer": 0,
    "explanation": "list.copy creates a new outer list but retains references to the inner lists. a[0] and b[0] therefore share the mutated [1, 9]. A suitable deep copy or explicit reconstruction is needed for independent nested lists.",
    "knowledgeIds": [
      "prog-python-binding"
    ]
  },
  {
    "id": "prog-numpy-broadcast",
    "category": "Programming",
    "subcategory": "NumPy and scientific Python",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "With NumPy, what is printed?\n```python\nimport numpy as np\na = np.array([[1], [2]])\nb = np.array([10, 20, 30])\nprint((a + b).tolist())\n```",
    "answers": [
      "[[11], [22]]",
      "[[11, 21, 31], [12, 22, 32]]",
      "[11, 22, 33]",
      "ValueError: all dimensions must be equal"
    ],
    "correctAnswer": 1,
    "explanation": "The shapes (2, 1) and (3,) align from the right: dimensions 1 and 3 broadcast, while the missing leading dimension acts as 1. The result has shape (2, 3), with each row adding its own column value.",
    "knowledgeIds": [
      "prog-numpy-broadcasting"
    ]
  },
  {
    "id": "prog-numpy-view",
    "category": "Programming",
    "subcategory": "NumPy and scientific Python",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "With NumPy, what is printed?\n```python\nimport numpy as np\na = np.arange(4)\nb = a[1:3]\nb[0] = 99\nprint(a.tolist())\n```",
    "answers": [
      "[0, 1, 2, 3]",
      "[99, 1, 2, 3]",
      "[0, 99, 2, 3]",
      "[0, 99, 99, 3]"
    ],
    "correctAnswer": 2,
    "explanation": "Basic slicing creates a view into this array’s storage. b[0] corresponds to a[1], so writing 99 changes the original. a[1:3].copy() would instead create independent storage; advanced indexing has different copy semantics.",
    "knowledgeIds": [
      "prog-numpy-broadcasting"
    ]
  },
  {
    "id": "prog-pairwise-memory",
    "category": "Programming",
    "subcategory": "NumPy and scientific Python",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "X is a NumPy array of shape (n, d). What is the main memory pitfall of the following vectorisation for large n and d? Assume the result is fully materialised.\n```python\ndiff = X[:, None, :] - X[None, :, :]\n```",
    "answers": [
      "It uses only O(d) output storage.",
      "It cannot broadcast because the inputs have different shapes.",
      "It always returns a zero-copy view of X.",
      "It creates an (n, n, d) result requiring O(n²d) elements."
    ],
    "correctAnswer": 3,
    "explanation": "The views have shapes (n, 1, d) and (1, n, d), which broadcast to (n, n, d). Although adding axes is cheap, subtraction allocates the full result. Chunking or specialised distance routines can avoid this large three-dimensional intermediate.",
    "knowledgeIds": [
      "prog-numpy-broadcasting",
      "prog-big-o"
    ]
  },
  {
    "id": "prog-binary-search",
    "category": "Programming",
    "subcategory": "Algorithms and complexity",
    "difficulty": "easy",
    "questionType": "property_recognition",
    "prompt": "A sorted random-access array has n elements. Ordinary binary search halves the remaining interval at each step. Which offered expression is the tightest asymptotic upper bound on its worst-case number of comparisons?",
    "answers": [
      "O(log n)",
      "O(1)",
      "O(n)",
      "O(n log n)"
    ],
    "correctAnswer": 0,
    "explanation": "After k halvings the remaining interval has about n/2^k elements. Reaching one element requires k of order log₂ n. Sorting the array beforehand is a separate cost; this bound assumes random-access reads are constant time.",
    "knowledgeIds": [
      "prog-big-o"
    ]
  },
  {
    "id": "prog-dynamic-array-amortised",
    "category": "Programming",
    "subcategory": "Algorithms and complexity",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "A dynamic array doubles capacity when full. Starting empty, ignoring allocation failure and assuming each element move has constant cost, what is the total work for n appends?",
    "answers": [
      "O(n²), because every append moves every element.",
      "O(n), despite occasional O(n) individual appends.",
      "O(log n), because only capacity doublings count.",
      "O(1), independent of n."
    ],
    "correctAnswer": 1,
    "explanation": "Each append writes an element, and resizing moves capacities 1 + 2 + 4 + … up to order n. This geometric sum is O(n), giving O(1) amortised work per append. It is not a worst-case constant bound for each individual operation.",
    "knowledgeIds": [
      "prog-big-o"
    ]
  },
  {
    "id": "prog-off-by-one",
    "category": "Programming",
    "subcategory": "Debugging and code analysis",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In Python 3, what happens when this runs?\n```python\nxs = [10, 20, 30]\ns = 0\nfor i in range(len(xs) + 1):\n    s += xs[i]\nprint(s)\n```",
    "answers": [
      "It prints 60.",
      "It prints 90.",
      "It raises IndexError before print executes.",
      "It is rejected as a syntax error."
    ],
    "correctAnswer": 2,
    "explanation": "The range includes 0, 1, 2 and 3. xs[3] is out of bounds, so the last iteration raises IndexError and the print statement is not reached. Use range(len(xs)) or iterate directly over xs.",
    "knowledgeIds": [
      "prog-python-binding"
    ]
  },
  {
    "id": "prog-signed-overflow",
    "category": "Programming",
    "subcategory": "Debugging and code analysis",
    "difficulty": "medium",
    "questionType": "counterexample_recognition",
    "prompt": "In C++20, which classification applies to evaluating y? Assume limits is included.\n```cpp\nint x = std::numeric_limits<int>::max();\nint y = x + 1;\n```",
    "answers": [
      "Guaranteed wraparound to the minimum int.",
      "A mandatory compile-time error for every compiler.",
      "A standard-mandated exception at runtime.",
      "Undefined behaviour from signed integer overflow."
    ],
    "correctAnswer": 3,
    "explanation": "The mathematical sum exceeds the representable int range. Signed integer overflow is undefined behaviour in C++20, so no deterministic y is promised. Unsigned arithmetic has modular rules; observing wraparound on one build does not establish signed-language semantics.",
    "knowledgeIds": [
      "prog-arithmetic-semantics"
    ]
  },
  {
    "id": "prog-stable-sum",
    "category": "Programming",
    "subcategory": "Numerical and quantitative programming",
    "difficulty": "medium",
    "questionType": "property_recognition",
    "prompt": "In Python 3, which standard-library operation is designed to sum floating-point inputs such as [1e16, 1.0, -1e16] more accurately using tracked partial sums?",
    "answers": [
      "math.fsum(values)",
      "int(sum(values))",
      "max(values) - min(values)",
      "sum(int(x) for x in values)"
    ],
    "correctAnswer": 0,
    "explanation": "math.fsum tracks partial sums to reduce rounding loss. Cancellation can lose the small 1.0 in a naive left-to-right accumulation; converting to int after a rounded sum cannot recover it. This is improved floating-point accumulation, not a universal exact-arithmetic guarantee.",
    "knowledgeIds": [
      "prog-numerical-stability"
    ]
  },
  {
    "id": "prog-welford-variance",
    "category": "Programming",
    "subcategory": "Numerical and quantitative programming",
    "difficulty": "medium",
    "questionType": "property_recognition",
    "prompt": "For streaming observations x, a running count n, mean mu and centred sum M2, which update is Welford’s variance algorithm? Assume n already includes the new observation; delta is computed before changing mu.",
    "answers": [
      "delta=x-mu; mu=x; M2+=delta*delta",
      "delta=x-mu; mu+=delta/n; M2+=delta*(x-mu)",
      "delta=x-mu; mu+=delta; M2+=x*x",
      "delta=x-mu; mu+=delta/n; M2+=delta/n"
    ],
    "correctAnswer": 1,
    "explanation": "With n already incremented, set delta=x−mu_old, mu_new=mu_old+delta/n and M2_new=M2_old+delta(x−mu_new). Population variance is M2/n, and sample variance is M2/(n−1) for n>1. Centred updates avoid subtracting two large nearly equal raw second moments.",
    "knowledgeIds": [
      "prog-numerical-stability"
    ]
  },
] satisfies MultipleChoiceQuestion[];
