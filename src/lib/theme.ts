type Mode = "light" | "dark";
const KEY = "theme";

export function setTheme(mode: Mode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  localStorage.setItem(KEY, mode);
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
}

export function getTheme(): Mode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
