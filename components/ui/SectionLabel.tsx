export function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-black tracking-[0.2em] uppercase mb-4 ${light ? 'text-amber/70' : 'text-amber'}`}>
      {children}
    </p>
  );
}
