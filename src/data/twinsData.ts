// src/data/twinsData.ts
export type Twin = {
  slug: string;
  name: string;
  avatar: string;
  role: string;
  badges?: string[]; // e.g. ["AI Tools", "Design", "Strategy"]
  rating: number; // 4.9
  levels: string; // "3.2L"
  subscribed: string; // "1.3K"
  expYears: string; // "10+"
  lastUpdatedDays: number; // 12
  interactionsLastMonth: number; // 6345
  activitySeries: number[]; // for sparkline
  skills: string[];
  metrics: {
    expertiseScore: number;
    verifiedUseCases: number;
    issuesResolved: number;
    automationSuccessRate: string; // "3.2L"
    clientSaves: number;
  };
  modelIntroduction: string;
  capabilities: string[];
  description: string;
  about: string;
  publishedBy: {
    name: string;
    title: string;
    exp: string;
    projects: string;
    org: string;
  };
};

export const twinsData: Twin[] = [
  {
    slug: "creative-integration-twin",
    name: "Noah Carter",
    avatar: "../assets/vs.png",
    role: "Creative Integration Twin",
    badges: ["AI Tools", "Design", "Strategy", "Content"],
    rating: 4.9,
    levels: "3.2L",
    subscribed: "1.3K",
    expYears: "10+",
    lastUpdatedDays: 12,
    interactionsLastMonth: 6345,
    activitySeries: [3, 4, 4, 5, 6, 7, 5, 6, 7, 8, 7, 9, 10, 9, 11], // simple line
    skills: [
      "Core HCM",
      "Integrations",
      "Studio",
      "EIB",
      "CCB",
      "RaaS",
      "BP",
      "Time Tracking",
      "RCA",
      "Payroll PECI",
      "API",
      "Security",
    ],
    metrics: {
      expertiseScore: 98.4,
      verifiedUseCases: 152,
      issuesResolved: 214,
      automationSuccessRate: "3.2L",
      clientSaves: 23,
    },
    modelIntroduction:
      "This Digital Twin is trained on 12+ years of real Workday Integration experience including Studio, EIBs, PECI, Core Connectors, Document Transformation, and REST/SOAP APIs. It mirrors the consultant’s problem-solving patterns, decision flows, and RCA methodology.",
    capabilities: [
      "Troubleshoot Studio integration failures",
      "Fix PECI mismatches & payroll discrepancies",
      "Resolve BP step configuration issues",
      "Validate security & domain setup",
      "Optimize mappings & transformation logic",
      "Address timeouts, 401/403 errors, certificate expiry",
      "Auto-generate test cases & RCA reports",
      "Train juniors with real use-case breakdowns",
    ],
    description:
      "Supports full-cycle Workday Integration scenarios and acts as an expert assistant for design, RCA for failed flows, security troubleshooting, performance optimization, functional-technical impact analysis, and release readiness preparation. Incorporates client patterns, error logs, test data, and expert-level reasoning to deliver accurate, production-safe suggestions.",
    about:
      "Digital Twin of a Senior Workday Integration Consultant. Trained on real-world projects across banking, retail, utilities, and global HR transformations. Continuously improved with new cases and Workday release updates.",
    publishedBy: {
      name: "Noah Carter",
      title: "Senior Workday Integration Architect",
      exp: "12+ Years Experience",
      projects: "100+ Integrations Built",
      org: "Global Enterprise Delivery",
    },
  },
  {
    slug: "creative-bp-twin",
    name: "Jordan Blake",
    avatar: "https://i.pravatar.cc/64?img=22",
    role: "Creative BP Twin",
    rating: 4.8,
    levels: "2.9L",
    subscribed: "980",
    expYears: "9+",
    lastUpdatedDays: 18,
    interactionsLastMonth: 5210,
    activitySeries: [2, 3, 3, 4, 4, 5, 4, 6, 5, 6, 6, 7, 6, 7, 8],
    skills: ["BP", "Core HCM", "Time Tracking", "RCA"],
    metrics: {
      expertiseScore: 96.2,
      verifiedUseCases: 121,
      issuesResolved: 178,
      automationSuccessRate: "2.9L",
      clientSaves: 17,
    },
    modelIntroduction: "Focused on complex BP flows and validations.",
    capabilities: ["BP audits", "Fault remediation", "Impact analysis"],
    description: "Optimizes business process health and throughput.",
    about: "Continuously updated with latest BP patterns.",
    publishedBy: {
      name: "Jordan Blake",
      title: "Senior BP Consultant",
      exp: "9+ Years",
      projects: "80+ BP Programs",
      org: "Enterprise Delivery",
    },
  },
];

export const getTwinBySlug = (slug: string) => twinsData.find((t) => t.slug === slug);
