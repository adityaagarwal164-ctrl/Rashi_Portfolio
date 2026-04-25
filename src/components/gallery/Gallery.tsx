import { useState } from 'react';
import { motion } from 'framer-motion';
import { artworks } from '../../data/artworks';
import type { Artwork, Category } from '../../data/artworks';
import { SectionLabel } from '../ui/SectionLabel';
import { CategoryFilter } from './CategoryFilter';
import { MasonryGrid } from './MasonryGrid';
import { fadeUp } from '../../lib/motion';

interface Props {
  onOpen: (artwork: Artwork) => void;
}

export function Gallery({ onOpen }: Props) {
  const [active, setActive] = useState<'All' | Category>('All');

  const filtered = active === 'All'
    ? artworks
    : artworks.filter(a => a.category === active);

  return (
    <section
      id="work"
      aria-labelledby="gallery-heading"
      className="py-24 md:py-32 lg:py-40 bg-charcoal section-glow"
    >
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <SectionLabel>03 — The Collection</SectionLabel>
          <h2 id="gallery-heading" className="font-cormorant text-ivory text-section-h2 font-light">
            The full archive.
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-12"
        >
          <CategoryFilter active={active} onChange={setActive} />
        </motion.div>

        {/* Grid */}
        <MasonryGrid artworks={filtered} onOpen={onOpen} />
      </div>
    </section>
  );
}
