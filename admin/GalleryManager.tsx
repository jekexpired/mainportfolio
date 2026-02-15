
import React, { useRef } from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button, SafeImage } from '../components/UI';
import { fileToBase64 } from '../utils';

const GalleryManager: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = [...config.gallery];
    const maxOrder = newImages.reduce((max, img) => Math.max(max, img.order), -1);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large (>10MB). Optimize for web first.`);
        continue;
      }
      try {
        const base64 = await fileToBase64(file);
        newImages.unshift({
          id: Math.random().toString(36).substr(2, 9),
          url: base64,
          alt: file.name.split('.')[0],
          featured: false,
          visible: true,
          order: maxOrder + 1 + i
        });
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
    updateConfig({ gallery: newImages });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleImageProp = (id: string, prop: 'featured' | 'visible') => {
    const updated = config.gallery.map(img => 
      img.id === id ? { ...img, [prop]: !img[prop] } : img
    );
    updateConfig({ gallery: updated });
  };

  const deleteImage = (id: string) => {
    if (!confirm("Permanently delete this work from your portfolio?")) return;
    const filtered = config.gallery.filter(img => img.id !== id);
    updateConfig({ gallery: filtered });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const images = [...config.gallery];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    [images[index], images[targetIndex]] = [images[targetIndex], images[index]];
    updateConfig({ gallery: images });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900">
        <div>
          <h3 className="text-white font-bold">Image Assets</h3>
          <p className="text-zinc-500 text-xs">Recommended: High-res JPEGs under 2MB.</p>
        </div>
        <div className="flex gap-4">
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleUpload}
          />
          <Button onClick={() => fileInputRef.current?.click()} className="bg-white text-black">
            Upload Masterpieces
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {config.gallery.map((img, idx) => (
          <Card key={img.id} className="group overflow-hidden p-0 bg-zinc-950 border-zinc-900">
            <div className="aspect-video relative overflow-hidden">
              <SafeImage src={img.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute top-2 right-2 flex gap-2">
                 <button 
                  onClick={() => toggleImageProp(img.id, 'featured')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${img.featured ? 'bg-yellow-500 text-black' : 'bg-black/50 text-zinc-400 hover:text-white'}`}
                  title="Feature on Homepage"
                >
                  ★
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase truncate max-w-[150px]">{img.alt}</span>
                <span className={`text-[8px] px-2 py-0.5 rounded-full uppercase tracking-widest ${img.visible ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                  {img.visible ? 'Active' : 'Hidden'}
                </span>
              </div>

              <div className="flex gap-2 justify-between items-center pt-2 border-t border-zinc-900">
                <div className="flex gap-1">
                   <button onClick={() => moveImage(idx, 'up')} className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 transition-colors">↑</button>
                   <button onClick={() => moveImage(idx, 'down')} className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 transition-colors">↓</button>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => toggleImageProp(img.id, 'visible')} 
                    className="px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-zinc-800 hover:border-zinc-500 transition-all"
                  >
                    {img.visible ? 'Hide' : 'Show'}
                  </button>
                  <button 
                    onClick={() => deleteImage(img.id)} 
                    className="px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-red-900 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {config.gallery.length === 0 && (
          <div className="col-span-full py-24 text-center text-zinc-700 border-2 border-dashed border-zinc-900 rounded-3xl">
            No visuals found. Upload images to populate your portfolio.
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
