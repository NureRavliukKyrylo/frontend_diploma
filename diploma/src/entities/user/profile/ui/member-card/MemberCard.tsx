import { Avatar } from "@shared/ui";
import styles from "./MemberCard.module.scss";
import type { ParticipationMember } from "@shared/config/types";
import { getFullName } from "../../libs/full-name/getFullName";

interface MemberCardProps {
  member: ParticipationMember;
  displayName?: string;
}

export const MemberCard = ({ member, displayName }: MemberCardProps) => {
  const fullName = getFullName(member.firstName, member.lastName);

  return (
    <div className={styles.memberCardWrapper}>
      <Avatar
        src={member.avatarUrl}
        className={styles.imageMember}
        fallback={fullName}
      />
      <div className={styles.userInitials}>
        <h1>{displayName ?? fullName}</h1>
        <h2>{member.role.name}</h2>
      </div>
    </div>
  );
};
