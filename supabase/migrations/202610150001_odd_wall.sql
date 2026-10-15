-- Odd Atlas only: additive tables/functions, no changes to existing application tables.
begin;
create or replace function public.odd_wall_payload_valid(p jsonb) returns boolean
language plpgsql immutable set search_path = '' as $$
declare stroke jsonb; point jsonb;
begin
 if p is null or jsonb_typeof(p) <> 'object' or octet_length(p::text)>160000 then return false; end if;
 if exists(select 1 from jsonb_object_keys(p) k where k not in ('kind','art','message','place','x','y','angle','noteMode','ink')) then return false; end if;
 if not (p ?& array['kind','art','message','place','x','y','angle']) then return false; end if;
 if jsonb_typeof(p->'kind') <> 'string' or p->>'kind' not in ('note','ticket','stamp','sticker') then return false; end if;
 if jsonb_typeof(p->'art') <> 'number' or (p->>'art')::numeric not between 0 and 5 or trunc((p->>'art')::numeric)<>(p->>'art')::numeric then return false; end if;
 if jsonb_typeof(p->'message') <> 'string' or length(p->>'message')>120 or jsonb_typeof(p->'place') <> 'string' or length(btrim(p->>'place'))=0 or length(p->>'place')>80 then return false; end if;
 if jsonb_typeof(p->'x') <> 'number' or jsonb_typeof(p->'y') <> 'number' or jsonb_typeof(p->'angle') <> 'number' then return false; end if;
 if (p->>'x')::numeric not between 11 and 89 or (p->>'y')::numeric not between 27 and 73 or abs((p->>'angle')::numeric)>5 then return false; end if;
 if p->>'kind'='note' and p->>'noteMode'='handwrite' then
  if jsonb_typeof(p->'ink') is distinct from 'array' then return false; end if;
  if jsonb_array_length(p->'ink') not between 1 and 32 then return false; end if;
  for stroke in select value from jsonb_array_elements(p->'ink') loop
   if jsonb_typeof(stroke)<>'array' then return false; end if;
   if jsonb_array_length(stroke) not between 1 and 160 then return false; end if;
   for point in select value from jsonb_array_elements(stroke) loop
    if jsonb_typeof(point)<>'object' or not(point ?& array['x','y']) then return false; end if;
    if exists(select 1 from jsonb_object_keys(point) k where k not in ('x','y')) then return false; end if;
    if jsonb_typeof(point->'x')<>'number' or jsonb_typeof(point->'y')<>'number' then return false; end if;
    if (point->>'x')::numeric not between 0 and 100 or (point->>'y')::numeric not between 0 and 100 then return false; end if;
   end loop;
  end loop;
 else
  if p ? 'ink' or p ? 'noteMode' then return false; end if;
  if p->>'kind'='note' and length(btrim(p->>'message'))=0 then return false; end if;
 end if;
 return true;
exception when others then return false;
end $$;

create table public.odd_wall_traces (
 id uuid primary key,
 owner_id uuid not null references auth.users(id) on delete cascade,
 payload jsonb not null check(public.odd_wall_payload_valid(payload)),
 status text not null default 'published' check(status in ('published','hidden','removed')),
 created_at timestamptz not null default now()
);
create index odd_wall_public_recent on public.odd_wall_traces(created_at desc) where status='published';
create index odd_wall_owner_recent on public.odd_wall_traces(owner_id,created_at desc);
alter table public.odd_wall_traces enable row level security;
revoke all on public.odd_wall_traces from anon,authenticated;
grant select on public.odd_wall_traces to anon,authenticated;
create policy odd_wall_read on public.odd_wall_traces for select to anon,authenticated using(status='published' or owner_id=(select auth.uid()));

create table public.odd_wall_reports (
 trace_id uuid not null references public.odd_wall_traces(id) on delete cascade,
 reporter_id uuid not null references auth.users(id) on delete cascade,
 reason text not null check(reason in ('spam','offensive','personal-information','other')),
 created_at timestamptz not null default now(),
 primary key(trace_id,reporter_id)
);
alter table public.odd_wall_reports enable row level security;
revoke all on public.odd_wall_reports from anon,authenticated;
create index odd_wall_reporter_recent on public.odd_wall_reports(reporter_id,created_at desc);

