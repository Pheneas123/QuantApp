import type { MultipleChoiceQuestion } from '../../schema';

// Stage 2: independently reviewed additions; original bank files remain intact.
export default [
  {
    "id": "s2-prog-pointer-reference-rebinding",
    "category": "Programming",
    "subcategory": "C++ fundamentals",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In C++20, with iostream included and these statements inside main, what is printed?\n```cpp\nint a = 2, b = 7;\nint* p = &a;\nint& r = *p;\np = &b;\nr += 3;\n*p += 1;\nstd::cout << a << \" \" << b;\n```",
    "answers": [
      "3 8",
      "5 7",
      "5 8",
      "2 11"
    ],
    "correctAnswer": 2,
    "explanation": "r binds to a at its declaration. Reassigning p changes the pointer, not the existing reference. Hence r increases a to 5 and *p increases b to 8. A reference is not a dynamically redirected alias of the pointer variable.",
    "objectiveIds": [
      "lo-programming-c-fundamentals"
    ],
    "knowledgeIds": [
      "prog-ref-binding"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Record which object each handle denotes after every statement."
    ]
  },
  {
    "id": "s2-prog-negative-division",
    "category": "Programming",
    "subcategory": "C++ fundamentals",
    "difficulty": "easy",
    "questionType": "short_calculation",
    "prompt": "In C++20, with iostream included and statements inside main, what is printed?\n```cpp\nstd::cout << -7 / 3 << \" \" << -7 % 3;\n```",
    "answers": [
      "-3 2",
      "-2 1",
      "-3 -1",
      "-2 -1"
    ],
    "correctAnswer": 3,
    "explanation": "Integral division truncates towards zero, giving −2. The remainder satisfies a=(a/b)b+a%b, so −7=(−2)3+(−1). Floor division conventions from another language must not be transferred to C++.",
    "objectiveIds": [
      "lo-programming-c-fundamentals"
    ],
    "knowledgeIds": [
      "prog-arithmetic-semantics"
    ],
    "tags": [
      "stage-2",
      "application"
    ]
  },
  {
    "id": "s2-prog-const-pointer-error",
    "category": "Programming",
    "subcategory": "C++ fundamentals",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In C++20, assume these statements are inside main. Which line is ill-formed?\n```cpp\nint x = 1;             // 1\nint* const p = &x;     // 2\n*p = 2;               // 3\np = nullptr;          // 4\n```",
    "answers": [
      "Line 4: the pointer itself is const.",
      "Line 2: pointers cannot be const.",
      "Line 3: a const pointer always has a const pointee.",
      "All four lines are well-formed."
    ],
    "correctAnswer": 0,
    "explanation": "The declaration makes p an unchangeable pointer to a mutable int. Dereferencing it can assign to x, but assigning a new pointer value to p is prohibited. const int* would instead protect the pointee and permit pointer rebinding.",
    "objectiveIds": [
      "lo-programming-c-fundamentals"
    ],
    "knowledgeIds": [
      "prog-ref-binding"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Locate const relative to the pointer declarator."
    ]
  },
  {
    "id": "s2-prog-map-insertion",
    "category": "Programming",
    "subcategory": "C++ STL and algorithms",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In C++20, include map and iostream; these statements run inside main. What is printed?\n```cpp\nstd::map<int, int> m;\nstd::cout << m.size() << \" \";\nauto it = m.find(7);\nstd::cout << m[7] << \" \" << m.size();\n```",
    "answers": [
      "Compilation fails because key 7 is absent.",
      "0 0 1",
      "0 0 0",
      "0 7 1"
    ],
    "correctAnswer": 1,
    "explanation": "find does not insert, so the map is still empty. operator[] inserts an absent key with a value-initialised int, which is zero. The final map size is one. Absence with find differs from lookup-plus-insertion with operator[].",
    "objectiveIds": [
      "lo-programming-c-stl-and-algorithms"
    ],
    "knowledgeIds": [
      "prog-container-operations"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compare the insertion behaviour of find and operator[]."
    ]
  },
  {
    "id": "s2-prog-erase-loop-fix",
    "category": "Programming",
    "subcategory": "C++ STL and algorithms",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In C++20, v is a vector<int> and it initially equals v.begin(). Which replacement for NEXT safely removes every even element while keeping odd elements?\n```cpp\nwhile (it != v.end()) {\n  if (*it % 2 == 0) {\n    NEXT;\n  } else {\n    ++it;\n  }\n}\n```",
    "answers": [
      "++it; v.erase(it)",
      "v.clear(); it = v.end()",
      "it = v.erase(it)",
      "v.erase(it); ++it"
    ],
    "correctAnswer": 2,
    "explanation": "erase returns a valid iterator to the element after the removed one, or the new end. The old iterator is invalidated; the successor must be examined without an extra increment. Clearing loses odd elements and incrementing before erase removes the wrong element or erases end.",
    "objectiveIds": [
      "lo-programming-c-stl-and-algorithms"
    ],
    "knowledgeIds": [
      "prog-stl-invalidation"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Use the iterator returned by erase; do not reuse the invalidated one."
    ]
  },
  {
    "id": "s2-prog-descending-search-range",
    "category": "Programming",
    "subcategory": "C++ STL and algorithms",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In C++20, include vector, algorithm, functional and iostream. Statements run inside main. What indices are printed?\n```cpp\nstd::vector<int> v{9, 7, 7, 3};\nauto lo = std::lower_bound(v.begin(), v.end(), 7, std::greater<int>{});\nauto hi = std::upper_bound(v.begin(), v.end(), 7, std::greater<int>{});\nstd::cout << (lo - v.begin()) << \" \" << (hi - v.begin());\n```",
    "answers": [
      "1 2",
      "2 3",
      "0 4",
      "1 3"
    ],
    "correctAnswer": 3,
    "explanation": "The vector is ordered by the supplied greater comparator. lower_bound finds the first element not greater than 7, at index 1; upper_bound finds the first element strictly below 7, at index 3. The equal range is half-open [1,3), covering both copies.",
    "objectiveIds": [
      "lo-programming-c-stl-and-algorithms"
    ],
    "knowledgeIds": [
      "prog-container-operations"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Interpret both bounds in the supplied descending ordering."
    ]
  },
  {
    "id": "s2-prog-construction-dispatch",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "difficulty": "hard",
    "questionType": "short_calculation",
    "prompt": "In C++20, include iostream and memory. What complete output is produced?\n```cpp\nstruct Base {\n  Base() { std::cout << \"B\"; f(); }\n  virtual void f() { std::cout << \"b\"; }\n  virtual ~Base() { std::cout << \"C\"; }\n};\nstruct Derived : Base {\n  Derived() { std::cout << \"D\"; }\n  void f() override { std::cout << \"X\"; }\n  ~Derived() override { std::cout << \"d\"; }\n};\nint main() {\n  auto p = std::make_unique<Derived>();\n  p->f();\n}\n```",
    "answers": [
      "BbDXdC",
      "BXDXdC",
      "BbDXCd",
      "BbDbCd"
    ],
    "correctAnswer": 0,
    "explanation": "Base constructs first and its constructor dispatches f to Base, printing Bb. Derived then prints D. Once construction finishes, p->f() dispatches to Derived and prints X. Scope exit destroys Derived before Base, printing dC. Calling a virtual during base construction does not reach a not-yet-constructed derived part.",
    "objectiveIds": [
      "lo-programming-c-object-oriented-programming-and-memory"
    ],
    "knowledgeIds": [
      "prog-virtual-dispatch",
      "prog-raii",
      "prog-construction-dispatch"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Separate construction-time dispatch from dispatch on the completed object.",
      "List constructor and destructor order independently."
    ]
  },
  {
    "id": "s2-prog-aliasing-shared-owner",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In C++20, include memory and iostream; the following runs inside main. What is printed?\n```cpp\nstruct Pair { int first = 2, second = 9; };\nauto owner = std::make_shared<Pair>();\nstd::shared_ptr<int> field(owner, &owner->second);\nowner.reset();\nstd::cout << *field << \" \" << field.use_count();\n```",
    "answers": [
      "Compilation fails because shared_ptr cannot point to a member.",
      "9 1",
      "9 0",
      "Undefined behaviour: reset destroys Pair immediately."
    ],
    "correctAnswer": 1,
    "explanation": "The aliasing constructor stores the member pointer but shares ownership of the Pair’s control block. Resetting owner leaves field as the sole owner; the complete Pair remains alive, so the member read is valid and the count is one. Stored pointer type and owned object type need not match.",
    "objectiveIds": [
      "lo-programming-c-object-oriented-programming-and-memory"
    ],
    "knowledgeIds": [
      "prog-aliasing-ownership",
      "prog-raii"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Distinguish the stored pointer from the object controlled by the ownership block."
    ]
  },
  {
    "id": "s2-prog-unique-move-replacement",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In C++20, include memory, utility and iostream. What complete output is produced?\n```cpp\nstruct R {\n  int id;\n  ~R() { std::cout << id << \" \"; }\n};\nint main() {\n  auto a = std::unique_ptr<R>(new R{1});\n  auto b = std::unique_ptr<R>(new R{2});\n  b = std::move(a);\n  std::cout << bool(a) << \" \" << b->id << \" \";\n}\n```",
    "answers": [
      "2 1 1 1",
      "2 0 1 2",
      "2 0 1 1",
      "0 1 2 1"
    ],
    "correctAnswer": 2,
    "explanation": "Move assignment first disposes of b’s former object, printing 2. Ownership of object 1 transfers and a becomes empty, so the explicit print is 0 1. On scope exit b destroys object 1, printing 1; a destroys nothing. std::move does not create a second owner.",
    "objectiveIds": [
      "lo-programming-c-object-oriented-programming-and-memory",
      "lo-cpp-value-semantics"
    ],
    "knowledgeIds": [
      "prog-raii",
      "prog-value-semantics"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Track the resource replaced at assignment and the resources remaining at scope exit."
    ]
  },
  {
    "id": "s2-prog-perfect-forwarding",
    "category": "Programming",
    "subcategory": "Modern C++",
    "difficulty": "hard",
    "questionType": "short_calculation",
    "prompt": "In C++20, include utility and iostream. What is printed?\n```cpp\nvoid f(int&)  { std::cout << \"L\"; }\nvoid f(int&&) { std::cout << \"R\"; }\ntemplate<class T> void call(T&& x) {\n  f(x);\n  f(std::forward<T>(x));\n}\nint main() {\n  int n = 0;\n  call(n);\n  call(1);\n}\n```",
    "answers": [
      "LRLR",
      "LLRR",
      "RRRR",
      "LLLR"
    ],
    "correctAnswer": 3,
    "explanation": "For call(n), T deduces to int&, reference collapsing makes both calls lvalues and prints LL. For call(1), T=int, but the named parameter expression x is still an lvalue, printing L; forward<int>(x) restores an rvalue expression, printing R. Declared reference type and expression value category are different.",
    "objectiveIds": [
      "lo-cpp-value-semantics"
    ],
    "knowledgeIds": [
      "prog-value-semantics"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Deduce T separately for the two calls.",
      "A named variable is an lvalue expression even when its declared type is an rvalue reference."
    ]
  },
  {
    "id": "s2-prog-move-from-const",
    "category": "Programming",
    "subcategory": "Modern C++",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In C++20, include utility and iostream. What is printed?\n```cpp\nstruct T {\n  T() = default;\n  T(const T&) { std::cout << \"C\"; }\n  T(T&&) { std::cout << \"M\"; }\n};\nint main() {\n  const T x;\n  T y(std::move(x));\n}\n```",
    "answers": [
      "C",
      "M",
      "CM",
      "Nothing; std::move always elides construction."
    ],
    "correctAnswer": 0,
    "explanation": "std::move(x) has type const T&&. The move constructor requires nonconst T&& and cannot bind; the const-reference copy constructor can bind and prints C. std::move is a cast enabling overload resolution, not a command guaranteeing a resource move.",
    "objectiveIds": [
      "lo-cpp-value-semantics"
    ],
    "knowledgeIds": [
      "prog-value-semantics"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Retain const qualification when forming the rvalue expression."
    ]
  },
  {
    "id": "s2-prog-move-only-function-target",
    "category": "Programming",
    "subcategory": "Modern C++",
    "difficulty": "hard",
    "questionType": "implication",
    "prompt": "In C++20 using GCC/libstdc++ 16, include memory and functional. What is the status of this code inside main?\n```cpp\nauto f = [p = std::make_unique<int>(3)] { return *p; };\nstd::function<int()> g = std::move(f);\n```",
    "answers": [
      "Compilation fails because lambdas cannot capture unique_ptr by move.",
      "Compilation fails: std::function requires a copy-constructible target, even when initialised from an rvalue.",
      "It compiles because moving f removes the target’s copyability requirement.",
      "It compiles but invoking g has undefined behaviour because p is destroyed immediately."
    ],
    "correctAnswer": 1,
    "explanation": "The init-capture owns a unique_ptr, so the closure is movable but not copyable. C++20 std::function requires a copy-constructible target type; moving it into the wrapper does not waive that requirement. The lambda capture itself is valid and would keep its resource alive in a suitable move-only holder.",
    "objectiveIds": [
      "lo-programming-modern-c",
      "lo-cpp-value-semantics"
    ],
    "knowledgeIds": [
      "prog-value-semantics",
      "prog-raii"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Check the closure’s copyability, then the wrapper’s target requirements."
    ]
  },
  {
    "id": "s2-prog-context-suppression",
    "category": "Programming",
    "subcategory": "Python fundamentals",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3, what is printed?\n```python\nclass Guard:\n    def __enter__(self):\n        return [1]\n    def __exit__(self, kind, value, traceback):\n        print(kind.__name__)\n        return True\n\nwith Guard() as xs:\n    xs.append(2)\n    raise ValueError(\"stop\")\nprint(xs)\n```",
    "answers": [
      "Only ValueError, then the exception propagates.",
      "None\n[1, 2]",
      "ValueError\n[1, 2]",
      "ValueError\n[1]"
    ],
    "correctAnswer": 2,
    "explanation": "The with binding receives the list returned by __enter__, which is mutated before the raise. __exit__ receives the exception type and returns a truthy value, suppressing that exception. Execution resumes after the with block, printing the retained list. Suppression does not undo mutations.",
    "objectiveIds": [
      "lo-programming-python-fundamentals"
    ],
    "knowledgeIds": [
      "prog-python-context-copy"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Track both the bound object and the exception-suppression return value."
    ]
  },
  {
    "id": "s2-prog-generator-live-list",
    "category": "Programming",
    "subcategory": "Python fundamentals",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3, what is printed?\n```python\nxs = [1, 2, 3]\ng = (x * x for x in xs)\nxs[1] = 4\nprint(next(g))\nxs.append(5)\nprint(list(g))\n```",
    "answers": [
      "1\n[4, 9]",
      "1\n[16, 9]",
      "1\n[1, 16, 9, 25]",
      "1\n[16, 9, 25]"
    ],
    "correctAnswer": 3,
    "explanation": "The generator evaluates values lazily while its list iterator advances by index through the underlying list. It first sees 1; the changed second element is 4 and the appended fourth element is reached later. The already yielded first item is not repeated. This is single-threaded list iteration, not a snapshot or dict-size mutation rule.",
    "objectiveIds": [
      "lo-programming-python-fundamentals"
    ],
    "knowledgeIds": [
      "prog-python-binding",
      "prog-python-context-copy"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Distinguish generator creation from evaluation of each element."
    ]
  },
  {
    "id": "s2-prog-deepcopy-alias-graph",
    "category": "Programming",
    "subcategory": "Python data structures",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3, what is printed?\n```python\nfrom copy import deepcopy\na = []\nxs = [a, a]\nys = deepcopy(xs)\nys[0].append(1)\nprint(xs, ys, ys[0] is ys[1])\n```",
    "answers": [
      "[[], []] [[1], [1]] True",
      "[[1], [1]] [[1], [1]] True",
      "[[], []] [[1], []] False",
      "[[], []] [[1], [1]] False"
    ],
    "correctAnswer": 0,
    "explanation": "Deepcopy creates a new inner list distinct from a, so xs is unchanged. Its memo preserves the repeated-reference relationship within the copied graph: both ys positions refer to the same new inner list. Deep copying separates the graphs without necessarily eliminating aliasing inside either graph.",
    "objectiveIds": [
      "lo-programming-python-data-structures"
    ],
    "knowledgeIds": [
      "prog-python-context-copy"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Draw the original alias graph, then copy objects while retaining repeated references."
    ]
  },
  {
    "id": "s2-prog-tuple-key-hashability",
    "category": "Programming",
    "subcategory": "Python data structures",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In Python 3, what happens?\n```python\nkey = ([1, 2], 3)\nd = {key: \"value\"}\nprint(len(d))\n```",
    "answers": [
      "SyntaxError occurs because tuples cannot contain lists.",
      "TypeError occurs while constructing d because the tuple contains an unhashable list.",
      "It prints 1 because every tuple is hashable.",
      "It prints 2 because each tuple member is a key."
    ],
    "correctAnswer": 1,
    "explanation": "A tuple can contain a mutable list, but hashing the tuple requires hashing every member. A list is unhashable, so dict construction raises TypeError before print. Tuple immutability does not guarantee hashability of its contents.",
    "objectiveIds": [
      "lo-programming-python-data-structures"
    ],
    "knowledgeIds": [
      "prog-python-context-copy",
      "prog-python-binding"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Separate the legality of a tuple value from its suitability as a dictionary key."
    ]
  },
  {
    "id": "s2-prog-numpy-copy-versus-view",
    "category": "Programming",
    "subcategory": "NumPy and scientific Python",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3 with NumPy, what is printed?\n```python\nimport numpy as np\na = np.arange(4)\nb = a[[1, 2]]\nc = a[1:3]\nb[0] = 99\nc[1] = 7\nprint(a.tolist(), b.tolist())\n```",
    "answers": [
      "[0, 1, 2, 3] [99, 2]",
      "[0, 99, 2, 3] [99, 2]",
      "[0, 1, 7, 3] [99, 2]",
      "[0, 99, 7, 3] [99, 7]"
    ],
    "correctAnswer": 2,
    "explanation": "Integer-array advanced indexing creates a copy b; basic slicing creates a view c. Mutating b leaves a alone, whereas c[1] modifies a[2]. The copied second b element stays 2 even after the corresponding original element changes.",
    "objectiveIds": [
      "lo-programming-numpy-and-scientific-python"
    ],
    "knowledgeIds": [
      "prog-numpy-indexing",
      "prog-numpy-broadcasting"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Classify each indexing operation before tracing either assignment."
    ]
  },
  {
    "id": "s2-prog-numpy-repeated-index",
    "category": "Programming",
    "subcategory": "NumPy and scientific Python",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3 with NumPy, what is printed?\n```python\nimport numpy as np\na = np.zeros(2, dtype=int)\nb = a.copy()\na[[0, 0]] += 1\nnp.add.at(b, [0, 0], 1)\nprint(a.tolist(), b.tolist())\n```",
    "answers": [
      "[2, 0] [2, 0]",
      "[1, 0] [1, 0]",
      "[2, 0] [1, 0]",
      "[1, 0] [2, 0]"
    ],
    "correctAnswer": 3,
    "explanation": "Advanced indexed += gathers values into a temporary, increments them and writes back, so repeated index zero receives a value of one. add.at is unbuffered and applies both updates at that location, producing two. Repeated indices must not be assumed to accumulate with ordinary advanced assignment.",
    "objectiveIds": [
      "lo-programming-numpy-and-scientific-python"
    ],
    "knowledgeIds": [
      "prog-numpy-indexing"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Compare buffered advanced assignment with unbuffered indexed accumulation."
    ]
  },
  {
    "id": "s2-prog-numpy-reduction-shape",
    "category": "Programming",
    "subcategory": "NumPy and scientific Python",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3 with NumPy, what is printed?\n```python\nimport numpy as np\na = np.ones((2, 3, 4))\nm = a.mean(axis=(0, 2), keepdims=True)\nprint(m.shape, (a - m).shape)\n```",
    "answers": [
      "(1, 3, 1) (2, 3, 4)",
      "(3,) (2, 3, 4)",
      "(1, 1, 4) (2, 3, 4)",
      "(2, 1, 4) (2, 3, 4)"
    ],
    "correctAnswer": 0,
    "explanation": "Reducing axes zero and two leaves their lengths at one because keepdims is true. Axis one retains length three. Broadcasting the resulting (1,3,1) array against a restores (2,3,4), with no cross-sample pairwise expansion.",
    "objectiveIds": [
      "lo-programming-numpy-and-scientific-python"
    ],
    "knowledgeIds": [
      "prog-numpy-broadcasting",
      "prog-numpy-indexing"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Keep reduced axes as singleton dimensions, then align the shapes."
    ]
  },
  {
    "id": "s2-prog-geometric-loop-work",
    "category": "Programming",
    "subcategory": "Algorithms and complexity",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3, n is a positive integer. Each pass call takes constant time. What is the tight asymptotic runtime, treating integer indexing/arithmetic as unit-cost?\n```python\ni = n\nwhile i > 0:\n    for j in range(i):\n        pass\n    i //= 2\n```",
    "answers": [
      "Θ(n²)",
      "Θ(n)",
      "Θ(n log n)",
      "Θ(log n)"
    ],
    "correctAnswer": 1,
    "explanation": "The inner-work total is n+floor(n/2)+floor(n/4)+..., at least n and below 2n. The outer loop has logarithmically many iterations but its inner sizes shrink; multiplying the largest inner size by the number of outer iterations overcounts.",
    "objectiveIds": [
      "lo-programming-algorithms-and-complexity"
    ],
    "knowledgeIds": [
      "prog-big-o"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Sum the inner-loop sizes rather than multiplying two independent maxima."
    ]
  },
  {
    "id": "s2-prog-heap-merge-bound",
    "category": "Programming",
    "subcategory": "Algorithms and complexity",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "A comparison-based merge uses a binary min-heap holding one current item from each of k nonempty sorted streams, with 2≤k≤N total items. It builds the heap once, then extracts and replaces stream heads. Which offered bound is the tightest worst-case upper bound?",
    "answers": [
      "O(k log N)",
      "O(N+k)",
      "O(N log k)",
      "O(Nk)"
    ],
    "correctAnswer": 2,
    "explanation": "The heap has at most k items, so each of N extraction/replacement stages costs O(log k), plus O(k) heap construction. O(k log N) omits processing all N items, and O(N+k) does not generally account for comparisons across k streams. Balanced streams give the logarithmic heap-maintenance worst case.",
    "objectiveIds": [
      "lo-programming-algorithms-and-complexity"
    ],
    "knowledgeIds": [
      "prog-big-o",
      "prog-container-operations"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Bound heap size independently of the total number of items."
    ]
  },
  {
    "id": "s2-prog-reserve-not-size",
    "category": "Programming",
    "subcategory": "Debugging and code analysis",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In C++20, include vector. What is the status of the final statement inside main?\n```cpp\nstd::vector<int> v;\nv.reserve(3);\nv[0] = 7;\n```",
    "answers": [
      "Defined: reserve constructs three int elements.",
      "Compilation fails because vector has no subscript operator.",
      "Defined: v grows automatically to fit index zero.",
      "Undefined behaviour: reserve changes capacity but v still has size zero."
    ],
    "correctAnswer": 3,
    "explanation": "reserve allocates capacity without creating elements or changing size. operator[] requires an index below size, which is still zero. Allocated bytes do not establish live vector elements. resize(3) or push_back(7) would establish a valid element; compilation alone does not prove a valid access.",
    "objectiveIds": [
      "lo-programming-debugging-and-code-analysis"
    ],
    "knowledgeIds": [
      "prog-stl-invalidation",
      "prog-container-operations"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Check size, not merely capacity, at the subscript."
    ]
  },
  {
    "id": "s2-prog-filter-preserve-alias",
    "category": "Programming",
    "subcategory": "Debugging and code analysis",
    "difficulty": "medium",
    "questionType": "implication",
    "prompt": "In Python 3, xs = [0, 2, 0, 3], and other code holds aliases to xs. Which statement removes every zero while preserving the same list object and all nonzero items in order?",
    "answers": [
      "xs[:] = [x for x in xs if x != 0]",
      "xs = [x for x in xs if x != 0]",
      "xs.remove(0)",
      "xs.clear()"
    ],
    "correctAnswer": 0,
    "explanation": "Slice assignment mutates the original list in place using a separately constructed result, preserving external aliases and relative order. Rebinding xs leaves aliases pointing to the unfiltered list. remove deletes only one zero, while clear removes nonzero items too.",
    "objectiveIds": [
      "lo-programming-debugging-and-code-analysis"
    ],
    "knowledgeIds": [
      "prog-python-binding",
      "prog-python-context-copy"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Separate changing the binding from changing the existing object."
    ]
  },
  {
    "id": "s2-prog-parallel-centred-moments",
    "category": "Programming",
    "subcategory": "Numerical and quantitative programming",
    "difficulty": "hard",
    "questionType": "implication",
    "prompt": "Two disjoint data blocks have counts n_A,n_B>0, means m_A,m_B and centred squared sums M2_A,M2_B. In exact arithmetic, which formula correctly merges the squared sums about the combined mean? Put δ=m_B−m_A.",
    "answers": [
      "$M2_A+M2_B-\\delta^2n_An_B/(n_A+n_B)$",
      "$M2_A+M2_B+\\delta^2n_An_B/(n_A+n_B)$",
      "$M2_A+M2_B$",
      "$M2_A+M2_B+\\delta n_An_B/(n_A+n_B)$"
    ],
    "correctAnswer": 1,
    "explanation": "For each block expand x−m=(x−m_block)+(m_block−m). The cross sum vanishes because centred deviations sum to zero. The two mean-offset terms combine into δ²n_A n_B/(n_A+n_B). Adding only the within-block M2 values discards between-block variation; the correction is quadratic and nonnegative.",
    "objectiveIds": [
      "lo-programming-numerical-and-quantitative-programming",
      "lo-variance-sum"
    ],
    "knowledgeIds": [
      "prog-parallel-moments",
      "prog-numerical-stability"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Write deviations from the combined mean as within-block deviations plus a block-mean offset.",
      "The within-block centred deviations sum to zero."
    ]
  },
  {
    "id": "s2-prog-logsumexp-stable",
    "category": "Programming",
    "subcategory": "Numerical and quantitative programming",
    "difficulty": "medium",
    "questionType": "short_calculation",
    "prompt": "In Python 3 with ordinary IEEE-754 binary64 floats, which expression avoids overflow while calculating log(exp(1000)+exp(1001))? Assume math is imported.",
    "answers": [
      "math.log1p(1000 + 1001)",
      "1001 + math.exp(-1)",
      "1001 + math.log1p(math.exp(-1))",
      "math.log(math.exp(1000) + math.exp(1001))"
    ],
    "correctAnswer": 2,
    "explanation": "Factor out exp(1001) analytically, giving 1001+log(1+exp(−1)). log1p evaluates the final term without forming either enormous exponential. The value is about 1001.313262; omitting the logarithm or taking the log of the input sum changes the mathematical quantity.",
    "objectiveIds": [
      "lo-programming-numerical-and-quantitative-programming"
    ],
    "knowledgeIds": [
      "result-logsumexp",
      "prog-numerical-stability"
    ],
    "tags": [
      "stage-2",
      "application"
    ],
    "hints": [
      "Subtract the largest exponent before forming any exponentials."
    ]
  }
] satisfies MultipleChoiceQuestion[];
