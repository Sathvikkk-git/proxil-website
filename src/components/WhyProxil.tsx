import React from 'react';
import {Container, Icon, type IconName, Reveal, SectionHeader} from './ui';

const POINTS: {icon: IconName; title: string; text: string}[] = [
  {icon: 'feather', title: 'Passive design', text: 'No motor-driven vibration cancellation. The concept relies on mass and positioning.'},
  {icon: 'target', title: 'Strategic weight placement', text: 'Weight sits around the back of the hand and knuckle area, not at the fingertips.'},
  {icon: 'sliders', title: 'Adjustable configuration', text: 'Five sizes and three prototype weight configurations.'},
  {icon: 'hand', title: 'Wearable design', text: 'Fingerless and shaped around natural hand movement.'},
  {icon: 'cup', title: 'Everyday focus', text: 'Designed around practical daily activities rather than a clinic.'},
  {icon: 'users', title: 'Human-centered development', text: 'Built through iterative design and user feedback.'},
];

export const WhyProxil: React.FC = () => (
  <section id="why" className="py-20 sm:py-28">
    <Container>
      <SectionHeader eyebrow="Why PROXIL" title="A simple idea, carefully engineered" />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {POINTS.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 3) * 80} className="h-full">
              <div className="card h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand"><Icon name={p.icon} /></span>
                <h3 className="mt-5 text-base font-extrabold uppercase tracking-[0.06em]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);
