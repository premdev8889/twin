import { useNavigate, useParams } from "react-router-dom";
import { AuthorCardData, avtarIcon } from "../data/authorsData";
import { BadgeCheck, Mic, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import AuthorCard from "../components/ui/AuthorCard";

export default function Twin() {
  const { authorSlug } = useParams();
  const nav = useNavigate();

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

  const { id } = useParams();

  const twin = avtarIcon.find((t) => t.id === id);

  if (!twin) return <div>Not Found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-4xl ">
        {/* Avatar */}
        <div className="flex items-center gap-3 bg-[#f9fbfc] px-2 py-1 border-2 border-white shadow-sm rounded-full w-fit mb-3">
          <img
            src={twin.avatarImg}
            alt={twin.name}
            className=" w-8 h-8 rounded-full object-cover "
          />
          <p className="">{twin.name}</p>
          <BadgeCheck fill="#1C78EE" color="#fff"/>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How can I help you today?</h2>

        {/* Subtitle */}
        <p className="text-slate-500 mt-1 text">Try out new feature to trainee your twin</p>

        {/* Input box (same UI style) */}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {AuthorCardData.map((twin) => (
            <AuthorCard
              key={twin.id}
              id={twin.id}
              name={twin.name}
              avatar={twin.avatar}
              verified={twin.verified}
              description={twin.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
