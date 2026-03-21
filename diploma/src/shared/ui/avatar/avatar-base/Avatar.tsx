import type { ReactNode } from "react";
import styles from "./Avatar.module.scss";
import { getAvatarColor } from "@shared/libs/avatar";

type AvatarShape = "circle" | "rounded" | "square";
type AvatarVariant = "default" | "initials";

interface AvatarProps {
  src?: string;
  fallback?: string;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  size?: number;
  className?: string;
  children?: ReactNode;
}

export const Avatar = ({
  src,
  fallback,
  shape = "circle",
  variant = "default",
  className,
  children,
}: AvatarProps) => {
  const initials =
    fallback
      ?.trim()
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  const colors = getAvatarColor(initials);

  return (
    <div
      className={[styles.avatar, styles[shape], styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      style={
        variant === "initials" ? { backgroundColor: colors.bg } : undefined
      }
    >
      {src && (
        <img src={src} alt={fallback ?? "avatar"} className={styles.image} />
      )}
      {!src && variant === "initials" && (
        <h1 className={styles.initials} style={{ color: colors.text }}>
          {initials}
        </h1>
      )}
      {children}
    </div>
  );
};
