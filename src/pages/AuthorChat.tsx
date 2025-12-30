// src/pages/AuthorChat.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { Mic, SendHorizontal } from "lucide-react";
import { getTwinBySlug, getTwinByAuthorSlug } from "../data/twinsData";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AuthorChat() {
  // const { authorSlug } = useParams<{ authorSlug: string }>();
  const [search] = useSearchParams();
  const initialQ = search.get("q") || "";
  const { state } = useLocation() as {
    state?: {
      type?: "chat";
      slug?: string;
    };
  };
  const { authorSlug } = useParams();

  const twin = useMemo(() => {
    // Try direct twin slug first, then fallback to publishedBy.name slug matching.
    if (state?.type === "chat" && state.slug) {
      return getTwinBySlug(state.slug) || getTwinByAuthorSlug(state.slug);
    }
    if (authorSlug) {
      return getTwinBySlug(authorSlug) || getTwinByAuthorSlug(authorSlug);
    }
    return null;
  }, [state, authorSlug]);

  const [input, setInput] = useState(initialQ);
  const [messages, setMessages] = useState<Message[]>([]);

  // ✅ Auto long assistant message when page opens
  useEffect(() => {
  if (!twin || messages.length) return;

  setMessages([
    {
      role: "assistant",
      content: `
👋 Hi, I’m ${twin.name}

${twin.modelIntroduction}

🔹 What I can help you with:
  ${twin.capabilities.map((c: string) => `• ${c}`).join("\n")}

📌 Why teams use me:
${twin.description}

🧠 About this Digital Twin:
${twin.about}
      `.trim(),
    },
  ]);
}, [twin]);
  // Prefill user message if ?q exists
  useEffect(() => {
    if (initialQ) {
      setMessages((m) => [...m, { role: "user", content: initialQ }]);
    }
  }, [initialQ]);

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { role: "user", content: text }]);

    // Fake assistant reply (UI demo)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Thanks for your question! I’ll break this down step by step for you 👇",
        },
      ]);
    }, 400);

    setInput("");
  };

  if (!twin) {
    return <div className="p-10 text-center">Twin not found</div>;
  }

  return (
    <div className="min-h-screen text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-3 sm:px-6 py-4">
        {/* ===== Twin Header ===== */}
        <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm dark:bg-slate-900/60">
          <div className="flex gap-4">
            <img src={twin.avatar} alt={twin.name} className="h-16 w-16 rounded-full border" />

            <div>
              <h2 className="text-lg font-semibold">{twin.name}</h2>
              <p className="text-sm text-slate-500">{twin.role}</p>
              <p className="text-xs text-slate-400">
                {twin.subscribed} subscribers · {twin.expYears} experience
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">{twin.about}</div>
        </div>

        {/* ===== Messages ===== */}
        <div className="min-h-[58vh] pb-[120px]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-full rounded-2xl bg-white p-4 shadow-sm">
                {m.role === "assistant" && (
                  <div className="mb-2 flex items-center gap-2">
                    <img src={twin.avatar} className="h-6 w-6 rounded-full" />
                    <span className="text-xs font-medium text-sky-600">{twin.name}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap text-sm leading-6">{m.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Input ===== */}
        <div className="fixed bottom-0 left-8 w-full    ">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 py-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 pl-4 pr-3 shadow-[0_18px_50px_-25px_rgba(59,130,246,0.25)] dark:border-slate-700 dark:bg-slate-900/60">
              <input
                className="w-full bg-transparent py-2.5 text-[15px] outline-none placeholder:text-slate-400"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              />
              <div className="mt-3 flex items-center justify-between">
                <button className="grid place-items-center rounded-full border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                  <Mic size={18} />
                </button>
                <button
                  onClick={sendMsg}
                  className="grid place-items-center rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 p-2 text-white shadow-[0_10px_20px_rgba(56,149,255,.35)] hover:from-sky-600 hover:to-blue-600"
                >
                  <SendHorizontal size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
