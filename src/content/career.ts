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
      "TezLab turns Tesla and Rivian drive, charge, battery, and efficiency data into reports, alerts, and vehicle controls.",
    highlights: [
      {
        text: "Grew TezLab into a cash-flow-positive business.",
      },
      {
        text: "Built managed-charging programs with National Grid.",
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
      "I co-founded HappyFunCorp in 2009. We bootstrapped it to $12M in 2022 revenue; Tiny acquired it for $30M in 2023.",
    highlights: [
      {
        text: "Acquired by Tiny for $30M in cash and stock in July 2023.",
        href: "https://techcrunch.com/2023/07/03/tiny-acquires-happyfuncorp-the-prolific-firm-thats-built-apps-for-twitter-amazon-and-more-for-30m/",
      },
      {
        text: "HFC shipped Twitter's Apple TV app in 12 weeks; Apple named it 2016 App of the Year.",
        href: "https://www.happyfuncorp.com/work/twitter-x-tv-app-development",
      },
      {
        text: "HFC worked on Nike SNKRS, which generated nearly $70M in its first year.",
        href: "https://www.happyfuncorp.com/work/nike-mobile-development",
      },
      {
        text: "HFC built the Roku app and parts of the tvOS app for Disney Movies Anywhere; the service reached nearly 6M users with 150M films in their libraries.",
        href: "https://www.happyfuncorp.com/work/disney-tv-app-development",
      },
    ],
    status: "acquired",
    statusLabel: "Acquired by Tiny",
  },
  {
    period: "2009 → 2010",
    title: "Co-Founder",
    org: "Workstreamer",
    detail:
      "Workstreamer collected live signals from news, social networks, job listings, SEC filings, and CRM systems, then ranked what mattered for a company. This was before business listening became an established software category.",
    highlights: [
      {
        text: "Austin Ventures backed the company at seed.",
        href: "https://techcrunch.com/2010/04/23/workstreamer-is-a-realtime-listening-and-tracking-platform-for-businesses/",
      },
      {
        text: "Raised a $3.5M Series A led by Austin Ventures in July 2010.",
        href: "https://www.prnewswire.com/news-releases/workstreamer-raises-35-million-series-a-round-99306464.html",
      },
    ],
    status: "venture",
    statusLabel: "Venture-backed",
  },
  {
    period: "— → NOW",
    title: "Co-Chair",
    org: "Brooklyn Roasting Company",
    detail: "I co-chair Brooklyn Roasting Company, a specialty coffee roaster with Brooklyn cafés.",
    status: "current",
    statusLabel: "Current",
  },
  {
    period: "2000 → 2004",
    title: "B.A. American Cultural Studies",
    org: "Bates College",
    detail:
      "Four-year No. 1 squash player · two-year team captain · top 32 nationally",
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
