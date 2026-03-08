import type { ProjectSearchParams } from "@entities/project";
import { FilterButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { sortingItems } from "./config/sortingItems";
import type { SortValues } from "@shared/config/types";

interface ProjectControlsProps {
  search: ProjectSearchParams;
  onSearch: (value: string) => void;
  onSort: (value: SortValues) => void;
  onFilterOpen: (value: boolean) => void;
  children: React.ReactNode;
}

export const ProjectControls = ({
  search,
  onSearch,
  onSort,
  onFilterOpen,
  children,
}: ProjectControlsProps) => (
  <>
    <FilterButton onOpenChange={onFilterOpen}>{children}</FilterButton>
    <SearchBar value={search.Search} onChange={onSearch} variant="projects" />
    <SortDropDown
      options={sortingItems}
      onSelect={onSort}
      value={search.OrderBy ?? "Default"}
    />
  </>
);
