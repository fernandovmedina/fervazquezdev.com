"use client";

// Custom cursor: the Tux logo (public/icon.png) trailing the pointer, growing over
// interactive elements. Only enabled on fine-pointer devices; the native cursor
// stays visible underneath.
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tux = ref.current;
    if (!fine || reduced || !tux) return;

    const tuxX = gsap.quickTo(tux, "x", { duration: 0.12, ease: "power3.out" });
    const tuxY = gsap.quickTo(tux, "y", { duration: 0.12, ease: "power3.out" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(tux, { opacity: 1, duration: 0.3 });
      }
      tuxX(e.clientX);
      tuxY(e.clientY);

      const target = (e.target as HTMLElement).closest("a, button, [data-cursor-grow]");
      tux.classList.toggle("grow", !!target);
    };
    const onLeave = () => {
      visible = false;
      gsap.to(tux, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(tux);
    };
  }, []);

  return <img ref={ref} id="cursor-tux" src="/icon.png" alt="" aria-hidden="true" />;
}
