import React, {useEffect, useState} from 'react';
import {NAV} from '../lib/content';
import {Button, Icon} from './ui';

export const Wordmark: React.FC<{light?: boolean}> = ({light}) => (
  <a href="#home" className="inline-flex items-center gap-2.5" aria-label="PROXIL — home">
    <span className={`grid h-8 w-8 place-items-center rounded-[10px] ${light ? 'bg-white text-ink' : 'bg-ink text-white'}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 17l6-8 6 8" />
      </svg>
    </span>
    <span className={`text-[1.15rem] font-extrabold tracking-[0.12em] ${light ? 'text-white' : 'text-ink'}`}>PROXIL</span>
  </a>
);

export const Navbar: React.FC<{onWaitlist: () => void}> = ({onWaitlist}) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      {rootMargin: '-40% 0px -55% 0px'},
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-white/90 backdrop-blur-xl border-b border-line shadow-[0_6px_24px_-16px_rgba(11,31,58,0.25)]' : 'bg-transparent border-b border-transparent'}`}>
      <nav aria-label="Primary" className={`mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 sm:px-8 transition-all duration-300 ${scrolled ? 'h-14' : 'h-[72px]'}`}>
        <Wordmark />

        <ul className="hidden xl:flex items-center gap-1">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} aria-current={active === n.href ? 'true' : undefined} className={`rounded-full px-3.5 py-2 text-[0.84rem] font-semibold transition-colors ${active === n.href ? 'bg-brand-tint text-brand-dark' : 'text-ink-soft hover:text-ink hover:bg-mist'}`}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button variant="secondary" size="sm" onClick={onWaitlist}>Join Waitlist</Button>
          </div>
          <div className="hidden sm:block">
            <Button variant="dark" size="sm" href="#product">Explore PROXIL</Button>
          </div>
          <button className="xl:hidden grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-mist" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            <Icon name={open ? 'x' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`xl:hidden grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`} aria-hidden={!open}>
        <div className="overflow-hidden">
          <ul className="mx-auto max-w-[1200px] px-5 sm:px-8 pb-3 pt-1">
            {NAV.map((n) => (
              <li key={n.href} className="border-t border-line first:border-0">
                <a href={n.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-base font-semibold text-ink">
                  {n.label}
                  <Icon name="arrow-right" className="h-4 w-4 text-muted" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mx-auto flex max-w-[1200px] gap-3 px-5 sm:px-8 pb-5">
            <Button variant="dark" href="#product" className="flex-1" onClick={() => setOpen(false)}>Explore PROXIL</Button>
            <Button variant="primary" className="flex-1" onClick={() => { setOpen(false); onWaitlist(); }}>Join Waitlist</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
