import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import ts from 'typescript';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { knowledge } from '../src/data/knowledge/index.ts';
import { americanProseWords } from '../scripts/content-style.ts';

test('authored bank/reference prose uses the curated British-English standard', () => {
  for (const q of questions) for (const text of [q.prompt,...q.answers,q.explanation,q.workedSolution,...(q.tags ?? [])]) {
    assert.deepEqual(americanProseWords(text ?? ''),[],q.id);
  }
  for (const k of knowledge) for (const text of [k.name,k.statement,k.assumptions,k.conclusion,k.intuition,k.notation,...(k.tags ?? [])]) {
    assert.deepEqual(americanProseWords(text ?? ''),[],k.id);
  }
});
test('UI text uses British English without auditing code identifiers or CSS properties', () => {
  // JSX prose and literal strings only; excludes identifiers such as color and APIs.
  for (const file of readdirSync('src',{recursive:true}).filter(f=>typeof f==='string' && f.endsWith('.tsx'))) {
    const source=ts.createSourceFile(String(file),readFileSync('src/'+file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    function visit(node:ts.Node) {
      if(ts.isJsxText(node)||ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)) {
        assert.deepEqual(americanProseWords(node.text),[],String(file)+': '+node.text);
      }
      ts.forEachChild(node,visit);
    }
    visit(source);
  }
});
test('style guard preserves mathematics, exact proper names and source quotations', () => {
  assert.deepEqual(americanProseWords('localizing centered normalization behaviour'),['localizing','centered','normalization']);
  assert.deepEqual(americanProseWords('$center$ $$\\operatorname{normalize}(x)$$ \\(color\\) \\[modeling\\]'),[]);
  const title='Markov Processes: Characterization and Convergence';
  assert.deepEqual(americanProseWords(title,[title]),[]);
  assert.deepEqual(americanProseWords('Lévy, Itô, Radon–Nikodym, size, eigenvalue, analyse'),[]);
  assert.deepEqual(americanProseWords('Code:\n```python\ncolor = "center"\n```\nAnalyse the behaviour.'),[]);
});
