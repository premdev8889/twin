// src/pages/AutomationChatPage.tsx
import { useState } from "react";
import { Mic, SendHorizontal, Check, X, SquarePen } from "lucide-react";
import FilterPanel from "../components/sections/chat/FilterPanel";
import TwinResultCard from "../components/sections/chat/TwinResultCard";
import { twinsData } from "../data/twinsData";

export default function AutomationChatPage() {
  const [query, setQuery] = useState(
    "I want to know more about creative things and explore different ideas that can help me understand creativity better."
  );
  const [val, setVal] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(query);

  const send = () => {
    const text = val.trim();
    if (!text) return;
    setMessages((m) => [...m, text]);
    setVal("");
  };

  // ---- Filter Chips ----
  const filterChips = [
    "Trending",
    "Most Stars",
    "Best Match",
    "Popular",
    "Recently Updated",
    "Recently Created",
  ];

  const [selectedChips, setSelectedChips] = useState<Set<string>>(
    new Set(["Trending", "Most Stars", "Best Match"])
  );

  const handleSelect = (label: string) => {
    setSelectedChips((prev) => {
      if (prev.has(label)) return prev;
      const next = new Set(prev);
      next.add(label);
      return next;
    });
  };

  const handleUnselect = (label: string) => {
    setSelectedChips((prev) => {
      if (!prev.has(label)) return prev;
      const next = new Set(prev);
      next.delete(label);
      return next;
    });
  };

  const clearAllChips = () => setSelectedChips(new Set());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* MAIN */}
          <main className="lg:col-span-9 space-y-5">
            {/* Hero banner */}
            <div className="rounded-3xl bg-gradient-to-tr from-sky-600 to-blue-500 p-6 text-white shadow">
              <h2 className="text-3xl font-bold">
                Discover the best twins for you here!
              </h2>
              <p className="mt-1 max-w-3xl text-white/90 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Search pill */}
              <div className="mt-4 rounded-2xl bg-white p-2 pl-4 text-slate-800 shadow-inner">
                <div className="flex items-center gap-2">
                  {editing ? (
                    <input
                      value={temp}
                      onChange={(e) => setTemp(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setQuery(temp);
                          setEditing(false);
                        }
                        if (e.key === "Escape") {
                          setTemp(query);
                          setEditing(false);
                        }
                      }}
                      autoFocus
                      className="w-full bg-transparent py-2 outline-none"
                    />
                  ) : (
                    <p className="flex-1 truncate py-2 text-[15px] text-slate-700">
                      {query}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    {editing ? (
                      <>
                        <button
                          onClick={() => {
                            setQuery(temp);
                            setEditing(false);
                          }}
                          className="grid place-items-center rounded-full bg-green-100 p-2"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setTemp(query);
                            setEditing(false);
                          }}
                          className="grid place-items-center rounded-full bg-red-100 p-2"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setTemp(query);
                          setEditing(true);
                        }}
                        className="grid place-items-center rounded-full bg-slate-100 p-2"
                      >
                        <SquarePen size={16} />
                      </button>
                    )}
                    <button className="grid place-items-center rounded-full bg-slate-100 p-2">
                      <Mic size={16} />
                    </button>
                    <button className="grid place-items-center rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 p-2 text-white shadow">
                      <SendHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter chips row with × */}
            <div className="flex flex-wrap items-center gap-2">
              {filterChips.map((c) => {
                const selected = selectedChips.has(c);
                return (
                  <div
                    key={c}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm shadow-sm transition
                    ${
                      selected
                        ? "border-sky-200 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                    }`}
                  >
                    {/* Label click → select if unselected */}
                    <button
                      onClick={() => !selected && handleSelect(c)}
                      className="outline-none"
                    >
                      {c}
                    </button>

                    {/* × button → visible only when selected */}
                    {selected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnselect(c);
                        }}
                        className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-white/70 text-slate-500 hover:bg-white dark:bg-slate-700 dark:text-slate-200"
                        title="Remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Clear All */}
              <button
                onClick={clearAllChips}
                className={`ml-auto rounded-full border px-3 py-1 text-sm shadow-sm transition ${
                  selectedChips.size
                    ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                    : "border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900/40"
                }`}
                disabled={selectedChips.size === 0}
              >
                Clear All
              </button>
            </div>

            {/* Twin cards - dynamic from twinsData */}
            <div className="space-y-4">
              {twinsData.map((t) => (
                <TwinResultCard
                  key={t.slug}
                  slug={t.slug}
                  name={t.name}
                  avatar={t.avatar}
                  role={t.role}
                  subscribers={`${t.subscribed} subscribers`}
                  year={t.expYears}
                  Scenarios={"430+ Scenarios"}
                  summary={
                    "Here's an expanded, richer version with more depth, tools, and a touch of creative sparkle ✨..."
                  }
                />
              ))}
            </div>

            {/* Messages (if any) */}
            {messages.length > 0 && (
              <div className="space-y-3 pt-2">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white py-3 px-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
                  >
                    <p className="text-sm text-slate-700 dark:text-slate-200">
                      {m}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom composer */}
            <div className="sticky bottom-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_50px_-25px_rgba(59,130,246,0.25)] dark:border-slate-700 dark:bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <input
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask anything.."
                    className="w-full bg-transparent py-2.5 text-[15px] outline-none placeholder:text-slate-400"
                  />
                  <button className="grid place-items-center rounded-full border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                    <Mic size={18} />
                  </button>
                  <button
                    onClick={send}
                    className="grid place-items-center rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 p-2 text-white shadow-[0_10px_20px_rgba(56,149,255,.35)]"
                  >
                    <SendHorizontal size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Right filter panel */}
          <FilterPanel onReset={() => console.log("reset filters")} />
        </div>
      </div>
    </div>
  );
}
