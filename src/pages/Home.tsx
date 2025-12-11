// src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react";
import { Mic, SendHorizontal } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CardProduct from "../components/ui/CardProduct";


export default function Home() {
  const { authorSlug } = useParams();
  const nav = useNavigate();

  // 🔹 Author profiles map
  const authorProfiles: Record<string, { name: string; avatar: string }> = {
    "noah-carter": { name: "Noah Carter", avatar: "https://i.pravatar.cc/200?img=12" },
    "jordan-blake": { name: "Jordan Blake", avatar: "https://i.pravatar.cc/200?img=32" },
    "riley-taylor": { name: "Riley Taylor", avatar: "https://i.pravatar.cc/200?img=49" },
  };

  // ✅ Directly derive from params (auto re-render on URL change)
  const activeAuthor = useMemo(
    () => (authorSlug ? authorProfiles[authorSlug] : undefined),
    [authorSlug]
  );

  // 🔹 Rotating placeholder text
  const placeholders = [
    "Fix PECI error — Provide RCA...",
    "Create interview-ready use cases for Integrations...",
    "Generate test cases for Job Change BP...",
    "Review Studio integration logs...",
    "Train my twin with new scenarios...",
  ];
  const [pi, setPi] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setInterval(() => setPi((n) => (n + 1) % placeholders.length), 8000);
    return () => clearInterval(t);
  }, []);

  const goChat = () => {
  const q = query.trim() || placeholders[pi].replace(/\.\.\.$/, "");
  if (authorSlug) {
    // ✅ author context me ho —> Author Chat
    nav(`/authors/${authorSlug}/chat?q=${encodeURIComponent(q)}`);
  } else {
    // normal home —> normal chat
    nav(`/chat?q=${encodeURIComponent(q)}`);
  }
};

  // 🔹 Rotating tech words in heading
  const techWords = ["Workday", "SAP", "SuccessFactors", "Salesforce", "ServiceNow"];
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const wordTimer = setInterval(() => setWordIndex((p) => (p + 1) % techWords.length), 2000);
    return () => clearInterval(wordTimer);
  }, []);

  // 🔹 Twin cards data
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
      {/* 🔹 Top avatar / orb */}
      <div className="relative mx-auto mb-6 flex justify-center">
        {activeAuthor ? (
          <div className="relative">
            <img
              src={activeAuthor.avatar}
              alt={activeAuthor.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
            <div className="absolute inset-0 -z-10 rounded-full blur-2xl bg-blue-400/30" />
            <span className="absolute -right-1 -bottom-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3084F1] text-white text-xs shadow-md">
              ✓
            </span>
          </div>
        ) : (
          <img
            src="/assets/ai.gif"
            alt="AI Orb"
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
          />
        )}
      </div>

      {/* 🔹 Heading with dynamic tech word */}
      <h1 className="text-center font-medium leading-tight text-[28px] sm:text-[34px] md:text-[42px]">
        Your Creative Integration Twin
        <br className="hidden sm:block" /> trained on real{" "}
        <span
          key={techWords[wordIndex]}
          className="text-blue-700"
          style={{ display: "inline-block", animation: "fadeInOut 2s ease-in-out infinite" }}
        >
          {techWords[wordIndex]}
        </span>{" "}
        experts
      </h1>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          25% { opacity: 1; transform: translateY(0); }
          75% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      {/* 🔹 Search box */}
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

      {/* 🔹 Cards header */}
      <div className="mt-10 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold">
          Let’s Explore {techWords[wordIndex]} Digital Twins
        </h3>
        <button className="text-[13px] text-slate-500 hover:text-slate-700">See more ›</button>
      </div>

      {/* 🔹 Cards grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {twins.map((t, i) => (
          <CardProduct key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
