import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import { formatTimeAgo } from "@shared/libs/date";
import {
  requestTypeLabels,
  statusLabels,
} from "../../requests-config/libs/requestTypeConfig";
import type { RequestVisual } from "../../requests-config/libs/requestVisualConfig";
import { getStatusClassName } from "../../requests-config/libs/requestHelpers";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";

interface RequestDrawerHeaderProps {
  request: AdminRequestListItem;
  visual: RequestVisual;
  onClose: () => void;
}

export const RequestDrawerHeader = ({
  request,
  visual,
  onClose,
}: RequestDrawerHeaderProps) => {
  const { t } = useTranslation("common");
  const Icon = visual.icon;

  return (
    <div className={styles.requestDrawerHeader}>
      <span className={styles.requestDrawerGlow} aria-hidden="true" />
      <div className={styles.requestDrawerHeaderMain}>
        <span
          className={styles.requestDrawerIcon}
          style={{ background: visual.bg, color: visual.color }}
        >
          <Icon size={24} aria-hidden="true" />
        </span>
        <div className={styles.requestDrawerIdentity}>
          <div className={styles.requestDrawerTitle}>{request.title}</div>
          <div className={styles.requestDrawerMetaRow}>
            <div className={styles.requestDrawerMeta}>
              {requestTypeLabels[request.typeName]} -{" "}
              {formatTimeAgo(request.createdAt, t)}
            </div>
            <span
              className={`${styles.statusPill} ${getStatusClassName(
                request.statusName,
              )}`}
            >
              {statusLabels[request.statusName]}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.drawerCloseButton}
        onClick={onClose}
        aria-label="Close request details"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  );
};
