import Link from 'next/link';
import { SavedLink } from './saved-places';
export function Header() { return <><a href="#main" className="skip-link">Skip to content</a><header className="site-header wrap"><Link href="/" className="wordmark" aria-label="Odd Atlas home">odd atlas<span className="brand-dot">.</span></Link><nav aria-label="Main navigation"><Link href="/#places">The collection</Link><SavedLink/><Link href="/#about" className="nav-about">About</Link><Link href="/sources">Sources</Link></nav></header></>; }
export function Footer() { return <footer className="site-footer wrap"><Link href="/" className="wordmark">odd atlas<span className="brand-dot">.</span></Link><p>A few places worth a closer look.</p><span>© 2026 Odd Atlas</span></footer>; }
