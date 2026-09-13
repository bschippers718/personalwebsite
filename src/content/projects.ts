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
  /** Optional GitHub repository, shown as a secondary link. */
  repo?: string;
  /** Optional screenshot, served from /public. */
  image?: { src: string; alt: string; width: number; height: number };
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "NYC in Motion",
    description:
      "A realtime 3D view of New York as a stack of moving layers: live subway trains at their true depth below the street, MTA buses and NYC Ferry boats on their routes, a replay of taxi and ride-hail traffic along the real street grid, and every aircraft over the region, all drawn over the city's buildings. A slider pulls the strata apart so you can read the city as a section drawing, and you can ride in the cab of a train as it crosses the Manhattan Bridge.",
    url: "https://nyc.benschippers.com",
    linkLabel: "Open the live map",
    repo: "https://github.com/bschippers718/NYCInMotion-",
    image: {
      src: "/projects/nyc-in-motion.jpg",
      alt: "NYC in Motion: Lower Manhattan rendered in 3D with subway lines running beneath the buildings.",
      width: 1728,
      height: 1080,
    },
    year: "2026",
    status: "wip",
    statusLabel: "Building now",
    tags: ["MapLibre", "deck.gl", "Python", "MTA GTFS-RT", "Open Data"],
  },
  {
    name: "TezLab",
    description:
      "EV companion platform with energy insights, battery health tracking, and utility partnerships.",
    url: "https://www.tezlabapp.com/app",
    linkLabel: "Visit TezLab",
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
      "A Chrome extension that turns X into a focused, readable feed by filtering posts around the topics and lists you choose, with an on-device AI Brief that summarizes what passed your filters. No servers, no tracking.",
    url: "/downloads/Sift-1.0.1.zip",
    linkLabel: "Download v1.0.1",
    download: true,
    year: "2026",
    status: "active",
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
    url: "https://www.the-hive.dev/leaderboard",
    linkLabel: "View the leaderboard",
    year: "2025",
    status: "active",
    tags: ["Next.js", "ML Research", "Data"],
  },
  {
    name: "Squash Analytics",
    description:
      "YOLO-powered video analysis for squash matches with player tracking and shot detection.",
    url: "https://github.com/bschippers718/squash",
    linkLabel: "View on GitHub",
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
