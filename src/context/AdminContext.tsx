import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { artworks as staticArtworks } from '../data/artworks';
import type { Artwork } from '../data/artworks';

const ADMIN_ID   = 'rashi_art';
const ADMIN_PASS = 'Rashi@2025';
const LS_ARTWORKS = 'rw_custom_artworks';
const LS_DELETED  = 'rw_deleted_ids';

interface AdminCtx {
  isAdmin: boolean;
  login: (id: string, pass: string) => boolean;
  logout: () => void;
  allArtworks: Artwork[];
  addArtwork: (data: Omit<Artwork, 'id'>) => void;
  deleteArtwork: (id: string) => void;
}

const Ctx = createContext<AdminCtx | null>(null);

function loadJson<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback; }
  catch { return fallback; }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin,  setIsAdmin]  = useState(false);
  const [custom,   setCustom]   = useState<Artwork[]>(() => loadJson(LS_ARTWORKS, []));
  const [deleted,  setDeleted]  = useState<string[]>(() => loadJson(LS_DELETED,  []));

  const allArtworks: Artwork[] = [
    ...staticArtworks.filter(a => !deleted.includes(a.id)),
    ...custom,
  ];

  const login = useCallback((id: string, pass: string) => {
    if (id === ADMIN_ID && pass === ADMIN_PASS) { setIsAdmin(true); return true; }
    return false;
  }, []);

  const logout = useCallback(() => setIsAdmin(false), []);

  const addArtwork = useCallback((data: Omit<Artwork, 'id'>) => {
    const art: Artwork = { ...data, id: `cust_${Date.now()}` };
    setCustom(prev => {
      const next = [...prev, art];
      localStorage.setItem(LS_ARTWORKS, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteArtwork = useCallback((id: string) => {
    if (staticArtworks.some(a => a.id === id)) {
      setDeleted(prev => {
        const next = [...prev, id];
        localStorage.setItem(LS_DELETED, JSON.stringify(next));
        return next;
      });
    } else {
      setCustom(prev => {
        const next = prev.filter(a => a.id !== id);
        localStorage.setItem(LS_ARTWORKS, JSON.stringify(next));
        return next;
      });
    }
  }, []);

  return (
    <Ctx.Provider value={{ isAdmin, login, logout, allArtworks, addArtwork, deleteArtwork }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAdmin(): AdminCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAdmin must be inside AdminProvider');
  return ctx;
}
