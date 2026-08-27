const requestStatusByCode: Record<number, string> = {
  0: "new",
  1: "inprogress",
  2: "resolved",
  3: "rejected",
  4: "appealed",
  5: "appealresolved",
  6: "cancelled",
};

export const normalizeRequestStatus = (status: unknown): string | null => {
  if (typeof status === "number") {
    return requestStatusByCode[status] ?? null;
  }

  if (typeof status === "string") {
    const trimmed = status.trim();

    if (!trimmed) return null;

    const numericCode = Number(trimmed);
    if (!Number.isNaN(numericCode) && trimmed === String(numericCode)) {
      return requestStatusByCode[numericCode] ?? null;
    }

    return trimmed.toLowerCase();
  }

  return null;
};

export const isPendingRequestStatus = (status: unknown) => {
  const normalizedStatus = normalizeRequestStatus(status);
  return normalizedStatus === "new" || normalizedStatus === "inprogress";
};

export const isResolvedRequestStatus = (status: unknown) =>
  normalizeRequestStatus(status) === "resolved";
