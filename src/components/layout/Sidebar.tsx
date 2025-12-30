import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Bookmark,
  FolderClosed,
  MessageSquare,
  Settings,
  Handbag,
  Sparkles,
  X,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { avtarIcon } from "../../data/authorsData";

/* ---------- Types ---------- */
type Item = {
  id: string;
  label: string;
  icon: React.ReactNode;
  to?: string;
};

/* ---------- Data ---------- */
const mobileItems: Item[] = [
  { id: "FindTwin", label: "Find a Twin", icon: <Handbag size={18} />, to: "/FindTwin" },
  { id: "subscribe", label: "Subscribe Twins", icon: <Sparkles size={18} /> },
  { id: "search", label: "Search", icon: <Search size={18} />, to: "/search" },
  { id: "save", label: "Save Twins", icon: <Bookmark size={18} /> },
  { id: "folder", label: "Folder Wise", icon: <FolderClosed size={18} /> },
  { id: "chat", label: "Chat History", icon: <MessageSquare size={18} /> },
];

const subscriptionTwins = [
  {
    id: "blender",
    title: "Blender Creative Twin",
    avatar: "https://i.pravatar.cc/64?img=10",
  },
  { id: "codewrite", title: "Codewrite Twin", avatar: "https://i.pravatar.cc/64?img=65" },
  { id: "armory3d", title: "Armory3d Twin", avatar: "https://i.pravatar.cc/64?img=10" },
];

/* ---------- Small UI ---------- */
const IconWrap: React.FC<{ active?: boolean; children: React.ReactNode }> = ({
  active,
  children,
}) => (
  <div
    className={[
      "grid place-items-center size-10  transition",

      active ? "bg-gradient-to-tr from-blue-500 to-cyan-400 text-white" : "text-slate-600",
      "dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200",
    ].join(" ")}
  >
    {children}
  </div>
);

