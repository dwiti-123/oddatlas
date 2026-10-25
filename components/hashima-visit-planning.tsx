import {hashimaVisit as visit, hashimaFx, hashimaUsd} from '@/lib/hashima-visit';
import styles from './hashima-visit-planning.module.css';

export function HashimaAtAGlance() {
 return <section className={styles.glance} aria-labelledby="hashima-glance-title">
  <div className={styles.glanceHeading}><h2 id="hashima-glance-title">Your visit, at a glance</h2><span>Checked 24 Oct 2026</span></div>
  <div className={styles.status}><strong>See Hashima from the water</strong><span>A boat trip from Nagasaki, with a stop at Takashima.</span></div>
  <dl className={styles.facts}>
   <div><dt>Adult ticket</dt><dd>About {hashimaUsd(3600)}<small>Operator price: ¥3,600</small></dd></div>
   <div><dt>Boat trip</dt><dd>2 hr 20 min<small>Allow half a day including check-in</small></dd></div>
   <div><dt>Start from</dt><dd>Nagasaki, Japan</dd></div>
   <div><dt>Where to stay</dt><dd>Nagasaki<small>No accommodation on Hashima</small></dd></div>
  </dl>
  <a className={styles.action} href="#plan-hashima">Plan your boat trip <span aria-hidden="true">↓</span></a>
  <p className={styles.accessLine}>Island landing is currently suspended. <a href={visit.sources[0].url}>Check reopening updates ↗</a></p>
 </section>;
}

