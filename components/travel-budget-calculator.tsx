'use client';
import {useMemo,useRef,useState,useSyncExternalStore} from 'react';
import {budgetCurrencies,budgetFields,budgetErrors,budgetMoney,budgetSummary,calculateBudget,emptyBudget,exampleBudget,parseSavedBudget,type BudgetInput} from '@/lib/travel-budget';
import {captureAction} from '@/lib/analytics';
import styles from './travel-budget-calculator.module.css';
const storageKey='odd-atlas:travel-budget:v1';
function readSaved(){try{return localStorage.getItem(storageKey);}catch{return null;}}
function subscribe(notify:()=>void){window.addEventListener(storageKey,notify);window.addEventListener('storage',notify);return()=>{window.removeEventListener(storageKey,notify);window.removeEventListener('storage',notify);};}
const noSaved=()=>null;

export function TravelBudgetCalculator(){
 const raw=useSyncExternalStore(subscribe,readSaved,noSaved);
 const saved=useMemo(()=>parseSavedBudget(raw),[raw]);
 const [draft,setDraft]=useState<BudgetInput|null>(null);
 const input=draft??saved??emptyBudget;
 const [notice,setNotice]=useState('');
 const [copyFallback,setCopyFallback]=useState('');
 const copyField=useRef<HTMLTextAreaElement>(null);
 const result=calculateBudget(input),errors=budgetErrors(input);
 function update(key:keyof BudgetInput,value:string){setDraft({...input,[key]:value});setNotice('');setCopyFallback('');}
 function save(){
  if(!result)return;
  try{localStorage.setItem(storageKey,JSON.stringify(input));window.dispatchEvent(new Event(storageKey));setNotice('Budget saved on this device. It will be here when you return.');captureAction('travel_budget_saved',{});}
  catch{setNotice('Browser storage is unavailable. You can still copy your budget summary.');}
 }
 async function copy(){
  const text=budgetSummary(input);if(!text)return;
  try{await navigator.clipboard.writeText(text);setNotice('Summary copied. Paste it into a message or your trip notes.');setCopyFallback('');captureAction('travel_budget_copied',{});}
  catch{setCopyFallback(text);setNotice('Select and copy the summary below.');requestAnimationFrame(()=>{copyField.current?.focus();copyField.current?.select();});}
 }
 function clear(){
  setDraft({...emptyBudget});setCopyFallback('');
  try{localStorage.removeItem(storageKey);window.dispatchEvent(new Event(storageKey));setNotice('Budget cleared on this device.');}
  catch{setNotice('Fields cleared. Browser storage could not be updated.');}
 }
 return <section id="calculator" className={styles.calculator} aria-label="Travel budget calculator">
  <div className={styles.inputs}>
   <div className={styles.inputHeading}><h2>Your trip, in numbers.</h2><button type="button" onClick={()=>{setDraft({...exampleBudget});setNotice('Illustrative example loaded. These are not prices for a specific destination.');setCopyFallback('');}}>Try an example ↗</button></div>
   <p className={styles.note}>Enter all amounts in one currency. Leave a cost blank to count it as zero. {saved&&draft===null?'Your saved budget has been restored.':''}</p>
   <div className={styles.currency}><label htmlFor="budget-currency">Budget currency</label><select id="budget-currency" value={input.currency} onChange={event=>update('currency',event.target.value)} aria-describedby="budget-currency-help">{budgetCurrencies.map(currency=><option key={currency} value={currency}>{currency}</option>)}</select><p id="budget-currency-help" className={styles.hint}>Changing currency relabels your amounts. It does not convert exchange rates.</p></div>
   <div className={styles.fields}>{budgetFields.map(field=><div className={styles.field} key={field.key}><label htmlFor={`budget-${field.key}`}>{field.label}</label><input id={`budget-${field.key}`} type="number" inputMode={field.integer?'numeric':'decimal'} min={field.min} max={field.max} step={field.integer?1:'any'} value={input[field.key]} placeholder="0" onChange={event=>update(field.key,event.target.value)} aria-invalid={Boolean(errors[field.key])} aria-describedby={`budget-${field.key}-help${errors[field.key]?` budget-${field.key}-error`:''}`}/><p id={`budget-${field.key}-help`} className={styles.hint}>{field.hint}</p>{errors[field.key]&&<p id={`budget-${field.key}-error`} className={styles.error}>{errors[field.key]}</p>}</div>)}</div>
  </div>
  <div className={styles.result}>
   <p className="eyebrow">Your estimate</p><h2>Room for the journey.</h2>
   <div className={styles.totals} aria-live="polite" aria-atomic="true"><div><span>Whole trip · all travellers</span><strong data-testid="budget-total">{result?budgetMoney(result.total,input.currency):'—'}</strong></div><div><span>Per person · equal split</span><strong data-testid="budget-per-person">{result?budgetMoney(result.perPerson,input.currency):'—'}</strong></div></div>
   {result?<><dl className={styles.breakdown}>{result.categories.map(row=><div key={row.label}><dt>{row.label}</dt><dd>{budgetMoney(row.total,input.currency)}</dd></div>)}<div><dt>Subtotal</dt><dd data-testid="budget-subtotal">{budgetMoney(result.subtotal,input.currency)}</dd></div><div><dt>Extra buffer ({input.buffer||0}%)</dt><dd data-testid="budget-buffer">{budgetMoney(result.buffer,input.currency)}</dd></div></dl><p className={styles.note}>{result.days} travel days · {input.nights} nights · {result.people} {result.people===1?'traveller':'travellers'}. Estimates are split equally and rounded for display.</p></>:<p className={styles.error}>Check the highlighted fields to calculate your budget.</p>}
   <div className={styles.actions}><button type="button" disabled={!result} onClick={save}>Save budget</button><button type="button" disabled={!result} onClick={copy}>Copy summary</button><button type="button" onClick={clear}>Clear</button></div>
   <p className={styles.note}>Saved only in this browser, without an account. Copying shares the summary only when you paste it elsewhere.</p>
   <p role="status" className={styles.status}>{notice}</p>
   {copyFallback&&<textarea ref={copyField} className={styles.copyField} aria-label="Budget summary to copy" readOnly value={copyFallback}/>}
  </div>
 </section>;
}
