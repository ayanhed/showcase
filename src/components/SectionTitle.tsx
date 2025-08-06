import Heading from "./ui/Heading";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <Heading level={2} className="mb-4">
        {title}
      </Heading>
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
