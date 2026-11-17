import React, {useState} from 'react';
import {COLORS, colorLabel} from '../lib/content';
import type {GloveColor, GloveView} from '../types';
import {GloveVisualizer} from './GloveVisualizer';
import {Container, Icon, Modal, SectionHeader} from './ui';

export const VIEWS: {id: GloveView; label: string; title: string; text: string}[] = [
  {id: 'dorsal', label: 'Back of hand', title: 'Back-of-hand view', text: 'Four weight modules sit in a single row across the knuckle line, held in a stitched bay on the back of the hand.'},
  {id: 'lateral', label: 'Side', title: 'Side profile', text: 'A low profile keeps the modules close to the hand so the glove stays slim at the knuckles.'},
  {id: 'palmar', label: 'Palm', title: 'Palm view', text: 'The palm stays clear of added mass, leaving room for natural grip and fingers free to move.'},
  {id: 'knuckle_macro', label: 'Module detail', title: 'Module detail', text: 'Individual modules are removable, which is how the Light, Medium and Heavy prototype configurations are built.'},
];

export const ProductShowcase: React.FC<{color: GloveColor; setColor: (c: GloveColor) => void}> = ({color, setColor}) => {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const v = VIEWS[idx];
  const step = (d: number) => setIdx((i) => (i + d + VIEWS.length) % VIEWS.length);

  return (
    <section id="product" className="py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="The glove" title="See PROXIL from every angle" intro="One consistent design, shown from the back of the hand, the side, the palm and up close at the weight modules." />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="card relative overflow-hidden bg-gradient-to-b from-[#f7f9fd] to-[#e9eff8]">
            <div className="flex items-center justify-between gap-3 px-5 pt-5">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-sm">{v.label}</span>
              <button onClick={() => setZoom(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink shadow-sm hover:bg-brand-tint" aria-label="Enlarge product view">
                <Icon name="zoom" className="h-4 w-4" /> Enlarge
              </button>
            </div>
            <div className="mx-auto w-full max-w-[460px] px-4 pb-4 pt-2" aria-live="polite">
              <div key={`${v.id}-${color}`} className="stage-fade">
                <GloveVisualizer color={color} weight="medium" view={v.id} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-line/70 bg-white/60 px-4 py-3 backdrop-blur">
              <button onClick={() => step(-1)} aria-label="Previous view" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white hover:border-ink/40">
                <Icon name="arrow-left" className="h-4 w-4" />
              </button>
              <div role="tablist" aria-label="Product view" className="flex flex-wrap justify-center gap-1.5">
                {VIEWS.map((x, i) => (
                  <button key={x.id} role="tab" aria-selected={i === idx} onClick={() => setIdx(i)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${i === idx ? 'bg-ink text-white' : 'text-ink-soft hover:bg-white'}`}>
                    {x.label}
                  </button>
                ))}
              </div>
              <button onClick={() => step(1)} aria-label="Next view" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white hover:border-ink/40">
                <Icon name="rotate" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="card p-6 sm:p-7">
              <p className="eyebrow">{`View ${idx + 1} of ${VIEWS.length}`}</p>
              <h3 className="mt-2 text-2xl font-extrabold">{v.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{v.text}</p>
            </div>

            <div className="card p-6 sm:p-7">
              <p className="eyebrow">Colour</p>
              <h3 className="mt-2 text-xl font-extrabold">{colorLabel(color)}</h3>
              <div className="mt-4 grid grid-cols-3 gap-3" role="radiogroup" aria-label="Glove colour">
                {COLORS.map((c) => (
                  <button key={c.id} role="radio" aria-checked={color === c.id} onClick={() => setColor(c.id)} className={`rounded-2xl border p-3 text-left transition-all ${color === c.id ? 'border-brand ring-2 ring-brand/30 bg-brand-tint/50' : 'border-line hover:border-ink/30'}`}>
                    <span className="block h-8 w-8 rounded-full border border-line" style={{background: c.swatch}} />
                    <span className="mt-2 block text-[0.78rem] font-bold text-ink">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-3 text-sm font-semibold text-ink-soft">
              {['Fingerless construction', 'Spacer-mesh back', 'Adjustable wrist strap', 'Removable modules'].map((t) => (
                <li key={t} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 shrink-0 text-brand" /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <Modal open={zoom} onClose={() => setZoom(false)} title={`PROXIL ${colorLabel(color)} · ${v.label}`} wide>
        <div className="mx-auto max-w-[640px] rounded-2xl bg-gradient-to-b from-[#f7f9fd] to-[#e9eff8] p-4">
          <GloveVisualizer color={color} weight="medium" view={v.id} />
        </div>
      </Modal>
    </section>
  );
};
