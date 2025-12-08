// src/components/chat/ChatComposer.tsx
import { Mic, SendHorizontal } from "lucide-react";
import { useState } from "react";

type Props = {
  onSend?: (text: string) => void; // ✅ new prop
};

export default function ChatComposer({ onSend }: Props) {
  const [val, setVal] = useState("");

  const handleSend = () => {
    const text = val.trim();
    if (!text) return;
    onSend?.(text);   // ✅ parent ko bhej do
    setVal("");       // ✅ clear input
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-[53rem] w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_50px_-25px_rgba(59,130,246,0.25)] dark:border-slate-700 dark:bg-slate-900/60">
      <div className="flex items-center gap-3">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask anything.."
          className="w-full bg-transparent py-2.5 text-[15px] outline-none placeholder:text-slate-400"
        />
        <button className="grid place-items-center rounded-full border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
          <Mic size={18} />
        </button>
        <button
          onClick={handleSend}
          className="grid place-items-center rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 p-2 text-white shadow-[0_10px_20px_rgba(56,149,255,.35)]"
        >
          <SendHorizontal size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
