import { apiClient } from "@shared/api";
import { type Profile } from "@entities/user";

export type UpdateUserDto = {
  avatarFile: File | undefined;
  model?: {
    profile?: Omit<Profile, "timeBank">;
    privacySettings?: {
      fields: {
        fieldName: string;
        visibility: 0 | 1;
      }[];
    };
  };
};

export const updateUser = async (data: UpdateUserDto) => {
  const formData = new FormData();

  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }

  if (data.model) {
    formData.append("model", JSON.stringify(data.model));
  }

  const response = await apiClient.put("User/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
