export const readListResponse = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];

  if (value && typeof value === "object") {
    const data = (value as { data?: unknown }).data;
    if (Array.isArray(data)) return data as T[];

    if (data && typeof data === "object") {
      const nestedData = (data as { data?: unknown }).data;
      if (Array.isArray(nestedData)) return nestedData as T[];
    }
  }

  return [];
};
