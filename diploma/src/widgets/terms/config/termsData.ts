export interface TermsSectionData {
  id: string;
  num: string;
  navLabel: string;
  title: string;
  paragraphs: string[];
  badge?: {
    text: string;
    variant: "important" | "neutral";
  };
}

export interface CommunityRule {
  id: string;
  text: string;
}

export const TERMS_SECTIONS: TermsSectionData[] = [
  {
    id: "eligibility",
    num: "01",
    navLabel: "Eligibility & registration",
    title: "Who can use ImpactFlow",
    paragraphs: [
      "You must be at least 16 years old to create an account. By registering, you confirm that all information you provide is accurate, current, and complete.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
    ],
    badge: { text: "All users", variant: "neutral" },
  },
  {
    id: "acceptable-use",
    num: "02",
    navLabel: "Acceptable use",
    title: "How the platform may be used",
    paragraphs: [
      "ImpactFlow is exclusively for legitimate volunteer coordination between individuals and organizations. Commercial solicitation, spam, fake participation records, and unauthorized advertising are strictly prohibited.",
      "You may not use the platform to harass, defraud, or mislead other users or organizations.",
    ],
    badge: { text: "Important", variant: "important" },
  },
  {
    id: "timebank-integrity",
    num: "03",
    navLabel: "Time Bank integrity",
    title: "Honest participation",
    paragraphs: [
      "Time Bank credits reflect real, confirmed volunteer hours. Falsifying attendance records, colluding with organizers to inflate hours, or otherwise manipulating your balance is a serious violation.",
      "Violations of this section may result in immediate and permanent account termination, regardless of prior standing.",
    ],
    badge: { text: "Strictly enforced", variant: "important" },
  },
  {
    id: "organizations",
    num: "04",
    navLabel: "Organizations",
    title: "Rules for organizations",
    paragraphs: [
      "Organizations created on ImpactFlow must represent legitimate non-commercial volunteer initiatives. We reserve the right to review, suspend, or remove organizations that do not meet community standards.",
      "Organization admins are responsible for accurate event information, fair treatment of volunteers, and honest attendance confirmation.",
    ],
    badge: { text: "Org admins", variant: "neutral" },
  },
  {
    id: "content-conduct",
    num: "05",
    navLabel: "Content & conduct",
    title: "Profiles, posts, and communication",
    paragraphs: [
      "Any content you post - profile information, project descriptions, comments, or messages - must not contain hate speech, harassment, explicit material, or content that violates the rights of others.",
      "We reserve the right to remove content and suspend accounts that violate these standards, without prior notice in cases of severe violations.",
    ],
  },
  {
    id: "termination",
    num: "06",
    navLabel: "Termination",
    title: "Account suspension and termination",
    paragraphs: [
      "We may suspend or terminate your account if you violate these terms, engage in fraudulent activity, or pose a risk to other users or organizations.",
      "You may delete your account at any time from Account Settings. Some data may be retained as required by law or for legitimate record-keeping purposes.",
    ],
  },
  {
    id: "liability",
    num: "07",
    navLabel: "Liability",
    title: "Limitation of liability",
    paragraphs: [
      "ImpactFlow facilitates connections between volunteers and organizations but is not responsible for the conduct of either party during in-person or remote activities.",
      "To the maximum extent permitted by law, ImpactFlow is not liable for indirect, incidental, or consequential damages arising from your use of the platform.",
    ],
  },
  {
    id: "governing-law",
    num: "08",
    navLabel: "Governing law",
    title: "Jurisdiction and disputes",
    paragraphs: [
      "These terms are governed by the laws of Ukraine, without regard to conflict-of-law principles.",
      "Any disputes arising from these terms will be resolved through the competent courts of Kyiv, Ukraine.",
    ],
  },
];

export const COMMUNITY_RULES: CommunityRule[] = [
  {
    id: "r1",
    text: "Treat all volunteers, organizers, and staff with respect. Harassment of any kind is grounds for immediate suspension.",
  },
  {
    id: "r2",
    text: "Do not impersonate other users or organizations. Verified organizations display a badge - attempting to replicate it is a serious violation.",
  },
  {
    id: "r3",
    text: "Report suspected abuse via the flag button on any profile or activity. Our moderation team reviews all reports within 48 hours.",
  },
  {
    id: "r4",
    text: "Do not use the platform for any commercial purpose unrelated to genuine volunteer coordination.",
  },
  {
    id: "r5",
    text: "Respect the privacy of other volunteers - do not share their personal information without consent.",
  },
  {
    id: "r6",
    text: "These terms are governed by Ukrainian law. Disputes will be resolved through the courts of Kyiv, Ukraine.",
  },
];

export const TERMS_TOC_ITEMS = [
  ...TERMS_SECTIONS.map(({ id, num, navLabel }) => ({
    id,
    num,
    navLabel,
  })),
  {
    id: "community-rules",
    num: "09",
    navLabel: "Community rules",
  },
];
