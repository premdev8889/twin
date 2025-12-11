import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Plus, Bell, LogOut, Settings, Sparkles } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full relative">
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

          {/* Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={avatarUrl}
              alt="profile"
              onClick={() => setIsOpen(!isOpen)}
              className="ml-1 size-9 rounded-full border border-white shadow-sm ring-1 ring-slate-200/60 dark:border-slate-800 cursor-pointer"
            />

            {/* Dropdown */}
            {isOpen && (
              <div
                className="
                  absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200/60
                  bg-white p-2 shadow-[0_8px_40px_-12px_rgba(59,130,246,0.25)]
                  dark:border-slate-700 dark:bg-slate-900/90 animate-fadeIn
                "
              >
                {/* Item */}
                <DropdownItem icon={<Sparkles size={16} />} label="Digital Twin Studio" />
                <DropdownItem icon={<Sparkles size={16} />} label="Twin 1" />
                <DropdownItem icon={<Sparkles size={16} />} label="Twin 2" />

                <div className="my-2 h-px bg-slate-100 dark:bg-slate-700/60" />

                <DropdownItem icon={<LogOut size={16} />} label="Logout" noBadge />
                <DropdownItem icon={<Settings size={16} />} label="Setting" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in-out;
          }
        `}
      </style>
    </header>
  );
}

function DropdownItem({
  icon,
  label,
  noBadge = false,
}: {
  icon: React.ReactNode;
  label: string;
  noBadge?: boolean;
}) {
  return (
    <div
      className="
        flex items-center justify-between rounded-xl px-3 py-2 text-[14px] mb-3
        text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800/60
        cursor-pointer transition
      "
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {!noBadge && (
        <span
          className="
            text-[11px] font-medium rounded-full bg-gradient-to-r from-purple-500 to-pink-500
            text-white px-2 py-[1px] shadow-sm
          "
        >
          ⚡ New
        </span>
      )}
    </div>
  );
}
