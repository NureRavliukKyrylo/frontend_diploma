import { Switch } from "@shared/ui";
import type { ProjectSearchParams } from "@entities/project";
import styles from "../../../shared/filters/Filters.module.scss";
import { OrganizationProjectFiltersSection } from "./Section";

interface OrganizationProjectMoreOptionsFilterSectionProps {
  search: ProjectSearchParams;
  onChange: (patch: Partial<ProjectSearchParams>) => void;
}

const switchClassNames = {
  base: "scale-80 sm:scale-90 lg:scale-95",
  wrapper: "bg-[rgba(44,44,44,0.3)] group-data-[selected=true]:bg-[#8C0000]",
  thumb: "w-[20px] h-[20px]",
};

export const OrganizationProjectMoreOptionsFilterSection = ({
  search,
  onChange,
}: OrganizationProjectMoreOptionsFilterSectionProps) => {
  const hasMoreOptionsFilter = Boolean(
    search.IncludeArchived || search.ShowJoined,
  );

  return (
    <OrganizationProjectFiltersSection
      title="More options"
      isActive={hasMoreOptionsFilter}
      badge={hasMoreOptionsFilter ? "Applied" : undefined}
      className={styles.moreOptions}
    >
      <div className={styles.wrapperMoreOptionsFilter}>
        <div className={styles.completedProject}>
          <h4 className={styles.titleFilterMoreOptions}>
            Show only active projects
          </h4>
          <Switch
            isSelected={search.IncludeArchived ?? false}
            onValueChange={(value) =>
              onChange({ IncludeArchived: value, Page: 1 })
            }
            classNames={switchClassNames}
          />
        </div>
        <div className={styles.joinedProject}>
          <h4 className={styles.titleFilterMoreOptions}>
            Display joined projects
          </h4>
          <Switch
            isSelected={search.ShowJoined ?? false}
            onValueChange={(value) => onChange({ ShowJoined: value, Page: 1 })}
            classNames={switchClassNames}
          />
        </div>
      </div>
    </OrganizationProjectFiltersSection>
  );
};
