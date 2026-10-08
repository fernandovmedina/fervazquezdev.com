"use client";

// Magnetic button: follows the pointer while hovered and springs back on leave.
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BallButton({ title, onClick }: { title: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const bounds = btn.getBoundingClientRect();
      const strength = 100;
      const x = (e.clientX - bounds.left) / btn.offsetWidth - 0.5;
      const y = (e.clientY - bounds.top) / btn.offsetHeight - 0.5;
      gsap.to(btn, { duration: 0.5, x: x * strength, y: y * strength, ease: "power4.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { duration: 1, x: 0, y: 0, ease: "elastic.out(1, 0.5)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(btn);
    };
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="ball-button magneto cursor-pointer mt-10 py-2 px-7 text-lg font-semibold border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-[#0f0f0f] transition z-10"
    >
      <span>{title}</span>
    </button>
  );
}
