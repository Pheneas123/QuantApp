import { parseAttempts, STORAGE_KEY } from '../quick-practice/progress';
import { itemKey, studyModes, type ItemIdentity } from './schema';
import { updateSchedule, type ReviewEvent, type ReviewSchedule } from './scheduling';
export const keys = {
 guided:'quant-pocket.guided-attempts.v1', written:'quant-pocket.written-attempts.v1',
 drafts:'quant-pocket.written-drafts.v1', flags:'quant-pocket.flags.v1',
 schedules:'quant-pocket.review-schedules.v1', active:'quant-pocket.guided-session.v1',
} as const;
export type LearningKey = typeof keys[keyof typeof keys];
export type SelfAssessment = 'correct'|'partial'|'incorrect'|'unsure';
export interface PartResponse {partId:string; selectedAnswer:number|null; correct:boolean; hints:number; at:string}
export interface GuidedAttempt {id:string; problemId:string; at:string; responses:PartResponse[]; complete:boolean; performance:number; objectiveIds:string[]; policy:'learning'|'assessment'; contentVersion:number}
export interface WrittenAttempt {id:string; problemId:string; at:string; assessment:SelfAssessment; hints:number; revealed:boolean; objectiveIds:string[]; answer:string}
export interface WrittenDraft {id:string; at:string; answer:string; hints:number; revealed:boolean; attemptId:string; assessed:boolean}
export interface Flag extends ItemIdentity {id:string; at:string}
export interface GuidedSession {id:string; at:string; problemId:string; policy:'learning'|'assessment'; responses:PartResponse[]; index:number; selectedAnswer:number|null; hints:number[]; answerOrders:number[][]; complete:boolean; contentVersion:number; recorded:boolean}
export type LearningRecord = GuidedAttempt|WrittenAttempt|WrittenDraft|Flag|ReviewSchedule|GuidedSession;
export interface StorageLike {getItem(key:string):string|null; setItem(key:string,value:string):void; removeItem(key:string):void}
const obj=(v:unknown):v is Record<string,any>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const str=(v:unknown)=>typeof v==='string'&&!!v.trim();
const date=(v:unknown)=>str(v)&&Number.isFinite(Date.parse(v as string));
const nat=(v:unknown)=>Number.isInteger(v)&&Number(v)>=0;
const index=(v:unknown)=>nat(v)&&Number(v)<4;
const strs=(v:unknown)=>Array.isArray(v)&&v.every(str)&&new Set(v).size===v.length;
const identity=(v:Record<string,any>)=>studyModes.includes(v.mode)&&str(v.itemId)&&v.id===itemKey(v as ItemIdentity);
const response=(r:unknown)=>obj(r)&&str(r.partId)&&(r.selectedAnswer===null||index(r.selectedAnswer))&&typeof r.correct==='boolean'&&nat(r.hints)&&date(r.at);
const responses=(v:unknown)=>Array.isArray(v)&&v.every(response)&&new Set(v.map(r=>r.partId)).size===v.length;
export function validEvent(v:unknown):v is ReviewEvent {
 return obj(v)&&str(v.id)&&studyModes.includes(v.mode)&&str(v.itemId)&&date(v.at)&&['correct','partial','incorrect','unsure'].includes(v.outcome)&&nat(v.hints)&&strs(v.objectiveIds)&&['assessed','self-reported'].includes(v.provenance);
}
export function validRecord(key:LearningKey,v:unknown):v is LearningRecord {
 if (!obj(v)||!str(v.id)) return false;
 if (key===keys.schedules) {
  if (!identity(v)||!Array.isArray(v.events)||!v.events.length||!v.events.every(validEvent)||new Set(v.events.map((e:ReviewEvent)=>e.id)).size!==v.events.length) return false;
  try {let s:ReviewSchedule|undefined;for(const e of v.events) {if(itemKey(e)!==v.id)return false;s=updateSchedule(s,e);}return ['due','intervalDays','ease','successes','lastReview','state'].every(f=>v[f]===s![f as keyof ReviewSchedule]);}catch{return false;}
 }
 if (!date(v.at)) return false;
 if (key===keys.flags) return identity(v);
 if (key===keys.drafts) return typeof v.answer==='string'&&nat(v.hints)&&typeof v.revealed==='boolean'&&str(v.attemptId)&&typeof v.assessed==='boolean';
 if (key===keys.written) return str(v.problemId)&&['correct','partial','incorrect','unsure'].includes(v.assessment)&&nat(v.hints)&&v.revealed===true&&strs(v.objectiveIds)&&typeof v.answer==='string';
 if (key===keys.guided) return str(v.problemId)&&responses(v.responses)&&typeof v.complete==='boolean'&&Number.isFinite(v.performance)&&v.performance>=0&&v.performance<=1&&strs(v.objectiveIds)&&['learning','assessment'].includes(v.policy)&&nat(v.contentVersion)&&v.contentVersion>0;
 if (key===keys.active) return str(v.problemId)&&responses(v.responses)&&['learning','assessment'].includes(v.policy)&&nat(v.index)&&(v.selectedAnswer===null||index(v.selectedAnswer))&&Array.isArray(v.hints)&&v.hints.every(nat)&&Array.isArray(v.answerOrders)&&v.answerOrders.length===v.hints.length&&v.answerOrders.every((a:unknown)=>Array.isArray(a)&&a.length===4&&new Set(a).size===4&&a.every(index))&&typeof v.complete==='boolean'&&nat(v.contentVersion)&&v.contentVersion>0&&typeof v.recorded==='boolean';
 return false;
}
const changed=()=>{if(typeof window!=='undefined')window.dispatchEvent(new Event('quant-learning-change'));};
export function storageNotice(message:string) {if(typeof window!=='undefined')queueMicrotask(()=>window.dispatchEvent(new CustomEvent('quant-storage-error',{detail:message})));}
export function readRecords<T extends LearningRecord>(key:LearningKey,storage?:StorageLike):T[] {
 try {
  const raw=(storage??localStorage).getItem(key); if(!raw)return [];
  const v:unknown=JSON.parse(raw); if(!obj(v)||v.version!==1||!Array.isArray(v.records))throw Error('Unsupported or malformed storage envelope');
  const seen=new Set<string>();const healthy=v.records.filter((r:unknown)=>{if(!validRecord(key,r)||seen.has(r.id))return false;seen.add(r.id);return true;});
  if(healthy.length!==v.records.length)storageNotice('Some saved learning records could not be read. Healthy records remain available; the stored data has been left untouched.');
  return healthy as T[];
 }catch{storageNotice('Saved learning data could not be read. It has been left untouched.');return [];}
}
function strictRecords(key:LearningKey,storage:StorageLike):LearningRecord[] {
 const raw=storage.getItem(key);if(!raw)return [];
 const v=JSON.parse(raw);if(!obj(v)||v.version!==1||!Array.isArray(v.records)||!v.records.every((r:unknown)=>validRecord(key,r))||new Set(v.records.map((r:LearningRecord)=>r.id)).size!==v.records.length)throw Error('Existing data is malformed; export it before restoring a valid backup.');return v.records;
}
export function writeRecords(key:LearningKey,records:LearningRecord[],storage:StorageLike=localStorage) {
 if(!records.every(r=>validRecord(key,r))||new Set(records.map(r=>r.id)).size!==records.length)throw Error('Invalid or duplicate learning records');
 strictRecords(key,storage); // Never erase an unreadable namespace implicitly.
 storage.setItem(key,JSON.stringify({version:1,records}));changed();
}
export function upsert(key:LearningKey,record:LearningRecord,storage:StorageLike=localStorage) {
 const records=strictRecords(key,storage);writeRecords(key,[...records.filter(r=>r.id!==record.id),record],storage);
}
export function saveSafely(action:()=>void) {try{action();return true;}catch{storageNotice('Learning progress could not be saved. Your current work remains on screen. Export a backup or free storage before leaving.');return false;}}
export function toggleFlag(identity:ItemIdentity,storage:StorageLike=localStorage) {
 const id=itemKey(identity),records=strictRecords(keys.flags,storage) as Flag[];
 writeRecords(keys.flags,records.some(r=>r.id===id)?records.filter(r=>r.id!==id):[...records,{...identity,id,at:new Date().toISOString()}],storage);
}
export function recordReview(event:ReviewEvent,storage:StorageLike=localStorage) {
 const records=strictRecords(keys.schedules,storage) as ReviewSchedule[];
 const prior=records.find(s=>s.id===itemKey(event));
 if(prior?.events.some(e=>e.id===event.id))return;
 upsert(keys.schedules,updateSchedule(prior,event),storage);
}
export const allEvents=(schedules:ReviewSchedule[])=>schedules.flatMap(s=>s.events);
export interface Backup {format:'quant-pocket-backup';version:1;exportedAt:string;data:Record<string,unknown>}
export const backupKeys=[STORAGE_KEY,...Object.values(keys)];
export function exportBackup(storage:StorageLike=localStorage):Backup {
 const data:Record<string,unknown>={};for(const key of backupKeys) {const raw=storage.getItem(key);data[key]=raw===null?null:JSON.parse(raw);}
 const b:Backup={format:'quant-pocket-backup',version:1,exportedAt:new Date().toISOString(),data};validateBackup(b);return b;
}
export function validateBackup(value:unknown):asserts value is Backup {
 if(!obj(value)||value.format!=='quant-pocket-backup'||value.version!==1||!date(value.exportedAt)||!obj(value.data)||Object.keys(value.data).some(k=>!backupKeys.includes(k))||backupKeys.some(k=>!Object.hasOwn(value.data,k)))throw Error('Invalid or unsupported backup');
 for(const key of backupKeys){const v=value.data[key];if(v===null)continue;
  if(key===STORAGE_KEY){const attempts=parseAttempts(JSON.stringify(v));if(new Set(attempts.map(a=>a.id)).size!==attempts.length)throw Error('Duplicate attempts');}
  else if(!obj(v)||v.version!==1||!Array.isArray(v.records)||!v.records.every((r:unknown)=>validRecord(key as LearningKey,r))||new Set(v.records.map((r:LearningRecord)=>r.id)).size!==v.records.length)throw Error(`Invalid backup records: ${key}`);
 }
}
export function backupCounts(b:Backup) {return backupKeys.map(key=>({key,count:b.data[key]===null?0:key===STORAGE_KEY?(b.data[key] as unknown[]).length:(b.data[key] as {records:unknown[]}).records.length}));}
/** Prevalidate the full result. Roll back all allowlisted keys on detectable write failure. */
export function restoreBackup(b:Backup,policy:'merge'|'replace',storage:StorageLike=localStorage) {
 validateBackup(b);const before=new Map(backupKeys.map(key=>[key,storage.getItem(key)]));
 const merged:Backup=structuredClone(b);
 if(policy==='merge'){
  const current=exportBackup(storage);
  for(const key of backupKeys){const incoming=b.data[key],existing=current.data[key];
   if(incoming===null){merged.data[key]=existing;continue;}if(existing===null)continue;
   const a:any[]=key===STORAGE_KEY?existing as any[]:(existing as any).records;
   const c:any[]=key===STORAGE_KEY?incoming as any[]:(incoming as any).records;
   const records=new Map<string,any>(a.map(r=>[r.id,r]));for(const r of c){const old=records.get(r.id);
    if(key===keys.schedules&&old){const events=new Map(old.events.map((e:ReviewEvent)=>[e.id,e]));for(const e of r.events)if(!events.has(e.id))events.set(e.id,e);let schedule:ReviewSchedule|undefined;for(const e of [...events.values()].sort((x:any,y:any)=>Date.parse(x.at)-Date.parse(y.at)||x.id.localeCompare(y.id)))schedule=updateSchedule(schedule,e as ReviewEvent);records.set(r.id,schedule);}
    else if(!old||Date.parse(r.at)>Date.parse(old.at))records.set(r.id,r);
   }
   const ordered=[...records.values()];if(key===STORAGE_KEY)ordered.sort((x,y)=>Date.parse(x.at)-Date.parse(y.at));
   merged.data[key]=key===STORAGE_KEY?ordered:{version:1,records:ordered};
  }
 }
 validateBackup(merged);
 try{for(const key of backupKeys){const v=merged.data[key];if(v===null)storage.removeItem(key);else storage.setItem(key,JSON.stringify(v));}}
 catch(error){let rollbackFailed=false;for(const [key,raw] of before)try{if(raw===null)storage.removeItem(key);else storage.setItem(key,raw);}catch{rollbackFailed=true;}throw Error(rollbackFailed?'Import failed and rollback was incomplete. Keep your backup file and check storage availability.':'Import failed; original data restored.',{cause:error});}
 changed();
}
