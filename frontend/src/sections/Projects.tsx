"use client";

// Port of 21st.dev "card-stack" (fan carousel): same signed-offset fan
// geometry, click-to-focus, drag/swipe, dots, keyboard nav and auto-advance,
// animated with GSAP instead of framer-motion.
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SectionHeading from "@/components/SectionHeading";
import Icon from "@/components/Icon";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

// Fan geometry constants (from the original component defaults)
const MAX_OFFSET = 2; // maxVisible 5
const SPREAD_DEG = 30;
const STEP_DEG = SPREAD_DEG / MAX_OFFSET;
const OVERLAP = 0.48;
const DEPTH_PX = 140;
const TILT_X = 12;
const ACTIVE_LIFT = 22;
const ACTIVE_SCALE = 1.03;
const INACTIVE_SCALE = 0.94;

const len = projects.length;
const wrap = (n: number) => ((n % len) + len) % len;

function signedOffset(i: number, active: number) {
  const raw = i - active;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [shown, setShown] = useState(0);
  const [infoVisible, setInfoVisible] = useState(true);

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const hovering = useRef(false);
  const drag = useRef({ active: false, startX: 0, startT: 0 });
  const animate = useRef(false);

  const goTo = (i: number) => setActive(wrap(i));
  const next = () => setActive((a) => wrap(a + 1));
  const prev = () => setActive((a) => wrap(a - 1));

  // Size the cards to the stage width
  useEffect(() => {
    const measure = () => {
      const w = stageRef.current!.clientWidth;
      const cardW = Math.round(Math.min(520, Math.max(240, w * 0.55)));
      animate.current = false;
      setSize({ w: cardW, h: Math.round(cardW * 0.615) });
    };
    measure();

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Lay out the fan whenever the active card or the size changes
  function layout(withAnimation: boolean) {
    if (!size) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spacing = Math.max(10, Math.round(size.w * (1 - OVERLAP)));

    cardRefs.current.forEach((card, i) => {
      const off = signedOffset(i, active);
      const abs = Math.abs(off);
      const isActive = off === 0;

      card.style.zIndex = String(100 - abs);
      card.style.cursor = isActive ? "grab" : "pointer";

      gsap.to(card, {
        x: off * spacing,
        y: abs * 10 + (isActive ? -ACTIVE_LIFT : 0),
        z: -abs * DEPTH_PX,
        rotationZ: off * STEP_DEG,
        rotationX: isActive ? 0 : TILT_X,
        scale: isActive ? ACTIVE_SCALE : INACTIVE_SCALE,
        autoAlpha: abs <= MAX_OFFSET ? 1 : 0,
        duration: withAnimation && !reduced ? 0.65 : 0,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }

  useEffect(() => {
    layout(animate.current);
    animate.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, size]);

  // Fade the details panel out, swap its content, fade back in
  useEffect(() => {
    if (active === shown) return;
    setInfoVisible(false);
    const t = setTimeout(() => {
      setShown(active);
      setInfoVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [active, shown]);

  // Auto-advance, paused on hover or drag
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!hovering.current && !drag.current.active) next();
    }, 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => cardRefs.current.forEach((card) => gsap.killTweensOf(card)), []);

  const onPointerDown = (e: React.PointerEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".stack-card");
    if (!card || Number(card.dataset.index) !== active) return;
    drag.current = { active: true, startX: e.clientX, startT: performance.now() };
    card.style.cursor = "grabbing";
    card.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    gsap.set(cardRefs.current[active], { x: `+=${dx * 0.15}` });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active || !size) return;
    drag.current.active = false;
    const dx = e.clientX - drag.current.startX;
    const velocity = (dx / Math.max(1, performance.now() - drag.current.startT)) * 1000;
    const threshold = Math.min(160, size.w * 0.22);

    if (dx > threshold || velocity > 650) prev();
    else if (dx < -threshold || velocity < -650) next();
    else layout(true);
  };

  const onPointerCancel = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    layout(true);
  };

  const project = projects[shown];

  return (
    <section id="projects" className="w-full pb-24 md:pb-32 overflow-hidden">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects"
        subtitle="Drag, click or swipe through the stack — every card is a real product I've built."
      />

      <div className="max-w-5xl mx-auto px-5 md:px-8" data-reveal="up">
        {/* Stage */}
        <div
          ref={stageRef}
          className="relative w-full outline-none"
          style={{ height: size ? `${Math.max(300, size.h + 80)}px` : undefined }}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Projects"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
        >
          {/* background wash / spotlight */}
          <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-white/5 blur-3xl" aria-hidden="true"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true"></div>

          <div className="absolute inset-0 flex items-end justify-center" style={{ perspective: "1100px" }}>
            {projects.map((p, i) => (
              <article
                key={p.id}
                ref={(el) => {
                  if (el) cardRefs.current[i] = el;
                }}
                className="stack-card absolute bottom-0 rounded-2xl border-4 border-white/10 overflow-hidden shadow-xl will-change-transform select-none"
                style={size ? { width: `${size.w}px`, height: `${size.h}px` } : undefined}
                data-index={i}
                onClick={() => {
                  if (i !== active) goTo(i);
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="relative z-10 flex h-full flex-col justify-end p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-violet-300 mb-1">{p.tag}</span>
                  <h3 className="truncate text-lg font-display font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/80">{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className={cn("h-2 w-2 rounded-full hover:bg-white/50 transition", i === active ? "bg-white" : "bg-white/30")}
                aria-label={`Go to ${p.title}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Active project details */}
        <div
          className="mt-10 max-w-2xl mx-auto text-center transition-opacity duration-300"
          style={{ opacity: infoVisible ? 1 : 0 }}
        >
          <h3 className="text-2xl font-display font-semibold text-white">{project.title}</h3>
          <p className="text-gray-400 mt-3 leading-relaxed text-sm md:text-base">{project.longDescription}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-medium text-gray-400 border border-white/10 bg-white/[0.03] rounded-full px-3 py-1">
                {t}
              </span>
            ))}
          </div>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors"
            >
              View on GitHub
              <Icon name="arrow-up-right-solid" className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
