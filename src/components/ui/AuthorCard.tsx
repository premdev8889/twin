// components/ui/TwinCard.tsx
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  name: string;
  avatar: string;
  verified?: boolean;
  description: string;
};

export default function AuthorCard({
  id,
  name,
  avatar,
  verified,
  description,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/twin/${id}`)}
      className="
        cursor-pointer
        rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      {/* Avatar */}
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mt-3">
          <h3 className="text-left  text-[15px] font-semibold text-slate-900">
            {name}
          </h3>
          {verified && (
            <BadgeCheck size={16} className="text-blue-500" />
          )}
        </div>

        <p className=" text-left mt-2 text-[13px] leading-snug text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}
