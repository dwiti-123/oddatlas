'use client';
import { useEffect } from 'react';
import { hashimaOperators, hashimaOperatorCheck } from '@/lib/hashima-operators';
import { hashimaUsd, hashimaFx, hashimaVisit } from '@/lib/hashima-visit';
import styles from './hashima-operator-comparison.module.css';

const yen=(amount:number)=>`¥${amount.toLocaleString('en-US')}`;
const priceRange=(price:{min:number;max?:number},format:(amount:number)=>string)=>`${format(price.min)}${price.max!==undefined?`–${format(price.max)}`:''}`;
function openOperator(id:string){
 const details=document.getElementById(id);
 if(details instanceof HTMLDetailsElement)details.open=true;
}
export function HashimaOperatorComparison(){
 useEffect(()=>{
  const reveal=()=>{if(location.hash.startsWith('#operator-'))openOperator(location.hash.slice(1));};
  reveal();window.addEventListener('hashchange',reveal);
  return ()=>window.removeEventListener('hashchange',reveal);
 },[]);
 return <section id="compare-tours" className={styles.comparison} aria-labelledby="operator-comparison-title">
  <p className="eyebrow">Choose your journey</p>
  <h2 id="operator-comparison-title">Which Hashima tour should you compare?</h2>
  <p>Compare the <strong>experience and total price</strong>, not just the boat fare. These are published adult individual tariffs, checked <time dateTime={hashimaOperatorCheck}>27 October 2026</time>, not live availability or quotes.</p>
  <p className={styles.access}><strong>Planning to land?</strong> The <a href={hashimaVisit.sources[0].url}>21 October operator notice</a> says landings are suspended from 22 October, with no reopening date. Landing prices below are reference tariffs for when access is permitted. Confirm the operating itinerary before paying.</p>
  <table className={styles.table}>
   <caption>Published adult prices: sightseeing and landing are different products.</caption>
   <thead><tr><th scope="col">Operator</th><th scope="col">Adult budget</th><th scope="col">What differs</th></tr></thead>
   <tbody>{hashimaOperators.map(operator=><tr key={operator.id}>
    <th scope="row"><a href={`#operator-${operator.id}`} onClick={()=>openOperator(`operator-${operator.id}`)}>{operator.name}</a></th>
    <td data-label="Adult budget">{operator.prices.map(price=><p key={price.label}><strong>About {priceRange(price,hashimaUsd)}</strong><span>{priceRange(price,yen)} charged in yen</span><small>{price.label}</small></p>)}</td>
    <td data-label="What differs">{operator.difference}<a className={styles.detailsLink} href={`#operator-${operator.id}`} onClick={()=>openOperator(`operator-${operator.id}`)}>Meeting point & terms ↓</a></td>
   </tr>)}</tbody>
  </table>
  <p className={styles.note}>USD is a rounded comparison using <a href={hashimaFx.source}>US$1 = ¥{hashimaFx.jpyPerUsd} on 23 October 2026</a>. Pay in the operator’s required currency. Transport to Nagasaki, meals and accommodation are separate. Future tariffs, discounts and package rules may differ.</p>
  {hashimaOperators.map(operator=><details id={`operator-${operator.id}`} key={operator.id} className={styles.operator}>
   <summary>{operator.name}: meeting point, language & terms<span aria-hidden="true">+</span></summary>
   <dl>{[['Time to allow',operator.duration],['Where to check in',operator.meeting],['Included / charged separately',operator.includes],['Language',operator.language],['If landing is prevented',operator.nonLanding],['If you cancel',operator.cancellation]].map(([label,text])=><div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
   <a href={operator.booking}>Check dates and terms with {operator.name} ↗</a>
   <p className={styles.note}>Original operator sources {operator.id==='gunkanjima-cruise'?'(English)':'(Japanese; English information where noted)'}:</p>
   <ul className={styles.sources}>{operator.sources.map(source=><li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ul>
  </details>)}
  <p className={styles.note}>Yamasa’s English page shows an older ¥4,500 boat fare. We use its newer Japanese tariff, effective from October 2025, for the regular ¥5,350 landing total. Confirm language-specific discrepancies with the operator.</p>
 </section>;
}
