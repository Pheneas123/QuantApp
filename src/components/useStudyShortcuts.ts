import { useEffect } from 'react';
import type { RefObject } from 'react';
export function shortcutAllowed(event:KeyboardEvent) {
 if(event.defaultPrevented||event.repeat||event.isComposing||event.ctrlKey||event.altKey||event.metaKey||(event.shiftKey&&event.key!=='?'))return false;
 const target=event.target;
 return !(target instanceof HTMLElement&&(target.isContentEditable||target.closest('input,textarea,select,[role="textbox"]')));
}
export function useStudyShortcuts(root:RefObject<HTMLElement|null>,actions:{select?:(position:number)=>void;submit?:()=>void;next?:()=>void;hint?:()=>void;flag?:()=>void;unsure?:()=>void}) {
 useEffect(()=>{const handler=(event:KeyboardEvent)=>{
  if(event.repeat && !event.ctrlKey && !event.altKey && !event.metaKey && /^(?:[1-4a-dhfun]|Enter)$/i.test(event.key) && event.target instanceof HTMLElement && root.current?.contains(event.target) && !event.target.closest('input,textarea,select,[contenteditable],[role="textbox"]')) { event.preventDefault(); return; }
  if(root.current?.closest('[hidden]')||!shortcutAllowed(event)||document.querySelector('dialog[open]'))return;
  const target=event.target;
  if(target instanceof HTMLElement&&target.closest('button,a,summary')&&(!root.current?.contains(target)||!target.closest('[data-study-control],[data-quiz-control]')))return;
  const key=event.key.toLowerCase();const position=/^[1-4]$/.test(key)?Number(key)-1:['a','b','c','d'].indexOf(key);
  const action=position>=0?()=>actions.select?.(position):key==='enter'?actions.submit:key==='n'?actions.next:key==='h'?actions.hint:key==='f'?actions.flag:key==='u'?actions.unsure:undefined;
  if(action){event.preventDefault();action();}
 };window.addEventListener('keydown',handler);return ()=>window.removeEventListener('keydown',handler);},[root,actions]);
}
