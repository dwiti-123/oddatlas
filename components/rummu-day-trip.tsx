import styles from '@/app/drafts/places/preview.module.css';
import { rummuDayTrip } from '@/lib/rummu-day-trip';

export function RummuDayTrip() {
 const {checked, sources} = rummuDayTrip;
 return <>
  <h2>Can you visit Rummu Quarry from Tallinn in half a day?</h2>
  <p><strong>Yes. Half a day is enough for the quarry shoreline and the Murru Prison museum.</strong> Take the bus for a lower-cost visit. For a full day out, join a coastal tour or add time on the water.</p>

  <h3 className={styles.tripQuestion}>Can you get there without a car?</h3>
  <p><strong>Yes. A return bus trip and entry cost €16–€18 per adult.</strong> Take bus <strong>146</strong> from Vabaduse väljak to the Rummu stop. Allow <strong>about 1 hour 10 minutes</strong> on the bus and a <strong>1 km walk</strong> to the gate at Haapsalu mnt 13. The fare is <strong>€4 each way</strong> when you buy from the driver. Pick your return bus before you leave Tallinn.</p>
  <p><strong>Which ticket should you buy?</strong> The quarry is <strong>€8</strong> on its own when that ticket is offered, or <strong>€10</strong> with the prison museum. From September to May, the operator lists the combined ticket at <strong>€10</strong>, with card payment at the gate. Driving takes about an hour each way, and the operator lists free parking. Fuel, food and activities are extra.</p>
  <p><a href={sources.timetable}>Bus timetable ↗</a> · <a href={sources.fares}>Bus fares ↗</a> · <a href={sources.tickets}>Entry tickets ↗</a> · <a href={sources.driving}>Travel directions ↗</a></p>

  <h3 className={styles.tripQuestion}>What does the €89 coastal tour add?</h3>
  <p><strong>A seven-hour outing with a guide, transport and quarry entry.</strong> Tallinn Day Trips also stops at Keila-Joa waterfall and the coastal cliffs. Pick this if you want to see more than the quarry and leave the driving to someone else. Lunch is extra.</p>
  <p><a href={sources.tour}>Check coastal tour dates ↗</a></p>

  <h3 className={styles.tripQuestion}>Can you swim or see the ruins underwater?</h3>
  <p><strong>You can swim at the quarry or book an introductory dive to see the submerged ruins.</strong> Rummu Diving lists the dive at <strong>€80</strong>, including gear and quarry entry. If you’d rather stay on the surface, its raft tour is <strong>€35</strong>, including entry. With the return bus, budget <strong>€88 for the dive</strong> or <strong>€43 for the raft</strong>, before meals. Check the activity time and meeting point against your bus schedule.</p>
  <p><a href={sources.tickets}>Quarry swimming rules ↗</a> · <a href={sources.water}>Raft and dive prices ↗</a></p>
  <p><small>Published prices checked {checked}.</small></p>
 </>;
}
