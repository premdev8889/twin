import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5
                 bg-white/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700
                 hover:bg-white dark:hover:bg-slate-800 transition"
      title="Toggle theme"
    >
      <span aria-hidden>{theme === "dark" ? "🌞" : "🌙"}</span>
      <span className="text-sm capitalize">{theme} mode</span>
    </button>
  );
}
