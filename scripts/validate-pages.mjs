import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const manifest = JSON.parse(await readFile(resolve(root, 'manifest.webmanifest'), 'utf8'));
const base = manifest.scope;
assert.match(base, /^\/(?:[^?#]+\/)?$/);
assert.equal(manifest.start_url, base);
assert.equal(manifest.id, base);
const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
assert.ok(urls.some(url => url.endsWith('manifest.webmanifest')));
assert.ok(urls.some(url => url.endsWith('.js')));
for (const url of [...urls, ...manifest.icons.map(icon => icon.src)]) {
  assert.ok(url.startsWith(base), `Asset outside Pages base: ${url}`);
  assert.ok((await stat(resolve(root, url.slice(base.length)))).isFile(), url);
}
const sw = await readFile(resolve(root, 'sw.js'), 'utf8');
assert.ok(sw.includes(JSON.stringify(base + 'index.html')), 'Offline navigation fallback must use the deployed base');
for (const file of ['_headers', '_redirects']) {
  await assert.rejects(stat(resolve(root, file)), { code: 'ENOENT' });
}
console.log(`PASS: HTML, manifest, install icons and offline shell use ${base}; no obsolete host files.`);
