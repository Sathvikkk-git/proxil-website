import React from 'react';
import {Container, Icon, Reveal, SectionHeader, StageBadge} from './ui';

const CONFIRMED = [
  'Passive weight-based design concept',
  'Weight modules positioned across the back of the hand and knuckle region',
  'Fingerless glove with an adjustable wrist strap',
  'Planned colours: Navy Blue, Black, White',
  'Planned sizes: XS to XL',
  'Three prototype weight configurations',
];
const DEVELOPING = [
  'Prototype refinement and user testing',
  'Clinical evidence, none claimed at this stage',
  'Regulatory status, none claimed at this stage',
  'Final materials, pricing and manufacturing',
  'Sizing chart and release timeline',
];

export const Safety: React.FC<{onLegal: (k: 'medical') => void}> = ({onLegal}) => (
  <section id="safety" className="bg-mist py-20 sm:py-28">
    <Container>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader eyebrow="Responsible use" title="Honest about where we are" intro="PROXIL is a developing wearable product. We would rather be clear about what is and is not established than overstate it." />
        <Reveal><StageBadge /></Reveal>
      </div>

      <Reveal delay={80}>
        <div className="mt-10 flex gap-4 rounded-3xl bg-ink p-6 text-white sm:p-8">
          <Icon name="shield" className="mt-1 h-6 w-6 shrink-0 text-[#8fb4f2]" />
          <div>
            <p className="text-lg font-bold leading-snug sm:text-xl">PROXIL is designed as a supportive wearable concept and is not intended to diagnose, treat, cure, or prevent any disease.</p>
            <p className="mt-3 text-sm text-white/70">
              It is not a replacement for professional medical advice. If you have questions about tremor or any health condition, please speak with a qualified healthcare professional.{' '}
              <button onClick={() => onLegal('medical')} className="font-semibold text-white underline underline-offset-4">Read the medical disclaimer</button>
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Reveal className="h-full">
          <div className="card h-full p-6 sm:p-7">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink">Confirmed design concept</h3>
            <ul className="mt-4 space-y-3">
              {CONFIRMED.map((t) => (
                <li key={t} className="flex gap-3 text-sm text-ink-soft"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={90} className="h-full">
          <div className="card h-full p-6 sm:p-7">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink">Under development</h3>
            <ul className="mt-4 space-y-3">
              {DEVELOPING.map((t) => (
                <li key={t} className="flex gap-3 text-sm text-ink-soft"><Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> {t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Container>
  </section>
);
