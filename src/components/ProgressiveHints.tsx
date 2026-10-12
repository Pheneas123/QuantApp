import { MathText } from './MathText';
export function ProgressiveHints({hints=[],count,onReveal,disabled=false}:{hints?:string[];count:number;onReveal:()=>void;disabled?:boolean}) {
 if(!hints.length)return null;
 return <section className="hints" aria-label="Hints">{hints.slice(0,count).map((hint,i)=><p key={i}><strong>Hint {i+1}: </strong><MathText text={hint}/></p>)}<button className="text-button" data-study-control disabled={disabled||count>=hints.length} onClick={onReveal}>Reveal next hint ({Math.min(count,hints.length)}/{hints.length})</button></section>;
}
