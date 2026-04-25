import { useEffect, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function SmoothScroll({ children }: Props) {
  useEffect(() => {
    let lenis: import('lenis').default | null = null;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };

    const handle = requestAnimationFrame(() => { init(); });
    return () => {
      cancelAnimationFrame(handle);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
