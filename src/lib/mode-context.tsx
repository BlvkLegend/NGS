"use client";

import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";

export type Mode = "taxpayer" | "cruise";

type ModeContextValue = {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
};

const ModeContext = createContext<ModeContextValue | null>(null);

// Avoids the "useLayoutEffect does nothing on the server" warning during SSR
// while still running synchronously before paint on the client.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : () => {};

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("taxpayer");

  useIsomorphicLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("gcc-mode") as Mode | null;
      if (stored === "taxpayer" || stored === "cruise") {
        setModeState(stored);
        document.documentElement.classList.toggle("dark", stored === "cruise");
      }
    } catch {}
  }, []);

  function setMode(m: Mode) {
    setModeState(m);
    document.documentElement.classList.toggle("dark", m === "cruise");
    try {
      localStorage.setItem("gcc-mode", m);
    } catch {}
  }

  function toggle() {
    setMode(mode === "taxpayer" ? "cruise" : "taxpayer");
  }

  return <ModeContext.Provider value={{ mode, setMode, toggle }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
