import { motion } from 'framer-motion';
import { Sparkles, Brush, Palette, MapPin } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { fadeUp, stagger } from '../../lib/motion';

const cards = [
  {
    Icon: Sparkles,
    title: 'One of one',
    body: 'Every commission is drawn from your photographs and your story — never traced, never reproduced, never repeated.',
  },
  {
    Icon: Brush,
    title: 'Archival materials',
    body: 'Acid-free papers, lightfast graphite, and conservation-grade fixatives — work made to be inherited.',
  },
  {
    Icon: Palette,
    title: 'A guided process',
    body: 'From the first photograph to the final signature, you are consulted, never surprised. Revisions are a conversation.',
  },
  {
    Icon: MapPin,
    title: 'Delivered with care',
    body: 'Each piece is hand-rolled in glassine, sleeved in a flat protective mailer, and shipped insured across India.',
  },
];

export function WhyCustom() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="py-24 md:py-32 lg:py-40 bg-charcoal-soft"
    >
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">

        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <SectionLabel>04 — Why Commission</SectionLabel>
          <h2 id="why-heading" className="font-cormorant text-ivory text-section-h2 font-light">
            Hand-drawn, never duplicated.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map(({ Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="bg-charcoal border border-gold/20 p-8 rounded-sm hover:border-gold/40 transition-colors duration-300"
            >
              <Icon size={32} className="text-gold mb-6" aria-hidden="true" />
              <h3 className="font-cormorant text-ivory text-h3 font-light mb-4">{title}</h3>
              <p className="font-inter text-ivory-muted text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
