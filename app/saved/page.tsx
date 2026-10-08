import type { Metadata } from 'next';
import { Header,Footer } from '@/components/site-shell';
import { SavedCollection } from '@/components/saved-collection';
export const metadata:Metadata={title:'Your list',robots:{index:false,follow:true}};
export default function SavedPage() { return <><Header/><main id="main" className="saved-page wrap"><p className="eyebrow">A personal atlas</p><h1>Places you’d go.</h1><p className="saved-intro">A few places to come back to. Your list is remembered in this browser, on this device.</p><SavedCollection/></main><Footer/></>; }
