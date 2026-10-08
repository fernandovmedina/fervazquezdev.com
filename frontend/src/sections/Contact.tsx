import ContactScene from "@/components/ContactScene";
import Icon from "@/components/Icon";
import { site, socials } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full min-h-[90vh] overflow-hidden flex items-end">
      {/* Generative three.js scene (21st.dev "anomalous-matter-hero"), lazy-loaded on approach */}
      <ContactScene />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/70 to-transparent z-10"></div>

      <div className="relative z-20 w-full flex flex-col items-center justify-end pb-20 md:pb-28 pt-40 text-center px-5">
        <span className="text-sm font-mono tracking-widest text-violet-300/80 uppercase" data-reveal="fade">
          Observation Log: Open to Work
        </span>
        <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold leading-tight text-white max-w-3xl" data-reveal="up" data-reveal-delay="0.1">
          Let&apos;s build something together.
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-gray-400" data-reveal="up" data-reveal-delay="0.2">
          Have a product idea, need a backend that scales, or a full platform built from scratch?
          I answer every message — usually the same day.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4" data-reveal="up" data-reveal-delay="0.3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 h-12 px-8 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-400 transition-colors shadow-[0_0_30px_rgba(168,85,247,0.35)]"
          >
            <Icon name="envelope-solid" className="w-4 h-4" />
            {site.email}
          </a>
          <a
            href={site.cv}
            download
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-sm font-medium text-white/80 border border-white/15 hover:border-violet-400 hover:text-violet-300 transition-colors"
          >
            <Icon name="download-solid" className="w-4 h-4" />
            Download CV
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6" data-reveal="fade" data-reveal-delay="0.4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={social.name}
              className="text-white/50 hover:text-violet-300 transition-colors"
            >
              <Icon name={social.icon} className="w-6 h-6" />
            </a>
          ))}
        </div>

        <p className="mt-8 flex items-center gap-2 text-sm text-gray-500" data-reveal="fade" data-reveal-delay="0.5">
          <Icon name="location-dot-solid" className="w-4 h-4 text-violet-400/70" />
          {site.location}
        </p>
      </div>
    </section>
  );
}
