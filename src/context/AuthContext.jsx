import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = ({ email, role = 'user' }) => {
    const current = { id: 'u1', name: 'Glow User', email };
    setUser(current);
    setIsAdmin(role === 'admin');
  };

  const signup = ({ name, email }) => {
    const current = { id: 'u2', name, email };
    setUser(current);
    setIsAdmin(false);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const value = useMemo(
    () => ({ user, isAdmin, login, signup, logout }),
    [user, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
