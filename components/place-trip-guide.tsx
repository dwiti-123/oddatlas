import type {Place} from '@/lib/places';
import {placeTripPlans,planningChecked,planningFx,tripPriceLabel} from '@/lib/place-trip-plans';
import styles from './hashima-visit-planning.module.css';
import pageStyles from './place-page.module.css';

type Questions={reviewed:string;questions:{question:string;answer:string;source:string}[]};
export function PlaceTripGuide({place,questions}:{place:Place;questions?:Questions}) {
 const plan=placeTripPlans[place.slug];
 if(!plan)throw new Error(`Missing practical trip guide for ${place.slug}`);
 const fx=plan.price?planningFx[plan.price.currency]:undefined;
 const localPrice=plan.price?new Intl.NumberFormat('en-US',{style:'currency',currency:plan.price.currency,maximumFractionDigits:0}).format(plan.price.amount):null;
 return <section id="plan-visit" className={styles.fieldGuide} aria-labelledby="visit-plan-title">
  <p className="eyebrow">{plan.kind==='stay'?'Plan your stay':'Plan your visit'}</p><h2 id="visit-plan-title">{plan.title}</h2>
  <section className={styles.featuredTrip} aria-labelledby="trip-experience-title">
   <div className={styles.tripHeader}><div><p className={styles.kicker}>{plan.kind==='stay'?'Overnight experience':'Visitor experience'}</p><h3 id="trip-experience-title">{plan.experience}</h3></div><p className={styles.tripPrice}>{tripPriceLabel(plan)}<span>{plan.price?`${plan.price.unit}${plan.price.currency!=='USD'?` · ${localPrice}`:''}`:'Check the official details below'}</span></p></div>
   <dl className={styles.featureFacts}><div><dt>{plan.durationBasis==='suggestion'?'Suggested time to allow':'Duration'}</dt><dd>{plan.duration}</dd></div>{plan.facts.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   <a className={styles.action} href={plan.href}>{plan.action}<span aria-hidden="true">↗</span></a>
   <p className={styles.cardNote}>{plan.priceNote}</p>
  </section>
  {fx&&plan.price?.currency!=='USD'&&<p className={styles.caption}>USD is an approximate budget comparison using the <a href={fx.url}>23 October 2026 exchange rate</a>. The operator charges in local currency; your bank’s rate may differ.{plan.price?.currency==='NAD'?' NAD is pegged one-to-one to ZAR.':''}</p>}
  <section className={styles.dayPlan}><h2>{plan.kind==='stay'?'Your stay, in 3 steps':'Your visit, in 3 steps'}</h2><p>Our suggested sequence. Follow the operator’s confirmed times and meeting instructions.</p><ol className={styles.steps}>{plan.steps.map(([title,text],index)=><li key={title}><span>{String(index+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
  <section className={styles.beforeBooking}><h2>Know before you {plan.kind==='stay'?'book':'go'}</h2><ul>{plan.notes.map(([label,text])=><li key={label}><strong>{label}:</strong> {text}</li>)}</ul><p className={styles.caption}>Travel, meals and accommodation are extra unless explicitly included in the selected ticket or package. Published details do not confirm live availability.</p></section>
  {questions&&<details className={pageStyles.questions}><summary>More visiting questions</summary>{questions.questions.map(q=><section key={q.question}><h3>{q.question}</h3><p>{q.answer} <a className="text-link" href={q.source}>Official source</a></p></section>)}<p className={styles.caption}>Background visitor answers reviewed {questions.reviewed}.</p></details>}
  <section className={styles.practicalSources}><h2>Sources for your trip</h2><p className={styles.caption}>Sources consulted <time dateTime={planningChecked}>24 October 2026</time>. Researched planning guidance, not a first-hand trip report.</p><ol className={styles.sources}>{plan.sources.map(source=><li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ol></section>
 </section>;
}
