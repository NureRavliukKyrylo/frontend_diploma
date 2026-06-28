import { Skeleton } from "@heroui/react";
import type { AdminBansStyles, BanDisplay } from "../../model/types";
import { BanCard } from "../../ui/BanCard";

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
}: BansGridProps) => (
  <>
    {isLoading ? (
      <div className={styles.bansGrid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className={styles.banCardSkeleton} />
        ))}
      </div>
    ) : isError ? (
      <div className={styles.stateCard}>
        <strong>Bans unavailable</strong>
        <span>The active bans endpoint could not be loaded.</span>
      </div>
    ) : bans.length === 0 ? (
      <div className={styles.stateCard}>
        <strong>No active bans found</strong>
        <span>Try another search term or duration filter.</span>
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
          Load more
        </button>
      </div>
    )}
  </>
);
