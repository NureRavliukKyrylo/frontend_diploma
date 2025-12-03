export interface ProjectFiltersCategory {
  startDate?: string;
  dueDate?: string;
  rating?: number;
  categories: string[];
  organizations: string[];
  distance?: number;
  search: string | undefined;
  page: number;
}
