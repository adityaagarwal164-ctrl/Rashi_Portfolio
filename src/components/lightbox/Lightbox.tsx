import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Artwork } from '../../data/artworks';
import { artworks } from '../../data/artworks';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useSwipe } from '../../hooks/useSwipe';

interface Props {
  artwork: Artwork | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ artwork, onClose, onPrev, onNext }: Props) {
  const isOpen = !!artwork;
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstFocusRef = useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);
  useKeyPress('Escape',    onClose, isOpen);
  useKeyPress('ArrowLeft', onPrev,  isOpen);
  useKeyPress('ArrowRight',onNext,  isOpen);

  const swipe = useSwipe({
    onSwipeLeft:  onNext,
    onSwipeRight: onPrev,
    onSwipeDown:  onClose,
  });

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      firstFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      firstFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const currentIndex = artwork ? artworks.findIndex(a => a.id === artwork.id) : -1;
  const total = artworks.length;

  return (
    <AnimatePresence>
      {isOpen && artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-ink-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={handleBackdropClick}
          {...swipe}
        >
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 z-10 flex items-center justify-center w-11 h-11 border border-gold/40 rounded-full text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={onPrev}
            aria-label="Previous artwork"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-14 h-14 border border-gold/40 rounded-full text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            aria-label="Next artwork"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-14 h-14 border border-gold/40 rounded-full text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image + Caption */}
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Frame */}
            <div className="border border-gold/30 p-1 shadow-[0_0_60px_rgba(201,169,97,0.08)]">
              <img
                src={artwork.src}
                alt={`${artwork.title} — ${artwork.medium}`}
                className="block max-h-[72vh] max-w-[80vw] w-auto h-auto object-contain"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center px-4">
              <p
                id="lightbox-title"
                className="font-cormorant text-ivory text-2xl font-light"
              >
                {artwork.title}
              </p>
              <p className="font-inter text-ivory-muted text-sm mt-1">{artwork.medium}</p>
              <p className="text-caption text-gold mt-1">
                {artwork.category} &nbsp;&mdash;&nbsp; {String(currentIndex + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
