"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FrameSequenceProps {
  total: number;
  pathPrefix?: string;
  ext?: "jpg" | "jpeg" | "webp" | "png";
  /** Scroll length multiplier (1 = one viewport of scroll). Larger = slower. */
  scrollLength?: number;
  className?: string;
  bgClassName?: string;
  /** Optional overlays positioned over the canvas, given scroll progress 0..1 */
  children?: (progress: number) => React.ReactNode;
}

/**
 * Apple-style scroll-driven canvas sequence.
 * Pattern proven on the Jonathan López site: GSAP ScrollTrigger with `scrub`
 * reads the document scroll position natively, so it works with or without Lenis.
 */
export function FrameSequence({
  total,
  pathPrefix = "/frames/frame-",
  ext = "jpg",
  scrollLength = 8,
  className,
  bgClassName = "bg-ink",
  children,
}: FrameSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [progress, setProgress] = useState(0);

  /* ---------- preload all frames ---------- */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    let cancelled = false;

    const onLoad = (idx: number) => {
      if (cancelled) return;
      count++;
      setLoaded(count);
      // If this image is at or near the current scroll position, repaint
      if (idx === currentFrameRef.current) drawFrame(idx);
      // First frame just decoded — make sure something is on screen
      if (count === 1) drawFrame(0);
    };

    for (let i = 1; i <= total; i++) {
      const idx = i - 1;
      const img = new Image();
      img.src = `${pathPrefix}${String(i).padStart(3, "0")}.${ext}`;
      img.onload = () => onLoad(idx);
      img.onerror = () => onLoad(idx);
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, pathPrefix, ext]);

  /* ---------- canvas resize ---------- */
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // redraw whatever the current ScrollTrigger frame is
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------- frame draw (source-crop cover) ---------- */
  const currentFrameRef = useRef(0);

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[idx];
    if (!img || !img.complete || !img.naturalWidth) {
      // fall back to the nearest decoded frame so the canvas never goes black
      const arr = imagesRef.current;
      for (let d = 1; d < arr.length; d++) {
        const a = arr[idx - d];
        if (a && a.complete && a.naturalWidth) return paint(ctx, canvas, a);
        const b = arr[idx + d];
        if (b && b.complete && b.naturalWidth) return paint(ctx, canvas, b);
      }
      return;
    }
    paint(ctx, canvas, img);
  };

  const paint = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
  ) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const ca = cw / ch;
    const ia = iw / ih;

    // Source-crop cover (the Jonathan-López approach — no zoom artifacts)
    let sx = 0,
      sy = 0,
      sw = iw,
      sh = ih;
    if (ca > ia) {
      sh = iw / ca;
      sy = (ih - sh) / 2;
    } else {
      sw = ih * ca;
      sx = (iw - sw) / 2;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  };

  /* ---------- GSAP ScrollTrigger driver ---------- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        const frame = Math.min(total - 1, Math.floor(p * (total - 1)));
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          drawFrame(frame);
        }
        setProgress(p);
      },
    });

    // Recompute layout after the component is fully laid out
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 50);

    return () => {
      window.clearTimeout(refreshId);
      st.kill();
    };
  }, [total]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full", className)}
      style={{ height: `${scrollLength * 100}vh` }}
    >
      <div
        className={cn(
          "sticky top-0 h-screen w-full overflow-hidden",
          bgClassName,
        )}
      >
        {/* Poster — visible until at least the first real frame is decoded */}
        {loaded < 1 && (
          <img
            src={`${pathPrefix}001.${ext}`}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-label="Lexus GX550 scroll sequence"
        />
        {/* Loading indicator */}
        {loaded < total && (
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <span className="font-mono text-[10px] tracking-[0.3em] text-paper/60">
              LOADING · {Math.round((loaded / total) * 100)}%
            </span>
          </div>
        )}
        {children?.(progress)}
      </div>
    </section>
  );
}
