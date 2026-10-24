import { places, allPlaces, searchDetails, type Place } from './places';

export const siteUrl = 'https://www.oddatlas.world';
export const directoryCategories = [
  {slug:'ghost-towns', category:'ghost', title:'Ghost towns & forgotten cities', description:'Explore abandoned settlements through the people, industries and events behind their ruins. Compare places across countries, read their sourced histories, and check how visitor access works today.'},
  {slug:'haunted-places', category:'mystery', title:'Haunted & mysterious places', description:'Discover places known for unsettling stories, local legends and unusual histories. Each entry distinguishes documented events from folklore, with original sources and practical visiting context.'},
  {slug:'extraordinary-stays', category:'stays', title:'Extraordinary stays', description:'Find unusual places to spend a night: a mirrored treehouse, a cliffside capsule, an underground camp and more. Explore the setting and the journey involved before checking arrangements with the operator.'},
] as const;

export const findCategory = (slug:string) => directoryCategories.find(c=>c.slug===slug);
export const categoryFor = (place:Place) => directoryCategories.find(c=>c.category===place.category)!;
export const entriesFor = (slug:string) => places.filter(p=>p.category===findCategory(slug)?.category);
export const placeImage = (place:Place) => `/images/${place.slug}-${place.country.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${place.imageKind==='illustration'?'concept-illustration':'location-photo'}.webp`;
const searchCopy:Record<string,{title?:string;description:string}>={
 hashima:{description:'Hashima Island was abandoned after its coal mine closed around 1974. Read why the community left, what remains and how to visit from Nagasaki.'},
 'island-of-the-dolls':{title:'Island of the Dolls, Mexico: Xochimilco’s Story & Legends',description:'Why do dolls hang from trees in Xochimilco? Explore the Island of the Dolls’ story, local legends and what to know before visiting from Mexico City.'},
 'deep-sleep':{title:'Deep Sleep, Wales: Inside an Underground Stay',description:'Explore Deep Sleep in Wales: an underground overnight experience reached through a former slate mine, with the journey and operator information explained.'},
 skylodge:{title:'Skylodge Adventure Suites, Peru: A Cliffside Stay',description:'Sleep in a transparent capsule on a Sacred Valley cliff. Explore Skylodge Adventure Suites, the journey involved and where to check operator arrangements.'},
 mirrorcube:{title:'Mirrorcube at Treehotel, Sweden: The Mirrored Treehouse',description:'Explore the Mirrorcube at Treehotel in Harads, Sweden: its reflective forest setting, unusual design and official information for planning a stay.'},
 kayakoy:{description:'Explore Kayaköy near Fethiye, Türkiye: roofless village houses, a history of displacement and visitor information for understanding the ruins.'},
 kuldhara:{description:'Why was Kuldhara abandoned? Explore the desert village near Jaisalmer, distinguish its curse legend from historical evidence and check visitor access.'},
 kolmanskop:{description:'Explore Kolmanskop near Lüderitz, Namibia: the diamond town reclaimed by Namib Desert sand, its history and official information for planning a visit.'},
 'paris-catacombs':{description:'Why are there bones beneath Paris? Explore the Catacombs’ history, the official visitor route and the access conditions to check before going.'},
 'port-arthur':{description:'Explore Port Arthur in Tasmania: the former penal settlement’s history, its ghost-story tradition and official information about lantern-lit tours.'},
 'stanley-hotel':{description:'Explore the Stanley Hotel in Estes Park, Colorado: its connection to The Shining, ghost-story tradition and official tour and stay information.'},
 whichaway:{description:'Explore Whichaway Camp in Antarctica: heated sleeping pods in the Schirmacher Oasis, the expedition setting and official operator information.'},
 'palacio-de-sal':{description:'Explore Palacio de Sal near Uyuni, Bolivia: a hotel built from salt beside the salt flats, with its story and official information for planning a stay.'},
 bodie:{description:'Explore Bodie, California: a preserved ghost town with mining history, surviving buildings and official state park information for planning a visit.'},
};
// One resolution path feeds the visible heading, metadata and structured data.
export const placeTitle = (place:Place) => searchCopy[place.slug]?.title ?? searchDetails[place.slug]?.title ?? place.discovery?.title ?? `${place.name}: Its Story in ${place.country}`;
export const placeDescription = (place:Place) => searchCopy[place.slug]?.description ?? searchDetails[place.slug]?.description ?? place.hook;
export const reviewedDate = (place:Place) => searchDetails[place.slug]?.reviewed;
export const allPlaceRoutes = () => allPlaces;

