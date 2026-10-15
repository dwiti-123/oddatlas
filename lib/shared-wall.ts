import {parseInk, maxStrokes, maxStrokePoints, traceKinds, type Trace} from './adventure-wall';

export type SharedPayload=Pick<Trace,'kind'|'art'|'message'|'place'|'x'|'y'|'angle'|'noteMode'|'ink'>;
export function sharedPayload(trace:Trace):SharedPayload{
 const {kind,art,message,place,x,y,angle}=trace;
 return {kind,art,message,place,x,y,angle,...(kind==='note'&&trace.noteMode==='handwrite'?{noteMode:'handwrite' as const,ink:parseInk(trace.ink)}:{})};
}
export function validSharedPayload(value:unknown):value is SharedPayload{
 if(!value||typeof value!=='object')return false;
 const p=value as SharedPayload;
 if(Object.keys(p).some(key=>!['kind','art','message','place','x','y','angle','noteMode','ink'].includes(key)))return false;
 if(!traceKinds.includes(p.kind)||!Number.isInteger(p.art)||p.art<0||p.art>5||typeof p.message!=='string'||p.message.length>120||typeof p.place!=='string'||!p.place.trim()||p.place.length>80)return false;
 if(!Number.isFinite(p.x)||p.x<11||p.x>89||!Number.isFinite(p.y)||p.y<27||p.y>73||!Number.isFinite(p.angle)||Math.abs(p.angle)>5)return false;
 if(p.kind==='note'&&p.noteMode==='handwrite'){
  if(!Array.isArray(p.ink)||!p.ink.length||p.ink.length>maxStrokes)return false;
  return p.ink.every(stroke=>Array.isArray(stroke)&&stroke.length>0&&stroke.length<=maxStrokePoints&&stroke.every(point=>point&&Number.isFinite(point.x)&&Number.isFinite(point.y)&&point.x>=0&&point.x<=100&&point.y>=0&&point.y<=100));
 }
 return !p.ink&&!p.noteMode&&(p.kind!=='note'||p.message.trim().length>0);
}
