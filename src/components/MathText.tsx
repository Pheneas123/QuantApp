import { useEffect, useRef } from 'react';
import renderMathInElement from 'katex/contrib/auto-render';
import { CodeBlock } from './CodeBlock';
import { textSegments } from './textSegments';

/** Keep mathematical content as text in the bank and render only within this node. */
function MathSpan({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = text;
    renderMathInElement(ref.current, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
      throwOnError: false,
      trust: false,
    });
  }, [text]);
  return <span ref={ref} />;
}

function Prose({text}:{text:string}) {
  const table = /(^\|.+\|\n\|[ :|\-]+\|\n(?:\|.+\|(?:\n|$))+)/m;
  const match = table.exec(text);
  if (!match) return <MathSpan text={text}/>;
  const rows = match[0].trim().split('\n').filter((_,i)=>i!==1).map(row=>row.slice(1,-1).split('|').map(cell=>cell.trim()));
  return <span><MathSpan text={text.slice(0,match.index)}/><span className="text-table" role="table">{rows.map((row,i)=><span role="row" key={i}>{row.map((cell,j)=><span role={i===0?'columnheader':'cell'} key={j}><MathSpan text={cell}/></span>)}</span>)}</span><Prose text={text.slice(match.index+match[0].length)}/></span>;
}

/** Existing prose/math rendering plus literal fenced snippets in the same string fields. */
export function MathText({ text }: { text: string }) {
  const segments = textSegments(text);
  // Preserve the existing DOM for the original bank and reference entries.
  if (segments.length === 1 && segments[0].kind === 'text') return <Prose text={text} />;
  return <span>{segments.map((segment, index) => segment.kind === 'code'
    ? <CodeBlock key={index} text={segment.text} language={segment.language}/>
    : <Prose key={index} text={segment.text} />)}</span>;
}
