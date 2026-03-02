import { useNavigate, useSearch } from "@tanstack/react-router";
import styles from "./ProjectFilters.module.scss";
import { OrganizationTab, type Organization } from "@entities/organization";

export const ProjectOrganizationFilter = () => {
  const navigate = useNavigate({ from: "/projects/" });
  const search = useSearch({ from: "/_masterLayout/projects/" });

  const toggleOrganization = (organizationId: string) => {
    // to libs
    navigate({
      search: (prev) => {
        const current = prev.OrganizationId ?? [];
        const updated = current.includes(organizationId)
          ? current.filter((c) => c !== organizationId)
          : [...current, organizationId];
        return { ...prev, OrganizationId: updated };
      },
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
    <div className={styles.projectOrganizations}>
      <h1 className={styles.subHeaderFilter}>Organizations</h1>
      <div className={styles.organizationssListFilter}>
        {organizations.map((organization) => (
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
    </div>
  );
};
