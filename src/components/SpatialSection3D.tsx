import { ReactNode, useEffect, useRef } from 'react';

interface SpatialSection3DProps {
  children: ReactNode;
  className?: string;
}

export default function SpatialSection3D({
  children,
  className = '',
}: SpatialSection3DProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    let rafId = 0;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const center = rect.top + rect.height * 0.5;
      const norm = Math.max(-1, Math.min(1, (center - vh * 0.5) / vh));
      const rotateX = norm * -2.2;
      const scale = 1 - Math.abs(norm) * 0.012;

      el.style.transform = `perspective(1500px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`will-change-transform transition-transform duration-150 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
