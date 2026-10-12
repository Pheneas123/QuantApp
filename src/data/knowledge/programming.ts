import type { KnowledgeObject } from './schema';

export default [
  {
    "id": "prog-ref-binding",
    "name": "C++ references, pointers and const binding",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "C++ fundamentals",
    "statement": "A reference aliases its bound object and assignment through it changes that object; it cannot be reseated by assignment. A pointer stores an address and can be reassigned. A mutable int& cannot bind directly to const int; const int& can.",
    "assumptions": "C++20. References and pointers do not themselves extend an ordinary local object’s lifetime when returned from a function.",
    "intuition": "A name that refers to storage is different from owning that storage. Check const qualification and lifetime separately."
  },
  {
    "id": "prog-arithmetic-semantics",
    "name": "C++ integer arithmetic and overflow",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "C++ fundamentals",
    "statement": "With integer operands, division discards the fractional part, truncating towards zero. A later conversion to double cannot restore it. Signed overflow is undefined behaviour; unsigned arithmetic is modular.",
    "assumptions": "C++20 built-in arithmetic. Division by zero and signed minimum divided by −1 also require care.",
    "intuition": "Choose the operand types before the arithmetic and do not infer a signed guarantee from observed machine wraparound."
  },
  {
    "id": "prog-stl-invalidation",
    "name": "STL logical ranges and iterator invalidation",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "C++ STL and algorithms",
    "statement": "std::unique compacts consecutive equal elements and returns a logical end without resizing the container; sorting first groups equal values. For vector, reallocation invalidates all element pointers/references/iterators. Erase invalidates those at or after the erased position.",
    "assumptions": "C++20 and ordinary element equality. Use vector.erase(new_end, end) to remove the compacted tail.",
    "intuition": "An element index, a live pointer and the container’s physical size are different notions."
  },
  {
    "id": "prog-virtual-dispatch",
    "name": "C++ virtual dispatch and slicing",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "statement": "An overridden virtual member called through a live base reference or pointer dispatches according to the dynamic object type. Copying a derived object into a base value can slice away its derived part.",
    "assumptions": "C++20, outside construction/destruction-specific dispatch rules. Safe deletion through a base pointer ordinarily requires a virtual base destructor.",
    "relatedKnowledgeIds": [
      "prog-raii"
    ]
  },
  {
    "id": "prog-raii",
    "name": "RAII, exclusive ownership and non-owning views",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "C++ object-oriented programming and memory",
    "statement": "RAII ties resource release to an owning object’s destruction, including normal scope exit and exception unwinding. unique_ptr owns exclusively, cannot be copied and transfers ownership by moving. span is a non-owning pointer/length view and does not keep the viewed allocation alive.",
    "assumptions": "C++20; unique_ptr uses an appropriate deleter. Moving a unique_ptr leaves the source empty. A moved-from vector has different, generally unspecified contents.",
    "intuition": "Check who owns the resource and whether every alias remains within the owner’s lifetime.",
    "relatedKnowledgeIds": [
      "prog-ref-binding"
    ]
  },
  {
    "id": "prog-lambda-capture",
    "name": "C++ lambda captures and mutable closures",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "Modern C++",
    "statement": "A by-copy capture stores a separate value in the closure. mutable permits modifying that captured value through the lambda call operator. A by-reference capture refers to the original object and requires that object to outlive each use.",
    "assumptions": "C++20. Capturing a pointer by value copies its address, not ownership of the pointed-to object.",
    "relatedKnowledgeIds": [
      "prog-raii"
    ]
  },
  {
    "id": "prog-python-binding",
    "name": "Python bindings, mutability and iterator consumption",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "Python fundamentals",
    "statement": "Python names bind to objects. Shallow container copies share their element objects; tuple immutability does not recursively freeze a referenced list. Function defaults are evaluated at definition, and closures read captured bindings at call time. Consuming a generator advances its iterator state.",
    "assumptions": "Python 3. A lambda default argument can snapshot an iteration value; use a fresh per-call object when shared mutable defaults are unintended.",
    "intuition": "Track object identity separately from outer containers or variable names."
  },
  {
    "id": "prog-numpy-broadcasting",
    "name": "Array broadcasting, views and materialisation",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "NumPy and scientific Python",
    "statement": "Broadcast dimensions are compared from the right and must be equal or one; absent leading dimensions act as one. Basic NumPy slicing ordinarily creates a view. Elementwise arithmetic may materialise a large output even when the inputs are views.",
    "assumptions": "Ordinary NumPy arrays. PyTorch elementwise tensor broadcasting follows the same trailing-dimension rule. Advanced indexing has different copy behaviour.",
    "intuition": "Work out the result shape before executing: (B,1) minus (B,) yields (B,B), not B paired residuals."
  },
  {
    "id": "prog-big-o",
    "name": "Worst-case, average and amortised complexity",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "Algorithms and complexity",
    "statement": "Big-O bounds resource growth as input size increases. Binary search on a sorted random-access array takes $O(\\log n)$ comparisons. Hash lookup is average $O(1)$ and worst-case $O(n)$ under constant-cost key operations. Geometric capacity growth gives $O(n)$ total work for n dynamic-array appends.",
    "assumptions": "Element access/moves and key operations have the stated constant cost. Allocation failures are excluded from the amortised example.",
    "intuition": "Average cost across a probabilistic model and amortised cost over an operation sequence are different from a worst-case bound for one call."
  },
  {
    "id": "prog-numerical-stability",
    "name": "Stable summation and online centred variance",
    "type": "key_result",
    "category": "Programming",
    "subcategory": "Numerical and quantitative programming",
    "statement": "Finite-precision cancellation can erase small contributions. Python math.fsum tracks partial sums to improve accumulation. Welford updates, after incrementing n, are $\\delta=x-\\mu_{old}$, $\\mu_{new}=\\mu_{old}+\\delta/n$, and $M_{2,new}=M_{2,old}+\\delta(x-\\mu_{new})$.",
    "assumptions": "Start n=0, mean=0 and M2=0. Population variance is M2/n for n>0; sample variance is M2/(n−1) for n>1. Floating-point arithmetic can still round.",
    "intuition": "Centred updates avoid subtracting large, nearly equal raw second moments."
  }
] satisfies KnowledgeObject[];
