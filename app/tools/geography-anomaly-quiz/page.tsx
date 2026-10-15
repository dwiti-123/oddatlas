import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/site-shell';
import { GeographyQuiz, type QuizQuestion } from '@/components/geography-quiz';
import { places } from '@/lib/places';
import { placeImage } from '@/lib/discovery';
export const metadata:Metadata={title:'Weird geography quiz — Five unusual places around the world',description:'Test your geography with five ghost towns and unusual stays. Guess the country, discover the answer and explore the sourced story behind each place.',alternates:{canonical:'/tools/geography-anomaly-quiz'}};
export default function QuizPage(){
 const slugs=['hashima','kolmanskop','mirrorcube','dhanushkodi','palacio-de-sal'];
 const countries=[...new Set(places.map(p=>p.country))];
 const questions:QuizQuestion[]=slugs.map((slug,i)=>{const p=places.find(p=>p.slug===slug)!;const options=countries.filter(c=>c!==p.country).slice(i,i+3);options.splice(i%4,0,p.country);return {slug,name:p.name,prompt:`Which country is home to ${p.name}?`,options,answer:p.country,explanation:p.hook,image:placeImage(p),alt:p.alt,imageKind:p.imageKind};});
 return <><Header/><main id="main" className="guide-page wrap"><div className="breadcrumb"><Link href="/">Home</Link> / Discovery tools</div><p className="eyebrow">Five stops around the world</p><h1>How well do you know<br/><em>the unusual world?</em></h1><p className="guide-intro">A quick geography quiz through ghost towns and extraordinary stays. Guess the country, then follow the story. No timer, no account, just curiosity.</p><GeographyQuiz questions={questions}/><noscript><p>The quiz needs JavaScript. Explore the places below to read their stories.</p></noscript><section className="guide-ending"><h2>Where do the quiz answers come from?</h2><p>Each answer comes from our curated place records. Their permanent pages include the history, map locator, original sources and photo credits.</p><ul>{questions.map(q=><li key={q.slug}><Link className="text-link" href={`/places/${q.slug}`}>{q.name}</Link></li>)}</ul><Link className="text-link" href="/tools/random-weird-place">Find your next random place</Link></section></main><Footer/></>;
}
