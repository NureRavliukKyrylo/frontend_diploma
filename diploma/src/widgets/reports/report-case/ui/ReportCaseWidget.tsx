import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import styles from "./ReportCaseWidget.module.scss";
import { getSubjectLink } from "../libs/getSubjectLink";
import { reportQuery } from "@entities/report";
import { ResolveCaseButton } from "@features/moderation";
import { getFullName } from "@entities/user";
import { Avatar } from "@shared/ui";

interface ReportCaseWidgetProps {
  caseId: string;
}

export const ReportCaseWidget = ({ caseId }: ReportCaseWidgetProps) => {
  const { data: reportCase } = useSuspenseQuery(reportQuery.id(caseId));

  const reporterFullName = getFullName(
    reportCase.reporter.firstName,
    reportCase.reporter.lastName,
  );

  const linkProps = getSubjectLink(
    reportCase.subject.type,
    reportCase.subject.id,
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Report Case</h2>

      <div className={styles.reporterWrapper}>
        <Avatar
          src={reportCase.reporter.avatarUrl}
          fallback={reporterFullName}
          className={styles.avatar}
        />
        <div className={styles.reporterInfo}>
          <span className={styles.reporterName}>{reporterFullName}</span>
          <span className={styles.reporterLabel}>Reporter</span>
        </div>
      </div>

      <div className={styles.detailsBlock}>
        <div className={styles.pills}>
          <span className={styles.pill}>{reportCase.subjectType}</span>
          <span className={styles.pill}>{reportCase.reason}</span>
        </div>

        {reportCase.subject.title && (
          <p className={styles.subjectTitle}>{reportCase.subject.title}</p>
        )}

        <p className={styles.detailsText}>{reportCase.details}</p>

        {reportCase.subject.content && (
          <div className={styles.entityContent}>
            <span className={styles.entityContentLabel}>Reported content</span>
            <p className={styles.entityContentText}>
              {reportCase.subject.content}
            </p>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {linkProps && (
          <LinkButtonWrapper {...linkProps} className={styles.activityButton}>
            Go to Activity
          </LinkButtonWrapper>
        )}
        <ResolveCaseButton caseId={caseId} />
      </div>
    </div>
  );
};
