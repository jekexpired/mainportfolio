
import React from 'react';
import { FALLBACK_IMAGE } from '../constants';

export const SafeImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, className, ...props }) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && <div className="absolute inset-0 bg-zinc-900 animate-pulse" />}
      <img
        src={error ? FALLBACK_IMAGE : (src || FALLBACK_IMAGE)}
        alt={alt || "Portfolio image"}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => (
  <section id={id} className={`py-20 md:py-32 px-6 max-w-7xl mx-auto ${className || ''}`}>
    {children}
  </section>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }> = ({ children, variant = 'primary', className, ...props }) => {
  const base = "px-8 py-3 rounded-full font-bold transition-all active:scale-95 disabled:opacity-50 text-[10px] uppercase tracking-widest";
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-xl",
    secondary: "bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500",
    danger: "bg-red-950 text-red-400 hover:bg-red-900 border border-red-900/50"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-zinc-950 p-8 rounded-3xl border border-zinc-900 shadow-2xl ${className || ''}`}>
    {children}
  </div>
);
