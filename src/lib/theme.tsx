import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "night" | "auto";
export type Density = "comfortable" | "compact";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  density: Density;
  setDensity: (d: Density) => void;
  resolved: "light" | "night";
};

const ThemeCtx = createContext<Ctx | null>(null);

function systemPref(): "light" | "night" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "light";
}

function apply(theme: Theme, density: Density) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = theme === "auto" ? systemPref() : theme;
  root.classList.toggle("dark", resolved === "night");
  root.dataset.theme = resolved;
  root.dataset.density = density;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [density, setDensityState] = useState<Density>("comfortable");

  // Load persisted
  useEffect(() => {
    const t = (localStorage.getItem("pxs-theme") as Theme | null) ?? "light";
    const d = (localStorage.getItem("pxs-density") as Density | null) ?? "comfortable";
    setThemeState(t);
    setDensityState(d);
    apply(t, d);
  }, []);

  // React to OS changes when in auto
  useEffect(() => {
    if (theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => apply("auto", density);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, density]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("pxs-theme", t);
    apply(t, density);
  };
  const setDensity = (d: Density) => {
    setDensityState(d);
    localStorage.setItem("pxs-density", d);
    apply(theme, d);
  };

  const resolved: "light" | "night" = theme === "auto" ? systemPref() : theme;

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, density, setDensity, resolved }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
