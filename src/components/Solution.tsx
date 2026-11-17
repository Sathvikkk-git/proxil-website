import React from 'react';
import {Container, Icon, Reveal, SectionHeader} from './ui';

const FLOW = [
  {n: 'Hand', t: 'The starting point', d: 'A hand experiencing tremor.'},
  {n: 'PROXIL glove', t: 'Wearable platform', d: 'Fingerless, anatomically shaped, adjustable.'},
  {n: 'Strategic weight distribution', t: 'Knuckle region', d: 'Modules sit across the back of the hand.'},
  {n: 'Passive inertial support', t: 'No motors', d: 'Added mass resists rapid changes in motion.'},
  {n: 'Supported hand movement', t: 'The goal', d: 'Designed to assist everyday movement.'},
];

export const Solution: React.FC = () => (
  <section id="technology" className="py-20 sm:py-28">
    <Container>
      <SectionHeader align="center" eyebrow="The PROXIL approach" title="Designed for Stability" intro="PROXIL uses strategically positioned passive weight modules around the back of the hand and knuckle region to create controlled inertial support. It is designed to provide passive stabilization support during hand movement." />
      <ol className="mt-14 grid gap-3 lg:grid-cols-5 lg:gap-0">
        {FLOW.map((f, i) => (
          <li key={f.n} className="relative">
            <Reveal delay={i * 90} className="h-full">
              <div className={`card relative h-full p-5 lg:rounded-none lg:shadow-none ${i === 0 ? 'lg:rounded-l-3xl' : ''} ${i === FLOW.length - 1 ? 'lg:rounded-r-3xl bg-ink !border-ink text-white' : ''} ${i === 2 ? 'ring-2 ring-brand/40 lg:z-10' : ''}`}>
                <span className={`text-[0.68rem] font-bold uppercase tracking-[0.14em] ${i === FLOW.length - 1 ? 'text-[#8fb4f2]' : 'text-brand'}`}>Step {i + 1}</span>
                <h3 className="mt-2 text-[1.02rem] font-extrabold leading-snug">{f.n}</h3>
                <p className={`mt-1 text-xs font-semibold ${i === FLOW.length - 1 ? 'text-white/70' : 'text-ink-soft'}`}>{f.t}</p>
                <p className={`mt-3 text-sm leading-relaxed ${i === FLOW.length - 1 ? 'text-white/75' : 'text-muted'}`}>{f.d}</p>
              </div>
            </Reveal>
            {i < FLOW.length - 1 && (
              <span aria-hidden="true" className="absolute -bottom-4 left-1/2 z-20 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-line bg-white text-brand lg:-right-3.5 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0">
                <Icon name="arrow-down" className="h-3.5 w-3.5 lg:-rotate-90" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <Reveal delay={150}>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">PROXIL is a passive concept: there is no motor-driven vibration cancellation. The effect of added mass varies between individuals and is something we are studying through prototype testing, not something we promise.</p>
      </Reveal>
    </Container>
  </section>
);
