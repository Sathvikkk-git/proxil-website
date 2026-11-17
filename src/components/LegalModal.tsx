import React from 'react';
import type {LegalKind} from './Footer';
import {Modal} from './ui';

const DOCS: Record<LegalKind, {title: string; body: React.ReactNode}> = {
  medical: {
    title: 'Medical Disclaimer',
    body: (
      <>
        <p>PROXIL is a prototype-stage wearable product concept. It is designed to support hand stability through passive weight distribution and is not intended to diagnose, treat, cure, or prevent any disease or medical condition.</p>
        <p>PROXIL is not marketed as a medical device and no regulatory approval or clearance is claimed. Information on this website is for general information only and is not medical advice.</p>
        <p>Always seek the advice of a qualified healthcare professional with any questions about a medical condition, including tremor, and before making changes to your care. Individual experiences with wearable products vary, and no particular outcome is promised.</p>
      </>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    body: (
      <>
        <p className="rounded-xl bg-[#fff8e6] p-3 text-[#6b4e0a]"><strong>Draft for review.</strong> This summary must be replaced by a policy reviewed by legal counsel before launch.</p>
        <p>This website may collect the name, email address, optional phone number and message you choose to submit through the waitlist and contact forms, together with your selected glove configuration.</p>
        <p>This information is used to respond to you and to share updates about PROXIL. We ask that you do not include detailed medical information in your messages.</p>
        <p>Contact details for exercising your data rights will be added here once the company information is finalised.</p>
      </>
    ),
  },
  terms: {
    title: 'Terms',
    body: (
      <>
        <p className="rounded-xl bg-[#fff8e6] p-3 text-[#6b4e0a]"><strong>Draft for review.</strong> This summary must be replaced by terms reviewed by legal counsel before launch.</p>
        <p>This website describes a product that is under development. Product details, specifications, configurations and availability may change without notice.</p>
        <p>Registering interest on this website is not a purchase, order or reservation, creates no obligation on either side, and no payment is taken.</p>
        <p>Nothing on this website is medical advice. See the Medical Disclaimer.</p>
      </>
    ),
  },
};

export const LegalModal: React.FC<{kind: LegalKind | null; onClose: () => void}> = ({kind, onClose}) => {
  const d = kind ? DOCS[kind] : null;
  return (
    <Modal open={!!kind} onClose={onClose} title={d?.title ?? ''}>
      <div className="space-y-4 text-sm leading-relaxed text-ink-soft">{d?.body}</div>
    </Modal>
  );
};
