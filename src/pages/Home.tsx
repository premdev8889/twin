// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { Mic, SendHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardProduct from "../components/ui/CardProduct";

export default function Home() {
  const placeholders = [
    "Fix PECI error — Provide RCA...",
    "Create interview-ready use cases for Integrations...",
    "Generate test cases for Job Change BP...",
    "Review Studio integration logs...",
    "Train my twin with new scenarios...",
  ];
  const [pi, setPi] = useState(0);
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setPi((n) => (n + 1) % placeholders.length), 8000);
    return () => clearInterval(t);
  }, []);

  const goChat = () => {
    const q = query.trim() || placeholders[pi].replace(/\.\.\.$/, "");
    nav(`/chat?q=${encodeURIComponent(q)}`);
  };

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
  ];

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-6 py-8">
      {/* orb */}
      <div className="relative mx-auto mb-6 flex justify-center">
        <img
          src="/assets/ai.gif"
          alt="AI Orb"
          className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
        />
      </div>

      {/* heading */}
      <h1 className="text-center font-medium leading-tight text-[28px] sm:text-[34px] md:text-[42px]">
        Your AI-powered Digital Twins
        <br className="hidden sm:block" /> trained on real Workday experts
      </h1>

      {/* search box */}
      <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 pl-4 pr-3 shadow-[0_18px_50px_-25px_rgba(59,130,246,0.25)] ring-1 ring-inset ring-white/40 dark:border-slate-700 dark:bg-slate-900/60">
        <input
          className="w-full bg-transparent py-2.5 text-[15px] outline-none placeholder:text-slate-400"
          placeholder={placeholders[pi]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goChat()}
        />
        <div className="mt-3 flex items-center justify-between">
          <button className="grid place-items-center rounded-full border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
            <Mic size={18} />
          </button>
          <button
            onClick={goChat}
            className="grid place-items-center rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 p-2 text-white shadow-[0_10px_20px_rgba(56,149,255,.35)] hover:from-sky-600 hover:to-blue-600"
          >
            <SendHorizontal size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* cards grid - (unchanged demo) */}
      <div className="mt-10 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold">Let’s Explore Workday Digital Twins</h3>
        <button className="text-[13px] text-slate-500 hover:text-slate-700">See more ›</button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {twins.map((t, i) => (
          <CardProduct key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
