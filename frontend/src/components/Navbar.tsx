"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled && "bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5",
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-16">
        <a href="#top" className="font-display font-bold text-xl text-white tracking-tight">
          f-root<span className="text-violet-400">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center text-sm font-semibold text-white border border-white/15 rounded-full px-4 py-1.5 hover:border-violet-400 hover:text-violet-300 transition-colors"
        >
          Let&apos;s Talk
        </a>

        <button
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5 transition-transform" />
          <span className="block w-6 h-0.5 bg-white mb-1.5 transition-opacity" />
          <span className="block w-6 h-0.5 bg-white transition-transform" />
        </button>
      </nav>

      <div className={cn("md:hidden bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10", !open && "hidden")}>
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-gray-300 hover:text-violet-300 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
