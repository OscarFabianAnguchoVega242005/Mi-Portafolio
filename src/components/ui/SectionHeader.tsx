interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        {title}
      </h2>
      <p className="text-lg text-neutral-400">{subtitle}</p>
    </div>
  );
}