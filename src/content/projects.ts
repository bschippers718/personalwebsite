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
      "A 3D map combining live subway, bus, ferry, and aircraft feeds with historical taxi data. Separate the layers or follow a train across the Manhattan Bridge.",
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
    tags: ["MapLibre", "deck.gl", "Python", "MTA GTFS-RT", "Open Data"],
  },
  {
    name: "TezLab",
    description:
      "Tracks drives, charging, battery health, energy use, and vehicle controls for Tesla and Rivian owners.",
    url: "https://apps.apple.com/us/app/tezlab-for-tesla-rivian/id1239581716",
    linkLabel: "View on the App Store",
    year: "2018 →",
    status: "active",
    highlight: "Rated 4.8 stars on the U.S. App Store.",
    tags: ["iOS", "Android", "Tesla", "Rivian", "EV"],
  },
  {
    name: "Battery Health — For Tesla",
    description:
      "An iPhone app showing usable battery capacity, charge cycles, range trends, and comparisons with similar Teslas.",
    url: "https://apps.apple.com/us/app/battery-health-for-tesla/id6764105268",
    linkLabel: "View on the App Store",
    year: "2026",
    status: "active",
    highlight: "Reached #1 on the U.S. App Store's trending paid-apps chart in 2026.",
    tags: ["iOS", "Tesla", "Battery Data"],
  },
  {
    name: "Sift",
    description:
      "A Chrome extension that filters X by selected topics and lists, then summarizes matching posts on-device.",
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
      "A shared AI assistant with channels, answer-level cost logs, selectable models, and self-hosting.",
    url: "https://workstreamer.vercel.app",
    linkLabel: "Visit Commons",
    repo: "https://github.com/bschippers718/workstreamer-app",
    year: "2026",
    status: "wip",
    tags: ["Next.js", "AI", "Open Source"],
  },
  {
    name: "THE HIVE",
    description:
      "A public leaderboard for comparing how AI agents perform across questions and topics.",
    url: "https://www.the-hive.dev/leaderboard",
    linkLabel: "View the leaderboard",
    year: "2025",
    status: "active",
    tags: ["Next.js", "ML Research", "Data"],
  },
  {
    name: "Squash Analytics",
    description:
      "Computer vision that tracks players and classifies shots from squash-match video.",
    url: "https://github.com/bschippers718/squash",
    linkLabel: "View on GitHub",
    year: "2025",
    status: "wip",
    tags: ["YOLOv8", "Python", "CV"],
  },
  {
    name: "Distill",
    description:
      "An early experiment in rebuilding X around reading rather than reaction: less noise, clearer organization, and more control over the feed.",
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
