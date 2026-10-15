'use client';
import {useRef, type ButtonHTMLAttributes} from 'react';
type Spot={x:number;y:number};
type Props=Omit<ButtonHTMLAttributes<HTMLButtonElement>,'onClick'> & {onPick:(spot?:Spot)=>void;onTravel:(x:number,y:number)=>void;getSpot:(x:number,y:number)=>Spot|null;onCancelPick:()=>void};

/** Native drag on desktop; pointer capture and tap-to-pick on touch screens. */
export function WallSupply({onPick,onTravel,getSpot,onCancelPick,onDragEnd,children,...props}:Props){
 const touch=useRef<{x:number;y:number;moved:boolean}|null>(null);
 const suppress=useRef(false);
 function suppressNextClick(){suppress.current=true;setTimeout(()=>{suppress.current=false;},700);}
 return <button {...props} onClick={()=>{if(!suppress.current)onPick();}} onDragEnd={event=>{suppressNextClick();onDragEnd?.(event);}} onPointerDown={event=>{
  if(event.pointerType==='mouse'||!event.isPrimary)return;
  event.preventDefault();touch.current={x:event.clientX,y:event.clientY,moved:false};event.currentTarget.setPointerCapture(event.pointerId);
 }} onPointerMove={event=>{
  const pick=touch.current;if(!pick)return;
  if(!pick.moved&&Math.hypot(event.clientX-pick.x,event.clientY-pick.y)>9){pick.moved=true;onPick();}
  if(!pick.moved)return;
  if(event.clientY<85)window.scrollBy(0,-18);else if(event.clientY>window.innerHeight-65)window.scrollBy(0,18);
  onTravel(event.clientX,event.clientY);
 }} onPointerUp={event=>{
  const pick=touch.current;touch.current=null;if(!pick)return;event.preventDefault();
  if(!pick.moved)onPick();else {const spot=getSpot(event.clientX,event.clientY);if(spot)onPick(spot);}
  suppressNextClick();
 }} onPointerCancel={()=>{if(touch.current?.moved)onCancelPick();touch.current=null;}}>{children}</button>;
}
