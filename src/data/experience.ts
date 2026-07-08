export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  bullets: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "Roceel",
    role: "Fullstack Developer",
    period: "2026 — Present",
    current: true,
    bullets: [
      "Building a full ERP: clients, inventory, internal processes and employee attendance with facial recognition.",
      "Complete traceability of every material — from workshop entry to client return — via barcode scans at each workstation.",
      "Role system covering every department (HR, finance, logistics and workshop) plus a dedicated client portal.",
    ],
    tech: ["Go", "Next.js", "PostgreSQL", "Docker"],
  },
  {
    company: "Tindertec",
    role: "Founder & Engineer",
    period: "2026",
    bullets: [
      "Launched a campus dating platform for TECNM Saltillo — 200+ organic users on day one with zero paid acquisition.",
      "After an App Store rejection, migrated the full platform from mobile to web in under 3 days.",
    ],
    tech: ["React Native", "Next.js", "Go", "Supabase"],
  },
  {
    company: "OLMEWARE (formerly Neurovix)",
    role: "Founder",
    period: "2025 — Present",
    current: true,
    bullets: [
      "ALRA Plastic: mobile traceability app for a recycling company — lot scanning end-to-end, inventory, clients and a web portal for HR & finance.",
      "MbsMexico: web platform for a construction company in Monterrey — clients, inventory, locations, materials, employees and roles — plus their website, domains and business email.",
      "AG Maquinado: management platform for a CNC workshop — clients, inventory, employees and locations — plus website, mail signatures and domain management.",
    ],
    tech: ["Flutter", "Go", "Next.js", "PostgreSQL", "Supabase"],
  },
  {
    company: "Cima Informatica",
    role: "Web Developer",
    period: "2023 — 2025",
    bullets: [
      "Built multiple websites for schools, government offices and industrial clients.",
      "Focused on optimizing operations and cutting manual overhead for every client.",
    ],
    tech: ["JavaScript", "React", "WordPress", "MySQL"],
  },
  {
    company: "SuperMarketML",
    role: "Software Developer",
    period: "2020 — 2023",
    bullets: [
      "Built internal digital forms and workflow automation to streamline HR operations.",
      "Replaced a fully manual attendance process with an RFID + facial-recognition system, eliminating daily spreadsheet capture and identity fraud between employees.",
    ],
    tech: ["Python", "JavaScript", "MySQL"],
  },
];
