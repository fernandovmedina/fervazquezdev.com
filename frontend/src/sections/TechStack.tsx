"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { frameworks, languages, cloudInfra, tools } from "@/data/stack";
import BallButton from "@/components/BallButton";
import Icon from "@/components/Icon";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const rings = [
  { data: tools, size: 18 },
  { data: languages, size: 28 },
  { data: cloudInfra, size: 38 },
  { data: frameworks, size: 48 },
];

const allTech = rings.flatMap((r) => r.data);

const CATEGORY_ORDER = [
  "My Stack",
  "Frontend Stack",
  "Backend Stack",
  "Mobile Stack",
  "DevOps Stack",
  "Daily Tools",
];

const present = new Set(allTech.flatMap((t) => t.categories));

const categories = ["All", ...CATEGORY_ORDER.filter((c) => present.has(c))];

const matches = (techCategories: string[], cat: string) => cat === "All" || techCategories.includes(cat);

export default function TechStack() {
  const [desktopCat, setDesktopCat] = useState("All");
  const [mobileCat, setMobileCat] = useState("All");
  const [paused, setPaused] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const orbitTweens = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const ctx = gsap.context(() => {
      const ringEls = gsap.utils.toArray<HTMLElement>("[data-orbit]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(ringEls, { y: 80, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" })
        .from("#pause", { opacity: 0, scale: 0.8, duration: 0.4, ease: "back.out(1.5)" }, "-=0.3")
        .from("#btns-stack", { x: 40, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.6");

      orbitTweens.current = ringEls.map((ring, i) =>
        gsap.to(ring, {
          rotate: i % 2 === 0 ? 360 : -360,
          duration: 50 + i * 20,
          repeat: -1,
          ease: "none",
        }),
      );
    }, stack);

    return () => ctx.revert();
  }, []);

  const pause = () => {
    orbitTweens.current.forEach((t) => t.pause());
    setPaused(true);
  };

  const play = () => {
    orbitTweens.current.forEach((t) => t.resume());
    setPaused(false);
  };

  return (
    <section className="w-full pb-24 md:pb-32" id="tech-orbit">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-10 text-center">
        <span className="text-xs font-bold tracking-[0.2em] text-violet-400/70 uppercase" data-reveal="fade">
          — Tools & Technologies —
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mt-3" data-reveal="up" data-reveal-delay="0.1">
          My Tech Stack
        </h2>
        <p className="text-base text-gray-400 mt-3 max-w-lg mx-auto" data-reveal="up" data-reveal-delay="0.2">
          Click a category to highlight the technologies I use in each domain.
        </p>
      </div>

      <div className="desktop-orbit hidden md:block" id="stack" ref={stackRef}>
        <div className="grid md:grid-cols-5 grid-cols-1 h-full min-h-[700px]">
          <div className="hidden md:flex md:col-span-3 w-full h-full justify-center items-center relative pt-10">
            <div id="play" className={cn("absolute z-10", !paused && "hidden")} onClick={play}>
              <Icon name="play-solid" className="move-btn w-50 h-50 hover:bg-[#1a0933] rounded-full" />
            </div>
            <div id="pause" className={cn("absolute z-10", paused && "hidden")} onClick={pause}>
              <Icon name="pause-solid" className="move-btn w-50 h-50 hover:bg-[#1a0933] rounded-full" />
            </div>

            {rings.map((ring, r) => (
              <div
                key={r}
                className="orbit-ring absolute border border-white/[0.06] rounded-full"
                data-orbit
                style={{
                  top: "50%",
                  left: "50%",
                  width: `${ring.size}rem`,
                  height: `${ring.size}rem`,
                  marginTop: `-${ring.size / 2}rem`,
                  marginLeft: `-${ring.size / 2}rem`,
                }}
              >
                {ring.data.map((tech, i) => {
                  const angle = i * (360 / ring.data.length);
                  const on = matches(tech.categories, desktopCat);
                  return (
                    <img
                      key={tech.icon}
                      src={`https://skillicons.dev/icons?i=${tech.icon}`}
                      alt={tech.icon}
                      className={cn("orbit-icon category-icon", on ? "highlighted" : "dimmed")}
                      style={{
                        transform: `rotate(${angle}deg) translateY(-${ring.size / 2}rem) rotate(-${angle}deg)`,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div id="btns-stack" className="col-span-2 flex flex-col justify-center items-center h-full gap-2 py-12 px-4">
            <p className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase mb-4">Filter by category</p>
            {categories.map((cat) => (
              <BallButton key={cat} title={cat} onClick={() => setDesktopCat(cat)} />
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-tech md:hidden px-5 pb-16">
        <div className="mobile-filter-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cn("mobile-filter-btn", cat === mobileCat && "active")}
              onClick={() => setMobileCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mobile-icon-grid">
          {allTech.map((tech, i) => (
            <div
              key={`${tech.icon}-${i}`}
              className={cn(
                "mobile-icon-item",
                matches(tech.categories, mobileCat) ? "mobile-active" : "mobile-hidden",
              )}
              title={tech.icon}
            >
              <img
                src={`https://skillicons.dev/icons?i=${tech.icon}`}
                alt={tech.icon}
                className="mobile-icon-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
