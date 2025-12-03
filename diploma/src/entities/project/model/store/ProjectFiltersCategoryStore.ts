import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProjectFiltersCategory } from "../types/ProjectFiltersCategory";

interface ProjectFiltersCategoryStore {
  filters: ProjectFiltersCategory;
  setStartDate: (date: string | undefined) => void;
  setDueDate: (date: string | undefined) => void;
  setRating: (rating: number | undefined) => void;
  setCategories: (categories: string[]) => void;
  toggleCategory: (category: string) => void;
  setOrganizations: (organizations: string[]) => void;
  toggleOrganization: (organization: string) => void;
  setDistance: (distance: number | undefined) => void;
  resetFilters: () => void;
  setFiltersFromUrl: (filters: Partial<ProjectFiltersCategory>) => void;
}

const initialFilters: ProjectFiltersCategory = {
  startDate: undefined,
  dueDate: undefined,
  rating: undefined,
  categories: [],
  organizations: [],
  distance: undefined,
};

export const useProjectFiltersCategoryStore =
  create<ProjectFiltersCategoryStore>()(
    devtools(
      (set) => ({
        filters: initialFilters,

        setStartDate: (date) =>
          set((state) => ({
            filters: { ...state.filters, startDate: date },
          })),

        setDueDate: (date) =>
          set((state) => ({
            filters: { ...state.filters, dueDate: date },
          })),

        setRating: (rating) =>
          set((state) => ({
            filters: { ...state.filters, rating },
          })),

        setCategories: (categories) =>
          set((state) => ({
            filters: { ...state.filters, categories },
          })),

        toggleCategory: (category) =>
          set((state) => {
            const hasCategory = state.filters.categories.includes(category);
            return {
              filters: {
                ...state.filters,
                categories: hasCategory
                  ? state.filters.categories.filter((c) => c !== category)
                  : [...state.filters.categories, category],
              },
            };
          }),

        setOrganizations: (organizations) =>
          set((state) => ({
            filters: { ...state.filters, organizations },
          })),

        toggleOrganization: (organization) =>
          set((state) => {
            const hasOrg = state.filters.organizations.includes(organization);
            return {
              filters: {
                ...state.filters,
                organizations: hasOrg
                  ? state.filters.organizations.filter(
                      (o) => o !== organization
                    )
                  : [...state.filters.organizations, organization],
              },
            };
          }),

        setDistance: (distance) =>
          set((state) => ({
            filters: { ...state.filters, distance },
          })),

        resetFilters: () => set({ filters: initialFilters }),

        setFiltersFromUrl: (filters) =>
          set((state) => ({
            filters: { ...state.filters, ...filters },
          })),
      }),
      { name: "ProjectFiltersStore" }
    )
  );
