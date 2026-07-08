export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tag: string;
  tech: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: "netflix-clone",
    title: "Netflix Clone",
    description: "Streaming platform with Go microservices & ML recommendations",
    longDescription:
      "Full streaming platform built from scratch: hand-crafted Next.js + Tailwind frontend, Go microservices behind an NGINX load balancer that spins up new Docker instances on demand, machine-learning powered recommendations based on what each user watches, and PostgreSQL via Supabase.",
    image: "/projects/netflix-clone.svg",
    tag: "Fullstack · ML",
    tech: ["Next.js", "Go", "NGINX", "Docker", "PostgreSQL", "Supabase"],
    href: "https://github.com/fernandovmedina",
  },
  {
    id: "xray-diagnosis",
    title: "X-Ray Diagnosis",
    description: "ML model that detects diseases from chest x-ray images",
    longDescription:
      "Medical web app where a doctor uploads an x-ray image and a machine-learning model classifies the disease. Trained with scikit-learn on top of pandas/NumPy pipelines, served through a FastAPI backend with a Next.js frontend.",
    image: "/projects/xray-diagnosis.svg",
    tag: "Machine Learning",
    tech: ["Python", "scikit-learn", "FastAPI", "Next.js", "pandas"],
    href: "https://github.com/fernandovmedina",
  },
  {
    id: "tindertec",
    title: "Tindertec",
    description: "Campus dating platform — 200+ organic users on launch day",
    longDescription:
      "Dating platform for students of TECNM Campus Saltillo. Reached 200+ organic users on launch day with zero paid acquisition. After an App Store rejection, the whole platform was migrated from mobile to web in under 3 days.",
    image: "/projects/tindertec.svg",
    tag: "Product · Startup",
    tech: ["React Native", "Next.js", "Go", "Supabase"],
  },
  {
    id: "car-advisor",
    title: "Car Advisor",
    description: "ML model that tells you if a used car is worth buying",
    longDescription:
      "The user enters the details of a used car and a machine-learning model predicts whether it is a good buy. Built with a FastAPI backend running scikit-learn models and a Next.js frontend.",
    image: "/projects/car-advisor.svg",
    tag: "Machine Learning",
    tech: ["Python", "FastAPI", "scikit-learn", "Next.js", "NumPy"],
    href: "https://github.com/fernandovmedina",
  },
  {
    id: "alra-plastic",
    title: "ALRA Plastic",
    description: "Full traceability system for a recycling company",
    longDescription:
      "Mobile app + web portal for a recycling company: complete lot-by-lot traceability from material intake to client delivery, inventory, client management and employee management, with dedicated portals for HR and finance.",
    image: "/projects/alra-plastic.svg",
    tag: "Enterprise",
    tech: ["Flutter", "Go", "PostgreSQL", "Supabase"],
  },
  {
    id: "grandparents-app",
    title: "Grandparents App",
    description: "One-tap photo dialer for elderly people",
    longDescription:
      "Mobile app designed for elderly people who can't read or use phones: a grid with the faces of their family members — tap a face and the phone call starts. Built in the first year I learned to code, with React Native and community libraries for deep linking and calls.",
    image: "/projects/grandparents-app.svg",
    tag: "Mobile",
    tech: ["React Native", "JavaScript"],
    href: "https://github.com/fernandovmedina",
  },
  {
    id: "logic-exercises",
    title: "Logic Exercises",
    description: "LeetCode, Codeforces, Beecrowd & ICPC problem solutions",
    longDescription:
      "A continuously growing repository of competitive-programming solutions in Python: LeetCode, Codeforces, Beecrowd and ICPC problems, focused on algorithms and data structures.",
    image: "/projects/logic-exercises.svg",
    tag: "Algorithms",
    tech: ["Python", "Algorithms", "Data Structures"],
    href: "https://github.com/fernandovmedina",
  },
];
