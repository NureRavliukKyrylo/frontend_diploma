import { Flag, Gavel } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import { getCompactEntityLabel } from "../../../requests-config/libs/requestDrawerHelpers";
import { DrawerInfoRow } from "../DrawerInfoRow";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface ModerationRequestPreviewProps {
  request: AdminRequestListItem;
}

export const ModerationRequestPreview = ({
  request,
}: ModerationRequestPreviewProps) => {
  const { t } = useTranslation("admin");

  return (
    <>
      <div className={styles.drawerDecisionCard}>
        <div className={styles.drawerDecisionIcon}>
          {request.typeName === "report" ? (
            <Flag size={22} aria-hidden="true" />
          ) : (
            <Gavel size={22} aria-hidden="true" />
          )}
        </div>
        <div>
          <span>
            {request.typeName === "report"
              ? t("requests.types.report")
              : t("requests.types.appeal")}
          </span>
          <strong>
            {request.typeName === "report"
              ? t("requests.previews.reportSignal")
              : t("requests.previews.appealReview")}
          </strong>
          <p>{request.description || t("requests.previews.detailsFallback")}</p>
        </div>
      </div>

      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionLabel}>
          {t("requests.previews.caseContext")}
        </div>
        <div className={styles.drawerInfoGrid}>
          <DrawerInfoRow
            label={t("requests.drawer.submittedBy")}
            value={request.userId}
          />
          <DrawerInfoRow
            label={t("requests.drawer.linkedCase")}
            value={request.linkedEntityId}
          />
          <DrawerInfoRow
            label={t("requests.drawer.target")}
            value={getCompactEntityLabel(
              request.targetEntityType,
              request.targetEntityId,
            )}
          />
          <DrawerInfoRow
            label={t("requests.drawer.source")}
            value={getCompactEntityLabel(
              request.sourceEntityType,
              request.sourceEntityId,
            )}
          />
        </div>
      </section>
    </>
  );
};
