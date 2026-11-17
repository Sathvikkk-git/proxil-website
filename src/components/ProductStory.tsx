import React from 'react';
import {Container, Reveal, SectionHeader} from './ui';

const STAGES = [
  {t: 'Problem', d: 'Everyday tasks that hand tremor makes harder.'},
  {t: 'Research', d: 'Studying hand motion and how added mass behaves.'},
  {t: 'Prototype', d: 'Building wearable versions with modular weights.', now: true},
  {t: 'Testing', d: 'Evaluating comfort, fit and weight placement.', now: true},
  {t: 'User feedback', d: 'Listening to people who would wear it.'},
  {t: 'Refinement', d: 'Improving the design with what we learn.'},
  {t: 'PROXIL', d: 'A wearable built around human movement.'},
];

export const ProductStory: React.FC = () => (
  <section id="stories" className="py-20 sm:py-28">
    <Container>
      <SectionHeader eyebrow="Our story" title="From an Idea to a Wearable" intro="PROXIL grows one step at a time. Here is the path from the problem to the product, and where we are on it today." />
      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
        {STAGES.map((s, i) => (
          <li key={s.t} className="relative">
            <Reveal delay={i * 80} className="h-full">
              <div className="flex h-full flex-row gap-4 lg:flex-col lg:gap-0 lg:px-2">
                <div className="relative flex items-start lg:items-center lg:justify-start">
                  <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 text-sm font-extrabold ${s.t === 'PROXIL' ? 'border-ink bg-ink text-white' : s.now ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-soft'}`}>{i + 1}</span>
                  {i < STAGES.length - 1 && <span aria-hidden="true" className="absolute left-[44px] top-1/2 hidden h-px w-[calc(100%+0.5rem)] bg-line lg:block" />}
                </div>
                <div className="lg:mt-5">
                  <h3 className="text-base font-extrabold">{s.t}</h3>
                  {s.now && <span className="mt-1 inline-block rounded-full bg-brand-tint px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-brand-dark">We are here</span>}
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal delay={120}>
        <p className="mt-10 max-w-2xl rounded-2xl border border-line bg-mist px-5 py-4 text-sm text-muted">
          Development relies on measurement and testing tools that help us study hand motion. These are part of how we build and refine PROXIL. They are not part of the glove you would wear.
        </p>
      </Reveal>
    </Container>
  </section>
);
