import { useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  blur: number;
}

export function GlowParticles() {
  const reduced = useReducedMotion();

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      size: 2 + Math.random() * 4,
      duration: 20 + Math.random() * 20,
      delay: Math.random() * 10,
      blur: 1 + Math.random(),
    })), []);

  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(245,241,232,0.20)',
            filter: `blur(${p.blur}px)`,
            animation: `drift ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes drift {
          from { transform: translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          to   { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
