import { useNavigate, useParams } from "react-router-dom";
import { AuthorCardData, getAvatarByIdOrSlug } from "../data/authorsData";
import { BadgeCheck, Mic, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import AuthorCard from "../components/ui/AuthorCard";

export default function Twin() {
  
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  // ✅ find twin FIRST — support id or slug links
  const twin = getAvatarByIdOrSlug(id);

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

  // 🔹 Rotating tech words
  const techWords = ["Workday", "SAP", "SuccessFactors", "Salesforce", "ServiceNow"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => setWordIndex((p) => (p + 1) % techWords.length), 2000);
    return () => clearInterval(wordTimer);
  }, []);

  // ✅ goChat AFTER twin exists
  const goChat = () => {
    if (!twin) return;

    const q = query.trim() || placeholders[pi].replace(/\.\.\.$/, "");

    nav(
      `/authors/${twin.authorSlug}/chat?q=${encodeURIComponent(q)}`,
      {
        state: {
          type: "chat",
          slug: twin.authorSlug,
        },
      }
    );
  };

  if (!twin) return <div>Not Found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl">

        {/* Avatar */}
        <div className="flex items-center gap-3 bg-[#f9fbfc] px-2 py-1 border-2 border-white shadow-sm rounded-full w-fit mb-3">
          <img
            src={twin.avatarImg}
            alt={twin.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <p>{twin.name}</p>
          <BadgeCheck fill="#1C78EE" color="#fff" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-slate-900">
          How can I help you today?
        </h2>

        <p className="text-slate-500 mt-1">
          Try out new feature to train your twin
        </p>

        {/* Input */}
        <div className="mx-auto mt-5 max-w-4xl rounded-2xl border bg-white p-3 shadow">
          <input
            className="w-full bg-transparent py-2.5 outline-none"
            placeholder={placeholders[pi]}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goChat()}
          />

          <div className="mt-3 flex justify-between">
            <button className="rounded-full border p-2">
              <Mic size={18} />
            </button>
            <button
              onClick={goChat}
              className="rounded-full bg-sky-500 p-2 text-white"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Explore */}
        <div className="mt-8 flex justify-between">
          <h3 className="font-semibold">
            Let’s Explore {techWords[wordIndex]} Digital Twins
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {AuthorCardData.map((t) => (
            <AuthorCard
              key={t.id}
              id={t.id}
              name={t.name}
              avatar={t.avatar}
              verified={t.verified}
              description={t.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
