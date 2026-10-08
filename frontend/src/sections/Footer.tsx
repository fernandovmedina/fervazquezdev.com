import Icon from "@/components/Icon";
import { site, socials, navLinks } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <a href="#top" className="font-display font-bold text-2xl text-white tracking-tight">
            f-root<span className="text-violet-400">.</span>
          </a>
          <p className="text-sm text-gray-500 mt-2">
            © {year} {site.name}. Built with Next.js & Tailwind CSS.
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={social.name}
              className="text-gray-500 hover:text-violet-300 transition-colors"
            >
              <Icon name={social.icon} className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
