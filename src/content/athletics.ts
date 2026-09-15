export interface PersonalRecord {
  event: string;
  mark: string;
  detail?: string;
  featured?: boolean;
}

export interface RaceResult {
  name: string;
  detail: string;
  result: string;
}

export const personalRecords: PersonalRecord[] = [
  { event: "Mile", mark: "4:19", featured: true },
  { event: "10K", mark: "32:44", detail: "5:16/mi pace" },
  { event: "Half Marathon", mark: "1:12:11", detail: "5:30/mi pace" },
];

export const highlights: RaceResult[] = [
  {
    name: "Grand Canyon Rim to Rim to Rim",
    detail: "South Rim → North Rim → South Rim",
    result: "Under 10 hours",
  },
  {
    name: "NYCRUNS Father's Day Half Marathon",
    detail: "Brooklyn, NY · June 2014 · 1:12:11",
    result: "2nd Overall",
  },
  {
    name: "Bates College Squash",
    detail: "No. 1 player · team captain · top 32 nationally",
    result: "Scholar-Athlete",
  },
];
