# Programming and Machine Learning — Stage 1 review

11 October 2026. Added **25 Programming + 25 Machine Learning questions**. The combined bank is **330 questions across eight categories and 89 populated category/subsection pairs**. A deep comparison against a pre-change serialised snapshot verified that all 280 existing question records and all 100 existing reference records are unchanged, including IDs, answers, explanations and links. Finance remains 100.

## Question inventory

Programming uses Python 3 and C++20, with explicit version and execution assumptions. There are output predictions, compilation/runtime failures, lifetime and overflow reasoning, bug identification, complexity and numerical algorithms; none is a definition-recall question.

| Programming subsection | Total | Easy | Medium | Hard | Objectives |
| --- | ---: | ---: | ---: | ---: | --- |
| C++ fundamentals | 3 | 2 | 1 | 0 | Reference alias, integer division, const binding |
| C++ STL and algorithms | 3 | 1 | 1 | 1 | Hash lookup, sort/unique/erase, vector invalidation |
| C++ object-oriented programming and memory | 3 | 1 | 1 | 1 | Virtual dispatch, unique_ptr copy rejection, dangling reference |
| Modern C++ | 2 | 0 | 1 | 1 | Mutable by-copy lambda, span lifetime |
| Python fundamentals | 3 | 1 | 1 | 1 | Generator exhaustion, mutable default, closure late binding |
| Python data structures | 2 | 1 | 1 | 0 | Nested mutability in a tuple, shallow copy |
| NumPy and scientific Python | 3 | 1 | 1 | 1 | Broadcasting, slice view, pairwise materialisation |
| Algorithms and complexity | 2 | 1 | 1 | 0 | Binary search, amortised append |
| Debugging and code analysis | 2 | 0 | 1 | 1 | Off-by-one IndexError, signed overflow |
| Numerical and quantitative programming | 2 | 0 | 1 | 1 | Stable summation, Welford variance update |
| **Total** | **25** | **8** | **10** | **7** | |

ML combines calculations, model/validation reasoning and practical errors. The applied subsection has four questions; additional leakage, learning-curve, tensor and RL reasoning appears in other subsections.

| Machine Learning subsection | Total | Easy | Medium | Hard | Objectives |
| --- | ---: | ---: | ---: | ---: | --- |
| Machine learning foundations | 2 | 1 | 1 | 0 | Learning curves, fold-local preprocessing |
| Supervised learning | 2 | 1 | 1 | 0 | Logistic probability, correlated ensemble variance |
| Unsupervised learning | 2 | 1 | 1 | 0 | K-means assignment, PCA subspace |
| Optimisation and training | 3 | 1 | 1 | 1 | Gradient step, specified momentum, quadratic stability |
| Neural networks and deep learning | 2 | 0 | 1 | 1 | Backpropagation chain rule, causal attention mask |
| Reinforcement learning | 3 | 1 | 1 | 1 | Bellman backup, Q-learning update, SARSA target |
| Probabilistic and Bayesian machine learning | 2 | 0 | 1 | 1 | Gaussian MAP penalty, ELBO/KL identity |
| Time series and sequential machine learning | 2 | 0 | 1 | 1 | Walk-forward validation, overlapping labels |
| Evaluation and generalisation | 3 | 2 | 1 | 0 | Imbalance, untouched test set, precision/recall |
| Applied machine learning and implementation | 4 | 1 | 2 | 1 | eval/no_grad, missing gradient reset, loss broadcasting, terminal mask |
| **Total** | **25** | **8** | **11** | **6** | |

Every addition has a self-contained explanation and at least one validated reference link. Each prompt, all four distractors and the explanation were reviewed together for one defensible correct answer under the stated assumptions. Difficulty labels are editorial judgements, not calibrated qualifications; implementation pitfalls and RL target distinctions need learner calibration. These 25-question introductions do not cover the full requested syllabus. Future objectives and exact stage budgets are in [CURRICULUM_EXPANSION.md](../../../../CURRICULUM_EXPANSION.md).

## Reference additions

Added **22 authored summaries**, using the existing `key_result` type and schema. Total references: **122**; linked questions: **188**; unlinked questions: **142** (unchanged: 42 mathematics and 100 Finance). Reused `result-bias-variance` instead of duplicating that concept. Cross-category links reuse broadcasting for ML tensor bugs.

| File | Stable IDs and concepts |
| --- | --- |
| `src/data/knowledge/programming.ts` (10) | `prog-ref-binding` references/pointers/const; `prog-arithmetic-semantics` division/overflow; `prog-stl-invalidation` logical ranges/invalidation; `prog-virtual-dispatch` dispatch/slicing; `prog-raii` ownership/views; `prog-lambda-capture` capture semantics; `prog-python-binding` bindings/mutability/consumption; `prog-numpy-broadcasting` views/shapes; `prog-big-o` complexity models; `prog-numerical-stability` summation/variance |
| `src/data/knowledge/machine-learning.ts` (12) | `ml-validation-leakage` selection boundaries; `ml-cross-entropy` logits/loss; `ml-ensemble-variance` correlation; `ml-kmeans` assignments; `ml-pca` subspaces; `ml-gradient-descent` steps/stability; `ml-backpropagation` derivatives/accumulation; `ml-bellman` backups; `ml-variational-inference` MAP/ELBO; `ml-causal-validation` information timing/masking; `ml-classification-metrics` ratios; `ml-validation-loop` module/autograd modes/targets |

