import { type StateCreator } from "zustand";

export interface PaginationSlice {
  page: number;

  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;
}

const initialPaginationState = {
  page: 1,
};

export const createPaginationSlice: StateCreator<PaginationSlice> = (set) => ({
  ...initialPaginationState,

  setPage: (page) => set({ page }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
  resetPagination: () => set(initialPaginationState),
});
