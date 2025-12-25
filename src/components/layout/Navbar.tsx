import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Plus, Bell, LogOut, Settings, Sparkles, Menu, X, User2 } from "lucide-react";
import LoginModal from "../sections/login/LoginModal";

type Props = {
  onToggleTheme?: () => void;
  onOpenSidebar?: () => void; // new: logo -> sidebar drawer
  theme?: "light" | "dark";
  title?: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({
  onToggleTheme,
  onOpenSidebar,
  theme = "light",
  title = "Automation",
  avatarUrl = "https://i.pravatar.cc/120?img=12",
  isLoggedIn,
  setIsLoggedIn,
}: Props) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // keep toggle menu
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close avatar dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile modal on ESC + lock body scroll when open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMobileMenuOpen(false);
    document.addEventListener("keydown", onKey);

    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  const DEFAULT_AVATAR = "/assets/default-avatar.png";

  return (
    <header className="w-full relative">
      <div
        className="
          mx-auto flex items-center justify-between gap-3
           bg-white
          pr-4 sm:pr-6 py-3
          backdrop-blur supports-[backdrop-filter]:bg-white/60
          dark:border-slate-700/60 dark:bg-slate-900/60
        "
      >
        {/* Left: Logo (mobile) + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="sm:hidden grid size-9 place-items-center rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow ring-1 ring-inset ring-white/40"
            aria-label="Open sidebar"
          >
            ❄️
          </button>
          <h1 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">{title}</h1>
        </div>

        {/* Right: keep the TOGGLE button (mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="sm:hidden inline-flex items-center justify-center rounded-full border border-slate-300 p-2 text-slate-700 dark:text-slate-200"
          aria-label="Open quick menu"
        >
          <Menu size={18} />
        </button>

        {/* Desktop controls */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-2">
          <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:inline-block">
            Mode
          </span>

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

          <button
            className="ml-1 inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-blue-200/60 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
            title="New"
          >
            <Plus size={16} />
          </button>

          <button
            className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-blue-200/60 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
            title="Notifications"
          >
            <Bell size={16} />
          </button>

          {/* Avatar + dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={isLoggedIn ? avatarUrl : DEFAULT_AVATAR}
              alt="profile"
              onClick={(e) => {
                e.stopPropagation(); // outside click se bachane ke liye
                setIsAvatarOpen((prev) => !prev); // ✅ hamesha dropdown toggle
              }}
              className="ml-1 size-9 rounded-full border border-white shadow-sm ring-1 ring-slate-200/60 dark:border-slate-800 cursor-pointer"
            />

            {isAvatarOpen && (
              <div
                className="
                  absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200/60
                  bg-white p-2 shadow-[0_8px_40px_-12px_rgba(59,130,246,0.25)]
                  dark:border-slate-700 dark:bg-slate-900/90
                "
              >
                <DropdownItem icon={<Sparkles size={16} />} label="Digital Twin Studio" />
                <DropdownItem icon={<Sparkles size={16} />} label="Twin 1" />
                <DropdownItem icon={<Sparkles size={16} />} label="Twin 2" />

                {!isLoggedIn ? (
                  <DropdownItem
                    icon={<User2 size={16} />}
                    label="Login"
                    noBadge
                    onClick={() => {
                      setIsAvatarOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                  />
                ) : (
                  <DropdownItem
                    icon={<LogOut size={16} />}
                    label="Logout"
                    noBadge
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsAvatarOpen(false);
                    }}
                  />
                )}

                <DropdownItem icon={<Settings size={16} />} label="Setting" />
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => {
            setIsLoggedIn(true);
            setIsLoginModalOpen(false);
          }}
        />
      )}
      {/* Mobile quick actions modal (TOGGLE button) */}
      {isMobileMenuOpen && (
        <MobileMenuModal
          onClose={() => setIsMobileMenuOpen(false)}
          onToggleTheme={onToggleTheme}
          theme={theme}
          avatarUrl={avatarUrl}
          title={title}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-in-out; }

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modalIn { animation: modalIn 0.18s ease-out; }
      `}</style>
    </header>
  );
}

function DropdownItem({
  icon,
  label,
  noBadge = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  noBadge?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px] mb-3 text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800/60 cursor-pointer transition"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {!noBadge && (
        <span className="text-[11px] font-medium rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-[1px] shadow-sm">
          ⚡ New
        </span>
      )}
    </div>
  );
}

/** ---------- Navbar's mobile quick menu modal ---------- */
function MobileMenuModal({
  onClose,
  onToggleTheme,
  theme,
  avatarUrl,
  title,
  isLoggedIn,
  setIsLoggedIn,
  setIsLoginModalOpen,
}: {
  onClose: () => void;
  onToggleTheme?: () => void;
  theme?: "light" | "dark";
  avatarUrl?: string;
  title?: string;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] sm:hidden flex items-start justify-end bg-slate-950/50 backdrop-blur-sm dark:bg-slate-950/60"
    >
      <div
        ref={cardRef}
        className="w-[90%] h-[100vh] max-w-md border border-slate-200/60 bg-white p-4 shadow-2xl animate-modalIn dark:border-slate-700 dark:bg-slate-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt="me"
              className="size-11 rounded-full ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Quick actions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mode Switch */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={onToggleTheme}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition dark:border-slate-700 ${
              theme === "light"
                ? "bg-blue-50 border-blue-200 dark:bg-slate-800"
                : "bg-white dark:bg-slate-900"
            }`}
          >
            <Sun size={16} /> Light
          </button>
          <button
            onClick={onToggleTheme}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition dark:border-slate-700 ${
              theme === "dark"
                ? "bg-blue-50 border-blue-200 dark:bg-slate-800"
                : "bg-white dark:bg-slate-900"
            }`}
          >
            <Moon size={16} /> Dark
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <QuickBtn icon={<Plus size={16} />} label="New" />
          <QuickBtn icon={<Bell size={16} />} label="Alerts" />
          <QuickBtn icon={<Settings size={16} />} label="Settings" />
        </div>

        {/* Links */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-2">
          <ModalItem icon={<Sparkles size={16} />} label="Digital Twin Studio" badge="New" />
          <ModalItem icon={<Sparkles size={16} />} label="Twin 1" />
          <ModalItem icon={<Sparkles size={16} />} label="Twin 2" />
          <div className="my-2 h-px bg-slate-100 dark:bg-slate-700/60" />
          <ModalItem icon={<User2 size={16} />} label="Profile" />
          {!isLoggedIn ? (
            <ModalItem
              icon={<User2 size={16} />}
              label="Login"
              onClick={() => {
                onClose();
                setIsLoginModalOpen(true);
              }}
            />
          ) : (
            <ModalItem
              icon={<LogOut size={16} />}
              label="Logout"
              onClick={() => {
                setIsLoggedIn(false);
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function QuickBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 p-3 text-xs text-slate-700 hover:bg-blue-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/60 transition">
      <div className="inline-flex items-center justify-center rounded-lg p-2 ring-1 ring-slate-200 dark:ring-slate-700">
        {icon}
      </div>
      {label}
    </button>
  );
}

function ModalItem({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800/60 transition"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      {badge && (
        <span className="text-[10px] rounded-full bg-blue-600/90 text-white px-2 py-[2px]">
          {badge}
        </span>
      )}
    </button>
  );
}
