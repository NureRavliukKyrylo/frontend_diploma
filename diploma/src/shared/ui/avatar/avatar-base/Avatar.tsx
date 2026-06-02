import type { ReactNode } from "react";
import styles from "./Avatar.module.scss";
import { getAvatarColor } from "@shared/libs/avatar";
import { DefaultAvatar } from "@shared/assets/images/user";

type AvatarShape = "circle" | "rounded" | "square";

interface AvatarProps {
  src?: string;
  fallback?: string;
  shape?: AvatarShape;
  size?: number;
  className?: string;
  children?: ReactNode;
}

export const Avatar = ({
  src,
  fallback,
  shape = "circle",
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
      .toUpperCase() ?? "";

  const colors = getAvatarColor(initials);

  const showImage = !!src;
  const showInitials = !src && !!fallback;
  const showDefault = !src && !fallback;

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
        <h1 className={styles.initials} style={{ color: colors.text }}>
          {initials}
        </h1>
      )}
      {children}
    </div>
  );
};