/* =======================================================
   DESKTOP SIDEBAR – SAME SIDEBAR EXPANDS ON HOVER
======================================================= */
export default function Sidebar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const topGroup = mobileItems.slice(0, 4);
  const bottomGroup = mobileItems.slice(4);

  const isActive = (it: Item) => (it.to ? pathname.startsWith(it.to) : it.id === "search");

  return (
    <>
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside
        onMouseEnter={() => window.innerWidth >= 640 && setOpen(true)}
        onMouseLeave={() => window.innerWidth >= 640 && setOpen(false)}
        className={`
          hidden sm:flex h-full
          ${open ? "w-[250px]" : "w-[72px]"}
          flex-col justify-between
          bg-white dark:bg-slate-900/70
          backdrop-blur
          transition-all duration-300 ease-in-out
          overflow-hidden
          p-3 pt-2
          relative z-20
        `}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center p-1 pt-0 ">
            <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white">
              ❄️
            </div>

            <span
              className={`
              text-[15px] font-semibold whitespace-nowrap
              transition-all duration-300
              ${open ? "opacity-100 max-w-[200px] ml-2" : "opacity-0 max-w-0"}
              overflow-hidden
            `}
            >
              
            </span>
          </div>

          {/* <div className="my-2 h-px bg-slate-200/70 dark:bg-slate-700/60" /> */}

          {/* Top menu */}
          <nav className="flex flex-col gap-2 py-2 bg-blue-50 rounded-2xl px-2 mb-2 mt-4">
            {topGroup.map((it) => {
              const active = isActive(it);
              return (
                <Link
                  key={it.id}
                  to={it.to || "#"}
                  className={[
                    "flex items-center rounded-xl",
                    active ? "ring-1 ring-blue-200" : "hover:bg-blue-100/40 dark:hover:bg-slate-800/40",
                  ].join(" ")}
                >
                  <IconWrap active={active}>{it.icon}</IconWrap>

                  <span
                    className={`
                    text-[15px] whitespace-nowrap
                    transition-all duration-300
                    overflow-hidden
                    ${open ? "opacity-100 max-w-[160px]" : "opacity-0 max-w-0"}
                  `}
                  >
                    {it.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom menu */}
          <div className="mt-2 bg-blue-50 rounded-2xl px-2 py-2 mb-2">
            {bottomGroup.map((it) => (
              <button
                key={it.id}
                className="w-full flex items-center  rounded-xl hover:bg-blue-100/40 dark:hover:bg-slate-800/40"
              >
                <IconWrap>{it.icon}</IconWrap>

                <span
                  className={`
                    text-[15px] whitespace-nowrap
                    transition-all duration-300
                    overflow-hidden
                    ${open ? "opacity-100 max-w-[160px]" : "opacity-0 max-w-0"}
                  `}
                >
                  {it.label}
                </span>
              </button>
            ))}
          </div>

          {/* Avatars */}
          {isLoggedIn && (
            <div className="mt-6 px-2">
              {avtarIcon.map((it) => (
                <div key={it.id} className="flex items-center gap-2 mb-4">
                  <img
                    src={it.avatarImg}
                    alt={it.name}
                    onClick={() => navigate(`/twins/${it.id}`)}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer hover:scale-110 transition"
                  />

                  <span
                    className={`
                    text-sm whitespace-nowrap
                    transition-all duration-300
                    overflow-hidden
                    ${open ? "opacity-100 max-w-[160px]" : "opacity-0 max-w-0"}
                  `}
                  >
                    {it.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <button className="flex items-center px-2 bg-blue-50 rounded-2xl hover:bg-blue-100/40 dark:hover:bg-slate-800/40">
          <IconWrap>
            <Settings size={18} />
          </IconWrap>

          <span
            className={`
            text-[15px] whitespace-nowrap
            transition-all duration-300
            overflow-hidden
            ${open ? "opacity-100 max-w-[120px] " : "opacity-0 max-w-0 "}
          `}
          >
            Setting
          </span>
        </button>
      </aside>

      {/* ===================================================
         MOBILE MENU – EXACT SAME AS TUMHARA (NO CHANGE)
      =================================================== */}
    </>
  );
}

/* ---------- Mobile Sidebar Modal (UNCHANGED) ---------- */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const { pathname } = useLocation();
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
      className="fixed inset-0 z-[60] sm:hidden bg-black/40 backdrop-blur-[2px]"
    >
      <div
        ref={cardRef}
        className="
          absolute left-0 top-0 bottom-0 w-[86%] max-w-[360px]
          bg-slate-100 dark:bg-slate-900/80
          border border-white/40 shadow-2xl p-3 animate-slideIn
          overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow ring-1 ring-inset ring-white/40">
              ❄️
            </div>
            <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">
              Automation AI
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cards: top group */}
        <div className="mt-3 space-y-3">
          <div className="space-y-2 bg-white rounded-[22px]">
            {mobileItems.slice(0, 4).map((it) => {
              const active = it.to ? pathname.startsWith(it.to) : it.id === "search";
              if (it.to) {
                return (
                  <Link
                    key={it.id}
                    to={it.to}
                    className={[
                      "flex items-center justify-between w-[100%] rounded-[18px] px-4 py-3",
                      "bg-white",
                      "dark:bg-slate-900",
                      active ? "ring-1 ring-blue-200" : "",
                    ].join(" ")}
                  >
                    <span className={["flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200", active
                            ? "bg-gradient-to-tr from-blue-500 to-cyan-400 text-white"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                        ].join(" ")}>
                      <span className="grid place-items-center size-9 rounded-xl">{it.icon}</span>
                      {it.label}
                    </span>
                    {active ? (
                      <span className="h-8 min-w-[120px] rounded-[14px] bg-gradient-to-tr from-blue-500 to-cyan-400 text-white grid place-items-center text-sm shadow-[0_10px_30px_rgba(59,130,246,.35)]">
                        {it.label}
                      </span>
                    ) : (
                      <ChevronRight size={18} className="text-slate-300" />
                    )}
                  </Link>
                );
              }

              return (
                <button
                  key={it.id}
                  className="flex items-center justify-between w-[100%] rounded-[18px] px-4 py-3 bg-white dark:bg-slate-900"
                >
                  <span className="flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200">
                    <span className="grid place-items-center size-9 rounded-xl">{it.icon}</span>
                    {it.label}
                  </span>
                  <ChevronRight size={18} className="text-slate-300" />
                </button>
              );
            })}
          </div>

          {/* Bottom group */}
          <div className="space-y-2 bg-white rounded-[22px]">
            {mobileItems.slice(4).map((it) => {
              if (it.to) {
                return (
                  <Link
                    key={it.id}
                    to={it.to}
                    className="flex items-center justify-between w-[100%] px-4 py-3 dark:bg-slate-900"
                  >
                    <span className="flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200">
                      <span className="grid place-items-center size-9 rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {it.icon}
                      </span>
                      {it.label}
                    </span>
                    <ChevronRight size={18} className="text-slate-300" />
                  </Link>
                );
              }

              return (
                <button
                  key={it.id}
                  className="flex items-center justify-between w-[100%] px-4 py-3 dark:bg-slate-900"
                >
                  <span className="flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200">
                    <span className="grid place-items-center size-9 rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {it.icon}
                    </span>
                    {it.label}
                  </span>
                  <ChevronRight size={18} className="text-slate-300" />
                </button>
              );
            })}
          </div>

          {/* Subscription Twins */}
          <div className="pt-1">
            <p className="px-1 pb-2 text-[14px] text-slate-500 dark:text-slate-400">
              Subscription Twins
            </p>
            <div className="space-y-2">
              {subscriptionTwins.map((tw) => (
                <button
                  key={tw.id}
                  className="w-full flex items-center justify-between rounded-[10px] px-3 py-3 bg-white border border-white/60 shadow-sm dark:bg-slate-900 dark:border-slate-800"
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <img
                      src={tw.avatar}
                      alt=""
                      className="size-8 rounded-full ring-1 ring-slate-200 dark:ring-slate-700 bg-white object-contain"
                    />
                    <span className="text-[14px] text-slate-700 dark:text-slate-200 truncate">
                      {tw.title}
                    </span>
                  </span>
                  <span className="text-[11px] px-2 py-[3px] rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    12.2k
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* animation keyframes */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-8px); opacity: .98; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn .18s ease-out; }
      `}</style>
    </div>
  );
}
