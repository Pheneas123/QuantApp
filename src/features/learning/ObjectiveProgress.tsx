import { useState } from 'react';
import { categories,type Category } from '../../data/curriculum';
import { objectives } from './data/objectives';
import { keys,readRecords,allEvents } from './storage';
import { objectiveEvidence,type ReviewSchedule } from './scheduling';
import { useLearningData } from './useLearningData';
export function ObjectiveProgress({onPractise}:{onPractise:(id:string)=>void}) {
 useLearningData();const [category,setCategory]=useState<Category|'All'>('All');
 const schedules=readRecords<ReviewSchedule>(keys.schedules),events=allEvents(schedules);
 return <details className="objective-progress"><summary>Learning objective progress</summary><p className="subtle">Observed evidence from new submissions, not a mastery score. Historic Quick Practice results remain in History and were not converted to scheduled reviews.</p><select className="subcategory-select" aria-label="Objective category" value={category} onChange={e=>setCategory(e.target.value as Category|'All')}><option value="All">All categories</option>{categories.map(c=><option key={c}>{c}</option>)}</select><ul className="reference-list">{objectives.filter(o=>category==='All'||o.category===category).map(o=>{const evidence=objectiveEvidence(o.id,events);return <li key={o.id}><p>{o.description}</p><p className="subtle">{evidence.attempts} attempts · {evidence.uniqueItems} unique items · {evidence.correct}/{evidence.assessed} assessed successes · {evidence.hintAssisted} hint-assisted successes · {evidence.writtenSuccess} self-reported written successes{evidence.insufficient?' · Insufficient evidence':''}</p><button className="text-button" onClick={()=>onPractise(o.id)}>Practise this objective</button></li>;})}</ul></details>;
}
