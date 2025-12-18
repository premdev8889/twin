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
  ChevronLeft,
} from "lucide-react";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import { avtarIcon } from "../../data/authorsData";

/* ---------- Types ---------- */
type Item = {
  id: string;
  label: string;
  icon: React.ReactNode;
  to?: string;
};

/* ---------- Data (exported) ---------- */
export const mobileItems: Item[] = [
  { id: "marketplace", label: "Marketplace", icon: <Handbag size={18} />, to: "/marketplace" },
  { id: "subscribe", label: "Subscribe Twins", icon: <Sparkles size={18} /> },
  { id: "search", label: "Search", icon: <Search size={18} />, to: "/search" },
  { id: "save", label: "Save Twins", icon: <Bookmark size={18} /> },
  { id: "folder", label: "Folder Wise", icon: <FolderClosed size={18} /> },
  { id: "chat", label: "Chat History", icon: <MessageSquare size={18} /> },
];

export const subscriptionTwins = [
  {
    id: "blender",
    title: "Blender Creative Twin",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg",
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
      "grid place-items-center size-10 rounded-2xl border transition",
      "border-slate-200/70 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
      "hover:bg-white",
      active
        ? "bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-[0_10px_30px_rgba(59,130,246,.35)]"
        : "text-slate-600",
      "dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200",
    ].join(" ")}
  >
    {children}
  </div>
);

/* =======================================================
   Desktop Sidebar: fixed rail + overlay drawer (best of both)
   ======================================================= */
