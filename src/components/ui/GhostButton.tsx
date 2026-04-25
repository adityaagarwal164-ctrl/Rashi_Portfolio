import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function GhostButton({ href, children, icon, className = '' }: Props) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, backgroundColor: 'rgba(201,169,97,0.08)', boxShadow: '0 8px 32px rgba(201,169,97,0.15)' }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2 border border-gold text-gold font-inter font-medium text-sm px-6 py-3 rounded-sm tracking-wide focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.a>
  );
}
