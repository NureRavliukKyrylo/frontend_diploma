import { CalendarClock, FileText, Link2 } from "lucide-react";
import { formatAdminDate, type AdminRequestListItem } from "@entities/admin";
import {
  getCompactEntityLabel,
  getDrawerIntro,
} from "../../requests-config/libs/requestDrawerHelpers";
import { isDecidable } from "../../requests-config/libs/requestHelpers";
import type { CategoryNameMap } from "../../requests-config/libs/requestTypeConfig";
import { stringifyData } from "../../requests-config/libs/requestPayloadParsing";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { DrawerAuditTrail } from "./DrawerAuditTrail";
import { DrawerRequesterCard } from "./DrawerRequesterCard";
import { GenericRequestPreview } from "./previews/GenericRequestPreview";
import { ProposedCategoryPreview } from "./previews/ProposedCategoryPreview";
import { ProposedSkillPreview } from "./previews/ProposedSkillPreview";
import { useTranslation } from "react-i18next";

interface RequestDrawerBodyProps {
  request: AdminRequestListItem;
  categoryMap: CategoryNameMap;
  decisionComment: string;
  onDecisionCommentChange: (value: string) => void;
  assignToTask: boolean;
  onAssignToTaskChange: (value: boolean) => void;
}

export const RequestDrawerBody = ({
  request,
  categoryMap,
  decisionComment,
  onDecisionCommentChange,
  assignToTask,
  onAssignToTaskChange,
}: RequestDrawerBodyProps) => {
  const { t } = useTranslation("admin");
  const intro = getDrawerIntro(request, t);
  const rawData = stringifyData(request.dataJson);
  const showDecisionControls = isDecidable(request);

  return (
    <div className={styles.requestDrawerBody}>
      <section className={styles.drawerIntroCard}>
        <div>
          <span>{intro.label}</span>
          <strong>{intro.title}</strong>
          <p>{intro.text}</p>
        </div>
        <div className={styles.drawerIntroMeta}>
          <span>
            <Link2 size={14} aria-hidden="true" />
            {getCompactEntityLabel(
              request.targetEntityType,
              request.targetEntityId,
            )}
          </span>
          <span>
            <CalendarClock size={14} aria-hidden="true" />
            {formatAdminDate(request.createdAt)}
          </span>
        </div>
      </section>

      {request.typeName === "skillCreation" ? (
        <ProposedSkillPreview request={request} categoryMap={categoryMap} />
      ) : request.typeName === "categoryCreation" ? (
        <ProposedCategoryPreview request={request} />
      ) : (
        <GenericRequestPreview request={request} />
      )}

      <DrawerRequesterCard request={request} />
      <DrawerAuditTrail request={request} />

      {(request.typeName === "categoryUpdate" ||
        request.typeName === "categoryDeletion") && (
        <div className={styles.drawerSupportBanner}>
          {t("requests.drawer.pendingBackend")}
        </div>
      )}

      {request.typeName === "report" && !request.linkedEntityId && (
        <div className={styles.drawerSupportBanner}>
          {t("requests.drawer.moderationUnavailable")}
        </div>
      )}

      {rawData && request.typeName !== "skillCreation" && (
        <details className={styles.rawPayloadDetails}>
          <summary>
            <FileText size={15} aria-hidden="true" />
            {t("requests.drawer.rawPayload")}
          </summary>
          <pre className={styles.rawJson}>{rawData}</pre>
        </details>
      )}

      {showDecisionControls && (
        <label className={styles.drawerCommentField}>
          <span>{t("requests.decision.comment")}</span>
          <textarea
            value={decisionComment}
            maxLength={1000}
            onChange={(event) => onDecisionCommentChange(event.target.value)}
            placeholder={t("requests.decision.placeholder")}
          />
        </label>
      )}

      {request.typeName === "taskJoin" && showDecisionControls && (
        <label className={styles.drawerAssignField}>
          <input
            type="checkbox"
            checked={assignToTask}
            onChange={(event) => onAssignToTaskChange(event.target.checked)}
          />
          <span>{t("requests.decision.assignVolunteer")}</span>
        </label>
      )}
    </div>
  );
};
