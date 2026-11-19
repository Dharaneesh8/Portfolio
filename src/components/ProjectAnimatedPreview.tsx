import { useEffect, useRef } from 'react';

interface ProjectAnimatedPreviewProps {
  projectId: string;
}

export default function ProjectAnimatedPreview({
  projectId,
}: ProjectAnimatedPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = canvas.clientWidth || 480;
    let height = canvas.clientHeight || 320;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth || 480;
      height = canvas.clientHeight || 320;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rafId = 0;
    let t = 0;

    const drawHalftone = () => {
      ctx.fillStyle = 'rgba(244, 63, 94, 0.14)';
      const step = 18;
      for (let y = 9; y < height; y += step) {
        for (let x = 9; x < width; x += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawSolarAnimation = () => {
      const sunX = width * 0.2;
      const sunY = height * 0.28;
      const pulse = 16 + Math.sin(t * 2.1) * 2.5;

      const grad = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, pulse * 2.2);
      grad.addColorStop(0, 'rgba(250, 204, 21, 0.95)');
      grad.addColorStop(0.5, 'rgba(244, 63, 94, 0.3)');
      grad.addColorStop(1, 'rgba(244, 63, 94, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, pulse * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#090612';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 8.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.strokeStyle = '#22d3ee';
      ctx.fillStyle = 'rgba(20, 16, 51, 0.95)';
      ctx.lineWidth = 1.6;
      for (let p = 0; p < 3; p++) {
        const px = 26 + p * 38;
        const py = height * 0.68;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + 28, py - 12);
        ctx.lineTo(px + 38, py + 4);
        ctx.lineTo(px + 10, py + 16);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      const chartLeft = width * 0.38;
      const chartRight = width - 22;
      const chartMidY = height * 0.56;
      const span = Math.max(40, chartRight - chartLeft);

      ctx.beginPath();
      for (let i = 0; i <= 50; i++) {
        const ratio = i / 50;
        const x = chartLeft + ratio * span;
        const y =
          chartMidY -
          Math.sin(ratio * Math.PI * 2.4 - t * 1.5) * 26 -
          Math.cos(ratio * 5 + t) * 7;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.6;
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i <= 50; i++) {
        const ratio = i / 50;
        const x = chartLeft + ratio * span;
        const y =
          chartMidY -
          Math.sin(ratio * Math.PI * 2.4 - t * 1.5 + 0.25) * 23 -
          Math.cos(ratio * 4.8 + t) * 5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([5, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      const scanRatio = (t * 0.22) % 1;
      const scanX = chartLeft + scanRatio * span;
      ctx.strokeStyle = 'rgba(248, 250, 252, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(scanX, height * 0.22);
      ctx.lineTo(scanX, height * 0.84);
      ctx.stroke();

      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#22d3ee';
      ctx.fillText('ACTUAL kW', chartLeft, 26);
      ctx.fillStyle = '#fb7185';
      ctx.fillText('PREDICTED', chartLeft + 74, 26);
    };

    const drawWorkforceAnimation = () => {
      const barCount = 7;
      const startX = 24;
      const baseY = height * 0.82;
      const barAreaW = width * 0.44;
      const barW = Math.max(8, barAreaW / barCount - 7);

      for (let i = 0; i < barCount; i++) {
        const h =
          36 +
          Math.sin(t * 1.6 + i * 0.85) * 20 +
          ((i * 19) % 24);
        const x = startX + i * (barW + 7);
        const y = baseY - h;

        ctx.fillStyle = i === 2 || i === 5 ? '#f43f5e' : '#22d3ee';
        ctx.strokeStyle = '#090612';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
        ctx.fill();
        ctx.stroke();
      }

      const cLeft = width * 0.54;
      const cRight = width - 22;
      const cSpan = Math.max(40, cRight - cLeft);
      const midY = height * 0.48;

      ctx.beginPath();
      for (let i = 0; i <= 36; i++) {
        const r = i / 36;
        const x = cLeft + r * cSpan;
        const y = midY - Math.sin(r * 4 - t * 1.35) * 24 - r * 12;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2.4;
      ctx.stroke();

      const nodeR = (t * 0.28) % 1;
      const nx = cLeft + nodeR * cSpan;
      const ny = midY - Math.sin(nodeR * 4 - t * 1.35) * 24 - nodeR * 12;
      ctx.beginPath();
      ctx.arc(nx, ny, 5.2, 0, Math.PI * 2);
      ctx.fillStyle = '#facc15';
      ctx.fill();
      ctx.strokeStyle = '#090612';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#fb7185';
      ctx.fillText('ATTRITION RISK', startX, 26);
      ctx.fillStyle = '#22d3ee';
      ctx.fillText('RETENTION INDEX', cLeft, 26);
    };

    const drawImagePredictionAnimation = () => {
      const boxSize = Math.min(width, height) * 0.44;
      const bx = width * 0.28 - boxSize * 0.5;
      const by = height * 0.52 - boxSize * 0.5;

      ctx.save();
      ctx.translate(bx + boxSize * 0.5, by + boxSize * 0.5);
      ctx.rotate(t * 0.45);
      ctx.strokeStyle = '#090612';
      ctx.fillStyle = '#facc15';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(-19, -19, 38, 38, 6);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      const bracket = 11;
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.5;
      const corners = [
        [bx, by, 1, 1],
        [bx + boxSize, by, -1, 1],
        [bx, by + boxSize, 1, -1],
        [bx + boxSize, by + boxSize, -1, -1],
      ];
      corners.forEach(([cx, cy, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy + dy * bracket);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + dx * bracket, cy);
        ctx.stroke();
      });

      const scanY = by + ((Math.sin(t * 2.1) + 1) * 0.5) * boxSize;
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(bx + 4, scanY);
      ctx.lineTo(bx + boxSize - 4, scanY);
      ctx.stroke();

      const mailX = width * 0.76;
      const mailY = height * 0.52;
      const beamStartX = bx + boxSize + 8;
      const packetT = (t * 0.65) % 1;
      const px = beamStartX + (mailX - 24 - beamStartX) * packetT;

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(beamStartX, mailY);
      ctx.lineTo(mailX - 24, mailY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(px, mailY, 4.4, 0, Math.PI * 2);
      ctx.fillStyle = '#22d3ee';
      ctx.fill();

      const ringRadius = 21 + ((t * 18) % 15);
      const ringAlpha = Math.max(0, 1 - ((t * 18) % 15) / 15) * 0.65;
      ctx.beginPath();
      ctx.arc(mailX, mailY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(244, 63, 94, ${ringAlpha})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = '#141033';
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.roundRect(mailX - 17, mailY - 12, 34, 24, 4);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(mailX - 16, mailY - 10);
      ctx.lineTo(mailX, mailY + 2);
      ctx.lineTo(mailX + 16, mailY - 10);
      ctx.strokeStyle = '#f43f5e';
      ctx.stroke();

      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#fb7185';
      ctx.fillText('SCANNING', bx, 26);
      ctx.fillStyle = '#22d3ee';
      ctx.fillText('ALERT SENT', mailX - 30, 26);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#1e164c');
      bg.addColorStop(1, '#110d2e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      drawHalftone();

      if (projectId === 'solar-power') {
        drawSolarAnimation();
      } else if (projectId === 'workforce-analytics') {
        drawWorkforceAnimation();
      } else {
        drawImagePredictionAnimation();
      }

      if (!prefersReducedMotion) {
        t += 0.018;
        rafId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [projectId]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full block"
      aria-hidden="true"
    />
  );
}
