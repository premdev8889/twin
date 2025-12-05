import { BadgeCheck, Bookmark, ChevronsUp, Star } from "lucide-react";

type Twin = {
  avatar: string;
  name: string;
  role: string;
  tags?: string[];
  rating: string;        // "4.9"
  scenarios: string;     // "430+"
  subscribed: string;    // "1.3K"
  metaLeft?: string;     // "3.2L"
  metaMid?: string;      // "10+ years"
  metaRight?: string;    // "12 days Ago"
};

export default function CardProduct({
  avatar, name, role, tags = [],
  rating, scenarios, subscribed,
  metaLeft = "3.2L", metaMid = "10+ years", metaRight = "5 days Ago",
}: Twin) {
  return (
    <article className="
      bg-[#f9fbfc] border-[3px] border-white rounded-[20px] p-4 shadow-[0_12px_40px_-20px_rgba(59,130,246,0.25)]
      dark:bg-slate-900/60 dark:border-slate-700/60
    ">
      {/* top row */}
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="size-10 rounded-full object-cover" />
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="text-[16px] font-semibold truncate">{name}</h4>
            <span title="verified" className="text-sky-500"><BadgeCheck size={16} fill="#3084F1" color="#ffffffff" strokeWidth={1} /></span>
          </div>
          <p className="text-[12px] text-slate-500 dark:text-slate-400">{role}</p>
        </div>
        <button
          className="ml-auto size-9 grid place-items-center rounded-full border border-slate-200 text-slate-500
                     hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
          title="more"
        ><Bookmark size={20}  fill="#000b19ff" strokeWidth={1} /></button>
      </div>

      {/* tags */}
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="
              text-[11px] px-2 py-1 rounded-lg
              border border-sky-200 text-sky-600 bg-sky-50
              dark:border-sky-800/60 dark:text-sky-300 dark:bg-sky-900/30
            ">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* stats */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="bg-white p-[8px] rouded-lg">
          <div className="text-[15px] font-bold flex align-center justify-center"><Star size={18} fill="#3084F1" strokeWidth={0} />{rating}</div>
          <div className="text-[11px] text-slate-500">Rating</div>
        </div>
        <div className="bg-white p-[8px] rouded-lg">
          <div className="text-[15px] font-bold">{scenarios}</div>
          <div className="text-[11px] text-slate-500">Scenarios</div>
        </div>
        <div className="bg-white p-[8px] rouded-lg">
          <div className="text-[15px] font-bold">{subscribed}</div>
          <div className="text-[11px] text-slate-500">Subscribed</div>
        </div>
      </div>

      {/* footer meta */}
      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1 bg-white rounded-lg p-2"><span><ChevronsUp size={18} color="#00040aff" strokeWidth={1.5} /></span>{metaLeft}</div>
        <div>{metaMid}</div>
        <div>{metaRight}</div>
      </div>
    </article>
  );
}
