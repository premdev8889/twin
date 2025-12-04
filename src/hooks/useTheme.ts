import { useEffect, useState } from "react";

type Mode = "light" | "dark";
const KEY = "theme";

export function useTheme() {
  const getInitial = (): Mode => {
    const saved = localStorage.getItem(KEY) as Mode | null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState<Mode>(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return { theme, setTheme, toggle: () => setTheme(t => (t === "dark" ? "light" : "dark")) };
}
