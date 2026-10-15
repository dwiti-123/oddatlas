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
export const placeTitle = (place:Place) => place.discovery?.title ?? `What is ${place.name} known for? Its story in ${place.country}`;
export const placeDescription = (place:Place) => `${place.hook} Discover ${place.name} in ${place.country}, its sourced story and what to know before ${place.stay?'staying':'visiting'}.`;
export const reviewedDate = (place:Place) => searchDetails[place.slug]?.reviewed ?? '2026-10-08';
export const allPlaceRoutes = () => allPlaces;

// Only prose about the location counts: headings, navigation and credits are excluded.
export function locationWordCount(place:Place) {
  return [place.story, place.today, place.access, place.longStory?.opening, ...(place.longStory?.chapters.map(c=>c.text)??[])].filter(Boolean).join(' ').trim().split(/\s+/u).length;
}
