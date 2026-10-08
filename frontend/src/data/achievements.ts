export type Achievement = {
  title: string;
  place: string;
  venue: string;
  description: string;
  tech: string[];
};

export const achievements: Achievement[] = [
  {
    title: "HackMTY",
    place: "Participant",
    venue: "Biggest hackathon in LATAM",
    description:
      "Built a mobile app for tax tracking with my team: scan tickets, calculate taxes, generate invoices and file tax returns.",
    tech: ["React Native", "Go", "Python", "Supabase"],
  },
  {
    title: "Hackatec",
    place: "Participant",
    venue: "TECNM Campus Saltillo",
    description:
      "Gov-tech recycling app: citizens scan a machine, deposit recyclables, and an ESP32 weighs them and pays out a special crypto usable for taxes, fines and license plates.",
    tech: ["Flutter", "Go", "ESP32"],
  },
  {
    title: "Programming Challenge — Advanced",
    place: "4th Place",
    venue: "TECNM Campus Saltillo",
    description:
      "Finished 4th place in the advanced category of the programming challenge, solving algorithmic problems in Python.",
    tech: ["Python", "Algorithms"],
  },
  {
    title: "Programming Challenge — Beginner",
    place: "Top 10",
    venue: "TECNM Campus Saltillo",
    description:
      "Top 10 finish in my first semester of college, solving algorithmic problems in Go.",
    tech: ["Go", "Algorithms"],
  },
  {
    title: "Networking Challenge — Beginner",
    place: "Top 10",
    venue: "TECNM Campus Saltillo",
    description:
      "Top 10 finish simulating industrial networks with Cisco Packet Tracer.",
    tech: ["Cisco Packet Tracer", "Networking"],
  },
];
