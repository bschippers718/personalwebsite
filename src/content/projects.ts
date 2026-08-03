export type ProjectStatus = "active" | "wip" | "archived";

export interface Project {
  name: string;
  description: string;
  url?: string;
  linkLabel?: string;
  download?: boolean;
  year: string;
  status: ProjectStatus;
  statusLabel?: string;
  highlight?: string;
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
    name: "Battery Health — For Tesla",
    description:
      "A focused iPhone app for understanding Tesla battery capacity, charge cycles, range trends, and fleet comparisons at a glance.",
    url: "https://apps.apple.com/us/app/battery-health-for-tesla/id6764105268",
    linkLabel: "View on the App Store",
    year: "2026",
    status: "active",
    highlight: "Reached #1 among trending paid apps on the App Store.",
    tags: ["iOS", "Tesla", "Battery Data"],
  },
  {
    name: "Sift",
    description:
      "A Chrome extension that turns X into a focused, readable feed by filtering posts around the topics and lists you choose.",
    url: "/downloads/Sift-0.6.7.zip",
    linkLabel: "Download v0.6.7",
    download: true,
    year: "2026",
    status: "wip",
    tags: ["Chrome Extension", "X", "JavaScript"],
  },
  {
    name: "Commons",
    description:
      "An open, shared AI assistant for groups with channels, auditable costs, swappable models, and self-hosting.",
    url: "https://workstreamer.vercel.app",
    linkLabel: "Visit Commons",
    year: "2026",
    status: "wip",
    tags: ["Next.js", "AI", "Open Source"],
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
      "A streamlined interface for reading and organizing X, designed to make social feeds calmer and easier to navigate.",
    url: "https://github.com/bschippers718/distill-app",
    linkLabel: "View on GitHub",
    year: "2025",
    status: "wip",
    tags: ["Next.js", "TypeScript", "X"],
  },
];

export const statusMeta: Record<ProjectStatus, { label: string }> = {
  active: { label: "Active" },
  wip: { label: "In Progress" },
  archived: { label: "Archived" },
};
