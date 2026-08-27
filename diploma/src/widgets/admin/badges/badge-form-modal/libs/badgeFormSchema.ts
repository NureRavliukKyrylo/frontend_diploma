import type {
  AdminBadgeDetails,
  AdminBadgeListItem,
  BadgeMetricPayload,
  BadgeMetricType,
  BadgeRankPayload,
  BadgeRulePayload,
  BadgeScopeEntityType,
  Tier,
} from "@entities/badge";
import type { TFunction } from "i18next";
import * as Yup from "yup";

export interface BadgeRuleFormValues {
  label: string;
  metric: BadgeMetricType;
  threshold: number;
  weight: number;
  relatedEntityType: "platform" | BadgeScopeEntityType;
  relatedEntityId: string;
  relatedEntityKey: string;
}

export interface BadgeFormValues {
  title: string;
  description: string;
  titleLocalizedUk: string;
  titleLocalizedEn: string;
  descriptionLocalizedUk: string;
  descriptionLocalizedEn: string;
  rank: Tier;
  scopeEntityType: "platform" | BadgeScopeEntityType;
  scopeEntityId: string;
  availableFromUtc: string;
  availableToUtc: string;
  autoAwardEnabled: boolean;
  isRequestable: boolean;
  isArchived: boolean;
  iconUrl: string;
  iconFile: File | null;
  rules: BadgeRuleFormValues[];
}

export const badgeIconMaxSize = 2 * 1024 * 1024;

const entityRuleScopes: BadgeScopeEntityType[] = [
  "organization",
  "project",
  "event",
  "task",
];

const isEntityRuleScope = (value: string) =>
  entityRuleScopes.includes(value as BadgeScopeEntityType);

const isValidDateValue = (value?: string | null) => {
  if (!value) {
    return true;
  }

  return !Number.isNaN(new Date(value).getTime());
};

const getBadgeRuleSchema = () =>
  Yup.object({
    label: Yup.string().trim().max(100).required(),
    metric: Yup.mixed<BadgeMetricType>().required(),
    threshold: Yup.number().min(0.1).required(),
    weight: Yup.number().min(0.1).required(),
    relatedEntityType: Yup.string()
      .oneOf(["platform", "organization", "project", "event", "task"])
      .default("platform"),
    relatedEntityId: Yup.string().when("relatedEntityType", {
      is: (value: string) => isEntityRuleScope(value),
      then: (relatedSchema) => relatedSchema.trim().required(),
      otherwise: (relatedSchema) => relatedSchema.trim().nullable(),
    }),
    relatedEntityKey: Yup.string().trim().nullable(),
  });

export const toBadgeRankPayload = (rank: Tier): BadgeRankPayload => {
  const ranks: Record<Tier, BadgeRankPayload> = {
    S: "s",
    A: "a",
    B: "b",
    C: "c",
    D: "d",
    E: "e",
    F: "f",
  };

  return ranks[rank];
};

const toBadgeMetricPayload = (metric: BadgeMetricType): BadgeMetricPayload => {
  const metrics: Record<BadgeMetricType, BadgeMetricPayload> = {
    volunteeredHours: 1,
    projectsJoinedCount: 2,
    projectsCompletedCount: 3,
    eventsJoinedCount: 4,
    tasksCompletedCount: 5,
  };

  return metrics[metric];
};

export const getEmptyBadgeRule = (): BadgeRuleFormValues => ({
  label: "",
  metric: "volunteeredHours",
  threshold: 1,
  weight: 1,
  relatedEntityType: "platform",
  relatedEntityId: "",
  relatedEntityKey: "",
});

