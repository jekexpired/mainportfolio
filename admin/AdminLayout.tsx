
import React, { useState } from 'react';
import { useConfig } from '../ConfigContext';
import { Button, Card } from '../components/UI';
import GalleryManager from './GalleryManager';
import SectionManager from './SectionManager';
import ContentManager from './ContentManager';
import ThemeManager from './ThemeManager';
import BackupManager from './BackupManager';
import InstagramManager from './InstagramManager';
import PageManager from './PageManager';
import SecurityManager from './SecurityManager';
import { Link, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const { config, logout } = useConfig();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'gallery' | 'sections' | 'content' | 'pages' | 'instagram' | 'theme' | 'security' | 'maintenance'>('gallery');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row text-zinc-300">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-900 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-white text-2xl font-bold mb-1">Lumina CMS</h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Secure Session</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          {[
            { id: 'gallery', label: 'Portfolio Images' },
            { id: 'pages', label: 'Page Builder' },
            { id: 'sections', label: 'Site Layout' },
            { id: 'content', label: 'Copy & Actions' },
            { id: 'instagram', label: 'Instagram Feed' },
            { id: 'theme', label: 'Visual Styles' },
            { id: 'security', label: 'Security' },
            { id: 'maintenance', label: 'Maintenance' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === tab.id ? 'bg-indigo-600/10 border border-indigo-600/20 text-indigo-400' : 'hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-zinc-900 space-y-3">
          <Link to="/" className="block px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-white transition-colors">View Site</Link>
          <button 
            onClick={handleLogout} 
            className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-900 hover:text-red-500 transition-colors"
          >
            Logout Securely
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-zinc-950/20">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <header className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              {activeTab === 'pages' ? 'Page Builder' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + ' Management'}
            </h2>
            <p className="text-zinc-500 text-sm">Update your public presence in real-time.</p>
          </header>

          <div className="space-y-8">
            {activeTab === 'gallery' && <GalleryManager />}
            {activeTab === 'pages' && <PageManager />}
            {activeTab === 'sections' && <SectionManager />}
            {activeTab === 'content' && <ContentManager />}
            {activeTab === 'instagram' && <InstagramManager />}
            {activeTab === 'theme' && <ThemeManager />}
            {activeTab === 'security' && <SecurityManager />}
            {activeTab === 'maintenance' && <BackupManager />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
