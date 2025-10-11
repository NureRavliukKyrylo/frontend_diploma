import { apiClient } from "../../../../shared/api";

export type UpdateUserDto = {
  email: string;
  profile: {
    bio: string;
    phone: string;
    dateOfBirth: string;
    telegram: string;
    coordinates: {
      longitude: number;
      latitude: number;
    } | null;
  };
  privacySettings: {
    fields: {
      fieldName: string;
      visibility: number;
    }[];
  };
};

export const updateUser = async (data: UpdateUserDto) => {
  const response = await apiClient.put("/User/update", data);
  return response.data;
};
