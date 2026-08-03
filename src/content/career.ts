export type CareerStatus =
  | "current"
  | "acquired"
  | "venture"
  | "honored"
  | "education";

export interface CareerHighlight {
  text: string;
  href?: string;
}

export interface CareerEntry {
  period: string;
  title: string;
  org: string;
  detail?: string;
  highlights?: CareerHighlight[];
  status: CareerStatus;
  statusLabel: string;
}

export const career: CareerEntry[] = [
  {
    period: "2018 → NOW",
    title: "CEO & Co-Founder",
    org: "TezLab",
    detail:
      "The leading companion app for Tesla and Rivian drivers, built at the intersection of consumer software, energy, and mobility.",
    highlights: [
      {
        text: "Built a cash-flow-positive platform spanning energy insights, battery health, charging, and vehicle analytics.",
      },
      {
        text: "Structured managed-charging partnerships with National Grid and other major US utilities.",
      },
    ],
    status: "current",
    statusLabel: "Current",
  },
  {
    period: "2009 → 2023",
    title: "Co-Founder & Co-CEO",
    org: "HappyFunCorp",
    detail:
      "Bootstrapped product-engineering company built from two founders into a profitable, $12M-revenue studio.",
    highlights: [
      {
        text: "Acquired by Tiny for $30M in cash and stock in July 2023.",
        href: "https://techcrunch.com/2023/07/03/tiny-acquires-happyfuncorp-the-prolific-firm-thats-built-apps-for-twitter-amazon-and-more-for-30m/",
      },
      {
        text: "Built Twitter/X for Apple TV in a 12-week sprint for NFL Thursday Night Football; named Apple TV App of the Year in 2016.",
        href: "https://www.happyfuncorp.com/work/twitter-x-tv-app-development",
      },
      {
        text: "Helped turn Nike SNKRS into a $70M revenue channel in its first year.",
        href: "https://www.happyfuncorp.com/work/nike-mobile-development",
      },
      {
        text: "Designed and launched Disney Movies Anywhere on tvOS and Roku, serving nearly 6M users and 150M purchased films.",
        href: "https://www.happyfuncorp.com/work/disney-tv-app-development",
      },
      {
        text: "Shipped products for Apple, Disney, Amazon, Twitter, Nike, Samsung, American Express, Audible, and others.",
      },
    ],
    status: "acquired",
    statusLabel: "$30M exit",
  },
  {
    period: "2009 → 2010",
    title: "Co-Founder",
    org: "Workstreamer",
    detail:
      "Early real-time business-listening platform developed within Workthink, before social listening became an established category.",
    highlights: [
      {
        text: "Backed by Austin Ventures at seed.",
        href: "https://techcrunch.com/2010/04/23/workstreamer-is-a-realtime-listening-and-tracking-platform-for-businesses/",
      },
      {
        text: "Raised a $3.5M Series A led by Austin Ventures in July 2010.",
        href: "https://www.prnewswire.com/news-releases/workstreamer-raises-35-million-series-a-round-99306464.html",
      },
      {
        text: "Aggregated and ranked real-time signals from news, social networks, jobs data, SEC filings, and CRM systems.",
      },
    ],
    status: "venture",
    statusLabel: "Venture-backed",
  },
  {
    period: "— → NOW",
    title: "Co-Chair",
    org: "Brooklyn Roasting Company",
    detail: "Specialty coffee roaster & Brooklyn cafés",
    status: "current",
    statusLabel: "Current",
  },
  {
    period: "2000 → 2004 · 2015",
    title: "B.A. American Cultural Studies",
    org: "Bates College",
    detail:
      "#1 squash player · Team captain · Top 32 nationally",
    highlights: [
      {
        text: "Scholar-Athlete Society inductee and keynote speaker in 2015.",
        href: "https://gobatesbobcats.com/sports/2020/6/4/scholar-athlete-society-2015-Ben-Schippers",
      },
    ],
    status: "education",
    statusLabel: "Scholar-Athlete",
  },
];
