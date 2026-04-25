import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';

const steps = [
  {
    num: '01',
    title: 'Share your photograph',
    body: 'Send a clear reference image on WhatsApp, along with the names and the story behind the people you would like drawn.',
  },
  {
    num: '02',
    title: 'Choose the style',
    body: 'Together we settle the medium, size, and finish — graphite study, charcoal portrait, ink line, or a mixed approach.',
  },
  {
    num: '03',
    title: 'Watch it come to life',
    body: 'The drawing is built over several quiet sittings. You will receive progress photographs at the halfway and pre-final stages.',
  },
  {
    num: '04',
    title: 'Held in your hands',
    body: 'Once you approve, the original is signed, fixed, packed in archival wrapping, and dispatched anywhere in India.',
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-24 md:py-32 lg:py-40 bg-ink-black section-glow"
    >
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">

        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-20"
        >
          <SectionLabel>05 — How It Works</SectionLabel>
          <h2 id="process-heading" className="font-cormorant text-ivory text-section-h2 font-light max-w-2xl">
            Four quiet steps from photograph to framed memory.
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline | Mobile: vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-60px' }}
              className="relative"
            >
              {/* Connector line — desktop */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-[2.5rem] left-1/2 w-full h-px bg-gold/20"
                  aria-hidden="true"
                />
              )}

              {/* Connector line — mobile */}
              {i < steps.length - 1 && (
                <div
                  className="md:hidden absolute left-7 top-20 w-px h-[calc(100%-2rem)] bg-gold/20"
                  aria-hidden="true"
                />
              )}

              <div className="relative flex flex-col md:items-start gap-4 pb-12 md:pb-0 pl-16 md:pl-0 md:pr-8">
                {/* Number */}
                <span
                  className="font-italiana text-gold text-6xl leading-none flex-shrink-0 md:mb-2"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <div>
                  <h3 className="font-cormorant text-ivory text-2xl font-light mb-3">
                    {step.title}
                  </h3>
                  <p className="font-inter text-ivory-muted text-sm leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
