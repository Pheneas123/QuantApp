// Only the bounded, reviewed snippets below are executed. The UB example is syntax-checked only.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stage2Questions } from '../src/features/quick-practice/data/bank/stage2';
import { textSegments } from '../src/components/textSegments';
const question=(slug:string)=>{const q=stage2Questions.find(q=>q.id==='s2-'+slug);assert.ok(q,slug);return q;};
const snippet=(slug:string)=>{const blocks=textSegments(question(slug).prompt).filter(s=>s.kind==='code');assert.equal(blocks.length,1,slug);return blocks[0].text;};
function run(cmd:string,args:string[]){const r=spawnSync(cmd,args,{encoding:'utf8',timeout:15_000,maxBuffer:128*1024});assert.ifError(r.error);assert.equal(r.signal,null,cmd);return r;}
function output(slug:string,actual:string){const q=question(slug);assert.deepEqual(q.answers.flatMap((a,i)=>a===actual.trim()?[i]:[]),[q.correctAnswer],slug);}
const py=['prog-context-suppression','prog-generator-live-list','prog-deepcopy-alias-graph','prog-numpy-copy-versus-view','prog-numpy-repeated-index','prog-numpy-reduction-shape'];
for(const id of py){const r=run('python3',['-I','-c',snippet(id)]);assert.equal(r.status,0,r.stderr);output(id,r.stdout);}
const key=run('python3',['-I','-c',snippet('prog-tuple-key-hashability')]);assert.notEqual(key.status,0);assert.equal(key.stdout,'');assert.match(key.stderr,/TypeError:.*unhashable type: 'list'/);
const scientific=run('python3',['-I','-c',`import numpy as np, math, importlib.util
xs = [0, 2, 0, 3, 0]; alias = xs
xs[:] = [x for x in xs if x != 0]
assert xs is alias and alias == [2, 3]
# Geometric work: count inner iterations; n <= work < 2n for many n.
for n in range(1, 200):
    i, work = n, 0
    while i > 0:
        work += i
        i //= 2
    assert n <= work < 2*n
# The centred merge identity is cross-checked against direct recentering.
for a, b in [([1, 3], [7, 10, 12]), ([1e9+1, 1e9+2], [1e9+3, 1e9+5])]:
    a, b = np.array(a), np.array(b)
    na, nb, ma, mb = len(a), len(b), a.mean(), b.mean()
    combined = ((a-ma)**2).sum()+((b-mb)**2).sum()+(mb-ma)**2*na*nb/(na+nb)
    all_x = np.concatenate([a,b])
    assert abs(combined-((all_x-all_x.mean())**2).sum()) < 1e-10
stable = 1001 + math.log1p(math.exp(-1))
assert abs(stable-1001.3132616875182) < 1e-12
try:
    math.exp(1000)
except OverflowError:
    pass
else:
    raise AssertionError('expected binary64 overflow')
${snippet('ml-nan-mask-loss')}
assert np.isnan(wrong)
assert ((pred[mask]-target[mask])**2).mean() == 2.5
assert np.nansum((pred-target)**2)/len(pred) == 5/3
# Matrix posterior via an independent Schur complement implementation.
cov = np.array([[1.,0.,1.],[0.,1.,1.],[1.,1.,4.]])
post = cov[:2,:2]-cov[:2,2:]@np.linalg.solve(cov[2:,2:],cov[2:,:2])
assert np.allclose(post, [[.75,-.25],[-.25,.75]])
H=np.array([[4.,2.],[2.,4.]]); D=np.diag([1.,2.])
assert np.allclose(np.linalg.eigvals(D@H), [6-2*math.sqrt(3),6+2*math.sqrt(3)])
assert np.allclose(np.linalg.solve(np.diag([1.,4.])+np.eye(2),[2.,8.]), [1.,8/5])
# Finite differences independently verify hinge, softmax and score gradients.
def difference(f,x):
    h=1e-5
    return (f(x+h)-f(x-h))/(2*h)
assert abs(difference(lambda theta: 2/(1+math.exp(-theta)), math.log(1/3))-3/8) < 1e-9
z=np.array([.2,-.3,1.]); target=1
p=np.exp(z)/np.exp(z).sum()
for j in range(3):
    def loss(x):
        v=z.copy();v[j]=x
        return np.log(np.exp(v).sum())-v[target]
    assert abs(difference(loss,z[j])-(p[j]-(j==target))) < 1e-9
# Four-example mean gradient, independently computed as derivatives of scalar MSE.
x=np.array([1.,2.,3.,4.]); y=np.array([0.,1.,0.,1.]); w=.5
g=2*x*(w*x-y)
assert np.isclose(g[:1].mean()/4+3*g[1:].mean()/4,g.mean())
assert not np.isclose((g[:1].mean()+g[1:].mean())/2,g.mean())
if importlib.util.find_spec('torch') is None:
    print('PyTorch unavailable: NumPy algebra checked; official API contracts reviewed, no PyTorch execution.')
else:
    import torch
    logits=torch.tensor([[1.,2.,3.],[2.,1.,0.]],requires_grad=True)
    targets=torch.tensor([2,0],dtype=torch.long)
    loss=torch.nn.functional.cross_entropy(logits,targets)
    assert torch.isfinite(loss)
    loss.backward();assert logits.grad.shape == (2,3)
    layer=torch.nn.Conv2d(3,4,3,stride=2,padding=1,bias=True)
    assert layer(torch.zeros(2,3,7,7)).shape == (2,4,4,4)
    assert sum(p.numel() for p in layer.parameters()) == 112
    print('PyTorch available: multiclass loss/backward and convolution executed.')
print('PASS: scientific checks')`]);assert.equal(scientific.status,0,scientific.stderr);console.log(scientific.stdout.trim());
const scratch=mkdtempSync(join(tmpdir(),'quant-stage2-code-'));
const headers='#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <functional>\n#include <map>\n#include <memory>\n#include <utility>\n';
try {
 const outputs=['prog-pointer-reference-rebinding','prog-negative-division','prog-map-insertion','prog-descending-search-range','prog-construction-dispatch','prog-aliasing-shared-owner','prog-unique-move-replacement','prog-perfect-forwarding','prog-move-from-const'];
 const complete=new Set(['prog-construction-dispatch','prog-unique-move-replacement','prog-perfect-forwarding','prog-move-from-const']);
 for(const id of outputs){const source=join(scratch,id+'.cpp'),binary=join(scratch,id),code=snippet(id);writeFileSync(source,headers+(complete.has(id)?code:'int main() {\n'+code+'\n}\n'));const compiled=run('g++',['-std=c++20','-Wall','-Wextra','-pedantic-errors',source,'-o',binary]);assert.equal(compiled.status,0,compiled.stderr);const result=run(binary,[]);assert.equal(result.status,0,result.stderr);output(id,result.stdout);}
 for(const [id,diagnostic] of [['prog-const-pointer-error',/read-only|const/],['prog-move-only-function-target',/copy.constructible|deleted/]] as const){const source=join(scratch,id+'.cpp');writeFileSync(source,headers+'int main() {\n'+snippet(id)+'\n}\n');const compiled=run('g++',['-std=c++20','-Wall','-Wextra','-pedantic-errors','-fsyntax-only',source]);assert.notEqual(compiled.status,0,id);assert.match(compiled.stderr,diagnostic);}
 const ub=join(scratch,'reserve.cpp');writeFileSync(ub,headers+'int main() {\n'+snippet('prog-reserve-not-size')+'\n}\n');assert.equal(run('g++',['-std=c++20','-Wall','-Wextra','-pedantic-errors','-fsyntax-only',ub]).status,0); // Never execute UB.
 const repaired=join(scratch,'repair.cpp'),binary=join(scratch,'repair');writeFileSync(repaired,headers+'int main() {\nstd::vector<int> v{2,4,1,6,3,8};auto it=v.begin();\n'+snippet('prog-erase-loop-fix').replace('NEXT','it = v.erase(it)')+'\nfor(int x:v)std::cout<<x<<" ";\n}\n');assert.equal(run('g++',['-std=c++20','-Wall','-Wextra','-pedantic-errors',repaired,'-o',binary]).status,0);assert.equal(run(binary,[]).stdout.trim(),'1 3');
} finally {rmSync(scratch,{recursive:true,force:true});}
console.log('PASS: 6 Python/NumPy outputs, Python TypeError, 9 C++20 outputs, 2 required compilation failures, iterator repair and 1 syntax-only UB example.');
