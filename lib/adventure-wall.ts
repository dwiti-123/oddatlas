export const wallKey = 'odd-atlas:adventure-wall:v1';
export const traceKinds = ['note','ticket','stamp','sticker'] as const;
export type TraceKind = typeof traceKinds[number];
export type InkPoint = {x:number;y:number};
export type InkStroke = InkPoint[];
export type Trace = {id:string;kind:TraceKind;art:number;message:string;signature:string;place:string;x:number;y:number;angle:number;noteMode?:'type'|'handwrite';ink?:InkStroke[]};
export type WallState = {traces:Trace[];votes:string[]};
export const emptyWall:WallState = {traces:[],votes:[]};
export const limit = 24;
export const maxStrokes = 32;
export const maxStrokePoints = 160;
export function parseInk(value:unknown):InkStroke[] {
 if(!Array.isArray(value))return [];
 return value.slice(0,maxStrokes).flatMap(stroke=>{
  if(!Array.isArray(stroke)||!stroke.length||stroke.length>maxStrokePoints)return [];
  if(stroke.some(p=>!p||typeof p!=='object'||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>100||p.y<0||p.y>100))return [];
  return [stroke.map(p=>({x:Math.round(p.x*10)/10,y:Math.round(p.y*10)/10}))];
 });
}
export function wallPoint(x:number,y:number) {return {x:Math.min(89,Math.max(11,x)),y:Math.min(73,Math.max(27,y))};}
export function parseWall(raw:string|null):WallState {
 if(!raw)return emptyWall;
 try {
  const value=JSON.parse(raw);
  if(!value || !Array.isArray(value.traces) || !Array.isArray(value.votes))return emptyWall;
  const ids=new Set<string>();
  const traces=value.traces.slice(0,limit).flatMap((t:Trace):Trace[]=>{
   if(!t||typeof t.id!=='string'||t.id.length>80||ids.has(t.id)||!traceKinds.includes(t.kind)||!Number.isInteger(t.art)||t.art<0||t.art>5||typeof t.message!=='string'||typeof t.signature!=='string'||typeof t.place!=='string'||!Number.isFinite(t.x)||!Number.isFinite(t.y)||!Number.isFinite(t.angle))return [];
   ids.add(t.id);return [{id:t.id,kind:t.kind,art:t.art,message:t.message.slice(0,120),signature:t.signature.slice(0,28),place:t.place.slice(0,80),...wallPoint(t.x,t.y),angle:Math.min(5,Math.max(-5,t.angle)),...(t.kind==='note'&&t.noteMode==='handwrite'?{noteMode:'handwrite' as const,ink:parseInk(t.ink)}:{})}];
  });
  return {traces,votes:[...new Set(value.votes.filter((v:unknown)=>typeof v==='string').slice(0,100))] as string[]};
 }catch{return emptyWall;}
}
export const sampleTraces:Trace[] = [
 {id:'example-hashima',kind:'note',art:0,message:'Hashima, one day.',signature:'Maya',place:'Hashima',x:20,y:35,angle:-6},
 {id:'example-deep',kind:'note',art:3,message:'I’d spend a night underground.',signature:'',place:'Deep Sleep',x:51,y:31,angle:5},
 {id:'example-ticket',kind:'ticket',art:2,message:'Good for another story.',signature:'',place:'Kolmanskop',x:21,y:74,angle:-4},
 {id:'example-fort',kind:'stamp',art:1,message:'',signature:'',place:'Bhangarh',x:69,y:32,angle:3},
 {id:'example-tree',kind:'sticker',art:4,message:'Somewhere a little further.',signature:'',place:'Mirrorcube',x:80,y:73,angle:-4},
];
