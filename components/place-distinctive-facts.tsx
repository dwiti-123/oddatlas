import styles from './hashima-visit-planning.module.css';
import { placeDistinctiveFacts } from '@/lib/place-distinctive-facts';

export function PlaceDistinctiveFacts({slug}:{slug:string}) {
  const entry = placeDistinctiveFacts[slug];
  if (!entry) return null;
  return <section className={styles.distinctive} aria-labelledby="distinctive-title">
    <p className="eyebrow">The detail that changes the visit</p>
    <h2 id="distinctive-title">{entry.title}</h2>
    <p>{entry.intro}</p>
    <dl className={styles.distinctiveFacts}>
      {entry.facts.map((fact)=><div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd><p>{fact.explanation}</p></div>)}
    </dl>
    <p className={styles.caption}>Checked {entry.checked}. <a href={entry.source.url}>{entry.source.label} ↗</a></p>
  </section>;
}
