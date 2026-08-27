import { apiClient } from "@shared/api";

export const changeAdminUserRole = async (userId: string, role: string) => {
  await apiClient.put("User/role", null, {
    params: { userId, role },
  });
};
