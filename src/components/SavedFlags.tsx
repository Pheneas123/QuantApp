import { MathText } from './MathText';
import { keys,readRecords,toggleFlag,saveSafely,type Flag } from '../features/learning/storage';
import { useLearningData } from '../features/learning/useLearningData';
import type { StudyMode } from '../features/learning/schema';
export function SavedFlags({mode,items}:{mode:StudyMode;items:{id:string;title:string}[]}) {
 useLearningData();const flags=readRecords<Flag>(keys.flags).filter(f=>f.mode===mode);
 return <details><summary>Flagged content ({flags.length})</summary><p className="subtle">Use the Flagged study filter to practise available items.</p><ul className="reference-list">{flags.map(f=>{const item=items.find(q=>q.id===f.itemId);return <li key={f.id}><p><MathText text={item?.title??`${f.itemId} · Content unavailable; flag retained`}/></p><button className="text-button" onClick={()=>saveSafely(()=>toggleFlag(f))}>Remove flag</button></li>;})}</ul></details>;
}
