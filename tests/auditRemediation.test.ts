import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { questions } from '../src/features/quick-practice/data/questions';
import { knowledge } from '../src/data/knowledge';
const hash=(value:unknown)=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
test('academic remediation retains all canonical keys, correct meanings and original references',()=>{
 assert.equal(questions.length,450);
 assert.equal(hash(questions.slice(0,330).map(q=>[q.id,q.correctAnswer,q.answers[q.correctAnswer]])),'b88306f8e89082b442eb7339d7cc3662b41d0d3b5d2b0c18fd6cbc557138ca3e');
 assert.equal(hash(knowledge.slice(0,122)),'c04a9512b1c1537cb67b674f10f6c24963b44d44d0787ba64309ed786764cee5');
 assert.equal(knowledge.length,170);
});
test('standalone prompts carry the audited uniqueness, filtration, dtype and timing conditions',()=>{
 const q=(id:string)=>questions.find(q=>q.id===id)!;
 assert.match(q('prog-binary-search').prompt,/tightest asymptotic upper bound/);
 assert.match(q('ml-loss-broadcast-bug').prompt,/real floating-point tensors on the same device/);
 assert.match(q('prob-025').prompt,/finite rows.*k_n/);assert.match(q('prob-025').prompt,/0<s_n/);assert.match(q('prob-025').prompt,/\\infty/);
 for(const id of ['calc-008','calc-009','calc-018','calc-019'])assert.match(q(id).prompt,/Brownian motion relative to/);
 assert.match(q('calc-024').prompt,/true-martingale.*integrable/);
 for(const id of ['prog-sort-unique','prog-lambda-copy'])assert.match(q(id).prompt,/inside main/);
 assert.match(q('fin-options-early-call').prompt,/strictly positive strike/);
 assert.match(q('fin-micro-adverse-selection').prompt,/Ignore funding, discounting and inventory carry/);
 const report=readFileSync('docs/AUDIT_REMEDIATION.md','utf8');assert.equal((report.match(/^\| `[^`]+` \|/gm)??[]).length,47);
});
