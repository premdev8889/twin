// src/pages/Marketplace.tsx
import { useMemo, useState } from "react";
import { Mic, Play, SendHorizontal, X } from "lucide-react";
import FilterPanel from "../components/sections/chat/FilterPanel"; // adjust path if different
import CardProduct from "../components/ui/CardProduct";

export default function Marketplace() {
  // header tabs (for UI only)
  const tabs = [
    "Trending",
    "Most Stars",
    "Best Match",
    "Popular",
    "Recently Updated",
    "Recently Created",
  ];
  const [active, setActive] = useState(new Set<string>(["Trending", "Most Stars", "Best Match"]));

  const twins = [
    {
      avatar: "https://i.pravatar.cc/80?img=12",
      name: "Noah Carter",
      role: "Creative Integration Twin",
      tags: ["Integrations", "BP Fixes"],
      rating: "4.9",
      scenarios: "430+",
      subscribed: "1.3K",
      metaRight: "12 days Ago",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=32",
      name: "Jordan Blake",
      role: "Creative BP Twin",
      tags: ["BP Fixes", "BP Flows"],
      rating: "4.2",
      scenarios: "890+",
      subscribed: "5.3K",
      metaRight: "1 days Ago",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=49",
      name: "Riley Taylor",
      role: "Creative Studio Twin",
      tags: ["Studio", "BP Fixes"],
      rating: "4.1",
      scenarios: "1520+",
      subscribed: "88.1K",
      metaRight: "5 days Ago",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=12",
      name: "Noah Carter",
      role: "Creative Integration Twin",
      tags: ["Integrations", "BP Fixes"],
      rating: "4.9",
      scenarios: "430+",
      subscribed: "1.3K",
      metaRight: "12 days Ago",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=32",
      name: "Jordan Blake",
      role: "Creative BP Twin",
      tags: ["BP Fixes", "BP Flows"],
      rating: "4.2",
      scenarios: "890+",
      subscribed: "5.3K",
      metaRight: "1 days Ago",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=49",
      name: "Riley Taylor",
      role: "Creative Studio Twin",
      tags: ["Studio", "BP Fixes"],
      rating: "4.1",
      scenarios: "1520+",
      subscribed: "88.1K",
      metaRight: "5 days Ago",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=12",
      name: "Noah Carter",
      role: "Creative Integration Twin",
      tags: ["Integrations", "BP Fixes"],
      rating: "4.9",
      scenarios: "430+",
      subscribed: "1.3K",
      metaRight: "12 days Ago",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=32",
      name: "Jordan Blake",
      role: "Creative BP Twin",
      tags: ["BP Fixes", "BP Flows"],
      rating: "4.2",
      scenarios: "890+",
      subscribed: "5.3K",
      metaRight: "1 days Ago",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=49",
      name: "Riley Taylor",
      role: "Creative Studio Twin",
      tags: ["Studio", "BP Fixes"],
      rating: "4.1",
      scenarios: "1520+",
      subscribed: "88.1K",
      metaRight: "5 days Ago",
    },
  ];

  const [val, setVal] = useState(
    "I want to know more about creative things and explore different ideas that can help me understand creativity better."
  );
  const [messages, setMessages] = useState<string[]>([]);

  const send = () => {
    const text = val.trim();
    if (!text) return;
    setMessages((m) => [...m, text]);
    setVal(""); // send ke baad input clear
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto  px-3 sm:px-6 py-4">
        {/* top search + actions */}
        

        {/* layout: left grid + right filter */}
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-4 ">
          <div className="mt-4 rounded-2xl bg-white p-2 px-4 text-slate-800 shadow-inner ">
            <div className="flex items-center gap-2">
              <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Type your message..."
                className="w-full bg-transparent py-2 outline-none"
              />

              <div className="flex items-center gap-2">
                <button
                  className="grid place-items-center rounded-full bg-slate-100 p-2"
                  aria-label="Voice input"
                >
                  <Mic size={16} />
                </button>
                <button
                  onClick={send}
                  className="grid place-items-center rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 p-2 text-white shadow"
                  aria-label="Send message"
                >
                  <SendHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
          
        </div>
            {/* chip tabs */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {tabs.map((t) => {
                const selected = active.has(t);
                return (
                  <button
                    key={t}
                    onClick={() =>
                      setActive((prev) => {
                        const n = new Set(prev);
                        n.has(t) ? n.delete(t) : n.add(t);
                        return n;
                      })
                    }
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm shadow-sm transition ${
                      selected
                        ? "bg-blue-50 text-blue-600 border-blue-100"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {t}
                    {selected && <X size={14} className="ml-1 opacity-60" />}
                  </button>
                );
              })}
              <button
                onClick={() => setActive(new Set())}
                className="ml-1 text-[12px] text-slate-500 hover:text-slate-700"
              >
                Clear All
              </button>
            </div>
            {messages.length > 0 && (
              <div className="space-y-3 pt-2 mb-5">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white py-3 px-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
                  >
                    <p className="text-sm text-slate-700 dark:text-slate-200">{m}</p>
                  </div>
                ))}
              </div>
            )}
            {/* cards grid – repeat list to mimic screenshot density */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {twins.map((t, i) => (
                <CardProduct key={i} {...t} />
              ))}
            </div>
          </div>

          {/* RIGHT: filter panel (sticky) */}
          <div className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-4">
              <FilterPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
