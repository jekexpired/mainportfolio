
import React from 'react';
import { PageBlock } from '../types';
import { SafeImage, Button } from './UI';
import { Link } from 'react-router-dom';

const BlockRenderer: React.FC<{ block: PageBlock }> = ({ block }) => {
  const { type, content, settings } = block;
  const alignmentClass = settings.alignment === 'center' ? 'text-center mx-auto' : settings.alignment === 'right' ? 'text-right ml-auto' : 'text-left';
  const spacingStyle = {
    marginTop: `${(settings.spacingTop || 0) * 0.25}rem`,
    marginBottom: `${(settings.spacingBottom || 0) * 0.25}rem`,
  };

  const fontSizeClass = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl md:text-5xl font-bold tracking-tighter text-white',
  }[settings.fontSize || 'base'];

  switch (type) {
    case 'heading':
      return <h2 style={spacingStyle} className={`${fontSizeClass} ${alignmentClass}`}>{content.text}</h2>;
    case 'paragraph':
      return <p style={spacingStyle} className={`${fontSizeClass} ${alignmentClass} text-zinc-500 leading-relaxed max-w-3xl`}>{content.text}</p>;
    case 'image':
      return (
        <div style={spacingStyle} className={`overflow-hidden rounded-2xl ${alignmentClass} max-w-5xl`}>
          <SafeImage src={content.url} alt={content.alt} className="w-full object-cover" />
          {content.caption && <p className="text-xs text-zinc-600 mt-2 italic">{content.caption}</p>}
        </div>
      );
    case 'button':
      const isExternal = content.url?.startsWith('http');
      const Btn = <Button variant={settings.buttonStyle === 'secondary' ? 'secondary' : 'primary'} className="px-8 py-3">{content.text}</Button>;
      return (
        <div style={spacingStyle} className={alignmentClass}>
          {isExternal ? (
            <a href={content.url} target={content.target || '_blank'} rel="noopener noreferrer">{Btn}</a>
          ) : (
            <Link to={content.url || '#'}>{Btn}</Link>
          )}
        </div>
      );
    case 'spacer':
      return <div style={{ height: `${(content.height || 4) * 0.25}rem` }} />;
    case 'divider':
      return <hr style={spacingStyle} className="border-zinc-900" />;
    default:
      return null;
  }
};

export const PageRenderer: React.FC<{ blocks: PageBlock[] }> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return <div className="py-20 text-center text-zinc-700 italic">This page has no content yet.</div>;
  return (
    <div className="space-y-12">
      {blocks.map(block => (
        <div key={block.id} className="animate-fade-in">
          <BlockRenderer block={block} />
        </div>
      ))}
    </div>
  );
};
