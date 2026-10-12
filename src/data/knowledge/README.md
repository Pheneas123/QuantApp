Current Stage 2: **170 entries**, with all original 132 retained and 38 directly supporting additions in `stage2.ts`; **313 Quick Practice questions linked / 137 unlinked**. All 120 additions have support. [Stage 2 review](../../../docs/STAGE_2_REVIEW.md) records names, assumptions and checks. The snapshots below describe earlier releases.

Current platform update: **132 entries**, including ten rigorous supporting results in `remediation.ts`; **193 Quick Practice questions linked / 137 unlinked**. Eleven audit gaps now have direct support (the existing continuous-mapping result is reused). See [the remediation report](../../../docs/AUDIT_REMEDIATION.md). Historical development notes below retain their original scope.

# Study reference

The four original content files plus `batch-a.ts` and `batch-b.ts` contain 100 original mathematical summaries. Stage 1 adds 10 Programming summaries in `programming.ts` and 12 Machine Learning summaries in `machine-learning.ts`, for 122 assembled and validated by `index.ts`. This static data is independent of multiple-choice answers, sessions and attempt storage. It is bundled and precached with the app; reading a reference does not record an attempt or affect progress.

`KnowledgeObject` in `schema.ts` requires `id`, `name`, `type`, `category`, `subcategory` and `statement`. Optional fields are `assumptions`, `conclusion`, `intuition`, `notation`, `relatedKnowledgeIds` and `tags`. Types are `definition`, `theorem`, `lemma`, `proposition`, `corollary` and `key_result`. There is no difficulty or academic-level field. Taxonomy membership comes from the shared curriculum, so extending that taxonomy serves both reference and question data.

Keep IDs stable. Omit unused optional text fields; do not store empty strings. Text supports literal line-delimited fenced code and `$...$`, `$$...$$`, `\(...\)` and `\[...\]` through MathText. Follow [CONTENT_STYLE.md](../../../CONTENT_STYLE.md). Use explicit standard versions, especially for continuous/jump processes, filtration assumptions, stopping theorems and SDE solvability. Related IDs must exist, be distinct and not point to the entry itself; mutual links are allowed.

`npm run validate:bank` validates the reference graph before validating question `knowledgeIds`. `npm test` checks malformed records, links, taxonomy, maths and spelling. `npm run test:reference` exercises the production browse/filter screens and quiz-return flow. `npm run test:pwa` checks offline reference access and data-preserving updates in Chromium. These do not substitute for independent mathematical or real-iPhone review.

## Sources and scope

The entries are concise authored summaries, not copied extracts. Source checks focused on theorem versions and advanced assumptions:

| Material | Reference consulted |
| --- | --- |
| Monotone/dominated convergence and Fatou | [MIT 6.436J, lecture 8](https://ocw.mit.edu/courses/6-436j-fundamentals-of-probability-fall-2018/a8b70283ce951b43d64f419b0857e0a3_MIT6_436JF18_lec08.pdf) |
| Local martingales, quadratic variation, time change, representation | [Alan Bain, Stochastic Calculus](https://www.chiark.greenend.org.uk/~alanb/stoc-calc.pdf), especially the time-change proposition with divergent quadratic variation |
| Novikov and Brownian Girsanov | [EPFL, Stochastic Calculus II notes](https://ipgold.epfl.ch/~leveque/Lecture_Notes/sc2_final.pdf) |
| Strong/weak solutions, Yamada–Watanabe, generators and Feynman–Kac | [Oxford, Etheridge, Stochastic Analysis and PDEs](https://www.stats.ox.ac.uk/~etheridg/pdecdt.pdf) |
| Completeness and Basu | [Berkeley Stat 210A, Completeness](https://stat210a.berkeley.edu/fall-2024/reader/completeness.html) |

The Feynman–Kac entry states representation of a bounded classical solution, not unconditional existence of a smooth solution. Optional stopping states two discrete-time versions. Semimartingales are treated only in the continuous case. Martingale representation uses the Brownian natural filtration. Dambis–Dubins–Schwarz assumes unbounded terminal quadratic variation and specifies the inverse clock and filtration. These boundaries should remain explicit when expanding the reference.

This is an initial reference, not a complete curriculum or a source citation for every existing question. See [MAPPING_REVIEW.md](MAPPING_REVIEW.md) for gaps and review priorities. Future concept-level weakness tracking can reuse the IDs; no adaptive recommendations are implemented.

Batch B adds 28 foundation references; sources, exact scope and remaining gaps are recorded in [BATCH_B_REVIEW.md](../../features/quick-practice/data/BATCH_B_REVIEW.md).

Programming/ML reference IDs, reused concepts, primary-source spot checks and limitations are in [STAGE_1_REVIEW.md](../../features/quick-practice/data/STAGE_1_REVIEW.md). All 50 new questions are linked; the existing bias–variance entry is reused. There are 188 linked questions and 142 unlinked questions. The reference schema and types are unchanged.
