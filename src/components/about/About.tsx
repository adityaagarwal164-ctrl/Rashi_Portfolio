import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';
import { fadeUp, stagger } from '../../lib/motion';

const stats = [
  { num: '05',   label: 'Years of Practice'     },
  { num: '200+', label: 'Commissions Delivered'  },
  { num: '100%', label: 'Hand-Drawn, Always'     },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 md:py-32 lg:py-40 bg-charcoal section-glow"
    >
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>01 — The Artist</SectionLabel>
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={fadeUp}
              className="font-cormorant text-ivory text-section-h2 font-light mb-8"
            >
              A practice rooted in patience, built on observation.
            </motion.h2>

            <motion.p variants={fadeUp} className="font-inter text-ivory-muted text-lg leading-[1.7] mb-12">
              Rashi Agrawal works from a small studio in Bari, Dholpur, where graphite, charcoal,
              and warm afternoon light have shaped her hand for the past five years. Her drawings are
              unhurried — built in soft layers, listening for the moment a portrait stops being a
              likeness and becomes a presence. She accepts a limited number of private commissions
              each month, each one drawn from your photographs and conversation, and finished on
              archival paper meant to outlive the moment it remembers.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gold/15"
            >
              {stats.map(s => (
                <motion.div key={s.num} variants={fadeUp} className="text-center lg:text-left">
                  <p className="font-italiana text-gold text-4xl lg:text-5xl mb-1">{s.num}</p>
                  <p className="font-inter text-ivory-muted text-xs uppercase tracking-widest leading-snug">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5 lg:pt-16"
          >
            <div className="border-t-2 border-gold pt-8">
              <blockquote>
                <p className="font-cormorant text-ivory italic font-light leading-snug text-h3">
                  &ldquo;I am not drawing a face. I am drawing the way someone is loved.&rdquo;
                </p>
                <footer className="mt-6">
                  <cite className="font-italiana text-gold text-sm tracking-widest not-italic">
                    Rashi Agrawal
                  </cite>
                </footer>
              </blockquote>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
