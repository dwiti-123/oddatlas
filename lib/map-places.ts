import {newPlaces,newPlaceCoordinates,categoryId} from './new-places';
import { places } from './places';
import { placeImage } from './discovery';

export type MapPlace = {
 slug:string;name:string;region:string;country:string;category:string;categoryName:string;
 stay:boolean;hook:string;image:string;alt:string;imageKind:string;
 latitude:number;longitude:number;coordinateSource:string;mapNote:string;
};

// Pass only the data needed for browsing, not every story chapter, to the client.
const originalMapPlaces:MapPlace[]=places.filter(p=>p.discovery).map(p=>({
 slug:p.slug,name:p.name,region:p.region,country:p.country,category:p.category,categoryName:p.categoryName,
 stay:p.stay,hook:p.hook,image:placeImage(p),alt:p.alt,imageKind:p.imageKind,
 latitude:p.discovery!.latitude,longitude:p.discovery!.longitude,
 coordinateSource:p.discovery!.coordinateSource,
 mapNote:p.discovery!.mapNote??'Locator point for orientation; confirm visitor access with the original source.',
}));

export const mapPlaces:MapPlace[]=[...originalMapPlaces,...newPlaces.map(p=>{const point=newPlaceCoordinates[p.slug];if(!point)throw new Error('Missing map coordinates: '+p.slug);return {slug:p.slug,name:p.name,region:p.region,country:p.country,category:categoryId(p.category),categoryName:p.category,stay:p.stay,hook:p.hook,image:p.image??'',alt:p.imageAlt??p.name,imageKind:'photo',latitude:point.latitude,longitude:point.longitude,coordinateSource:point.source,mapNote:point.note??'Locator point for orientation; confirm visitor access with the original source.'};})];
