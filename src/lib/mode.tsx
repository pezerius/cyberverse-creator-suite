import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AppMode = "play" | "create";
const KEY = "pxs.mode";

type Ctx = { mode: AppMode; setMode: (m: AppMode) => void; toggle: () => void };
const ModeCtx = createContext<Ctx | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode>("play");
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "play" || v === "create") setModeState(v);
    } catch {}
  }, []);
  const setMode = (m: AppMode) => {
    setModeState(m);
    try { localStorage.setItem(KEY, m); } catch {}
  };
  return (
    <ModeCtx.Provider value={{ mode, setMode, toggle: () => setMode(mode === "play" ? "create" : "play") }}>
      {children}
    </ModeCtx.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeCtx);
  if (!ctx) return { mode: "play" as AppMode, setMode: () => {}, toggle: () => {} };
  return ctx;
}
