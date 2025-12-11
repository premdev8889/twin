import React from "react";
import {
  Home, Search, Bookmark, FolderClosed, MessageSquare, Settings,
    Handbag, 
   Sparkles} from "lucide-react"; // optional; emojis fallback below
import { Link, useLocation } from "react-router-dom";

type Item = {
  id: string;
  icon?: React.ReactNode;
  emoji?: string;
  active?: boolean;
};

const IconWrap: React.FC<{ active?: boolean; children: React.ReactNode }> = ({ active, children }) => (
  <div
    className={[
      "grid place-items-center size-10 rounded-2xl border transition",
      "border-slate-200/70 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
      "hover:bg-white",
      active
        ? "bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-[0_10px_30px_rgba(59,130,246,.35)]"
        : "text-slate-600",
      "dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200"
    ].join(" ")}
  >
    {children}
  </div>
);

export default function Sidebar() {
  const { pathname } = useLocation();
  const top: Item[] = [
    { id: "logo", emoji: "❄️", active: false },
  ];
  const primary: Item[] = [
    { id: "lock", icon: <Handbag  size={18} />, to: "/marketplace" },
    { id: "wand", icon: <Sparkles size={18} /> },
    { id: "search", icon: <Search size={18} />, active: true }, // active pill
    { id: "bookmark", icon: <Bookmark size={18} /> },
  ];
  const secondary: Item[] = [
    { id: "folder", icon: <FolderClosed size={18} /> },
    { id: "chat", icon: <MessageSquare size={18} /> },
  ];

  // avatars
  const people = [
    "https://i.pravatar.cc/64?img=12",
    "https://i.pravatar.cc/64?img=34",
    "https://i.pravatar.cc/64?img=56",
  ];

  return (
    <aside
      className="
        flex h-full w-[72px] flex-col items-center justify-between
         bg-white/80 p-3
         backdrop-blur
        dark:border-slate-700/60 dark:bg-slate-900/70
      "
    >
      {/* Top cluster */}
      <div className="flex flex-col items-center gap-3">
        {/* Logo */}
        {top.map((it) => (
          <div
            key={it.id}
            className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-[0_10px_30px_rgba(59,130,246,.35)] ring-1 ring-inset ring-white/40"
          >
            <span className="text-lg">{it.emoji}</span>
          </div>
        ))}

        {/* Divider */}
        <div className="my-2 h-px w-8 bg-slate-200/70 dark:bg-slate-700/60" />

        {/* Main icons */}
        <nav className="flex flex-col items-center gap-2 rounded-2xl bg-blue-100/40 p-2 dark:bg-slate-800/40">
          {primary.map((it) => {
            const isActive = it.to ? pathname.startsWith(it.to) : false;
            const content = <IconWrap active={isActive}>{it.icon}</IconWrap>;
            return it.to ? (
              <Link key={it.id} to={it.to} className="outline-none">
                {content}
              </Link>
            ) : (
              <button key={it.id} className="outline-none">{content}</button>
            );
          })}
        </nav>

        {/* Spacer card-like group */}
        <div className="mt-2 w-full rounded-2xl bg-blue-100/40 p-2 dark:bg-slate-800/40">
          <div className="flex flex-col items-center gap-2">
            {secondary.map((it) => (
              <button key={it.id} className="outline-none">
                <IconWrap>{it.icon}</IconWrap>
              </button>
            ))}
          </div>
        </div>

        {/* Avatars */}
        <div className="mt-2 flex flex-col items-center gap-3">
          {people.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="user"
              className="size-9 rounded-full border border-white shadow-sm ring-1 ring-slate-200/60 dark:border-slate-800"
            />
          ))}
        </div>
      </div>

      {/* Bottom settings */}
      <button className="outline-none">
        <IconWrap>
          <Settings size={18} />
        </IconWrap>
      </button>
    </aside>
  );
}
