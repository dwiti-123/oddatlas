// Regression checks for the real device store, with a simulated browser storage boundary.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { randomUUID } from 'node:crypto';
const data = new Map([
 ['odd-atlas:saved-places', JSON.stringify(['bhangarh','hashima','hashima'])],
 ['odd-atlas:list-name', 'Old weekend']
]);
let blocked = false;
const storage = {getItem:key=>data.get(key)??null,setItem:(key,value)=>{if(blocked)throw new Error('Storage blocked');data.set(key,value);}};
function load(path, imports={}) {
 const exports = {};
 const js = ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(js,{exports,require:name=>{if(name in imports)return imports[name];throw new Error(name);},localStorage:storage,window:{dispatchEvent(){}},Event:class{},crypto:{randomUUID},URLSearchParams});
 return exports;
}
const shared=load('lib/shared-list.ts');
const fresh=()=>load('lib/device-lists.ts',{react:{},'./shared-list':shared});
let store=fresh();
assert.equal(store.readLists()[0].name,'Old weekend');
assert.equal(store.readLists()[0].slugs.length,2);
const first=store.createDeviceList('Same name',['bhangarh']);
const second=store.createDeviceList('Same name',['hashima']);
assert.notEqual(first.id,second.id);
assert.equal(data.get('odd-atlas:active-list'),second.id);
store.selectDeviceList(first.id);
assert.equal(data.get('odd-atlas:active-list'),first.id);
store.updateLists(lists=>lists.map(list=>list.id===first.id?{...list,name:'Renamed भारत'}:list));
store=fresh();
assert.equal(store.readLists().length,3);
assert.equal(store.readLists().find(list=>list.id===first.id).name,'Renamed भारत');
store.updateLists(lists=>lists.map(list=>list.id===first.id?{...list,slugs:[]}:list));
assert.equal(store.readLists().find(list=>list.id===second.id).slugs[0],'hashima');
const snapshot=shared.sharedListPath('Snapshot',['hashima']);
store.updateLists(lists=>lists.filter(list=>list.id!==first.id));
assert.equal(new URL(snapshot,'https://www.oddatlas.world').searchParams.get('places'),'hashima');
blocked=true;
assert.equal(store.createDeviceList('Session fallback').persistent,false);
assert.equal(store.readLists().at(-1).name,'Session fallback');
blocked=false;
store=fresh();
assert.equal(store.readLists().length,2);
store.updateLists(()=>[]);
assert.equal(fresh().readLists().length,0,'Deleted lists must not be reimported from legacy storage');
console.log('Passed: legacy migration, duplicate names, rename/reload persistence, independent membership, deletion, snapshots and blocked-storage fallback.');


