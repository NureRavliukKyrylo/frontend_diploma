import type { AvatarItem } from "@shared/config/types";
import type { MemberPreview } from "../../model";

export const memberPreviewToAvatar = (member: MemberPreview): AvatarItem => ({
  src: member.avatarUrl,
  name: `${member.firstName} ${member.lastName}`,
});
