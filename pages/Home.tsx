
import React from 'react';
import { useConfig } from '../ConfigContext';
import { SafeImage, Section, Button } from '../components/UI';
import { InstagramFeed } from '../components/InstagramFeed';
import { PageRenderer } from '../components/PageRenderer';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { config } = useConfig();
  const { branding, gallery, sectionVisibility, clients, faq, contact, instagram, siteButtons, pages } = config;

  const featuredImages = gallery.filter(img => img.visible && img.featured);
  const fallbackImages = gallery.filter(img => img.visible).slice(0, 4);
  const displayImages = featuredImages.length > 0 ? featuredImages : fallbackImages;

  const renderConfigBtn = (key: string, variant: 'primary' | 'secondary' = 'primary') => {
    const btn = siteButtons[key];
    if (!btn) return null;
    const isExternal = btn.url.startsWith('http');
    const Content = <Button variant={variant} className="px-10 py-4 uppercase tracking-widest font-bold">{btn.label}</Button>;
    return isExternal ? (
      <a href={btn.url} target={btn.target}>{Content}</a>
    ) : (
      <Link to={btn.url}>{Content}</Link>
    );
  };

  const renderSection = (section: any) => {
    if (!section.visible) return null;

    switch (section.type) {
      case 'hero':
        return (
          <Section key={section.id} className="min-h-screen flex flex-col justify-center items-center text-center pt-32 pb-20">
            <div className="animate-fade-in-up">
              <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter text-white">
                {branding.name}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
                {branding.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {renderConfigBtn('heroCta', 'primary')}
                {renderConfigBtn('heroSecondary', 'secondary')}
              </div>
            </div>
          </Section>
        );

      case 'gallery':
        return (
          <Section key={section.id} id="gallery" className="bg-[#0a0a0a]">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tighter">Selected Works</h2>
                <p className="text-zinc-500 mt-2">Moments frozen in time and space.</p>
              </div>
              <Link to={siteButtons.galleryLink?.url || '/gallery'} className="text-sm font-bold uppercase tracking-[0.2em] border-b-2 border-white/10 hover:border-white transition-all pb-1">
                {siteButtons.galleryLink?.label || 'All Collections'}
              </Link>
            </div>
            {displayImages.length === 0 ? (
               <div className="h-96 flex items-center justify-center border border-zinc-900 rounded-3xl text-zinc-600 italic">
                  Curation in progress...
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayImages.map((img) => (
                  <div key={img.id} className="group relative overflow-hidden rounded-lg bg-zinc-950 aspect-[4/5] md:aspect-square">
                    <SafeImage 
                      src={img.url} 
                      alt={img.alt} 
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">{img.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        );

      case 'instagram':
        return instagram.enabled && (
          <Section key={section.id} className="py-24 border-t border-zinc-950">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white tracking-tighter mb-2">{instagram.sectionTitle}</h2>
                <p className="text-zinc-500 text-sm font-medium uppercase tracking-[0.2em]">@{instagram.userId || contact.instagram}</p>
             </div>
             <InstagramFeed />
          </Section>
        );

      case 'clients':
        return (
          <Section key={section.id} className="py-32 border-y border-zinc-950 bg-[#080808]">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-700 text-center mb-16">Distinguished Collaborators</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              {clients.length > 0 ? clients.map(client => (
                <span key={client.id} className="text-xl md:text-3xl font-bold text-zinc-800 hover:text-zinc-600 transition-colors cursor-default tracking-tighter uppercase">{client.name}</span>
              )) : <span className="text-zinc-800 italic">No public records.</span>}
            </div>
          </Section>
        );

      case 'faq':
        return (
          <Section key={section.id} id="faq" className="max-w-4xl py-32">
            <h2 className="text-5xl font-bold mb-20 text-center text-white tracking-tighter">Process & Vision</h2>
            <div className="space-y-6">
              {faq.filter(f => f.visible).map(item => (
                <details key={item.id} className="group border-b border-zinc-900 pb-8 transition-all">
                  <summary className="text-xl md:text-2xl font-light cursor-pointer list-none flex justify-between items-center text-zinc-400 group-hover:text-white transition-colors">
                    {item.question}
                    <span className="text-zinc-700 group-open:rotate-45 transition-transform text-4xl font-thin">+</span>
                  </summary>
                  <p className="mt-6 text-zinc-500 leading-relaxed text-lg max-w-2xl">{item.answer}</p>
                </details>
              ))}
            </div>
          </Section>
        );

      case 'contact':
        return (
          <Section key={section.id} id="contact" className="py-40">
            <div className="grid lg:grid-cols-5 gap-20">
              <div className="lg:col-span-2">
                <h2 className="text-6xl font-bold mb-10 text-white tracking-tighter leading-tight">Start the<br/>Conversation.</h2>
                <div className="space-y-8 text-zinc-500">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-700 mb-2">Direct Channel</p>
                    <p className="text-lg hover:text-white transition-colors">{contact.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-700 mb-2">Office</p>
                    <p className="text-lg hover:text-white transition-colors">{contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-700 mb-2">Digital Journal</p>
                    <p className="text-lg hover:text-white transition-colors">@{contact.instagram}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                 <form className="space-y-6 p-10 bg-zinc-950 border border-zinc-900 rounded-3xl" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <input type="text" placeholder="Full Name" className="w-full p-4 bg-transparent border-b border-zinc-800 focus:border-white outline-none transition-colors text-white" />
                      <input type="email" placeholder="Email Address" className="w-full p-4 bg-transparent border-b border-zinc-800 focus:border-white outline-none transition-colors text-white" />
                    </div>
                    <input type="text" placeholder="Project Subject" className="w-full p-4 bg-transparent border-b border-zinc-800 focus:border-white outline-none transition-colors text-white" />
                    <textarea placeholder="Tell us your vision..." className="w-full p-4 h-40 bg-transparent border-b border-zinc-800 focus:border-white outline-none transition-colors text-white resize-none" />
                    <Button className="w-full py-5 text-black bg-white hover:bg-zinc-200 uppercase font-bold tracking-[0.2em]">{siteButtons.contactSubmit?.label || 'Initiate Inquiry'}</Button>
                 </form>
              </div>
            </div>
          </Section>
        );

      case 'custom-page':
        const page = pages.find(p => p.id === section.pageId && p.published);
        if (!page) return null;
        return (
          <Section key={section.id} className="py-24 border-t border-zinc-950">
             <div className="mb-12">
                <h2 className="text-4xl font-bold text-white tracking-tighter mb-2">{page.title}</h2>
                <div className="w-12 h-1 bg-indigo-600"></div>
             </div>
             <PageRenderer blocks={page.blocks} />
          </Section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0a0a]">
      {sectionVisibility.map(renderSection)}
    </div>
  );
};

export default Home;
