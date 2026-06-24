import type { StatisticsVolunteerResponse } from "@entities/user";
import styles from "./ProfileStatisticsTab.module.scss";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  BadgeIcon,
  AttendanceCalendarIcon,
  TaskIcon,
} from "@shared/assets/icons/info";
import { staggeredCardVariants } from "@shared/assets/animations";
import { Stars } from "@shared/ui/stars";
import { ExportVolunteerStatisticsButton } from "@features/statistics";

interface ProfileStatisticsTabProps {
  statistics: StatisticsVolunteerResponse;
}

export const ProfileStatisticsTab = ({
  statistics,
}: ProfileStatisticsTabProps) => {
  const { t } = useTranslation("profile");

  return (
    <div className={styles.wrapper}>
      <div className={styles.exportButton}>
        <ExportVolunteerStatisticsButton />
      </div>
      <div className={`${styles.row} ${styles.row2}`}>
        <motion.div
          className={`${styles.card} ${styles.heroCard}`}
          custom={1}
          variants={staggeredCardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.heroIcon}>
            <AttendanceCalendarIcon />
          </div>
          <div className={styles.heroInfo}>
            <span className={styles.cardLabel}>
              {t("statistics.totalEventsAttended.label")}
            </span>
            <div className={styles.heroRight}>
              <p className={styles.heroValue}>
                {statistics.totalEventsAttended}
              </p>
              <span className={styles.cardUnit}>
                {t("statistics.totalEventsAttended.unit")}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`${styles.card} ${styles.heroCard}`}
          custom={2}
          variants={staggeredCardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.heroIcon}>
            <TaskIcon />
          </div>
          <div className={styles.heroInfo}>
            <span className={styles.cardLabel}>
              {t("statistics.totalTasksCompleted.label")}
            </span>
            <div className={styles.heroRight}>
              <p className={styles.heroValue}>
                {statistics.totalTasksCompleted}
              </p>
              <span className={styles.cardUnit}>
                {t("statistics.totalTasksCompleted.unit")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={`${styles.row} ${styles.row3}`}>
        {[
          {
            value: statistics.totalEarnedMinutes,
            labelKey: "totalEarnedMinutes",
            accent: styles.accentTeal,
          },
          {
            value: statistics.totalSpentMinutes,
            labelKey: "totalSpentMinutes",
            accent: styles.accentRed,
          },
          {
            value: statistics.availableMinutes,
            labelKey: "availableMinutes",
            accent: styles.accentAmber,
          },
        ].map((item, i) => (
          <motion.div
            key={item.labelKey}
            className={`${styles.card} ${item.accent}`}
            custom={i + 3}
            variants={staggeredCardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.cardBottom}>
              <p className={styles.cardValue}>{item.value}</p>
              <span className={styles.cardUnit}>
                {t(`statistics.${item.labelKey}.unit`)}
              </span>
              <span className={styles.cardLabel}>
                {t(`statistics.${item.labelKey}.label`)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={`${styles.row} ${styles.row3}`}>
        <motion.div
          className={`${styles.card} ${styles.badgeCard}`}
          custom={6}
          variants={staggeredCardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.badgeIconBig}>
            <BadgeIcon />
          </div>
          <div>
            <p className={styles.badgeCount}>{statistics.badgesCount}</p>
            <span className={styles.cardLabel}>
              {t("statistics.badgesCount.label")}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={`${styles.card} ${styles.ratingCard}`}
          custom={7}
          variants={staggeredCardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.ratingRight}>
            <p className={styles.ratingNum}>
              {statistics.averageRating?.toFixed(1) ?? "—"}
            </p>
            <Stars
              value={statistics.averageRating ?? 0}
              className={styles.stars}
              classNameStar={styles.starIcon}
            />
            <span className={styles.cardLabel}>
              {t("statistics.averageRating.label")}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={`${styles.card} ${styles.levelCard}`}
          custom={8}
          variants={staggeredCardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.levelIcon}>
            <BadgeIcon />
          </div>
          <div className={styles.levelInfo}>
            <span className={styles.cardLabel}>
              {t("statistics.currentLevel.label")}
            </span>
            <span className={styles.levelPill}>
              {statistics.currentTimeLevelCode}
            </span>
          </div>
        </motion.div>
      </div>

      <div className={`${styles.row} ${styles.row2}`}>
        {[
          {
            value: statistics.approvedAttendanceCount,
            labelKey: "approvedAttendanceCount",
            accent: styles.accentBlue,
          },
          {
            value: statistics.reservedMinutes,
            labelKey: "reservedMinutes",
            accent: styles.accentGreen,
          },
        ].map((item, i) => (
          <motion.div
            key={item.labelKey}
            className={`${styles.card} ${item.accent}`}
            custom={i + 9}
            variants={staggeredCardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.cardBottom}>
              <p className={styles.cardValue}>{item.value}</p>
              <span className={styles.cardUnit}>
                {t(`statistics.${item.labelKey}.unit`)}
              </span>
              <span className={styles.cardLabel}>
                {t(`statistics.${item.labelKey}.label`)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
