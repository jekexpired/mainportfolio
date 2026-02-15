
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AppConfig } from './types';
import { INITIAL_CONFIG } from './constants';
import { loadConfig, saveConfig } from './utils';

interface ConfigContextType {
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => void;
  resetConfig: () => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const AUTH_KEY = 'admin_auth_token';

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(() => loadConfig(INITIAL_CONFIG));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const updateConfig = useCallback((updatedParts: Partial<AppConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...updatedParts };
      saveConfig(next);
      return next;
    });
  }, []);

  const resetConfig = useCallback(() => {
    saveConfig(INITIAL_CONFIG);
    setConfig(INITIAL_CONFIG);
  }, []);

  const login = (password: string) => {
    if (password === config.security.adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig, isAuthenticated, login, logout }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error("useConfig must be used within ConfigProvider");
  return context;
};
