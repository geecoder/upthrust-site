export function Badge({ children, variant = 'amber' }: {
  children: React.ReactNode;
  variant?: 'amber' | 'navy' | 'paper' | 'green';
}) {
  const styles: Record<string, string> = {
    amber: 'bg-amber/10 text-amber border border-amber/20',
    navy:  'bg-navy/5 text-navy border border-navy/10',
    paper: 'bg-white/10 text-paper border border-white/15',
    green: 'bg-moss/10 text-moss border border-moss/20',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${styles[variant]}`}>
      {children}
    </span>
  );
}
