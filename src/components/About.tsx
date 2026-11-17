import React from 'react';
import {Container, Icon, type IconName, Reveal, SectionHeader} from './ui';

const PILLARS: {icon: IconName; title: string; text: string}[] = [
  {icon: 'heart', title: 'Human-centered design', text: 'Every decision starts with how a hand actually moves through an ordinary day.'},
  {icon: 'hand', title: 'Wearable technology', text: 'A glove that is comfortable, breathable and easy to put on without help.'},
  {icon: 'compass', title: 'Mechanical principles', text: 'Mass and inertia, positioned with intent rather than added at random.'},
  {icon: 'wrench', title: 'Product engineering', text: 'Modular parts, adjustable fit and a build we can keep refining.'},
  {icon: 'users', title: 'User feedback', text: 'Prototypes shaped by the people they are meant to support.'},
];

export const About: React.FC = () => (
  <section id="about" className="py-20 sm:py-28">
    <Container>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeader eyebrow="About PROXIL" title="Built Around Human Movement" intro="PROXIL is a startup focused on developing practical wearable technology that can support people experiencing hand tremors." />
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              We are an early-stage team developing and refining our first product. Rather than promising more than we can show, we are building in the open: a clear concept, a prototype we keep improving, and a commitment to share what we learn.
            </p>
          </Reveal>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <li key={p.title} className={i === 4 ? 'sm:col-span-2' : ''}>
              <Reveal delay={i * 70} className="h-full">
                <div className="card flex h-full gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand"><Icon name={p.icon} /></span>
                  <div>
                    <h3 className="text-[0.98rem] font-bold text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
);
