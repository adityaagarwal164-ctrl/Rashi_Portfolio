import { motion } from 'framer-motion';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { GoldButton } from '../ui/GoldButton';
import { GhostButton } from '../ui/GhostButton';
import { fadeUp } from '../../lib/motion';

const WA_LINK = 'https://wa.me/917732800853?text=Hello%20Rashi%2C%20I%20would%20like%20to%20commission%20a%20custom%20sketch.';

export function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 md:py-32 lg:py-40 bg-charcoal overflow-hidden"
    >
      {/* Decorative background "RA" letterforms */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="font-italiana text-ivory/[0.04] font-normal leading-none tracking-tighter"
          style={{ fontSize: '25vw', userSelect: 'none' }}
        >
          RA
        </span>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl mb-14"
        >
          <p
            id="contact-heading"
            className="font-cormorant text-ivory italic font-light leading-snug"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            &ldquo;If you have a face you would like remembered,
            let us begin a quiet conversation.&rdquo;
          </p>
        </motion.blockquote>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <GoldButton
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle size={16} />}
          >
            Commission on WhatsApp
          </GoldButton>
          <GhostButton href="tel:+917732800853" icon={<Phone size={16} />}>
            +91 77328 00853
          </GhostButton>
        </motion.div>

        {/* Studio note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 font-inter text-ivory-muted text-sm"
        >
          <MapPin size={13} className="text-gold flex-shrink-0" />
          Studio in Sarafa Bazar, Bari, Dholpur, Rajasthan &nbsp;&bull;&nbsp; Replies usually within a few hours
        </motion.p>
      </div>
    </section>
  );
}
