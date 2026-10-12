import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { categories, questions, difficulties, difficultyLabels } from './data/questions';
import { parseAttempts, statuses, attemptCounts, attemptResult, STORAGE_KEY, type QuickPracticeAttempt } from './progress';
import { availableSubcategories, changeCategory, defaultFilters, eligibleQuestions, practiceModes } from './sessionSetup';
import { sessionQuestionCount, sessionSizes, type SessionSize } from './session';
import { useQuickPracticeSession } from './useQuickPracticeSession';
import { QuickPracticeScreen } from './components/QuickPracticeScreen';
import { QuickPracticeSummary } from './components/QuickPracticeSummary';
import { Reference } from '../reference/Reference';
import { SavedFlags } from '../../components/SavedFlags';
import { MathText } from '../../components/MathText';
import { ShortcutsHelp } from '../../components/ShortcutsHelp';
import { keys, readRecords, recordReview, saveSafely, type Flag } from '../learning/storage';
import { itemKey, type StudyMode } from '../learning/schema';
import { isDue, type ReviewSchedule } from '../learning/scheduling';
import { useLearningData } from '../learning/useLearningData';
import { BackupControls } from '../learning/BackupControls';
import { ObjectiveProgress } from '../learning/ObjectiveProgress';
const PracticeHub = lazy(() => import('../learning/PracticeHub'));
const modeLabels = { quick: 'Quick Practice', guided: 'Guided Problems', written: 'Written Problems' };
/** Owns Quick Practice's screens, filters and multiple-choice progress. */
export function QuickPractice({ updateAvailable, onUpdate }: { updateAvailable: boolean; onUpdate: () => void }) {
 useLearningData();
 const [studyMode,setStudyMode]=useState<StudyMode>('quick');
 const [learningActive,setLearningActive]=useState(false);
 const [studyFilter,setStudyFilter]=useState<'all'|'flagged'|'due'>('all');
 const [objectiveFilter,setObjectiveFilter]=useState<string|undefined>();
 const hintsUsed=useRef(new Map<string,number>());
 const [initial]=useState(()=>{try{return {attempts:parseAttempts(localStorage.getItem(STORAGE_KEY)),error:''};}catch{return {attempts:[],error:'Your saved history could not be read. It has been left untouched. New answers will only be kept for this session.'};}});
 const [attempts,setAttempts]=useState<QuickPracticeAttempt[]>(initial.attempts);
 const [storageError,setStorageError]=useState(initial.error);
 const canSave=useRef(!initial.error);
 useEffect(()=>{const handle=(e:Event)=>setStorageError((e as CustomEvent<string>).detail);window.addEventListener('quant-storage-error',handle);return ()=>window.removeEventListener('quant-storage-error',handle);},[]);
 const [screen,setScreen]=useState<'home'|'quiz'|'complete'|'history'>('home');
 const [reference,setReference]=useState<{initialId?:string}|null>(null);
 const [filters,setFilters]=useState(defaultFilters);
 const [sessionSize,setSessionSize]=useState<SessionSize>(25);
 const {category,subcategory,difficulty,mode}=filters;
 const subcategories=availableSubcategories(questions,category);
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{window.scrollTo(0,0);heading.current?.focus();},[screen,studyMode]);
 const latest=statuses(attempts); const correct=questions.filter(q=>latest.get(q.id)==='correct').length; const incorrect=questions.filter(q=>latest.get(q.id)==='incorrect').length;
 const unsure=questions.filter(q=>latest.get(q.id)==='unsure').length;
 const seen=correct+incorrect+unsure; const {accuracy}=attemptCounts(attempts);
 const flags=readRecords<Flag>(keys.flags),schedules=readRecords<ReviewSchedule>(keys.schedules);
 const available=eligibleQuestions(questions,filters,attempts).filter(q=>(!objectiveFilter||(q.objectiveIds??[]).includes(objectiveFilter))&&(studyFilter!=='flagged'||flags.some(f=>f.id===itemKey({mode:'quick',itemId:q.id})))&&(studyFilter!=='due'||schedules.some(s=>s.mode==='quick'&&s.itemId===q.id&&isDue(s,Date.now()))));
 const quiz=useQuickPracticeSession(recordAttempt);
 function start(){hintsUsed.current.clear();if(quiz.start(available,sessionSize))setScreen('quiz');}
 function recordAttempt(attempt:QuickPracticeAttempt){
 let next=[...attempts,attempt];
 if(canSave.current){try{const saved=parseAttempts(localStorage.getItem(STORAGE_KEY));const ids=new Set(saved.map(a=>a.id));next=[...saved,...attempts.filter(a=>!ids.has(a.id)),attempt];localStorage.setItem(STORAGE_KEY,JSON.stringify(next));setStorageError('');}catch{setStorageError('Progress could not be saved on this device. This answer is kept for this session only.');}}
 setAttempts(next);
 const item=questions.find(q=>q.id===attempt.questionId);if(item)saveSafely(()=>recordReview({id:attempt.id,mode:'quick',itemId:item.id,at:attempt.at,outcome:attemptResult(attempt),hints:hintsUsed.current.get(item.id)??0,objectiveIds:item.objectiveIds,provenance:'assessed'}));
 }
 function restored(){try{setAttempts(parseAttempts(localStorage.getItem(STORAGE_KEY)));canSave.current=true;setStorageError('');}catch{setStorageError('Quick Practice history could not be read; saved data is untouched.');}}
 // Exit the active view through the root owner. Saved child sessions/drafts stay intact.
 function goHome(){setReference(null);setScreen('home');setStudyMode('quick');setLearningActive(false);setObjectiveFilter(undefined);}
 function practiseObjective(id:string){goHome();setObjectiveFilter(id);setFilters(defaultFilters);setStudyFilter('all');}
 function nextQuestion(){if(quiz.next())setScreen('complete');}
 function resetProgress(){
  if(!window.confirm('Reset progress? This deletes all Quick Practice attempt history and resets correct/incorrect/unseen status, including unsure responses. All questions will be unseen. Question content is kept. This cannot be undone.'))return;
  try{localStorage.removeItem(STORAGE_KEY);canSave.current=true;setAttempts([]);setStorageError('');}
  catch{setStorageError('Progress could not be reset on this device. Your history has been kept.');}
 }
 return <div className="app"><header><button type="button" className="brand" onClick={goHome} aria-label="QuantPocket home"><span className="brand-icon" aria-hidden="true">∑</span>QuantPocket</button><ShortcutsHelp/></header>
 {storageError&&<aside className="notice error" role="alert">{storageError}</aside>}
 {updateAvailable&&screen!=='quiz'&&!learningActive&&<aside className="notice">A new version is available. <button onClick={onUpdate}>Update app</button></aside>}
 <main>{!reference&&screen!=='quiz'&&!learningActive&&<fieldset><legend>Practice format</legend><div className="difficulty format-controls">{(['quick','guided','written'] as const).map(m=><button key={m} aria-pressed={studyMode===m} className={studyMode===m?'active':''} onClick={()=>{setStudyMode(m);setScreen('home');setObjectiveFilter(undefined);}}>{modeLabels[m]}</button>)}</div></fieldset>}
 {objectiveFilter&&!reference&&screen==='home'&&<p className="subtle">Filtered by learning objective. <button className="text-button" onClick={()=>setObjectiveFilter(undefined)}>Clear objective filter</button></p>}
 {reference&&<Reference initialId={reference.initialId} returnLabel={studyMode==='quick'?'Back to Quick Practice':'Back to study'} onReturn={screen==='quiz'||studyMode!=='quick'?()=>setReference(null):undefined}/>}
 {studyMode!=='quick'&&<div hidden={!!reference}><Suspense fallback={<p className="subtle">Loading problems…</p>}><PracticeHub key={studyMode} mode={studyMode} history={screen==='history'} onActive={setLearningActive} onReference={id=>setReference({initialId:id})} onPractise={practiseObjective} onRestored={restored} objectiveFilter={objectiveFilter}/></Suspense></div>}
 {studyMode==='quick'&&!reference&&<>{screen==='home'&&<>
 <section className="progress" aria-label="Progress"><h1 ref={heading} tabIndex={-1}>Progress</h1><dl className="stats"><div><dt>Correct</dt><dd>{correct}</dd></div><div><dt>Incorrect</dt><dd>{incorrect}</dd></div><div><dt>Unsure</dt><dd>{unsure}</dd></div><div><dt>Unseen</dt><dd>{questions.length-seen}</dd></div><div><dt title="Correct answers / (correct + incorrect answers); excludes unsure">Accuracy</dt><dd>{accuracy}%</dd></div></dl></section>
 <fieldset><legend>Study filter</legend><div className="difficulty">{([['all','All'],['flagged','Flagged'],['due','Due for Review']] as const).map(([value,label])=><button key={value} aria-pressed={studyFilter===value} className={studyFilter===value?'active':''} onClick={()=>setStudyFilter(value)}>{label}</button>)}</div></fieldset>
 <fieldset><legend>Mode</legend><div className="difficulty practice-modes">{practiceModes.map(option=><button key={option.value} aria-pressed={mode===option.value} className={mode===option.value?'active':''} onClick={()=>setFilters(current=>({...current,mode:option.value}))}>{option.label}</button>)}</div></fieldset>
 <fieldset><legend>Subject</legend><div className="subjects"><button className={`subject ${category==='All'?'selected':''}`} aria-pressed={category==='All'} onClick={()=>setFilters(current=>changeCategory(questions,current,'All'))}><span>All Questions</span><span className="count">{questions.length} questions</span></button>{categories.map(c=><button key={c} className={`subject ${category===c?'selected':''}`} aria-pressed={category===c} onClick={()=>setFilters(current=>changeCategory(questions,current,c))}><span>{c}</span><span className="count">{questions.filter(q=>q.category===c).length} questions</span></button>)}</div></fieldset>
 {category!=='All'&&<fieldset><legend>Subcategory</legend><select className="subcategory-select" aria-label="Subcategory" value={subcategory} onChange={event=>setFilters(current=>({...current,subcategory:event.target.value}))}><option value="All">All subcategories</option>{subcategories.map(topic=><option key={topic} value={topic}>{topic}</option>)}</select></fieldset>}
 <fieldset><legend>Difficulty</legend><div className="difficulty">{(['All',...difficulties] as const).map(d=><button key={d} aria-pressed={difficulty===d} className={difficulty===d?'active':''} onClick={()=>setFilters(current=>({...current,difficulty:d}))}>{d==='All'?'Mixed':difficultyLabels[d]}</button>)}</div></fieldset>
 <fieldset><legend>Session</legend><div className="difficulty">{sessionSizes.map(size=><button key={size} aria-pressed={sessionSize===size} className={sessionSize===size?'active':''} onClick={()=>setSessionSize(size)}>{size}</button>)}</div></fieldset>
 <div className="start-area"><p role="status">{available.length?`${available.length} available · session: ${sessionQuestionCount(available.length,sessionSize)}`:'No questions match these filters.'}</p><button className="primary" onClick={start} disabled={!available.length}>Start</button></div>
 </>}
 {screen==='quiz'&&<QuickPracticeScreen state={quiz.state} onSelect={quiz.select} onSubmit={quiz.submit} onUnsure={quiz.unsure} onNext={nextQuestion} onEnd={goHome} onOpenReference={id=>setReference({initialId:id})} onHintUse={(id,count)=>hintsUsed.current.set(id,count)} getHintCount={id=>hintsUsed.current.get(id)??0} onPractiseObjective={practiseObjective}/>}
 {screen==='complete'&&<QuickPracticeSummary total={quiz.state.queue.length} correct={quiz.state.correct} unsure={quiz.state.unsure} canRepeat={available.length>0} onRepeat={start} onHome={goHome}/>}
 {screen==='history'&&<><h1 ref={heading} tabIndex={-1}>History</h1>{!attempts.length?<p className="subtle">No attempts recorded.</p>:<ol className="history">{[...attempts].reverse().map(a=>{const item=questions.find(q=>q.id===a.questionId);const result=attemptResult(a);return <li key={a.id}><span className={`history-result ${result==='correct'?'good':'bad'}`}>{result==='unsure'?'—':result==='correct'?'✓':'×'}</span><div><strong>{item?.category||a.questionId}</strong><p><MathText text={item?.prompt||'Question no longer in the bank'}/></p><small>{new Date(a.at).toLocaleString('en-GB')} · {result==='unsure'?'Not sure':<>Answer {'ABCD'[a.displayedAnswer ?? a.selectedAnswer!]} · {result==='correct'?'Correct':'Incorrect'}</>}</small></div></li>;})}</ol>}<button className="text-button" onClick={resetProgress}>Reset progress</button><SavedFlags mode="quick" items={questions.map(q=>({id:q.id,title:q.prompt}))}/><BackupControls onRestored={restored}/></>}
 </>}{!reference&&screen==='home'&&!learningActive&&<ObjectiveProgress onPractise={practiseObjective}/>}</main><nav aria-label="Main navigation"><button aria-current={!reference&&screen!=='history'?'page':undefined} className={!reference&&screen!=='history'?'active':''} onClick={()=>{if(reference&&(screen==='quiz'||studyMode!=='quick'))setReference(null);else goHome();}}>Practice</button><button aria-current={!reference&&screen==='history'?'page':undefined} className={!reference&&screen==='history'?'active':''} onClick={()=>{setReference(null);setScreen('history');}}>History</button><button aria-current={reference?'page':undefined} className={reference?'active':''} disabled={!reference&&screen==='quiz'&&!quiz.state.submitted} onClick={()=>setReference({})}>Reference</button></nav></div>;

}
