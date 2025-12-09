import { BadgeCheck, Bell, ChevronDown, ExternalLink, MapPin } from "lucide-react";
import CardProduct from "../components/ui/CardProduct";

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





export default function ProfileUI() {
  const contributions = Array.from({ length: 371 }, () => Math.floor(Math.random() * 4));

  const months = [
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ];
  const days = ["Mon", "Wed", "Fri"];

  return (
    <div className="min-h-screen ">
      {/* Header with gradient background */}

      {/* Profile Card */}
      <div className=" mx-auto px-6 mt-5">
        <div className="bg-white rounded-3xl shadow-sm ">
          <div
            className="h-32 w-full bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: "url('../assets/authorbg.png')" }}
          ></div>
          <div className="flex items-start justify-between p-6">
            <div className="flex gap-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-white shadow-md object-cover -mt-[60px]"
                />
                <div className="absolute top-6 -right-1   flex items-center justify-center">
                  <BadgeCheck size={35} fill="#599ce2" color="#fff"/>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">Noah Carter</h1>
                  <span className="text-green-500 text-2xl leading-none">•</span>
                </div>
                <p className="text-gray-600 text-sm mt-0.5">Senior Workday Integration Architect</p>
                <p className="text-gray-700 text-sm mt-2 max-w-2xl">
                  I am a Senior Workday Integration Architect with 12+ years of experience.
                </p>
                <div className="flex gap-6 mt-3 text-sm ">
                  <span className="bg-blue-100/40 py-1 px-3 rounded-md flex gap-2">
                    <span className="font-semibold text-blue-500">24.3k</span>{" "}
                    <span className="text-blue-500">Followers</span>
                  </span>
                  <span className="bg-blue-100/40 py-1 px-3 rounded-md flex gap-2">
                    <span className="font-semibold text-blue-500">88</span>
                    {"  "}
                    <span className=" text-blue-500">Following</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[40px] flex-col justify-between ">
              <div className="flex item-center gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
                  + Follow
                </button>
                <button className="h-10 w-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 shadow-lg">
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div className="hidden md:flex gap-2">
                <img
                  src="../assets/Badge.png"
                  alt="Badge 1"
                  className="h-9 w-9 rounded-full object-cover  dark:ring-slate-700"
                />
                <img
                  src="../assets/Badge2.png"
                  alt="Badge 2"
                  className="h-9 w-9 rounded-full object-cover  dark:ring-slate-700"
                />
                <img
                  src="../assets/Badge3.png"
                  alt="Badge 3"
                  className="h-9 w-9 rounded-full object-cover  dark:ring-slate-700"
                />
                <img
                  src="../assets/Badge4.png"
                  alt="Badge 4"
                  className="h-9 w-9 rounded-full object-cover  dark:ring-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-6 mt-6 ">
        <div className="grid grid-cols-12 gap-6 pb-5">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-4 ">
            <div className=" bg-white shadow-sm rounded-xl p-5">
              <div className="mb-4 ">
                <h3 className="font-semibold text-sm mb-3 text-neutral-500">About me</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I'm a Workday Integration Specialist focused on building reliable, scalable, and
                  automation-driven solutions across global enterprises. I work at the intersection
                  of integrations, problem-solving, and process optimization—turning complex
                  requirements into clean, efficient workflows. My approach is simple: build fast,
                  build smart, and build with impact.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-sm mb-3 text-neutral-500">Experience</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  12+ years in Workday Integrations with 100+ solutions delivered across Studio,
                  PECI, EIBs, Connectors, and APIs. Strong in troubleshooting, optimization, and
                  mentoring teams.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-sm mb-4 text-neutral-500">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Creative", "Integrations", "Studio", "EIB", "CCB"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>London, E1 6AN, UK</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span>helloa.rt</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>graysonforage.12@gmail.com</span>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-3">
                  <div className="text-xs text-gray-500 mb-2">On The Web</div>
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="flex items-center justify-between p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 w-[50%] bg-black"
                    >
                      <div className="flex items-center  px-2">
                        <div className="h-7 w-7  text-white ">𝕏</div>
                        <span className="text-sm text-white">@mayal_twin12</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 w-[50%] bg-black"
                    >
                      <div className="flex items-center  px-2">
                        <div className="h-7 w-7  text-white ">in</div>
                        <span className="text-sm text-white">graysonforage</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Twins</h2>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">
                Latest <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {twins.map((t, i) => (
                <CardProduct key={i} {...t} />
              ))}
            </div>

            {/* Contribution Heatmap */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">126 Contributions in the last year</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="h-3 w-3 bg-gray-100 rounded-sm" />
                    <div className="h-3 w-3 bg-green-200 rounded-sm" />
                    <div className="h-3 w-3 bg-green-400 rounded-sm" />
                    <div className="h-3 w-3 bg-green-600 rounded-sm" />
                  </div>
                  <span>More</span>
                </div>
              </div>

              <div className="overflow-x-auto overflow-y-hidden">
                <div className="inline-flex gap-1">
                  <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
                    
                    {days.map((day) => (
                      <div key={day} className="h-3 flex items-center">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: 47 }).map((_, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {weekIndex % 4 === 0 && (
                          <div className="text-xs text-gray-500 h-3 flex items-center">
                            {months[Math.floor(weekIndex / 4)]}
                          </div>
                        )}
                        {weekIndex % 4 !== 0 && <div className="h-3" />}
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          const index = weekIndex * 7 + dayIndex;
                          const level = contributions[index] || 0;
                          const colors = [
                            "bg-gray-100",
                            "bg-green-200",
                            "bg-green-400",
                            "bg-green-600",
                          ];
                          return (
                            <div key={dayIndex} className={`h-3 w-3 rounded-sm ${colors[level]}`} />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">Learn how we count contributions</div>

              <div className="flex flex-wrap gap-2 mt-3">
                {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((year) => (
                  <button
                    key={year}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      year === 2025
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
