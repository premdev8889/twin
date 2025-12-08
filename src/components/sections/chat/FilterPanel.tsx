import { useMemo, useState } from "react";

type Props = {
  onReset?: () => void;
  title?: string;
  /** Levels defaults (0..100) */
  initialLevelMin?: number;
  initialLevelMax?: number;
  /** Price defaults (0..100) */
  initialMinPrice?: number;
  initialMaxPrice?: number;
  /** UI placeholders only */
  minBoxPlaceholder?: string;
  maxBoxPlaceholder?: string;
};

export default function FilterPanel({
  onReset,
  title = "Filter by",
  initialLevelMin = 3,
  initialLevelMax = 60,
  initialMinPrice = 10,
  initialMaxPrice = 50,
  minBoxPlaceholder = "$ - 10",
  maxBoxPlaceholder = "$ - 50",
}: Props) {
  const modules = ["Integrations", "Core HCM", "Payroll", "Reporting"];
  const issuePool = ["Integrations", "Core HCM", "Payroll", "Reporting"];
  const ranges = useMemo(
    () => ["0 - 5", "5 - 10", "10 - 15", "15 - 20", "20 - 25", "25 - 30", "30 - 35"],
    []
  );

  // --- selections ---
  const [selectedModules, setSelectedModules] = useState(new Set(modules));
  const [selectedIssues, setSelectedIssues] = useState(new Set(["Integrations", "Core HCM"]));
  const [selectedRanges, setSelectedRanges] = useState(new Set<string>());

  // --- Levels: dual-handle (no inputs) ---
  const [levelMin, setLevelMin] = useState<number>(clamp(initialLevelMin, 0, initialLevelMax));
  const [levelMax, setLevelMax] = useState<number>(clamp(initialLevelMax, initialLevelMin, 100));

  // --- Price: dual-handle + inputs ---
  const [minPrice, setMinPrice] = useState<number>(clamp(initialMinPrice, 0, initialMaxPrice));
  const [maxPrice, setMaxPrice] = useState<number>(clamp(initialMaxPrice, initialMinPrice, 100));

  // ✅ Reset All function (full reset)
  const resetAll = () => {
    setSelectedModules(new Set(modules));
    setSelectedIssues(new Set(["Integrations", "Core HCM"]));
    setSelectedRanges(new Set());
    setLevelMin(clamp(initialLevelMin, 0, initialLevelMax));
    setLevelMax(clamp(initialLevelMax, initialLevelMin, 100));
    setMinPrice(clamp(initialMinPrice, 0, initialMaxPrice));
    setMaxPrice(clamp(initialMaxPrice, initialMinPrice, 100));
    onReset?.();
  };

  const selectToSet = (setter: any, v: string) =>
    setter((prev: Set<string>) => (prev.has(v) ? prev : new Set(prev).add(v)));
  const unselectFromSet = (setter: any, v: string) =>
    setter((prev: Set<string>) => {
      if (!prev.has(v)) return prev;
      const n = new Set(prev);
      n.delete(v);
      return n;
    });

  return (
    <aside className="lg:col-span-3 fixed right-0 top-[60px] w-[330px] bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 px-4 py-3">
      <div className="max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">×</span>
            <h3 className="text-sm font-semibold">{title}</h3>
          </div>
          <button
            onClick={resetAll}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 shadow-sm dark:bg-blue-500/15 dark:text-blue-300 dark:shadow-none hover:bg-blue-100 dark:hover:bg-blue-500/20 transition"
          >
            Reset
          </button>
        </div>

        {/* Module */}
        <Section title="Module">
          <div className="flex flex-wrap gap-2">
            {modules.map((m) => (
              <Chip
                key={m}
                label={m}
                selected={selectedModules.has(m)}
                onSelect={() => selectToSet(setSelectedModules, m)}
                onUnselect={() => unselectFromSet(setSelectedModules, m)}
              />
            ))}
          </div>
        </Section>

        {/* Common Issues (selected few) */}
        <Section title="Common Issues">
          <div className="flex flex-wrap gap-2">
            {issuePool.map((c) => (
              <Chip
                key={c}
                label={c}
                selected={selectedIssues.has(c)}
                onSelect={() => selectToSet(setSelectedIssues, c)}
                onUnselect={() => unselectFromSet(setSelectedIssues, c)}
              />
            ))}
          </div>
        </Section>

        {/* Common Issues (ranges) */}
        <Section title="Common Issues">
          <div className="flex flex-wrap gap-2">
            {ranges.map((t) => (
              <Chip
                key={t}
                label={t}
                selected={selectedRanges.has(t)}
                onSelect={() => selectToSet(setSelectedRanges, t)}
                onUnselect={() => unselectFromSet(setSelectedRanges, t)}
              />
            ))}
          </div>
        </Section>

        {/* Levels (dual-handle, no inputs) */}
        <Section title="Levels">
          <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>0L</span>
            <span>100L</span>
          </div>

          <div className="relative pt-6">
            {/* bubbles for both knobs */}
            <span
              className="pointer-events-none absolute -top-1 -translate-x-1/2 rounded-full bg-blue-50 px-2 py-[2px] text-[10px] font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
              style={{ left: `calc(${levelMin}% )` }}
            >
              {levelMin}L
            </span>
            <span
              className="pointer-events-none absolute -top-1 -translate-x-1/2 rounded-full bg-blue-50 px-2 py-[2px] text-[10px] font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
              style={{ left: `calc(${levelMax}% )` }}
            >
              {levelMax}L
            </span>

            {/* filled segment between min..max */}
            <div
              className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full"
              style={{
                background: `linear-gradient(90deg,
                  var(--track-rest) 0%,
                  var(--track-rest) ${levelMin}%,
                  #3b82f6 ${levelMin}%,
                  #3b82f6 ${levelMax}%,
                  var(--track-rest) ${levelMax}%,
                  var(--track-rest) 100%)`,
              } as React.CSSProperties}
            />

            {/* ruler ticks */}
            <div
              className="absolute left-0 right-0 top-[36px] h-6"
              style={{
                background:
                  "repeating-linear-gradient(to right, transparent 0 8px, var(--tick) 8px 9px)",
              } as React.CSSProperties}
            />

            {/* min handle (blue) */}
            <input
              type="range"
              min={0}
              max={100}
              value={levelMin}
              onChange={(e) => {
                const v = clamp(Number(e.target.value), 0, levelMax);
                setLevelMin(v);
              }}
              className="relative z-10 w-full appearance-none"
              style={rangeStyles({ thumbColor: "#3b82f6" })}
            />
            {/* max handle (white) */}
            <input
              type="range"
              min={0}
              max={100}
              value={levelMax}
              onChange={(e) => {
                const v = clamp(Number(e.target.value), levelMin, 100);
                setLevelMax(v);
              }}
              className="absolute inset-0 z-20 w-full appearance-none"
              style={rangeStyles({ thumbColor: "#ffffff" })}
            />
          </div>
        </Section>

        {/* Price range (dual-handle + inputs) */}
        <Section title="Price range">
          <div className="mb-2 flex items-center gap-2">
            <Bubble>${minPrice}</Bubble>
            <Bubble>${maxPrice}</Bubble>
          </div>

          <div className="relative">
            <div
              className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full"
              style={{
                background: `linear-gradient(90deg,
                  var(--track-rest) 0%,
                  var(--track-rest) ${minPrice}%,
                  #3b82f6 ${minPrice}%,
                  #3b82f6 ${maxPrice}%,
                  var(--track-rest) ${maxPrice}%,
                  var(--track-rest) 100%)`,
              } as React.CSSProperties}
            />
            {/* min handle */}
            <input
              type="range"
              min={0}
              max={100}
              value={minPrice}
              onChange={(e) => setMinPrice(clamp(Number(e.target.value), 0, maxPrice))}
              className="relative z-10 w-full appearance-none"
              style={rangeStyles({ thumbColor: "#3b82f6" })}
            />
            {/* max handle (white) */}
            <input
              type="range"
              min={0}
              max={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(clamp(Number(e.target.value), minPrice, 100))}
              className="absolute inset-0 z-20 w-full appearance-none"
              style={rangeStyles({ thumbColor: "#ffffff" })}
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <EditableField
              label="Min"
              placeholder={minBoxPlaceholder}
              value={`$ ${minPrice}`}
              onChange={(raw) => setMinPrice(clamp(parseCurrency(raw), 0, maxPrice))}
            />
            <EditableField
              label="Max"
              placeholder={maxBoxPlaceholder}
              value={`$ ${maxPrice}`}
              onChange={(raw) => setMaxPrice(clamp(parseCurrency(raw), minPrice, 100))}
            />
          </div>
        </Section>
      </div>

      {/* theme CSS vars for tracks & ticks */}
      <style>{`
        aside[class*="w-[330px]"] { --track-rest: #e5edf9; --tick: #d8dee9; }
        .dark aside[class*="w-[330px]"] { --track-rest: rgba(148,163,184,.2); --tick: rgba(148,163,184,.35); }
      `}</style>
    </aside>
  );
}

