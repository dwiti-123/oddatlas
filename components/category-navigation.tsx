import Link from 'next/link';
import {categories} from '@/lib/places';
const paths:Record<string,string>={all:'/#places',ghost:'/category/ghost-towns',mystery:'/category/haunted-places',stays:'/category/extraordinary-stays'};
export function CategoryNavigation({active='all'}:{active?:string}){return <nav className="category-tabs category-navigation" aria-label="Place categories">{categories.map(category=><Link key={category.id} href={paths[category.id]} aria-current={active===category.id?'page':undefined}>{category.label}</Link>)}</nav>;}
