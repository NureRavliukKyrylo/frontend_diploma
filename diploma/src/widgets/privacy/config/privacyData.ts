export interface PrivacySection {
  id: string;
  num: string;
  navLabel: string;
  title: string;
  paragraphs: string[];
  callout?: string;
  chips?: string[];
  actions?: {
    label: string;
    variant: "primary" | "outline";
    icon: string;
  }[];
}

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "data-we-collect",
    num: "01",
    navLabel: "Data we collect",
    title: "What information do we gather?",
    paragraphs: [
      "We collect information you provide directly when registering, building your profile, or joining organizations - including your name, email address, profile photo, and volunteer activity history.",
      "We also automatically collect technical data such as device type, browser, and approximate location (if you enable location-based mission discovery) to improve your experience.",
    ],
    callout:
      "We never sell your personal data to third parties. Your volunteer record belongs to you and can be exported at any time.",
    chips: [
      "Name & email",
      "Profile data",
      "Activity logs",
      "Location (optional)",
      "Device info",
    ],
  },
  {
    id: "how-we-use-it",
    num: "02",
    navLabel: "How we use it",
    title: "Why do we process your data?",
    paragraphs: [
      "Your data powers your volunteer experience: matching missions to your skills, calculating Time Bank credits, awarding badges, and generating impact reports for the organizations you support.",
      "Aggregated, anonymized data may also be used to improve platform features and measure overall community impact.",
    ],
    callout:
      "You can export or permanently delete your data at any time from Account Settings -> Privacy.",
  },
  {
    id: "data-sharing",
    num: "03",
    navLabel: "Data sharing",
    title: "Who can see your information?",
    paragraphs: [
      "Organizations you join can see your profile, level, badges, and participation history within their organization. Other volunteers can see your public profile information.",
      "We do not share your personal data with advertisers or external marketing platforms unless you have explicitly opted in via Cookie Settings.",
    ],
  },
  {
    id: "your-rights",
    num: "04",
    navLabel: "Your rights",
    title: "Control over your information",
    paragraphs: [
      "Under GDPR and applicable data protection law, you have the right to access, correct, export, or erase your personal data at any time.",
      "Submit requests through our Privacy Center or by emailing privacy@impactflow.org - we respond to all requests within 30 days.",
    ],
    actions: [
      {
        label: "Export my data",
        variant: "primary",
        icon: "IconDownload",
      },
      {
        label: "Contact privacy team",
        variant: "outline",
        icon: "IconMail",
      },
    ],
  },
  {
    id: "security",
    num: "05",
    navLabel: "Security",
    title: "How we protect your data",
    paragraphs: [
      "All data is encrypted in transit using TLS and at rest using industry-standard encryption. Access to personal data is restricted to authorized personnel only.",
      "We perform regular security audits and promptly patch vulnerabilities to keep your information safe.",
    ],
  },
  {
    id: "cookies",
    num: "06",
    navLabel: "Cookies",
    title: "How we use cookies",
    paragraphs: [
      "We use essential cookies to keep you logged in and remember your preferences. With your consent, we also use analytics and marketing cookies to improve the platform.",
      "You can manage your cookie preferences at any time on the Cookie Settings page.",
    ],
    actions: [
      {
        label: "Manage cookie settings",
        variant: "outline",
        icon: "IconSettings",
      },
    ],
  },
  {
    id: "changes",
    num: "07",
    navLabel: "Changes to this policy",
    title: "How we communicate updates",
    paragraphs: [
      "We may update this Privacy Policy from time to time. If we make material changes, we will notify you via email or an in-app notification before the changes take effect.",
      'The "last updated" date at the top of this page always reflects the most recent revision.',
    ],
  },
  {
    id: "contact",
    num: "08",
    navLabel: "Contact us",
    title: "Questions about this policy?",
    paragraphs: [
      "If you have any questions about how we handle your data, reach out to our privacy team - we are happy to help.",
    ],
    actions: [
      {
        label: "Email privacy@impactflow.org",
        variant: "primary",
        icon: "IconMail",
      },
    ],
  },
];
