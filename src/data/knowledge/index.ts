import remediation from './remediation';
import stage2 from './stage2';
import foundations from './foundations';
import processes from './processes';
import calculus from './calculus';
import statistics from './statistics';
import batchA from './batch-a';
import batchB from './batch-b';
import programming from './programming';
import machineLearning from './machine-learning';
import { validateKnowledgeBank, type KnowledgeObject } from './schema';

export { knowledgeTypes, knowledgeTypeLabels, validateKnowledgeBank } from './schema';
export type { KnowledgeObject, KnowledgeType } from './schema';
export const knowledge: KnowledgeObject[] = [...foundations, ...processes, ...calculus, ...statistics, ...batchA, ...batchB, ...programming, ...machineLearning, ...remediation, ...stage2];
validateKnowledgeBank(knowledge);
export const knowledgeById = new Map(knowledge.map(entry => [entry.id, entry]));
export const knowledgeIdSet: ReadonlySet<string> = new Set(knowledgeById.keys());
