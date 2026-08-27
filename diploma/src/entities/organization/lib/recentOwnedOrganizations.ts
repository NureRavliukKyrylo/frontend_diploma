const STORAGE_KEY_PREFIX = "impactflow-owned-organizations";
const MAX_STORED_ORGANIZATIONS = 20;

const getStorageKey = (userId: string): string =>
  `${STORAGE_KEY_PREFIX}:${userId}`;

export const getRememberedOwnedOrganizationIds = (
  userId?: string | null,
): string[] => {
  if (!userId || typeof window === "undefined") return [];

  try {
    const storedValue = window.localStorage.getItem(getStorageKey(userId));
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    return Array.isArray(parsedValue)
      ? parsedValue.filter(
          (organizationId): organizationId is string =>
            typeof organizationId === "string" && organizationId.length > 0,
        )
      : [];
  } catch {
    return [];
  }
};

export const rememberOwnedOrganizationIds = (
  userId: string | null | undefined,
  organizationIds: string[],
): void => {
  if (!userId || typeof window === "undefined") return;

  const nextOrganizationIds = Array.from(
    new Set(organizationIds.filter(Boolean)),
  ).slice(0, MAX_STORED_ORGANIZATIONS);

  try {
    window.localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify(nextOrganizationIds),
    );
  } catch {
    return;
  }
};

export const rememberOwnedOrganizationId = (
  userId: string | null | undefined,
  organizationId: string,
): void => {
  if (!userId || typeof window === "undefined") return;

  const nextOrganizationIds = Array.from(
    new Set([organizationId, ...getRememberedOwnedOrganizationIds(userId)]),
  ).slice(0, MAX_STORED_ORGANIZATIONS);

  try {
    window.localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify(nextOrganizationIds),
    );
  } catch {
    return;
  }
};
