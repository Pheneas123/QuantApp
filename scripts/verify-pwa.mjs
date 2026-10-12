// Production-only smoke test. Uses an isolated persistent Chromium profile, never user data.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { cp, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { extname, resolve, sep } from 'node:path';
import vm from 'node:vm';
import { chromium } from 'playwright';
import { questions } from '../src/features/quick-practice/data/questions.ts';

const source = resolve('dist');
const scratch = await mkdtemp(resolve(tmpdir(), 'quantapp-pwa-'));
const deployed = resolve(scratch, 'site');
const profile = resolve(scratch, 'profile');
const storageKey = 'quantapp.attempts.v1';
let context;
let server;
const errors = [];
try {
  await cp(source, deployed, { recursive: true });
  const manifest = JSON.parse(await readFile(resolve(deployed, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.id, '/');
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.display, 'standalone');
  const html = await readFile(resolve(deployed, 'index.html'), 'utf8');
  assert.match(html, /apple-mobile-web-app-title/);
  assert.match(html, /viewport-fit=cover/);
  assert.match(html, /manifest.webmanifest/);
  for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
    const png = await readFile(resolve(deployed, name));
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
  const sw = await readFile(resolve(deployed, 'sw.js'), 'utf8');
  const match = sw.match(/\.precacheAndRoute\((\[[\s\S]*?\])/);
  assert.ok(match, 'Generated Workbox precache list must exist');
  const entries = vm.runInNewContext(`(${match[1]})`, {}, { timeout: 1000 });
  const cachedPaths = new Set(entries.map(entry => entry.url));
  const files = await readdir(deployed, { recursive: true });
  const required = files.filter(file => /\.(js|css|html|png|svg|woff2?|ttf|webmanifest)$/.test(file))
    .filter(file => file !== 'sw.js' && !/^workbox-.*\.js$/.test(file));
  for (const file of required) assert.ok(cachedPaths.has(file), `Not precached: ${file}`);
  assert.ok(required.some(file => file.includes('KaTeX') && file.endsWith('.woff2')));
  for (const file of ['_redirects', '_headers']) await assert.rejects(stat(resolve(deployed, file)), { code: 'ENOENT' });
  console.log(`PASS: install metadata, PNG dimensions, host configuration, and ${cachedPaths.size} precache entries.`);

  // Serve existing files only, like GitHub Pages. Application navigation stays at /.
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
  server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let path = resolve(deployed, `.${pathname === '/' ? '/index.html' : pathname}`);
      if (!path.startsWith(deployed + sep)) { res.writeHead(403).end(); return; }
      try { if (!(await stat(path)).isFile()) throw new Error('not a file'); }
      catch { res.writeHead(404).end(); return; }
      res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(await readFile(path));
    } catch { res.writeHead(500).end(); }
  });
  async function listen(port = 0) {
    await new Promise((done, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', done); });
  }
  async function stopServer() { await new Promise((done, reject) => server.close(error => error ? reject(error) : done())); }
  await listen();
  const port = server.address().port;
  const origin = `http://127.0.0.1:${port}`;
  async function launch(offline = false) {
    context = await chromium.launchPersistentContext(profile, {
      headless: true,
      executablePath: process.env.PWA_CHROMIUM || undefined,
      viewport: { width: 390, height: 844 },
      args: process.env.PWA_NO_SANDBOX === '1' ? ['--no-sandbox'] : [],
    });
    context.setDefaultTimeout(20_000);
    await context.setOffline(offline);
    context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
    const page = await context.newPage();
    return page;
  }
  const readAttempts = page => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]'), storageKey);
  async function submitOne(page, unsure = false) {
    if (unsure) await page.getByRole('button', { name: 'Not sure', exact: true }).click();
    else {
      await page.locator('.answer').first().click();
      await page.getByRole('button', { name: 'Submit', exact: true }).click();
    }
    await page.locator('.feedback').waitFor();
  }
  let page = await launch();
  await page.goto(origin);
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await page.getByRole('button', { name: `All Questions ${questions.length} questions` }).waitFor();
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await submitOne(page);
  const saved = await readAttempts(page);
  assert.equal(saved.length, 1);
  const cachedURLs = await page.evaluate(async () => {
    const urls = [];
    for (const name of await caches.keys()) for (const request of await (await caches.open(name)).keys()) urls.push(new URL(request.url).pathname.slice(1));
    return urls;
  });
  for (const file of required) assert.ok(cachedURLs.includes(file), `Missing from browser cache: ${file}`);
  await context.close();
  context = undefined;
  await stopServer();

  // Entire browser process is reopened offline with the static server stopped.
  page = await launch(true);
  await page.goto(origin);
  await page.getByRole('button', { name: `All Questions ${questions.length} questions` }).waitFor();
  assert.deepEqual(await readAttempts(page), saved);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Reference' }).click();
  await page.getByRole('button', { name: /Dambis.*Schwarz/ }).click();
  await page.getByRole('heading', { name: /Dambis.*Schwarz/ }).waitFor();
  assert.ok(await page.locator('.reference .katex').count());
  assert.equal(await page.locator('.katex-error').count(), 0);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Practice' }).click();
  await page.getByRole('button', { name: `Stochastic Calculus ${questions.filter(q => q.category === 'Stochastic Calculus').length} questions` }).click();
  // Keep the font test deterministic: some new Easy prompts use plain mathematical prose.
  await page.getByRole('combobox', { name: 'Subcategory', exact: true }).selectOption('Brownian motion properties');
  await page.getByRole('button', { name: 'Easy', exact: true }).click();
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await page.locator('.question .katex').first().waitFor();
  await page.evaluate(async () => { await document.fonts.ready; });
  assert.equal(await page.locator('.katex-error').count(), 0);
  // Explicitly fetch a font while both browser and server are offline.
  const font = required.find(file => /KaTeX_Main-Regular.*\.woff2$/.test(file));
  assert.equal(await page.evaluate(async path => (await fetch('/' + path)).ok, font), true);
  await submitOne(page, true);
  await page.locator('.explanation').waitFor();
  assert.equal((await readAttempts(page)).at(-1).result, 'unsure');
  assert.equal((await readAttempts(page)).length, 2);
  await context.close();
  context = undefined;
  page = await launch(true);
  await page.goto(origin + '/#reload-check');
  await page.getByRole('heading', { name: 'Progress', exact: true }).waitFor();
  assert.equal((await readAttempts(page)).length, 2);
  console.log('PASS: browser restart without network or server, offline navigation, bank, reference, KaTeX, and persisted offline submissions.');

  await listen(port);
  await context.setOffline(false);
  await page.goto(origin);
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  const beforeUpdate = await readAttempts(page);
  // Simulate a second deployment in the temporary copy only. Keep the real built SW
  // and its lifecycle options; change the cached HTML revision and a test-only marker.
  const updatedHtml = html.replace('</head>', '<meta name="pwa-test-version" content="2" /></head>');
  await writeFile(resolve(deployed, 'index.html'), updatedHtml);
  const revision = createHash('md5').update(updatedHtml).digest('hex');
  const updatedSW = sw.replace(/(url:"index\.html",revision:")[^"]+"/, `$1${revision}"`);
  assert.notEqual(updatedSW, sw);
  await writeFile(resolve(deployed, 'sw.js'), updatedSW);
  // Workbox distinguishes very recent registrations using a one-minute heuristic.
  // Advance browser clocks for that heuristic and the app's update-check throttle.
  await page.evaluate(() => {
    const now = Date.now.bind(Date);
    const performanceNow = performance.now.bind(performance);
    Date.now = () => now() + 120_000;
    performance.now = () => performanceNow() + 120_000;
    window.dispatchEvent(new Event('focus'));
  });
  await page.waitForFunction(async () => !!(await navigator.serviceWorker.getRegistration())?.waiting);
  assert.equal(await page.getByRole('button', { name: 'Update app', exact: true }).count(), 0);
  assert.equal(await page.locator('meta[name="pwa-test-version"]').count(), 0);
  await page.getByRole('button', { name: 'End session' }).click();
  await page.getByRole('button', { name: 'Update app', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Update app', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('meta[name="pwa-test-version"]')?.getAttribute('content') === '2');
  assert.deepEqual(await readAttempts(page), beforeUpdate);
  await context.setOffline(true);
  await page.reload();
  await page.getByRole('button', { name: `All Questions ${questions.length} questions` }).waitFor();
  assert.deepEqual(await readAttempts(page), beforeUpdate);
  await context.setOffline(false);
  await page.reload();
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await submitOne(page);
  assert.equal((await readAttempts(page)).length, 3);
  assert.deepEqual(errors, []);
  console.log('PASS: foreground update check, deferred update during quiz, activation without data loss, updated offline launch, and return online.');
  console.log('Not tested: real iPhone/Safari installation, OS storage eviction, or hosted edge headers.');
} finally {
  await context?.close();
  if (server?.listening) await new Promise(done => server.close(done));
  await rm(scratch, { recursive: true, force: true });
}