export default function Sidebar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const topGroup = mobileItems.slice(0, 4);
  const bottomGroup = mobileItems.slice(4);
  const isActive = (it: Item) => (it.to ? pathname.startsWith(it.to) : it.id === "search");

  // Close on click outside of drawer
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <>
      {/* --- Collapsed rail (unchanged design) --- */}
      <aside
        className="
          hidden sm:flex h-full w-[72px] flex-col items-center justify-between
          bg-white/80 p-3 backdrop-blur dark:bg-slate-900/70
          relative z-40
        "
        aria-label="Sidebar"
      >
        <div className="flex flex-col items-center gap-3">
          {/* Logo -> open drawer */}
          <button
            onClick={() => setOpen(true)}
            className="outline-none"
            aria-label="Open sidebar"
            type="button"
          >
            <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-[0_10px_30px_rgba(59,130,246,.35)] ring-1 ring-inset ring-white/40">
              ❄️
            </div>
          </button>

          <div className="my-2 h-px w-8 bg-slate-200/70 dark:bg-slate-700/60" />

          <nav className="flex flex-col items-center gap-2 rounded-2xl bg-blue-100/40 p-2 dark:bg-slate-800/40">
            {topGroup.map((it) => (
              <Link key={it.id} to={it.to || "#"} className="outline-none">
                <IconWrap active={isActive(it)}>{it.icon}</IconWrap>
              </Link>
            ))}
          </nav>

          <div className="mt-2 w-full rounded-2xl bg-blue-100/40 p-2 dark:bg-slate-800/40">
            <div className="flex flex-col items-center gap-2">
              {bottomGroup.map((it) => (
                <button key={it.id} className="outline-none" type="button">
                  <IconWrap>{it.icon}</IconWrap>
                </button>
              ))}
            </div>
          </div>
          {isLoggedIn && (
          <div className="mt-2 w-full rounded-2xl p-2 dark:bg-slate-800/40">
            <div className="flex flex-col items-center gap-2">
              {avtarIcon.map((it) => (
                <img
                  key={it.id}
                  src={it.avatarImg}
                  alt={it.name}
                  onClick={() => navigate(`/twins/${it.id}`)}
                  className="w-[30px] h-[30px] object-cover rounded-full mb-3 cursor-pointer hover:scale-110 transition"
                />
              ))}
            </div>
          </div>
          )}
        </div>

        <button className="outline-none" type="button">
          <IconWrap>
            <Settings size={18} />
          </IconWrap>
        </button>
      </aside>

      {/* --- Overlay drawer (expanded design like screenshot) --- */}
      {open && (
        <>
          {/* light backdrop just to catch clicks; not darken entire page */}
          <div className="fixed inset-0 z-[48] sm:block hidden bg-transparent" />

          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            className="
              fixed left-[0px] top-0 bottom-0 z-[49]
              w-[300px] max-w-[88vw]
              bg-white/85 dark:bg-slate-900/80 backdrop-blur
              border-r border-white/60 dark:border-slate-800
              shadow-[0_20px_60px_rgba(0,0,0,.12)]
              p-3
              animate-slideIn
              overflow-y-auto
              no-scrollbar
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
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-slate-500 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-800"
                  aria-label="Collapse"
                  type="button"
                  title="Collapse"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-slate-500 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-800"
                  aria-label="Close"
                  type="button"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body: same cards UI as screenshot */}
            <div className="mt-3 space-y-3 pr-1">
              {/* group 1 */}
              <div className=" rounded-[22px] bg-slate-50 dark:bg-slate-900 border border-white/50 dark:border-slate-800 ">
                {topGroup.map((it) => {
                  const Card: any = it.to ? Link : "button";
                  const active = isActive(it);
                  return (
                    <Card
                      key={it.id}
                      to={it.to}
                      className={[
                        "flex items-center justify-between w-full rounded-[18px] px-4 py-2 m-0",

                        active ? "ring-1 ring-blue-200" : "",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200">
                        <span
                          className={[
                            "grid place-items-center size-9 rounded-xl",
                            active
                              ? "bg-gradient-to-tr from-blue-500 to-cyan-400 text-white"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                          ].join(" ")}
                        >
                          {it.icon}
                        </span>
                        {it.label}
                      </span>
                      {active ? (
                        <span className="h-8 min-w-[120px] rounded-[14px] bg-gradient-to-tr from-blue-500 to-cyan-400 text-white grid place-items-center text-sm shadow-[0_10px_30px_rgba(59,130,246,.35)]">
                          {it.label}
                        </span>
                      ) : (
                        <ChevronRight size={18} className="text-slate-300" />
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* group 2 */}
              <div className="space-y-2 rounded-[22px] bg-slate-50 dark:bg-slate-900 border border-white/50 dark:border-slate-800 ">
                {bottomGroup.map((it) => {
                  const Card: any = it.to ? Link : "button";
                  return (
                    <Card
                      key={it.id}
                      to={it.to}
                      className="flex items-center justify-between w-full px-4 py-2 rounded-[18px] "
                    >
                      <span className="flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200">
                        <span className="grid place-items-center size-9 rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {it.icon}
                        </span>
                        {it.label}
                      </span>
                      <ChevronRight size={18} className="text-slate-300" />
                    </Card>
                  );
                })}
              </div>

              {/* subscription list */}
              <div className="pt-1">
                <p className="px-1 pb-2 text-[14px] text-slate-500 dark:text-slate-400">
                  Subscription Twins
                </p>
                <div className="">
                  {subscriptionTwins.map((tw) => (
                    <button
                      key={tw.id}
                      className="w-full flex items-center justify-between rounded-[10px] px-3 py-2 bg-white "
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

              {/* bottom setting row in drawer */}
              <div className="pt-2 pb-3">
                <button
                  className="w-full flex items-center gap-3 rounded-[14px] px-3 py-2 bg-white border border-white/60  dark:bg-slate-900 dark:border-slate-800"
                  type="button"
                >
                  <span className="grid place-items-center size-9 rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Settings size={18} />
                  </span>
                  <span className="text-[15px] text-slate-700 dark:text-slate-200">Setting</span>
                </button>
              </div>
            </div>
          </div>

          {/* Drawer slide animation */}
          <style>{`
            @keyframes slideIn { from { transform: translateX(-8px); opacity: 0.98; } to { transform: translateX(0); opacity: 1; } }
            .animate-slideIn { animation: slideIn .18s ease-out; }
          `}</style>
        </>
      )}
    </>
  );
}

/* ---------- Mobile Sidebar Modal (export) ---------- */
export function MobileMenu({
  onClose,
  items,
  pathname,
}: {
  onClose: () => void;
  items: Item[];
  twins: { id: string; title: string; avatar: string }[];
  pathname: string;
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
            {items.slice(0, 4).map((it) => {
              const active = it.to ? pathname.startsWith(it.to) : it.id === "search";
              const Card: any = it.to ? Link : "button";
              return (
                <Card
                  key={it.id}
                  to={it.to}
                  className={[
                    "flex items-center justify-between w-[100%] rounded-[18px] px-4 py-3",
                    "bg-white",
                    "dark:bg-slate-900",
                    active ? "ring-1 ring-blue-200" : "",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200">
                    <span
                      className={[
                        "grid place-items-center size-9 rounded-xl",
                        active
                          ? "bg-gradient-to-tr from-blue-500 to-cyan-400 text-white"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                      ].join(" ")}
                    >
                      {it.icon}
                    </span>
                    {it.label}
                  </span>
                  {active ? (
                    <span className="h-8 min-w-[120px] rounded-[14px] bg-gradient-to-tr from-blue-500 to-cyan-400 text-white grid place-items-center text-sm shadow-[0_10px_30px_rgba(59,130,246,.35)]">
                      {it.label}
                    </span>
                  ) : (
                    <ChevronRight size={18} className="text-slate-300" />
                  )}
                </Card>
              );
            })}
          </div>

          {/* Bottom group */}
          <div className="space-y-2 bg-white rounded-[22px]">
            {items.slice(4).map((it) => {
              const Card: any = it.to ? Link : "button";
              return (
                <Card
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
                </Card>
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
