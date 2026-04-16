import { useSearch } from "@tanstack/react-router";
import styles from "./EventsTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { useEventsTab } from "../model/useEventsTab";
import { sortingEventItems } from "@entities/event";
import { MyEventsFilterWidget } from "@widgets/events";
import type { MyEventsSearchParams } from "@entities/project";

export const EventsTab = () => {
  const search = useSearch({ from: "/_masterLayout/projects/my/" });

  const {
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    events,
  } = useEventsTab(search as MyEventsSearchParams);

  if (search.tab !== "events") return null;

  return (
    <>
      <div className={styles.mainMyEventsSection}>
        <div className={styles.filtersBlock}>
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <MyEventsFilterWidget search={search} />
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
    </>
  );
};
