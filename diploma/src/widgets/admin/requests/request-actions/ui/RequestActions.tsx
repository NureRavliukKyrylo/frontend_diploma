import { Check, X } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import { isDecidable } from "../../requests-config/libs/requestHelpers";
import type { DecisionAction } from "../../requests-config/libs/requestTypeConfig";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface RequestActionsProps {
  request: AdminRequestListItem;
  onDecide: (request: AdminRequestListItem, action: DecisionAction) => void;
}

export const RequestActions = ({ request, onDecide }: RequestActionsProps) => {
  const { t } = useTranslation("admin");

  if (isDecidable(request)) {
    return (
      <div className={styles.actionButtons}>
        <button
          type="button"
          className={styles.approveButton}
          onClick={(event) => {
            event.stopPropagation();
            onDecide(request, "approve");
          }}
        >
          <Check size={15} aria-hidden="true" />
          {t("requests.actions.approve")}
        </button>
        <button
          type="button"
          className={styles.rejectButton}
          onClick={(event) => {
            event.stopPropagation();
            onDecide(request, "reject");
          }}
        >
          <X size={15} aria-hidden="true" />
          {t("requests.actions.reject")}
        </button>
      </div>
    );
  }

  if (
    request.typeName === "categoryUpdate" ||
    request.typeName === "categoryDeletion"
  ) {
    return (
      <span className={styles.viewLinkDisabled}>
        {t("requests.actions.pendingBackend")}
      </span>
    );
  }

  if (request.typeName === "report" || request.typeName === "appeal") {
    return null;
  }

  return (
    <span className={styles.viewLinkDisabled}>
      {t("requests.actions.notActionable")}
    </span>
  );
};
