import { places } from './places';
import { placeImage } from './discovery';

export type MapPlace = {
 slug:string;name:string;region:string;country:string;category:string;categoryName:string;
 stay:boolean;hook:string;image:string;alt:string;imageKind:string;
 latitude:number;longitude:number;coordinateSource:string;mapNote:string;
};

// Pass only the data needed for browsing, not every story chapter, to the client.
export const mapPlaces:MapPlace[]=places.filter(p=>p.discovery).map(p=>({
 slug:p.slug,name:p.name,region:p.region,country:p.country,category:p.category,categoryName:p.categoryName,
 stay:p.stay,hook:p.hook,image:placeImage(p),alt:p.alt,imageKind:p.imageKind,
 latitude:p.discovery!.latitude,longitude:p.discovery!.longitude,
 coordinateSource:p.discovery!.coordinateSource,
 mapNote:p.discovery!.mapNote??'Locator point for orientation; confirm visitor access with the original source.',
}));
