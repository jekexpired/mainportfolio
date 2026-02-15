
import React, { useState } from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button } from '../components/UI';

const InstagramManager: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const { instagram } = config;
  const [newEmbedUrl, setNewEmbedUrl] = useState('');

  const updateInstagram = (updatedFields: Partial<typeof instagram>) => {
    updateConfig({
      instagram: { ...instagram, ...updatedFields }
    });
  };

  const addEmbedUrl = () => {
    if (!newEmbedUrl) return;
    updateInstagram({ embedUrls: [newEmbedUrl, ...instagram.embedUrls] });
    setNewEmbedUrl('');
  };

  const removeEmbedUrl = (index: number) => {
    const updated = [...instagram.embedUrls];
    updated.splice(index, 1);
    updateInstagram({ embedUrls: updated });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-zinc-900 border-zinc-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Feed Activation</h3>
          <button 
            onClick={() => updateInstagram({ enabled: !instagram.enabled })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${instagram.enabled ? 'bg-indigo-600' : 'bg-zinc-800'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${instagram.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-400">Section Title</label>
          <input 
            type="text"
            value={instagram.sectionTitle}
            onChange={(e) => updateInstagram({ sectionTitle: e.target.value })}
            className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:ring-1 ring-indigo-500"
            placeholder="e.g. Latest from Instagram"
          />
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <h3 className="text-lg font-bold text-white mb-6">Connection Method</h3>
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => updateInstagram({ mode: 'api' })}
            className={`flex-1 p-4 rounded-xl border transition-all text-center ${instagram.mode === 'api' ? 'bg-indigo-600/10 border-indigo-600 text-indigo-400' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
          >
            <div className="font-bold text-sm uppercase tracking-widest mb-1">Graph API</div>
            <div className="text-[10px] opacity-60">Automated Live Feed</div>
          </button>
          <button 
            onClick={() => updateInstagram({ mode: 'embed' })}
            className={`flex-1 p-4 rounded-xl border transition-all text-center ${instagram.mode === 'embed' ? 'bg-indigo-600/10 border-indigo-600 text-indigo-400' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
          >
            <div className="font-bold text-sm uppercase tracking-widest mb-1">Manual Embed</div>
            <div className="text-[10px] opacity-60">Specific Post Selection</div>
          </button>
        </div>

        {instagram.mode === 'api' ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Access Token</label>
              <input 
                type="password"
                value={instagram.accessToken}
                onChange={(e) => updateInstagram({ accessToken: e.target.value })}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:ring-1 ring-indigo-500"
                placeholder="Basic Display API Token..."
              />
              <p className="text-[10px] text-zinc-600">Obtain via Meta for Developers (Basic Display API).</p>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Post Limit</label>
              <select 
                value={instagram.postLimit}
                onChange={(e) => updateInstagram({ postLimit: Number(e.target.value) })}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:ring-1 ring-indigo-500"
              >
                {[3, 6, 9, 12, 18].map(n => <option key={n} value={n}>{n} Posts</option>)}
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-3">
              <input 
                type="text"
                value={newEmbedUrl}
                onChange={(e) => setNewEmbedUrl(e.target.value)}
                className="flex-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:ring-1 ring-indigo-500"
                placeholder="Paste Instagram post URL..."
              />
              <Button onClick={addEmbedUrl} className="bg-white text-black text-[10px] px-4">Add</Button>
            </div>

            <div className="space-y-3">
              {instagram.embedUrls.map((url, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-900 rounded-xl">
                   <span className="text-[10px] text-zinc-500 truncate max-w-[250px]">{url}</span>
                   <button onClick={() => removeEmbedUrl(idx)} className="text-red-900 hover:text-red-500 text-xs font-bold">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InstagramManager;
