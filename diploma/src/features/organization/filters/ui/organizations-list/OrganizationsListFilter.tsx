import styles from "./OrganizationsListFilter.module.scss";
import { type Organization } from "@entities/organization";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import type { QueryResult } from "@shared/config/types";
import { Tab } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface OrganizationsListFilterProps {
  useOrganizationsQuery: () => QueryResult<Pick<Organization, "id" | "name">>;
  selectedIds?: string[];
  onToggle: (id: string) => void;
}

export const OrganizationsListFilter = ({
  useOrganizationsQuery,
  selectedIds,
  onToggle,
}: OrganizationsListFilterProps) => {
  const { t } = useTranslation("common");
  const {
    data: organizations = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useOrganizationsQuery();

  if (isError) {
    return (
      <div className={styles.stateMessage}>
        <p className={styles.errorMessage}>Failed to load organizations</p>
      </div>
    );
  }

  if (organizations.length === 0) {
    return <p className={styles.emptyText}>No organizations found</p>;
  }

  return (
    <div className={styles.organizationsInfinite}>
      <div className={styles.organizationsListFilter}>
        <AnimatePresence>
          {organizations?.map((organization, index) => (
            <motion.div
              key={organization.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={styles.organizationTabWrapper}
            >
              <Tab
                name={organization.name}
                isSelected={selectedIds?.includes(organization.id) ?? false}
                onClick={() => onToggle(organization.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasNextPage && (
        <BaseButtonWrapper
          onClick={() => fetchNextPage?.()}
          disabled={isFetchingNextPage}
          className={styles.showMoreOrganizationsButton}
        >
          {isFetchingNextPage
            ? t("loading.title")
            : t("actions.seeMore").toLowerCase()}
        </BaseButtonWrapper>
      )}
    </div>
  );
};
