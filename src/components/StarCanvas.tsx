'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleDir: number;
}

interface Shooting {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  trail: { x: number; y: number }[];
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0,
      H = 0;
    let stars: Star[] = [];
    let shooting: Shooting[] = [];
    let animId: number;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      }));
    }

    function spawnShooting() {
      if (Math.random() < 0.003) {
        shooting.push({
          x: Math.random() * W * 0.7,
          y: Math.random() * H * 0.35,
          vx: 5 + Math.random() * 5,
          vy: 2 + Math.random() * 3,
          life: 1,
          trail: [],
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Stars
      for (const s of stars) {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha > 0.95 || s.alpha < 0.05) s.twinkleDir *= -1;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(186,230,253,${s.alpha})`;
        ctx!.fill();
      }

      // Shooting stars
      spawnShooting();
      shooting = shooting.filter((s) => {
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 18) s.trail.shift();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.025;
        if (s.life <= 0) return false;

        for (let i = 0; i < s.trail.length; i++) {
          const a = (i / s.trail.length) * s.life * 0.8;
          ctx!.beginPath();
          ctx!.arc(s.trail[i].x, s.trail[i].y, 0.9, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(186,230,253,${a})`;
          ctx!.fill();
        }
        return true;
      });

      animId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
