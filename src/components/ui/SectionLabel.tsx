interface Props {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = '' }: Props) {
  return (
    <p className={`text-caption font-italiana text-gold mb-4 ${className}`}>
      {children}
    </p>
  );
}
