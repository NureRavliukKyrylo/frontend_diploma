import { Check, ExternalLink, X } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import { isDecidable } from "../../requests-config/libs/requestHelpers";
import type { DecisionAction } from "../../requests-config/libs/requestTypeConfig";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface RequestDrawerFooterProps {
  request: AdminRequestListItem;
  onDecide: (action: DecisionAction) => void;
  isDecisionPending: boolean;
}

export const RequestDrawerFooter = ({
  request,
  onDecide,
  isDecisionPending,
}: RequestDrawerFooterProps) => {
  const { t } = useTranslation("admin");
  const showDecisionControls = isDecidable(request);
  const showReportLink =
    request.typeName === "report" && request.linkedEntityId;

  return (
    <div className={styles.requestDrawerFooter}>
      {showDecisionControls ? (
        <>
          <button
            type="button"
            className={styles.drawerRejectButton}
            disabled={isDecisionPending}
            onClick={() => onDecide("reject")}
          >
            <X size={17} aria-hidden="true" />
            {t("requests.actions.reject")}
          </button>
          <button
            type="button"
            className={styles.drawerApproveButton}
            disabled={isDecisionPending}
            onClick={() => onDecide("approve")}
          >
            <Check size={17} aria-hidden="true" />
            {request.typeName === "skillCreation"
              ? t("requests.actions.approveCreateSkill")
              : request.typeName === "categoryCreation"
                ? t("requests.actions.approveCreateCategory")
                : t("requests.actions.approve")}
          </button>
        </>
      ) : showReportLink ? (
        <a
          className={styles.drawerPrimaryLink}
          href={`/reports?reportId=${encodeURIComponent(
            request.linkedEntityId ?? "",
          )}`}
        >
          <ExternalLink size={17} aria-hidden="true" />
          {t("requests.actions.openModeration")}
        </a>
      ) : (
        <div className={styles.drawerFooterBanner}>
          {t("requests.actions.readOnly")}
        </div>
      )}
    </div>
  );
};
