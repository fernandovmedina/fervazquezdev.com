export const site = {
  name: "Fernando Vazquez",
  role: "Fullstack Developer",
  location: "Saltillo, Coahuila, Mexico",
  email: "fernandovazquez.favm@gmail.com",
  github: "https://github.com/fernandovmedina",
  linkedin: "https://linkedin.com/in/fernando-vazquezmedina",
  instagram: "https://www.instagram.com/fernandovazquez.fv/",
  cv: "/cv.pdf",
  description:
    "Fernando Vazquez — backend-focused fullstack developer from Saltillo, Mexico. Go, TypeScript, Next.js, Astro, PostgreSQL, Docker and cloud infrastructure.",
};

export const socials = [
  { name: "GitHub", icon: "github-brands", href: site.github },
  { name: "LinkedIn", icon: "linkedin-brands", href: site.linkedin },
  { name: "Instagram", icon: "instagram-brands", href: site.instagram },
  { name: "Email", icon: "envelope-solid", href: `mailto:${site.email}` },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#tech-orbit" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
