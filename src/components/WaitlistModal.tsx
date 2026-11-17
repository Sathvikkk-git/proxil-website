import React, {useState} from 'react';
import {colorLabel, weightLabel, WEIGHTS} from '../lib/content';
import {isValidEmail, submitForm} from '../lib/api';
import type {GloveConfig} from '../types';
import {Button, Icon, Modal} from './ui';
import {Field, PreviewNotice, inputCls} from './FormBits';

export const WaitlistModal: React.FC<{open: boolean; onClose: () => void; config: GloveConfig}> = ({open, onClose, config}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [delivered, setDelivered] = useState(false);

  const close = () => {
    onClose();
    setTimeout(() => setStatus('idle'), 300);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!name.trim()) er.name = 'Please enter your name.';
    if (!isValidEmail(email)) er.email = 'Please enter a valid email address.';
    if (!consent) er.consent = 'Please confirm so we can contact you about PROXIL.';
    setErrs(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try {
      const r = await submitForm({kind: 'waitlist', name, email, phone: phone || undefined, config: {color: colorLabel(config.color), size: config.size, weight: weightLabel(config.weight)}});
      setDelivered(r.delivered);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const w = WEIGHTS.find((x) => x.id === config.weight)!;

  return (
    <Modal open={open} onClose={close} title="Join the PROXIL Waitlist">
      {status === 'sent' ? (
        <div role="status" className="py-4 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-tint text-brand"><Icon name="check" className="h-7 w-7" /></span>
          <h3 className="mt-5 text-xl font-extrabold">{delivered ? 'You are on the list' : 'Interest recorded in preview'}</h3>
          <p className="mt-2 text-sm text-muted">{delivered ? 'We will contact you with updates about PROXIL. No payment has been taken.' : 'The flow works end to end, but no backend is connected yet.'}</p>
          {!delivered && <div className="mt-5 text-left"><PreviewNotice /></div>}
          <Button className="mt-6" onClick={close}>Done</Button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-5" aria-label="Waitlist form">
          <div className="rounded-2xl bg-mist p-4 text-sm">
            <p className="eyebrow">Your selection</p>
            <p className="mt-1 font-extrabold text-ink">PROXIL · {colorLabel(config.color)} · Size {config.size} · {weightLabel(config.weight)}</p>
            <p className="text-xs text-muted">{w.total} prototype configuration. Not a clinical recommendation.</p>
          </div>
          <Field id="w-name" label="Name" error={errs.name}>
            <input id="w-name" data-autofocus autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errs.name} aria-describedby={errs.name ? 'w-name-err' : undefined} className={inputCls(errs.name)} />
          </Field>
          <Field id="w-email" label="Email" error={errs.email}>
            <input id="w-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errs.email} aria-describedby={errs.email ? 'w-email-err' : undefined} className={inputCls(errs.email)} />
          </Field>
          <Field id="w-phone" label="Phone" optional>
            <input id="w-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls()} />
          </Field>
          <div>
            <label className="flex items-start gap-3 text-sm text-ink-soft">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#1d5fd1]" aria-describedby={errs.consent ? 'w-consent-err' : undefined} />
              I would like to hear about PROXIL and understand this is not a purchase.
            </label>
            {errs.consent && <p id="w-consent-err" role="alert" className="mt-1.5 text-xs font-semibold text-[#b42318]">{errs.consent}</p>}
          </div>
          {status === 'error' && <p role="alert" className="text-sm font-semibold text-[#b42318]">Something went wrong. Please try again.</p>}
          <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting…' : 'Register My Interest'}</Button>
        </form>
      )}
    </Modal>
  );
};
