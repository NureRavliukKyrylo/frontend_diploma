import { BansGrid } from "@widgets/admin/bans/bans-page/ui/BansGrid";
import { BansMetricCards } from "@widgets/admin/bans/bans-page/ui/BansMetricCards";
import { BansToolbar } from "@widgets/admin/bans/bans-page/ui/BansToolbar";
import { RevokeConfirmationModal } from "@widgets/admin/bans/bans-page/ui/RevokeConfirmationModal";
import { useAdminBansPage } from "@widgets/admin/bans/bans-page/model/useAdminBansPage";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./AdminBansPage.module.scss";

type BansTab = "users" | "organizations" | "activities";

export const AdminBansPage = () => {
  const { t } = useTranslation("admin");
  const [activeTab, setActiveTab] = useState<BansTab>("users");
  const page = useAdminBansPage(activeTab === "users");
  const tabs: Array<{ value: BansTab; label: string }> = [
    { value: "users", label: t("bans.tabs.users") },
    { value: "organizations", label: t("bans.tabs.organizations") },
    { value: "activities", label: t("bans.tabs.activities") },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <div className={styles.headingEyebrow}>{t("common.eyebrow")}</div>
          <h1 className={styles.headingTitle}>{t("bans.title")}</h1>
        </div>
        <p className={styles.headingText}>
          {t("bans.description")}
        </p>
      </div>

      <div className={styles.tabsRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              className={`${styles.tab} ${
                isActive ? styles.tabActive : styles.tabInactive
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "users" && (
        <>
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
            <span>{t("bans.directory")}</span>
            <span className={styles.sectionLine} aria-hidden="true" />
            <strong>
              {t("bans.showingLatest")}{" "}
              {Math.min(page.take, page.bansQuery.data?.length ?? page.take)}
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
        </>
      )}
    </section>
  );
};
