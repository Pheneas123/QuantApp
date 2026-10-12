# QuantPocket — Current Status

**Update 006 · 12 October 2026**

This is the shareable current overview. Previous updates and the maintenance convention are in [docs/status/README.md](docs/status/README.md).

## Project overview

QuantPocket is a mobile-first, local-first study PWA for mathematics, quantitative finance, programming and machine learning: React 19, TypeScript, Vite 6, KaTeX and vite-plugin-pwa. It retains its restrained dark interface, British English, existing cards/navigation and React-state navigation. Tablet panels are wider; Written editing/preview uses two columns where space permits. No backend, account, AI grading or cloud synchronisation exists.

GitHub Pages is configured for **https://pheneas123.github.io/QuantApp/** in the requested public `Pheneas123/QuantApp` repository. Local verification is complete; repository creation, push and live publication verification are pending. The former Netlify origin is retained only for users to export old progress. Storage does not cross origins automatically; see [DEPLOYMENT.md](DEPLOYMENT.md).

## Latest update — 006: GitHub Pages and shared home navigation

- Replaced Netlify hosting configuration with [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml): tests and validated/type-checked Vite build, official Pages artifact/deployment Actions, least-required job permissions and a sequential deployment group on `main` pushes/manual dispatch.
- GitHub's Pages metadata supplies the deployed base path. Assets, install icons, manifest ID/start/scope, worker registration and offline shell work at both `/` and `/QuantApp/`. Removed `netlify.toml`, `public/_headers` and `public/_redirects`; no new dependencies or router.
- Fixed the root cause of the logo navigation issue: the old handler changed Quick's screen without changing Guided/Written mode. A shared root home action now exits all active modes; the native labelled brand button retains its layout and supports Enter/Space. Saved Guided responses and Written drafts survive unmount, resume and reload.
- Preserved all 51 content/taxonomy files byte-for-byte, all 450 MCQs, 170 References, 102 objectives, six Guided/six Written problems, storage keys, flags and scheduling policy. No mathematical content or styles were changed.
- Passed 79 unit cases, both production builds, asset validation, root/subpath all-mode navigation tests, and existing setup, feedback, learning and PWA regressions. Tests cover strict static serving without rewrites, keyboard/icon/text home activation, saved namespaces, offline worker scope, browser restart and updates.
- Updated the README without emojis and replaced deployment documentation with GitHub setup/publishing, URL/base handling and old-origin backup transfer. Archived [Update 005](docs/status/archive/0005-2026-10-11.md). Publishing is explicitly authorised for the new public repository; no existing remote content will be overwritten.

## Content and coverage

| Category | Quick | Easy | Medium | Hard | Guided | Written | Objectives |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Probability | 50 | 16 | 31 | 3 | 1 | 0 | 14 |
| Statistics | 50 | 15 | 31 | 4 | 0 | 1 | 10 |
| Measure Theory | 50 | 20 | 24 | 6 | 0 | 1 | 9 |
| Stochastic Processes | 50 | 18 | 25 | 7 | 0 | 0 | 12 |
| Stochastic Calculus | 50 | 11 | 28 | 11 | 2 | 1 | 19 |
| Finance | 100 | 37 | 51 | 12 | 1 | 1 | 10 |
| Programming | 50 | 9 | 37 | 4 | 1 | 1 | 12 |
| Machine Learning | 50 | 9 | 39 | 2 | 1 | 1 | 16 |
| **Total** | **450** | **135** | **266** | **49** | **6** | **6** | **102** |

Guided contains **23 parts**, excluded from Quick totals. Reference contains **170 entries**, with **313 linked / 137 unlinked Quick questions**. The same eight categories and 89 populated category/subsection pairs remain. Finance receives no content changes.

All 450 MCQs and all 12 Guided/Written problems have reviewed objective mappings; no item is unmapped and no registered objective lacks content. **Six objectives remain recognition-only** under the conservative type heuristic: general process definitions, birth–death processes, strong/weak solutions, existence/uniqueness, Kolmogorov equations and martingale problems. Some objectives combine related skills; mapping is not complete assessment of every component. **29 prerequisite edges** affect **20 objectives**; **78 objectives have References**. Cycles, self-links, unknown IDs and invalid taxonomy are rejected. [Coverage Markdown/JSON](docs/LEARNING_COVERAGE.md) reports modes, subsections, objectives, References, prerequisites, weak signals and families.

