import { BadgeCheck, Bookmark, Star, ChevronsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Twin = {
  avatar: string;
  name: string;
  role: string;
  rating: string;
  metaLeft: string;
  metaMid: string;
  scenarios: string;
  tags: string[];
  metaRight: string;
};

export default function CardProduct(props: Twin) {
  const navigate = useNavigate(); 
  const authorSlug = props.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      onClick={() => navigate(`/authors/${authorSlug}`, { state: { type: "author", ...props } })}
      className="
        cursor-pointer
        rounded-2xl bg-white
        px-5 py-4
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      "
    >
      {/* ---------- TOP ---------- */}
      <div className="flex items-center gap-3">
        <img
          src={props.avatar}
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h4 className="text-[15px] font-semibold">{props.name}</h4>
            <BadgeCheck size={16} className="text-blue-500" />
          </div>
          <p className="text-[12px] text-slate-500">{props.role}</p>
        </div>

        <div className="h-9 w-9 grid place-items-center rounded-full border">
          <Bookmark size={16} />
        </div>
      </div>

      {/* ---------- META PILLS ---------- */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 rounded-full bg-green-600 text-white px-2.5 py-1 text-[12px] font-semibold shadow-sm">
          <Star size={12} className="fill-white" />
          {props.rating}
        </span>

        <span className="flex items-center gap-1 rounded-full bg-white border-slate-100 border shadow-sm px-2.5 py-1 text-[12px]">
          <ChevronsUp size={14} />
          {props.metaLeft}
        </span>

        <span className="rounded-full bg-white border-slate-100 border shadow-sm px-2.5 py-1 text-[12px]">
          {props.metaMid}
        </span>

        <span className="rounded-full bg-white border-slate-100 border shadow-sm px-2.5 py-1 text-[12px]">
          {props.scenarios}
        </span>
      </div>

      {/* ---------- TAGS ---------- */}
      <div className="mt-3 flex flex-wrap gap-2">
        {props.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ---------- FOOTER ---------- */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">{props.metaRight}</span>

        <button
          onClick={() => navigate(`/authors/${authorSlug}`, { state: { type: "author", ...props } })}
          className="
            rounded-xl bg-[#1C78EE]
            px-5 py-2
            text-[13px] font-medium text-white
            hover:bg-blue-700
          "
        >
          View Profile
        </button>
      </div>
    </article>
  );
}
