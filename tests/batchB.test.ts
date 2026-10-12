import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import batch from '../src/features/quick-practice/data/bank/batch-b.ts';
import references from '../src/data/knowledge/batch-b.ts';
import { questions } from '../src/features/quick-practice/data/questions.ts';

const allocation = [
  ['Probability','Independence',1,0,1], ['Probability','Probability spaces',0,1,0], ['Probability','Laws of large numbers',0,1,0],
  ['Statistics','Estimation',1,0,0], ['Statistics','Maximum likelihood',1,0,0], ['Statistics','Sufficiency',1,1,0],
  ['Statistics','Hypothesis testing',1,1,0], ['Statistics','Confidence intervals',0,1,0], ['Statistics','Regression',1,0,0],
  ['Measure Theory','Sigma-algebras',0,1,0], ['Measure Theory','Measures',1,1,0], ['Measure Theory','Radon-Nikodym theorem',1,1,0],
  ['Measure Theory','Probability measures',1,0,0], ['Measure Theory','Lebesgue integration',0,1,0], ['Measure Theory','Product measures',0,0,1],
  ['Stochastic Processes','General definitions',1,0,0], ['Stochastic Processes','Markov chains',0,2,1],
  ['Stochastic Processes','Continuous-time Markov chains',0,1,1],
  ['Stochastic Calculus','Stochastic integration',0,1,0], ['Stochastic Calculus','Ito integral',1,0,0],
  ['Stochastic Calculus','Stochastic differential equations',1,0,0], ['Stochastic Calculus','Strong and weak solutions',0,1,0],
] as const;
test('Batch B uses its 30 planned topic slots, 4/8/8/6/4 subjects and 12/14/4 difficulties',()=>{
  assert.equal(batch.length,30); assert.equal(references.length,28);
  assert.deepEqual(['Probability','Statistics','Measure Theory','Stochastic Processes','Stochastic Calculus'].map(c=>batch.filter(q=>q.category===c).length),[4,8,8,6,4]);
  assert.deepEqual(['easy','medium','hard'].map(d=>batch.filter(q=>q.difficulty===d).length),[12,14,4]);
  for(const [category,subcategory,...expected] of allocation) {
    const selected=batch.filter(q=>q.category===category && q.subcategory===subcategory);
    assert.deepEqual(['easy','medium','hard'].map(d=>selected.filter(q=>q.difficulty===d).length),expected,`${category}/${subcategory}`);
  }
  for(const q of batch) {assert.ok(q.explanation.trim());assert.ok(q.knowledgeIds.length);}
});
test('accepted bank stays within historical per-topic total budgets (difficulty recalibrated by audit)',()=>{
  const map=readFileSync('CURRICULUM_MAP.md','utf8');
  const topics=[...map.matchAll(/### ([A-Z]+\d+) — (.*?)\n([\s\S]*?)(?=\n### |\n## )/g)];
  assert.equal(topics.length,59);
  for(const [,code,subcategory,body] of topics) {
    const category=code.startsWith('SP')?'Stochastic Processes':code.startsWith('SC')?'Stochastic Calculus':code.startsWith('P')?'Probability':code.startsWith('S')?'Statistics':'Measure Theory';
    const match=body.match(/Target: \d+ \((\d+)\/(\d+)\/(\d+)\)/); assert.ok(match,code);
    assert.ok(questions.filter(q=>!q.id.startsWith('s2-') && q.category===category && q.subcategory===subcategory).length <= Number(match[1])+Number(match[2])+Number(match[3]),`${code} total budget`);
  }
});
const question=(id:string)=>{const q=batch.find(q=>q.id===id);assert.ok(q,id);return q;};
test('Batch B density and stationary-law choices satisfy the defining equations uniquely',()=>{
  const density=question('measure-discrete-rn-density');
  const values:Record<string,number[]>={'$(1/2,3)$':[0.5,3],'$(2,1/3)$':[2,1/3],'$(1,3)$':[1,3],'$(1/4,3/4)$':[0.25,0.75]};
  assert.deepEqual(density.answers.flatMap((a,i)=>{assert.ok(values[a]);const [x,y]=values[a];return x*2===1 && y===3?[i]:[];}),[density.correctAnswer]);
  const stationary=question('process-stationary-two-state-balance');
  const vectors:Record<string,number[]>={'$(3/5,2/5)$':[0.6,0.4],'$(2/5,3/5)$':[0.4,0.6],'$(1/2,1/2)$':[0.5,0.5],'$(1/3,2/3)$':[1/3,2/3]};
  assert.deepEqual(stationary.answers.flatMap((a,i)=>{assert.ok(vectors[a]);const [x,y]=vectors[a];return Math.abs(x/3-y/2)<1e-12?[i]:[];}),[stationary.correctAnswer]);
});
test('Batch B dependence and nonreversibility counterexamples survive finite enumeration',()=>{
  // Alternate two independent events forever: neighbours are independent, but the union has mass 3/4.
  const outcomes=[[0,0],[0,1],[1,0],[1,1]];
  assert.equal(outcomes.filter(([a,b])=>a&&b).length/4,0.25);
  assert.equal(outcomes.filter(([a,b])=>a||b).length/4,0.75);
  const dependent=question('prob-dependent-average-failure');
  for(const z of [-1,1])assert.equal(Array(10).fill(z).reduce((a,b)=>a+b)/10,z);
  assert.match(dependent.answers[dependent.correctAnswer],/does not converge in probability/);
  const transition=[[0,1,0],[0,0,1],[1,0,0]],pi=[1/3,1/3,1/3];
  assert.deepEqual(pi.map((_,j)=>pi.reduce((s,p,i)=>s+p*transition[i][j],0)),pi);
  assert.notEqual(pi[0]*transition[0][1],pi[1]*transition[1][0]);
  const cycle=question('process-stationary-not-reversible');assert.match(cycle.answers[cycle.correctAnswer],/stationary, but detailed balance fails/);
});
