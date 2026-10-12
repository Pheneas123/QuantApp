// Executes only explicitly reviewed, bounded snippets from the authored bank.
// Never run arbitrary uploaded code or execute the examples of C++ undefined behaviour.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import programming from '../src/features/quick-practice/data/bank/programming';
import { textSegments } from '../src/components/textSegments';

const snippet = (id: string) => {
  const q = programming.find(q => q.id === id);
  assert.ok(q, id);
  const blocks = textSegments(q.prompt).filter(s => s.kind === 'code');
  assert.equal(blocks.length, 1, id);
  return { q, code: blocks[0].text };
};
function run(command: string, args: string[]) {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 10_000, maxBuffer: 128 * 1024 });
  assert.ifError(result.error);
  assert.equal(result.signal, null, command);
  return result;
}
function checkOutput(id: string, output: string) {
  const { q } = snippet(id);
  assert.deepEqual(q.answers.flatMap((a, i) => a === output.trim() ? [i] : []), [q.correctAnswer], id);
}

const pythonOutputs = [
  'prog-generator-exhaustion', 'prog-mutable-default', 'prog-closure-binding',
  'prog-tuple-mutable-member', 'prog-shallow-copy', 'prog-numpy-broadcast', 'prog-numpy-view',
];
for (const id of pythonOutputs) {
  const result = run('python3', ['-I', '-c', snippet(id).code]);
  assert.equal(result.status, 0, id + ': ' + result.stderr);
  checkOutput(id, result.stdout);
}
const offByOne = run('python3', ['-I', '-c', snippet('prog-off-by-one').code]);
assert.notEqual(offByOne.status, 0);
assert.match(offByOne.stderr, /IndexError/);
assert.equal(offByOne.stdout, '');
const scientific = run('python3', ['-I', '-c', `import numpy as np, math
X = np.zeros((3, 2))
${snippet('prog-pairwise-memory').code}
assert diff.shape == (3, 3, 2)
assert math.fsum([1e16, 1.0, -1e16]) == 1.0
n = 0; mu = 0.0; M2 = 0.0
xs = [1e9 + 1, 1e9 + 2, 1e9 + 3]
for x in xs:
    n += 1
    delta = x - mu
    mu += delta / n
    M2 += delta * (x - mu)
assert abs(M2 / (n - 1) - np.var(xs, ddof=1)) < 1e-12
# Check the shape and pairing underlying the PyTorch loss-broadcast question.
pred = np.array([[1.0], [2.0], [3.0]])
target = np.array([1.0, 2.0, 3.0])
assert (pred - target).shape == (3, 3)
assert (pred - target.reshape(3, 1)).shape == (3, 1)
assert np.mean((pred - target.reshape(3, 1)) ** 2) == 0
print('PASS')`]);
assert.equal(scientific.status, 0, scientific.stderr);

const scratch = mkdtempSync(join(tmpdir(), 'quantapp-code-'));
const headers = '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <memory>\n#include <span>\n#include <limits>\n';
try {
  const outputs: [string, string][] = [
    ['prog-reference-alias', ''], ['prog-integer-division', ''],
    ['prog-sort-unique', 'std::cout << v.size();'],
    ['prog-virtual-dispatch', 'std::cout << b.f();'], ['prog-lambda-copy', ''],
  ];
  for (const [id, suffix] of outputs) {
    const source = join(scratch, id + '.cpp');
    const binary = join(scratch, id);
    writeFileSync(source, headers + 'int main() {\n' + snippet(id).code + '\n' + suffix + '\n}\n');
    const compiled = run('g++', ['-std=c++20', '-Wall', '-Wextra', '-pedantic-errors', source, '-o', binary]);
    assert.equal(compiled.status, 0, id + ': ' + compiled.stderr);
    const result = run(binary, []);
    assert.equal(result.status, 0, id);
    checkOutput(id, result.stdout);
  }
  for (const id of ['prog-const-reference', 'prog-unique-move']) {
    const source = join(scratch, id + '.cpp');
    writeFileSync(source, headers + 'int main() {\n' + snippet(id).code + '\n}\n');
    assert.notEqual(run('g++', ['-std=c++20', '-pedantic-errors', '-fsyntax-only', source]).status, 0, id);
  }
  for (const id of ['prog-dangling-reference', 'prog-span-lifetime', 'prog-signed-overflow']) {
    const source = join(scratch, id + '.cpp');
    const code = snippet(id).code;
    writeFileSync(source, headers + (id === 'prog-signed-overflow'
      ? 'int main() {\n' + code + '\n}\n' : code + '\nint main() {}\n'));
    // Acceptance is separate from run-time validity. Do not build/run a UB test binary.
    assert.equal(run('g++', ['-std=c++20', '-Wall', '-Wextra', '-pedantic-errors', '-fsyntax-only', source]).status, 0, id);
  }
} finally { rmSync(scratch, { recursive: true, force: true }); }
console.log('PASS: 7 Python/NumPy outputs, Python IndexError, 5 C++20 outputs, 2 required compilation failures, and 3 syntax-only lifetime/overflow examples.');
console.log('PASS: pairwise shapes, stable summation, centred sample variance and equivalent NumPy loss pairing. PyTorch API examples are documentation-checked; PyTorch is not installed.');
