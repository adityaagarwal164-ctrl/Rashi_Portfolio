interface Props {
  className?: string;
}

export function Divider({ className = '' }: Props) {
  return (
    <hr className={`border-0 border-t border-gold/20 ${className}`} />
  );
}
