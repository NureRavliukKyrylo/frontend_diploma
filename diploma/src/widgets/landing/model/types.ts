import type { Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface LandingParticle {
  left: string;
  top: string;
  x: number;
  y: number;
  delay: number;
}

export interface LandingHeroContent {
  typewriterWords: readonly string[];
  navLinks: readonly { label: string; href: `#${string}` }[];
  particles: readonly LandingParticle[];
  titleStart: string;
  titleKeep: string;
  titleAccent: string;
  subtitle: string;
  cta: string;
  scrollLabel: string;
}

export interface LandingStat {
  value: number;
  suffix: string;
  label: string;
}

export interface LandingStepsContent {
  tag: string;
  title: string;
  items: readonly {
    number: string;
    title: string;
    description: string;
  }[];
}

export interface LandingTimeBankContent {
  tag: string;
  title: string;
  description: string;
  bullets: readonly string[];
  balance: string;
  level: string;
  transactions: readonly {
    title: string;
    value: string;
    tone: "positive" | "negative";
  }[];
}

interface LandingCard {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export interface LandingActivitiesContent {
  activitiesTag: string;
  activitiesTitle: string;
  activities: readonly (LandingCard & {
    subtitle: string;
    tag: string;
  })[];
  gamificationTag: string;
  gamificationTitle: string;
  gamification: readonly LandingCard[];
}

export interface LandingCtaContent {
  title: string;
  subtitle: string;
  button: string;
  particles: readonly LandingParticle[];
}

export interface LandingContent {
  hero: LandingHeroContent;
  stats: readonly LandingStat[];
  steps: LandingStepsContent;
  timeBank: LandingTimeBankContent;
  activities: LandingActivitiesContent;
  cta: LandingCtaContent;
}

export interface LandingAnimations {
  sectionViewport: { once: boolean; margin: string };
  sectionVariants: Variants;
  heroContainerVariants: Variants;
  heroItemVariants: Variants;
  cardListVariants: Variants;
  cardVariants: Variants;
  scrollEase: readonly [number, number, number, number];
}
