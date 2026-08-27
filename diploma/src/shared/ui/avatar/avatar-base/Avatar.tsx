import type { ReactNode } from "react";
import styles from "./Avatar.module.scss";
import { DefaultAvatar } from "@shared/assets/images/user";
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
  initialsClassName?: string;
  children?: ReactNode;
}

export const Avatar = ({
  src,
  fallback,
  shape = "circle",
  variant,
  className,
  initialsClassName,
  children,
}: AvatarProps) => {
  const initials =
    fallback
      ?.trim()
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const showImage = !!src;
  const showInitials =
    !src &&
    (variant === "initials" ||
      (variant === undefined && !!fallback && !!initials));
  const showDefault = !src && !showInitials;
  const colors = getAvatarColor(initials);

  return (
    <div
      className={[
        styles.avatar,
        styles[shape],
        showInitials ? styles.initialsVariant : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={showInitials ? { backgroundColor: colors.bg } : undefined}
    >
      {showImage && (
        <img src={src} alt={fallback ?? "avatar"} className={styles.image} />
      )}
      {showDefault && (
        <img src={DefaultAvatar} alt="avatar" className={styles.image} />
      )}
      {showInitials && (
        <h1
          className={[styles.initials, initialsClassName].filter(Boolean).join(" ")}
          style={{ color: colors.text }}
        >
          {initials}
        </h1>
      )}
      {children}
    </div>
  );
};
