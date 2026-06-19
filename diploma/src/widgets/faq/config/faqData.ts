import { FAQ_ITEMS_PART_ONE } from "./faqItemsPartOne";
import { FAQ_ITEMS_PART_TWO } from "./faqItemsPartTwo";

export type FaqCategory =
  | "all"
  | "account"
  | "timebank"
  | "missions"
  | "organizations"
  | "gamification";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  section: string;
  question: string;
  answer: string;
}

export const FAQ_SECTIONS = [
  "Getting started",
  "Time Bank",
  "Missions & tasks",
  "Organizations",
  "Badges & levels",
  "Account & privacy",
] as const;

export const FAQ_DATA: FaqItem[] = [
  ...FAQ_ITEMS_PART_ONE,
  ...FAQ_ITEMS_PART_TWO,
];

export const toSectionId = (section: string) =>
  section.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
