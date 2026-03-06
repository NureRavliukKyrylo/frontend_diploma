import { useNavigate } from "@tanstack/react-router";
import styles from "./ProjectOrganizationFilter.module.scss";
import { organizationQuery, OrganizationTab } from "@entities/organization";
import type { ProjectSearchParams } from "@entities/project";
import type { NavigateParams } from "../../model/NavigateParams";
import { toggleArrayParam } from "../../libs/toggleTab";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface ProjectOrganizationFilterProps {
  search: ProjectSearchParams;
  from: NavigateParams;
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
  } = useInfiniteQuery(organizationQuery.infinite({ pageSize: 5 }));

  const toggleOrganization = (organizationId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        OrganizationId: toggleArrayParam(prev.OrganizationId, organizationId),
        Page: 1,
      }),
      resetScroll: false,
    });
  };

  return (
    <div className={styles.organizationsInfinite}>
      <div className={styles.organizationsListFilter}>
        {organizations?.map((organization) => (
          <OrganizationTab
            key={organization.id}
            name={organization.name}
            isSelected={
              search.OrganizationId?.includes(organization.id) ?? false
            }
            onClick={() => {
              toggleOrganization(organization.id);
            }}
          />
        ))}
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
