import { type StateCreator } from "zustand";

export interface SearchSlice {
  search?: string;

  setSearch: (search: string | undefined) => void;
  clearSearch: () => void;
}

const initialSearchState = {
  search: undefined,
};

export const createSearchSlice: StateCreator<SearchSlice> = (set) => ({
  ...initialSearchState,

  setSearch: (search) => set({ search }),
  clearSearch: () => set({ search: undefined }),
});
