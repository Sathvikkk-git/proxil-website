import React from 'react';
import {COLORS} from '../lib/content';
import type {GloveColor} from '../types';
import {GloveVisualizer} from './GloveVisualizer';
import {Button, Container, Icon, StageBadge} from './ui';

const CALLOUTS: {label: string; sub: string; x: number; y: number; side: 'l' | 'r'}[] = [
  {label: 'Knuckle-weight placement', sub: 'Back of hand', x: 66, y: 43, side: 'r'},
  {label: 'Adjustable fit', sub: 'Mid-hand strap', x: 66, y: 60, side: 'r'},
  {label: 'Breathable material', sub: 'Spacer mesh', x: 38, y: 66, side: 'l'},
  {label: 'Secure wrist support', sub: 'Wide wrist wrap', x: 33, y: 80, side: 'l'},
];

export const Hero: React.FC<{color: GloveColor; setColor: (c: GloveColor) => void; onWaitlist: () => void}> = ({color, setColor, onWaitlist}) => (
  <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_75%_40%,#e6eefb_0%,rgba(255,255,255,0)_70%),linear-gradient(#fff,#f6f8fc)]" />
    <Container>
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <StageBadge />
          <p className="mt-7 text-sm font-extrabold tracking-[0.3em] text-brand">PROXIL</p>
          <h1 className="mt-3 text-[2.6rem] sm:text-6xl lg:text-[4.4rem] font-extrabold leading-[1.02] text-ink">
            Stability in
            <br />
            Every Movement
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            A premium anti-tremor glove concept designed to support hand stability through passive, strategically positioned weight distribution across the back of the hand.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" href="#product">
              Explore the Glove <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" href="#how-it-works">How It Works</Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-ink-soft">
            <span className="inline-flex items-center gap-2"><Icon name="feather" className="h-4 w-4 text-brand" /> Passive design</span>
            <span className="inline-flex items-center gap-2"><Icon name="hand" className="h-4 w-4 text-brand" /> Free finger movement</span>
            <button onClick={onWaitlist} className="inline-flex items-center gap-2 underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
              <Icon name="mail" className="h-4 w-4 text-brand" /> Register interest
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[470px]">
          <div className="relative">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_40px_90px_-30px_rgba(29,95,209,0.35)]" />
            <div className="relative">
              <GloveVisualizer color={color} weight="medium" view="dorsal" />
            </div>
            {CALLOUTS.map((c) => (
              <div
                key={c.label}
                className="pointer-events-none absolute hidden md:flex items-center"
                style={c.side === 'r' ? {left: `${c.x}%`, top: `${c.y}%`, transform: 'translateY(-50%)'} : {right: `${100 - c.x}%`, top: `${c.y}%`, transform: 'translateY(-50%)', flexDirection: 'row-reverse'}}
              >
                <span className="relative grid h-3 w-3 place-items-center">
                  <span className="hotspot-ring absolute inset-0 rounded-full bg-brand/40" />
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-brand shadow" />
                </span>
                <span className="h-px w-8 bg-brand/50 lg:w-14" />
                <span className="whitespace-nowrap rounded-xl border border-line bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                  <span className="block text-[0.74rem] font-bold text-ink">{c.label}</span>
                  <span className="block text-[0.66rem] font-medium text-muted">{c.sub}</span>
                </span>
              </div>
            ))}
          </div>

          <ul className="mt-2 grid grid-cols-2 gap-2 md:hidden" aria-label="Glove features">
            {CALLOUTS.map((c) => (
              <li key={c.label} className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-[0.72rem] font-bold text-ink">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
                {c.label}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-center gap-3" role="radiogroup" aria-label="Glove colour">
            {COLORS.map((c) => (
              <button
                key={c.id}
                role="radio"
                aria-checked={color === c.id}
                aria-label={c.label}
                title={c.label}
                onClick={() => setColor(c.id)}
                className={`h-7 w-7 rounded-full border transition-all ${color === c.id ? 'ring-2 ring-brand ring-offset-2 scale-110 border-transparent' : 'border-line hover:scale-105'}`}
                style={{background: c.swatch}}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  </section>
);
