
import React from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button } from '../components/UI';

const ThemeManager: React.FC = () => {
  const { config, updateConfig } = useConfig();

  const updateTheme = (key: string, value: string) => {
    updateConfig({
      theme: { ...config.theme, [key]: value }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <h3 className="text-lg font-bold text-white mb-6">Accent Color Settings</h3>
        <p className="text-zinc-500 text-sm mb-6">Choose a color that defines your brand's personality.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-zinc-400">Accent Hex Code</label>
            <div className="flex gap-3">
              <input 
                type="color" 
                value={config.theme.accentColor}
                onChange={(e) => updateTheme('accentColor', e.target.value)}
                className="w-12 h-12 bg-transparent border-0 cursor-pointer"
              />
              <input 
                type="text"
                value={config.theme.accentColor}
                onChange={(e) => updateTheme('accentColor', e.target.value)}
                className="flex-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:ring-1 ring-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center">
             <div className="text-center">
                <p className="text-xs text-zinc-600 uppercase mb-3">Live Preview</p>
                <button className="px-6 py-2 rounded-full font-bold text-sm text-white" style={{ backgroundColor: config.theme.accentColor }}>
                   Action Button
                </button>
             </div>
          </div>
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 border-yellow-900/20">
         <h3 className="text-lg font-bold text-white mb-2">Dark Mode Enforcement</h3>
         <p className="text-zinc-500 text-sm leading-relaxed">
           Lumina Noir is designed exclusively for dark environments. Background color is locked to <b>#0a0a0a</b> to ensure portfolio consistency and visual weight.
         </p>
      </Card>
    </div>
  );
};

export default ThemeManager;
