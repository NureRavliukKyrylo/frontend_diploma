import { useNavigate } from "@tanstack/react-router";
import styles from "./ProjectFilters.module.scss";
import { OrganizationTab, type Organization } from "@entities/organization";
import type { ProjectSearchParams } from "@entities/project";
import type { NavigateParams } from "../model/NavigateParams";
import { toggleArrayParam } from "../libs/toggleTab";

interface ProjectOrganizationFilterProps {
  search: ProjectSearchParams;
  from: NavigateParams;
}

export const ProjectOrganizationFilter = ({
  search,
  from,
}: ProjectOrganizationFilterProps) => {
  const navigate = useNavigate({ from });

  const toggleOrganization = (organizationId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        OrganizationId: toggleArrayParam(prev.OrganizationId, organizationId),
      }),
      resetScroll: false,
    });
  };

  const organizations: Organization[] = [
    { id: "asdasdasdSAasd", name: "Ancient Greek" },
    { id: "asdasdDasdasd", name: "Ancient Greeks" },
    { id: "asdasdaSDsdasd", name: "Ancient Greeksd" },
    { id: "asdasdaSDsDdasd", name: "Ancient Greekdd" },
    { id: "asdasdasSDdasd", name: "Ancient Greeka" },
  ];

  return (
    <div className={styles.organizationssListFilter}>
      {organizations.map((organization) => (
        <OrganizationTab
          key={organization.id}
          name={organization.name}
          isSelected={search.OrganizationId?.includes(organization.id) ?? false}
          onClick={() => {
            toggleOrganization(organization.id);
          }}
        />
      ))}
    </div>
  );
};
