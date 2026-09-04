import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthResponse } from '../types/flood';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<UserProfile>;
  register: (data: any) => Promise<UserProfile>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('floodsafe_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('floodsafe_token');
  });

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('floodsafe_user', JSON.stringify(user));
      localStorage.setItem('floodsafe_token', token);
    } else {
      localStorage.removeItem('floodsafe_user');
      localStorage.removeItem('floodsafe_token');
    }
  }, [user, token]);

  const login = async (email: string, password: string): Promise<UserProfile> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data: Partial<AuthResponse> = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || `Login failed (Status: ${res.status}). Ensure backend server is running.`);
      }

      if (!data.user || !data.token) {
        throw new Error('Invalid response structure from authentication server.');
      }

      setUser(data.user);
      setToken(data.token);
      return data.user;
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')) {
        throw new Error('Unable to connect to the backend server. Please verify your internet connection or backend server status.');
      }
      throw err;
    }
  };

  const register = async (userData: any): Promise<UserProfile> => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data: Partial<AuthResponse> = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || `Registration failed (Status: ${res.status}). Ensure backend server is running.`);
      }

      if (!data.user) {
        throw new Error('Invalid response structure from authentication server.');
      }

      return data.user;
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')) {
        throw new Error('Unable to connect to the backend server. Please verify your internet connection or backend server status.');
      }
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('floodsafe_user');
    localStorage.removeItem('floodsafe_token');
  };

  const isAuthenticated = Boolean(user && token);
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
