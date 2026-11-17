import React from 'react';

export const Field: React.FC<{id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode}> = ({id, label, error, optional, children}) => (
  <div>
    <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-bold text-ink">
      {label}
      {optional && <span className="text-xs font-medium text-muted">Optional</span>}
    </label>
    {children}
    {error && (
      <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs font-semibold text-[#b42318]">
        {error}
      </p>
    )}
  </div>
);

export const inputCls = (err?: string) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-[#8795ab] transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25 ${err ? 'border-[#b42318]' : 'border-line hover:border-ink/30'}`;

export const PreviewNotice: React.FC = () => (
  <p className="rounded-xl border border-[#f1d9a6] bg-[#fff8e6] px-4 py-3 text-sm text-[#6b4e0a]">
    <strong>Preview mode.</strong> This form is not connected to a backend yet, so nothing was sent. Connect it by setting <code className="rounded bg-white/70 px-1">VITE_FORM_ENDPOINT</code>.
  </p>
);
