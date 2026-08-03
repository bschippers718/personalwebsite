export interface Article {
  title: string;
  publication: string;
  date: string;
  url: string;
}

export const articles: Article[] = [
  {
    title: "Technology Primed for Upswing",
    publication: "TechCrunch",
    date: "Aug 2016",
    url: "https://techcrunch.com/2016/08/23/tech-is-primed-for-an-upswing/",
  },
  {
    title: "Big Data and Its Developer Fallout",
    publication: "TechCrunch",
    date: "Jun 2016",
    url: "https://techcrunch.com/2016/07/16/big-data-and-its-developer-fallout/",
  },
  {
    title: "The Hungry Consumer and the Software Pivot",
    publication: "TechCrunch",
    date: "Jun 2016",
    url: "https://techcrunch.com/2016/06/25/the-hungry-consumer-and-the-software-pivot/",
  },
  {
    title: "The Downside of an Over-Capitalized Market",
    publication: "TechCrunch",
    date: "Mar 2016",
    url: "https://techcrunch.com/2016/03/16/state-of-affairs/",
  },
  {
    title: "App Fatigue",
    publication: "TechCrunch",
    date: "Feb 2016",
    url: "https://techcrunch.com/2016/02/03/app-fatigue/",
  },
  {
    title: "New-Age Bootstrapping Is Not a Money Problem",
    publication: "TechCrunch",
    date: "Mar 2015",
    url: "https://techcrunch.com/2015/03/12/new-age-bootstrapping-is-not-a-money-problem-its-a-product-opportunity/",
  },
];

export const publications = ["TechCrunch", "FastCompany", "Forbes", "Inc."];
