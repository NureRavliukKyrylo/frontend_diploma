import { Pagination } from "@shared/ui";
import styles from "./OrganizationsPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { useOrganizationsPage } from "../model/useOrganizationsPage";
import {
  organizationQuery,
  sortingOrganizationsItems,
} from "@entities/organization";
import { OrganizationFiltersWidget } from "@widgets/organizations";

export function OrganizationsPage() {
  const {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useOrganizationsPage();

  const { data: organizations } = useQuery(organizationQuery.list(search));

  return (
    <div className={styles.organizationsWrapper}>
      <div className={styles.mainOrganizationsSection}>
        <div className={styles.filterOrganizationsWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <OrganizationFiltersWidget search={search} />
            </ToggleDropdownButton>
            <SearchBar
              value={search.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={sortingOrganizationsItems}
              onSelect={handleSort}
              value={search.OrderBy ?? "Default"}
            />
          </div>
        </div>

        {organizations && organizations.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={organizations.pagination.totalPages}
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
