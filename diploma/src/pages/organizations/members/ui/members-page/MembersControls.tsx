import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrganizationMembersPageModel } from "../../model/types";
import styles from "./MembersControls.module.scss";

interface MembersControlsProps {
  model: OrganizationMembersPageModel;
}

export const MembersControls = ({ model }: MembersControlsProps) => {
  const { t } = useTranslation("common");
  const entity = t(`member.entities.${model.entityLabel}`);

  return (
    <div className={styles.controlsRow}>
    <div
      className={styles.tabsContainer}
      role="tablist"
      aria-label={t("memberList.tabsLabel", { entity })}
    >
      <button
        type="button"
        role="tab"
        aria-selected={model.activeTab === "members"}
        className={`${styles.tab} ${
          model.activeTab === "members" ? styles.tabActive : ""
        }`}
        onClick={() => model.setActiveTab("members")}
      >
        {t("memberList.membersTab")}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={model.activeTab === "requests"}
        className={`${styles.tab} ${
          model.activeTab === "requests" ? styles.tabActive : ""
        }`}
        onClick={() => model.setActiveTab("requests")}
      >
        {t("memberList.requestsTab")}
        <span
          className={`${styles.tabBadge} ${
            model.activeTab === "requests" ? styles.tabBadgeActive : ""
          }`}
        >
          {model.totalPendingCount}
        </span>
      </button>
    </div>

    <label className={styles.searchField}>
      <Search size={16} strokeWidth={2.4} className={styles.searchIcon} />
      <input
        className={styles.search}
        type="search"
        value={model.searchValue}
        placeholder={
          model.activeTab === "members"
            ? t("memberList.searchMembers")
            : t("memberList.searchRequests")
        }
        onChange={(event) => model.setSearchValue(event.target.value)}
      />
    </label>
    </div>
  );
};