-- Mutations are RPC-only: ownership and rate checks cannot be bypassed by direct table writes.
create or replace function public.odd_wall_post(p_id uuid,p_payload jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare person uuid:=auth.uid(); n bigint;
begin
 if person is null then raise exception 'Sign in before posting.'; end if;
 if p_id is null or not public.odd_wall_payload_valid(p_payload) then raise exception 'This trace is not valid.'; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(person::text,0));
 if exists(select 1 from public.odd_wall_traces where id=p_id and owner_id=person) then
  if not exists(select 1 from public.odd_wall_traces where id=p_id and owner_id=person and payload=p_payload and status='published') then raise exception 'This trace was already posted. Refresh the wall before trying again.'; end if;
  return p_id;
 end if;
 select count(*) into n from public.odd_wall_traces where owner_id=person and created_at>now()-interval '1 minute';
 if n>=3 then raise exception 'A little pause: try posting again in a minute.'; end if;
 select count(*) into n from public.odd_wall_traces where owner_id=person and created_at>now()-interval '1 hour';
 if n>=12 then raise exception 'You have posted quite a few traces. Try again in an hour.'; end if;
 select count(*) into n from public.odd_wall_traces where owner_id=person and status='published';
 if n>=24 then raise exception 'You have 24 shared traces. Remove one to make room.'; end if;
 insert into public.odd_wall_traces(id,owner_id,payload) values(p_id,person,p_payload);
 return p_id;
end $$;

create or replace function public.odd_wall_move(p_id uuid,p_x numeric,p_y numeric) returns void
language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null or p_x is null or p_y is null or p_x not between 11 and 89 or p_y not between 27 and 73 then raise exception 'Invalid position.'; end if;
 update public.odd_wall_traces set payload=jsonb_set(jsonb_set(payload,'{x}',to_jsonb(p_x)),'{y}',to_jsonb(p_y)) where id=p_id and owner_id=auth.uid() and status='published';
 if not found then raise exception 'You can only move your own shared traces.'; end if;
end $$;

create or replace function public.odd_wall_remove(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null then raise exception 'Sign in before removing a trace.'; end if;
 update public.odd_wall_traces set status='removed' where id=p_id and owner_id=auth.uid() and status='published';
 if not found then raise exception 'You can only remove your own shared traces.'; end if;
end $$;

create or replace function public.odd_wall_report(p_trace_id uuid,p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare person uuid:=auth.uid(); n bigint;
begin
 if person is null or p_reason is null or p_reason not in ('spam','offensive','personal-information','other') then raise exception 'Choose a reason for the report.'; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(person::text,1));
 if not exists(select 1 from public.odd_wall_traces where id=p_trace_id and status='published') then raise exception 'This trace is no longer available.'; end if;
 if exists(select 1 from public.odd_wall_reports where trace_id=p_trace_id and reporter_id=person) then return; end if;
 select count(*) into n from public.odd_wall_reports where reporter_id=person and created_at>now()-interval '1 day';
 if n>=5 then raise exception 'You have sent five reports today. Please try again tomorrow.'; end if;
 insert into public.odd_wall_reports(trace_id,reporter_id,reason) values(p_trace_id,person,p_reason);
end $$;

revoke all on function public.odd_wall_payload_valid(jsonb) from public,anon,authenticated;
revoke all on function public.odd_wall_post(uuid,jsonb),public.odd_wall_move(uuid,numeric,numeric),public.odd_wall_remove(uuid),public.odd_wall_report(uuid,text) from public,anon,authenticated;
grant execute on function public.odd_wall_post(uuid,jsonb),public.odd_wall_move(uuid,numeric,numeric),public.odd_wall_remove(uuid),public.odd_wall_report(uuid,text) to authenticated;
commit;
