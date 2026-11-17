import React, {useState} from 'react';
import {COLORS, SIZES, WEIGHTS, colorLabel, weightLabel} from '../lib/content';
import type {GloveConfig, GloveView} from '../types';
import {GloveVisualizer} from './GloveVisualizer';
import {Button, Container, Icon, Reveal, SectionHeader} from './ui';

const VIEW_OPTS: {id: GloveView; label: string}[] = [
  {id: 'dorsal', label: 'Back'},
  {id: 'lateral', label: 'Side'},
  {id: 'palmar', label: 'Palm'},
];

const Group: React.FC<{label: string; children: React.ReactNode}> = ({label, children}) => (
  <fieldset className="border-0 p-0">
    <legend className="eyebrow mb-3">{label}</legend>
    {children}
  </fieldset>
);

export const Configurator: React.FC<{config: GloveConfig; setConfig: (c: GloveConfig) => void; onWaitlist: () => void}> = ({config, setConfig, onWaitlist}) => {
  const [view, setView] = useState<GloveView>('dorsal');
  const w = WEIGHTS.find((x) => x.id === config.weight)!;
  const set = (p: Partial<GloveConfig>) => setConfig({...config, ...p});

  return (
    <section id="order" className="py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="Configure" title="Find Your PROXIL" intro="Choose a colour, size and prototype weight configuration to see how your glove would look." />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <Reveal>
            <div className="card sticky top-24 overflow-hidden bg-gradient-to-b from-[#f7f9fd] to-[#e9eff8]">
              <div className="mx-auto w-full max-w-[400px] px-4 pt-6">
                <div key={`${config.color}-${view}`} className="stage-fade">
                  <GloveVisualizer color={config.color} weight={config.weight} view={view} />
                </div>
              </div>
              <div className="flex justify-center gap-1.5 pb-3" role="tablist" aria-label="Preview angle">
                {VIEW_OPTS.map((o) => (
                  <button key={o.id} role="tab" aria-selected={view === o.id} onClick={() => setView(o.id)} className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${view === o.id ? 'bg-ink text-white' : 'text-ink-soft hover:bg-white'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-line/70 bg-white px-6 py-5" aria-live="polite">
                <p className="text-xs font-extrabold tracking-[0.2em] text-brand">PROXIL</p>
                <ul className="mt-2 space-y-0.5 text-lg font-extrabold text-ink">
                  <li>{colorLabel(config.color)}</li>
                  <li>Size {config.size}</li>
                  <li>{weightLabel(config.weight)} Configuration</li>
                </ul>
                <p className="mt-1 text-sm text-muted">{w.modules} modules · {w.total} (prototype value)</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card space-y-8 p-6 sm:p-8">
              <Group label="1 · Colour">
                <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Colour">
                  {COLORS.map((c) => (
                    <button key={c.id} role="radio" aria-checked={config.color === c.id} onClick={() => set({color: c.id})} className={`flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-all ${config.color === c.id ? 'border-brand bg-brand-tint/50 ring-2 ring-brand/30' : 'border-line hover:border-ink/30'}`}>
                      <span className="h-8 w-8 rounded-full border border-line" style={{background: c.swatch}} />
                      <span className="text-[0.82rem] font-bold">{c.label}</span>
                    </button>
                  ))}
                </div>
              </Group>

              <Group label="2 · Size">
                <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Size">
                  {SIZES.map((s) => (
                    <button key={s} role="radio" aria-checked={config.size === s} onClick={() => set({size: s})} className={`h-12 rounded-xl border text-sm font-extrabold transition-all ${config.size === s ? 'border-brand bg-brand text-white' : 'border-line bg-white hover:border-ink/30'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted">Sizing measurements will be published before pre-orders open. Your selection is a preference, not a final fit.</p>
              </Group>

              <Group label="3 · Weight configuration">
                <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Weight configuration">
                  {WEIGHTS.map((x) => (
                    <button key={x.id} role="radio" aria-checked={config.weight === x.id} onClick={() => set({weight: x.id})} className={`rounded-2xl border p-4 text-left transition-all ${config.weight === x.id ? 'border-brand bg-brand-tint/50 ring-2 ring-brand/30' : 'border-line hover:border-ink/30'}`}>
                      <span className="block text-sm font-extrabold">{x.label}</span>
                      <span className="mt-1 block text-lg font-extrabold text-brand">{x.total}</span>
                      <span className="mt-0.5 block text-[0.7rem] font-semibold text-muted">{x.modules}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted">Weight configurations are prototype specifications. They are not clinically prescribed or validated for any individual.</p>
              </Group>

              <div className="border-t border-line pt-6">
                <Button size="lg" className="w-full" onClick={onWaitlist}>
                  Join the PROXIL Waitlist <Icon name="arrow-right" className="h-4 w-4" />
                </Button>
                <p className="mt-3 text-center text-xs text-muted">PROXIL is not yet on sale. Registering interest carries no obligation to buy and no payment is taken.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
