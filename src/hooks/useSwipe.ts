import { useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeDown?: () => void;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, onSwipeDown }: SwipeHandlers) {
  const startX = useRef(0);
  const startY = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDy > absDx && dy > 60) {
      onSwipeDown?.();
    } else if (absDx > absDy && absDx > 50) {
      if (dx < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    }
  };

  return { onTouchStart, onTouchEnd };
}
