// src/pages/TwinDetailPage.tsx
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  BadgeCheck,
  Bookmark,
  Info,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { getTwinBySlug } from "../data/twinsData";
import PaymentModal from "../components/sections/PaymentModal";

/** ultra-thin sparkline exactly like screenshot (responsive width) */
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
  const [activeTab, setActiveTab] = useState<"Overview" | "Reviews & Feedback">("Overview");

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
      {
        id: "WDI-214",
        title: "401 Unauthorized on outbound REST",
        severity: "High",
        status: "Resolved",
      },
      {
        id: "WDI-198",
        title: "PECI mismatch for terminated workers",
        severity: "Medium",
        status: "In Progress",
      },
      {
        id: "WDI-176",
        title: "BP step stuck due to security domain",
        severity: "High",
        status: "Resolved",
      },
      {
        id: "WDI-151",
        title: "Connector timeout during bulk run",
        severity: "Low",
        status: "Open",
      },
      {
        id: "WDI-139",
        title: "Certificate nearing expiry",
        severity: "Medium",
        status: "Resolved",
      },
      {
        id: "WDI-127",
        title: "DT map error on nested fields",
        severity: "Low",
        status: "Resolved",
      },
      { id: "WDI-118", title: "403 forbidden on RaaS", severity: "High", status: "Resolved" },
      {
        id: "WDI-104",
        title: "Studio retry policy misconfigured",
        severity: "Medium",
        status: "Open",
      },
      {
        id: "WDI-092",
        title: "Pagination error for EIB export",
        severity: "Low",
        status: "Resolved",
      },
      {
        id: "WDI-081",
        title: "PECI file missing delta rows",
        severity: "Medium",
        status: "Resolved",
      },
      {
        id: "WDI-072",
        title: "Throttling limits exceeded",
        severity: "High",
        status: "In Progress",
      },
      { id: "WDI-060", title: "Core Connector mapping gaps", severity: "Low", status: "Resolved" },
      { id: "WDI-051", title: "Studio log rotation too low", severity: "Low", status: "Open" },
      {
        id: "WDI-043",
        title: "Webhook signature validation",
        severity: "Medium",
        status: "Resolved",
      },
      { id: "WDI-036", title: "Test data parity issues", severity: "Low", status: "Resolved" },
      { id: "WDI-028", title: "RCA report template request", severity: "Low", status: "Open" },
    ],
    []
  );

  if (!twin) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 dark:bg-slate-950">
        <div className="mx-auto w-full max-w-6xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sky-600 text-[14px]">
            <ChevronLeft size={18} /> Back
          </Link>
          <div className="mt-4 sm:mt-6 rounded-[18px] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
            <h1 className="text-[18px] font-semibold">Twin not found</h1>
            <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-300">
              Please go back and try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen  text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full  mt-10">
        {/* HEADER */}
        <div
          className="
            flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-5
            rounded-[20px] border border-sky-100 bg-white/80 p-4 sm:p-5 shadow-sm backdrop-blur-sm
            dark:border-slate-700 dark:bg-slate-900/60
          "
        >
          {/* Left cluster (image + info) */}
          <div className="flex items-start gap-3 sm:gap-4">
            <img
              src={twin.productImg}
              className="h-[88px] w-[88px] sm:h-[100px] sm:w-[100px] rounded-[14px] shadow-sm object-cover"
              alt={twin.name}
            />
            <div className="pt-[2px] min-w-0">
              <h1 className="text-[20px] sm:text-[22px] font-semibold leading-[26px]">
                <Link
                  to={`/author/${twin.publishedBy.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:underline"
                >
                  {twin.role}
                </Link>
              </h1>

              {/* badges row */}
              <div className="mt-2 flex flex-wrap items-center gap-[6px]">
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
              <p className="mt-2 sm:mt-[10px] max-w-[760px] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-slate-600 dark:text-slate-300">
                This Digital Twin is trained on 12+ years of real Workday Integration experience—
                including Studio, EIBs, PECI, Core Connectors, DT, and REST/SOAP APIs.
              </p>

              {/* published by */}
              <div className="mt-2 sm:mt-[10px] inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 text-sm">Published by:</span>
                <Link
                  to={`/authors/${twin.publishedBy.name.toLowerCase().replace(/\s+/g, "-")}`}
                  state={{
                    type: "author",
                    author: twin.publishedBy,
                    avatar: twin.avatar,
                    role: twin.role,
                    subscribed: twin.subscribed,
                  }}
                  className="bg-blue-100/30 flex gap-2 py-1.5 sm:py-2 px-3 rounded-full items-center hover:bg-blue-200/50 transition"
                >
                  <img
                    src={twin.avatar}
                    className="h-6 w-6 rounded-full"
                    alt={twin.publishedBy.name}
                  />
                  <span className="font-medium text-sm">{twin.publishedBy.name}</span>
                  <BadgeCheck size={20} fill="#3084F1" color="#fff" />
                </Link>
              </div>

              {/* Tabs (scroll on mobile) */}
              <div className="mt-3 sm:mt-[14px] border-b border-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  {[
                    { key: "Overview" as const, label: "Overview", icon: Info },

                    {
                      key: "Reviews & Feedback" as const,
                      label: "Reviews & Feedback",
                      icon: AlertTriangle,
                      count: issues.length,
                    },
                  ].map((t) => {
                    const active = activeTab === t.key;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        role="tab"
                        aria-selected={active}
                        className={`relative inline-flex items-center gap-2 px-3 sm:px-[16px] py-2 text-sm font-medium border-b-2 ${
                          active
                            ? "text-sky-600 border-sky-500"
                            : "text-slate-600 border-transparent hover:text-slate-800"
                        }`}
                      >
                        <Icon size={15} className={active ? "text-sky-600" : "text-slate-400"} />
                        <span>{t.label}</span>
                        {typeof t.count === "number" && (
                          <span
                            className={`ml-1 rounded-full px-2 py-[2px] text-[12px] ${
                              active ? "bg-sky-50 text-sky-700" : "bg-sky-500 text-white"
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

          {/* RIGHT header actions + stats (wrap on mobile) */}
          <div className="flex flex-col gap-3 sm:gap-[150px] lg:items-end h-full">
            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-[10px]">
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-[36px] rounded-[10px] bg-sky-600 px-[14px] text-sm font-medium text-white shadow hover:bg-sky-700 transition"
              >
                Hire
              </button>

              <button className="grid h-[36px] w-[36px] place-items-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                <Bookmark size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-[8px]">
              {[
                // {
                //   label: "Rating",
                //   value: (
                //     <span className="inline-flex items-center gap-1">
                //       <Star size={15} className="text-amber-500" /> {twin.rating}
                //     </span>
                //   ),
                // },
                { label: "Levels", value: twin.levels },
                // { label: "Subscribed", value: twin.subscribed },
                { label: "Exp. Years", value: `${twin.expYears}+` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="inline-flex items-center gap-[8px] rounded-[12px] bg-sky-600 px-[12px] py-[8px] text-[12px] text-white dark:bg-slate-800/70 dark:text-slate-200"
                >
                  <span className="">{s.label}</span>
                  <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>

            <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="mt-4 sm:mt-[14px] grid grid-cols-12 gap-4 sm:gap-[14px]">
          {/* LEFT column */}
          <div className="col-span-12 space-y-4 sm:space-y-[14px] lg:col-span-6">
            {activeTab === "Overview" && (
              <div className="bg-white p-5 sm:p-8 rounded-2xl space-y-6">
                {/* Capabilities */}
                <Card title="Capabilities">
                  <ul className="list-disc space-y-[6px] pl-[18px] text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    <li>
                      Design and debug complex Workday integrations (Studio, EIB, PECI, Core
                      Connectors)
                    </li>
                    <li>
                      Perform deep Root Cause Analysis (RCA) for failed inbound and outbound flows
                    </li>
                    <li>Resolve security, authentication, and domain-related integration issues</li>
                    <li>Generate test cases, validation steps, and impact analysis for releases</li>
                    <li>Optimize performance for large-volume and scheduled integrations</li>
                    <li>
                      Guide best practices for error handling, retries, and logging strategies
                    </li>
                  </ul>
                </Card>

                {/* How It Thinks */}
                <Card title="How It Thinks">
                  <p className="text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    This Digital Twin follows a structured, expert-level reasoning approach similar
                    to a senior Workday Integration consultant.
                  </p>

                  <ul className="mt-3 list-disc space-y-[6px] pl-[18px] text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    <li>Analyzes logs, payloads, and error codes before suggesting solutions</li>
                    <li>Breaks down issues into functional, technical, and security layers</li>
                    <li>Maps symptoms to known real-world integration patterns and failures</li>
                    <li>Validates assumptions using past project scenarios and proven fixes</li>
                    <li>Explains the “why” behind every recommendation, not just the “what”</li>
                  </ul>

                  <p className="mt-3 text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    The goal is not quick guesses, but accurate, production-safe guidance that
                    mirrors real consultant decision-making.
                  </p>
                </Card>

                {/* Activity & Accuracy */}
                <Card title="Activity & Accuracy">
                  <ul className="list-disc space-y-[6px] pl-[18px] text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    <li>
                      Trained on 12+ years of real Workday integration scenarios and client cases
                    </li>
                    <li>
                      Handles hundreds of issue patterns including PECI, Studio, REST, and security
                      errors
                    </li>
                    <li>
                      Maintains high accuracy by referencing validated use cases and resolved
                      incidents
                    </li>
                    <li>
                      Continuously improves responses based on successful resolutions and feedback
                    </li>
                    <li>Designed to minimize trial-and-error and reduce time to resolution</li>
                  </ul>

                  <p className="mt-3 text-sm leading-[22px] text-slate-700 dark:text-slate-300">
                    This ensures consistent, reliable answers that teams can confidently apply in
                    enterprise production environments.
                  </p>
                </Card>
              </div>
            )}

            {activeTab === "Reviews & Feedback" && (
              <div className="bg-white p-5 sm:p-8 rounded-2xl space-y-6">
                {/* Rating Summary */}
                <Card title="Rating & Reviews">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 gap-6">
                    {/* Left: Avg Rating */}
                    <div className="flex items-center gap-4">
                      <div className="text-[40px] font-semibold leading-none text-slate-900">
                        {twin.rating}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {"★★★★★".slice(0, Math.round(twin.rating))}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          Based on {comments.length} reviews
                        </div>
                      </div>
                    </div>

                    {/* Right: Rating Distribution */}
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((r) => (
                        <div key={r} className="flex items-center gap-3">
                          <span className="w-6 text-sm text-slate-600">{r}★</span>
                          <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-amber-400"
                              style={{ width: `${r === 5 ? 62 : r === 4 ? 23 : 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Reviews List */}
                <Card title={`User Reviews (${comments.length})`}>
                  <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                    {comments.map((cmt) => (
                      <li key={cmt.id} className="py-[14px]">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            {cmt.user}
                          </div>
                          <div className="flex items-center gap-[2px] text-amber-400 text-sm">
                            ★★★★☆
                          </div>
                        </div>
                        <p className="mt-[4px] text-sm text-slate-600 dark:text-slate-300">
                          {cmt.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}
          </div>

          {/* RIGHT column */}
          <div className="col-span-12 space-y-4 sm:space-y-[14px] lg:col-span-6">
            <div className="bg-white p-5 sm:p-8 rounded-2xl h-full">
              <Card title="Last Month Activity">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <div className="text-[20px] sm:text-[22px] font-semibold leading-none">
                      {twin.interactionsLastMonth.toLocaleString()}
                    </div>
                    <div className="mt-[4px] text-sm text-slate-500">
                      (problem analysis, RCA, test generation, step validation)
                    </div>
                  </div>
                  <div className="w-full sm:w-[220px] md:w-[260px] lg:w-[280px] text-sky-600">
                    <Sparkline series={twin.activitySeries} />
                  </div>
                </div>
              </Card>

              <Card title="Expertise Tags">
                <div className="flex flex-wrap gap-[10px]">
                  {twin.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-blue-100/30 px-[10px] py-[3px] text-[14px] text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Card>

              <Card title="Metrics">
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ["Experience (Years)", twin.metrics.expertiseScore],
                    ["Accuracy Level", twin.metrics.verifiedUseCases],
                    ["Hired ", twin.metrics.issuesResolved],
                    ["Scenarios", twin.metrics.automationSuccessRate],
                    ["last Improved", twin.metrics.clientSaves],
                    ["Last Updated", `${twin.lastUpdatedDays} days ago`],
                  ].map(([k, v]) => (
                    <li
                      key={String(k)}
                      className="flex items-center justify-between py-[8px] text-sm"
                    >
                      <span className="text-slate-600 dark:text-slate-300">{k}</span>
                      <b className="text-slate-900 dark:text-slate-100">{String(v)}</b>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Published By">
                <div className="flex items-center gap-[10px] ">
                  <img
                    src={twin.avatar}
                    className="h-[40px] w-[40px] rounded-full"
                    alt={twin.publishedBy.name}
                  />
                  <div className="text-[14px] leading-[20px]">
                    <div className="font-medium text-sm">{twin.publishedBy.name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                      {twin.publishedBy.title}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                      {twin.publishedBy.exp} • {twin.publishedBy.projects}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                      {twin.publishedBy.org}
                    </div>
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
    <div className="mb-6">
      <div className="mb-[8px] flex items-center justify-between">
        <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[18px] mb-2">{title}</h3>
      </div>
      {children}
    </div>
  );
}
