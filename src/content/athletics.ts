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
  { event: "Mile", mark: "4:19", detail: "4:19/mi pace", featured: true },
  { event: "10K", mark: "32:44", detail: "5:16/mi pace" },
  { event: "Half Marathon", mark: "1:11:12", detail: "5:26/mi pace" },
];

export const highlights: RaceResult[] = [
  {
    name: "Grand Canyon Rim to Rim to Rim",
    detail: "~42 miles through the Grand Canyon · Under 10 hours",
    result: "Completed",
  },
  {
    name: "NYCRUNS Father's Day Half Marathon",
    detail: "Brooklyn, NY · June 2014 · 1:19:41",
    result: "2nd Overall",
  },
  {
    name: "Bates College Squash",
    detail: "#1 player on the team · Team Captain · Top 32 nationally",
    result: "Scholar-Athlete",
  },
];
