import type { Metadata } from 'next';
import { palacioDeSalPost as post } from '@/lib/blog';
import StayBookingGuide from '../stay-booking-guide';

const booking = 'https://palaciodesal.com.bo/en/booking/';
const rooms = 'https://palaciodesal.com.bo/es/habitacion/';
const faq = 'https://palaciodesal.com.bo/en/faqs/';
const services = 'https://palaciodesal.com.bo/en/services/';
const path = `/blog/${post.slug}`;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: path },
  openGraph: { title: post.title, description: post.description, url: path, type: 'article' },
};

export default function PalacioDeSalBookingGuide() {
  return (
    <StayBookingGuide
      post={post}
      dek="The room is part of the reason to go. Plan the ride from Uyuni and the salt-flat outing separately so you have time for both."
      facts={[
        ['Room price example', <><strong>About US$297 per room for two</strong> for 1 December 2026 in the hotel’s calendar.</>],
        ['Getting there', <><strong>Via Colchani, outside Uyuni.</strong> The hotel lists three scheduled free rides to town.</>],
        ['Time to set aside', <><strong>One night for the hotel, two for an easier pace</strong> if you also want a full day on the salt flats.</>],
      ]}
      booking={{ label: 'Check dates with Palacio de Sal', url: booking }}
      contents={[['cost', 'Room price'], ['transfer', 'Transfers from Uyuni'], ['itinerary', 'One or two nights?'], ['season', 'Mirror season'], ['booking', 'How to book']]}
      sources={[
        ['Palacio de Sal — Rooms and direct-booking calendar', rooms],
        ['Palacio de Sal — Booking and reservations contact', booking],
        ['Palacio de Sal — Transfers, seasons and guest FAQs', faq],
        ['Palacio de Sal — Hotel services', services],
      ]}
    >
      <section id="cost">
        <h2>How much does a night at Palacio de Sal cost?</h2>
        <p>When checked on 20 November 2026, the <a href={rooms}>hotel’s direct calendar</a> showed about <strong>US$297 for one room for two adults</strong> on 1 December 2026, with taxes included in the displayed estimate. That works out to about <strong>US$148.50 each</strong> if you split the room. Search your own dates and occupancy for a current total.</p>
        <p>The <a href={faq}>hotel’s FAQ</a> lists breakfast, Wi-Fi and spa pool access in the room rate. To estimate your trip total, add your transport to Uyuni, any paid transfers, other meals and the salt-flat tour. Ask your tour provider for the full price and what it covers, including guide, vehicle, meals and any site fees.</p>
      </section>
      <section id="transfer">
        <h2>How do you get from Uyuni to the salt hotel?</h2>
        <p>Palacio de Sal sits on the edge of Salar de Uyuni, reached via <strong>Colchani</strong>. The <a href={faq}>hotel lists three free scheduled shuttles to Uyuni</a> and says it can arrange transfers at other times for a charge. Send your arrival details before traveling and ask whether a town or airport pickup is available, where to meet and whether your ride is included.</p>
        <p>Ask your salt-flat guide to confirm pickup at the hotel, too. When you compare quotes, check whether the guide starts in town and whether hotel pickup adds a charge. An early flight or late bus can make an arranged transfer more practical than waiting for the scheduled ride.</p>
      </section>
      <section id="itinerary">
        <h2>Is one night enough to visit Salar de Uyuni?</h2>
        <p><strong>One night</strong> works if you can tour the flats on your arrival or departure day. Agree on luggage handling and the finishing time before you book an onward ticket. If you arrive late and leave early, expect time for the hotel itself and little time on the flats.</p>
        <p><strong>Two nights</strong> give you a full day between check-in and checkout. A simple plan is to arrive in Uyuni and transfer to the hotel on day one, tour the flats on day two, and leave on day three. Book your guide in advance if the outing is the main reason you’re going.</p>
      </section>
      <section id="season">
        <h2>When can you see Uyuni’s mirror effect?</h2>
        <p>The <a href={faq}>hotel describes late December to mid-April</a> as the wetter period. Water can create the mirror effect, but rain and surface conditions also change which routes drivers can use. Ask your guide what they expect for your dates.</p>
        <p>For broader access across the flats, consider the drier months, roughly late April to early December. If you have a specific stop in mind, ask your driver whether the route is practical before you commit to a tour.</p>
      </section>
      <section id="booking">
        <h2>How do you book Palacio de Sal?</h2>
        <p>Start with the <a href={booking}>hotel’s booking page</a> or its reservations contact. Compare the same room, occupancy and cancellation terms across offers. Confirm the room category if a particular salt-built interior matters to you, then book the shuttle and salt-flat excursion around your arrival and return times.</p>
      </section>
    </StayBookingGuide>
  );
}
