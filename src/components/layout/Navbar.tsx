// (optional) npm i lucide-react
import { Sun, Moon, Plus, Bell } from "lucide-react";

type Props = {
  onToggleTheme?: () => void;
  theme?: "light" | "dark";
  title?: string;
  avatarUrl?: string;
};

export default function Navbar({
  onToggleTheme,
  theme = "light",
  title = "Automation",
  avatarUrl = "https://i.pravatar.cc/64?img=12",
}: Props) {
  return (
    <header className="w-full">
      <div
        className="
          mx-auto flex items-center justify-between gap-3
          border border-slate-200/70 bg-white
          px-4 sm:px-6 py-3
          shadow-[0_10px_40px_-20px_rgba(59,130,246,0.25)]
          backdrop-blur supports-[backdrop-filter]:bg-white/60
          dark:border-slate-700/60 dark:bg-slate-900/60
        "
      >
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <h1 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </h1>
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:inline-block">
            Mode
          </span>

          {/* Light */}
          <button
            onClick={onToggleTheme}
            className={`
              inline-flex size-9 items-center justify-center rounded-full
              border bg-white/90 text-slate-700 transition
              hover:bg-blue-200/60 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200
              ${theme === "light" ? "ring-2 ring-blue-200/60 bg-blue-200/60" : ""}
            `}
            title="Light"
          >
            <Sun size={16} />
          </button>

          {/* Dark */}
          <button
            onClick={onToggleTheme}
            className={`
              inline-flex size-9 items-center justify-center rounded-full
              border bg-white/90 text-slate-700 transition
              hover:bg-white dark:border-slate-700 dark:bg-slate-600/70 dark:text-slate-200
              ${theme === "dark" ? "ring-2 ring-blue-200/60" : ""}
            `}
            title="Dark"
          >
            <Moon size={16} />
          </button>

          {/* Plus */}
          <button
            className="ml-1 inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-blue-200/60 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
            title="New"
          >
            <Plus size={16} />
          </button>

          {/* Bell */}
          <button
            className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-blue-200/60 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
            title="Notifications"
          >
            <Bell size={16} />
          </button>

          {/* Avatar */}
          <img
            src={avatarUrl}
            alt="profile"
            className="ml-1 size-9 rounded-full border border-white shadow-sm ring-1 ring-slate-200/60 dark:border-slate-800"
          />
        </div>
      </div>
    </header>
  );
}
