import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { GoldButton } from '../ui/GoldButton';
import { GhostButton } from '../ui/GhostButton';
import { FloatingArtObjects } from './FloatingArtObjects';
import { GlowParticles } from './GlowParticles';
import { HeroPortrait } from './HeroPortrait';
import { fadeIn, stagger } from '../../lib/motion';

const WA_LINK = 'https://wa.me/917732800853?text=Hello%20Rashi%2C%20I%20would%20like%20to%20commission%20a%20custom%20sketch.';

export function Hero() {
  const reduced = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      setMousePos({
        x: (e.clientX - rect.left - cx) / cx,
        y: (e.clientY - rect.top  - cy) / cy,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero — Rashi Agrawal fine art studio"
      className="relative min-h-screen flex items-center bg-ink-black overflow-hidden"
    >
      {/* Vignette */}
      <div className="hero-vignette absolute inset-0 pointer-events-none z-10" aria-hidden="true" />

      {/* Floating art objects layer */}
      <div className="absolute inset-0 z-10">
        <FloatingArtObjects mouseX={mousePos.x} mouseY={mousePos.y} />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-10">
        <GlowParticles />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-container mx-auto px-6 md:px-12 lg:px-20 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left — Typography */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.0 }}
              className="text-caption font-italiana text-gold mb-8 tracking-widest"
            >
              Fine Art Studio &nbsp;&bull;&nbsp; Est. 2020
            </motion.p>

            {/* H1 — line by line reveal */}
            <h1 className="font-cormorant text-ivory text-hero mb-8" aria-label="The quiet art of remembrance.">
              {['The quiet', 'art of', 'remembrance.'].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                  animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`block ${i === 2 ? 'italic font-light text-ivory/90' : ''}`}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-inter text-ivory-muted text-lg leading-[1.7] max-w-xl mb-10"
            >
              Hand-drawn portraits, deity studies, and bespoke sketches —
              crafted in graphite, charcoal, and patience by Rashi Agrawal.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              transition={{ delayChildren: 1.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GoldButton
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<MessageCircle size={16} />}
                >
                  Commission on WhatsApp
                </GoldButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GhostButton href="tel:+917732800853" icon={<Phone size={16} />}>
                  Call the Studio
                </GhostButton>
              </motion.div>
            </motion.div>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="flex items-center gap-2 font-inter text-ivory-muted text-sm"
            >
              <MapPin size={14} className="text-gold flex-shrink-0" />
              Sarafa Bazar, Bari, Dholpur &nbsp;&bull;&nbsp; Rajasthan, India
            </motion.p>
          </div>

          {/* Right — Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}
