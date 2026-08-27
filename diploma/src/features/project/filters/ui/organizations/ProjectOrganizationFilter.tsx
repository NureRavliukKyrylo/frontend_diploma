import styles from "./ProjectOrganizationFilter.module.scss";
import { OrganizationTab, type Organization } from "@entities/organization";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import type { QueryResult } from "@shared/config/types";

interface ProjectOrganizationFilterProps {
  useOrganizationsQuery: () => QueryResult<Pick<Organization, "id" | "name">>;
  selectedIds?: string[];
  onToggle: (id: string) => void;
}

export const ProjectOrganizationFilter = ({
  useOrganizationsQuery,
  selectedIds,
  onToggle,
}: ProjectOrganizationFilterProps) => {
  const {
    data: organizations = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOrganizationsQuery();

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
              <OrganizationTab
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
          {isFetchingNextPage ? "Loading..." : "show more"}
        </BaseButtonWrapper>
      )}
    </div>
  );
};
