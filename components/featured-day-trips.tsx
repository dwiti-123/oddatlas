import styles from '@/app/drafts/places/preview.module.css';
import { RummuDayTrip } from '@/components/rummu-day-trip';
import { bankheadDayTrip, sedlecDayTrip } from '@/lib/place-day-trips';

function BankheadDayTrip() {
 const {sources} = bankheadDayTrip;
 return <>
  <h2>Can you visit Bankhead Ghost Town as a quick stop from Banff?</h2>
  <p><strong>Yes. Allow about 30 minutes for the 1.1 km loop through Lower Bankhead.</strong> It fits into a Lake Minnewanka outing when the access road is open. The trail passes remnants of the old coal town, so leave extra time if you want to read the interpretive signs.</p>
  <p><a href={sources.trail}>Parks Canada trail distance and timing ↗</a> · <a href={sources.itinerary}>Lake Minnewanka loop itinerary ↗</a></p>

  <h3 className={styles.tripQuestion}>Do you need to pay to visit Bankhead?</h3>
  <p><strong>Budget CA$12.25 for one adult’s daily Banff National Park pass, plus transport.</strong> If you already hold a valid park pass, it covers the trail visit. Daily admission is free for ages 17 and under. Parks Canada lists <strong>CA$24.50</strong> for up to seven people arriving in one vehicle on a family or group pass. Fuel, car hire and meals are extra.</p>
  <p><a href={sources.fees}>Banff park fees ↗</a> · <a href={sources.passes}>Where to buy a pass ↗</a></p>

  <h3 className={styles.tripQuestion}>Where do you park, and does the bus stop there?</h3>
  <p><strong>Drive to the Lower Bankhead day-use area on Lake Minnewanka Road when it is open.</strong> Roam Route 6 serves the Minnewanka area in season, but its published stop list has no Lower Bankhead stop. Check the timetable before relying on transit.</p>
  <p><a href="https://www.google.com/maps/dir/?api=1&amp;origin=Banff%2C+Alberta&amp;destination=Lower+Bankhead+Day+Use+Area">Driving directions from Banff ↗</a> · <a href={sources.bus}>Roam Route 6 stops ↗</a></p>

  <h3 className={styles.tripQuestion}>Can you drive to Lower Bankhead in winter?</h3>
  <p><strong>Parks Canada lists the access road as closed from November to May.</strong> Check BanffNow for your travel date before adding the trail to a driving itinerary.</p>
  <p><a href={sources.access}>Check current access on BanffNow ↗</a></p>
  <p><small>Published prices checked 23 November 2026.</small></p>
 </>;
}

function SedlecDayTrip() {
 const {sources} = sedlecDayTrip;
 return <>
  <h2>Can you visit the Sedlec Bone Church as a day trip from Prague?</h2>
  <p><strong>Yes. Take the train to Kutná Hora and book your timed ossuary ticket before leaving Prague.</strong> Allow half a day for the ossuary and neighbouring Sedlec cathedral, or a full day if you also want to visit the historic centre.</p>

  <h3 className={styles.tripQuestion}>How much does the Sedlec Ossuary trip cost?</h3>
  <p><strong>Budget from CZK 338 per adult for a return train and entry.</strong> The parish lists the Sedlec Area ticket at <strong>CZK 180</strong>, covering the ossuary and Sedlec Cathedral. Czech Railways advertises Prague to Kutná Hora fares from <strong>CZK 79 each way</strong>. The total assumes that fare is available both ways and you walk from the station. Meals and optional local transport are extra.</p>
  <p><a href={sources.admission}>Parish prices and ticket inclusions ↗</a> · <a href={sources.train}>Czech Railways fares ↗</a></p>

  <h3 className={styles.tripQuestion}>Which station should you choose from Prague?</h3>
  <p><strong>Travel from Praha hlavní nádraží to Kutná Hora hlavní nádraží for Sedlec.</strong> Czech Railways puts the journey at about <strong>one hour</strong>. Walk from the station to the ossuary, or check local bus <strong>801</strong> for the stop named <em>Sedlec, kostnice</em>. Leave time between your train and the entry slot.</p>
  <p><a href={sources.local}>Kutná Hora’s transport and walking directions ↗</a></p>

  <h3 className={styles.tripQuestion}>What should you know before booking a time slot?</h3>
  <p><strong>Your timed slot is for entering the ossuary, and the lower chapel has a 30-minute limit.</strong> Photography is prohibited inside. Access currently uses a temporary staircase during restoration, so check the parish’s visitor information if anyone in your group needs step-free access.</p>
  <p><a href={sources.booking}>Book through the parish ↗</a> · <a href={sources.admission}>Visitor and accessibility rules ↗</a></p>
  <p><small>Published prices checked 23 November 2026.</small></p>
 </>;
}

export const featuredDayTrips: Partial<Record<string, () => React.JSX.Element>> = {
 bankhead: BankheadDayTrip,
 'rummu-quarry': RummuDayTrip,
 'sedlec-ossuary': SedlecDayTrip,
};
