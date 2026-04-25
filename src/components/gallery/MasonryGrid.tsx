import { AnimatePresence, motion } from 'framer-motion';
import type { Artwork } from '../../data/artworks';
import { ArtworkCard } from './ArtworkCard';

interface Props {
  artworks: Artwork[];
  onOpen: (artwork: Artwork) => void;
}

export function MasonryGrid({ artworks, onOpen }: Props) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
      <AnimatePresence mode="popLayout">
        {artworks.map((a, i) => (
          <motion.div
            key={a.id}
            layout
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArtworkCard artwork={a} onClick={onOpen} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
