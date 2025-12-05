// Hero + Search + Cards section
import { Mic, SendHorizontal } from "lucide-react";
import CardProduct from "../components/ui/CardProduct";

export default function Home() {
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
      {/* orb / logo */}
      <div className="relative mx-auto mb-6 grid size-28 place-items-center">
        <div className="absolute inset-0 blur-3xl rounded-full bg-cyan-400/30" />
        <div className="absolute inset-4 blur-2xl rounded-full bg-indigo-500/30" />
        <div className="relative size-20 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-blue-700" />
      </div>

      {/* headline */}
      <h1 className="
        text-center font-semibold leading-tight
        text-[28px] sm:text-[34px] md:text-[42px]
      ">
        Your AI-powered Digital Twins
        <br className="hidden sm:block" />
        trained on real Workday experts
      </h1>

      {/* search bar */}
      <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-2 pl-4 pr-2
                      shadow-[0_18px_50px_-25px_rgba(59,130,246,0.25)]
                      dark:border-slate-700 dark:bg-slate-900/60">
          <input
            className="w-full bg-transparent outline-none placeholder:text-slate-400 py-3 text-[15px]"
            placeholder="Ask anything..."
          />
        <div className="flex justify-between items-center gap-3">
          {/* mic button inside field (like screenshot) */}
        <button className="mt-3 rounded-full border border-slate-200 bg-white p-2 
          shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70
        ">
          <Mic size={18} />
        </button>
          <button className=" mt-3 rounded-full border border-slate-200 bg-blue-100/40 px-1.5 py-1.5 
          shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/705">
            <SendHorizontal size={24} color="#ffffffff" fill="#3084F1" strokeWidth={1}/>
          </button>
        
        </div>

      </div>

      {/* section heading */}
      <div className="mt-10 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold">Let’s Explore Workday Digital Twins</h3>
        <button className="text-[13px] text-slate-500 hover:text-slate-700">See more ›</button>
      </div>

      {/* cards grid (responsive) */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {twins.map((t, i) => (
          <CardProduct key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
