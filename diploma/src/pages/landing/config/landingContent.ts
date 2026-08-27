import {
  Award,
  CalendarDays,
  CheckSquare,
  Clock3,
  Grid3X3,
  Medal,
  Trophy,
} from "lucide-react";

export const typewriterWords = [
  "ImpactFlow",
  "Volunteer Platform",
  "Change Starts Here",
  "Your Mission Awaits",
] as const;

export const topLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Settings", href: "/settings" },
] as const;

export const heroNavLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Time Bank", href: "#time-bank" },
  { label: "Activities", href: "#activities" },
  { label: "Gamification", href: "#gamification" },
] as const;

export type SectionId = (typeof heroNavLinks)[number]["href"] extends `#${infer Id}`
  ? Id
  : never;

export const languageOptions = [
  { code: "uk", label: "РЈРєСЂР°С—РЅСЃСЊРєР°", flag: "рџ‡єрџ‡¦" },
  { code: "en", label: "English", flag: "рџ‡¬рџ‡§" },
] as const;

export const stats = [
  { value: 12, suffix: "K+", label: "Active volunteers" },
  { value: 430, suffix: "+", label: "Organizations" },
  { value: 50, suffix: "K+", label: "Hours donated" },
  { value: 8, suffix: "K+", label: "Missions completed" },
] as const;

export const steps = [
  {
    number: "01",
    title: "Find your cause",
    description:
      "Browse missions by map, category, and community need to discover the work that fits your purpose.",
  },
  {
    number: "02",
    title: "Join a mission",
    description:
      "Apply to projects, events, or focused tasks and coordinate with organizations already building impact.",
  },
  {
    number: "03",
    title: "Earn & grow",
    description:
      "Collect verified hours, build skills, unlock badges, and level up through meaningful action.",
  },
] as const;

export const timeBankBullets = [
  "Earn hours by completing missions and tasks",
  "Spend hours to create your own micro-tasks without an organization",
  "Priority boost - spend hours to move up in application queues",
] as const;

export const transactions = [
  { title: "Reconstruction project", value: "+8h", tone: "positive" },
  { title: "Posted micro-task", value: "-2h", tone: "negative" },
  { title: "Equal Voices event", value: "+4h", tone: "positive" },
] as const;

export const activityTypes = [
  {
    Icon: Grid3X3,
    title: "Projects",
    subtitle: "Long-term initiatives",
    description:
      "Collaborate on structured goals with teams, milestones, and shared community outcomes.",
    tag: "Ongoing",
  },
  {
    Icon: CalendarDays,
    title: "Events",
    subtitle: "Time-bound activities",
    description:
      "Join scheduled volunteering moments that bring people together at the right place and time.",
    tag: "Scheduled",
  },
  {
    Icon: CheckSquare,
    title: "Tasks",
    subtitle: "Individual actions",
    description:
      "Take on focused actions that fit your availability and still move a mission forward.",
    tag: "Flexible",
  },
] as const;

export const gamificationItems = [
  {
    Icon: Trophy,
    title: "Levels & XP",
    description: "Every mission earns experience and turns effort into visible progress.",
  },
  {
    Icon: Medal,
    title: "Badges",
    description: "Earn collectible achievements for consistency, teamwork, and impact.",
  },
  {
    Icon: Award,
    title: "Skills",
    description: "Build a verified profile of practical skills shaped by real missions.",
  },
] as const;

export const heroParticles = [
  { size: 16, top: "12%", left: "8%", opacity: 0.12, shape: "circle", driftX: 18, driftY: -12, duration: 7 },
  { size: 10, top: "70%", left: "15%", opacity: 0.08, shape: "square", driftX: -14, driftY: 16, duration: 9 },
  { size: 22, top: "20%", left: "90%", opacity: 0.06, shape: "circle", driftX: -20, driftY: 10, duration: 8 },
  { size: 8, top: "85%", left: "75%", opacity: 0.15, shape: "square", driftX: 12, driftY: -18, duration: 6 },
  { size: 14, top: "45%", left: "4%", opacity: 0.1, shape: "circle", driftX: 16, driftY: 14, duration: 10 },
  { size: 12, top: "8%", left: "60%", opacity: 0.08, shape: "square", driftX: -10, driftY: -14, duration: 7.5 },
  { size: 18, top: "60%", left: "95%", opacity: 0.07, shape: "circle", driftX: -16, driftY: 12, duration: 8.5 },
  { size: 9, top: "92%", left: "40%", opacity: 0.12, shape: "square", driftX: 14, driftY: -10, duration: 6.5 },
] as const;

export const ctaParticles = [
  { left: "14%", top: "26%", x: 16, y: -16, delay: 0 },
  { left: "30%", top: "74%", x: -18, y: -14, delay: 0.6 },
  { left: "72%", top: "22%", x: 18, y: 16, delay: 0.3 },
  { left: "88%", top: "68%", x: -16, y: -18, delay: 1 },
] as const;

export { Clock3 };
