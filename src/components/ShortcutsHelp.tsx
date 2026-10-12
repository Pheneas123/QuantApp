import { useEffect,useRef,useState } from 'react';
import { shortcutAllowed } from './useStudyShortcuts';
export function ShortcutsHelp() {
 const dialog=useRef<HTMLDialogElement>(null),[open,setOpen]=useState(false);
 useEffect(()=>{function key(e:KeyboardEvent){if(e.key==='?'&&shortcutAllowed(e)){e.preventDefault();setOpen(true);}if(e.key==='Escape')setOpen(false);}window.addEventListener('keydown',key);return ()=>window.removeEventListener('keydown',key);},[]);
 useEffect(()=>{if(open&&!dialog.current?.open)dialog.current?.showModal();if(!open&&dialog.current?.open)dialog.current.close();},[open]);
 return <><button className="text-button shortcut-help" aria-label="Keyboard shortcuts" onClick={()=>setOpen(true)}>?</button><dialog ref={dialog} onCancel={()=>setOpen(false)} aria-label="Keyboard shortcuts"><h2>Keyboard shortcuts</h2><p>1–4 or A–D: select an answer<br/>Enter: submit or advance<br/>U: Not sure (Quick Practice)<br/>N: next submitted question or part<br/>H: reveal the next hint<br/>F: toggle flag<br/>?: show this help<br/>Esc: close dialogs</p><p className="subtle">Shortcuts leave text editing and browser modifier keys alone. Written solutions use the explicit reveal button.</p><button className="primary" onClick={()=>setOpen(false)}>Close</button></dialog></>;
}
