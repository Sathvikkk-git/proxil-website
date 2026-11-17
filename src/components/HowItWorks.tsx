import React from 'react';
import {Container, Icon, type IconName, Reveal, SectionHeader} from './ui';

const STEPS: {n: string; k: string; t: string; icon: IconName}[] = [
  {n: '01', k: 'Wear', t: 'Slide on the PROXIL glove and fasten the adjustable wrist strap for a secure, comfortable fit.', icon: 'hand'},
  {n: '02', k: 'Position', t: 'The glove places the weight modules around the back of the hand and knuckle region, clear of the fingertips and palm.', icon: 'target'},
  {n: '03', k: 'Support', t: 'The strategically distributed mass is designed to provide passive inertial support.', icon: 'layers'},
  {n: '04', k: 'Move', t: 'Designed to support more controlled movement during everyday activities.', icon: 'arrow-right'},
];

export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="bg-ink py-20 text-white sm:py-28">
    <Container>
      <SectionHeader light eyebrow="How it works" title="Four simple steps" intro="No motors, no switches. PROXIL is designed to be worn and used like a glove." />
      <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 110} className="h-full">
              <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-[54px] w-[54px] place-items-center rounded-full bg-brand text-lg font-extrabold">{s.n}</span>
                  <Icon name={s.icon} className="h-6 w-6 text-white/50" />
                </div>
                <h3 className="mt-6 text-xl font-extrabold uppercase tracking-[0.08em]">{s.k}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{s.t}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Container>
  </section>
);
