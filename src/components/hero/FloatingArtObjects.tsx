import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  mouseX: number;
  mouseY: number;
}

function float(duration: number, yRange: number) {
  return {
    y: [0, -yRange, 0],
    transition: { duration, repeat: Infinity, ease: 'easeInOut' as const },
  };
}

export function FloatingArtObjects({ mouseX, mouseY }: Props) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* Pencil — top left */}
      <motion.div
        className="absolute top-[12%] left-[4%] opacity-60"
        style={{ rotate: -15, x: mouseX * 0.3 * 8, y: mouseY * 0.3 * 8 }}
        animate={float(6, 20)}
        transition={{ duration: 0.8 }}
      >
        <svg width="56" height="200" viewBox="0 0 56 200" fill="none" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.6))">
          {/* Body */}
          <rect x="18" y="20" width="20" height="140" fill="#5A5A5A"/>
          <rect x="18" y="20" width="5" height="140" fill="#6E6E6E"/>
          {/* Gold ferrule */}
          <rect x="16" y="156" width="24" height="14" rx="1" fill="#C9A961"/>
          <rect x="16" y="160" width="24" height="2" fill="#8B7239"/>
          {/* Tip */}
          <polygon points="18,170 38,170 28,198" fill="#E8DCC4"/>
          <polygon points="23,170 33,170 28,190" fill="#3A2A1A"/>
          {/* Top cap */}
          <rect x="18" y="14" width="20" height="8" rx="2" fill="#888"/>
          {/* Highlight line */}
          <rect x="21" y="24" width="3" height="130" fill="#7A7A7A" opacity="0.5"/>
        </svg>
      </motion.div>

      {/* Paintbrush — bottom right */}
      <motion.div
        className="absolute bottom-[8%] right-[5%] opacity-55"
        style={{ rotate: 35, x: mouseX * 0.5 * 8, y: mouseY * 0.5 * 8 }}
        animate={float(7, 18)}
      >
        <svg width="40" height="180" viewBox="0 0 40 180" fill="none" filter="drop-shadow(0 6px 14px rgba(0,0,0,0.5))">
          {/* Handle */}
          <rect x="16" y="10" width="8" height="120" rx="2" fill="#8B6542"/>
          <rect x="16" y="10" width="3" height="120" rx="2" fill="#A07A50" opacity="0.5"/>
          {/* Brass band */}
          <rect x="14" y="126" width="12" height="10" rx="1" fill="#C9A961"/>
          {/* Ferrule */}
          <rect x="15" y="134" width="10" height="8" fill="#888"/>
          {/* Bristles */}
          <ellipse cx="20" cy="158" rx="7" ry="18" fill="#C9C3B5"/>
          <ellipse cx="20" cy="165" rx="5" ry="12" fill="#F5F1E8"/>
          {/* Paint dab */}
          <ellipse cx="20" cy="172" rx="4" ry="5" fill="#C9A961" opacity="0.8"/>
        </svg>
      </motion.div>

      {/* Charcoal stick — mid left */}
      <motion.div
        className="absolute top-[45%] left-[2%] opacity-40"
        style={{ rotate: -45, x: mouseX * 0.2 * 8, y: mouseY * 0.2 * 8 }}
        animate={float(8, 15)}
      >
        <svg width="20" height="120" viewBox="0 0 20 120" fill="none" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.7))">
          <rect x="4" y="0" width="12" height="110" rx="3" fill="#2A2A2A"/>
          <rect x="4" y="0" width="4" height="110" rx="3" fill="#3A3A3A"/>
          <polygon points="4,108 16,108 10,120" fill="#1A1A1A"/>
          <rect x="5" y="2" width="2" height="100" fill="#404040" opacity="0.6"/>
        </svg>
      </motion.div>

      {/* Torn paper — top right */}
      <motion.div
        className="absolute top-[8%] right-[8%] opacity-30 hidden lg:block"
        style={{ x: mouseX * 0.4 * 8, y: mouseY * 0.4 * 8 }}
        animate={{ rotate: [-2, 2, -2], y: [0, -12, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <svg width="90" height="110" viewBox="0 0 90 110" fill="none" filter="drop-shadow(0 8px 20px rgba(0,0,0,0.4))">
          <path
            d="M5 5 Q10 2 18 6 Q26 1 34 5 Q42 0 50 4 Q58 1 66 5 Q74 2 82 5 L85 100 Q78 103 70 100 Q62 105 54 101 Q46 106 38 102 Q30 105 22 101 Q14 104 8 100 Z"
            fill="#F5F1E8"
            opacity="0.9"
          />
          <line x1="15" y1="28" x2="72" y2="28" stroke="#C9C3B5" strokeWidth="0.8"/>
          <line x1="15" y1="44" x2="68" y2="44" stroke="#C9C3B5" strokeWidth="0.8"/>
          <line x1="15" y1="60" x2="70" y2="60" stroke="#C9C3B5" strokeWidth="0.8"/>
          <line x1="15" y1="76" x2="65" y2="76" stroke="#C9C3B5" strokeWidth="0.8"/>
        </svg>
      </motion.div>

      {/* Gold paint splash — behind portrait area, right side */}
      <motion.div
        className="absolute top-[30%] right-[10%] opacity-20 hidden lg:block"
        style={{ x: mouseX * 0.1 * 8, y: mouseY * 0.1 * 8 }}
        animate={{ scale: [1, 1.1, 1], transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <ellipse cx="90" cy="90" rx="80" ry="70" fill="#C9A961" opacity="0.4"/>
          <ellipse cx="115" cy="70" rx="30" ry="25" fill="#E5C07B" opacity="0.3"/>
          <ellipse cx="65" cy="115" rx="25" ry="20" fill="#C9A961" opacity="0.25"/>
          <circle cx="130" cy="120" r="12" fill="#8B7239" opacity="0.3"/>
        </svg>
      </motion.div>

      {/* Sketch frame — bottom left */}
      <motion.div
        className="absolute bottom-[14%] left-[6%] opacity-25 hidden md:block"
        style={{ x: mouseX * 0.25 * 8, y: mouseY * 0.25 * 8 }}
        animate={{ rotate: [-2, 2, -2], transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <svg width="70" height="86" viewBox="0 0 70 86" fill="none">
          <rect x="2" y="2" width="66" height="82" stroke="#C9A961" strokeWidth="1.5" fill="none"/>
          <rect x="8" y="8" width="54" height="70" stroke="#C9A961" strokeWidth="0.5" fill="none" opacity="0.5"/>
        </svg>
      </motion.div>

      {/* Ink dots — scattered */}
      {[
        { top: '20%', left: '15%', r: 3, depth: 0.3 },
        { top: '60%', left: '8%',  r: 2, depth: 0.4 },
        { top: '35%', right: '3%', r: 4, depth: 0.2 },
        { top: '75%', right: '12%',r: 2, depth: 0.5 },
        { top: '15%', left: '35%', r: 2, depth: 0.3 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/30"
          style={{
            top: dot.top,
            left: 'left' in dot ? dot.left : undefined,
            right: 'right' in dot ? (dot as { right: string }).right : undefined,
            width: dot.r * 2,
            height: dot.r * 2,
            x: mouseX * dot.depth * 6,
            y: mouseY * dot.depth * 6,
          }}
          animate={{ opacity: [0.3, 0.6, 0.3], transition: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' } }}
        />
      ))}
    </div>
  );
}
