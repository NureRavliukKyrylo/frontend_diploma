import { useSuspenseQuery } from "@tanstack/react-query";
import type { MapProjectSearchParams } from "@entities/project";
import { organizationQuery, type Organization } from "@entities/organization";

interface OrganizationMarkersWidgetProps {
  search: MapProjectSearchParams;
  renderMarker: (organization: Organization) => React.ReactNode;
}

export const OrganizationMarkersWidget = ({
  search,
  renderMarker,
}: OrganizationMarkersWidgetProps) => {
  const { data: organizations } = useSuspenseQuery(
    organizationQuery.map(search),
  );

  return (
    <div>
      {organizations.data.map((organization) => renderMarker(organization))}
    </div>
  );
};
