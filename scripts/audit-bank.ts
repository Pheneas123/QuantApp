import { questions, categories, difficulties, questionTypes } from '../src/features/quick-practice/data/questions.ts';

// Editorial signals only: LaTeX source length is not rendered width or mathematical quality.
console.table(categories.map(category => ({
  category, total: questions.filter(q => q.category === category).length,
  ...Object.fromEntries(difficulties.map(difficulty => [difficulty,
    questions.filter(q => q.category === category && q.difficulty === difficulty).length])),
})));
console.table(questionTypes.map(type => ({ type, count: questions.filter(q => q.questionType === type).length })));
const flags = questions.flatMap(q => {
  const lengths = q.answers.map(a => a.trim().length);
  const min = Math.min(...lengths), max = Math.max(...lengths);
  return max > min * 1.8 && max - min > 40
    ? [{ id: q.id, lengths: lengths.join('/'), correct: q.correctAnswer + 1 }] : [];
});
console.log('Nonblocking answer-length review (source characters, max/min > 1.8 and difference > 40):');
console.table(flags);
const uniqueLongest = questions.filter(q => {
  const lengths = q.answers.map(a => a.length);
  return lengths[q.correctAnswer] === Math.max(...lengths) && lengths.filter(n => n === Math.max(...lengths)).length === 1;
});
console.log(`Correct answer is uniquely longest in ${uniqueLongest.length}/${questions.length} questions. Review wording; this is not a correctness test.`);
console.log('Canonical correct positions:', [0, 1, 2, 3].map(i => questions.filter(q => q.correctAnswer === i).length).join('/'));
