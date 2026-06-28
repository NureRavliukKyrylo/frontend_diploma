import type {
  AdminRequestStatusName,
  AdminRequestTypeName,
} from "../../model/types/adminRequests";

const requestTypeByCode: Record<number, AdminRequestTypeName> = {
  0: "categoryCreation",
  1: "categoryUpdate",
  2: "categoryDeletion",
  3: "skillCreation",
  4: "appeal",
  5: "organizationJoin",
  6: "projectJoin",
  7: "eventJoin",
  8: "taskJoin",
  9: "organizationInvite",
  10: "projectInvite",
  11: "eventInvite",
  12: "taskInvite",
  13: "organizationLeave",
  14: "projectLeave",
  15: "eventLeave",
  16: "taskLeave",
  17: "badgeAward",
  18: "report",
};

const requestStatusByCode: Record<number, AdminRequestStatusName> = {
  0: "new",
  1: "inProgress",
  2: "resolved",
  3: "rejected",
  4: "appealed",
  5: "appealResolved",
  6: "cancelled",
};

const normalizedTypeNameByValue = Object.entries(requestTypeByCode).reduce<
  Record<string, AdminRequestTypeName>
>((acc, [, value]) => {
  acc[value.toLowerCase()] = value;
  acc[value.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)] = value;
  acc[value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)] = value;
  return acc;
}, {});

const normalizedStatusNameByValue = Object.entries(requestStatusByCode).reduce<
  Record<string, AdminRequestStatusName>
>((acc, [, value]) => {
  acc[value.toLowerCase()] = value;
  acc[value.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)] = value;
  acc[value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)] = value;
  return acc;
}, {});

const normalizeStringKey = (value: string) =>
  value
    .replace(/[\s_-]/g, "")
    .trim()
    .toLowerCase();

export const normalizeRequestType = (value: unknown): {
  code: number;
  name: AdminRequestTypeName;
} => {
  const code =
    typeof value === "number"
      ? value
      : typeof value === "string" && /^\d+$/.test(value.trim())
        ? Number(value)
        : null;

  if (code !== null) {
    return {
      code,
      name: requestTypeByCode[code] ?? "unknown",
    };
  }

  if (typeof value === "string") {
    const normalized = normalizeStringKey(value);
    const name =
      normalizedTypeNameByValue[normalized] ??
      normalizedTypeNameByValue[value.trim().toLowerCase()];

    if (name) {
      const matchedCode = Number(
        Object.entries(requestTypeByCode).find(([, item]) => item === name)?.[0],
      );

      return {
        code: Number.isFinite(matchedCode) ? matchedCode : -1,
        name,
      };
    }
  }

  return { code: -1, name: "unknown" };
};

export const normalizeRequestStatus = (value: unknown): {
  code: number;
  name: AdminRequestStatusName;
} => {
  const code =
    typeof value === "number"
      ? value
      : typeof value === "string" && /^\d+$/.test(value.trim())
        ? Number(value)
        : null;

  if (code !== null) {
    return {
      code,
      name: requestStatusByCode[code] ?? "unknown",
    };
  }

  if (typeof value === "string") {
    const normalized = normalizeStringKey(value);
    const name =
      normalizedStatusNameByValue[normalized] ??
      normalizedStatusNameByValue[value.trim().toLowerCase()];

    if (name) {
      const matchedCode = Number(
        Object.entries(requestStatusByCode).find(([, item]) => item === name)?.[0],
      );

      return {
        code: Number.isFinite(matchedCode) ? matchedCode : -1,
        name,
      };
    }
  }

  return { code: -1, name: "unknown" };
};

export const adminRequestTypeByCode = requestTypeByCode;
export const adminRequestStatusByCode = requestStatusByCode;
