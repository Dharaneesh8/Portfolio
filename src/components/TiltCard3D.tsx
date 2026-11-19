import { ReactNode, useRef } from 'react';

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard3D({
  children,
  className = '',
  intensity = 6,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * intensity * 2;
    const rotateX = (0.5 - py) * intensity * 2;

    el.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1)`;

    if (glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(440px circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(34, 211, 238, 0.14), rgba(244, 63, 94, 0.08) 45%, transparent 72%)`;
    }
  };

  const handlePointerLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
      />
      {children}
    </div>
  );
}
