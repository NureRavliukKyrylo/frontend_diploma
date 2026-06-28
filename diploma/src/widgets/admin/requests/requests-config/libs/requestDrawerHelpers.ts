import type {
  AdminRequestListItem,
  AdminRequestTypeName,
} from "@entities/admin";
import { requestTypeLabels } from "./requestTypeConfig";

export const getRequestInitials = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IF";

export const getShortId = (value: string | null | undefined) => {
  if (!value) return "Not provided";
  if (value.length <= 18) return value;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
};

export const formatDrawerValue = (
  value: string | number | null | undefined,
) => {
  if (value === null || value === undefined || value === "") return "Not provided";
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
  if (!type && !id) return "Not provided";
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

export const getDrawerIntro = (request: AdminRequestListItem) => {
  const entityName = getRequestEntityName(request);

  if (request.typeName.includes("Join")) {
    return {
      label: "Membership review",
      title: `Join ${entityName}`,
      text: "Review the requester and approve access only if the context looks right.",
    };
  }

  if (request.typeName.includes("Leave")) {
    return {
      label: "Membership change",
      title: `Leave ${entityName}`,
      text: "This request records a member leaving the selected workspace.",
    };
  }

  if (request.typeName === "skillCreation") {
    return {
      label: "Catalog proposal",
      title: "New skill candidate",
      text: "Check the proposed skill name, description, and attached categories before publishing it.",
    };
  }

  if (request.typeName === "categoryCreation") {
    return {
      label: "Catalog proposal",
      title: "New category candidate",
      text: "Review whether this category is clear, reusable, and ready to appear in the public catalog.",
    };
  }

  if (request.typeName === "badgeAward") {
    return {
      label: "Recognition",
      title: "Badge award",
      text:
        request.description ||
        "Confirm that this badge should be attached to the selected user or activity.",
    };
  }

  if (request.typeName === "report") {
    return {
      label: "Moderation signal",
      title: "Report received",
      text:
        request.description ||
        "This report is informational here. Open the linked moderation case when available.",
    };
  }

  if (request.typeName === "appeal") {
    return {
      label: "Dispute review",
      title: "Appeal received",
      text:
        request.description ||
        "This appeal needs a dedicated backend resolution flow before it can be decided here.",
    };
  }

  return {
    label: "Request review",
    title: requestTypeLabels[request.typeName],
    text: request.description || "Review the available context before taking action.",
  };
};
