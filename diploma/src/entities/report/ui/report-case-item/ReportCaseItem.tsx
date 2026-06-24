import { OnlineIcon } from "@shared/assets/icons/info";
import type { ReportCase } from "../../model/types/ReportCase";
import styles from "./ReportCaseItem.module.scss";
import { getFullName } from "@entities/user";
import { Avatar } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface ReportCaseItemProps {
  reportCase: ReportCase;
}

export const ReportCaseItem = ({ reportCase }: ReportCaseItemProps) => {
  const { t } = useTranslation("moderation");
  const fullName = getFullName(
    reportCase.reporter.firstName,
    reportCase.reporter.lastName,
  );

  return (
    <div className={`${styles.wrapper} ${styles[reportCase.status]}`}>
      <div className={styles.avatarCol}>
        <Avatar
          className={styles.avatar}
          src={reportCase.reporter.avatarUrl}
          fallback={fullName}
        />
      </div>

      <div className={styles.mainContent}>
        <span className={styles.userName}>{fullName}</span>
        <p className={styles.details}>
          {reportCase.details ?? t("moderation:report.labels.noDetails")}
        </p>
        <div className={styles.pills}>
          <span className={styles.reasonPill}>
            {t(`moderation:report.reasons.${reportCase.reason}`, {
              defaultValue: reportCase.reason,
            })}
          </span>
          <span className={styles.subjectPill}>
            {t(`moderation:report.subjects.${reportCase.subjectType}`, {
              defaultValue: reportCase.subjectType,
            })}
          </span>
        </div>
      </div>

      <div className={styles.statusCol}>
        <span className={`${styles.statusPill} ${styles[reportCase.status]}`}>
          <OnlineIcon
            className={`${styles.statusIcon} ${styles[reportCase.status]}`}
          />
          {t(`moderation:report.statuses.${reportCase.status}`, {
            defaultValue: reportCase.status,
          })}
        </span>
      </div>
    </div>
  );
};
