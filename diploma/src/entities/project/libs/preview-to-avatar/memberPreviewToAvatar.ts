import type { MemberPreview } from "@entities/project/model/types/Project";
import type { AvatarItem } from "@shared/config/types";

export const memberPreviewToAvatar = (member: MemberPreview): AvatarItem => ({
  src: member.avatarUrl,
  name: `${member.firstName} ${member.lastName}`,
});
