import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function GoldButton({ href, children, icon, className = '', target, rel }: Props) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(201,169,97,0.3)' }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2 bg-gold text-ink-black font-inter font-medium text-sm px-6 py-3 rounded-sm tracking-wide transition-colors duration-200 hover:bg-gold-bright focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.a>
  );
}
