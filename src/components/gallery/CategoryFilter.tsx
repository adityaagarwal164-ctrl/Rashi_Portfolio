import { motion } from 'framer-motion';
import type { Category } from '../../data/artworks';
import { CATEGORIES } from '../../data/artworks';

interface Props {
  active: 'All' | Category;
  onChange: (cat: 'All' | Category) => void;
}

export function CategoryFilter({ active, onChange }: Props) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter artworks by category"
    >
      {CATEGORIES.map(cat => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className={`relative font-inter text-xs uppercase tracking-widest px-4 py-2 rounded-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black ${
              isActive
                ? 'bg-gold text-ink-black'
                : 'border border-gold/40 text-ivory-muted hover:border-gold hover:text-ivory'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-active"
                className="absolute inset-0 bg-gold rounded-sm"
                style={{ zIndex: -1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            {cat}
          </button>
        );
      })}
    </div>
  );
}
