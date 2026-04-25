import { motion } from 'framer-motion';
import type { Artwork } from '../../data/artworks';

interface Props {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  className?: string;
}

export function FeaturedCard({ artwork, onClick, className = '' }: Props) {
  return (
    <motion.button
      onClick={() => onClick(artwork)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden block w-full text-left cursor-pointer border border-gold/10 hover:border-gold/30 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black rounded-sm ${className}`}
      aria-label={`View ${artwork.title} — ${artwork.category}`}
    >
      <div className={`relative overflow-hidden ${artwork.aspect === 'landscape' ? 'aspect-[4/3]' : artwork.aspect === 'square' ? 'aspect-square' : 'aspect-[3/4]'}`}>
        <img
          src={artwork.src}
          alt={`${artwork.title} — ${artwork.medium}`}
          loading="lazy"
          width={600}
          height={artwork.aspect === 'landscape' ? 450 : artwork.aspect === 'square' ? 600 : 800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-cormorant text-ivory text-xl font-light">{artwork.title}</p>
          <p className="text-caption text-gold mt-1">{artwork.medium}</p>
        </div>
      </div>
    </motion.button>
  );
}
