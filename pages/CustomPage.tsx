
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useConfig } from '../ConfigContext';
import { Section } from '../components/UI';
import { PageRenderer } from '../components/PageRenderer';

const CustomPage: React.FC = () => {
  const { slug } = useParams();
  const { config } = useConfig();
  
  const page = config.pages.find(p => p.slug === slug && p.published);

  if (!page) {
    return (
      <Section className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-white mb-6 tracking-tighter">404</h1>
        <p className="text-zinc-500 mb-10">The shadows you seek do not exist here.</p>
        <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest text-xs">Return to Home</Link>
      </Section>
    );
  }

  return (
    <div className="pt-32 pb-20 animate-fade-in">
      <Section>
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">{page.title}</h1>
          <div className="w-20 h-1 bg-indigo-600"></div>
        </div>
        <PageRenderer blocks={page.blocks} />
      </Section>
    </div>
  );
};

export default CustomPage;
