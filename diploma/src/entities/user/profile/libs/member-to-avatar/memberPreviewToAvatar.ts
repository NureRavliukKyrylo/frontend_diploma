import type { AvatarItem, ParticipationMember } from "@shared/config/types";

export const memberPreviewToAvatar = (
  member: ParticipationMember,
): AvatarItem => ({
  src: member.avatarUrl,
  name: `${member.firstName} ${member.lastName}`,
});
