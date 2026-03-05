import type { ReactNode } from "react";
import styles from "./Avatar.module.scss";

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
  initialsClassName?: string;
}

export const Avatar = ({
  src,
  fallback,
  shape = "circle",
  variant = "default",
  className,
  children,
  initialsClassName,
}: AvatarProps) => {
  const initials =
    fallback
      ?.trim()
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  return (
    <div
      className={[styles.avatar, styles[shape], styles[variant], className]
        .filter(Boolean)
        .join(" ")}
    >
      {src && (
        <img src={src} alt={fallback ?? "avatar"} className={styles.image} />
      )}
      {!src && variant === "initials" && (
        <h1
          className={[styles.initials, initialsClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {initials}
        </h1>
      )}

      {children}
    </div>
  );
};
