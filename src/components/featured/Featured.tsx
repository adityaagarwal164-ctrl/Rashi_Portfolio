import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { artworks } from '../../data/artworks';
import type { Artwork } from '../../data/artworks';
import { SectionLabel } from '../ui/SectionLabel';

const featured = artworks.filter(a => a.featured);

interface Props {
  onOpen: (artwork: Artwork) => void;
}

const GAP = 20;
const AUTO_INTERVAL = 3500;

export function Featured({ onOpen }: Props) {
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const maxIndex = Math.max(0, featured.length - visibleCount);

  /* ── Measure card width on mount + resize ── */
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const vw = window.innerWidth;
      const vis = vw < 640 ? 1 : vw < 1024 ? 2 : 3;
      setVisibleCount(vis);
      setCardWidth((w - GAP * (vis - 1)) / vis);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* ── Animate track to current index ── */
  const goTo = useCallback((idx: number) => {
    const clamped = Math.min(Math.max(idx, 0), maxIndex);
    setCurrent(clamped);
    animate(x, -(clamped * (cardWidth + GAP)), {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    });
  }, [cardWidth, maxIndex, x]);

  const goPrev = () => goTo(current - 1);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  /* ── Auto-play ── */
  useEffect(() => {
    if (paused || cardWidth === 0) return;
    const id = setInterval(() => {
      goTo(current >= maxIndex ? 0 : current + 1);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, current, maxIndex, cardWidth, goTo]);

  /* ── Drag ── */
  const dragConstraint = cardWidth > 0 ? cardWidth * 0.4 : 80;

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -dragConstraint) goTo(current + 1);
    else if (info.offset.x > dragConstraint) goTo(current - 1);
    else goTo(current);
  };

  /* ── Progress bar width ── */
  const progressWidth = useTransform(x, [0, -((featured.length - 1) * (cardWidth + GAP))], ['0%', '100%']);

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="py-24 md:py-32 lg:py-40 bg-ink-black overflow-hidden"
    >
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">

        {/* Header + controls */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <SectionLabel>02 — Selected Works</SectionLabel>
            <h2 id="featured-heading" className="font-cormorant text-ivory text-section-h2 font-light">
              A small selection from the studio.
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={goPrev}
              disabled={current === 0}
              aria-label="Previous works"
              className="flex items-center justify-center w-10 h-10 border border-gold/40 rounded-full text-gold hover:border-gold hover:bg-gold/10 disabled:opacity-25 disabled:pointer-events-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goNext()}
              disabled={current >= maxIndex}
              aria-label="Next works"
              className="flex items-center justify-center w-10 h-10 border border-gold/40 rounded-full text-gold hover:border-gold hover:bg-gold/10 disabled:opacity-25 disabled:pointer-events-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2 ml-1" role="tablist" aria-label="Carousel slides">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:ring-1 focus-visible:ring-gold ${
                    i === current ? 'bg-gold w-6' : 'bg-gold/30 w-1.5'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Carousel track */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -(maxIndex * (cardWidth + GAP)) - dragConstraint, right: dragConstraint }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            onDragStart={() => setPaused(true)}
            className="flex cursor-grab active:cursor-grabbing select-none"
            style={{ x, columnGap: GAP, width: cardWidth > 0 ? `${featured.length * cardWidth + (featured.length - 1) * GAP}px` : '100%' }}
          >
            {featured.map((artwork) => (
              <motion.div
                key={artwork.id}
                style={{ width: cardWidth || '33.333%', flexShrink: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => onOpen(artwork)}
                  aria-label={`View ${artwork.title}`}
                  className="group w-full text-left border border-gold/10 hover:border-gold/40 rounded-sm overflow-hidden transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black block"
                  draggable={false}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: 240 }}>
                    <img
                      src={artwork.src}
                      alt={`${artwork.title} — ${artwork.medium}`}
                      loading="lazy"
                      width={420}
                      height={240}
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05] pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Caption */}
                  <div className="px-4 py-3 bg-charcoal border-t border-gold/10">
                    <p className="font-cormorant text-ivory text-lg font-light leading-snug truncate">
                      {artwork.title}
                    </p>
                    <p className="font-inter text-ivory-muted text-[0.7rem] uppercase tracking-widest mt-0.5">
                      {artwork.category}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-px bg-gold/15 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gold/60 rounded-full"
            style={{ width: progressWidth }}
          />
        </div>

      </div>
    </section>
  );
}