These references summarise prerequisites and key results; a broad reference does not independently prove every linked implementation detail. They contain assumptions, version boundaries and related concepts rather than copied source passages.

## Verification evidence

- `npm test`: all 12 test files passed. Running the same suite with `--test-isolation=none` exposed all **52 individual passing cases**, including five Stage 1 cases and the existing 47.
- `npm run validate:bank`: 330 questions, 122 references, 188 linked questions; strict schema, unique IDs/prompts, taxonomy, four choices and reference graph passed.
- `npm run audit:bank`: no answer-length flags; canonical answer positions 78/91/88/73; 54 correct options uniquely longest. This heuristic does not certify semantic correctness.
- `npm run build`: runtime validation, TypeScript and Vite/PWA build passed. Existing chunk warning persists: main JS about 836 kB / 245 kB gzip; no dependencies or deployment settings changed.
- `npm run test:code`: executed seven Python/NumPy output snippets and the expected IndexError. Compiled and executed five C++20 examples, verified two required compile failures, and syntax-checked three lifetime/overflow examples without executing undefined behaviour. Independently checked pairwise shape, stable sum, Welford sample variance and equivalent NumPy loss pairing. Runs only reviewed ID allowlists with bounded subprocess time/output in temporary directories.
- ML scalar options checked independently for logistic probability, ensemble variance, gradient/momentum, backpropagation, Bellman/Q updates, metrics and stability; finite differences verify the chain derivative. Tensor pairing checked with NumPy. MAP and ELBO assumptions reviewed algebraically.
- Production Chromium: existing entire-bank, setup, feedback, Finance, reference and PWA regressions passed. All 330 prompts/answers rendered at 320px/390px without page overflow or KaTeX errors, and every submitted explanation checked at 320px. All 122 references checked at both widths. Offline restart/update/attempt retention passed.
- Stage 1 browser regression: 60 topic/difficulty combinations, all 50 additions and literal code at 320px/390px, all grading outcomes, review/unseen modes, legacy records, stable reference return, reload, offline code/references and reset. Both selection and submitted feedback checked at both widths.

Browser checks use an isolated local production preview and system Chromium with `PWA_CHROMIUM=/usr/bin/chromium PWA_NO_SANDBOX=1`. They do not use the live site or user profiles. PyTorch is not installed here: its three illustrative snippets and mode distinction were checked against official documentation, not executed as PyTorch. No new hosted-site or iPhone/Safari verification was performed. No standalone lint script is configured.

## Primary-source spot checks

| Material | Source consulted |
| --- | --- |
| Python defaults, closures and iterator behaviour | [Python tutorial: control flow](https://docs.python.org/3/tutorial/controlflow.html) |
| NumPy shapes and view/copy distinctions | [NumPy broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html), [copies and views](https://numpy.org/doc/stable/user/basics.copies.html) |
| C++ lambda capture, vector invalidation and unique ownership | [C++ draft lambda capture](https://eel.is/c++draft/expr.prim.lambda.capture), [vector modifiers](https://eel.is/c++draft/vector.modifiers), [unique_ptr constructors](https://eel.is/c++draft/unique.ptr.single.ctor); examples additionally compiled with C++20 |
| Leakage and PCA | [scikit-learn common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html), [PCA documentation](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html) |
| PyTorch gradients, module mode and logits | [Autograd tutorial](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html), [Module.eval, PyTorch 2.9](https://docs.pytorch.org/docs/2.9/generated/torch.nn.Module.html), [CrossEntropyLoss, PyTorch 2.9](https://docs.pytorch.org/docs/2.9/generated/torch.nn.CrossEntropyLoss.html) |
| RL detached/terminal targets | [PyTorch DQN tutorial](https://docs.pytorch.org/tutorials/intermediate/reinforcement_q_learning.html) |
| ELBO identity and causal attention | [Blei et al., Variational Inference](https://arxiv.org/abs/1601.00670), [Vaswani et al., Attention Is All You Need](https://arxiv.org/abs/1706.03762) |

Source spot checks and finite examples are author verification, not independent peer review or proofs of general algorithms. C++ draft pages evolve; only the tested C++20 rules used here are claimed.

## Modified areas

`src/data/curriculum.ts`; the two new question modules and their central import; two new reference modules and their central import; shared `MathText.tsx`/`textSegments.ts` plus the code-block CSS rule; editorial code-fence handling; count assertions and Stage 1 unit tests; `scripts/verify-code.ts`, `scripts/verify-stage1.mjs`, dynamic reference report and package scripts; authoring/overview/mapping documentation; balanced roadmap; root status and archived Update 002.

Line-delimited fenced code renders as React-escaped literal text with preserved indentation and horizontal scrolling inside the block. Prose retains existing KaTeX behaviour. No syntax-highlighter dependency, HTML execution, practice mode, storage migration, schema field or app navigation redesign was introduced. No commit, push or deployment occurred.
