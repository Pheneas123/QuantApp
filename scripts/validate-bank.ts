import { knowledge } from '../src/data/knowledge/index.ts';
import { questions, categories } from '../src/features/quick-practice/data/questions.ts';
console.log(`Validated ${questions.length} questions across ${categories.length} categories.`);
console.log(`Validated ${knowledge.length} knowledge objects; ${questions.filter(q => q.knowledgeIds?.length).length} questions linked.`);
