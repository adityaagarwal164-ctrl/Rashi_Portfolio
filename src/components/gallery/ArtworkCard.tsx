import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { Artwork } from '../../data/artworks';

interface Props {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export function ArtworkCard({ artwork, onClick, isAdmin, onDelete }: Props) {
  return (
    <div className="relative mb-6">
      <motion.button
        layout
        onClick={() => onClick(artwork)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="masonry-item group relative w-full overflow-hidden block text-left cursor-pointer border border-gold/10 hover:border-gold/30 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black rounded-sm"
        aria-label={`View ${artwork.title} — ${artwork.category}`}
      >
        <img
          src={artwork.src}
          alt={`${artwork.title} — ${artwork.medium}`}
          loading="lazy"
          width={400}
          height={artwork.aspect === 'landscape' ? 300 : artwork.aspect === 'square' ? 400 : 533}
          className="w-full h-auto block"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/85 via-ink-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-cormorant text-ivory text-[1.375rem] font-light leading-tight">{artwork.title}</p>
          <p className="text-caption text-gold mt-1">{artwork.category}</p>
        </div>
      </motion.button>

      {isAdmin && onDelete && (
        <button
          onClick={() => onDelete(artwork.id)}
          title={`Delete "${artwork.title}"`}
          aria-label={`Delete ${artwork.title}`}
          className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center bg-ink-black/80 border border-red-500/30 hover:border-red-500/60 hover:bg-red-500/20 text-red-400/70 hover:text-red-400 rounded-sm transition-colors"
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}
