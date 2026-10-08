export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-10 text-center">
      <span className="text-xs font-bold tracking-[0.2em] text-violet-400/70 uppercase" data-reveal="fade">
        — {eyebrow} —
      </span>
      <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mt-3" data-reveal="up" data-reveal-delay="0.1">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-gray-400 mt-3 max-w-lg mx-auto" data-reveal="up" data-reveal-delay="0.2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
