import { Avatar } from "@heroui/react";
import { OnlineIcon } from "@shared/assets/icons/info";
import type { ReportCase } from "../../model/types/ReportCase";
import styles from "./ReportCaseItem.module.scss";
import { getFullName } from "@entities/user";

interface ReportCaseItemProps {
  reportCase: ReportCase;
}

const statusConfig: Record<
  ReportCase["status"],
  { label: string; className: string }
> = {
  open: { label: "Open", className: styles.statusOpen },
  resolved: { label: "Resolved", className: styles.statusResolved },
  rejected: { label: "Rejected", className: styles.statusRejected },
};

export const ReportCaseItem = ({ reportCase }: ReportCaseItemProps) => {
  const config = statusConfig[reportCase.status];
  const fullName = getFullName(
    reportCase.reporterUser.firstName,
    reportCase.reporterUser.lastName,
  );

  return (
    <div className={`${styles.wrapper} ${styles[reportCase.status]}`}>
      <div className={styles.avatarCol}>
        <Avatar
          className={styles.avatar}
          src={reportCase.reporterUser.avatarUrl}
          fallback={fullName}
        />
      </div>

      <div className={styles.mainContent}>
        <span className={styles.userName}>{fullName}</span>
        <div className={styles.pills}>
          <span className={styles.reasonPill}>{reportCase.reason}</span>
          <span className={styles.subjectPill}>{reportCase.subjectType}</span>
        </div>
        <p className={styles.details}>{reportCase.details}</p>
      </div>

      <div className={styles.statusCol}>
        <span className={`${styles.statusPill} ${config.className}`}>
          <OnlineIcon
            className={`${styles.statusIcon} ${styles[`${reportCase.status}Icon`]}`}
          />
          {config.label}
        </span>
      </div>
    </div>
  );
};
