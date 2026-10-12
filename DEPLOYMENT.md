# QuantPocket deployment through GitHub Pages

The application is a static React/Vite PWA. Repository: `Pheneas123/QuantApp`. Expected production URL: **https://pheneas123.github.io/QuantApp/**. Verified publication is recorded in [STATUS.md](STATUS.md); an expected URL alone does not establish deployment success.

## Local development and production preview

Use Node.js 22 or newer and the committed lockfile:

```sh
npm ci
npm run dev
```

Vite prints the development URL. Development does not enable service workers. For production:

```sh
npm test
npm run build
npm run validate:pages
npm run preview
```

The default base is `/`, preserving localhost development. To reproduce repository hosting:

```sh
PAGES_BASE_PATH=/QuantApp/ npm run build
npm run validate:pages
npm run preview
```

Open `http://localhost:4173/QuantApp/`, using Vite's printed port if it differs. `PAGES_BASE_PATH` affects assets, the manifest, install icons, service-worker registration/scope and the offline shell. It is nonsecret build configuration; no environment file or backend is needed.

## Routing and home navigation

The app uses React state for navigation. Quick, Guided, Written, History and Reference stay on the single `/QuantApp/` entry URL; they do not create `/guided` or other server routes. Direct visits and refreshes therefore request the real index document, without rewrite rules or a new router dependency. Refresh opens home, as before; saved Guided sessions and Written drafts can be resumed. Quick unfinished sessions retain their existing in-memory lifetime.

The brand, End session, summary home button and ordinary Practice navigation share the root home action. It exits any active practice view and clears transient Reference/objective context, without deleting history, drafts, flags or schedules. Dedicated Reference return controls retain their study-return behaviour. The logo remains a labelled native button supporting Enter and Space, with unchanged styling.

## One-time GitHub configuration

1. Use the public `Pheneas123/QuantApp` repository. Do not replace existing remote content or force-push.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**. An administrator can instead enable a previously disabled Pages site with:

   ```sh
   gh api repos/Pheneas123/QuantApp/pages --method POST -f build_type=workflow
   ```

3. Allow repository Actions and official `actions/*` actions. The `github-pages` environment must permit deployment from `main`; retain any deliberate reviewer requirements.
4. No custom domain, deployment secret, API key or personal token is required in the workflow. GitHub supplies the job token and OIDC identity.

[deploy-pages.yml](.github/workflows/deploy-pages.yml) runs on pushes to `main` and manual dispatch. It checks out source, installs Node.js 22 and dependencies with `npm ci`, runs tests, builds with both content validators and TypeScript, validates asset paths, uploads `dist` and deploys using official Pages Actions. `configure-pages` provides `base_path` dynamically, handling repository subpaths, user-site repositories and configured custom domains without hardcoded names in the build configuration.

Build permissions: `contents: read`, `pages: read`. Deploy permissions: `pages: write`, `id-token: write`, using the `github-pages` environment. Deployment jobs run sequentially. The deployment action and Pages settings expose the final URL. GitHub Pages controls response headers; previous host-specific header/redirect files are removed.

## Publishing changes

On a new computer:

```sh
git clone https://github.com/Pheneas123/QuantApp.git
cd QuantApp
npm ci
```

Review and test before publishing:

```sh
npm test
PAGES_BASE_PATH=/QuantApp/ npm run build
npm run validate:pages
git status --short
git add <files-you-intend-to-publish>
git diff --cached
git commit -m "Describe the change"
git push origin main
gh run list --repo Pheneas123/QuantApp --workflow deploy-pages.yml
```

Wait for the build and deploy jobs to succeed, then verify the actual HTTPS site. A successful local build is not publication.

For an uninitialised copy with no existing target repository, the equivalent initial commands are:

```sh
gh auth login
git init -b main
git add .
git diff --cached
git commit -m "Initial QuantPocket application with GitHub Pages"
gh repo create Pheneas123/QuantApp --public --source=. --remote=origin
gh api repos/Pheneas123/QuantApp/pages --method POST -f build_type=workflow
git push -u origin main
```

Use those initial commands only for a new repository. `.gitignore` excludes dependencies/builds, environment files, private keys, local credential/tool directories and progress backups. Always review staged files. The workflow publishes only `dist`.

## Preserve progress when changing hosts

Storage keys and schemas are unchanged. **Storage belongs to its browser origin**: progress on the former `quantpocket.netlify.app` address does not automatically appear on `pheneas123.github.io`. Use **History → Export progress** on the old site, then import the backup on the new site and review the merge preview. Retain the old origin until the transfer is verified; do not clear its data or uninstall its PWA to migrate.

For an older release without backup controls, run this in the browser console on the old origin to download only the known QuantPocket namespaces in the supported backup format. Do not commit the resulting file:

```js
const names = ['quant-pocket.attempts.v1', 'quant-pocket.guided-attempts.v1',
  'quant-pocket.written-attempts.v1', 'quant-pocket.written-drafts.v1',
  'quant-pocket.flags.v1', 'quant-pocket.review-schedules.v1',
  'quant-pocket.guided-session.v1'];
const data = Object.fromEntries(names.map(name => [name,
  JSON.parse(localStorage.getItem(name) ?? 'null')]));
const backup = { format: 'quant-pocket-backup', version: 1,
  exportedAt: new Date().toISOString(), data };
const link = document.createElement('a');
link.href = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)],
  { type: 'application/json' }));
link.download = 'quant-pocket-backup-migration.json';
link.click();
setTimeout(() => URL.revokeObjectURL(link.href), 1000);
```

Imports validate data and leave malformed/unsupported records untouched. After import, check History, drafts, flags and due reviews. Keep a local backup. Paths on the same GitHub Pages origin share localStorage; browser profiles/devices do not.

## Offline and update checks

All content, lazy practice code, KaTeX and fonts remain precached. The worker is scoped to the repository path and cannot control unrelated Pages projects. Foreground/connectivity checks discover updates; the Update app control stays hidden during active practice. Updates preserve progress.

With Playwright Chromium installed, or a system browser:

```sh
PWA_CHROMIUM=/usr/bin/chromium PWA_NO_SANDBOX=1 npm run test:pwa
PAGES_BASE_PATH=/QuantApp/ PWA_CHROMIUM=/usr/bin/chromium PWA_NO_SANDBOX=1 npm run test:pages
```

`test:pwa` checks offline browser restart, caching and a simulated update without losing attempts at the root. `test:pages` uses a strict static server with no rewrites and checks subpath assets, worker scope, direct entry/refresh, home navigation from all modes using mouse/keyboard, saved state and offline Guided/Written content.

Verify the actual HTTPS site after publishing. On iPhone, open it in Safari, use Share → Add to Home Screen, and check standalone layout, cold offline launch, retained progress and a subsequent update. Chromium checks do not certify Safari installation or OS storage retention.

Official references: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [configure-pages metadata](https://github.com/actions/configure-pages), [Vite deployment](https://vite.dev/guide/static-deploy.html#github-pages).
