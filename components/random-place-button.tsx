'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
export function RandomPlaceButton({slugs}:{slugs:string[]}){
 const router=useRouter();
 return <Button className="discovery-button" disabled={!slugs.length} onClick={()=>router.push(`/places/${slugs[Math.floor(Math.random()*slugs.length)]}`)}>Take me somewhere strange ↗</Button>;
}
