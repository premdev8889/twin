import { useState } from "react";
import { Mic, SendHorizontal } from "lucide-react";
import FilterPanel from "../components/sections/chat/FilterPanel";
import TwinResultCard from "../components/sections/chat/TwinResultCard";
import { twinsData } from "../data/twinsData";

export default function AutomationChatPage() {
  const [val, setVal] = useState(
    "I want to know more about creative things and explore different ideas that can help me understand creativity better."
  );
  const [messages, setMessages] = useState<string[]>([]);

  const send = () => {
    const text = val.trim();
    if (!text) return;
    setMessages((m) => [...m, text]);
    setVal(""); // clear after send
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
    <div className="min-h-screen  text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* MAIN */}
          <main className="lg:col-span-9 space-y-5">
            {/* Hero banner */}
            <section className="rounded-3xl bg-gradient-to-tr from-sky-600 to-blue-500 p-5 sm:p-6 text-white shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                Discover the best twins for you here!
              </h2>
              <p className="mt-2 max-w-3xl text-white/90 text-sm sm:text-base">
                Explore a variety of creative and intelligent twins designed to
                make your tasks easier and ideas smarter.
              </p>

              {/* Search / Composer pill */}
              <div className="mt-4 rounded-2xl bg-white p-2 pl-4 text-slate-800 shadow-inner">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Type your message..."
                    className="w-full bg-transparent py-2 outline-none text-[15px]"
                  />
                  <div className="flex items-center justify-between sm:justify-end gap-2 w-[100%] sm:w-fit ">
                    <button
                      className="grid place-items-center rounded-full bg-slate-100 p-2 sm:p-2.5 hover:bg-slate-200 transition"
                      aria-label="Voice input"
                    >
                      <Mic size={16} />
                    </button>
                    <button
                      onClick={send}
                      className="grid place-items-center rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 p-2 sm:p-2.5 text-white shadow hover:from-sky-600 hover:to-blue-600 transition active:scale-[0.97]"
                      aria-label="Send message"
                    >
                      <SendHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter chips row with × */}
            <div className="flex  items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {filterChips.map((c) => {
                const selected = selectedChips.has(c);
                return (
                  <div
                    key={c}
                    className={`flex items-center gap-1 rounded-full border px-3 py-1 text-sm shadow-sm whitespace-nowrap transition ${
                      selected
                        ? "border-sky-200 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                    }`}
                  >
                    <button
                      onClick={() => !selected && handleSelect(c)}
                      className="outline-none"
                    >
                      {c}
                    </button>

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
            <section className="space-y-4 sm:space-y-5">
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
                  summary={t.summary}
                />
              ))}
            </section>

            {/* Messages (if any) */}
            {messages.length > 0 && (
              <section className="space-y-3 pt-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white py-3 px-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
                  >
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200">
                      {m}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </main>

          {/* RIGHT FILTER PANEL */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-20">
              <FilterPanel onReset={() => console.log('reset filters')} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
