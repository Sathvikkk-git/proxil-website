import React, {useCallback, useState} from 'react';
import type {GloveConfig} from './types';
import {Navbar} from './components/Navbar';
import {Hero} from './components/Hero';
import {About} from './components/About';
import {Problem} from './components/Problem';
import {Solution} from './components/Solution';
import {HowItWorks} from './components/HowItWorks';
import {ProductShowcase} from './components/ProductShowcase';
import {ProductAnatomy} from './components/ProductAnatomy';
import {HumanExperience} from './components/HumanExperience';
import {WeightSystem} from './components/WeightSystem';
import {Configurator} from './components/Configurator';
import {WhyProxil} from './components/WhyProxil';
import {Safety} from './components/Safety';
import {ProductStory} from './components/ProductStory';
import {UserStories} from './components/UserStories';
import {Faq} from './components/Faq';
import {ContactSection} from './components/ContactSection';
import {Footer, type LegalKind} from './components/Footer';
import {WaitlistModal} from './components/WaitlistModal';
import {LegalModal} from './components/LegalModal';

export default function App() {
  // One shared configuration keeps the glove consistent across every section.
  const [config, setConfig] = useState<GloveConfig>({color: 'navy', size: 'M', weight: 'medium'});
  const [waitlist, setWaitlist] = useState(false);
  const [legal, setLegal] = useState<LegalKind | null>(null);
  const openWaitlist = useCallback(() => setWaitlist(true), []);
  const setColor = (color: GloveConfig['color']) => setConfig((c) => ({...c, color}));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Navbar onWaitlist={openWaitlist} />
      <main id="main">
        <Hero color={config.color} setColor={setColor} onWaitlist={openWaitlist} />
        <About />
        <Problem />
        <Solution />
        <HowItWorks />
        <ProductShowcase color={config.color} setColor={setColor} />
        <ProductAnatomy color={config.color} />
        <HumanExperience color={config.color} />
        <WeightSystem selected={config.weight} onSelect={(weight) => { setConfig((c) => ({...c, weight})); document.getElementById('order')?.scrollIntoView({behavior: 'smooth'}); }} />
        <Configurator config={config} setConfig={setConfig} onWaitlist={openWaitlist} />
        <WhyProxil />
        <Safety onLegal={setLegal} />
        <ProductStory />
        <UserStories />
        <Faq />
        <ContactSection />
      </main>
      <Footer onLegal={setLegal} />
      <WaitlistModal open={waitlist} onClose={() => setWaitlist(false)} config={config} />
      <LegalModal kind={legal} onClose={() => setLegal(null)} />
    </>
  );
}
