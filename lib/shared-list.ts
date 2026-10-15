export const defaultListName = 'Places you’d go.';
export const listNameLimit = 80;
export function cleanListName(value: string) {
 return value.replace(/\s+/g,' ').trim().slice(0,listNameLimit) || defaultListName;
}
export function sharedListPath(name: string, slugs: string[]) {
 const query = new URLSearchParams({name:cleanListName(name),places:[...new Set(slugs)].join(',')});
 return `/saved?${query.toString()}`;
}
