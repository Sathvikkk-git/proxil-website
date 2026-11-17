import React from 'react';
import {Container} from './ui';
import {Wordmark} from './Navbar';

export type LegalKind = 'privacy' | 'terms' | 'medical';

const LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Product', href: '#product'},
  {label: 'How It Works', href: '#how-it-works'},
  {label: 'FAQ', href: '#faq'},
  {label: 'Contact', href: '#contact'},
];

export const Footer: React.FC<{onLegal: (k: LegalKind) => void}> = ({onLegal}) => (
  <footer className="border-t border-white/10 bg-[#07162b] py-14 text-white">
    <Container>
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark light />
          <p className="mt-4 text-sm font-semibold text-white/80">Stability in Every Movement</p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/55">PROXIL is a prototype-stage wearable concept. It is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/80 hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><button onClick={() => onLegal('privacy')} className="text-white/80 hover:text-white">Privacy Policy</button></li>
            <li><button onClick={() => onLegal('terms')} className="text-white/80 hover:text-white">Terms</button></li>
            <li><button onClick={() => onLegal('medical')} className="text-white/80 hover:text-white">Medical Disclaimer</button></li>
          </ul>
        </div>
      </div>
      <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">© 2026 PROXIL. All rights reserved.</p>
    </Container>
  </footer>
);
