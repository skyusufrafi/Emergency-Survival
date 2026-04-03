import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  adminLogin: (username: string, code: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('disaster_user');
    if (stored) setUser(JSON.parse(stored));
    setIsAdmin(localStorage.getItem('disaster_admin') === 'true');
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const users = JSON.parse(localStorage.getItem('disaster_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const u = { id: found.id, email: found.email, name: found.name };
      setUser(u);
      localStorage.setItem('disaster_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const users = JSON.parse(localStorage.getItem('disaster_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    const newUser = { id: crypto.randomUUID(), name, email, password };
    users.push(newUser);
    localStorage.setItem('disaster_users', JSON.stringify(users));
    const u = { id: newUser.id, email, name };
    setUser(u);
    localStorage.setItem('disaster_user', JSON.stringify(u));
    return true;
  };

  const adminLogin = (username: string, code: string) => {
    if (username === 'admin' && code === '2404') {
      setIsAdmin(true);
      localStorage.setItem('disaster_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('disaster_user');
    localStorage.removeItem('disaster_admin');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
