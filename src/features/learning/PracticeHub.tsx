import { useEffect,useState } from 'react';
import { categories,curriculum,type Category } from '../../data/curriculum';
import { difficulties,difficultyLabels,type Difficulty } from '../../data/studyMetadata';
import { guidedProblems,writtenProblems,objectives } from './data';
import { GuidedStudy } from './GuidedStudy';
import { WrittenStudy } from './WrittenStudy';
import { keys,readRecords,allEvents,type Flag,type GuidedAttempt,type WrittenAttempt,type GuidedSession } from './storage';
import { isDue,objectiveEvidence,type ReviewSchedule } from './scheduling';
import { itemKey,type StudyMode } from './schema';
import { useLearningData } from './useLearningData';
import { BackupControls } from './BackupControls';
import { SavedFlags } from '../../components/SavedFlags';
import { MathText } from '../../components/MathText';
export default function PracticeHub({mode,history,onActive,onReference,onPractise,onRestored,objectiveFilter}:{mode:'guided'|'written';history:boolean;onActive:(active:boolean)=>void;onReference:(id:string)=>void;onPractise:(id:string)=>void;onRestored:()=>void;objectiveFilter?:string}) {
 useLearningData();const bank=mode==='guided'?guidedProblems:writtenProblems;
 const [category,setCategory]=useState<Category|'All'>('All'),[topic,setTopic]=useState('All'),[difficulty,setDifficulty]=useState<Difficulty|'All'>('All'),[filter,setFilter]=useState<'all'|'flagged'|'due'>('all'),[active,setActive]=useState<string|null>(null);
 const flags=readRecords<Flag>(keys.flags),schedules=readRecords<ReviewSchedule>(keys.schedules);
 const activeSessions=readRecords<GuidedSession>(keys.active);
 useEffect(()=>{onActive(!!active&&!history);return ()=>onActive(false);},[active,history,onActive]);
 const selected=bank.find(p=>p.id===active);
 const available=bank.filter(p=>(category==='All'||p.category===category)&&(topic==='All'||p.subcategory===topic)&&(difficulty==='All'||p.difficulty===difficulty)&&(!objectiveFilter||p.objectiveIds.includes(objectiveFilter))&&(filter!=='flagged'||flags.some(f=>f.id===itemKey({mode,itemId:p.id})))&&(filter!=='due'||schedules.some(s=>s.mode===mode&&s.itemId===p.id&&isDue(s,Date.now()))));
 if(history)return <><LearningHistory mode={mode}/><SavedFlags mode={mode} items={bank.map(p=>({id:p.id,title:p.title}))}/><BackupControls onRestored={onRestored}/></>;
 if(selected)return mode==='guided'?<GuidedStudy key={selected.id} problem={selected as typeof guidedProblems[number]} onExit={()=>setActive(null)} onReference={onReference} onPractise={onPractise}/>:<WrittenStudy key={selected.id} problem={selected as typeof writtenProblems[number]} onExit={()=>setActive(null)} onReference={onReference} onPractise={onPractise}/>;
 return <><h1>{mode==='guided'?'Guided Problems':'Written Problems'}</h1><p className="subtle">{mode==='guided'?'Work through linked parts with learning or assessment feedback. Submitted parts cannot be changed.':'Write your reasoning, save a local draft and compare it with a worked solution.'}</p>
 <fieldset><legend>Study filter</legend><div className="difficulty">{([['all','All'],['flagged','Flagged'],['due','Due for Review']] as const).map(([value,label])=><button key={value} className={filter===value?'active':''} aria-pressed={filter===value} onClick={()=>setFilter(value)}>{label}</button>)}</div></fieldset>
 <fieldset><legend>Subject</legend><div className="subjects"><button className={`subject ${category==='All'?'selected':''}`} onClick={()=>{setCategory('All');setTopic('All');}}>All Problems <span className="count">{bank.length} problems</span></button>{categories.map(c=><button className={`subject ${category===c?'selected':''}`} key={c} onClick={()=>{setCategory(c);setTopic('All');}}>{c}<span className="count">{bank.filter(p=>p.category===c).length} problems</span></button>)}</div></fieldset>
 {category!=='All'&&<fieldset><legend>Subcategory</legend><select className="subcategory-select" aria-label="Subcategory" value={topic} onChange={e=>setTopic(e.target.value)}><option value="All">All subcategories</option>{curriculum[category].filter(t=>bank.some(p=>p.category===category&&p.subcategory===t)).map(t=><option key={t}>{t}</option>)}</select></fieldset>}
 <fieldset><legend>Difficulty</legend><div className="difficulty">{(['All',...difficulties] as const).map(d=><button key={d} className={d===difficulty?'active':''} aria-pressed={d===difficulty} onClick={()=>setDifficulty(d)}>{d==='All'?'Mixed':difficultyLabels[d]}</button>)}</div></fieldset>
 <p role="status" className="subtle">{available.length} available</p><ul className="reference-list">{available.map(p=><li key={p.id}><button className="text-button" onClick={()=>setActive(p.id)}>{p.title}{mode==='guided'&&activeSessions.some(s=>s.problemId===p.id)?' · Resume / review':''}</button><span className="subtle">{p.category} · {difficultyLabels[p.difficulty]}</span></li>)}</ul>{!available.length&&<p className="subtle">No problems match these filters.</p>}</>;
}
export function LearningHistory({mode}:{mode?:'guided'|'written'}) {
 useLearningData();const guided=readRecords<GuidedAttempt>(keys.guided),written=readRecords<WrittenAttempt>(keys.written);
 const entries=[...(mode!=='written'?guided.map(a=>({id:a.id,at:a.at,title:guidedProblems.find(p=>p.id===a.problemId)?.title??a.problemId,body:`${a.complete?'Completed':'Interrupted'} Guided Problem · ${a.responses.filter(r=>r.correct).length}/${a.responses.length} submitted parts correct`,answer:''})):[]),...(mode!=='guided'?written.map(a=>({id:a.id,at:a.at,title:writtenProblems.find(p=>p.id===a.problemId)?.title??a.problemId,body:`Written self-assessment: ${a.assessment} · ${a.hints} hints`,answer:a.answer})):[])].sort((a,b)=>Date.parse(b.at)-Date.parse(a.at));
 return <section aria-label="Learning history"><h1>{mode==='guided'?'Guided':'Written'} history</h1>{entries.length?<ul className="reference-list">{entries.map(e=><li key={e.id}><p><strong>{e.title}</strong><br/>{e.body}<br/><small>{new Date(e.at).toLocaleString('en-GB')}</small></p>{e.answer&&<details><summary>Saved answer</summary><div className="rich-content"><MathText text={e.answer}/></div></details>}</li>)}</ul>:<p className="subtle">No attempts recorded.</p>}</section>;
}
