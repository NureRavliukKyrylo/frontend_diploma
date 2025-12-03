import { apiClient } from "@shared/api";

export interface Project {
  id: string;
  title: string;
  description: string;
  rating: number;
  category: string;
  organization: string;
  deadline: string;
  distance?: number;
}

export interface ProjectsResponse {
  data: Project[];
  total: number;
  page: number;
  limit: number;
}

export const projectsApi = {
  getFilteredProjects: async (
    categoryName: string,
    params: Record<string, string | string[]>
  ): Promise<ProjectsResponse> => {
    const response = await apiClient.get<ProjectsResponse>(
      `/categories/${categoryName}/projects`,
      { params }
    );
    console.log(response);
    return response.data;
  },
};
