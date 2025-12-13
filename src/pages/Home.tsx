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
      nav(`/authors/${authorSlug}/chat?q=${encodeURIComponent(q)}`);
    } else {
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
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
      {/* 🔹 Top avatar / orb */}
      <div className="relative mx-auto mb-6 sm:mb-8 flex justify-center">
        {activeAuthor ? (
          <div className="relative">
            <img
              loading="lazy"
              src={activeAuthor.avatar}
              alt={activeAuthor.name}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
            <div className="absolute inset-0 -z-10 rounded-full blur-2xl bg-blue-400/30" />
            <span
              aria-label="Verified"
              title="Verified"
              className="absolute -right-1 -bottom-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3084F1] text-white text-xs shadow-md"
            >
              ✓
            </span>
          </div>
        ) : (
          <img
            loading="lazy"
            src="/assets/ai.gif"
            alt="AI Orb"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
          />
        )}
      </div>

      {/* 🔹 Heading with dynamic tech word */}
      <h1
        className="text-center font-medium leading-tight"
        style={{
          // fluid type: min 24px, preferred 4.2vw, max 42px
          fontSize: "clamp(24px, 4.2vw, 42px)",
        }}
      >
        Your Creative Integration Twin
        <br className="hidden sm:block" /> trained on real{" "}
        <span
          key={techWords[wordIndex]}
          className="text-blue-700 inline-block motion-safe:animate-none"
          style={{
            animation: "fadeInOut 2s ease-in-out infinite",
          }}
        >
          {techWords[wordIndex]}
        </span>{" "}
        experts
      </h1>

      {/* reduced motion: disable the keyframe */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-none { animation: none !important; }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          25% { opacity: 1; transform: translateY(0); }
          75% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      {/* 🔹 Search box */}
      <div className="mx-auto mt-5 sm:mt-6 max-w-4xl rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 pl-4 pr-3 shadow-[0_18px_50px_-25px_rgba(59,130,246,0.25)] ring-1 ring-inset ring-white/40 dark:border-slate-700 dark:bg-slate-900/60">
        <label htmlFor="home-query" className="sr-only">
          Ask your twin
        </label>
        <input
          id="home-query"
          className="w-full bg-transparent py-2.5 text-[15px] outline-none placeholder:text-slate-400"
          placeholder={placeholders[pi]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goChat()}
          aria-label="Type your question"
        />
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            className="grid place-items-center rounded-full border border-slate-200 bg-white p-2 sm:p-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
            aria-label="Start voice input"
          >
            <Mic size={18} />
          </button>
          <button
            type="button"
            onClick={goChat}
            className="grid place-items-center rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 p-2 sm:p-2.5 text-white shadow-[0_10px_20px_rgba(56,149,255,.35)] hover:from-sky-600 hover:to-blue-600 active:scale-[0.98]"
            aria-label="Send"
          >
            <SendHorizontal size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* 🔹 Cards header */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold">
          Let’s Explore {techWords[wordIndex]} Digital Twins
        </h3>
        <button
          type="button"
          className="self-start sm:self-auto text-[13px] text-slate-600 hover:text-slate-800 underline-offset-2 hover:underline"
          aria-label="See more twins"
        >
          See more ›
        </button>
      </div>

      {/* 🔹 Cards grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {twins.map((t, i) => (
          <CardProduct key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
