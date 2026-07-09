import { AdminDirectoryPagination } from "@widgets/admin/shared/ui/AdminDirectoryPagination";
import type { BadgeSortingParams } from "@entities/badge";
import { BadgeDeleteConfirmationModal } from "@widgets/admin/badges/badges-page/ui/BadgeDeleteConfirmationModal";
import { BadgeFormModal } from "@widgets/admin/badges/badge-form-modal/ui/BadgeFormModal";
import { BadgeIconModal } from "@widgets/admin/badges/badge-icon-modal/ui/BadgeIconModal";
import { BadgeViewDrawer } from "@widgets/admin/badges/badge-view-drawer/ui/BadgeViewDrawer";
import { BadgesGrid } from "@widgets/admin/badges/badges-grid/ui/BadgesGrid";
import { BadgesHeaderActions } from "@widgets/admin/badges/badges-page/ui/BadgesHeaderActions";
import { BadgesToolbar } from "@widgets/admin/badges/badges-page/ui/BadgesToolbar";
import { useAdminBadgesPage } from "@widgets/admin/badges/badges-page/model/useAdminBadgesPage";
import { useTranslation } from "react-i18next";
import styles from "./AdminBadgesPage.module.scss";

export const AdminBadgesPage = () => {
  const { t } = useTranslation("admin");
  const page = useAdminBadgesPage();

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <div className={styles.pageEyebrow}>{t("common.eyebrow")}</div>
          <h1 className={styles.pageTitle}>{t("badges.title")}</h1>
        </div>
        <BadgesHeaderActions
          styles={styles}
          onCreate={() => page.setFormState({ mode: "create", badge: null })}
        />
      </div>

      <BadgesToolbar
        styles={styles}
        searchInput={page.searchInput}
        selectedRanks={page.selectedRanks}
        archiveFilterValue={page.archiveFilterValue}
        scopeFilterValue={page.scopeFilterValue}
        autoAwardFilterValue={page.autoAwardFilterValue}
        sortValue={page.search.OrderBy as BadgeSortingParams}
        onSearchInputChange={page.setSearchInput}
        onToggleRank={page.toggleRank}
        onArchiveFilterChange={page.setArchiveFilter}
        onScopeFilterChange={page.setScopeFilter}
        onAutoAwardFilterChange={page.setAutoAwardFilter}
        onSortChange={(value) => page.updateSearch({ OrderBy: value, Page: 1 })}
      />

      <div className={styles.sectionHeader}>
        <span>{t("badges.directory")}</span>
        <span className={styles.sectionLine} aria-hidden="true" />
        <strong className={styles.matchCount}>
          {t("common.matches", { count: page.pagination.totalCount })}
        </strong>
      </div>

      <BadgesGrid
        badges={page.badges}
        isLoading={page.badgesQueryResult.isLoading}
        isError={page.badgesQueryResult.isError}
        onOpenBadge={page.setSelectedBadge}
        onEditBadge={(badge) => page.setFormState({ mode: "edit", badge })}
        onChangeBadgeIcon={page.setIconBadge}
        onArchiveBadge={(badge) => page.archiveMutation.mutate(badge.id)}
        onRecoverBadge={(badge) => page.recoverMutation.mutate(badge.id)}
        onDeleteBadge={(badge) =>
          page.setDeleteTarget({ badge, closeDrawer: false })
        }
      />

      <AdminDirectoryPagination
        styles={styles}
        currentPage={page.pagination.currentPage}
        totalPages={page.pagination.totalPages}
        pageWindow={page.pagination.pageWindow}
        onPageChange={(pageNumber) => page.updateSearch({ Page: pageNumber })}
      />

      <BadgeViewDrawer
        badge={page.selectedBadge}
        onClose={() => page.setSelectedBadge(null)}
        onEdit={(badge) => page.setFormState({ mode: "edit", badge })}
        onChangeIcon={page.setIconBadge}
        onArchive={(badge) => page.archiveMutation.mutate(badge.id)}
        onRecover={(badge) => page.recoverMutation.mutate(badge.id)}
        onDelete={(badge) => page.setDeleteTarget({ badge, closeDrawer: true })}
      />

      <BadgeFormModal
        isOpen={Boolean(page.formState)}
        mode={page.formState?.mode ?? "create"}
        badge={page.formState?.badge}
        onClose={() => page.setFormState(null)}
      />

      <BadgeIconModal
        badge={page.iconBadge}
        onClose={() => page.setIconBadge(null)}
      />

      <BadgeDeleteConfirmationModal
        target={page.deleteTarget}
        mutation={page.deleteMutation}
        onClose={() => page.setDeleteTarget(null)}
      />
    </section>
  );
};
