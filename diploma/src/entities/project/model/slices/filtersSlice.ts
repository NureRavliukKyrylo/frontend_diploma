import { type StateCreator } from "zustand";

export interface FilterSlice {
  startDate?: string;
  dueDate?: string;
  rating?: number;
  categories: string[];
  organizations: string[];
  distance?: number;

  setStartDate: (date: string | undefined) => void;
  setDueDate: (date: string | undefined) => void;
  setRating: (rating: number | undefined) => void;
  setCategories: (categories: string[]) => void;
  toggleCategory: (category: string) => void;
  setOrganizations: (organizations: string[]) => void;
  toggleOrganization: (organization: string) => void;
  setDistance: (distance: number | undefined) => void;
  resetFilters: () => void;
}

const initialFilterState = {
  startDate: undefined,
  dueDate: undefined,
  rating: undefined,
  categories: [],
  organizations: [],
  distance: undefined,
};

export const createFilterSlice: StateCreator<FilterSlice> = (set) => ({
  ...initialFilterState,

  setStartDate: (date) => set({ startDate: date }),
  setDueDate: (date) => set({ dueDate: date }),
  setRating: (rating) => set({ rating }),
  setCategories: (categories) => set({ categories }),
  toggleCategory: (category) =>
    set((state) => {
      const hasCategory = state.categories.includes(category);
      return {
        categories: hasCategory
          ? state.categories.filter((c) => c !== category)
          : [...state.categories, category],
      };
    }),

  setOrganizations: (organizations) => set({ organizations }),
  toggleOrganization: (organization) =>
    set((state) => {
      const hasOrg = state.organizations.includes(organization);
      return {
        organizations: hasOrg
          ? state.organizations.filter((o) => o !== organization)
          : [...state.organizations, organization],
      };
    }),

  setDistance: (distance) => set({ distance }),
  resetFilters: () => set(initialFilterState),
});
