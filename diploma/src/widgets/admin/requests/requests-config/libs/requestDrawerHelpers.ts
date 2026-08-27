import type {
  AdminRequestListItem,
  AdminRequestTypeName,
} from "@entities/admin";
import { requestTypeLabels } from "./requestTypeConfig";
import type { TFunction } from "i18next";

export const getRequestInitials = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IF";

export const getShortId = (value: string | null | undefined) => {
  if (!value) return "";
  if (value.length <= 18) return value;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
};

export const formatDrawerValue = (
  value: string | number | null | undefined,
  fallback: string,
) => {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value === "number") return String(value);
  return getShortId(value);
};

export const getRequestEntityName = (request: AdminRequestListItem) => {
  const entityType = request.targetEntityType || request.sourceEntityType || "";
  const normalized = entityType.toLowerCase();

  if (normalized.includes("organization")) return "organization";
  if (normalized.includes("project")) return "project";
  if (normalized.includes("event")) return "event";
  if (normalized.includes("task")) return "task";
  if (request.typeName.includes("organization")) return "organization";
  if (request.typeName.includes("project")) return "project";
  if (request.typeName.includes("event")) return "event";
  if (request.typeName.includes("task")) return "task";

  return "item";
};

export const getCompactEntityLabel = (
  type: string | null,
  id: string | null,
) => {
  if (!type && !id) return "";
  if (!type) return getShortId(id);
  if (!id) return type;
  return `${type} - ${getShortId(id)}`;
};

export const getDrawerToneClass = (typeName: AdminRequestTypeName) => {
  if (typeName.includes("Join")) return "drawerToneJoin";
  if (typeName.includes("Leave")) return "drawerToneLeave";
  if (
    typeName === "skillCreation" ||
    typeName === "categoryCreation" ||
    typeName === "categoryUpdate" ||
    typeName === "categoryDeletion"
  ) {
    return "drawerToneCatalog";
  }
  if (typeName === "badgeAward") return "drawerToneBadge";
  if (typeName === "report" || typeName === "appeal") {
    return "drawerToneModeration";
  }
  return "drawerToneNeutral";
};

export const getDrawerIntro = (request: AdminRequestListItem, t: TFunction) => {
  const entityName = getRequestEntityName(request);

  if (request.typeName.includes("Join")) {
    return {
      label: t("admin:requests.previews.membershipReview"),
      title: t("admin:requests.previews.joinTitle", { entity: entityName }),
      text: t("admin:requests.previews.joinReview"),
    };
  }

  if (request.typeName.includes("Leave")) {
    return {
      label: t("admin:requests.previews.leaveChange"),
      title: t("admin:requests.previews.leaveTitle", { entity: entityName }),
      text: t("admin:requests.previews.leaveReview"),
    };
  }

  if (request.typeName === "skillCreation") {
    return {
      label: t("admin:requests.previews.catalogProposal"),
      title: t("admin:requests.previews.newSkill"),
      text: t("admin:requests.previews.skillReview"),
    };
  }

  if (request.typeName === "categoryCreation") {
    return {
      label: t("admin:requests.previews.catalogProposal"),
      title: t("admin:requests.previews.newCategory"),
      text: t("admin:requests.previews.categoryReview"),
    };
  }

  if (request.typeName === "badgeAward") {
    return {
      label: t("admin:requests.previews.recognition"),
      title: t("admin:requests.types.badgeAward"),
      text: request.description || t("admin:requests.previews.recognitionText"),
    };
  }

  if (request.typeName === "report") {
    return {
      label: t("admin:requests.previews.moderationSignal"),
      title: t("admin:requests.previews.reportReceived"),
      text: request.description || t("admin:requests.previews.reportText"),
    };
  }

  if (request.typeName === "appeal") {
    return {
      label: t("admin:requests.previews.disputeReview"),
      title: t("admin:requests.previews.appealReceived"),
      text: request.description || t("admin:requests.previews.appealText"),
    };
  }

  return {
    label: t("admin:requests.previews.requestReview"),
    title: t(requestTypeLabels[request.typeName]),
    text: request.description || t("admin:requests.previews.reviewFallback"),
  };
};