// Visible, sourced history answers; visiting logistics belong in the linked guides.
export const historyAnswers:Record<string,{
 question:string;answer:string;sources:{label:string;url:string}[];
 guide:{href:string;label:string};
}>={
 hashima:{
  question:'Why was Hashima Island abandoned?',
  answer:'Hashima Island was abandoned after its coal mines closed around 1974 as Japan’s energy needs changed. The mining settlement lost the industry that sustained its homes, schools and shops, and its residents left. The concrete buildings remained exposed to the sea and weather. The empty skyline is the aftermath of an industrial closure, rather than an unexplained disappearance.',
  sources:[{label:'Japan National Tourism Organization: mining and abandonment',url:'https://www.japan.travel/en/spot/752/'}],
  guide:{href:'/blog/how-to-visit-hashima-island',label:'Plan a Hashima Island visit from Nagasaki'},
 },
 kuldhara:{
  question:'Why was Kuldhara abandoned?',
  answer:'The cause of Kuldhara’s abandonment remains disputed in the sources reviewed here. Rajasthan Tourism tells a legend of villagers leaving to resist minister Salim Singh. Researchers have also debated earthquake damage and historical accounts of oppression and migration. The curse is folklore; the surviving ruins do not, by themselves, prove why the community left or that everyone departed overnight.',
  sources:[{label:'Rajasthan Tourism: the local legend',url:'https://www.tourism.rajasthan.gov.in/kuldhara.html'},{label:'Roy et al. (2017): earthquake interpretation',url:'https://www.researchgate.net/publication/312385113_Deserted_Nineteenth_Century_Paliwal_Villages_around_Jaisalmer_Western_Rajasthan_IndiaHistorical_Evidence_of_Palaeoseismicity'},{label:'Current Science (2018): the debate and response',url:'https://www.researchgate.net/publication/323797999_Kuldhara_Devastation_and_the_Great_Exodus'}],
  guide:{href:'/blog/visiting-kuldhara-from-jaisalmer',label:'Plan a Kuldhara visit from Jaisalmer'},
 },
};

const relatedStories:Record<string,string[]>={
 hashima:['kayakoy','kolmanskop'],
 dhanushkodi:['kuldhara','kayakoy'],
 kayakoy:['hashima','kuldhara'],
 kuldhara:['kayakoy','dhanushkodi'],
 kolmanskop:['hashima','kuldhara'],
 'island-of-the-dolls':['bhangarh','port-arthur'],
 bhangarh:['island-of-the-dolls','port-arthur'],
 'paris-catacombs':['port-arthur','bhangarh'],
 'port-arthur':['stanley-hotel','paris-catacombs'],
 'stanley-hotel':['port-arthur','island-of-the-dolls'],
 skylodge:['deep-sleep','whichaway'],
 mirrorcube:['palacio-de-sal','skylodge'],
 whichaway:['skylodge','deep-sleep'],
 'deep-sleep':['skylodge','mirrorcube'],
 'palacio-de-sal':['mirrorcube','whichaway'],
};
export const relatedPlaces = (place:Place) => (relatedStories[place.slug]??[])
 .map(slug=>allPlaces.find(entry=>entry.slug===slug)).filter((entry):entry is Place=>!!entry);

// Only prose about the location counts: headings, navigation and credits are excluded.
export function locationWordCount(place:Place) {
  return [place.story, place.today, place.access, place.longStory?.opening, ...(place.longStory?.chapters.map(c=>c.text)??[])].filter(Boolean).join(' ').trim().split(/\s+/u).length;
}
