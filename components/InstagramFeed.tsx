
import React, { useState, useEffect } from 'react';
import { useConfig } from '../ConfigContext';
import { SafeImage } from './UI';

interface InstaPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: string;
}

export const InstagramFeed: React.FC = () => {
  const { config } = useConfig();
  const { instagram } = config;
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (instagram.enabled && instagram.mode === 'api' && instagram.accessToken) {
      fetchInstaPosts();
    }
  }, [instagram.accessToken, instagram.userId, instagram.mode, instagram.enabled]);

  const fetchInstaPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&limit=${instagram.postLimit}&access_token=${instagram.accessToken}`
      );
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }
      
      setPosts(data.data || []);
    } catch (err: any) {
      console.error("Instagram API Fetch Failed:", err);
      setError("Unable to load live feed. Viewing cached placeholders.");
    } finally {
      setLoading(false);
    }
  };

  if (!instagram.enabled) return null;

  // Render logic for API Mode
  if (instagram.mode === 'api') {
    return (
      <div className="w-full">
        {loading && <div className="text-center py-10 animate-pulse text-zinc-600">Syncing with Instagram...</div>}
        {error && <div className="text-center py-4 text-xs text-red-900 uppercase tracking-widest">{error}</div>}
        
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
            {posts.map((post) => (
              <a 
                key={post.id} 
                href={post.permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-zinc-950"
              >
                <SafeImage 
                  src={post.media_url} 
                  alt={post.caption || 'Instagram Post'} 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-4">
                   <p className="text-[8px] text-white uppercase tracking-widest font-bold line-clamp-2 text-center">{post.caption}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && !error && (
          <div className="text-center py-10 text-zinc-700 italic">No public posts found.</div>
        )}
      </div>
    );
  }

  // Render logic for Embed Mode
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instagram.embedUrls.length > 0 ? instagram.embedUrls.slice(0, instagram.postLimit).map((url, idx) => (
        <div key={idx} className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-900 p-4">
           <a href={url} target="_blank" rel="noopener noreferrer" className="block text-center group">
              <div className="aspect-square bg-zinc-950 rounded-lg mb-4 flex items-center justify-center text-zinc-800 group-hover:text-zinc-500 transition-colors">
                 <span className="text-4xl font-thin tracking-tighter">View on IG</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 truncate">{url}</p>
           </a>
        </div>
      )) : (
        <div className="col-span-full py-10 text-center text-zinc-700 italic border border-zinc-900 border-dashed rounded-3xl">
          Feed configuration required.
        </div>
      )}
    </div>
  );
};
