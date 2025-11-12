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
    // mock: aceptar cualquier email/password no vacío
    if (!email || !password) throw new Error('Email y contraseña son requeridos');
    // simular llamada async
    await new Promise((r) => setTimeout(r, 400));
    const fakeUser = { id: Date.now(), name: email.split('@')[0], email };
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
