import { rummuDayTrip } from './rummu-day-trip';

export const bankheadDayTrip = {
 title: 'Bankhead Ghost Town near Banff: Trail, Parking & Park Fees',
 description: 'Plan a short stop at Lower Bankhead near Banff. Find the 1.1 km ghost-town loop, the park pass cost, where to park and when the access road closes.',
 sources: {
  trail: 'https://publications.gc.ca/collections/collection_2021/pc/R61-114-2010-eng.pdf',
  itinerary: 'https://parks.canada.ca/pn-np/ab/banff/visit/les10-top10/itineraries',
  fees: 'https://parks.canada.ca/pn-np/ab/banff/visit/tarifs-fees',
  passes: 'https://parks.canada.ca/pn-np/ab/banff/visit/passer-passes',
  access: 'https://parks.canada.ca/apps/parksnow',
  bus: 'https://roamtransit.com/schedules-routes/lake-minnewanka-route-6/',
 },
};

export const sedlecDayTrip = {
 title: 'Sedlec Ossuary from Prague: Train & Bone Church Tickets',
 description: 'Visit the Sedlec Bone Church from Prague by train. See the CZK 180 timed ticket, what it includes, and a return train and entry budget from CZK 338.',
 sources: {
  train: 'https://www.cd.cz/trasy/trasy-ceska-republika/praha-kutna-hora/-30151/',
  local: 'https://vhd.kutnahora.cz/getting-around-kutna-hora/',
  admission: 'https://www.sedlec.info/en/ossuary/before-visiting/',
  booking: 'https://www.sedlec.info/en/reservation/',
 },
};

export const placeDayTrips: Partial<Record<string, {
 title: string;
 description: string;
 sources: Record<string, string>;
}>> = {
 bankhead: bankheadDayTrip,
 'rummu-quarry': rummuDayTrip,
 'sedlec-ossuary': sedlecDayTrip,
};
