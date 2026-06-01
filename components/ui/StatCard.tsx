export function StatCard({ value, label, sub }: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="text-center px-6">
      <p className="font-serif text-5xl font-light tracking-tight text-paper mb-2">{value}</p>
      <p className="text-sm font-bold text-paper/70 tracking-wide uppercase">{label}</p>
      {sub && <p className="text-xs text-paper/40 mt-1">{sub}</p>}
    </div>
  );
}
