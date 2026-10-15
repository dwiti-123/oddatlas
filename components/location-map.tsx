import type { Place } from '@/lib/places';

export function LocationMap({place}:{place:Place}) {
 const point=place.discovery;
 if(!point) return null;
 const {latitude:lat,longitude:lon}=point;
 const bbox=[lon-.015,lat-.009,lon+.015,lat+.009].join(',');
 const coordinates=`${lat}, ${lon}`;
 return <section className="location-map" aria-labelledby="map-title"><p className="eyebrow">Find it on the atlas</p><h2 id="map-title">Where is {place.name} located? (Coordinates)</h2><p>{place.name} is in {place.region}, {place.country}. Its map locator is {coordinates}; use it to explore the setting, then check the visitor information for access.</p><iframe title={`Interactive locator map for ${place.name}`} src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(coordinates)}`} loading="lazy" referrerPolicy="no-referrer"/><p className="source-context">{point.mapNote??'A locator point for orientation, not a walking route or visitor entrance.'} <a href={point.coordinateSource}>Coordinate source</a> · <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a></p><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates)}`}>Explore this location on Google Maps ↗</a></section>;
}
