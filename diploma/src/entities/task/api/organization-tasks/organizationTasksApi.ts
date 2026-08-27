import axios from "axios";
import { apiClient } from "@shared/api";
import type {
  ApiOrganizationTasksResponse,
  ApiTaskBoardResponse,
} from "../../model/types/OrganizationTask";

const emptyTasksResponse: ApiOrganizationTasksResponse = {
  data: [],
};

export const getOrganizationTasksList = async (
  projectIds: string[],
): Promise<ApiOrganizationTasksResponse> => {
  try {
    const response = await apiClient.get<ApiOrganizationTasksResponse>(
      "/Tasks/list",
      {
        params: {
          ProjectIds: projectIds.join(","),
          Page: 1,
          PageSize: 100,
          OrderBy: "Default",
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return emptyTasksResponse;
    }

    throw error;
  }
};

export const getOrganizationTasksFromBoards = async (
  projectIds: string[],
): Promise<ApiOrganizationTasksResponse> => {
  const responses = await Promise.all(
    projectIds.map(async (projectId) => {
      try {
        const response = await apiClient.get<ApiTaskBoardResponse>(
          "/Tasks/board",
          {
            params: {
              projectId,
              includeCompleted: true,
              includeCancelled: true,
            },
          },
        );
        const board = response.data.data ?? response.data.Data;
        const columns = board?.columns ?? board?.Columns ?? [];

        return columns.flatMap((column) => column.items ?? column.Items ?? []);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 403 || error.response?.status === 404)
        ) {
          return [];
        }

        throw error;
      }
    }),
  );

  return {
    data: responses.flat(),
  };
};