export function HashimaFieldGuide() {
 return <section id="plan-hashima" className={styles.fieldGuide} aria-labelledby="hashima-trip-title">
  <p className="eyebrow">Plan your visit</p><h2 id="hashima-trip-title">Your boat trip to Hashima</h2>
  <section className={styles.featuredTrip} aria-labelledby="hashima-cruise-title">
   <div className={styles.tripHeader}><div><p className={styles.kicker}>Sightseeing cruise</p><h3 id="hashima-cruise-title">See the island from the sea</h3></div><p className={styles.tripPrice}>About {hashimaUsd(3600)}<span>per adult · ¥3,600 charged in yen</span></p></div>
   <dl className={styles.featureFacts}><div><dt>Duration</dt><dd>About 2 hr 20 min</dd></div><div><dt>You’ll see</dt><dd>Hashima’s skyline + a Takashima stop</dd></div><div><dt>Departure</dt><dd>Nagasaki · 09:10 or 14:00</dd></div><div><dt>Operator</dt><dd>Gunkanjima Cruise</dd></div></dl>
   <a className={styles.action} href={visit.booking}>Check dates with the operator <span aria-hidden="true">↗</span></a>
   <p className={styles.cardNote}>Boat sightseeing only; you won’t step onto Hashima. Confirm your sailing date before booking.</p>
  </section>
  <HashimaCurrencyNote/>
  <section className={styles.dayPlan} aria-labelledby="hashima-day-title"><h2 id="hashima-day-title">Your morning, in 3 steps</h2><p>All times are local to Nagasaki. Follow your booking confirmation.</p>
   <ol className={styles.steps}><li><span>01</span><div><h3>08:10–08:50 · Check in</h3><p><strong>Go to 11-22 Motofune-cho, Nagasaki.</strong> This is Gunkanjima Cruise’s reception address.</p></div></li><li><span>02</span><div><h3>09:10 · Board your cruise</h3><p><strong>See Hashima from the water and stop at Takashima.</strong> The published sightseeing trip takes about 2 hr 20 min.</p></div></li><li><span>03</span><div><h3>After the cruise · Explore Nagasaki</h3><p>Allow time to disembark before your next plan. You don’t need an overnight stay for this trip.</p></div></li></ol>
   <p className={styles.caption}><strong>Going in the afternoon?</strong> Check in 13:00–13:40 for the 14:00 departure.</p>
  </section>
  <section className={styles.beforeBooking}><h2>Know before you book</h2><ul><li><strong>Bring cash:</strong> direct Gunkanjima Cruise bookings are paid in yen on the day.</li><li><strong>Guiding is in Japanese:</strong> check language support before reserving.</li><li><strong>Ages 4 and up:</strong> ask the operator about mobility requirements.</li><li><strong>Pack walking shoes and a raincoat:</strong> umbrellas are not allowed.</li><li><strong>Check cancellation terms:</strong> weather can change the trip. <a href={visit.sources[2].url}>Operator’s terms ↗</a></li></ul></section>
  <HashimaFutureLanding/>
  <section className={styles.practicalSources}><h2>Sources for your trip</h2><p className={styles.caption}>Operator information checked <time dateTime={visit.checked}>24 October 2026</time>. This is a researched guide, not a first-hand trip report.</p><ol className={styles.sources}>{visit.sources.map(source=><li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ol></section>
 </section>;
}

function HashimaCurrencyNote() {
 return <p className={styles.caption}>USD amounts are approximate: US$1 = ¥{hashimaFx.jpyPerUsd}, <a href={hashimaFx.source}>23 October 2026 rate</a>. Pay in yen; your bank’s conversion may differ. Travel to Nagasaki, meals and accommodation cost extra.</p>;
}

function HashimaFutureLanding() {
 return <details className={styles.futureTrip}><summary>Planning a future island landing?</summary><div><p>Island landing is currently suspended. <a href={visit.sources[0].url}>Check reopening updates</a> before choosing a landing ticket.</p><p><strong>Gunkanjima Cruise:</strong> normal online adult total ¥4,250 (about {hashimaUsd(4250)}), including ¥650 entry, through March 2027. The usual tour takes about three hours. <a href={visit.sources[1].url}>Published fares ↗</a></p><p><strong>Gunkanjima Concierge:</strong> normal standard adult ticket from ¥6,150 (about {hashimaUsd(6150)}), including museum and entry; specific days ¥6,650 (about {hashimaUsd(6650)}). Credit-card payment only. <a href={visit.sources[3].url}>Official prices ↗</a></p><p>When landing operates, visitors use designated paths. Tickets do not allow entry into abandoned buildings; sea conditions can still prevent landing.</p></div></details>;
}

export function HashimaAccessNotice() {
 return <div className={styles.notice}><p><strong>See Hashima by boat.</strong> The published sightseeing trip takes about 2 hr 20 min and costs ¥3,600 per adult (about {hashimaUsd(3600)}).</p><a className="text-link" href={visit.booking}>Check cruise dates ↗</a><p className={styles.accessLine}>Island landing is currently suspended. <a href={visit.sources[0].url}>Check reopening updates ↗</a></p></div>;
}

// The existing blog keeps its article layout; the field-guide prototype is place-page only.
export function HashimaVisitPlanning({showNotice=true}:{showNotice?:boolean}) {
 return <section id="plan-hashima" className={styles.planning} aria-labelledby="hashima-planning-title">
  <p className="eyebrow">From the story to the journey</p><h2 id="hashima-planning-title">How can you visit Hashima from Nagasaki?</h2>
  {showNotice&&<HashimaAccessNotice/>}
  <p>Book a sightseeing cruise with a Nagasaki boat operator to see Hashima from the water. Gunkanjima Cruise’s published trip includes a Takashima stop and takes about 2 hr 20 min.</p>
  <h2>How much does a Hashima Island trip cost?</h2><p><strong>¥3,600 per adult—about {hashimaUsd(3600)}.</strong> This is the operator’s published sightseeing fare. <a className="text-link" href={visit.booking}>Check dates and reserve with the operator ↗</a></p>
  <HashimaCurrencyNote/>
  <HashimaFutureLanding/>
  <h2>How long do you need, and where do you check in?</h2><p>Allow half a day including check-in. Gunkanjima Cruise’s reception is at 11-22 Motofune-cho, Nagasaki. Published departures are 09:10 and 14:00, with check-in windows of 08:10–08:50 and 13:00–13:40.</p>
  <h2>What should you check before booking?</h2><p>Direct Gunkanjima Cruise bookings require cash payment and specify Japanese guiding only. The minimum age is four. Check mobility requirements and cancellation terms with the operator; bring walking shoes and a raincoat rather than an umbrella.</p>
  <h3>Practical sources</h3><ol className={styles.sources}>{visit.sources.map(source=><li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ol><p className="source-context">Operator information checked 24 October 2026. Confirm your sailing date directly before booking.</p>
 </section>;
}
