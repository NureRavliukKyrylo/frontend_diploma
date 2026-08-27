import { Award } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import { getCompactEntityLabel } from "../../../requests-config/libs/requestDrawerHelpers";
import { DrawerInfoRow } from "../DrawerInfoRow";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface BadgeRequestPreviewProps {
  request: AdminRequestListItem;
}

export const BadgeRequestPreview = ({ request }: BadgeRequestPreviewProps) => {
  const { t } = useTranslation("admin");

  return (
    <>
      <div className={styles.drawerDecisionCard}>
        <div className={styles.drawerDecisionIcon}>
          <Award size={23} aria-hidden="true" />
        </div>
        <div>
          <span>{t("requests.previews.recognitionReview")}</span>
          <strong>{t("requests.previews.badgeAward")}</strong>
          <p>
            {request.description || t("requests.previews.recognitionFallback")}
          </p>
        </div>
      </div>

      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionLabel}>
          {t("requests.previews.awardContext")}
        </div>
        <div className={styles.drawerInfoGrid}>
          <DrawerInfoRow
            label={t("requests.drawer.recipient")}
            value={request.userId}
          />
          <DrawerInfoRow
            label={t("requests.drawer.badgeTarget")}
            value={getCompactEntityLabel(
              request.targetEntityType,
              request.targetEntityId,
            )}
          />
          <DrawerInfoRow
            label={t("requests.drawer.linkedProof")}
            value={request.linkedEntityId}
          />
          <DrawerInfoRow
            label={t("requests.drawer.priorityMinutes")}
            value={request.priorityBoostMinutesReserved}
          />
        </div>
      </section>
    </>
  );
};
