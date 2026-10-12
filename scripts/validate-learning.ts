import { questions } from '../src/features/quick-practice/data/questions';
import { objectives,guidedProblems,writtenProblems,quickMappings } from '../src/features/learning/data';
import { choiceIdentity } from '../src/features/learning/schema';
const ids=new Set(objectives.map(o=>o.id)),questionIds=new Set(questions.map(q=>q.id));
for(const [id,mapping] of Object.entries(quickMappings)) {
 if(!questionIds.has(id))throw Error(`Unknown mapped question: ${id}`);
 if(!Array.isArray(mapping.objectiveIds)||new Set(mapping.objectiveIds).size!==mapping.objectiveIds.length||mapping.objectiveIds.some(id=>!ids.has(id)))throw Error(`Invalid objective mapping: ${id}`);
}
for(const q of questions){
 if(!q.explanation?.trim())throw Error(`Missing explanation: ${q.id}`);
 if(new Set(q.answers.map(choiceIdentity)).size!==4)throw Error(`Potentially equivalent choices: ${q.id}`);
 for(const id of [...(q.objectiveIds??[]),...(q.prerequisiteIds??[])])if(!ids.has(id))throw Error(`Missing objective: ${q.id}/${id}`);
}
const all=[...questions.map(q=>`quick:${q.id}`),...guidedProblems.map(q=>`guided:${q.id}`),...writtenProblems.map(q=>`written:${q.id}`)];
if(new Set(all).size!==all.length)throw Error('Duplicate mode identity');
console.log(`Validated ${objectives.length} learning objectives, ${objectives.reduce((n,o)=>n+(o.prerequisiteIds?.length??0),0)} prerequisite edges, ${guidedProblems.length} Guided and ${writtenProblems.length} Written Problems.`);
