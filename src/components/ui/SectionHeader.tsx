interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
        {title}
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
  );
}