"use client";

import { ShieldSlashIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function UnauthorizedPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#09090f] text-white overflow-hidden ">
      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Glow blobs */}
      <div className="fixed -top-40 -left-40 w-150 h-150 rounded-full blur-[110px] bg-primary/10 animate-pulse" />
      <div className="fixed -bottom-40 -right-40 w-125 h-125 rounded-full blur-[110px] bg-secondary animate-pulse" />

      {/* Page */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* NAV */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md border-b border-white/10 bg-black/40">
          <Link
            href="/"
            className="font-bold tracking-tight text-lg text-primary"
          >
            Chefalio
          </Link>
        </nav>

        {/* MAIN */}
        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            {/* lock */}
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-xl bg-accent/10 border border-primary text-2xl mb-6 animate-pulse">
              <ShieldSlashIcon className="w-8 h-8 text-primary" weight="fill" />
            </div>

            <p className="text-center text-red-300 text-xs tracking-widest uppercase mb-3">
              Error 401 · Unauthorized
            </p>

            <h1 className="text-center text-3xl md:text-4xl font-bold bg-linear-to-r from-white to-red-300 text-transparent bg-clip-text mb-4">
              Access Restricted
            </h1>

            <p className="text-center text-white/50 text-sm leading-relaxed mb-8">
              You don’t have permission to view this page. This area is
              restricted to authorized users only.
            </p>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-red-500/20 bg-red-500/10 mb-8">
              <p className="text-xs text-red-300 leading-relaxed">
                If you believe this is a mistake, please contact your workspace
                admin or sign in with the correct account.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-primary to-accent text-black text-sm font-medium shadow-lg hover:scale-[1.02] transition"
              >
                Sign in to continue →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
