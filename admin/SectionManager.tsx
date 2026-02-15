
import React, { useState } from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button } from '../components/UI';
import { SectionVisibility } from '../types';

const SectionManager: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const [selectedPageId, setSelectedPageId] = useState('');

  const toggleVisibility = (id: string) => {
    const updated = config.sectionVisibility.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    );
    updateConfig({ sectionVisibility: updated });
  };

  const moveSection = (index: number, dir: 'up' | 'down') => {
    const list = [...config.sectionVisibility];
    const next = dir === 'up' ? index - 1 : index + 1;
    if (next < 0 || next >= list.length) return;
    [list[index], list[next]] = [list[next], list[index]];
    updateConfig({ sectionVisibility: list });
  };

  const addPageSection = () => {
    if (!selectedPageId) return;
    const page = config.pages.find(p => p.id === selectedPageId);
    if (!page) return;

    const newSection: SectionVisibility = {
      id: `custom-${Math.random().toString(36).substr(2, 9)}`,
      label: `Page: ${page.title}`,
      visible: true,
      type: 'custom-page',
      pageId: page.id
    };

    updateConfig({ sectionVisibility: [...config.sectionVisibility, newSection] });
    setSelectedPageId('');
  };

  const removeSection = (id: string) => {
    if (confirm("Remove this section from the homepage?")) {
      updateConfig({ sectionVisibility: config.sectionVisibility.filter(s => s.id !== id) });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-zinc-900 border-zinc-800">
        <h3 className="text-xl font-bold text-white mb-2">Homepage Structure</h3>
        <p className="text-zinc-500 text-sm mb-6">Manage the order and visibility of your landing page sections. You can now insert custom pages anywhere on the homepage.</p>
        
        <div className="flex gap-3 mb-8">
           <select 
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none focus:ring-1 ring-indigo-500"
            value={selectedPageId}
            onChange={(e) => setSelectedPageId(e.target.value)}
           >
              <option value="">Select a Page to Add...</option>
              {config.pages.filter(p => p.published).map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
           </select>
           <Button onClick={addPageSection} disabled={!selectedPageId}>Add to Home</Button>
        </div>

        <div className="space-y-3">
          {config.sectionVisibility.map((section, idx) => (
            <div key={section.id} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-2xl group">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveSection(idx, 'up')} className="text-zinc-700 hover:text-indigo-600">▲</button>
                  <button onClick={() => moveSection(idx, 'down')} className="text-zinc-700 hover:text-indigo-600">▼</button>
                </div>
                <div>
                  <span className="font-bold text-white">{section.label}</span>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest">{section.type.replace('-', ' ')}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => toggleVisibility(section.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${section.visible ? 'bg-indigo-600' : 'bg-zinc-800'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${section.visible ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                
                {section.type === 'custom-page' && (
                  <button onClick={() => removeSection(section.id)} className="text-red-900 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SectionManager;
