import { motion } from "framer-motion";
import { DoorClosed, DoorOpen, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrganizationMembersPageModel } from "../../model/types";
import styles from "./MembersStats.module.scss";

interface MembersStatsProps {
  model: OrganizationMembersPageModel;
}

export const MembersStats = ({ model }: MembersStatsProps) => {
  const { t } = useTranslation("common");
  const stats = [
    {
      key: "members",
      icon: <Users size={20} strokeWidth={2.3} />,
      value: model.memberCards.length,
      label: t("memberList.totalMembers"),
    },
    {
      key: "join",
      icon: <DoorOpen size={20} strokeWidth={2.3} />,
      value: model.joinRequests.length,
      label: t("memberList.pendingJoin"),
    },
    {
      key: "leave",
      icon: <DoorClosed size={20} strokeWidth={2.3} />,
      value: model.leaveRequests.length,
      label: t("memberList.pendingLeave"),
    },
  ] as const;

  return (
    <section className={styles.statsRow}>
      {stats.map((stat, index) => (
        <motion.article
          key={stat.key}
          className={styles.statCard}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.06,
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          <span className={styles.statIcon}>{stat.icon}</span>
          <div className={styles.statCopy}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        </motion.article>
      ))}
    </section>
  );
};
