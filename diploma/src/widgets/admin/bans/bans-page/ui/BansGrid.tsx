import { Skeleton } from "@heroui/react";
import type { AdminBansStyles, BanDisplay } from "../../model/types";
import { BanCard } from "../../ui/BanCard";
import { useTranslation } from "react-i18next";

interface BansGridProps {
  styles: AdminBansStyles;
  bans: BanDisplay[];
  isLoading: boolean;
  isError: boolean;
  canLoadMore: boolean;
  onLoadMore: () => void;
  onRevoke: (item: BanDisplay) => void;
}

export const BansGrid = ({
  styles,
  bans,
  isLoading,
  isError,
  canLoadMore,
  onLoadMore,
  onRevoke,
}: BansGridProps) => {
  const { t } = useTranslation("admin");

  return (
    <>
      {isLoading ? (
        <div className={styles.bansGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className={styles.banCardSkeleton} />
          ))}
        </div>
      ) : isError ? (
        <div className={styles.stateCard}>
          <strong>{t("bans.states.errorTitle")}</strong>
          <span>{t("bans.states.errorText")}</span>
        </div>
      ) : bans.length === 0 ? (
        <div className={styles.stateCard}>
          <strong>{t("bans.states.emptyTitle")}</strong>
          <span>{t("bans.states.emptyText")}</span>
        </div>
      ) : (
        <div className={styles.bansGrid}>
          {bans.map((item) => (
            <BanCard
              key={item.ban.id}
              styles={styles}
              item={item}
              onRevoke={onRevoke}
            />
          ))}
        </div>
      )}

      {canLoadMore && (
        <div className={styles.loadMoreRow}>
          <button type="button" onClick={onLoadMore}>
            {t("bans.states.loadMore")}
          </button>
        </div>
      )}
    </>
  );
};
