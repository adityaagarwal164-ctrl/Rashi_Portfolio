import { motion, useReducedMotion } from 'framer-motion';

export function HeroPortrait() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center"
    >
      {/* Radial gold glow behind portrait */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,97,0.18), transparent 60%)', filter: 'blur(80px)' }}
        animate={reduced ? {} : { scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Frame: outer gold, ivory mat, inner gold */}
      <motion.div
        animate={reduced ? {} : { rotateY: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', perspective: 800 }}
        className="relative"
      >
        {/* Outer gold border */}
        <div className="p-1 border-2 border-gold/70 shadow-[0_0_40px_rgba(201,169,97,0.15),inset_0_0_20px_rgba(0,0,0,0.3)]">
          {/* Ivory mat */}
          <div className="p-3 bg-[#F5F1E8]">
            {/* Inner gold frame */}
            <div className="border border-gold/50 overflow-hidden">
              <img
                src="/artwork/Rashi Agrawal.jpeg"
                alt="Rashi Agrawal, fine-arts sketch artist, in her Dholpur studio"
                loading="eager"
                width={480}
                height={600}
                className="block w-full h-full object-cover aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* SVG Signature */}
      <div className="mt-4 h-10 flex items-center justify-center" aria-label="Rashi Agrawal signature">
        <svg viewBox="0 0 200 40" width="180" height="36" fill="none" aria-hidden="true">
          <path
            d="M10 30 C20 10, 35 8, 40 20 C42 26, 38 34, 32 32 C26 30, 28 18, 38 16 C52 13, 58 28, 55 32 C60 20, 70 8, 80 20 C85 28, 78 35, 72 32 C80 30, 90 15, 100 22 C108 28, 105 34, 100 33 C108 28, 120 10, 130 20 C138 28, 132 35, 126 32 C134 30, 145 15, 155 25 C162 32, 158 38, 152 36 C160 34, 170 20, 180 28"
            stroke="#C9A961"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="signature-path"
          />
        </svg>
      </div>
    </motion.div>
  );
}
