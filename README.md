# QuantApp

QuantApp is a local-first study application for mathematics, quantitative finance, programming and machine learning. It runs entirely in the browser, with no account or backend, and can be installed for offline study.

**[Open QuantApp](https://pheneas123.github.io/QuantApp/)** · **[GitHub repository](https://github.com/Pheneas123/QuantApp)**

## What you can study

The curriculum covers eight categories: Probability, Statistics, Measure Theory, Stochastic Processes, Stochastic Calculus, Finance, Programming and Machine Learning. It includes 450 multiple-choice questions, 6 Guided Problems with 23 parts, 6 Written Problems, 170 Reference entries and 102 learning objectives.

- **Quick Practice:** choose categories, subcategories, difficulty and session length. Practise all or unseen questions, review incorrect or unsure answers, or filter by flags and due reviews. Answers receive explanations and links to related Reference entries.
- **Guided Problems:** work through ordered parts using immediate learning feedback or assessment feedback at completion. Interrupted attempts, answer order and hint use are saved for resuming.
- **Written Problems:** write plain text, maths or code, preview your work, reveal a worked solution and record your own assessment. Drafts save as you type.
- **Reference and objectives:** browse concepts, formulas and code examples, inspect prerequisites and practise foundations. Objective progress distinguishes assessed answers, hint assistance and self-reported results.

Progressive hints are available where supplied. Flags and spaced repetition work across all practice modes. History shows attempts and provides backup export/import. The header logo returns to the home screen from every mode while retaining saved answers, drafts, flags and review schedules. Unfinished Quick Practice sessions are kept in memory only.

Maths renders with KaTeX. Code supports local syntax highlighting for Python, C++, JavaScript and TypeScript; long lines scroll within their blocks. Written answers are self-assessed, without automatic proof grading or code execution.

## Run locally

Use Node.js 22 or newer. No environment file, API key or external service is required.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To preview a production build:

```sh
npm run build
npm run preview
```

The application uses React, TypeScript, Vite and `vite-plugin-pwa`. Development uses `/` as its base. For a preview matching this repository's GitHub Pages path:

```sh
PAGES_BASE_PATH=/QuantApp/ npm run build
npm run validate:pages
npm run preview
```

Open the preview URL with `/QuantApp/` appended. Navigation stays in React state at this single entry URL, so GitHub Pages needs no server rewrites or additional routing dependency. Refresh opens the home screen; saved Guided sessions and Written drafts can then be resumed.

## Checks

```sh
npm test
npm run build
npm run validate:pages
npm run test:pages
npm run test:learning
npm run test:pwa
```

The build validates both question banks, runs TypeScript checking and creates `dist`. There is no standalone lint command. `validate:pages` checks asset, manifest and service-worker paths. `test:pages` uses a strict static server to check repository paths, direct visits, refreshes, offline loading and accessible home navigation from all modes. Learning tests cover persistence, backups, flags, review schedules and interrupted work; PWA tests cover offline use and updates.

Browser checks require Playwright Chromium (`npx playwright install chromium`) or a system browser. In environments that require it, use `PWA_CHROMIUM=/usr/bin/chromium PWA_NO_SANDBOX=1` before the command. Run browser suites sequentially.

Additional scripts cover session setup, feedback, Reference navigation, the question bank and reviewed code examples; see `package.json`. Code execution checks require Python/NumPy and g++. `npm run coverage:learning` generates ignored JSON and Markdown reports under `docs/`.

## Publish changes

The public repository is `Pheneas123/QuantApp`, with `main` as the deployment branch. From an existing checkout:

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

For a new checkout:

```sh
git clone https://github.com/Pheneas123/QuantApp.git
cd QuantApp
npm ci
```

Every push to `main` runs [the deployment workflow](.github/workflows/deploy-pages.yml). It installs locked dependencies, runs unit tests, validates and type-checks the production build, checks Pages asset paths, uploads `dist` and deploys through the official GitHub Pages Actions. The workflow gets the repository base path from `configure-pages`; Vite and the workflow do not hardcode an owner or repository name. It can also be started manually from the Actions tab.

One-time repository configuration:

1. In **Settings > Pages**, choose **GitHub Actions** as the build and deployment source. This is configured for the current repository.
2. Allow the official GitHub Actions used by the workflow. The `github-pages` environment must allow deployments from `main`.
3. If copying this project to another repository, enable Pages there and confirm the URL reported by the deployment job.

The workflow grants read access to source content, Pages deployment access and an OpenID Connect token. No deployment secret is required. Environment files, credentials, generated builds and local backup files are ignored; review staged changes before committing.

The expected site URL is **https://pheneas123.github.io/QuantApp/**. Check the Actions run and the published site after a push before treating that release as deployed.

## Progress, backups and offline use

All progress is stored in this browser under versioned `quantapp.*` keys. This rename deliberately starts a fresh progress store: previous application keys and old backup formats are not migrated or accepted. Existing data in other namespaces is left untouched. Question content is unchanged.

Export a backup from History to save current QuantApp progress. Import validates the file, previews its contents and defaults to merging with local data; replacement requires additional confirmation. Backups include Quick and Guided attempts, Written attempts and drafts, flags, schedules and resumable Guided sessions. Changing browsers, devices or hosting origins requires exporting and importing a current QuantApp backup. There is no account recovery or cloud synchronisation.

Review scheduling is deterministic and inspired by SM-2: unaided successes increase intervals, while incorrect, unsure, partial or hint-assisted results return to one-day review. Written self-assessments retain their distinct provenance. See [storage and review policy](docs/LEARNING_STORAGE.md) for namespaces, validation, reset scope and failure handling.

Offline caching is enabled in production. After an online load has installed the service worker, application code, content, fonts and maths rendering are cached. Updates are offered outside active practice. Install through your browser's installation controls; on iPhone, use Safari's **Share > Add to Home Screen**. Browser or operating-system storage eviction can remove offline content or progress, so retain backups.

Keyboard controls include 1–4 or A–D for choices, Enter to submit or advance, N to advance submitted parts, H for hints, F for flags, U for Quick Practice's Not sure, ? for help and Escape to close dialogs. The header home button supports Tab, Enter and Space. Editing fields retain their normal keyboard behaviour.

## Project structure and content

- `src/features/quick-practice/`: question bank, sessions, grading, filters and history.
- `src/features/learning/`: Guided and Written practice, objectives, storage, backups and scheduling.
- `src/features/reference/` and `src/data/knowledge/`: Reference library and browsing.
- `src/data/`: shared curriculum and study metadata.
- `src/components/`: shared maths/code rendering, hints, flags and accessibility controls.
- `tests/` and `scripts/`: content validation, unit tests and browser verification.
- `vite.config.ts` and `.github/workflows/deploy-pages.yml`: build, offline caching and deployment.

[Content authoring](docs/CONTENT_AUTHORING.md) explains question templates, assumptions, difficulty, hints, references and mathematical/programming review. Required review fixtures remain alongside the tests; generated reports and historical status documents are excluded from the repository.
