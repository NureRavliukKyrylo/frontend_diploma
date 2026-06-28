import { apiClient } from "@shared/api";

export interface SkillMutationPayload {
  name: string;
  description?: string | null;
  categoryIds: string[];
  nameLocalizedUk?: string | null;
  descriptionLocalizedUk?: string | null;
}

export interface SkillCreatePayload extends SkillMutationPayload {
  icon?: File | null;
}

interface CreateSkillResponse {
  id?: string;
  iconUrl?: string | null;
  data?: {
    id?: string;
    iconUrl?: string | null;
  };
}

const appendOptional = (formData: FormData, key: string, value?: string | null) => {
  const trimmed = value?.trim();

  if (trimmed) {
    formData.append(key, trimmed);
  }
};

const appendLocalized = (
  formData: FormData,
  key: "NameLocalized" | "DescriptionLocalized",
  value?: string | null,
) => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return;
  }

  formData.append(`${key}.Uk`, trimmed);
  formData.append(`${key}.uk`, trimmed);
  formData.append(`${key}[uk]`, trimmed);
};

export const buildSkillFormData = (payload: SkillCreatePayload) => {
  const formData = new FormData();

  formData.append("Name", payload.name.trim());
  appendOptional(formData, "Description", payload.description);
  appendLocalized(formData, "NameLocalized", payload.nameLocalizedUk);
  appendLocalized(
    formData,
    "DescriptionLocalized",
    payload.descriptionLocalizedUk,
  );
  payload.categoryIds.forEach((categoryId) => {
    formData.append("CategoryIds", categoryId);
  });

  if (payload.icon) {
    formData.append("icon", payload.icon);
  }

  return formData;
};

export const createSkill = async (payload: SkillCreatePayload) => {
  const response = await apiClient.post<CreateSkillResponse>(
    "/Skills/create",
    buildSkillFormData(payload),
  );

  return response.data;
};
