
import React, { useState } from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button } from '../components/UI';
import { CustomPage, PageBlock, BlockType } from '../types';

const PageManager: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  const addNewPage = () => {
    const newPage: CustomPage = {
      id: Math.random().toString(36).substr(2, 9),
      slug: 'new-page-' + Date.now(),
      title: 'Untitled Page',
      published: false,
      seo: { title: '', description: '' },
      blocks: []
    };
    updateConfig({ pages: [...config.pages, newPage] });
    setEditingPageId(newPage.id);
  };

  const deletePage = (id: string) => {
    if (confirm("Delete this page forever?")) {
      updateConfig({ pages: config.pages.filter(p => p.id !== id) });
    }
  };

  const editingPage = config.pages.find(p => p.id === editingPageId);

  if (editingPageId && editingPage) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900">
          <Button onClick={() => setEditingPageId(null)} variant="secondary">← Back to List</Button>
          <div className="flex gap-4">
             <Button onClick={() => {
               const updated = config.pages.map(p => p.id === editingPageId ? { ...p, published: !p.published } : p);
               updateConfig({ pages: updated });
             }} className={editingPage.published ? 'bg-emerald-950 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}>
               {editingPage.published ? 'Published' : 'Draft'}
             </Button>
          </div>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 space-y-6">
          <h3 className="text-xl font-bold text-white">General Settings</h3>
          <div className="grid md:grid-cols-2 gap-4">
             <div>
                <label className="text-xs font-bold text-zinc-500 uppercase">Page Title</label>
                <input 
                  className="w-full p-3 mt-1 bg-zinc-950 border border-zinc-800 rounded-xl outline-none text-white" 
                  value={editingPage.title}
                  onChange={(e) => {
                    const updated = config.pages.map(p => p.id === editingPageId ? { ...p, title: e.target.value } : p);
                    updateConfig({ pages: updated });
                  }}
                />
             </div>
             <div>
                <label className="text-xs font-bold text-zinc-500 uppercase">URL Slug</label>
                <input 
                  className="w-full p-3 mt-1 bg-zinc-950 border border-zinc-800 rounded-xl outline-none text-white" 
                  value={editingPage.slug}
                  onChange={(e) => {
                    const updated = config.pages.map(p => p.id === editingPageId ? { ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') } : p);
                    updateConfig({ pages: updated });
                  }}
                />
             </div>
          </div>
        </Card>

        <div className="space-y-6">
           <div className="flex justify-between items-center">
             <h3 className="text-2xl font-bold text-white tracking-tighter">Blocks</h3>
             <div className="flex gap-2">
               {(['heading', 'paragraph', 'image', 'button', 'spacer', 'divider'] as BlockType[]).map(type => (
                 <button 
                  key={type}
                  onClick={() => {
                    const newBlock: PageBlock = { id: Math.random().toString(), type, content: {}, settings: {} };
                    const updated = config.pages.map(p => p.id === editingPageId ? { ...p, blocks: [...p.blocks, newBlock] } : p);
                    updateConfig({ pages: updated });
                  }}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-400"
                 >
                   + {type}
                 </button>
               ))}
             </div>
           </div>

           <div className="space-y-4">
              {editingPage.blocks.map((block, idx) => (
                <Card key={block.id} className="bg-zinc-950 border-zinc-900 relative">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">{block.type}</span>
                      <div className="flex gap-2">
                         <button onClick={() => {
                           const blocks = [...editingPage.blocks];
                           if (idx > 0) [blocks[idx-1], blocks[idx]] = [blocks[idx], blocks[idx-1]];
                           updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                         }} className="text-zinc-600 hover:text-white">↑</button>
                         <button onClick={() => {
                           const blocks = [...editingPage.blocks];
                           if (idx < blocks.length - 1) [blocks[idx+1], blocks[idx]] = [blocks[idx], blocks[idx+1]];
                           updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                         }} className="text-zinc-600 hover:text-white">↓</button>
                         <button onClick={() => {
                           const blocks = editingPage.blocks.filter(b => b.id !== block.id);
                           updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                         }} className="text-red-900 hover:text-red-500">✕</button>
                      </div>
                   </div>

                   {/* Block Editor UI based on type */}
                   <div className="space-y-4">
                      {block.type === 'heading' && (
                        <input className="w-full bg-transparent border-b border-zinc-800 text-xl font-bold outline-none" placeholder="Heading Text..." value={block.content.text || ''} onChange={(e) => {
                          const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, content: { ...b.content, text: e.target.value } } : b);
                          updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                        }} />
                      )}
                      {block.type === 'paragraph' && (
                        <textarea className="w-full bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 outline-none h-32" placeholder="Text Content..." value={block.content.text || ''} onChange={(e) => {
                          const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, content: { ...b.content, text: e.target.value } } : b);
                          updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                        }} />
                      )}
                      {block.type === 'image' && (
                        <div className="grid grid-cols-2 gap-4">
                           <input className="w-full bg-zinc-900/50 p-2 rounded border border-zinc-800" placeholder="URL..." value={block.content.url || ''} onChange={(e) => {
                             const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, content: { ...b.content, url: e.target.value } } : b);
                             updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                           }} />
                           <input className="w-full bg-zinc-900/50 p-2 rounded border border-zinc-800" placeholder="Alt Text..." value={block.content.alt || ''} onChange={(e) => {
                             const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, content: { ...b.content, alt: e.target.value } } : b);
                             updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                           }} />
                        </div>
                      )}
                      {block.type === 'button' && (
                        <div className="grid grid-cols-2 gap-4">
                           <input className="w-full bg-zinc-900/50 p-2 rounded border border-zinc-800" placeholder="Label..." value={block.content.text || ''} onChange={(e) => {
                             const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, content: { ...b.content, text: e.target.value } } : b);
                             updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                           }} />
                           <input className="w-full bg-zinc-900/50 p-2 rounded border border-zinc-800" placeholder="URL..." value={block.content.url || ''} onChange={(e) => {
                             const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, content: { ...b.content, url: e.target.value } } : b);
                             updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                           }} />
                        </div>
                      )}
                      
                      {/* Shared Settings */}
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-900">
                         <div className="flex flex-col">
                            <label className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Alignment</label>
                            <select className="bg-zinc-900 text-[10px] p-1 border border-zinc-800 rounded" value={block.settings.alignment || 'left'} onChange={(e) => {
                              const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, settings: { ...b.settings, alignment: e.target.value as any } } : b);
                              updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                            }}>
                               <option value="left">Left</option>
                               <option value="center">Center</option>
                               <option value="right">Right</option>
                            </select>
                         </div>
                         <div className="flex flex-col">
                            <label className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Bottom Space</label>
                            <input type="number" className="bg-zinc-900 text-[10px] p-1 border border-zinc-800 rounded w-16" value={block.settings.spacingBottom || 0} onChange={(e) => {
                              const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, settings: { ...b.settings, spacingBottom: parseInt(e.target.value) } } : b);
                              updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                            }} />
                         </div>
                         {block.type === 'heading' && (
                           <div className="flex flex-col">
                              <label className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Size</label>
                              <select className="bg-zinc-900 text-[10px] p-1 border border-zinc-800 rounded" value={block.settings.fontSize || 'xl'} onChange={(e) => {
                                const blocks = editingPage.blocks.map(b => b.id === block.id ? { ...b, settings: { ...b.settings, fontSize: e.target.value as any } } : b);
                                updateConfig({ pages: config.pages.map(p => p.id === editingPageId ? { ...p, blocks } : p) });
                              }}>
                                 <option value="base">Small</option>
                                 <option value="xl">Large</option>
                                 <option value="2xl">Extra Large</option>
                                 <option value="3xl">Hero (Huge)</option>
                              </select>
                           </div>
                         )}
                      </div>
                   </div>
                </Card>
              ))}
              {editingPage.blocks.length === 0 && (
                <div className="py-20 text-center text-zinc-800 border-2 border-dashed border-zinc-900 rounded-3xl">
                   Start adding blocks to build this page.
                </div>
              )}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="flex justify-between items-center bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900">
        <div>
          <h3 className="text-white font-bold">Custom Pages</h3>
          <p className="text-zinc-500 text-xs">Build marketing or landing pages with ease.</p>
        </div>
        <Button onClick={addNewPage} className="bg-white text-black">
          + Create New Page
        </Button>
      </div>

      <div className="grid gap-4">
        {config.pages.map(p => (
          <Card key={p.id} className="flex items-center justify-between group hover:border-indigo-600 transition-colors">
             <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-white text-lg">{p.title}</h4>
                  <span className={`text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full ${p.published ? 'bg-emerald-950 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs">Slug: /page/{p.slug}</p>
             </div>
             <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditingPageId(p.id)} className="text-sm font-bold uppercase tracking-widest text-indigo-400">Edit Layout</button>
                <button onClick={() => deletePage(p.id)} className="text-sm font-bold uppercase tracking-widest text-red-900">Delete</button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PageManager;
