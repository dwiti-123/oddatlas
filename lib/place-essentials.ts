import {placeTripPlans,tripPriceLabel} from './place-trip-plans';
import type {Place} from './places';
import {hashimaUsd} from './hashima-visit';

// Short labels drawn from the existing place records and their cited visitor sources.
// New rates, opening hours and journey times require a separate source review.
const facts:Record<string,[string,string][]>={
 hashima:[['Experience','Boat sightseeing'],['Adult ticket',`About ${hashimaUsd(3600)}`],['Duration','2 hr 20 min']],
 dhanushkodi:[['Experience','Coastal ruins'],['Start from','Rameswaram'],['Getting there','Road access']],
 kayakoy:[['Experience','Hillside ruins'],['Near','Fethiye, Türkiye'],['Explore','Hillside walk']],
 kuldhara:[['Experience','Desert village'],['Near','Jaisalmer, India'],['Plan','Day visit']],
 kolmanskop:[['Experience','Ghost town'],['Near','Lüderitz, Namibia'],['Before visiting','Check permits']],
 bodie:[['Experience','Historic ghost town'],['Location','California, USA'],['Plan ahead','Bring supplies']],
 bhangarh:[['Experience','Fort ruins'],['Location','Rajasthan, India'],['Visit during','Daylight hours']],
 'island-of-the-dolls':[['Experience','Canal boat trip'],['Start from','Xochimilco'],['Before booking','Confirm exact island']],
 'paris-catacombs':[['Experience','Underground ossuary'],['Location','Paris, France'],['Entry','Official admission']],
 'port-arthur':[['Experience','Guided ghost tour'],['Location','Tasmania, Australia'],['After dark','Separate tour booking']],
 'stanley-hotel':[['Experience','Hotel or tour'],['Location','Estes Park, USA'],['Bookings','Stay and tour separate']],
 skylodge:[['Experience','Cliffside overnight'],['Location','Sacred Valley, Peru'],['Arrival','Adventure route']],
 mirrorcube:[['Experience','Forest room stay'],['Location','Harads, Sweden'],['Book with','Treehotel']],
 whichaway:[['Experience','Expedition stay'],['Location','Antarctica'],['Access','Operator itinerary']],
 'deep-sleep':[['Experience','Underground overnight'],['Location','Wales, UK'],['Arrival','Guided descent']],
 'palacio-de-sal':[['Experience','Salt hotel stay'],['Near','Uyuni, Bolivia'],['Booking','Hotel direct']],
};
export function placeEssentials(place:Place) {
 const plan=placeTripPlans[place.slug];
 if(plan)return [['Experience',place.slug==='stanley-hotel'?'Evening Ghost Tour':(facts[place.slug]?.[0][1]??plan.experience)],[plan.price?(place.slug==='deep-sleep'?'Cabin budget':plan.kind==='stay'?'Room budget':'Adult ticket'):(facts[place.slug]?.[1][0]??'Location'),plan.price?tripPriceLabel(plan):(facts[place.slug]?.[1][1]??place.region)],['Time',`${plan.duration}${plan.durationBasis==='suggestion'?' · suggested':''}`]];
 return facts[place.slug]??[['Experience',place.stay?'Overnight stay':'Day visit'],['Location',place.country],['Planning','Check visitor details']];
}
