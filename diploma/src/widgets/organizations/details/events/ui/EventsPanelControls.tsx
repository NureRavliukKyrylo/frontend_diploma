import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import type {
  EventSearchParams,
  EventSortValues,
} from "@entities/event";
import { ToggleDropdownButton } from "@shared/ui/buttons/action-buttons/toggle/ToggleDropdownButton";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { EventFiltersWidget } from "@widgets/events/filters/base-filter/ui/EventFiltersWidget";
import styles from "../Panel.module.scss";

interface EventsPanelControlsProps {
  organizationId: string;
  search: EventSearchParams;
  sortingEventItems: ComponentProps<typeof SortDropDown>["options"];
  onFilterOpenChange: (isOpen: boolean) => void;
  onSearchChange: (patch: Partial<EventSearchParams>) => void;
  onClearFilters: () => void;
}

export const EventsPanelControls = ({
  organizationId,
  search,
  sortingEventItems,
  onFilterOpenChange,
  onSearchChange,
  onClearFilters,
}: EventsPanelControlsProps) => (
  <motion.section
    className={styles.filtersInteractions}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.36, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
  >
    <ToggleDropdownButton onOpenChange={onFilterOpenChange}>
      <EventFiltersWidget
        search={search}
        hideOrganizationFilter
        onChange={(patch) =>
          onSearchChange({ ...patch, OrganizationIds: [organizationId] })
        }
        onClearFilters={onClearFilters}
      />
    </ToggleDropdownButton>
    <SearchBar
      value={search.Search}
      onChange={(value) =>
        onSearchChange({ Search: value || undefined, Page: 1 })
      }
      variant="projects"
    />
    <SortDropDown
      options={sortingEventItems}
      onSelect={(value) =>
        onSearchChange({ OrderBy: value as EventSortValues, Page: 1 })
      }
      value={search.OrderBy ?? "Default"}
    />
  </motion.section>
);
