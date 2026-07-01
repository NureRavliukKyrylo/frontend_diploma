import { formatAdminCount } from "@entities/admin";
import { AdminChangeRoleModal } from "@widgets/admin/users/ui/AdminChangeRoleModal";
import { AdminMessageUserModal } from "@widgets/admin/users/ui/AdminMessageUserModal";
import { UserSummaryDrawer } from "@widgets/admin/users/user-summary-drawer/ui/UserSummaryDrawer";
import { UsersGrid } from "@widgets/admin/users/users-grid/ui/UsersGrid";
import { UsersPagination } from "@widgets/admin/users/users-grid/ui/UsersPagination";
import { UsersMetricCards } from "@widgets/admin/users/users-metrics/ui/UsersMetricCards";
import { useAdminUsersPage } from "@widgets/admin/users/users-page/model/useAdminUsersPage";
import { UsersToolbar } from "@widgets/admin/users/users-toolbar/ui/UsersToolbar";
import { useTranslation } from "react-i18next";
import styles from "./AdminUsersPage.module.scss";

export const AdminUsersPage = () => {
  const { t } = useTranslation("admin");
  const page = useAdminUsersPage();

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <div className={styles.headingEyebrow}>{t("common.eyebrow")}</div>
          <h1 className={styles.headingTitle}>{t("users.title")}</h1>
        </div>
        <p className={styles.headingText}>{t("users.description")}</p>
      </div>

      <UsersMetricCards styles={styles} metrics={page.metrics} />

      <UsersToolbar
        styles={styles}
        search={page.search}
        searchInput={page.searchInput}
        roleFilterOptions={page.toolbar.roleFilterOptions}
        roleFilterValue={page.toolbar.roleFilterValue}
        statusDropDownValue={page.toolbar.statusDropDownValue}
        onSearchInputChange={page.setSearchInput}
        onUpdateSearch={page.updateSearch}
        onStatusChange={page.toolbar.onStatusChange}
      />

      <div className={styles.sectionHeader}>
        <span>{t("users.directory")}</span>
        <span className={styles.sectionLine} aria-hidden="true" />
        <strong>
          {t("common.matches", {
            count: formatAdminCount(page.list.totalCount),
          })}
        </strong>
      </div>

      <UsersGrid
        styles={styles}
        users={page.list.users}
        bannedUserIds={page.list.bannedUserIds}
        isLoading={page.list.isLoading}
        isError={page.list.isError}
        onOpenUser={page.drawer.open}
      />

      <UsersPagination
        styles={styles}
        currentPage={page.pagination.currentPage}
        totalPages={page.pagination.totalPages}
        pageWindow={page.pagination.pageWindow}
        onPageChange={(pageNumber) => page.updateSearch({ Page: pageNumber })}
      />

      <UserSummaryDrawer
        styles={styles}
        selectedUserId={page.drawer.selectedUserId}
        user={page.drawer.selectedUser}
        isBanned={page.drawer.selectedUserIsBanned}
        tone={page.drawer.selectedUserTone}
        isLoading={page.drawer.isLoading}
        isError={page.drawer.isError}
        activity={page.drawer.activity}
        timeBank={page.drawer.timeBank}
        recentRequests={page.drawer.recentRequests}
        copiedUserId={page.drawer.copiedUserId}
        lifetimeExpanded={page.drawer.lifetimeExpanded}
        showActivityCounters={page.drawer.showActivityCounters}
        onClose={page.drawer.close}
        onCopyUserId={page.drawer.copyUserId}
        onToggleLifetime={() =>
          page.drawer.setLifetimeExpanded((value) => !value)
        }
        onShowActivityCounters={() => page.drawer.setShowActivityCounters(true)}
        onChangeRole={page.modals.setRoleModalUser}
        onMessage={page.modals.setMessageUser}
      />

      <AdminChangeRoleModal
        user={page.modals.roleModalUser}
        onClose={() => page.modals.setRoleModalUser(null)}
      />

      <AdminMessageUserModal
        user={page.modals.messageUser}
        onClose={() => page.modals.setMessageUser(null)}
      />
    </section>
  );
};
