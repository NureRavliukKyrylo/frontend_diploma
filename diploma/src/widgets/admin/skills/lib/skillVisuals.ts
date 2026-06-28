import type { SkillListItemDto } from "@entities/skill";

const skillTones = [
  { background: "#fbeaea", color: "#8b0000" },
  { background: "#fff3da", color: "#c07000" },
  { background: "#f1efe8", color: "#5f5e5a" },
  { background: "#e6f1fb", color: "#185fa5" },
];

const getHash = (source: string) =>
  source.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

export const getSkillInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .join("")
    .slice(0, 2)
    .toUpperCase() || "SK";

export const getSkillTone = (skill: Pick<SkillListItemDto, "id" | "name">) =>
  skillTones[getHash(skill.id || skill.name) % skillTones.length];
