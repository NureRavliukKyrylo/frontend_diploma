import type { Organization } from "@entities/organization";
import styles from "./OrganizationsListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { QueryResult } from "@shared/config/types";

interface OrganizationsListWidgetProps {
  useOrganizationsQuery?: () => QueryResult<Organization>;
  organizations?: Organization[];
  renderCard: (organization: Organization, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const OrganizationsListWidget = ({
  useOrganizationsQuery,
  renderCard,
  organizations: readyOrganizations,
  className,
  renderSkeleton,
  skeletonItems,
}: OrganizationsListWidgetProps) => {
  const queryResult = useOrganizationsQuery?.();

  const organizations = readyOrganizations ?? queryResult?.data;
  const isLoading = queryResult?.isLoading ?? false;

  const wrapperClass =
    `${styles.organizationsListWrapper} ${className ?? ""}`.trim();

  if (isLoading && renderSkeleton) {
    return (
      <ListWidgetSkeleton
        renderSkeleton={renderSkeleton}
        items={skeletonItems}
        className={className}
      />
    );
  }

  return (
    <div className={wrapperClass}>
      {organizations?.map((organization, index) =>
        renderCard(organization, index),
      )}
    </div>
  );
};
