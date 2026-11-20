import type { Metadata } from 'next';
import { whichawayPost as post } from '@/lib/blog';
import StayBookingGuide from '../stay-booking-guide';

const rates = 'https://white-desert.com/prices';
const camp = 'https://white-desert.com/camps/whichaway-camp';
const penguinChicks = 'https://white-desert.com/itineraries/early-emperor-penguins';
const southPole = 'https://white-desert.com/itineraries/south-pole-emperor-penguins';
const bothCamps = 'https://white-desert.com/itineraries/the-long-stay';
const dayTrip = 'https://white-desert.com/itineraries/antarctica-in-a-day';
const path = `/blog/${post.slug}`;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: path },
  openGraph: { title: post.title, description: post.description, url: path, type: 'article' },
};

export default function WhichawayBookingGuide() {
  return (
    <StayBookingGuide
      post={post}
      dek="A heated pod beside an Antarctic glacier sounds like a hotel stay. To get there, you first have to choose an expedition from Cape Town."
      facts={[
        ['Expedition price', <><strong>US$75,250 per person</strong> for the lowest-priced Whichaway option in this comparison.</>],
        ['How you get there', <><strong>About 5½ hours by air</strong> from Cape Town to Antarctica, followed by an operator transfer.</>],
        ['Time to set aside', <><strong>6–8 days on the sample trips below</strong>, plus at least two days in Cape Town on either side.</>],
      ]}
      booking={{ label: 'Check White Desert’s dates and enquire', url: rates }}
      contents={[['cost', 'Cost & trips'], ['getting-there', 'Flights & time'], ['camp', 'Inside the pod'], ['booking', 'How to book']]}
      sources={[
        ['White Desert — Dates and rates', rates],
        ['White Desert — Whichaway Camp and pod amenities', camp],
        ['White Desert — Baby Penguins & Blue Tunnels', penguinChicks],
        ['White Desert — South Pole & Penguins', southPole],
        ['White Desert — The Long Stay', bothCamps],
        ['White Desert — Antarctica in a Day', dayTrip],
      ]}
    >
      <section id="cost">
        <h2>How much does it cost to stay at Whichaway Camp?</h2>
        <p>White Desert sells the stay as part of an expedition. Its <a href={rates}>2026–27 rates</a> give these per-person prices. The durations come from the operator’s sample itineraries and include the Antarctica flights from and back to Cape Town.</p>
        <ul>
          <li><a href={penguinChicks}>Baby Penguins & Blue Tunnels</a> · <strong>US$75,250, 6 days</strong>. Choose this if seeing emperor penguin chicks and exploring the ice tunnels matter more to you than reaching the South Pole.</li>
          <li><a href={southPole}>South Pole & Penguins</a> · <strong>US$115,500, 8 days</strong>. Choose this if you want both the colony at Atka Bay and the South Pole on one trip. Confirm Whichaway as your base when enquiring.</li>
          <li><a href={bothCamps}>The Long Stay</a> · <strong>US$110,500, 8 days on the sample schedule</strong>. Choose this if you want to experience Whichaway’s rocky oasis and Echo’s ice landscape on the same trip, alongside a South Pole visit.</li>
        </ul>
        <p>Two travelers on the US$75,250 option would budget <strong>US$150,500 for the expedition fares</strong>. Check the full cost of flights to South Africa, the Cape Town buffer nights, insurance, gear and any solo supplement separately. The <a href={dayTrip}>US$16,500 Antarctica in a Day trip</a> returns to Cape Town the same day and offers no camp night.</p>
      </section>
      <section id="getting-there">
        <h2>How do you get to Whichaway from Cape Town?</h2>
        <p>The trip starts with a briefing and gear check in Cape Town. White Desert’s sample itineraries allow <strong>about 5½ hours</strong> for the flight south. The Antarctic flight lands at Wolf’s Fang Runway and the operator takes you onward to camp. Ask how the transfer works on your departure.</p>
        <p>White Desert recommends arriving in Cape Town <strong>at least two days before</strong> the Antarctic trip and leaving <strong>two days after</strong> your scheduled return. A six-day departure therefore needs <strong>roughly ten days</strong> with the buffers, before adding your flights to and from South Africa. Weather can shift flights and change the order of activities.</p>
      </section>
      <section id="camp">
        <h2>What is it like to sleep at Whichaway?</h2>
        <p>The <a href={camp}>camp’s six heated pods</a> sit on exposed rock in the Schirmacher Oasis. Each has a private bathroom and shower, and a glass sitting area looks toward the glacier. That contrast is the reason to choose Whichaway. You wake up beside freshwater lakes and exposed rock, with ice framing the view.</p>
        <p>Ask how many nights of your itinerary are actually at Whichaway. Trips can include nights at another camp or in Antarctica’s interior. For time around Whichaway itself, ask which activities can be adapted to your group’s fitness and comfort.</p>
      </section>
      <section id="booking">
        <h2>How do you book the expedition?</h2>
        <p>Open <a href={rates}>White Desert’s rates</a>, choose a season and itinerary, and enquire about a departure that includes Whichaway. Before paying a deposit, get the camp allocation, number of nights, inclusions and weather delay terms in writing. The operator also asks guests to complete insurance and medical paperwork during preparation.</p>
      </section>
    </StayBookingGuide>
  );
}
