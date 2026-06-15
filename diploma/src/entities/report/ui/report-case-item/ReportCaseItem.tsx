import { OnlineIcon } from "@shared/assets/icons/info";
import type { ReportCase } from "../../model/types/ReportCase";
import styles from "./ReportCaseItem.module.scss";
import { getFullName } from "@entities/user";
import { capitalize } from "@shared/libs/text";
import { Avatar } from "@shared/ui";

interface ReportCaseItemProps {
  reportCase: ReportCase;
}

export const ReportCaseItem = ({ reportCase }: ReportCaseItemProps) => {
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
        <span className={`${styles.statusPill} ${styles[reportCase.status]}`}>
          <OnlineIcon
            className={`${styles.statusIcon} ${styles[reportCase.status]}`}
          />
          {capitalize(reportCase.status)}
        </span>
      </div>
    </div>
  );
};