/* ---------------- UI atoms ---------------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}

function Chip({
  label,
  selected,
  onSelect,
  onUnselect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  onUnselect: () => void;
}) {
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm shadow-sm transition
      ${
        selected
          ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-400/30"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800/70 dark:text-slate-200 dark:border-slate-700"
      }`}
    >
      <button type="button" onClick={() => !selected && onSelect()} className="outline-none">
        {label}
      </button>
      {selected && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onUnselect();
          }}
          className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-white/70 text-slate-500 hover:bg-white dark:bg-slate-700 dark:text-slate-200"
          title="Remove"
        >
          ×
        </button>
      )}
    </div>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-blue-50 px-2 py-[2px] text-[11px] font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
      {children}
    </span>
  );
}

function EditableField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-slate-500 dark:text-slate-400">{label}</div>
      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none"
          inputMode="numeric"
        />
      </div>
    </label>
  );
}

/* --------------- Utilities --------------- */
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
function parseCurrency(s: string) {
  const m = s.replace(/[^\d]/g, "");
  return m === "" ? 0 : Number(m);
}

/* ---------- Range thumbs (global CSS recommended) ---------- */
function rangeStyles({
  thumbColor = "#3b82f6",
  ring = "rgba(59,130,246,.25)",
}: {
  thumbColor?: string;
  ring?: string;
}): React.CSSProperties {
  return {
    height: 32,
    background: "transparent",
    WebkitAppearance: "none",
    outline: "none",
    ["--thumb" as any]: thumbColor,
    ["--ring" as any]: ring,
  } as React.CSSProperties;
}
