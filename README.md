# QuantPocket

A mobile-first, local-first study PWA for mathematics, quantitative finance, programming and machine learning. React 19, TypeScript, Vite 6, KaTeX and `vite-plugin-pwa`; no backend, account or cloud synchronisation. The existing dark interface and state-based navigation are preserved, with wider study panels on tablets.

[STATUS.md](STATUS.md) is the current numbered overview. Historical status and its maintenance convention are in [docs/status/README.md](docs/status/README.md). Hosting is configured for GitHub Pages at **https://pheneas123.github.io/QuantApp/**, from the public `Pheneas123/QuantApp` repository. See [deployment status](STATUS.md) for verified publication and [deployment instructions](DEPLOYMENT.md) for setup, publishing and progress transfer.

## Run and verify

Use Node.js 22 or newer. `npm run dev` prints the development URL; `npm run preview` serves the production build. No environment file or backend is required.

```sh
npm ci
npm run dev
npm test
npm run validate:bank
npm run validate:learning
npm run coverage:learning
npm run audit:bank
npm run test:code
npm run test:learning-code
npm run build
npm run preview
```

Production browser checks: `test:setup`, `test:feedback`, `test:bank`, `test:finance`, `test:reference`, `test:stage1`, `test:pwa`, `test:learning`, `test:stage2`, `test:pages`. Built asset check: `validate:pages`. New compiler/numerical checks: `test:stage2-code`. They build first. With a system browser, use `PWA_CHROMIUM=/usr/bin/chromium PWA_NO_SANDBOX=1`; Python/NumPy and g++ are needed for the reviewed code checks. `node --import tsx --test --test-isolation=none tests/*.test.ts` reports individual unit cases. There is no standalone lint script.

## Publish through GitHub Pages

Pushes to `main` run [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml): install dependencies, run tests, validate/type-check/build, upload `dist`, and deploy with official Pages Actions. The workflow reads the Pages base path from `configure-pages`; no repository name is hardcoded in Vite or the workflow.

One-time setup: in **Settings → Pages**, select **GitHub Actions** as the source. Allow official Actions and deployments from `main` in the `github-pages` environment. No deployment secrets are required.

```sh
npm test
PAGES_BASE_PATH=/QuantApp/ npm run build
npm run validate:pages
git status --short
git add <files-you-intend-to-publish>
git diff --cached
git commit -m "Describe the change"
git push origin main
```

Watch the workflow until deployment succeeds, then check **https://pheneas123.github.io/QuantApp/**. Complete initial-repository commands and local subpath previews are in [DEPLOYMENT.md](DEPLOYMENT.md). Environment files, private keys and local credential directories are ignored; review staged files before committing.

Navigation stays in React state on the single `/QuantApp/` entry URL, so direct visits and refreshes need no server rewrites. The logo shares an accessible home action across Quick, Guided and Written views, preserving saved work. Refresh opens home; saved Guided sessions and Written drafts can be resumed.

Before changing hosts, export progress from the old origin and import it on the new site. Storage keys stay unchanged, but browser security prevents automatic cross-origin transfer. The deployment guide includes a backup method for older releases without export controls.

## Study modes

All modes share the eight-category curriculum and difficulty controls. Stage 2 brings the MCQ bank to **450**: 50 per non-Finance category and the preserved 100 Finance records. There are **6 Guided Problems with 23 parts**, **6 Written Problems**, **170 Reference entries**, and **102 learning objectives with 29 prerequisite links**. The existing [800-question roadmap](CURRICULUM_EXPANSION.md) has reached 450 locally; future stages reach 625 → 800.

**Quick Practice** retains category/subcategory/difficulty, Practice / Review Incorrect / Review Unsure / Unseen Only, 10/25/50/all session sizes, one-time question/choice shuffling, Submit / Not sure, locked feedback, Reference return, history and reset. Latest outcome determines review membership; answer accuracy excludes unsure. Canonical grading and legacy history remain intact. New Flagged and Due for Review filters are independent of those existing modes. 118 Stage 2 questions and one original demonstration have progressive hints; zero-hint questions remain valid. Quick unfinished sessions retain their existing in-memory behaviour.

**Guided Problems** keep an overarching statement accessible while advancing through 3–4 meaningful parts. Learning feedback follows each part; Assessment feedback follows explicit final completion. Submitted parts cannot change and future answers remain hidden. Each attempt is one problem with part-level evidence, a final summary and a full solution. Answer orders, hint counts and interrupted state are saved and can be resumed from the problem list. Retry creates a new attempt.

**Written Problems** provide a plain-text editor, LaTeX/code preview, progressive hints and immediate local drafts. Enter nonempty work before explicitly revealing the full solution. Correct / Partially Correct / Incorrect / Not Sure are labelled self-reported assessments. Completed answers remain in history; current drafts survive refresh. No arbitrary proof grading or code execution is performed.

