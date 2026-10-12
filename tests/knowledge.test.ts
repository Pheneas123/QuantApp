import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { knowledge, knowledgeTypes, knowledgeIdSet, validateKnowledgeBank } from '../src/data/knowledge/index.ts';
import { questions } from '../src/features/quick-practice/data/questions.ts';
import { validateMultipleChoiceBank } from '../src/features/quick-practice/data/schema.ts';
import { defaultReferenceFilters, filterKnowledge, referenceSubcategories } from '../src/features/reference/filtering.ts';

test('reference bank and question links validate together, including all six types', () => {
  assert.equal(knowledge.length, 170);
  assert.equal(questions.length, 450);
  validateKnowledgeBank(knowledge);
  validateMultipleChoiceBank(questions);
  assert.equal(questions.filter(q => q.knowledgeIds?.length).length, 313);
  for (const type of knowledgeTypes) assert.ok(knowledge.some(k => k.type === type));
  for (const entry of knowledge) {
    for (const text of [entry.name, entry.statement, entry.assumptions, entry.conclusion, entry.intuition, entry.notation]) {
      for (const match of (text ?? '').matchAll(/\$\$([\s\S]*?)\$\$|\$([^$]*?)\$/g)) {
        assert.doesNotThrow(() => katex.renderToString(match[1] ?? match[2], { throwOnError: true }), entry.id);
      }
    }
  }
});
test('knowledge validation rejects malformed content, taxonomy, duplicate IDs and missing edges', () => {
  const sample = knowledge[0];
  for (const [field,value] of [
    ['id',''],['name',' '],['statement',''],['type','formula'],['category','unknown'],['subcategory','Sufficiency'],
    ['difficulty','hard'],['assumptions',''],['tags',['']],['notation',42],['relatedKnowledgeIds','x'],
    ['relatedKnowledgeIds',['unknown']],['relatedKnowledgeIds',[sample.id]],['relatedKnowledgeIds',['def-sigma-algebra','def-sigma-algebra']],
  ] as const) assert.throws(() => validateKnowledgeBank([{...sample,[field]:value}]), new RegExp(field));
  assert.throws(() => validateKnowledgeBank([sample,sample]), /duplicate knowledge ID/);
  assert.throws(() => validateKnowledgeBank({}), /expected an array/);
  assert.throws(() => validateKnowledgeBank([null]), /expected an object/);
  const {relatedKnowledgeIds:_,...withoutLinks}=sample;
  assert.doesNotThrow(() => validateKnowledgeBank([withoutLinks]));
});
test('question knowledge IDs are optional but must name distinct existing references', () => {
  const sample={...questions[0]};
  delete sample.knowledgeIds;
  validateMultipleChoiceBank([sample]);
  validateMultipleChoiceBank([{...sample,knowledgeIds:['def-stopping-time']}]);
  for(const knowledgeIds of ['def-stopping-time',[''],['missing'],['def-stopping-time','def-stopping-time']]) {
    assert.throws(()=>validateMultipleChoiceBank([{...sample,knowledgeIds}]), /knowledgeIds/);
  }
  assert.throws(()=>validateMultipleChoiceBank([{...sample,knowledgeIds:['def-stopping-time']}],new Set()), /missing reference target/);
  assert.ok(knowledgeIdSet.has('thm-dambis-dubins-schwarz'));
});
test('reference category, subcategory and type filters combine and expose empty results', () => {
  assert.equal(filterKnowledge(knowledge,defaultReferenceFilters).length,knowledge.length);
  const filters={category:'Stochastic Processes' as const,subcategory:'Stopping times',type:'definition' as const};
  assert.deepEqual(filterKnowledge(knowledge,filters).map(k=>k.id),['def-stopping-time','def-stopped-sigma-algebra']);
  assert.equal(filterKnowledge(knowledge,{...filters,type:'corollary'}).length,0);
  assert.deepEqual(referenceSubcategories(knowledge,'All'),[]);
  assert.ok(referenceSubcategories(knowledge,'Stochastic Calculus').includes('Continuous martingales'));
});
