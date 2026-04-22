import styles from "./EventsTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { useEventsTab } from "../model/useEventsTab";
import { sortingEventItems, type MyEventsSearchParams } from "@entities/event";
import { MyEventsFilterWidget } from "@widgets/events";

export const EventsTab = ({ search }: { search: MyEventsSearchParams }) => {
  const {
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    events,
  } = useEventsTab(search);

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