## Current study behaviour

Quick Practice retains category/topic/difficulty, Practice / Review Incorrect / Review Unsure / Unseen Only, 10/25/50/all sizes, one-time sampling/shuffling, Submit / Not sure, locked feedback, next/summary, existing progress/history/reset and Reference return. New Flagged and Due for Review filters are independent additions. 118 Stage 2 MCQs plus one original demonstration have hints; zero-hint compatibility is preserved.

Guided keeps the overarching statement visible while advancing sequentially. Learning reveals each submitted explanation; Assessment reveals feedback only after final completion. Past submissions can be reviewed but not changed. Each problem is one attempt with part-level correctness, hints and overall performance. Interrupted and completed states survive reload; retry creates a separate attempt.

Written supports ordinary text, inline/block maths and fenced code. Drafts save as typed; nonempty work is required before explicit solution reveal. Correct / Partially Correct / Incorrect / Not Sure are self-reported, never automatic grades. Completed answers remain in history and a fresh answer is a separate draft/attempt.

All modes share the taxonomy, renderer, flags, hints, prerequisites, Reference tools and keyboard layer. Python/C++/JavaScript/TypeScript use four local highlight.js grammars; unknown languages remain literal. Code is escaped, indentation preserved and long lines scroll locally. Shortcut help covers 1–4/A–D, Enter, N, H, F, Quick U, ? and Esc; editing/composition/modifiers/repeats/dialogs are guarded. Objective evidence separates assessed success, unique items, hints and written self-report; fewer than three assessed attempts across two items remains insufficient evidence, with no mastery claim.

## Persistence and review rules

Legacy **quant-pocket.attempts.v1** retains its unchanged array and boolean/result compatibility. No historic attempt is regraded or migrated into scheduling. Six new namespaces use validated version-1 envelopes:

| Key | Purpose |
| --- | --- |
| quant-pocket.guided-attempts.v1 | Guided attempts and part evidence |
| quant-pocket.written-attempts.v1 | Written answers/self-assessments |
| quant-pocket.written-drafts.v1 | Current drafts/reveal/hint state |
| quant-pocket.flags.v1 | Mode-qualified flags |
| quant-pocket.review-schedules.v1 | Item schedules and immutable review events |
| quant-pocket.guided-session.v1 | Latest saved state per Guided problem |

Scheduling is SM-2-inspired, deterministic and item-based: unaided correct intervals **1 day → 6 days → rounded previous interval × updated ease**, capped at 365 days. Ease starts 2.5, clamps 1.3–3, increases 0.05 for unaided correctness, decreases 0.2 for incorrect/unsure and 0.1 for partial/assisted outcomes. Failures, partial performance and hint-assisted success reset the streak and interval to one day. Two unaided successes change learning to review, without a mastery claim. Dates use elapsed UTC days and duplicate event IDs are ignored. Guided schedules the whole problem; Written uses explicit self-report provenance. Objective evidence aggregates actual new events separately.

History exports only allowlisted QuantPocket keys. Import validates all data, previews counts and defaults to merge; exact replacement has additional destructive confirmation. Merge retains distinct records and replays unioned review events, preferring newer colliding drafts and local values on ties. Malformed/unsupported stored data is retained, healthy records remain readable, unsafe overwrites are refused and detectable failures surface a notice. Quick reset retains its old scope; separately confirmed new-learning reset clears the six new namespaces. [LEARNING_STORAGE.md](docs/LEARNING_STORAGE.md) specifies policies and best-effort rollback limits.

## Architecture and authoring

