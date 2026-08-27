import type { EventSearchParams } from "@entities/event";
import { Pagination } from "@shared/ui";
import styles from "../Panel.module.scss";

interface EventsPanelPaginationProps {
  totalPages: number;
  page: number;
  organizationId: string;
  onChange: (patch: Partial<EventSearchParams>) => void;
}

export const EventsPanelPagination = ({
  totalPages,
  page,
  organizationId,
  onChange,
}: EventsPanelPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.paginationWrapper}>
      <Pagination
        total={totalPages}
        page={page}
        onChange={(nextPage) =>
          onChange({ Page: nextPage, OrganizationIds: [organizationId] })
        }
      />
    </div>
  );
};
