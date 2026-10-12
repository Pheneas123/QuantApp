import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, categories, curriculum, difficulties, questionTypes } from '../src/features/quick-practice/data/questions.ts';
import { validateMultipleChoiceBank } from '../src/features/quick-practice/data/schema.ts';
import { selectQuestions, statuses, parseAttempts } from '../src/features/quick-practice/progress.ts';

const sample = () => structuredClone(questions[0]);
test('curriculum and fixtures cover every subject, difficulty and question type', () => {
  assert.equal(categories.length, 8);
  assert.deepEqual(categories.map(c => curriculum[c].length), [12, 9, 9, 12, 17, 10, 10, 10]);
  assert.equal(questions.length, 450);
  assert.doesNotThrow(() => validateMultipleChoiceBank(questions));
  for (const category of categories) {
    assert.equal(questions.filter(q => q.category === category).length, [50, 50, 50, 50, 50, 100, 50, 50][categories.indexOf(category)]);
    assert.ok(new Set(questions.filter(q => q.category === category).map(q => q.subcategory)).size >= 3);
    for (const difficulty of difficulties) {
      const selected = selectQuestions(questions, category, difficulty, false, []);
      assert.equal(selected.length, questions.filter(q => q.category === category && q.difficulty === difficulty).length);
      assert.ok(selected.every(q => q.category === category && q.difficulty === difficulty));
    }
  }
  for (const type of questionTypes) assert.ok(questions.some(q => q.questionType === type), type);
});
test('optional fields can be omitted and variants keep independent status', () => {
  const q = sample();
  delete q.explanation;
  assert.doesNotThrow(() => validateMultipleChoiceBank([q]));
  const variants = questions.filter(q => q.familyId === 'escaping-mass');
  assert.equal(variants.length, 2);
  const history = parseAttempts(JSON.stringify([{id:'old-attempt',questionId:variants[0].id,selectedAnswer:0,correct:false,at:'2026-01-01T00:00:00Z'}]));
  assert.equal(statuses(history).get(variants[0].id), 'incorrect');
  assert.equal(statuses(history).get(variants[1].id), undefined);
  assert.deepEqual(selectQuestions(questions, 'All', 'All', true, history).map(q => q.id), [variants[0].id]);
});
test('invalid data reports question ID and field, including errors across files', () => {
  const cases: [string, unknown][] = [
    ['id', ' '], ['category','Unknown'], ['subcategory','Stopping times'],
    ['difficulty','Easy'], ['difficulty','phd'], ['questionType','multiple_choice'],
    ['prompt',''], ['answers',undefined], ['correctAnswer',undefined], ['answers',['A','B','C']], ['answers',['A','B','C','D','E']],
    ['answers',['A','B','C',' ']], ['answers',['A','A','C','D']],
    ['correctAnswer',4], ['correctAnswer',-1], ['correctAnswer',1.5], ['correctAnswer','A'],
    ['explanation',9], ['workedSolution',''], ['tags','tag'], ['tags',['']], ['familyId',42],
    ['undergraduate',true],
  ];
  for (const [field,value] of cases) {
    assert.throws(() => validateMultipleChoiceBank([{...sample(),[field]:value}]), error => {
      assert.ok(error instanceof Error);
      assert.ok(error.message.includes(`.${field}:`), error.message);
      if (field !== 'id') assert.ok(error.message.includes('prob-001'));
      return true;
    });
  }
  assert.throws(() => validateMultipleChoiceBank([sample(), sample()]), /duplicate question ID/);
  assert.throws(() => validateMultipleChoiceBank([sample(), {...sample(), id: 'duplicate-prompt', prompt: `  ${sample().prompt}  `}]), /duplicate question text/);
  assert.throws(() => validateMultipleChoiceBank({}), /expected an array/);
  assert.throws(() => validateMultipleChoiceBank([null]), /expected a question object/);
  const { questionType: _, ...missing } = sample();
  assert.throws(() => validateMultipleChoiceBank([missing]), /questionType/);
});
