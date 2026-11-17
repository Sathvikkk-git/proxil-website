import React from 'react';
import {Container, Icon, Reveal} from './ui';

export const UserStories: React.FC = () => (
  <section id="user-stories" className="pb-20 sm:pb-28">
    <Container>
      <Reveal>
        <div className="rounded-3xl border border-dashed border-ink/20 bg-mist p-8 text-center sm:p-12">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-sm"><Icon name="users" /></span>
          <h3 className="mt-5 text-2xl font-extrabold">User stories</h3>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted">Real user stories will appear here as PROXIL progresses through testing and validation.</p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">We do not publish testimonials we cannot stand behind.</p>
          <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand underline-offset-4 hover:underline">
            Interested in giving feedback? Get in touch <Icon name="arrow-right" className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </Container>
  </section>
);
