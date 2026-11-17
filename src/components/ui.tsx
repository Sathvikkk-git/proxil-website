import React from 'react';
import {useReveal, useModal} from '../lib/hooks';

const PATHS: Record<string, React.ReactNode> = {
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-down': <path d="M12 5v14M6 13l6 6 6-6" />,
  'arrow-left': <path d="M19 12H5M11 6l-6 6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  'chevron-down': <path d="M6 9l6 6 6-6" />,
  rotate: <><path d="M20 12a8 8 0 1 1-2.6-5.9" /><path d="M20 4v5h-5" /></>,
  zoom: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2M11 8v6M8 11h6" /></>,
  hand: <path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5v-1a1.5 1.5 0 0 1 3 0V11m0-4.5a1.5 1.5 0 0 1 3 0V13m0-3.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6.5 7S7 18.5 5.5 16L3.7 12.7a1.5 1.5 0 0 1 2.4-1.7L8 13" />,
  wind: <path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7a2.5 2.5 0 1 1-2.5 2.5" />,
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
  layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  sliders: <path d="M5 4v6m0 4v6M12 4v2m0 4v10M19 4v10m0 4v2M3 10h4M10 6h4M17 14h4" />,
  feather: <path d="M20 4c-6 0-11 4-11 10v3l-5 3M9 17h4c4 0 7-4 7-9V4M9 13h5" />,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 5a3 3 0 0 1 0 6M18 14.5c1.9.8 3 2.6 3 5.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  phone: <path d="M6 3h3l1.5 4.5-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />,
  send: <path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  cup: <path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8zM16 9h2a2.5 2.5 0 0 1 0 5h-2M8 3v2M12 3v2" />,
  pen: <path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19l-4 1zM14 7l3 3" />,
  spoon: <path d="M15 3c-2.2 0-4 2-4 4.5S12.6 12 15 12s4-2 4-4.5S17.2 3 15 3zM15 12v9M6 3v6M9 3v6M6 9a1.5 1.5 0 0 0 3 0M7.5 9v12" />,
  box: <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5v-9zM3.5 7.5L12 12l8.5-4.5M12 12v9" />,
  grip: <path d="M7 11V8a2 2 0 0 1 4 0v3m0 0V6a2 2 0 0 1 4 0v5m0-2a2 2 0 0 1 4 0v4a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L3.5 13a1.8 1.8 0 0 1 3-2L7 12" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></>,
  wrench: <path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8M3 21l5-5" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></>,
};

export type IconName = keyof typeof PATHS;

export const Icon: React.FC<{name: IconName; className?: string; strokeWidth?: number}> = ({name, className = 'w-5 h-5', strokeWidth = 1.8}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
    {PATHS[name]}
  </svg>
);

type BtnProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'light';
  size?: 'md' | 'lg' | 'sm';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Button: React.FC<BtnProps> = ({variant = 'primary', size = 'md', href, onClick, type = 'button', disabled, className = '', children}) => {
  const sizes = {sm: 'h-9 px-4 text-sm', md: 'h-11 px-5 text-sm', lg: 'h-12 px-7 text-[0.95rem]'}[size];
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-dark shadow-[0_8px_20px_-8px_rgba(29,95,209,0.7)]',
    dark: 'bg-ink text-white hover:bg-ink-soft',
    secondary: 'bg-white text-ink border border-line hover:border-ink/40 hover:bg-mist',
    ghost: 'text-ink hover:bg-mist',
    light: 'bg-white text-ink hover:bg-brand-tint',
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizes} ${variants} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
};

export const Reveal: React.FC<{children: React.ReactNode; delay?: number; className?: string}> = ({children, delay = 0, className = ''}) => {
  const {ref, shown} = useReveal();
  return (
    <div ref={ref} className={`reveal ${shown ? 'is-in' : ''} ${className}`} style={{['--d' as string]: `${delay}ms`}}>
      {children}
    </div>
  );
};

export const SectionHeader: React.FC<{eyebrow: string; title: string; intro?: string; align?: 'left' | 'center'; light?: boolean}> = ({eyebrow, title, intro, align = 'left', light}) => (
  <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <p className={`eyebrow ${light ? '!text-[#8fb4f2]' : ''}`}>{eyebrow}</p>
    <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.1] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
    {intro && <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? 'text-white/75' : 'text-muted'}`}>{intro}</p>}
  </Reveal>
);

export const Container: React.FC<{children: React.ReactNode; className?: string}> = ({children, className = ''}) => (
  <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
);

export const StageBadge: React.FC<{className?: string}> = ({className = ''}) => (
  <span className={`inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-soft ${className}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
    Prototype / Development Stage
  </span>
);

export const Modal: React.FC<{open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean}> = ({open, onClose, title, children, wide}) => {
  const ref = useModal(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" role="presentation">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className={`modal-in relative w-full ${wide ? 'sm:max-w-4xl' : 'sm:max-w-lg'} max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl`}>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white/95 px-6 py-4 backdrop-blur">
          <h2 className="text-base font-bold text-ink">{title}</h2>
          <button onClick={onClose} aria-label="Close dialog" className="grid h-9 w-9 place-items-center rounded-full text-ink hover:bg-mist">
            <Icon name="x" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
