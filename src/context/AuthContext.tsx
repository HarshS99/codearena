import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  rating: number;
  rank: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5001/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchCurrentUser(savedToken);
    }
  }, []);

  const fetchCurrentUser = async (authToken: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser({
          id: data._id,
          username: data.name,
          email: data.email,
          rating: data.rating || 1200,
          rank: 9999
        });
      } else {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setUser({
          id: data.user.id,
          username: data.user.name,
          email: data.user.email,
          rating: data.user.rating || 1200,
          rank: 9999
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const signup = useCallback(async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password })
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setUser({
          id: data.user.id,
          username: data.user.name,
          email: data.user.email,
          rating: data.user.rating || 1200,
          rank: 9999
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}