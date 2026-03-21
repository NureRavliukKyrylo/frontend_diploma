import type { AvatarItem } from "@shared/config/types";
import { Avatar } from "../avatar-base/Avatar";
import styles from "./AvatarGroup.module.scss";

interface AvatarGroupProps {
  avatars: AvatarItem[];
  avatarClassName?: string;
  className?: string;
  maxItems?: number;
  remainingClassName?: string;
}

export const AvatarGroup = ({
  avatars,
  avatarClassName,
  className,
  maxItems,
  remainingClassName,
}: AvatarGroupProps) => {
  const sliced = maxItems ? avatars.slice(0, maxItems) : avatars;
  const remaining = maxItems ? avatars.length - sliced.length : 0;

  return (
    <div className={className}>
      {sliced.map((avatar, i) => (
        <Avatar
          key={i}
          src={avatar.src ?? undefined}
          fallback={avatar.name}
          variant={!avatar.src ? "initials" : "default"}
          className={avatarClassName}
        />
      ))}
      {remaining > 0 && (
        <div className={`${styles.remainingItem} ${remainingClassName ?? ""} `}>
          +{remaining}
        </div>
      )}
    </div>
  );
};
