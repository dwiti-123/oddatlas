export const budgetCurrencies=['USD','EUR','GBP','INR','JPY','CAD','AUD','MXN','CHF','SGD','NZD','ZAR','THB','TRY','SEK','IDR','BRL','KRW','CNY','AED'] as const;
export type BudgetCurrency=typeof budgetCurrencies[number];
export const budgetFields=[
 {key:'days',label:'Travel days',hint:'Count the days you will spend on the trip.',min:1,max:3650,integer:true},
 {key:'nights',label:'Accommodation nights',hint:'Enter nights separately from travel days.',min:0,max:3650,integer:true},
 {key:'travellers',label:'Travellers sharing the budget',hint:'Costs are split equally between this many people.',min:1,max:1000,integer:true},
 {key:'travel',label:'Getting there · per person',hint:'Return flights, trains or other intercity travel for the whole trip.',min:0,max:10000000,integer:false},
 {key:'accommodation',label:'Accommodation · per night, whole group',hint:'The combined nightly cost of all rooms or accommodation.',min:0,max:10000000,integer:false},
 {key:'food',label:'Food · per person, per day',hint:'Your daily estimate for meals and drinks.',min:0,max:10000000,integer:false},
 {key:'localTransport',label:'Local transport · per person, per day',hint:'Buses, trains and your share of local taxis.',min:0,max:10000000,integer:false},
 {key:'activities',label:'Activities · per person, whole trip',hint:'Entry tickets, tours and other planned activities.',min:0,max:10000000,integer:false},
 {key:'sharedExtras',label:'Other shared costs · whole trip',hint:'For example, a group transfer. Include each expense only once.',min:0,max:10000000,integer:false},
 {key:'buffer',label:'Extra buffer (%)',hint:'An optional percentage added to your estimated subtotal.',min:0,max:1000,integer:false},
] as const;
export type BudgetKey=typeof budgetFields[number]['key'];
export type BudgetInput=Record<BudgetKey,string>&{currency:BudgetCurrency};
export const emptyBudget:BudgetInput={currency:'USD',days:'7',nights:'6',travellers:'2',travel:'',accommodation:'',food:'',localTransport:'',activities:'',sharedExtras:'',buffer:''};
export const exampleBudget:BudgetInput={currency:'USD',days:'7',nights:'6',travellers:'2',travel:'200',accommodation:'80',food:'30',localTransport:'10',activities:'60',sharedExtras:'40',buffer:'10'};

export function budgetErrors(input:BudgetInput){
 const errors:Partial<Record<BudgetKey,string>>={};
 for(const field of budgetFields){
  const value=Number(input[field.key]);
  if(!Number.isFinite(value)||value<field.min||value>field.max||(field.integer&&!Number.isInteger(value))||(field.min>0&&input[field.key].trim()==='')){
   errors[field.key]=`Enter ${field.integer?'a whole number':'a number'} from ${field.min.toLocaleString('en-US')} to ${field.max.toLocaleString('en-US')}.`;
  }
 }
 return errors;
}
export function parseSavedBudget(raw:string|null):BudgetInput|null{
 if(!raw)return null;
 try{
  const value:unknown=JSON.parse(raw);
  if(!value||typeof value!=='object'||Array.isArray(value))return null;
  const item=value as Record<string,unknown>;
  if(!budgetCurrencies.includes(item.currency as BudgetCurrency))return null;
  const input={currency:item.currency} as BudgetInput;
  for(const field of budgetFields){if(typeof item[field.key]!=='string')return null;input[field.key]=item[field.key] as string;}
  return Object.keys(budgetErrors(input)).length?null:input;
 }catch{return null;}
}
export function calculateBudget(input:BudgetInput){
 if(Object.keys(budgetErrors(input)).length)return null;
 const n=(key:BudgetKey)=>Number(input[key]);
 const people=n('travellers'),days=n('days');
 const categories=[
  {label:'Getting there',total:n('travel')*people},
  {label:'Accommodation',total:n('accommodation')*n('nights')},
  {label:'Food & drinks',total:n('food')*days*people},
  {label:'Local transport',total:n('localTransport')*days*people},
  {label:'Activities',total:n('activities')*people},
  {label:'Other shared costs',total:n('sharedExtras')},
 ];
 const subtotal=categories.reduce((sum,row)=>sum+row.total,0);
 const buffer=subtotal*n('buffer')/100;
 const total=subtotal+buffer;
 return {categories,subtotal,buffer,total,perPerson:total/people,days,people};
}
export function budgetMoney(amount:number,currency:BudgetCurrency){return new Intl.NumberFormat('en-US',{style:'currency',currency,currencyDisplay:'code',maximumFractionDigits:2}).format(amount);}
export function budgetSummary(input:BudgetInput){
 const result=calculateBudget(input);if(!result)return '';
 return [`Trip budget · ${result.days} days / ${input.nights} nights / ${result.people} travellers`,...result.categories.map(row=>`${row.label}: ${budgetMoney(row.total,input.currency)}`),`Buffer (${input.buffer||'0'}%): ${budgetMoney(result.buffer,input.currency)}`,`Group total: ${budgetMoney(result.total,input.currency)}`,`Per person: ${budgetMoney(result.perPerson,input.currency)}`,'Personal estimates, not live prices. Costs split equally.','Calculate your own: https://www.oddatlas.world/tools/travel-budget-calculator'].join('\n');
}
