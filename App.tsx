
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ConfigProvider, useConfig } from './ConfigContext';
import Home from './pages/Home';
import PublicGallery from './pages/PublicGallery';
import CustomPage from './pages/CustomPage';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminRoute from './components/AdminRoute';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config } = useConfig();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-zinc-100">
      <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-xl z-40 border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase group flex items-center gap-2">
            <span className="w-1 h-6 bg-white group-hover:bg-indigo-500 transition-colors"></span>
            {config.branding.name}
          </Link>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {config.pages.filter(p => p.published).map(p => (
              <Link key={p.id} to={`/page/${p.slug}`} className="hover:text-white transition-colors">{p.title}</Link>
            ))}
            <Link to="/gallery" className="hover:text-white transition-colors">Portfolio</Link>
            <Link to="/admin" className="px-5 py-2 border border-zinc-800 rounded-full hover:border-zinc-700 hover:text-white transition-all">CMS</Link>
          </div>
          <div className="md:hidden">
            <Link to="/gallery" className="text-xs font-bold uppercase tracking-widest text-zinc-400">Gallery</Link>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-24 border-t border-zinc-900 bg-[#080808] text-center text-zinc-600">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tighter">{config.branding.name}</h2>
          <p className="text-sm mb-10 leading-relaxed italic">"{config.branding.description}"</p>
          <div className="flex justify-center gap-6 mb-12 text-zinc-400">
             <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
             <span className="hover:text-white cursor-pointer transition-colors">Vimeo</span>
             <span className="hover:text-white cursor-pointer transition-colors">Threads</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-30">© {new Date().getFullYear()} Protected by international copyright law.</p>
        </div>
      </footer>
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/gallery" element={<Layout><PublicGallery /></Layout>} />
        <Route path="/page/:slug" element={<Layout><CustomPage /></Layout>} />
        
        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
};

export default App;
