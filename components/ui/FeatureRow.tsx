export function FeatureRow({ icon, title, description, dark = true }: {
  icon: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex gap-4 items-start py-5 border-b last:border-0 ${dark ? 'border-white/10' : 'border-ink/10'}`}>
      <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className={`font-bold text-base mb-1 ${dark ? 'text-paper' : 'text-navy'}`}>{title}</p>
        <p className={`text-sm leading-relaxed ${dark ? 'text-paper/60' : 'text-ink/60'}`}>{description}</p>
      </div>
    </div>
  );
}
