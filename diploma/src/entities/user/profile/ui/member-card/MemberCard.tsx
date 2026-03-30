import { Avatar } from "@shared/ui";
import styles from "./MemberCard.module.scss";

interface MemberCardProps {
  image: string;
  fullName: string;
  role: string;
}

export const MemberCard = ({ image, fullName, role }: MemberCardProps) => {
  return (
    <div className={styles.memberCardWrapper}>
      <Avatar src={image} className={styles.imageMember} fallback={fullName} />
      <div className={styles.userInitials}>
        <h1>{fullName}</h1>
        <h2>{role}</h2>
      </div>
    </div>
  );
};
