
import React, { useState } from 'react';
import { useConfig } from '../ConfigContext';
import { SafeImage, Section, Button } from '../components/UI';
import { Link } from 'react-router-dom';

const PublicGallery: React.FC = () => {
  const { config } = useConfig();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const visibleImages = config.gallery.filter(img => img.visible).sort((a, b) => a.order - b.order);

  return (
    <Section className="pt-24 min-h-screen">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link to="/" className="text-zinc-500 hover:text-zinc-900 mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-bold">The Complete Gallery</h1>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-medium">{visibleImages.length} Shots</span>
        </div>
      </div>

      {visibleImages.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">
           The gallery is currently empty. Check back soon!
        </div>
      ) : (
        <div className="masonry-grid">
          {visibleImages.map((img) => (
            <div 
              key={img.id} 
              className="masonry-item relative group cursor-pointer overflow-hidden rounded-xl bg-zinc-100"
              onClick={() => setSelectedImage(img.url)}
            >
              <SafeImage src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium">View Full Screen</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <SafeImage src={selectedImage} className="max-w-full max-h-full object-contain shadow-2xl" />
            <button 
              className="absolute top-4 right-4 text-white text-3xl p-2 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </Section>
  );
};

export default PublicGallery;
