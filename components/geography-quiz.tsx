'use client';
/* eslint-disable @next/next/no-img-element -- Existing compressed, licensed WebP assets preserve exact source URLs. */
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export type QuizQuestion={slug:string;name:string;prompt:string;options:string[];answer:string;explanation:string;image:string;alt:string;imageKind:string};
export function GeographyQuiz({questions}:{questions:QuizQuestion[]}){
 const [index,setIndex]=useState(0),[answers,setAnswers]=useState<string[]>([]),[complete,setComplete]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 const current=questions[index],selected=answers[index];
 const score=answers.filter((a,i)=>a===questions[i].answer).length;
 function next(){if(index===questions.length-1)setComplete(true);else setIndex(index+1);requestAnimationFrame(()=>heading.current?.focus());}
 function restart(){setAnswers([]);setIndex(0);setComplete(false);requestAnimationFrame(()=>heading.current?.focus());}
 if(complete)return <section className="quiz-panel"><p className="eyebrow">The journey / complete</p><h2 ref={heading} tabIndex={-1}>You found {score} of {questions.length}.</h2><p>Five places, five stories worth a closer look.</p><ul className="discovery-index">{questions.map((q,i)=><li key={q.slug}><Link href={`/places/${q.slug}`}>{q.name}</Link><span>{answers[i]===q.answer?'Correct':'Answer: '+q.answer}</span></li>)}</ul><Button className="discovery-button" onClick={restart}>Try again</Button></section>;
 return <section className="quiz-panel" aria-label="Five-question geography quiz"><p className="eyebrow">Question {index+1} / {questions.length}</p><h2 ref={heading} tabIndex={-1}>{current.prompt}</h2><figure><img src={current.image} alt={current.alt} width="960" height="640"/>{current.imageKind==='illustration'&&<figcaption className="photo-caption">Concept illustration; not a photograph.</figcaption>}</figure><div className="quiz-options">{current.options.map(option=><Button key={option} variant="outline" disabled={Boolean(selected)} aria-pressed={selected===option} className={selected&&option===current.answer?'quiz-correct':''} onClick={()=>setAnswers([...answers,option])}>{option}</Button>)}</div><div className="quiz-feedback" role="status">{selected&&<><p><strong>{selected===current.answer?'That’s right.':`It’s ${current.answer}.`}</strong> {current.explanation}</p><Link className="text-link" href={`/places/${current.slug}`}>Read {current.name}’s story ↗</Link><br/><Button className="discovery-button" onClick={next}>{index===questions.length-1?'See my result':'Next place →'}</Button></>}</div></section>;
}
