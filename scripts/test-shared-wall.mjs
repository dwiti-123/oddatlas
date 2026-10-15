import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {PGlite} from '@electric-sql/pglite';

function moduleFrom(file,dependencies={}){
 const exports={};const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{exports,require:id=>{if(!(id in dependencies))throw new Error('Unexpected import: '+id);return dependencies[id];}});return exports;
}
const wall=moduleFrom('lib/adventure-wall.ts');
const {validSharedPayload,sharedPayload}=moduleFrom('lib/shared-wall.ts',{'./adventure-wall':wall});
const payload={kind:'note',art:0,message:'One day, Hashima.',place:'Hashima',x:45,y:50,angle:0};
assert(validSharedPayload(payload));
assert(!validSharedPayload({...payload,message:''}));
assert(!validSharedPayload({...payload,owner_id:'impersonate'}));
assert(!validSharedPayload({...payload,x:Infinity}));
assert(!validSharedPayload({...payload,noteMode:'handwrite',ink:[[{x:101,y:1}]]}));
assert.equal(sharedPayload({...payload,id:'private-id',signature:'private-name'}).signature,undefined);

// Real local Postgres engine, isolated from every Supabase project.
const db=new PGlite();
const a='10000000-0000-4000-8000-000000000001',b='10000000-0000-4000-8000-000000000002',c='10000000-0000-4000-8000-000000000003';
const id=n=>`20000000-0000-4000-8000-${String(n).padStart(12,'0')}`;
try{
 await db.exec(`create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema public,auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;`);
 await db.query('insert into auth.users(id) values($1),($2),($3)',[a,b,c]);
 await db.exec(fs.readFileSync('supabase/migrations/202610150001_odd_wall.sql','utf8'));
 const as=async(role,user,callback)=>{await db.exec(`set role ${role}`);await db.query("select set_config('request.jwt.claim.sub',$1,false)",[user??'']);try{return await callback();}finally{await db.exec('reset role');}};
 const post=(n,value=payload)=>db.query('select public.odd_wall_post($1,$2::jsonb)',[id(n),JSON.stringify(value)]);
 await as('anon',null,async()=>{
  assert.equal((await db.query('select * from public.odd_wall_traces')).rows.length,0);
  await assert.rejects(post(1),/permission denied/);
 });
 await as('authenticated',a,async()=>{
  await post(1);await post(1); // Idempotent retry.
  await assert.rejects(post(1,{...payload,message:"Changed after posting"}),/already posted/);
  await post(2,{...payload,noteMode:'handwrite',message:'',ink:[[{x:1,y:2},{x:30,y:40}]]});
  await assert.rejects(post(3,{...payload,ink:'<svg onload=alert(1)>'}),/not valid/);
  await assert.rejects(post(3,{...payload,message:'x'.repeat(121)}),/not valid/);
  await assert.rejects(post(3,{...payload,noteMode:'handwrite',ink:[[{x:null,y:2}]]}),/not valid/);
  await post(3);await assert.rejects(post(4),/minute/);
  await db.query('select public.odd_wall_move($1,60,55)',[id(1)]);
  await assert.rejects(db.query('select public.odd_wall_move($1,400,55)',[id(1)]),/Invalid position/);
  await assert.rejects(db.query("update public.odd_wall_traces set status='hidden'"),/permission denied/);
  await assert.rejects(db.query('delete from public.odd_wall_traces'),/permission denied/);
  await assert.rejects(db.query('insert into public.odd_wall_traces(id,owner_id,payload) values($1,$2,$3)',[id(4),a,payload]),/permission denied/);
 });
 await as('authenticated',b,async()=>{
  assert.equal((await db.query('select * from public.odd_wall_traces')).rows.length,3);
  await assert.rejects(db.query('select public.odd_wall_move($1,20,50)',[id(1)]),/own shared/);
  await assert.rejects(db.query('select public.odd_wall_remove($1)',[id(1)]),/own shared/);
  await db.query("select public.odd_wall_report($1,'spam')",[id(1)]);
  await db.query("select public.odd_wall_report($1,'spam')",[id(1)]);
  await assert.rejects(db.query('select * from public.odd_wall_reports'),/permission denied/);
 });
 assert.equal((await db.query('select count(*)::int as count from public.odd_wall_reports')).rows[0].count,1);
 await db.query("update public.odd_wall_traces set status='hidden' where id=$1",[id(1)]);
 await as('anon',null,async()=>assert.equal((await db.query('select * from public.odd_wall_traces')).rows.length,2));
 await as('authenticated',b,async()=>assert.equal((await db.query('select * from public.odd_wall_traces')).rows.length,2));
 await as('authenticated',a,async()=>{
  assert.equal((await db.query('select * from public.odd_wall_traces')).rows.length,3);
  await db.query('select public.odd_wall_remove($1)',[id(2)]);
 });
 await as('anon',null,async()=>assert.equal((await db.query('select * from public.odd_wall_traces')).rows.length,1));
 for(let n=10;n<34;n++)await db.query("insert into public.odd_wall_traces(id,owner_id,payload,created_at) values($1,$2,$3,now()-interval '2 days')",[id(n),c,payload]);
 await as('authenticated',c,async()=>assert.rejects(post(35),/24 shared/));
 for(let n=40;n<52;n++)await db.query("insert into public.odd_wall_traces(id,owner_id,payload,status,created_at) values($1,$2,$3,'removed',now()-interval '10 minutes')",[id(n),b,payload]);
 await as('authenticated',b,async()=>{
  await assert.rejects(post(52),/hour/);
  for(let n=10;n<14;n++)await db.query("select public.odd_wall_report($1,'other')",[id(n)]);
  await assert.rejects(db.query("select public.odd_wall_report($1,'other')",[id(14)]),/five reports/);
 });
 console.log('Shared wall: migration, RLS, cross-user ownership, RPC-only writes, idempotency, moderation visibility, report privacy, numeric ink validation and posting/report limits passed in local Postgres.');
}finally{await db.close();}
