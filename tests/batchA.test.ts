import test from 'node:test';
import assert from 'node:assert/strict';
import batch from '../src/features/quick-practice/data/bank/batch-a.ts';
import references from '../src/data/knowledge/batch-a.ts';

test('Batch A preserves its exact curriculum allocation and reference requirements', () => {
  const expected = [
    ['Probability','Conditional expectation',1,3,0], ['Probability','Modes of convergence',1,3,0],
    ['Measure Theory','Convergence theorems',0,2,2], ['Measure Theory','Product measures',1,1,0],
    ['Stochastic Processes','Martingales',1,1,1], ['Stochastic Processes','Stopping times',1,2,1],
    ['Stochastic Processes','Filtrations',0,1,0], ['Stochastic Calculus','Quadratic variation',1,2,0],
    ['Stochastic Calculus','Ito integral',0,1,1], ['Stochastic Calculus','Stochastic integration',0,1,0],
    ['Stochastic Calculus','Local martingales',0,2,0],
  ];
  assert.equal(batch.length,30);
  assert.equal(references.length,22);
  for (const [category,subcategory,...counts] of expected) {
    const items=batch.filter(q=>q.category===category && q.subcategory===subcategory);
    assert.deepEqual(['easy','medium','hard'].map(d=>items.filter(q=>q.difficulty===d).length),counts,`${category}/${subcategory}`);
  }
  for(const q of batch) { assert.ok(q.explanation.trim()); assert.ok(q.knowledgeIds.length); }
});
const answer=(id:string)=>{ const q=batch.find(q=>q.id===id)!; assert.ok(q,id); return q.answers[q.correctAnswer]; };
test('Batch A finite partition, parity and bounded-walk calculations agree with enumeration',()=>{
  const cells=[[0,2],[4,6]];
  assert.equal(answer('prob-ce-partition-mean'),cells.map(c=>c.reduce((a,b)=>a+b)/c.length).join(' and ')+'.');
  for(const parity of [0,1]) {
    const pairs=[[0,0],[0,1],[1,0],[1,1]].filter(([u,v])=>(u+v)%2===parity);
    assert.equal(pairs.reduce((s,[u])=>s+u,0)/pairs.length,0.5);
  }
  assert.equal(answer('prob-ce-nonnested-tower'), '$(1/2,U)$');
  let secondMoment=0;
  for(let path=0;path<8;path++) {let s=0;for(let n=0;n<3;n++){s+=(path>>n)&1?1:-1;if(Math.abs(s)===2)break;}secondMoment+=s*s/8;}
  assert.equal(secondMoment,2.5);
  assert.equal(answer('process-bounded-walk-square'),'$5/2$');
});
