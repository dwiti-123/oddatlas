import { hashimaVisit } from './hashima-visit';

// Published adult individual prices checked against operator pages, not live quotes.
// Landing tariffs describe the itinerary only when the visitor facility is open.
export const hashimaOperatorCheck = '2026-10-27';
export const hashimaOperators = [
 {
  id:'gunkanjima-cruise', name:'Gunkanjima Cruise',
  prices:[{label:'Dated sightseeing alternative',min:3600},{label:'Published online landing total',min:4250}],
  difference:'Takashima stop; the dated alternative is boat sightseeing only.',
  duration:'About 2 hr 20 min for the alternative cruise.',
  meeting:'11-22 Motofune-cho, Nagasaki. Reception 08:10–08:50 or 13:00–13:40; departures 09:10 or 14:00.',
  includes:'The alternative includes a Takashima stop. Its ¥3,600 fare has no Hashima facility fee; the published landing total is ¥3,600 + ¥650.',
  language:'English booking information is available. Confirm the spoken guiding language for your sailing.',
  nonLanding:'The dated alternative has no Hashima facility charge. Do not assume a full cruise-fare refund if landing is prevented.',
  cancellation:'Direct web bookings: no customer-cancellation fee through the previous day; same-day cancellation is 100%. Check itinerary-change exceptions and agency terms.',
  booking:hashimaVisit.booking,
  sources:[hashimaVisit.sources[0],hashimaVisit.sources[1],hashimaVisit.sources[2]],
 },
 {
  id:'yamasa', name:'Yamasa Shipping',
  prices:[{label:'Published sightseeing fare',min:4200},{label:'Regular landing total',min:5350}],
  difference:'Separate sightseeing tariff; early-booking discounts may apply to landing fares.',
  duration:'Landing itinerary: about 2½ hours. Confirm the sightseeing itinerary separately.',
  meeting:'Nagasaki Port Terminal, ground-floor counter 7, 17-3 Motofuna-machi. Boarding is at Ohato pier 2; landing departures are listed at 09:00 and 13:00.',
  includes:'Regular landing total: ¥4,700 boat fare + ¥650 facility fee. The separate ¥4,200 sightseeing tariff does not include landing.',
  language:'The English page lists English guides on selected days. Confirm a guide for your date.',
  nonLanding:'The Japanese landing page states a refund of the facility fee plus 10% of the boat fare if converted to a sightseeing cruise. Confirm which fare and booking terms apply.',
  cancellation:'A customer-cancellation fee can apply. Confirm the current schedule and booking-channel terms before paying.',
  booking:'https://order.gunkan-jima.net/',
  sources:[
   {title:'Yamasa — current Japanese tariff, itinerary and non-landing terms',url:'https://www.gunkan-jima.net/'},
   {title:'Yamasa — published sightseeing tariff',url:'https://www.yamasa-kaiun.net/'},
   {title:'Yamasa — English reception and language information',url:'https://www.gunkan-jima.net/en/'},
  ],
 },
 {
  id:'concierge', name:'Gunkanjima Concierge',
  prices:[{label:'Standard sightseeing conversion',min:4500,max:5000},{label:'Standard landing total',min:6150,max:6650}],
  difference:'Standard ticket includes the Gunkanjima Digital Museum; premium seating costs more.',
  duration:'Standard landing itinerary: roughly 2½ hours sailing, plus museum time. Confirm the sailing in your reservation.',
  meeting:'Check in at the Digital Museum, 5-6 Matsugae-machi, then walk to Tokiwa Pier. Standard-plan reception is listed as 09:00–10:05 or 10:30–13:10.',
  includes:'Standard landing fare: ¥5,500 on weekdays or ¥6,000 on designated days, plus ¥650 facility admission. Museum admission is included.',
  language:'Confirm English guiding or audio support directly; we have not verified it for the selected plan.',
  nonLanding:'The Standard-plan table lists a ¥1,650 refund when converted to sightseeing, leaving ¥4,500 or ¥5,000. Cancelling yourself is a different situation.',
  cancellation:'Published customer charges: 30% from 7–2 days before, and 100% the previous day or same day. Check the operator’s exact cutoff and your booking channel.',
  booking:'https://www.gunkanjima-concierge.com/cgi/web/',
  sources:[
   {title:'Concierge — Standard ticket, museum inclusion and check-in',url:'https://www.gunkanjima-concierge.com/plan_joriku/standard.html'},
   {title:'Concierge — non-landing refunds and cancellation schedule',url:'https://www.gunkanjima-concierge.com/plan_joriku/notes.html'},
   {title:'Concierge — museum reception address and Tokiwa Pier',url:'https://www.gunkanjima-concierge.com/access/'},
  ],
 },
];
