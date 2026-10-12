import { useEffect, useState } from 'react';
/** Local selective grammars in a separate precached chunk. Escaped literal fallback is immediate. */
export function CodeBlock({text,language}:{text:string;language?:string}) {
 const [result,setResult]=useState<{text:string;language?:string;html:string}|null>(null);
 useEffect(()=>{let cancelled=false;void import('./highlighting').then(({highlight})=>{
  const html=highlight(text,language);if(!cancelled)setResult(html?{text,language,html}:null);
 }).catch(()=>{});return ()=>{cancelled=true;};},[text,language]);
 const html=result?.text===text&&result.language===language?result.html:undefined;
 return html?<code className="code-block" data-language={language} dangerouslySetInnerHTML={{__html:html}} />:<code className="code-block" data-language={language}>{text}</code>;
}
