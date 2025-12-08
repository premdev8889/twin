import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

// src/components/chat/TwinResultCard.tsx
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
  slug, avatar, name, role, summary, subscribers,  year = "", Scenarios =""
}: Props) {
  return (
    <article className="rounded-2xl  bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
      <div className="flex items-start gap-3">
        <img src={avatar} className="size-10 rounded-full object-cover" alt={name} />
        <div className="min-w-0 flex-1">
          <div className="flex justify-between">
            <div className="">
            <div className="flex items-end gap-2">
            <h4 className="text-[20px] font-semibold">{name}</h4>
            <span className="text-neutral-600 text-[12px] mb-1" title="verified">{subscribers}</span>
          </div>
          <p className="text-[14px] text-slate-500">{role}</p>
          </div>
          <div className="text-[11px] text-slate-500 whitespace-nowrap"> <span className="border rounded-full py-1 px-2 mr-2">{year}</span> <span className="border rounded-full py-1 px-2">{Scenarios}</span> </div>
          </div>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{summary}</p>

          <div className="mt-3 flex items-center gap-2">
           
               <Link
              to={`/twin/${slug}`}
              className="rounded-full  px-3 py-1.5 text-sm  shadow"
            >
              More
            </Link>
              <button  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70">
                Explore
              </button>
              <button  className="rounded-full border border-slate-200 bg-white p-2 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70">
                <Bookmark size={15} />
              </button>
           
          </div>
        </div>
        
      </div>
    </article>
  );
}
