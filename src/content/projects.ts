export type ProjectStatus = "active" | "wip" | "archived";

export interface Project {
  name: string;
  description: string;
  url?: string;
  year: string;
  status: ProjectStatus;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "TezLab",
    description:
      "EV companion platform with energy insights, battery health tracking, and utility partnerships.",
    year: "2018 →",
    status: "active",
    tags: ["React Native", "EV", "Energy"],
  },
  {
    name: "THE HIVE",
    description:
      "ML talent intelligence leaderboard tracking the most valuable minds in AI.",
    year: "2025",
    status: "active",
    tags: ["Next.js", "ML Research", "Data"],
  },
  {
    name: "Squash Analytics",
    description:
      "YOLO-powered video analysis for squash matches with player tracking and shot detection.",
    year: "2025",
    status: "wip",
    tags: ["YOLOv8", "Python", "CV"],
  },
  {
    name: "Distill",
    description:
      "Mobile app and web platform. React Native + Expo with a companion web dashboard.",
    year: "2024",
    status: "wip",
    tags: ["Expo", "TypeScript", "Supabase"],
  },
  {
    name: "BenSchippers.com",
    description:
      "This site. Built with Next.js, Drizzle ORM, and Neon Postgres.",
    url: "https://benschippers.com",
    year: "2025",
    status: "active",
    tags: ["Next.js", "Postgres"],
  },
];

export const statusMeta: Record<ProjectStatus, { label: string }> = {
  active: { label: "Active" },
  wip: { label: "In Progress" },
  archived: { label: "Archived" },
};
