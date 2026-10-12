import { useEffect, useRef, useState } from 'react';
import { categories, type Category } from '../../data/curriculum';
import { knowledge, knowledgeById, knowledgeTypes, knowledgeTypeLabels, type KnowledgeType } from '../../data/knowledge';
import { MathText } from '../../components/MathText';
import { defaultReferenceFilters, filterKnowledge, referenceSubcategories } from './filtering';

interface Props { initialId?: string; onReturn?: () => void; returnLabel?: string }
/** Browsing state belongs here; no dependency on question format or attempt storage. */
export function Reference({ initialId, onReturn, returnLabel='Back to Quick Practice' }: Props) {
  const [trail, setTrail] = useState<string[]>(initialId ? [initialId] : []);
  const [filters, setFilters] = useState(defaultReferenceFilters);
  const heading = useRef<HTMLHeadingElement>(null);
  const id = trail.at(-1);
  const entry = id ? knowledgeById.get(id) : undefined;
  useEffect(() => { window.scrollTo(0, 0); heading.current?.focus(); }, [id]);
  const open = (id: string) => setTrail(current => [...current, id]);
  return <section aria-label="Reference" className="reference">
    {onReturn && <button className="text-button" onClick={onReturn}>{returnLabel}</button>}
    {id ? <>
      <button className="text-button reference-back" onClick={() => setTrail(current => current.slice(0, -1))}>{trail.length > 1 ? 'Back to previous concept' : 'Reference list'}</button>
      {entry ? <>
        <h1 ref={heading} tabIndex={-1}>{entry.name}</h1>
        <p className="subtle">{knowledgeTypeLabels[entry.type]} · {entry.category} · {entry.subcategory}</p>
        {(['statement', 'assumptions', 'conclusion', 'intuition', 'notation'] as const).map(field => entry[field] &&
          <section key={field} className="reference-section"><h2>{field[0].toUpperCase() + field.slice(1)}</h2><MathText text={entry[field]} /></section>)}
        {!!entry.relatedKnowledgeIds?.length && <section className="reference-section"><h2>Related concepts</h2><ul className="reference-list">
          {entry.relatedKnowledgeIds.map(id => <li key={id}><button className="text-button" onClick={() => open(id)}>{knowledgeById.get(id)!.name}</button></li>)}
        </ul></section>}
      </> : <h1 ref={heading} tabIndex={-1}>Reference not found</h1>}
    </> : <>
      <h1 ref={heading} tabIndex={-1}>Reference</h1>
      <label>Category<select aria-label="Category" className="subcategory-select" value={filters.category} onChange={e => setFilters(current => ({ ...current, category: e.target.value as Category | 'All', subcategory: 'All' }))}>
        <option value="All">All categories</option>{categories.map(c => <option key={c}>{c}</option>)}
      </select></label>
      {filters.category !== 'All' && <label>Subcategory<select aria-label="Subcategory" className="subcategory-select" value={filters.subcategory} onChange={e => setFilters(current => ({ ...current, subcategory: e.target.value }))}>
        <option value="All">All subcategories</option>{referenceSubcategories(knowledge, filters.category).map(s => <option key={s}>{s}</option>)}
      </select></label>}
      <label>Type<select aria-label="Type" className="subcategory-select" value={filters.type} onChange={e => setFilters(current => ({ ...current, type: e.target.value as KnowledgeType | 'All' }))}>
        <option value="All">All types</option>{knowledgeTypes.map(t => <option key={t} value={t}>{knowledgeTypeLabels[t]}</option>)}
      </select></label>
      <ul className="reference-list">{filterKnowledge(knowledge, filters).map(k => <li key={k.id}>
        <button className="text-button" onClick={() => open(k.id)}>{k.name}</button><span className="subtle">{knowledgeTypeLabels[k.type]}</span>
      </li>)}</ul>
      {!filterKnowledge(knowledge, filters).length && <p className="subtle" role="status">No references match these filters.</p>}
    </>}
  </section>;
}
