import { placeContext } from '@/lib/place-context';

export function PlaceContext({slug}:{slug:string}) {
 const context=placeContext[slug];
 if(!context)return null;
 return <section aria-label="Understanding the place">
  <p className="eyebrow">A closer distinction</p>
  {context.answers.map(answer=><section key={answer.question}>
   <h2>{answer.question}</h2><p>{answer.text}</p>
   <p className="source-context">Source: <a href={answer.url}>{answer.source}</a></p>
  </section>)}
  <p className="source-context">These sources were checked on <time dateTime="2026-10-23">23 October 2026</time>. A published description does not confirm current opening hours or availability.</p>
 </section>;
}
