import { useNavigate } from "@tanstack/react-router";
import styles from "./ProjectOrganizationFilter.module.scss";
import { organizationQuery, OrganizationTab } from "@entities/organization";
import type { ProjectSearchParams } from "@entities/project";
import type { NavigateParams } from "../../model/NavigateParams";
import { toggleArrayParam } from "../../libs/toggleTab";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectOrganizationFilterProps {
  search: ProjectSearchParams;
  from: Exclude<NavigateParams, "/skills/">;
}

export const ProjectOrganizationFilter = ({
  search,
  from,
}: ProjectOrganizationFilterProps) => {
  const navigate = useNavigate({ from });
  const {
    data: organizations,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(organizationQuery.infinite({ PageSize: 7 }));

  const toggleOrganization = (organizationId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        OrganizationIds: toggleArrayParam(prev.OrganizationIds, organizationId),
        Page: 1,
      }),
      resetScroll: false,
    });
  };

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
                isSelected={
                  search.OrganizationIds?.includes(organization.id) ?? false
                }
                onClick={() => toggleOrganization(organization.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasNextPage && (
        <BaseButtonWrapper
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles.showMoreOrganizationsButton}
        >
          {isFetchingNextPage ? "Loading..." : "show more"}
        </BaseButtonWrapper>
      )}
    </div>
  );
};
