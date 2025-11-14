import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('auth_user', JSON.stringify(user));
      else localStorage.removeItem('auth_user');
    } catch (e) {}
  }, [user]);

  const login = async ({ email, password }) => {
    // Para demo: credenciales fijas
    const DEMO_EMAIL = 'demo@loislive.test';
    const DEMO_PASSWORD = 'Demo1234!';
    if (!email || !password) throw new Error('Email y contraseña son requeridos');
    // validar credenciales
    await new Promise((r) => setTimeout(r, 300));
    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      throw new Error('Credenciales inválidas. Usa la cuenta de demo.');
    }
    const fakeUser = { id: 1, name: 'demo', email: DEMO_EMAIL };
    setUser(fakeUser);
    return fakeUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
