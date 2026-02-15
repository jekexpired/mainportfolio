
import React from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button } from '../components/UI';

const BackupManager: React.FC = () => {
  const { config, updateConfig, resetConfig } = useConfig();

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `lumina_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (confirm("This will overwrite your current site data. Continue?")) {
          updateConfig(imported);
          alert("Import successful! Reloading site...");
          window.location.reload();
        }
      } catch (err) {
        alert("Failed to parse backup file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-zinc-900 border-zinc-800">
        <h3 className="text-lg font-bold text-white mb-2">Data Integrity</h3>
        <p className="text-zinc-500 text-sm mb-6">Keep your configuration safe or move it to another deployment.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Button onClick={handleExport} className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700">
            Download JSON Backup
          </Button>
          
          <label className="cursor-pointer px-6 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 rounded-full font-medium transition-all inline-block text-center">
            Upload JSON Backup
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </Card>

      <Card className="bg-red-950/20 border-red-900/30 p-8">
        <h3 className="text-lg font-bold text-red-400 mb-2">Destructive Actions</h3>
        <p className="text-red-900 text-sm mb-6">Resetting the site will delete all custom images and text immediately.</p>
        
        <Button 
          variant="danger" 
          onClick={() => {
            if(confirm("FINAL WARNING: Reset site to factory defaults? All uploads will be LOST.")) {
              resetConfig();
              window.location.reload();
            }
          }}
        >
          Factory Reset Site
        </Button>
      </Card>
    </div>
  );
};

export default BackupManager;
