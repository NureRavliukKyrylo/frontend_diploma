import type { AdminQueueItem } from "@entities/admin";
import { Link } from "@tanstack/react-router";
import { formatTimeAgo } from "@shared/libs/date";
import type { TFunction } from "i18next";
import { SlidersHorizontal } from "lucide-react";
import { enumToLabel, getRequestStatusTone } from "../lib/userDisplay";
import type { AdminUsersStyles } from "../model/types";

interface RequestRowProps {
  styles: AdminUsersStyles;
  item: AdminQueueItem;
  t: TFunction;
}

export const RequestRow = ({ styles, item, t }: RequestRowProps) => {
  const tone = getRequestStatusTone(item.status);

  return (
    <Link
      to="/admin/requests"
      search={{ requestId: item.requestId } as never}
      className={styles.requestRow}
    >
      <span className={styles.requestIcon}>
        <SlidersHorizontal size={17} aria-hidden="true" />
      </span>
      <span className={styles.requestBody}>
        <strong>{item.title || enumToLabel(item.type)}</strong>
        <small>
          {t(`admin:requests.types.${item.type}`, {
            defaultValue: item.type
              ? enumToLabel(item.type)
              : t("admin:users.drawer.request"),
          })}
        </small>
      </span>
      <span
        className={`${styles.requestStatus} ${styles[`requestStatus_${tone}`]}`}
      >
        {t(`admin:requests.statuses.${item.status}`, {
          defaultValue: item.status
            ? enumToLabel(item.status)
            : t("admin:users.drawer.new"),
        })}
      </span>
      <span className={styles.requestTime}>
        {formatTimeAgo(item.createdAt, t)}
      </span>
    </Link>
  );
};
