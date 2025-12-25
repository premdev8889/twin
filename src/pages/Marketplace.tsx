import { useEffect, useState } from "react";
import FilterPanel from "../components/sections/chat/FilterPanel";
import CardProduct from "../components/ui/CardProduct";

export default function Marketplace() {
  const filterChips = [
    "Trending",
    "Most Stars",
    "Best Match",
    "Popular",
    "Recently Updated",
    "Recently Created",
  ];

  const [selectedChips, setSelectedChips] = useState<Set<string>>(
    new Set(["Trending", "Most Stars", "Best Match"])
  );

  const handleSelect = (label: string) => {
    setSelectedChips((prev) => {
      if (prev.has(label)) return prev;
      const next = new Set(prev);
      next.add(label);
      return next;
    });
  };

  const handleUnselect = (label: string) => {
    setSelectedChips((prev) => {
      if (!prev.has(label)) return prev;
      const next = new Set(prev);
      next.delete(label);
      return next;
    });
  };

  const clearAllChips = () => setSelectedChips(new Set());
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
      rating: "9",
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


  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // lock scroll when mobile filter drawer open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (showMobileFilters) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showMobileFilters]);

 

  return (
    <div className="min-h-screen  text-slate-900 dark:bg-slate-950 dark:text-slate-100 mt-10">
      {/* Layout: left grid + right filter */}
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-9">
          <div className="mx-auto w-full ">
            {/* Search / Composer */}
            <div className="flex  items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide mb-4">
              {filterChips.map((c) => {
                const selected = selectedChips.has(c);
                return (
                  <div
                    key={c}
                    className={`flex items-center gap-1 rounded-full border px-3 py-1 text-sm shadow-sm whitespace-nowrap transition ${
                      selected
                        ? "border-sky-200 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                    }`}
                  >
                    <button onClick={() => !selected && handleSelect(c)} className="outline-none">
                      {c}
                    </button>

                    {selected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnselect(c);
                        }}
                        className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-white/70 text-slate-500 hover:bg-white dark:bg-slate-700 dark:text-slate-200"
                        title="Remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Clear All */}
              <button
                onClick={clearAllChips}
                className={`ml-auto rounded-full border px-3 py-1 text-sm shadow-sm transition ${
                  selectedChips.size
                    ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                    : "border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900/40"
                }`}
                disabled={selectedChips.size === 0}
              >
                Clear All
              </button>
            </div>
            {/* Messages (if any) */}
            
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
