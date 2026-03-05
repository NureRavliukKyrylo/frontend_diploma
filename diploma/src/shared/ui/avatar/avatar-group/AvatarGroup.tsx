import type { AvatarItem } from "@shared/config/types";
import { Avatar } from "../avatar-base/Avatar";

interface AvatarGroupProps {
  avatars: AvatarItem[];
  avatarClassName?: string;
  className?: string;
}

export const AvatarGroup = ({
  avatars,
  avatarClassName,
  className,
}: AvatarGroupProps) => {
  return (
    <div className={className}>
      {avatars.map((avatar, i) => (
        <Avatar
          key={i}
          src={avatar.src ?? undefined}
          fallback={avatar.name}
          variant={!avatar.src ? "initials" : "default"}
          className={avatarClassName}
        />
      ))}
    </div>
  );
};
