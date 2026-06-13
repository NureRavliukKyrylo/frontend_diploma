import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import styles from "./ReportCaseWidget.module.scss";
import { getSubjectLink } from "../libs/getSubjectLink";
import { reportQuery } from "@entities/report";
import { Avatar } from "@heroui/react";
import { ResolveCaseButton } from "@features/moderation";
import { getFullName } from "@entities/user";

interface ReportCaseWidgetProps {
  caseId: string;
}

export const ReportCaseWidget = ({ caseId }: ReportCaseWidgetProps) => {
  const { data: reportCase } = useSuspenseQuery(reportQuery.id(caseId));

  const reporterInitials = getFullName(
    reportCase.reporterUser.firstName,
    reportCase.reporterUser.lastName,
  );

  const relatedReported = getFullName(
    reportCase.relatedReported.firstName,
    reportCase.relatedReported.lastName,
  );

  const linkProps = getSubjectLink(
    reportCase.subjectType,
    reportCase.subjectId,
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Report Case</h2>

      <LinkButtonWrapper
        to="/users/$id"
        params={{ id: reportCase.reporterUser.id }}
        className={styles.reporterWrapper}
      >
        <Avatar
          src={reportCase.reporterUser.avatarUrl}
          fallback={reporterInitials}
          className={styles.avatar}
        />
        <div className={styles.reporterInfo}>
          <span className={styles.reporterName}>{reporterInitials}</span>
          <span className={styles.reporterLabel}>Reporter</span>
        </div>
      </LinkButtonWrapper>

      <div className={styles.detailsBlock}>
        <div className={styles.pills}>
          <span className={styles.pill}>{reportCase.subjectType}</span>
          <span className={styles.pill}>{reportCase.reason}</span>
        </div>

        <p className={styles.detailsText}>{reportCase.details}</p>

        {reportCase.entityContent && (
          <div className={styles.entityContent}>
            <span className={styles.entityContentLabel}>Reported content</span>
            <p className={styles.entityContentText}>
              {reportCase.entityContent}
            </p>
          </div>
        )}
      </div>

      {reportCase.relatedReported && (
        <LinkButtonWrapper
          to="/users/$id"
          params={{ id: reportCase.relatedReported.id }}
          className={styles.relatedWrapper}
        >
          <Avatar
            src={reportCase.relatedReported.avatarUrl}
            fallback={relatedReported}
            className={styles.avatar}
          />
          <div className={styles.reporterInfo}>
            <span className={styles.reporterName}>{relatedReported}</span>
            <span className={styles.reporterLabel}>Reported user</span>
          </div>
        </LinkButtonWrapper>
      )}

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
