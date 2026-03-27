import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginRequest, signup as signupRequest } from '../services/api';

const AuthContext = createContext(null);

const USER_KEY = 'glowvitra_user';
const TOKEN_KEY = 'glowvitra_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return false;
    return JSON.parse(raw).role === 'Admin';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setIsAdmin(user.role === 'Admin');
    }
  }, [user]);

  const login = async ({ email, password }) => {
    const response = await loginRequest({ email, password });
    const current = { name: response.name, email: response.email, role: response.role };
    localStorage.setItem(TOKEN_KEY, response.token);
    setUser(current);
    return current;
  };

  const signup = async ({ name, email, password }) => {
    const response = await signupRequest({ name, email, password, role: 'Customer' });
    const current = { name: response.name, email: response.email, role: response.role };
    localStorage.setItem(TOKEN_KEY, response.token);
    setUser(current);
    return current;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = useMemo(() => ({ user, isAdmin, login, signup, logout }), [user, isAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
