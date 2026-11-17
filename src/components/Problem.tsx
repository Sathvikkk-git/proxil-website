import React from 'react';
import {Container, Icon, type IconName, Reveal, SectionHeader} from './ui';

const ITEMS: {icon: IconName; title: string; text: string}[] = [
  {icon: 'grip', title: 'Holding objects', text: 'Keeping a steady grip on everyday items can take extra concentration.'},
  {icon: 'pen', title: 'Writing', text: 'Controlled pen movement matters for signatures, notes and forms.'},
  {icon: 'cup', title: 'Drinking', text: 'Lifting a cup without worrying about spills is a small, daily confidence.'},
  {icon: 'spoon', title: 'Eating & utensils', text: 'Guiding a spoon or fork steadily is easy to take for granted.'},
  {icon: 'target', title: 'Precise movements', text: 'Fine tasks such as buttons, keys or phone screens ask a lot of a hand.'},
  {icon: 'clock', title: 'Everyday tasks', text: 'Many small moments add up over a day, and so does the effort.'},
];

export const Problem: React.FC = () => (
  <section id="problem" className="bg-mist py-20 sm:py-28">
    <Container>
      <SectionHeader eyebrow="The challenge" title="When Small Movements Become Difficult" intro="People who experience hand tremors often describe how ordinary tasks ask for more effort, more time and more planning. It is rarely one big thing. It is many small moments." />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it, i) => (
          <li key={it.title}>
            <Reveal delay={(i % 3) * 80} className="h-full">
              <div className="card h-full p-6 transition-transform duration-300 hover:-translate-y-0.5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white"><Icon name={it.icon} /></span>
                <h3 className="mt-5 text-lg font-bold text-ink">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{it.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal delay={100}>
        <p className="mt-10 max-w-2xl text-base text-ink-soft">PROXIL is being designed to support these moments with a simple, wearable approach, so everyday hand movement can feel a little more confident.</p>
      </Reveal>
    </Container>
  </section>
);
