import React from 'react';
import {WEIGHTS} from '../lib/content';
import type {WeightLevel} from '../types';
import {Container, Reveal, SectionHeader} from './ui';

const H: Record<WeightLevel, number> = {light: 16, medium: 24, heavy: 32};

const KnuckleDiagram: React.FC<{level: WeightLevel}> = ({level}) => {
  const h = H[level];
  const xs = [46, 86, 126, 166];
  const finger = [48, 88, 128, 168];
  return (
    <svg viewBox="0 0 240 170" className="w-full" role="img" aria-label={`${level} configuration: four modules in a row across the knuckle line on the back of the hand. Fingertips and palm carry no weight.`}>
      {finger.map((x, i) => (
        <rect key={i} x={x} y={8 + (i === 1 ? 0 : i === 2 ? 4 : 12)} width="26" height={52} rx="13" fill="#f2d3c1" stroke="#dba98f" />
      ))}
      <path d="M36 70 C36 62 44 58 52 58 H190 C198 58 206 62 206 70 V140 C206 152 196 160 184 160 H58 C46 160 36 152 36 140 Z" fill="#10294a" />
      <path d="M44 80 H198" stroke="#3b82f6" strokeDasharray="4 3" strokeOpacity="0.55" />
      {xs.map((x, i) => (
        <g key={i}>
          <rect x={x} y={62} width="30" height={h + 10} rx="6" fill="#64748b" stroke="#94a3b8" />
          <rect x={x + 3} y={65} width="24" height="5" rx="2" fill="#cbd5e1" opacity="0.55" />
        </g>
      ))}
      <rect x="36" y="128" width="170" height="22" rx="6" fill="#1d5fd1" opacity="0.9" />
    </svg>
  );
};

export const WeightSystem: React.FC<{selected?: WeightLevel; onSelect?: (w: WeightLevel) => void}> = ({selected, onSelect}) => (
  <section id="weights" className="bg-mist py-20 sm:py-28">
    <Container>
      <SectionHeader eyebrow="Modular weight system" title="Three prototype configurations" intro="Each configuration uses the same four-module layout across the knuckle line. Only the mass of each module changes." />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {WEIGHTS.map((w, i) => (
          <Reveal key={w.id} delay={i * 90} className="h-full">
            <div className={`card h-full p-6 transition-shadow ${selected === w.id ? 'ring-2 ring-brand' : ''}`}>
              <div className="rounded-2xl bg-gradient-to-b from-[#f7f9fd] to-[#e7eef9] p-4">
                <KnuckleDiagram level={w.id} />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="text-xl font-extrabold">{w.label}</h3>
                <span className="text-lg font-extrabold text-brand">{w.total}</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-muted">{w.modules} modules</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{w.blurb}</p>
              {onSelect && (
                <button onClick={() => onSelect(w.id)} className="mt-4 text-sm font-bold text-brand underline-offset-4 hover:underline">
                  Choose {w.label.toLowerCase()}
                </button>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={100}>
        <p className="mt-8 max-w-3xl rounded-2xl border border-line bg-white px-5 py-4 text-sm text-muted">
          <strong className="text-ink">Prototype specification.</strong> Weights are approximate prototype values and may change. They are not clinically validated or prescribed amounts, and no configuration is recommended for any person or condition.
        </p>
      </Reveal>
    </Container>
  </section>
);
