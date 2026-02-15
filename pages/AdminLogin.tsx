
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useConfig } from '../ConfigContext';
import { Button, Card } from '../components/UI';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useConfig();
  const navigate = useNavigate();

  // If already logged in, go straight to admin
  React.useEffect(() => {
    if (isAuthenticated) navigate('/admin');
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid CMS password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">CMS Portal</h2>
          <p className="text-zinc-500 text-sm">Secure access for Lumina Noir admins</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-400">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className={`w-full p-3 bg-zinc-950 border ${error ? 'border-red-500' : 'border-zinc-800'} rounded-xl outline-none focus:ring-2 ring-indigo-500 transition-all text-white`}
              placeholder="Enter password..."
              autoFocus
            />
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </div>
          
          <Button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold">Authenticate</Button>
          
          <Link to="/" className="block text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            Return to Public Website
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
