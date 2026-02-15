
import React from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button } from '../components/UI';

const ContentManager: React.FC = () => {
  const { config, updateConfig } = useConfig();

  const handleChange = (path: string, value: string) => {
    const [category, key] = path.split('.');
    updateConfig({
      [category]: {
        ...(config[category as keyof typeof config] as object),
        [key]: value
      }
    } as any);
  };

  const updateSiteButton = (key: string, field: string, value: string) => {
    updateConfig({
      siteButtons: {
        ...config.siteButtons,
        [key]: { ...config.siteButtons[key], [field]: value }
      }
    });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tighter">Branding & Hero</h2>
        <Card className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Studio Identity</label>
              <input 
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none" 
                value={config.branding.name} 
                onChange={e => handleChange('branding.name', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Main Hero Message (Subtitle)</label>
            <textarea 
              className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none h-24" 
              value={config.branding.description} 
              onChange={e => handleChange('branding.description', e.target.value)}
            />
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tighter">Global Site Buttons</h2>
        <div className="grid md:grid-cols-2 gap-6">
           {Object.keys(config.siteButtons).map(key => {
             const btn = config.siteButtons[key];
             return (
               <Card key={key} className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">{key} Control</span>
                  </div>
                  <div className="space-y-3">
                    <input 
                      placeholder="Button Label"
                      className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-xs"
                      value={btn.label}
                      onChange={(e) => updateSiteButton(key, 'label', e.target.value)}
                    />
                    <input 
                      placeholder="Destination URL (e.g. /gallery or https://...)"
                      className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-xs"
                      value={btn.url}
                      onChange={(e) => updateSiteButton(key, 'url', e.target.value)}
                    />
                    <div className="flex gap-2">
                      <select 
                        className="bg-zinc-900 text-[10px] p-2 border border-zinc-800 rounded w-full"
                        value={btn.target}
                        onChange={(e) => updateSiteButton(key, 'target', e.target.value)}
                      >
                         <option value="_self">Open in Same Tab</option>
                         <option value="_blank">Open in New Tab</option>
                      </select>
                    </div>
                  </div>
               </Card>
             );
           })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tighter">Contact Details</h2>
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
            <input 
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none" 
              value={config.contact.email} 
              onChange={e => handleChange('contact.email', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone Line</label>
            <input 
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none" 
              value={config.contact.phone} 
              onChange={e => handleChange('contact.phone', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Instagram Display Name</label>
            <input 
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none" 
              value={config.contact.instagram} 
              onChange={e => handleChange('contact.instagram', e.target.value)}
            />
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white tracking-tighter">Frequently Asked</h2>
          <Button onClick={() => {
            const newItem = { id: Math.random().toString(), question: "New Question", answer: "New Answer", visible: true };
            updateConfig({ faq: [...config.faq, newItem] });
          }}>+ Add FAQ</Button>
        </div>
        <div className="space-y-4">
          {config.faq.map((item, idx) => (
            <Card key={item.id} className="space-y-3">
              <input 
                className="w-full font-bold bg-transparent border-b border-zinc-800 focus:border-white outline-none pb-2 text-white"
                value={item.question}
                onChange={e => {
                  const updated = [...config.faq];
                  updated[idx].question = e.target.value;
                  updateConfig({ faq: updated });
                }}
              />
              <textarea 
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm h-20 text-zinc-400"
                value={item.answer}
                onChange={e => {
                  const updated = [...config.faq];
                  updated[idx].answer = e.target.value;
                  updateConfig({ faq: updated });
                }}
              />
              <div className="flex justify-end gap-2">
                 <button className="text-[10px] font-bold uppercase tracking-widest text-red-900 hover:text-red-500" onClick={() => {
                   const updated = config.faq.filter(f => f.id !== item.id);
                   updateConfig({ faq: updated });
                 }}>Remove Entry</button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContentManager;