| Area | Source of truth |
| --- | --- |
| Taxonomy/optional metadata | src/data/curriculum.ts, studyMetadata.ts |
| Preserved MCQ bank/session | src/features/quick-practice/data/, session/progress modules |
| Objectives/mappings/new banks | src/features/learning/data/ |
| Validators/Guided transitions | src/features/learning/schema.ts, guidedSession.ts |
| Persistence/reviews/evidence | src/features/learning/storage.ts, scheduling.ts |
| New mode UI | PracticeHub.tsx, GuidedStudy.tsx, WrittenStudy.tsx |
| Shared rendering/tools | src/components/, src/style.css |
| Shared References | src/data/knowledge/, src/features/reference/ |
| Offline/deployment | vite.config.ts, .github/workflows/deploy-pages.yml |

[CONTENT_AUTHORING.md](docs/CONTENT_AUTHORING.md) gives complete templates for all three modes and objectives, hint guidance, prerequisite/Reference mapping, difficulty and mathematical/compiler verification. Follow [CONTENT_STYLE.md](CONTENT_STYLE.md). Run validate:bank, validate:learning, coverage:learning, audit:bank and appropriate tests/code checks; build automatically runs both content validators. Adding a normal new exercise requires content/mapping changes rather than a new screen. Simple deterministic equivalence checks and weak/family reports aid review without claiming semantic certification.

## Verification for this update

- `npm test`: 15 files passed; the detailed runner confirms all **79 cases**. `npm run build` runs both content validators and TypeScript; root and `/QuantApp/` builds pass. There is no standalone lint command.
- `validate:pages` passes at both bases. The strict-static `verify-pages.mjs` browser suite passes at both bases, checking direct entry/refresh, assets and worker scope, mouse/icon/Enter/Space home navigation across Quick/Guided/Written/History/Reference, saved drafts/responses/flags/schedules and offline resume at 320/390/768/1024px.
- Existing setup, feedback, all six Guided/23 parts and six Written flows, and production PWA cache/restart/update regressions pass. Data signatures match all 51 original content/taxonomy files. Previous academic/compiler evidence remains in [STAGE_2_REVIEW.md](docs/STAGE_2_REVIEW.md).
- All content and lazy assets remain precached under the deployed base. Vite's pre-existing large-main-chunk warning remains; no dependencies were added. Real-device Safari installation and OS storage retention remain separate checks.
- GitHub Actions and live-site verification are pending publication; do not infer publication from local tests.

Commands: `npm test`, `npm run build`, `npm run validate:pages`. Browser commands include `test:setup`, `test:feedback`, `test:pwa`, `test:learning`, `test:pages`; existing bank/content suites remain available. Repository preview: `PAGES_BASE_PATH=/QuantApp/ npm run build`; browser setup: `PWA_CHROMIUM=/usr/bin/chromium PWA_NO_SANDBOX=1`. See [README.md](README.md) and [DEPLOYMENT.md](DEPLOYMENT.md).

## Remaining work and limitations

Stage 2 is complete locally at **450**. **350 MCQs remain**: Stage 3 adds **175** (25 per non-Finance category) to reach **625**; Stage 4 adds another **175** to reach **800**, 100/category. Finance remains at 100 and receives zero at both future stages. [CURRICULUM_EXPANSION.md](CURRICULUM_EXPANSION.md) and [CURRICULUM_MAP.md](CURRICULUM_MAP.md) distinguish the expansion plan from implemented learning modes.

Difficulty/distractor and review-policy calibration need learner data. Objective coverage is initially broad, six competencies have recognition-only evidence, prerequisites are partial and new-mode coverage is small. Finance supporting Reference coverage still needs expansion. Family-aware sampling/adaptive recommendations are future work.

Quick unfinished sessions retain their original in-memory lifetime. Learning history is unpaginated, storage is browser/origin-local, and localStorage cannot ensure transactions across keys/tabs or recover after OS eviction. Detectable failures and backup rollback help but cannot guarantee persistence after quota failure/browser termination. Old Quick history is not new objective/schedule evidence. Preserve the production origin and export backups.

The new public GitHub repository and Pages publication are authorised and pending verification. See [DEPLOYMENT.md](DEPLOYMENT.md) for workflow settings, publishing and origin-specific progress transfer.
