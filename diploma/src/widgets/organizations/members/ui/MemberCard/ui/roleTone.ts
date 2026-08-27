import { Crown, Shield, Star, User, type LucideIcon } from "lucide-react";
import styles from "../MemberCard.module.scss";

export interface RoleTone {
  className: string;
  icon: LucideIcon;
  label: string;
  dotColor: string;
}

export const getRoleTone = (
  roleName: string,
  isOwner: boolean,
  ownerLabel: string,
): RoleTone => {
  if (isOwner) {
    return {
      className: styles.roleOwner,
      icon: Crown,
      label: ownerLabel,
      dotColor: "#8b0000",
    };
  }

  const normalizedRole = roleName.trim().toLowerCase();

  if (
    normalizedRole.includes("admin") ||
    normalizedRole.includes("manager") ||
    normalizedRole.includes("organizer")
  ) {
    return {
      className: styles.roleAdmin,
      icon: Shield,
      label: roleName,
      dotColor: "#c07000",
    };
  }

  if (normalizedRole.includes("lead")) {
    return {
      className: styles.roleLead,
      icon: Star,
      label: roleName,
      dotColor: "#1a7a45",
    };
  }

  return {
    className: styles.roleVolunteer,
    icon: User,
    label: roleName,
    dotColor: "#666666",
  };
};
