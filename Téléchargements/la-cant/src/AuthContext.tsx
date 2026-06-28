import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
const CHECK_INTERVAL_MS = 30_000; // Vérifier toutes les 30s

const LAST_ACTIVITY_KEY = "admin_last_activity";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin_auth") === "true";
  });
  const lastActivityRef = useRef<number>(Date.now());

  // Restaurer lastActivity depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem(LAST_ACTIVITY_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) {
        lastActivityRef.current = parsed;
      }
    }
  }, []);

  // Mettre à jour le timestamp d'activité
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    localStorage.setItem(LAST_ACTIVITY_KEY, String(lastActivityRef.current));
  }, []);

  // Timer de vérification d'inactivité
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkInactivity = () => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= INACTIVITY_TIMEOUT_MS) {
        setIsAuthenticated(false);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
      }
    };

    const intervalId = setInterval(checkInactivity, CHECK_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  // Écouter les événements d'activité utilisateur
  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ["mousedown", "keydown", "mousemove", "scroll", "touchstart", "click"];
    const handleActivity = () => updateActivity();

    events.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));
    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [isAuthenticated, updateActivity]);

  useEffect(() => {
    localStorage.setItem("admin_auth", isAuthenticated ? "true" : "false");
    if (!isAuthenticated) {
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    }
  }, [isAuthenticated]);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      updateActivity();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
