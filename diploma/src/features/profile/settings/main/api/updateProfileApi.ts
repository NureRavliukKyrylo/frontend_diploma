import { apiClient } from "@shared/api";

export type UpdateProfileDto = {
  firstName: string;
  lastName: string;
  bio: string;
  dateOfBirth: string;
};

export const updateProfile = async (data: UpdateProfileDto) => {
  const response = await apiClient.put("/User/update", data);
  return response.data;
};
