import { useEffect, useState } from "react";
import { Mic, SendHorizontal, X } from "lucide-react";
import FilterPanel from "../components/sections/chat/FilterPanel";
import CardProduct from "../components/ui/CardProduct";

export default function Marketplace() {
  // header tabs (UI state)
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // lock scroll when mobile filter drawer open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (showMobileFilters) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showMobileFilters]);

  const send = () => {
    const text = val.trim();
    if (!text) return;
    setMessages((m) => [...m, text]);
    setVal("");
  };

  return (
    <div className="min-h-screen  text-slate-900 dark:bg-slate-950 dark:text-slate-100 mt-10">
      {/* Layout: left grid + right filter */}
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-9">
          <div className="mx-auto w-full ">
            {/* Search / Composer */}

            {/* Messages (if any) */}
            {messages.length > 0 && (
              <div className="space-y-3 pt-3 mb-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white py-3 px-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
                  >
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200">{m}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {twins.map((t, i) => (
                <CardProduct key={i} {...t} />
              ))}
            </div>
          </div>

          {/* RIGHT: filter panel (sticky on lg) */}
          <div className="col-span-12 lg:col-span-3">
            <div className="hidden lg:block lg:sticky lg:top-4">
              <FilterPanel />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <MobileFilters onClose={() => setShowMobileFilters(false)}>
          <FilterPanel />
        </MobileFilters>
      )}
    </div>
  );
}

/* ------- Small mobile drawer for filters ------- */
function MobileFilters({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] sm:hidden bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="absolute left-3 right-3 top-3 bottom-3 rounded-2xl bg-white dark:bg-slate-900 p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold">Filters</h4>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            Close
          </button>
        </div>
        <div className="h-full overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
}
