import { formatAdminCount } from "@entities/admin";
import { RequestDecisionModal } from "@widgets/admin/requests/request-decision-modal/ui/RequestDecisionModal";
import { RequestList } from "@widgets/admin/requests/request-list/ui/RequestList";
import { RequestsPagination } from "@widgets/admin/requests/request-list/ui/RequestsPagination";
import { RequestPreviewDrawer } from "@widgets/admin/requests/request-preview-drawer/ui/RequestPreviewDrawer";
import { useAdminRequestsPage } from "@widgets/admin/requests/requests-page/model/useAdminRequestsPage";
import styles from "@widgets/admin/requests/requests-page-styles/AdminRequestsPage.module.scss";
import { RequestsMetrics } from "@widgets/admin/requests/requests-metrics/ui/RequestsMetrics";
import { RequestsTabs } from "@widgets/admin/requests/requests-tabs/ui/RequestsTabs";
import { RequestsToolbar } from "@widgets/admin/requests/requests-toolbar/ui/RequestsToolbar";
import type {
  RequestsTab,
  StatusFilterValue,
  TypeFilterValue,
} from "@widgets/admin/requests/requests-config/libs/requestTypeConfig";
import { useTranslation } from "react-i18next";

export const AdminRequestsPage = () => {
  const { t } = useTranslation("admin");
  const page = useAdminRequestsPage();

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <div className={styles.headingEyebrow}>{t("common.eyebrow")}</div>
          <h1 className={styles.headingTitle}>{t("requests.title")}</h1>
        </div>
        <p className={styles.headingText}>{t("requests.description")}</p>
      </div>

      <RequestsMetrics
        pending={page.metrics.pending}
        resolvedToday={page.metrics.resolvedToday}
        inProgress={page.metrics.inProgress}
        priority={page.metrics.priority}
      />

      <RequestsToolbar
        searchInput={page.searchInput}
        status={page.search.Status as StatusFilterValue}
        type={page.search.Type as TypeFilterValue}
        onSearchInputChange={page.setSearchInput}
        onStatusChange={(value) =>
          page.updateSearch({ Status: value, Page: 1 })
        }
        onTypeChange={(value) => page.updateSearch({ Type: value, Page: 1 })}
      />

      <RequestsTabs
        activeTab={page.tabs.active}
        counts={page.tabs.counts}
        onSelect={(tab: RequestsTab) =>
          page.updateSearch({ Tab: tab, Page: 1 })
        }
      />

      <div className={styles.sectionHeader}>
        <span>{t("requests.directory")}</span>
        <span className={styles.sectionLine} aria-hidden="true" />
        <strong>
          {t("common.matches", {
            count: formatAdminCount(page.list.totalCount),
          })}
        </strong>
      </div>

      <RequestList
        requests={page.list.requests}
        isLoading={page.list.isLoading}
        isError={page.list.isError}
        onOpenPreview={page.drawer.open}
        onDecide={page.decision.openModal}
      />

      <RequestsPagination
        currentPage={page.list.currentPage}
        totalPages={page.list.totalPages}
        pageWindow={page.list.pageWindow}
        onPageChange={(pageNumber) => page.updateSearch({ Page: pageNumber })}
      />

      <RequestPreviewDrawer
        request={page.drawer.request}
        categoryMap={page.categoryMap}
        onClose={page.drawer.close}
        onDecide={page.drawer.decide}
        isDecisionPending={page.decision.isPending}
        decisionComment={page.drawer.comment}
        onDecisionCommentChange={page.drawer.setComment}
        assignToTask={page.drawer.assignToTask}
        onAssignToTaskChange={page.drawer.setAssignToTask}
      />

      <RequestDecisionModal
        target={page.decision.target}
        comment={page.decision.comment}
        assignToTask={page.decision.assignToTask}
        isPending={page.decision.isPending}
        error={page.decision.error}
        onCommentChange={page.decision.setComment}
        onAssignToTaskChange={page.decision.setAssignToTask}
        onConfirm={page.decision.submit}
        onCancel={page.decision.closeModal}
      />
    </section>
  );
};