Flag/unflag controls appear on all items. Use each mode’s Flagged filter to study them; History also lists retained flags, including unavailable content. Objective panels expose prerequisites, Reference links and a way to practise foundations. Objective progress shows attempts, unique items, observed assessed successes, hint assistance, written self-reports and insufficient evidence; it never labels a single guess as mastery.

## Rendering and controls

The shared renderer accepts plain text, inline/block KaTeX, line-delimited fenced code and simple pipe tables. Syntax highlighting supports Python, C++, JavaScript and TypeScript aliases with four selectively imported local grammars; unknown languages remain literal. Code characters/indentation are preserved and long lines scroll inside their block. Written previews and long solutions use the same renderer. New mode and highlighting chunks are precached, including before their first use.

Keyboard controls: 1–4 or A–D select MCQ choices; Enter submits/advances; N advances submitted parts; H reveals the next hint; F toggles a flag; U retains Quick Practice’s Not sure; ? opens help; Esc closes dialogs. Editing fields, composition, modifier shortcuts, disabled actions and repeat submissions are protected. Written solutions require their explicit reveal action. Mouse and touch controls remain available.

## Progress and backups

The unchanged **`quant-pocket.attempts.v1`** accepts both old boolean and current result-based Quick records, preserving old records verbatim. New learning data uses separate versioned namespaces; no legacy attempts are migrated or historically regraded. [Storage documentation](docs/LEARNING_STORAGE.md) lists the exact keys, validation, failure handling, merge/replacement semantics and reset scope.

History offers local export/import. Import validates the whole file, previews counts and defaults to merge. Replacement additionally confirms destruction. Backups include attempts, drafts, flags, schedules and Guided interrupted state. Stored data remains browser/origin-local; keep backups because there is no account recovery. Read/write failures are surfaced, and malformed new storage is left untouched. localStorage is not transactional across tabs.

Review scheduling is deterministic and SM-2-inspired: unaided success intervals are 1 day, 6 days, then rounded prior interval × ease; incorrect, unsure, partial or hint-assisted results reset to one day. Written self-report provenance stays distinct. Guided review schedules the entire problem. UTC elapsed-day calculations avoid daylight-saving ambiguity; Due for Review supplements the existing practice/review controls. Details and limitations are in [the review policy](docs/LEARNING_STORAGE.md).

## Content and architecture

[CONTENT_AUTHORING.md](docs/CONTENT_AUTHORING.md) provides complete templates for each mode, objectives/prerequisites, hints, References, difficulty and independent mathematical/programming checks. Runtime schemas plus build-time validation check static banks. [Coverage reports](docs/LEARNING_COVERAGE.md) distinguish question counts from assessed competencies and expose gaps and overlap. Some initial objectives span related skills; a mapping does not prove every component is covered.

- `src/data/curriculum.ts`, `studyMetadata.ts`: shared taxonomy and optional educational metadata.
- `src/features/quick-practice/`: preserved MCQ session, grading, filters, history and bank.
- `src/features/learning/data/`: objective registry, reviewed MCQ mappings and new problem banks.
- `src/features/learning/schema.ts`, `guidedSession.ts`: validated content and ordered session transitions.
- `src/features/learning/storage.ts`, `scheduling.ts`: versioned persistence, backups, review events and objective evidence.
- `src/features/learning/{PracticeHub,GuidedStudy,WrittenStudy}.tsx`: new modes, loaded separately.
- `src/data/knowledge/`, `src/features/reference/`: shared Reference library and existing browsing flow.
- `src/components/`: shared maths/code/table renderer, hints, flags, prerequisite tools and keyboard help.
- `src/style.css`, `vite.config.ts`: existing visual language, responsive widths and offline precaching.

Academic changes and per-item difficulty decisions are in [AUDIT_REMEDIATION.md](docs/AUDIT_REMEDIATION.md). The independent audit is preserved unchanged as historical evidence; the remediation report records implemented decisions and remaining execution/calibration limits. [Stage 2 review and verification](docs/STAGE_2_REVIEW.md) distinguishes unit/browser tests, numerical/compiler checks and unverified device behaviour.

## Install and offline use

Development mode does not enable offline caching. Use a production preview on localhost or an HTTPS installation. All static content, lazy code, KaTeX and fonts are precached. New releases offer an update outside active Quick/Guided/Written study. On iPhone, open the HTTPS site in Safari, Share → Add to Home Screen, allow installation online and verify reopening with networking disabled. See [DEPLOYMENT.md](DEPLOYMENT.md). Real-device Safari/OS eviction checks are separate from Chromium viewport tests.
