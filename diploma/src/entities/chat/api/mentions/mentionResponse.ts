export const readListResponse = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];

  if (value && typeof value === "object") {
    const responseData = (value as { data?: unknown }).data;
    if (Array.isArray(responseData)) return responseData as T[];

    if (responseData && typeof responseData === "object") {
      const nestedResponseData = (responseData as { data?: unknown }).data;
      if (Array.isArray(nestedResponseData)) return nestedResponseData as T[];
    }
  }

  return [];
};
