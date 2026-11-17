import React, {useState} from 'react';
import {isValidEmail, submitForm} from '../lib/api';
import {Button, Container, Icon, Reveal, SectionHeader} from './ui';
import {Field, PreviewNotice, inputCls} from './FormBits';

type State = {name: string; email: string; phone: string; message: string};
const EMPTY: State = {name: '', email: '', phone: '', message: ''};

export const ContactSection: React.FC = () => {
  const [f, setF] = useState<State>(EMPTY);
  const [errs, setErrs] = useState<Partial<State>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [delivered, setDelivered] = useState(false);

  const on = (k: keyof State) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({...f, [k]: e.target.value});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<State> = {};
    if (!f.name.trim()) er.name = 'Please enter your name.';
    if (!isValidEmail(f.email)) er.email = 'Please enter a valid email address.';
    if (f.message.trim().length < 5) er.message = 'Please add a short message.';
    setErrs(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try {
      const r = await submitForm({kind: 'contact', name: f.name, email: f.email, phone: f.phone || undefined, message: f.message});
      setDelivered(r.delivered);
      setStatus('sent');
      setF(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-ink py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeader light eyebrow="Contact" title="Connect With PROXIL" intro="Whether you are someone who experiences hand tremors, a caregiver, a clinician, or a potential collaborator, we would like to hear from you." />
            <Reveal delay={100}>
              <ul className="mt-8 space-y-3 text-sm text-white/75">
                <li className="flex gap-3"><Icon name="mail" className="mt-0.5 h-4 w-4 text-[#8fb4f2]" /> Use the form to reach the team directly.</li>
                <li className="flex gap-3"><Icon name="lock" className="mt-0.5 h-4 w-4 text-[#8fb4f2]" /> Please do not include detailed medical information.</li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="rounded-3xl bg-white p-6 text-ink sm:p-8">
              {status === 'sent' ? (
                <div role="status" className="py-6 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-tint text-brand"><Icon name="check" className="h-7 w-7" /></span>
                  <h3 className="mt-5 text-xl font-extrabold">{delivered ? 'Thank you, message sent' : 'Message captured in preview'}</h3>
                  <p className="mt-2 text-sm text-muted">{delivered ? 'We will get back to you as soon as we can.' : 'The form works, but no backend is connected yet.'}</p>
                  {!delivered && <div className="mt-5 text-left"><PreviewNotice /></div>}
                  <Button variant="secondary" className="mt-6" onClick={() => setStatus('idle')}>Send another message</Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-5" aria-label="Contact form">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="c-name" label="Name" error={errs.name}>
                      <input id="c-name" autoComplete="name" value={f.name} onChange={on('name')} aria-invalid={!!errs.name} aria-describedby={errs.name ? 'c-name-err' : undefined} className={inputCls(errs.name)} />
                    </Field>
                    <Field id="c-email" label="Email" error={errs.email}>
                      <input id="c-email" type="email" autoComplete="email" value={f.email} onChange={on('email')} aria-invalid={!!errs.email} aria-describedby={errs.email ? 'c-email-err' : undefined} className={inputCls(errs.email)} />
                    </Field>
                  </div>
                  <Field id="c-phone" label="Phone" optional>
                    <input id="c-phone" type="tel" autoComplete="tel" value={f.phone} onChange={on('phone')} className={inputCls()} />
                  </Field>
                  <Field id="c-msg" label="Message" error={errs.message}>
                    <textarea id="c-msg" rows={5} value={f.message} onChange={on('message')} aria-invalid={!!errs.message} aria-describedby={errs.message ? 'c-msg-err' : undefined} className={inputCls(errs.message)} />
                  </Field>
                  {status === 'error' && <p role="alert" className="text-sm font-semibold text-[#b42318]">Something went wrong sending your message. Please try again.</p>}
                  <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : <>Send Message <Icon name="send" className="h-4 w-4" /></>}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
