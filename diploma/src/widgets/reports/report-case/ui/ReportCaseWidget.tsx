import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import styles from "./ReportCaseWidget.module.scss";
import { getSubjectLink } from "../libs/getSubjectLink";
import { reportQuery } from "@entities/report";
import {
  BanEntityButton,
  BanUserButton,
  BlockUserButton,
  HideContentButton,
  ResolveCaseButton,
} from "@features/moderation";
import { getFullName } from "@entities/user";
import { Avatar } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface ReportCaseWidgetProps {
  caseId: string;
}

export const ReportCaseWidget = ({ caseId }: ReportCaseWidgetProps) => {
  const { data: reportCase } = useSuspenseQuery(reportQuery.id(caseId));
  const { t } = useTranslation("moderation");
  const reporter = reportCase.reporter ?? reportCase.reporterUser;
  const subject = reportCase.subject ?? {
    id: reportCase.subjectId ?? "",
    type: reportCase.subjectType,
    content: null,
    title: "",
    author: null,
  };

  const reporterFullName = getFullName(reporter?.firstName, reporter?.lastName);

  const linkProps = getSubjectLink(subject.type, subject.id);

  const isResolved = reportCase.case.status !== "opened";

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{t("reportCase.title")}</h2>
        <span
          className={`${styles.statusPill} ${styles[reportCase.case.status]}`}
        >
          {t(`report.statuses.${reportCase.case.status}`)}
        </span>
      </div>

      <div className={styles.reporterWrapper}>
        <div className={styles.wrapperReporterInfo}>
          <Avatar
            src={reporter?.avatarUrl}
            fallback={reporterFullName}
            className={styles.avatar}
          />
          <div className={styles.reporterInfo}>
            <span className={styles.reporterName}>{reporterFullName}</span>
            <span className={styles.reporterLabel}>
              {t("reportCase.reporter")}
            </span>
          </div>
        </div>
        <p className={styles.detailsText}>
          {t("reportCase.details")}: {reportCase.details}
        </p>
      </div>

      <div className={styles.detailsBlock}>
        <div className={styles.pills}>
          <span className={styles.pill}>
            {t(`report.subjects.${reportCase.subjectType}`)}
          </span>
          <span className={styles.pill}>
            {t(`report.reasons.${reportCase.reason}`)}
          </span>
        </div>

        {subject.title && (
          <p className={styles.subjectTitle}>{subject.title}</p>
        )}

        {subject.author && (
          <div className={styles.authorWrapper}>
            <Avatar
              src={subject.author.avatarUrl}
              fallback={getFullName(
                subject.author.firstName,
                subject.author.lastName,
              )}
              className={styles.avatar}
            />
            <div className={styles.reporterInfo}>
              <span className={styles.reporterName}>
                {getFullName(
                  subject.author.firstName,
                  subject.author.lastName,
                )}
              </span>
              <span className={styles.reporterLabel}>
                {t("reportCase.contentAuthor")}
              </span>
            </div>
          </div>
        )}

        {subject.content && (
          <div className={styles.entityContent}>
            <span className={styles.entityContentLabel}>
              {t("reportCase.reportedContent")}
            </span>
            <p className={styles.entityContentText}>
              {subject.content}
            </p>
          </div>
        )}
      </div>

      {!isResolved && (
        <div className={styles.actions}>
          <div className={styles.actionMainButtons}>
            {linkProps && (
              <LinkButtonWrapper
                {...linkProps}
                className={styles.activityButton}
              >
                {t("reportCase.goToActivity")}
              </LinkButtonWrapper>
            )}
            <ResolveCaseButton
              caseId={reportCase.case.id}
              reportId={reportCase.id}
            />
          </div>
          {subject.author && (
            <div className={styles.actionMainButtons}>
              {["chatMessage", "comment", "feedback"].includes(
                reportCase.subjectType,
              ) && (
                <BlockUserButton
                  caseId={reportCase.case.id}
                  entityId={subject.id}
                  entityType={subject.type}
                  targetUserId={subject.author.id}
                />
              )}
              <BanUserButton
                caseId={reportCase.case.id}
                targetUserId={subject.author.id}
              />
            </div>
          )}
          {["chatMessage", "comment", "feedback"].includes(
            reportCase.subjectType,
          ) && (
            <HideContentButton
              caseId={reportCase.case.id}
              targetEntityId={subject.id}
              targetEntityType={subject.type}
            />
          )}
          {!["chatMessage", "comment", "feedback"].includes(
            reportCase.subjectType,
          ) && (
            <BanEntityButton
              caseId={reportCase.case.id}
              targetEntityId={subject.id}
              targetEntityType={subject.type}
            />
          )}
        </div>
      )}
    </div>
  );
};
