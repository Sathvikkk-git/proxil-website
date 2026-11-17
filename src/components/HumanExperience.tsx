import React, {useState} from 'react';
import type {GloveColor} from '../types';
import {GloveVisualizer} from './GloveVisualizer';
import {Container, Icon, type IconName, Reveal, SectionHeader} from './ui';

type Tile = {id: string; file: string; title: string; text: string; icon: IconName; glove?: 'dorsal' | 'lateral'; alt: string};

// Photos live in /public/media. Missing files fall back to illustrations.
const TILES: Tile[] = [
  {id: 'back', file: 'hand-back.jpg', title: 'Back of hand', text: 'The knuckle modules in place on a real hand.', icon: 'hand', glove: 'dorsal', alt: 'PROXIL glove worn on a hand, seen from the back, with weight modules across the knuckles'},
  {id: 'side', file: 'hand-side.jpg', title: 'Side view', text: 'A low profile that follows the shape of the hand.', icon: 'hand', glove: 'lateral', alt: 'PROXIL glove worn on a hand, seen from the side'},
  {id: 'cup', file: 'hand-cup.jpg', title: 'Holding a cup', text: 'Fingers and palm stay free to grip.', icon: 'cup', alt: 'A hand wearing the PROXIL glove holding a cup'},
  {id: 'write', file: 'hand-writing.jpg', title: 'Writing', text: 'Natural finger movement around a pen.', icon: 'pen', alt: 'A hand wearing the PROXIL glove holding a pen'},
  {id: 'spoon', file: 'hand-spoon.jpg', title: 'Holding a spoon', text: 'Everyday eating with open fingers.', icon: 'spoon', alt: 'A hand wearing the PROXIL glove holding a spoon'},
  {id: 'pick', file: 'hand-pickup.jpg', title: 'Picking up an object', text: 'Fingertips remain fully exposed for touch.', icon: 'grip', alt: 'A hand wearing the PROXIL glove picking up a small object'},
];

const MediaTile: React.FC<{t: Tile; color: GloveColor; i: number}> = ({t, color, i}) => {
  const [failed, setFailed] = useState(false);
  return (
    <Reveal delay={(i % 3) * 80} className="h-full">
      <figure className="card h-full overflow-hidden">
        <div className="relative aspect-[4/3] bg-gradient-to-b from-[#f7f9fd] to-[#e6edf8]">
          {!failed ? (
            <img src={`${import.meta.env.BASE_URL}media/${t.file}`} alt={t.alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
          ) : t.glove ? (
            <div className="grid h-full place-items-center p-3">
              <GloveVisualizer color={color} view={t.glove} className="h-full [&>svg]:h-full [&>svg]:w-auto" />
            </div>
          ) : (
            <div className="grid h-full place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-brand shadow-sm">
                <Icon name={t.icon} className="h-9 w-9" strokeWidth={1.5} />
              </span>
            </div>
          )}
          {failed && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wider text-muted">
              <Icon name="image" className="h-3 w-3" /> Photo to be added
            </span>
          )}
        </div>
        <figcaption className="p-5">
          <h3 className="text-base font-bold text-ink">{t.title}</h3>
          <p className="mt-1 text-sm text-muted">{t.text}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
};

export const HumanExperience: React.FC<{color: GloveColor}> = ({color}) => (
  <section id="experience" className="py-20 sm:py-28">
    <Container>
      <SectionHeader eyebrow="In everyday use" title="Made to be worn, not just looked at" intro="PROXIL is designed around natural finger movement and ordinary activities: a cup, a pen, a spoon, a small object." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t, i) => (
          <MediaTile key={t.id} t={t} color={color} i={i} />
        ))}
      </div>
    </Container>
  </section>
);
