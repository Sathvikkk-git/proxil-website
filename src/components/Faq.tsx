import React, {useState} from 'react';
import {Container, Icon, SectionHeader} from './ui';

const QA = [
  {q: 'What is PROXIL?', a: 'PROXIL is a wearable glove concept designed to support hand stability through passive, strategically positioned weight modules. It is currently at the prototype / development stage.'},
  {q: 'Who is PROXIL designed for?', a: 'It is designed for people who experience hand tremors and want support during everyday hand activities. It has not been tested for or recommended to any particular condition.'},
  {q: 'How does the glove work?', a: 'Weight modules sit across the back of the hand. The added mass is designed to provide passive inertial support during movement. There are no motors. How much difference it makes can vary from person to person.'},
  {q: 'Where are the weights positioned?', a: 'On the back of the hand, in a row around the knuckle region. They are not placed on the fingertips, finger ends or palm.'},
  {q: 'Can I choose the glove size?', a: 'Yes. The planned range is XS, S, M, L and XL. A sizing guide will be published before pre-orders open.'},
  {q: 'Can I choose the weight configuration?', a: 'Yes. There are three prototype configurations: Light (approximately 100 g), Medium (approximately 180 g) and Heavy (approximately 260 g). These are prototype values, not prescribed amounts.'},
  {q: 'Is PROXIL a medical device?', a: 'PROXIL is currently a prototype-stage product concept and is not marketed as a medical device. No regulatory approval or clearance is claimed.'},
  {q: 'Can PROXIL cure Parkinson’s disease?', a: 'No. PROXIL is not a cure and does not treat, diagnose or prevent Parkinson’s disease or any other condition. It is a wearable concept designed to support hand stability during movement. Please speak with a healthcare professional about your care.'},
  {q: 'How do I purchase PROXIL?', a: 'PROXIL is not yet on sale. You can choose a configuration and join the waitlist to register your interest, with no payment and no obligation.'},
  {q: 'How can I contact the PROXIL team?', a: 'Use the contact form at the bottom of this page and tell us a little about your interest.'},
];

export const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-mist py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeader eyebrow="FAQ" title="Questions, answered plainly" intro="If something here is not covered, we would like to hear it." />
          <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
            {QA.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <h3>
                    <button id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[0.97rem] font-bold text-ink hover:bg-mist/60 sm:px-6">
                      {item.q}
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 ${isOpen ? 'rotate-180 bg-ink text-white' : ''}`}>
                        <Icon name="chevron-down" className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
