'use client';
import {useCallback, useEffect, useState} from 'react';
import {createClient, type SupabaseClient} from '@supabase/supabase-js';
import {parseWall, type Trace} from './adventure-wall';
import {sharedPayload, validSharedPayload} from './shared-wall';

const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const configured=!!url&&!!key;
let client:SupabaseClient|undefined;
function connection(){if(!configured)throw new Error('Shared wall is not connected.');return client??=createClient(url!,key!,{auth:{storageKey:'odd-atlas:wall-auth',persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});}
export type SharedTrace=Trace & {ownerId:string};
const setupMessage='The shared wall is unavailable. Check the Supabase connection and database setup.';

export function useSharedWall(){
 const [traces,setTraces]=useState<SharedTrace[]>([]);
 const [userId,setUserId]=useState<string|null>(null);
 const [loading,setLoading]=useState(configured);
 const [error,setError]=useState('');
 const refresh=useCallback(async()=>{
  if(!configured)return;
  try{
   const api=connection();
   const {data:session}=await api.auth.getSession();setUserId(session.session?.user.id??null);
   const {data,error:failure}=await api.from('odd_wall_traces').select('id,owner_id,payload,created_at').eq('status','published').order('created_at',{ascending:false}).limit(24);
   if(failure)throw failure;
   let ownRows:typeof data=[];
   if(session.session){const own=await api.from('odd_wall_traces').select('id,owner_id,payload,created_at').eq('status','published').eq('owner_id',session.session.user.id).order('created_at',{ascending:false}).limit(24);if(own.error)throw own.error;ownRows=own.data;}
   const rows=[...new Map([...(data??[]),...(ownRows??[])].map(row=>[row.id,row])).values()];
   setTraces(rows.flatMap(row=>{
    if(typeof row.id!=='string'||typeof row.owner_id!=='string'||!validSharedPayload(row.payload))return [];
    const parsed=parseWall(JSON.stringify({traces:[{...row.payload,id:row.id,signature:''}],votes:[]})).traces[0];
    return parsed?[{...parsed,ownerId:row.owner_id}]:[];
   }));setError('');
  }catch{setError(setupMessage);}finally{setLoading(false);}
 },[]);
 useEffect(()=>{let active=true;queueMicrotask(()=>{if(active)void refresh();});return()=>{active=false;};},[refresh]);
 async function identity(){
  const api=connection();const {data:existing,error:sessionError}=await api.auth.getSession();if(sessionError)throw new Error('Could not restore your wall session.');
  if(existing.session){setUserId(existing.session.user.id);return {api,id:existing.session.user.id};}
  const {data,error:failure}=await api.auth.signInAnonymously();
  if(failure||!data.user)throw new Error('Posting is unavailable. Anonymous sign-in must be enabled in Supabase.');
  setUserId(data.user.id);return {api,id:data.user.id};
 }
 async function post(trace:Trace){
  const payload=sharedPayload(trace);if(!validSharedPayload(payload))throw new Error('This trace could not be posted. Please check its contents.');
  const {api,id}=await identity();
  const {error:failure}=await api.rpc('odd_wall_post',{p_id:trace.id,p_payload:payload});
  if(failure)throw new Error(failure.code==='P0001'?failure.message:'Could not post. Your draft is still here; check the shared wall connection.');
  setTraces(previous=>[{...trace,ownerId:id},...previous.filter(t=>t.id!==trace.id)].slice(0,48));setError('');
 }
 async function move(id:string,x:number,y:number){const {api}=await identity();const {error:failure}=await api.rpc('odd_wall_move',{p_id:id,p_x:x,p_y:y});if(failure)throw new Error('Could not move this trace. You can only move your own shared traces.');setTraces(previous=>previous.map(t=>t.id===id?{...t,x,y}:t));}
 async function remove(id:string){const {api}=await identity();const {error:failure}=await api.rpc('odd_wall_remove',{p_id:id});if(failure)throw new Error('Could not remove this trace. You can only remove your own shared traces.');setTraces(previous=>previous.filter(t=>t.id!==id));}
 async function report(id:string,reason:string){const {api}=await identity();const {error:failure}=await api.rpc('odd_wall_report',{p_trace_id:id,p_reason:reason});if(failure)throw new Error(failure.code==='P0001'?failure.message:'Could not send the report. Please try again.');}
 return {configured,traces,userId,loading,error,refresh,post,move,remove,report};
}
