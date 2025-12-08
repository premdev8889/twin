// src/pages/TwinDetailPage.tsx
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Bell,
  Star,
  ChevronLeft,
  BadgeCheck,
  Bookmark,
  Info,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { getTwinBySlug } from "../data/twinsData";

/** ultra-thin sparkline exactly like screenshot */
function Sparkline({ series }: { series: number[] }) {
  const points = useMemo(() => {
    if (!series.length) return "";
    const max = Math.max(...series);
    const min = Math.min(...series);
    const W = 240,
      H = 62,
      P = 6;
    return series
      .map((v, i) => {
        const x = P + (i * (W - P * 2)) / (series.length - 1);
        const y = H - P - ((v - min) / (max - min || 1)) * (H - P * 2);
        return `${x},${y}`;
      })
      .join(" ");
  }, [series]);

  return (
    <svg width="100%" height="62" viewBox="0 0 240 62" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TwinDetailPage() {
  const { slug } = useParams();
  const twin = slug ? getTwinBySlug(slug) : undefined;

  // -------- Tabs state + demo data --------
  const [activeTab, setActiveTab] = useState<"details" | "comments" | "issues">("details");

  const comments = useMemo(
    () => [
      { id: 1, user: "Ava Patel", text: "Great breakdown on RCA steps. Helped fix a 401 timeout." },
      { id: 2, user: "Liam Roy", text: "Need sample PECI mapping for Payroll integrations?" },
      { id: 3, user: "Sarah Khan", text: "Studio error handling pattern works perfectly!" },
      { id: 4, user: "Raj Verma", text: "Any guideline for token refresh retries?" },
      { id: 5, user: "Mia Chen", text: "Please add BP step validation matrix." },
      { id: 6, user: "Noah Green", text: "Domain security checklist was spot on." },
      { id: 7, user: "Ishan Shah", text: "Certificate expiry alerts helped avoid outage." },
      { id: 8, user: "Emily Hart", text: "Looking for example test cases generation." },
      { id: 9, user: "Zara Ali", text: "Core Connector vs Studio—when to pick?" },
      { id: 10, user: "Kunal Rao", text: "Thanks! Fixed 403 due to missing scopes." },
      { id: 11, user: "Ana Gomez", text: "Please share DT transform best practices." },
      { id: 12, user: "Jon Park", text: "Caching strategy for REST calls?" },
    ],
    []
  );

  const issues = useMemo(
    () => [
      { id: "WDI-214", title: "401 Unauthorized on outbound REST", severity: "High", status: "Resolved" },
      { id: "WDI-198", title: "PECI mismatch for terminated workers", severity: "Medium", status: "In Progress" },
      { id: "WDI-176", title: "BP step stuck due to security domain", severity: "High", status: "Resolved" },
      { id: "WDI-151", title: "Connector timeout during bulk run", severity: "Low", status: "Open" },
      { id: "WDI-139", title: "Certificate nearing expiry", severity: "Medium", status: "Resolved" },
      { id: "WDI-127", title: "DT map error on nested fields", severity: "Low", status: "Resolved" },
      { id: "WDI-118", title: "403 forbidden on RaaS", severity: "High", status: "Resolved" },
      { id: "WDI-104", title: "Studio retry policy misconfigured", severity: "Medium", status: "Open" },
      { id: "WDI-092", title: "Pagination error for EIB export", severity: "Low", status: "Resolved" },
      { id: "WDI-081", title: "PECI file missing delta rows", severity: "Medium", status: "Resolved" },
      { id: "WDI-072", title: "Throttling limits exceeded", severity: "High", status: "In Progress" },
      { id: "WDI-060", title: "Core Connector mapping gaps", severity: "Low", status: "Resolved" },
      { id: "WDI-051", title: "Studio log rotation too low", severity: "Low", status: "Open" },
      { id: "WDI-043", title: "Webhook signature validation", severity: "Medium", status: "Resolved" },
      { id: "WDI-036", title: "Test data parity issues", severity: "Low", status: "Resolved" },
      { id: "WDI-028", title: "RCA report template request", severity: "Low", status: "Open" },
    ],
    []
  );

  if (!twin) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-[1180px]">
          <Link to="/" className="inline-flex items-center gap-2 text-sky-600 text-[14px]">
            <ChevronLeft size={18} /> Back
          </Link>
          <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
            <h1 className="text-[18px] font-semibold">Twin not found</h1>
            <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-300">Please go back and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto px-[18px] py-[18px]">
        {/* HEADER */}
        <div className="flex items-start justify-between rounded-[20px] border border-sky-100 bg-white/80 p-[16px] pb-0 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60">
          <div className="flex items-start gap-[14px]">
            <img src={twin.avatar} className="h-[100px] w-[100px] rounded-[14px] shadow-sm" alt={twin.name} />
            <div className="pt-[2px]">
              <h1 className="text-[22px] font-semibold leading-[26px]">{twin.role}</h1>

              {/* badges row */}
              <div className="mt-[8px] flex flex-wrap items-center gap-[6px]">
                {(twin.badges ?? ["AI Tools", "Design", "Strategy", "Content"]).map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-blue-100/30 px-[10px] py-[3px] text-[12px] text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* sub description */}
              <p className="mt-[10px] max-w-[760px] text-[16px] leading-[26px] text-slate-600 dark:text-slate-300">
                This Digital Twin is trained on 12+ years of real Workday Integration experience— including Studio,
                EIBs, PECI, Core Connectors, DT, and REST/SOAP APIs.
              </p>

              {/* published by */}
              <div className="flex justify-between">
                <div className="mt-[10px] inline-flex items-center gap-[8px] text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-slate-500 text-sm">Published by:</span>
                  <div className="bg-blue-100/30 flex gap-2 py-2 px-3 rounded-full align-center">
                    <img src={twin.avatar} className="h-6 w-6 rounded-full" alt={twin.publishedBy.name} />
                    <span className="font-medium text-sm">{twin.publishedBy.name} </span>
                    <BadgeCheck size={22} fill="#3084F1" color="#fff" />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-[14px] border-b border-slate-200">
                <div className="flex items-center gap-[8px]">
                  {[
                    { key: "details" as const, label: "Details", icon: Info },
                    { key: "comments" as const, label: "Comments", icon: MessageSquare, count: comments.length },
                    { key: "issues" as const, label: "Issue", icon: AlertTriangle, count: issues.length },
                  ].map((t) => {
                    const active = activeTab === t.key;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        role="tab"
                        aria-selected={active}
                        className={`relative inline-flex items-center gap-[8px] px-[16px] py-[8px] text-sm font-medium border-b-2 ${
                          active
                            ? "text-sky-600 border-sky-500"
                            : "text-slate-600 border-transparent hover:text-slate-800"
                        }`}
                      >
                        <Icon size={15} className={active ? "text-sky-600" : "text-slate-400"} />
                        <span>{t.label}</span>
                        {typeof t.count === "number" && (
                          <span
                            className={`ml-[6px] rounded-full px-[8px] py-[2px] text-[12px] ${
                              active ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {t.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT header actions */}
          <div className="flex flex-col justify-between gap-[100px] min-h-[100%]">
            <div className="flex items-center justify-end gap-[10px]">
              <button className="h-[36px] rounded-[10px] bg-sky-600 px-[14px] text-sm font-medium text-white shadow">
                Subscribe
              </button>
              <button className="grid h-[36px] w-[36px] place-items-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                <Bell size={18} />
              </button>
              <button className="grid h-[36px] w-[36px] place-items-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                <Bookmark size={18} />
              </button>
            </div>
            <div className="mt-[10px] flex flex-wrap gap-[8px]">
              {[
                {
                  label: "Rating",
                  value: (
                    <span className="inline-flex items-center gap-1">
                      <Star size={15} className="text-amber-500" /> {twin.rating}
                    </span>
                  ),
                },
                { label: "Levels", value: twin.levels },
                { label: "Subscribed", value: twin.subscribed },
                { label: "Exp. Years", value: `${twin.expYears}+` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="inline-flex items-center gap-[8px] rounded-[12px] bg-slate-100/60 px-[12px] py-[8px] text-[12px] text-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                >
                  <span className="opacity-70">{s.label}</span>
                  <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="mt-[14px] grid grid-cols-12 gap-[14px]">
          {/* LEFT column */}
          <div className="col-span-12 space-y-[14px] lg:col-span-6">
            {activeTab === "details" && (
              <div className="bg-white p-8 rounded-2xl h-[100%]">
                <Card title="Model Introduction">
                  <p className="text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    {twin.modelIntroduction}
                  </p>
                </Card>

                <Card title="Key Capabilities">
                  <ul className="list-disc space-y-[4px] pl-[18px] text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    {twin.capabilities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </Card>

                <Card title="Description">
                  <p className="text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    {twin.description}
                  </p>
                  <ul className="mt-[10px] list-disc space-y-[4px] pl-[18px] text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    <li>End-to-end integration design</li>
                    <li>RCA for failed inbound/outbound flows</li>
                    <li>Security troubleshooting</li>
                    <li>Performance optimization</li>
                    <li>Functional-technical impact analysis</li>
                    <li>Release readiness preparation</li>
                  </ul>
                  <p className="mt-[10px] text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    It incorporates real client patterns, error logs, test data, and expert-level reasoning to deliver
                    accurate, production-safe suggestions.
                  </p>
                </Card>
              </div>
            )}

            {activeTab === "comments" && (
              <Card title={`Comments (${comments.length})`}>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {comments.map((cmt) => (
                    <li key={cmt.id} className="py-[10px]">
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{cmt.user}</div>
                      <div className="mt-[2px] text-sm text-slate-600 dark:text-slate-300">{cmt.text}</div>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {activeTab === "issues" && (
              <Card title={`Issues (${issues.length})`}>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {issues.map((it) => (
                    <li key={it.id} className="flex items-center justify-between py-[10px]">
                      <div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                          {it.id} — {it.title}
                        </div>
                        <div className="mt-[2px] text-[12px] text-slate-500">{it.status}</div>
                      </div>
                      <span
                        className={`rounded-full px-[10px] py-[3px] text-[12px] ${
                          it.severity === "High"
                            ? "bg-rose-100 text-rose-700"
                            : it.severity === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {it.severity}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* RIGHT column (always visible) */}
          <div className="col-span-12 space-y-[14px] lg:col-span-6">
            <div className="bg-white p-8 rounded-2xl">
                <Card title="About">
              <p className="text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                Digital Twin of a Senior Workday Integration Consultant. Trained on real-world projects across banking,
                retail, utilities, and global HR transformations. Continuously improved with new cases and Workday
                release updates.
              </p>
            </Card>

            <Card title="Last Month Activity">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[22px] font-semibold leading-none">
                    {twin.interactionsLastMonth.toLocaleString()}
                  </div>
                  <div className="mt-[4px] text-sm text-slate-500">
                    (problem analysis, RCA, test generation, step validation)
                  </div>
                </div>
                <div className="w-[130px] text-sky-600">
                  <Sparkline series={twin.activitySeries} />
                </div>
              </div>
            </Card>

            <Card title="Skills & Expertise Tags">
              <div className="flex flex-wrap gap-[10px]">
                {twin.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full  bg-blue-100/30 px-[10px] py-[3px] text-[14px] text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>

            <Card title="Metrics">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ["Expertise Score", twin.metrics.expertiseScore],
                  ["Verified Use Cases", twin.metrics.verifiedUseCases],
                  ["Issues Resolved", twin.metrics.issuesResolved],
                  ["Automation Success Rate", twin.metrics.automationSuccessRate],
                  ["Client Saves", twin.metrics.clientSaves],
                  ["Last Updated", `${twin.lastUpdatedDays} days ago`],
                ].map(([k, v]) => (
                  <li key={String(k)} className="flex items-center justify-between py-[8px] text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <b className="text-slate-900 dark:text-slate-100">{String(v)}</b>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Published By">
              <div className="flex items-center gap-[10px]">
                <img src={twin.avatar} className="h-[40px] w-[40px] rounded-full" alt={twin.publishedBy.name} />
                <div className="text-[14px] leading-[20px]">
                  <div className="font-medium text-sm">{twin.publishedBy.name}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">{twin.publishedBy.title}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">
                    {twin.publishedBy.exp} • {twin.publishedBy.projects}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">{twin.publishedBy.org}</div>
                </div>
              </div>
            </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable card */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className=" mb-6">
      <div className="mb-[8px] flex items-center justify-between">
        <h3 className="text-[20px] font-semibold leading-[18px] mb-2">{title}</h3>
      </div>
      {children}
    </div>
  );
}
