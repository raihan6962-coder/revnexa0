'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { PGlite } from '@electric-sql/pglite';
import { getDb } from '@/lib/db';

interface DbContextValue {
  db: PGlite | null;
  ready: boolean;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const DbContext = createContext<DbContextValue>({
  db: null,
  ready: false,
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

const ADMIN_PASSWORD = '2808';
const SESSION_KEY = 'revnexa_admin_session';

export function DbProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<PGlite | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getDb().then((d) => {
      setDb(d);
      setReady(true);
    });

    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === 'true') setIsAdmin(true);
  }, []);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  return (
    <DbContext.Provider value={{ db, ready, isAdmin, login, logout }}>
      {children}
    </DbContext.Provider>
  );
}

export function useDb() {
  return useContext(DbContext);
}
