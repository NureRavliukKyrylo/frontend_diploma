import { Pagination } from "@shared/ui";
import styles from "./EventsPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { useEventsPage } from "../model/useEventsPage";
import { EventFiltersWidget } from "@widgets/events";
import { eventQuery, sortingEventItems } from "@entities/event";

export function EventsPage() {
  const {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useEventsPage();

  const { data: events } = useQuery(eventQuery.list(search));

  return (
    <div className={styles.eventsWrapper}>
      <div className={styles.mainEventsSection}>
        <div className={styles.filterEventsWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <EventFiltersWidget search={search} />
            </ToggleDropdownButton>
            <SearchBar
              value={search.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={sortingEventItems}
              onSelect={handleSort}
              value={search.OrderBy ?? "Default"}
            />
          </div>
        </div>

        {events && events.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={events.pagination.totalPages}
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
