import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_BASE = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('donuts_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('donuts_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      setUser(data);
      localStorage.setItem('donuts_user', JSON.stringify(data));
      return data;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, referredByCode = '') => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, referredByCode })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      setUser(data);
      localStorage.setItem('donuts_user', JSON.stringify(data));
      return data;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('donuts_user');
  };

  // Reload current user profile to update loyalty points, etc.
  const reloadProfile = async () => {
    if (!user || !user.token) return;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        // Update user state while maintaining token
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('donuts_user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error('Error reloading user profile:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, login, register, logout, reloadProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { API_BASE };
