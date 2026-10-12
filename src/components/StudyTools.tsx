import { useEffect, useState } from 'react';
import { objectives } from '../features/learning/data/objectives';
import { knowledgeById } from '../data/knowledge';
import { keys, readRecords, saveSafely, toggleFlag, type Flag } from '../features/learning/storage';
import { itemKey, type ItemIdentity } from '../features/learning/schema';
import { useLearningData } from '../features/learning/useLearningData';
export function StudyTools({identity,objectiveIds=[],prerequisiteIds=[],knowledgeIds=[],onPractise,onReference}:{identity:ItemIdentity;objectiveIds?:string[];prerequisiteIds?:string[];knowledgeIds?:string[];onPractise?:(objectiveId:string)=>void;onReference?:(id:string)=>void}) {
 useLearningData();const [flagged,setFlagged]=useState(false);
 useEffect(()=>{setFlagged(readRecords<Flag>(keys.flags).some(f=>f.id===itemKey(identity)));});
 const prerequisites=[...new Set([...prerequisiteIds,...objectiveIds.flatMap(id=>objectives.find(o=>o.id===id)?.prerequisiteIds??[])])];
 return <div className="study-tools"><button className="text-button" data-study-control aria-pressed={flagged} onClick={()=>{if(saveSafely(()=>toggleFlag(identity)))setFlagged(v=>!v);}}>{flagged?'Unflag':'Flag for later'}</button>
 {!!(objectiveIds.length||prerequisites.length)&&<details><summary>Learning objectives and prerequisites</summary>{objectiveIds.map(id=><p key={id}>{objectives.find(o=>o.id===id)?.description??id}</p>)}{prerequisites.map(id=>{const o=objectives.find(o=>o.id===id);return <div key={id}><strong>Assumes: </strong>{o?.description??id}{o?.knowledgeIds?.map(k=><button className="text-button" key={k} onClick={()=>onReference?.(k)}>{knowledgeById.get(k)?.name}</button>)}{onPractise&&<button className="text-button" onClick={()=>onPractise(id)}>Practise this foundation</button>}</div>;})}</details>}{!!knowledgeIds.length&&onReference&&<details><summary>Supporting references</summary>{knowledgeIds.map(id=><button key={id} className="text-button" onClick={()=>onReference(id)}>{knowledgeById.get(id)?.name??id}</button>)}</details>}</div>;
}