export const getBadgeFormSchema = (
  t: TFunction,
  mode: "create" | "edit",
) =>
  Yup.object({
    title: Yup.string()
      .trim()
      .max(100)
      .required(t("admin:badges.form.titleRequired")),
    description: Yup.string().trim().max(1000).nullable(),
    titleLocalizedUk: Yup.string().trim().max(100).nullable(),
    titleLocalizedEn: Yup.string().trim().max(100).nullable(),
    descriptionLocalizedUk: Yup.string().trim().max(1000).nullable(),
    descriptionLocalizedEn: Yup.string().trim().max(1000).nullable(),
    rank: Yup.string()
      .oneOf(["S", "A", "B", "C", "D", "E", "F"])
      .required(t("admin:badges.form.rankRequired")),
    scopeEntityType: Yup.string()
      .oneOf(["platform", "organization", "project", "event", "task"])
      .required(),
    scopeEntityId: Yup.string().when("scopeEntityType", {
      is: (value: string) => value !== "platform",
      then: (schema) =>
        schema.trim().required(t("admin:badges.form.scopeIdRequired")),
      otherwise: (schema) => schema.trim().nullable(),
    }),
    availableFromUtc: Yup.string()
      .nullable()
      .test(
        "valid-date",
        t("admin:badges.form.availableToInvalid"),
        isValidDateValue,
      ),
    availableToUtc: Yup.string()
      .nullable()
      .test(
        "valid-date",
        t("admin:badges.form.availableToInvalid"),
        isValidDateValue,
      )
      .test(
        "after-start",
        t("admin:badges.form.availableToInvalid"),
        function validateEnd(value) {
          const start = this.parent.availableFromUtc as string | undefined;

          if (!start || !value || !isValidDateValue(start) || !isValidDateValue(value)) {
            return true;
          }

          return new Date(value).getTime() >= new Date(start).getTime();
        },
      ),
    autoAwardEnabled: Yup.boolean().default(false),
    isRequestable: Yup.boolean().default(true),
    isArchived: Yup.boolean().default(false),
    iconUrl: Yup.string().nullable(),
    iconFile:
      mode === "create"
        ? Yup.mixed<File>().required(t("admin:badges.form.iconRequired"))
        : Yup.mixed<File>().nullable(),
    rules: Yup.array()
      .of(getBadgeRuleSchema())
      .when("autoAwardEnabled", {
      is: true,
      then: (schema) =>
        schema.min(1, t("admin:badges.form.ruleRequired")),
      otherwise: (schema) => schema.default([]),
    }),
  });

const toDateTimeLocal = (value?: string | null) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (part: number) => String(part).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const fromRuleProgress = (
  badge?: AdminBadgeDetails | AdminBadgeListItem | null,
): BadgeRuleFormValues[] =>
  badge?.ruleProgress.map((rule) => ({
    label: rule.label,
    metric: rule.metric,
    threshold: rule.threshold || 1,
    weight: 1,
    relatedEntityType:
      rule.relatedEntityType === "organization" ||
      rule.relatedEntityType === "project" ||
      rule.relatedEntityType === "event" ||
      rule.relatedEntityType === "task"
        ? rule.relatedEntityType
        : "platform",
    relatedEntityId: rule.relatedEntityId ?? "",
    relatedEntityKey: rule.relatedEntityKey ?? "",
  })) ?? [];

export const getInitialBadgeValues = (
  badge?: AdminBadgeDetails | AdminBadgeListItem | null,
): BadgeFormValues => ({
  title: badge?.title ?? "",
  description: badge && "description" in badge ? (badge.description ?? "") : "",
  titleLocalizedUk: "",
  titleLocalizedEn: "",
  descriptionLocalizedUk: "",
  descriptionLocalizedEn: "",
  rank: badge?.rank.name ?? "C",
  scopeEntityType: badge?.scopeEntityType ?? "platform",
  scopeEntityId: badge?.scopeEntityId ?? "",
  availableFromUtc:
    badge && "availableFromUtc" in badge
      ? toDateTimeLocal(badge.availableFromUtc)
      : "",
  availableToUtc:
    badge && "availableToUtc" in badge ? toDateTimeLocal(badge.availableToUtc) : "",
  autoAwardEnabled: badge?.autoAwardEnabled ?? false,
  isRequestable: badge?.isRequestable ?? true,
  isArchived: badge?.isArchived ?? false,
  iconUrl: badge?.iconUrl ?? "",
  iconFile: null,
  rules: fromRuleProgress(badge),
});

export const toBadgeRulesPayload = (
  rules: BadgeRuleFormValues[],
): BadgeRulePayload[] =>
  rules.map((rule) => {
    const relatedEntityType =
      rule.relatedEntityType === "platform" ? null : rule.relatedEntityType;
    const isEntityScope =
      relatedEntityType !== null && isEntityRuleScope(relatedEntityType);

    return {
      label: rule.label.trim(),
      metric: toBadgeMetricPayload(rule.metric),
      threshold: Number(rule.threshold),
      weight: Number(rule.weight),
      relatedEntityType,
      relatedEntityId: isEntityScope ? rule.relatedEntityId.trim() : null,
      relatedEntityKey: null,
    };
  });

export const toUtcIsoString = (value: string) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};
