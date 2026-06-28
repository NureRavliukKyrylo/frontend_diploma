import { BansGrid } from "@widgets/admin/bans/bans-page/ui/BansGrid";
import { BansMetricCards } from "@widgets/admin/bans/bans-page/ui/BansMetricCards";
import { BansToolbar } from "@widgets/admin/bans/bans-page/ui/BansToolbar";
import { RevokeConfirmationModal } from "@widgets/admin/bans/bans-page/ui/RevokeConfirmationModal";
import { useAdminBansPage } from "@widgets/admin/bans/bans-page/model/useAdminBansPage";
import styles from "./AdminBansPage.module.scss";

export const AdminBansPage = () => {
  const page = useAdminBansPage();

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <div className={styles.headingEyebrow}>Admin</div>
          <h1 className={styles.headingTitle}>Bans</h1>
        </div>
        <p className={styles.headingText}>
          Review active restrictions, identify bans nearing expiration, and revoke
          access limits when moderation decisions change.
        </p>
      </div>

      <BansMetricCards
        styles={styles}
        activeCount={page.bansQuery.data?.length}
        expiringSoonCount={page.expiringSoonCount}
        permanentCount={page.permanentCount}
        isLoading={page.bansQuery.isLoading}
        isError={page.bansQuery.isError}
      />

      <BansToolbar
        styles={styles}
        search={page.search}
        duration={page.duration}
        sort={page.sort}
        onSearchChange={page.setSearch}
        onDurationChange={page.setDuration}
        onSortChange={page.setSort}
      />

      <div className={styles.sectionHeader}>
        <span>Active restrictions</span>
        <span className={styles.sectionLine} aria-hidden="true" />
        <strong>
          showing latest {Math.min(page.take, page.bansQuery.data?.length ?? page.take)}
        </strong>
      </div>

      <BansGrid
        styles={styles}
        bans={page.filteredBans}
        isLoading={page.bansQuery.isLoading}
        isError={page.bansQuery.isError}
        canLoadMore={(page.bansQuery.data?.length ?? 0) >= page.take}
        onLoadMore={() => page.setTake((value) => value + 100)}
        onRevoke={page.setRevokeTarget}
      />

      <RevokeConfirmationModal
        styles={styles}
        target={page.revokeTarget}
        reason={page.revokeReason}
        mutation={page.revokeMutation}
        t={page.t}
        onReasonChange={page.setRevokeReason}
        onCancel={page.closeRevokeModal}
      />
    </section>
  );
};
