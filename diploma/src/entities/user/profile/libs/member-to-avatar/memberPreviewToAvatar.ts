import type { ParticipationMember } from "@entities/participation";
import type { AvatarItem } from "@shared/config/types";

export const memberPreviewToAvatar = (
  member: ParticipationMember,
): AvatarItem => ({
  src: member.avatarUrl,
  name: `${member.firstName} ${member.lastName}`,
});
