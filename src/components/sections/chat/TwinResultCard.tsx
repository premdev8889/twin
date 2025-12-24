import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  slug: string;
  avatar: string;
  name: string;
  subscribers: string;
  role: string;
  summary: string;
  year?: string;
  Scenarios?: string;
};

export default function TwinResultCard({
  slug,
  avatar,
  name,
  role,
  summary,
  subscribers,
  year = "",
  Scenarios = "",
}: Props) {
  return (
    <article
      className="
        rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm
        dark:border-slate-700 dark:bg-slate-900/60
        transition hover:shadow-md
      "
    >
      <div className="flex  sm:items-start gap-4">
        {/* Avatar */}
        <img
          src={avatar}
          className="size-12 sm:size-14 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm mx-auto sm:mx-0"
          alt={name}
        />

        {/* Content */}
        <div className=" sm:mt-0 flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {name}
                </h4>
                <span className="text-slate-500 text-[12px]" title="Subscribers">
                  {subscribers}
                </span>
              </div>
              <p className="text-[13px] sm:text-[14px] text-slate-500 dark:text-slate-400">
                {role}
              </p>
            </div>

            {/* Year / Scenarios */}
            {(year || Scenarios) && (
              <div className="flex flex-wrap gap-2 text-[11px] sm:text-[12px] text-slate-600 dark:text-slate-400">
                {year && (
                  <span className="border rounded-full px-2 py-1 dark:border-slate-700">
                    {year}
                  </span>
                )}
                {Scenarios && (
                  <span className="border rounded-full px-2 py-1 dark:border-slate-700">
                    {Scenarios}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          <p
            className="
              mt-2 text-sm text-slate-600 dark:text-slate-300
              leading-snug line-clamp-2 sm:line-clamp-3
            "
          >
            {summary}
          </p>

          {/* Buttons */}
          <div
            className="
              mt-4 flex flex-wrap sm:flex-nowrap items-center justify-start gap-2
            "
          >
            <Link
              to={`/authors/${slug}/chat`}
              state={{
                name,
                avatar,
                role,
                summary,
                // subscribers,
                // year,
                // Scenarios,
              }}
              className="
                rounded-full bg-gradient-to-tr from-sky-500 to-blue-500
                px-4 py-1.5 text-sm text-white font-medium shadow-sm
                hover:from-sky-600 hover:to-blue-600 transition
              "
            >
              More
            </Link>

            <Link
              to={`/twin/${slug}`}
              className="
                rounded-full border border-slate-200 bg-white
                px-4 py-1.5 text-sm text-slate-700 shadow-sm
                hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200
                transition
              "
            >
              Explore
            </Link>

            <button
              className="
                rounded-full border border-slate-200 bg-white p-2
                text-slate-700 shadow-sm hover:bg-slate-50
                dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200
                transition
              "
              aria-label="Save Twin"
            >
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
