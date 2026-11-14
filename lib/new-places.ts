import {placeDrafts} from './place-drafts';
// Coordinates are orientation points, not a guarantee of entrance or access.
export const newPlaceCoordinates:Record<string,{latitude:number;longitude:number;source:string;note?:string}>={
 'bankhead':{latitude:51.23198,longitude:-115.52318,source:'https://commons.wikimedia.org/wiki/File:Banff_National_Park_(AB,_Canada),_Bankhead,_Lower_Bankhead,_Coal_Mine_Train_--_2022_--_2226.jpg',note:'Lower Bankhead area; check the official trailhead and park access.'},
 'rummu-quarry':{latitude:59.23025,longitude:24.19709,source:'https://ee.geoview.info/rummu_quarry_and_prison%2C12049302056n'},
 'humberstone':{latitude:-20.20806,longitude:-69.79472,source:'https://en.wikipedia.org/wiki/Humberstone,_Chile'},
 'craco':{latitude:40.37861,longitude:16.44,source:'https://en.wikipedia.org/wiki/Craco'},
 'macetown':{latitude:-44.86689,longitude:168.82098,source:'https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/macetown-historic-reserve/things-to-do/macetown-campsite/',note:'Macetown campsite locator; the backcountry route has river crossings.'},
 'yongma-land':{latitude:37.59441,longitude:127.10549,source:'https://en.wikipedia.org/wiki/Yongma_Land'},
 'kellies-castle':{latitude:4.474361,longitude:101.087806,source:'https://en.wikipedia.org/wiki/Kellie%27s_Castle'},
 'lawang-sewu':{latitude:-6.983925,longitude:110.410556,source:'https://sinar.big.go.id/Pencarian/Detail/134797'},
 'mary-kings-close':{latitude:55.95028,longitude:-3.19028,source:'https://en.wikipedia.org/wiki/Mary_King%27s_Close'},
 'sedlec-ossuary':{latitude:49.9619,longitude:15.28831,source:'https://prgtourspraga.com/wp-content/uploads/2018/12/kh_mapa_turisticka_2016_web.pdf'},
 'crazy-house':{latitude:11.93469,longitude:108.43104,source:'https://www.travelfish.org/sight_profile/vietnam/central_highlands/lam_dong/da_lat/3495'},
 'river-kwai-jungle-rafts':{latitude:14.281035,longitude:99.000796,source:'https://www.riverkwaijunglerafts.com/how-to-get-here/',note:'Phutakien Pier meeting point, not the floating accommodation; confirm boat transfer with the operator.'},
 'icehotel':{latitude:67.84972,longitude:20.59444,source:'https://en.wikipedia.org/wiki/Icehotel_(Jukkasj%C3%A4rvi)'},
 'free-spirit-spheres':{latitude:49.38197,longitude:-124.61438,source:'https://mapcarta.com/N4884524122'},
 'suncity-camp':{latitude:29.656908,longitude:35.479593,source:'https://jo.near-place.com/sun-city-camp-wadi-rum/de',note:'Approximate camp location; confirm directions and meeting point with the operator.'}
};
export const newPlaces=placeDrafts;
export function categoryId(category:string){return category==='Ghost towns & forgotten cities'?'ghost':category==='Mystery & haunted places'?'mystery':'stays';}
