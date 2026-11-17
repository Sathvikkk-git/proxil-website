import React, {useState} from 'react';
import type {GloveColor, GloveView} from '../types';
import {GloveVisualizer} from './GloveVisualizer';
import {Container, Icon, SectionHeader} from './ui';

type Spot = {id: string; title: string; text: string; view: GloveView; x: number; y: number};

const SPOTS: Spot[] = [
  {id: 'weights', title: 'Knuckle weight modules', text: 'Four modules sit in a row on the back of the hand, across the knuckle line. They are deliberately kept off the fingertips, finger ends and palm.', view: 'dorsal', x: 52, y: 43},
  {id: 'modular', title: 'Modular weight system', text: 'Modules can be added or removed, which is how the Light, Medium and Heavy prototype configurations are formed.', view: 'dorsal', x: 66.5, y: 47.5},
  {id: 'strap', title: 'Adjustable wrist strap', text: 'A wide hook-and-loop wrap anchors the glove at the wrist so the modules stay where they are meant to be.', view: 'dorsal', x: 71, y: 80},
  {id: 'fit', title: 'Secure fit', text: 'A second mid-hand strap fine-tunes tension across the back of the hand to keep the glove steady during movement.', view: 'dorsal', x: 66, y: 60},
  {id: 'mesh', title: 'Breathable material', text: 'A technical spacer mesh across the back of the hand is intended to keep the glove comfortable for longer wear.', view: 'dorsal', x: 38, y: 66},
  {id: 'fingers', title: 'Finger mobility', text: 'The glove is fingerless, so fingers keep their natural range of motion and touch.', view: 'dorsal', x: 52, y: 21.5},
  {id: 'palm', title: 'Palm clearance', text: 'The palm side stays free of added mass to leave room for natural gripping.', view: 'palmar', x: 53, y: 52},
];

export const ProductAnatomy: React.FC<{color: GloveColor}> = ({color}) => {
  const [active, setActive] = useState(SPOTS[0].id);
  const spot = SPOTS.find((s) => s.id === active)!;
  const spots = SPOTS.filter((s) => s.view === spot.view);

  return (
    <section id="anatomy" className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="Product anatomy" title="Look closer at the design" intro="Select a point on the glove, or pick from the list, to see what each part is for." />
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="card relative mx-auto w-full max-w-[470px] bg-gradient-to-b from-white to-[#eaf0f9] p-4 sm:p-6">
            <div className="relative">
              <div key={spot.view} className="stage-fade">
                <GloveVisualizer color={color} weight="medium" view={spot.view} />
              </div>
              {spots.map((s) => {
                const on = s.id === active;
                return (
                  <button key={s.id} onClick={() => setActive(s.id)} aria-label={s.title} aria-pressed={on} className="absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center" style={{left: `${s.x}%`, top: `${s.y}%`}}>
                    {on && <span className="hotspot-ring absolute h-6 w-6 rounded-full bg-brand/40" />}
                    <span className={`relative grid h-6 w-6 place-items-center rounded-full border-2 border-white text-white shadow-md transition-all ${on ? 'bg-brand scale-110' : 'bg-ink/85 hover:bg-brand'}`}>
                      <Icon name="plus" className="h-3 w-3" strokeWidth={3} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="card p-6 sm:p-7" aria-live="polite">
              <p className="eyebrow">{spot.view === 'palmar' ? 'Palm view' : 'Back of hand'}</p>
              <h3 className="mt-2 text-2xl font-extrabold">{spot.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{spot.text}</p>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2" aria-label="Glove parts">
              {SPOTS.map((s) => (
                <li key={s.id}>
                  <button onClick={() => setActive(s.id)} aria-pressed={s.id === active} className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors ${s.id === active ? 'border-brand bg-brand-tint text-brand-dark' : 'border-line bg-white text-ink hover:border-ink/30'}`}>
                    {s.title}
                    <Icon name="arrow-right" className="h-4 w-4 shrink-0 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
