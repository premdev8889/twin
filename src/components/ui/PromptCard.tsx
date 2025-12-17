type PromptCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function PromptCard({
  title,
  description,
  icon: Icon,
}: PromptCardProps) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-pink-500 group-hover:text-white">
        <Icon size={18} />
      </div>

      <h4 className="mb-1 text-sm font-semibold text-slate-900">
        {title}
      </h4>

      <p className="text-xs leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}
