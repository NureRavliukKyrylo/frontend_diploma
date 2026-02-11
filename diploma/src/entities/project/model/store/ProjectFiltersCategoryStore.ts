import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createFilterSlice, type FilterSlice } from "../slices/filtersSlice";
import { createSearchSlice, type SearchSlice } from "../slices/searchSlice";
import {
  createPaginationSlice,
  type PaginationSlice,
} from "../slices/paginationSlice";
import type { ProjectFiltersCategory } from "../types/ProjectFiltersCategory";

type ProjectFiltersCategoryStore = FilterSlice &
  SearchSlice &
  PaginationSlice & {
    setFiltersFromUrl: (filters: Partial<ProjectFiltersCategory>) => void;
    resetAll: () => void;
  };

export const useProjectFiltersCategoryStore =
  create<ProjectFiltersCategoryStore>()(
    devtools(
      (set, get, store) => ({
        ...createFilterSlice(set, get, store),
        ...createSearchSlice(set, get, store),
        ...createPaginationSlice(set, get, store),

        setFiltersFromUrl: (filters) =>
          set((state) => ({
            ...state,
            ...filters,
          })),

        resetAll: () => {
          const state = get();
          state.resetFilters();
          state.clearSearch();
          state.resetPagination();
        },
      }),
      { name: "ProjectFiltersCategoryStore" }
    )
  );
