import { useState } from "react";
import { Pagination } from "@shared/ui";
import { useCombinedList } from "@entities/project";
import type { ProjectSearchParams, Project } from "@entities/project";
import type {
  OrganizationSearchParams,
  Organization,
} from "@entities/organization";
import styles from "./CombinedListWidget.module.scss";

interface CombinedListWidgetProps {
  projectParams: ProjectSearchParams;
  organizationParams: OrganizationSearchParams;
  renderProjectCard: (project: Project) => React.ReactNode;
  renderOrganizationCard: (organization: Organization) => React.ReactNode;
}

export const CombinedListWidget = ({
  projectParams,
  organizationParams,
  renderProjectCard,
  renderOrganizationCard,
}: CombinedListWidgetProps) => {
  const [page, setPage] = useState(1);

  const { items, totalPages } = useCombinedList({
    projectParams: { ...projectParams, Page: page },
    organizationParams: { ...organizationParams, Page: page },
  });

  return (
    <>
      <div className={styles.combinedListWidget}>
        {items.map((item) =>
          item.type === "project"
            ? renderProjectCard(item.data)
            : renderOrganizationCard(item.data),
        )}
      </div>
      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination total={totalPages} page={page} onChange={setPage} />
        </div>
      )}
    </>
  );
};
