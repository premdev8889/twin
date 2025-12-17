// src/pages/AuthorChat.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import {
  Mic,
  SendHorizontal,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Copy,
  Upload,
  SquarePen,
} from "lucide-react";

export default function AuthorChat() {
  const { authorSlug } = useParams();
  const [search] = useSearchParams();
  const initialQ = search.get("q") || "";

  // Map your authors (same slugs as Home/AuthorDetail)
  const profiles: Record<string, { name: string; avatar: string }> = {
    "noah-carter": { name: "Noah Carter", avatar: "https://i.pravatar.cc/200?img=12" },
    "jordan-blake": { name: "Jordan Blake", avatar: "https://i.pravatar.cc/200?img=32" },
    "riley-taylor": { name: "Riley Taylor", avatar: "https://i.pravatar.cc/200?img=49" },
  };

  const author = useMemo(() => (authorSlug ? profiles[authorSlug] : undefined), [authorSlug]);

  const [input, setInput] = useState(initialQ);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

  useEffect(() => {
    if (initialQ) {
      // Prefill first user msg with query param
      setMessages([{ role: "user", content: initialQ }]);
    }
  }, [initialQ]);

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", content: text }]);

    // fake assistant response for UI
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Here's an expanded, richer version with more depth, tools, and a touch of creative sparkle ✨\nHere are some creative ideas you can explore…",
        },
      ]);
    }, 300);

    setInput("");
  };

  const { state } = useLocation() as {
    state?: {
      name: string;
      avatar: string;
      role: string;
      summary: string;
      subscribers: string;
      year?: string;
      Scenarios?: string;
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-3 sm:px-6 py-4">
        {/* Top bar */}
{/* ===== Author / Twin Detail (STATIC – no chat impact) ===== */}
        {state && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
            <div className="flex items-start gap-4">
              <img
                src={state.avatar}
                alt={state.name}
                className="h-16 w-16 rounded-full object-cover border border-slate-200"
              />

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {state.name}
                  </h2>
                  <span className="text-xs text-slate-500">{state.subscribers}</span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">{state.role}</p>

                {(state.year || state.Scenarios) && (
                  <div className="mt-2 flex gap-2 text-xs text-slate-500">
                    {state.year && (
                      <span className="rounded-full border px-2 py-0.5">{state.year}</span>
                    )}
                    {state.Scenarios && (
                      <span className="rounded-full border px-2 py-0.5">{state.Scenarios}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* FULL SUMMARY */}
            <div className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {state.summary}
            </div>
          </div>
        )}
        {/* Messages area */}
        <div className="min-h-[58vh] pb-[120px]">
          {" "}
          {/* padding bottom for fixed input */}
          {messages.map((m, idx) => (
            <>
              <div
                key={idx}
                className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[100%] w-fit rounded-2xl p-4 shadow-sm ${
                    m.role === "user"
                      ? "bg-white text-slate-800 rounded-br-sm"
                      : "bg-white text-slate-800 rounded-bl-sm"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      {/* ✅ Author Avatar */}
                      <img
                        src={author?.avatar || "/assets/ai.gif"}
                        alt={author?.name || "AI"}
                        className="h-6 w-6 rounded-full object-cover border border-slate-200"
                      />
                      <div className="text-xs font-medium text-sky-600">
                        {author?.name || "Response"}
                      </div>
                    </div>
                  )}

                  {/* Message text */}
                  <div className="whitespace-pre-wrap text-[14px] leading-6">{m.content}</div>

                  {/* Assistant actions */}
                </div>
              </div>
              {m.role === "assistant" && (
                <div className="mt-2 flex items-center gap-3 text-slate-400">
                  <button title="Copy">
                    <Copy size={16} />
                  </button>
                  <button title="Like">
                    <ThumbsUp size={16} />
                  </button>
                  <button title="Dislike">
                    <ThumbsDown size={16} />
                  </button>
                  <button title="upload">
                    <Upload size={16} />
                  </button>
                  <button title="Retry">
                    <RotateCcw size={16} />
                  </button>
                  <button title="Retry">
                    <SquarePen size={16} />
                  </button>
                </div>
              )}
            </>
          ))}
          {!messages.length && (
            <div className="text-center text-sm text-slate-400 mt-20">Start your conversation…</div>
          )}
        </div>

        

        {/* Input box */}
        {/* ✅ Fixed bottom input box */}
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
