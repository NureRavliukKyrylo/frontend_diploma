import { useNavigate, useSearch } from "@tanstack/react-router";
import styles from "./ProjectFilters.module.scss";
import { OrganizationTab, type Organization } from "@entities/organization";

export const ProjectOrganizationFilter = () => {
  const navigate = useNavigate({ from: "/projects/" });
  const search = useSearch({ from: "/_masterLayout/projects/" });

  const toggleOrganization = (name: string) => {
    // to libs
    navigate({
      search: (prev) => {
        const current = prev.organizations ?? [];
        const updated = current.includes(name)
          ? current.filter((c) => c !== name)
          : [...current, name];
        return { ...prev, organizations: updated };
      },
      resetScroll: false,
    });
  };

  const organizations: Organization[] = [
    { id: "asdasdasdasd", name: "Ancient Greek" },
    { id: "asdasdasdasd", name: "Ancient Greeks" },
    { id: "asdasdasdasd", name: "Ancient Greeksd" },
    { id: "asdasdasdasd", name: "Ancient Greekdd" },
    { id: "asdasdasdasd", name: "Ancient Greeka" },
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
              search.organizations?.includes(organization.name) ?? false
            }
            onClick={toggleOrganization}
          />
        ))}
      </div>
    </div>
  );
};
