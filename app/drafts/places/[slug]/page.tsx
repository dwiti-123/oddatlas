import {redirect} from 'next/navigation';
export default async function LegacyDraftPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;redirect(`/places/${slug}`);}
