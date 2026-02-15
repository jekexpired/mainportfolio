
import React, { useState } from 'react';
import { useConfig } from '../ConfigContext';
import { Card, Button } from '../components/UI';

const SecurityManager: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword) {
      setMessage({ type: 'error', text: 'Password cannot be empty.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    updateConfig({
      security: {
        ...config.security,
        adminPassword: newPassword
      }
    });

    setMessage({ type: 'success', text: 'Password updated successfully. Use your new password for next login.' });
    setNewPassword('');
    setConfirmPassword('');
    
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-zinc-900 border-zinc-800">
        <h3 className="text-xl font-bold text-white mb-2">Access Control</h3>
        <p className="text-zinc-500 text-sm mb-8">Update your administrative credentials. Ensure you keep this password safe as it is the only way to access this CMS.</p>
        
        <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">New Admin Password</label>
            <input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:ring-1 ring-indigo-500"
              placeholder="Min 8 characters recommended"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Confirm New Password</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:ring-1 ring-indigo-500"
              placeholder="Repeat your new password"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest ${message.type === 'success' ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/50' : 'bg-red-950/30 text-red-400 border border-red-900/50'}`}>
              {message.text}
            </div>
          )}

          <Button type="submit" className="w-full py-4 bg-white text-black hover:bg-zinc-200">
            Update CMS Password
          </Button>
        </form>
      </Card>

      <Card className="bg-zinc-950 border-zinc-900">
        <h3 className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest">Security Recommendations</h3>
        <ul className="text-xs text-zinc-600 space-y-2 list-disc pl-4">
          <li>Use a combination of letters, numbers, and symbols.</li>
          <li>Avoid using easily guessable information like birthdays.</li>
          <li>Change your password every 90 days for better security.</li>
          <li>This password is stored locally in this browser's storage.</li>
        </ul>
      </Card>
    </div>
  );
};

export default SecurityManager;
