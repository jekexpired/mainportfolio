
import React, { useState, useRef } from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button, SafeImage } from '../components/UI';
import { fileToBase64 } from '../utils';

const ClientManager: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addClient = () => {
    const newClient = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Client'
    };
    updateConfig({ clients: [...config.clients, newClient] });
    setEditingId(newClient.id);
  };

  const updateClient = (id: string, updates: any) => {
    const updated = config.clients.map(c => c.id === id ? { ...c, ...updates } : c);
    updateConfig({ clients: updated });
  };

  const deleteClient = (id: string) => {
    if (confirm("Remove this client from your records?")) {
      updateConfig({ clients: config.clients.filter(c => c.id !== id) });
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      updateClient(id, { logoUrl: base64 });
    } catch (err) {
      alert("Failed to process image.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900">
        <div>
          <h3 className="text-white font-bold">Collaborators & Clients</h3>
          <p className="text-zinc-500 text-xs">Manage the logos and names of brands you have worked with.</p>
        </div>
        <Button onClick={addClient} className="bg-white text-black">
          + Add New Client
        </Button>
      </div>

      <div className="grid gap-4">
        {config.clients.map((client) => (
          <Card key={client.id} className="bg-zinc-950 border-zinc-900 overflow-hidden group">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-24 h-24 bg-zinc-900 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-800">
                {client.logoUrl ? (
                  <SafeImage src={client.logoUrl} alt={client.name} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-tighter">No Logo</span>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, client.id)}
                  id={`logo-${client.id}`}
                />
                <label 
                  htmlFor={`logo-${client.id}`}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-[8px] uppercase font-bold text-white text-center p-2"
                >
                  Upload Logo
                </label>
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Client Name</label>
                    <input 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
                      value={client.name}
                      onChange={(e) => updateClient(client.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Logo URL (Optional)</label>
                    <input 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
                      placeholder="Or paste external URL..."
                      value={client.logoUrl || ''}
                      onChange={(e) => updateClient(client.id, { logoUrl: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-end md:self-center">
                <button 
                  onClick={() => deleteClient(client.id)}
                  className="p-3 rounded-xl bg-red-950/20 text-red-900 hover:text-red-500 hover:bg-red-950/40 transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
          </Card>
        ))}

        {config.clients.length === 0 && (
          <div className="py-20 text-center text-zinc-800 border-2 border-dashed border-zinc-900 rounded-3xl">
            No clients listed yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientManager;
