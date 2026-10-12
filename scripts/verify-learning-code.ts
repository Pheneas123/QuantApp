// Reviewed static solution snippets only. No uploaded/user answer is executed.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync,writeFileSync,rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { guidedProblems,writtenProblems } from '../src/features/learning/data';
import { textSegments } from '../src/components/textSegments';
const python=writtenProblems.find(p=>p.id==='written-python-default')!;
const py=textSegments(python.solution).filter(s=>s.kind==='code');assert.equal(py.length,1);
const result=spawnSync('python3',['-I','-c',py[0].text],{encoding:'utf8',timeout:10_000,maxBuffer:128*1024});assert.ifError(result.error);assert.equal(result.status,0,result.stderr);
const cpp=guidedProblems.find(p=>p.id==='guided-cpp-unique')!;const code=textSegments(cpp.solution).filter(s=>s.kind==='code');assert.equal(code.length,1);
const scratch=mkdtempSync(join(tmpdir(),'quant-learning-code-'));
try{const source=join(scratch,'unique.cpp'),binary=join(scratch,'unique');writeFileSync(source,code[0].text);const compiled=spawnSync('g++',['-std=c++20','-Wall','-Wextra','-pedantic-errors',source,'-o',binary],{encoding:'utf8',timeout:10_000,maxBuffer:128*1024});assert.ifError(compiled.error);assert.equal(compiled.status,0,compiled.stderr);const run=spawnSync(binary,[],{encoding:'utf8',timeout:10_000,maxBuffer:128*1024});assert.ifError(run.error);assert.equal(run.status,0);assert.equal(run.stdout.trim(),'1 2 3');}finally{rmSync(scratch,{recursive:true,force:true});}
console.log('PASS: written Python default repair assertions and Guided C++20 distinct-vector solution compiled/executed.');
