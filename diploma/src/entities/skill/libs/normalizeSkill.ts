import type { PaginationResponse } from "@shared/config/types";
import {
  asRecord,
  readArrayPair,
  readBooleanPair,
  readNumberPair,
  readPairValue,
  readStringPair,
  readTrimmedNullableStringPair,
} from "@shared/api/normalize-helpers";
import type {
  CategoryListItemDto,
  SkillListItemDto,
  SkillsListResponse,
  VolunteerSkillLevel,
  VolunteerSkillListItemDto,
} from "../model/types";

const normalizePagination = (value: unknown): PaginationResponse => {
  const record = asRecord(value);

  return {
    totalCount: readNumberPair(record, "totalCount", "TotalCount"),
    page: readNumberPair(record, "page", "Page"),
    pageSize: readNumberPair(record, "pageSize", "PageSize"),
    totalPages: readNumberPair(record, "totalPages", "TotalPages"),
    nextPage: readNumberPair(record, "nextPage", "NextPage"),
    previousPage: readNumberPair(record, "previousPage", "PreviousPage"),
  };
};

export const normalizeCategoryListItem = (
  value: unknown,
): CategoryListItemDto => {
  const record = asRecord(value);

  return {
    id: readStringPair(record, "id", "Id"),
    name: readStringPair(record, "name", "Name"),
    description: readTrimmedNullableStringPair(
      record,
      "description",
      "Description",
    ),
    imageUrl: readTrimmedNullableStringPair(record, "imageUrl", "ImageUrl"),
  };
};

export const normalizeSkillListItem = (value: unknown): SkillListItemDto => {
  const record = asRecord(value);

  return {
    id: readStringPair(record, "id", "Id"),
    name: readStringPair(record, "name", "Name"),
    description: readTrimmedNullableStringPair(
      record,
      "description",
      "Description",
    ),
    iconUrl: readTrimmedNullableStringPair(record, "iconUrl", "IconUrl"),
    categories: readArrayPair(
      record,
      "categories",
      "Categories",
      normalizeCategoryListItem,
    ),
  };
};

export const normalizeSkillsListResponse = (
  value: unknown,
): SkillsListResponse => {
  const record = asRecord(value);

  return {
    data: readArrayPair(record, "data", "Data", normalizeSkillListItem),
    pagination: normalizePagination(
      readPairValue(record, "pagination", "Pagination"),
    ),
  };
};

const normalizeSkillLevel = (value: string): VolunteerSkillLevel => {
  if (
    value === "Intermediate" ||
    value === "Advanced" ||
    value === "Expert"
  ) {
    return value;
  }

  return "Beginner";
};

export const normalizeVolunteerSkill = (
  value: unknown,
): VolunteerSkillListItemDto => {
  const record = asRecord(value);

  return {
    id: readStringPair(record, "id", "Id"),
    userId: readStringPair(record, "userId", "UserId"),
    skillId: readStringPair(record, "skillId", "SkillId"),
    level: normalizeSkillLevel(readStringPair(record, "level", "Level")),
    verified: readBooleanPair(record, "verified", "Verified"),
    addedAt: readStringPair(record, "addedAt", "AddedAt"),
    fullName: readTrimmedNullableStringPair(record, "fullName", "FullName"),
    avatarUrl: readTrimmedNullableStringPair(record, "avatarUrl", "AvatarUrl"),
  };
};

export const normalizeVolunteerSkillsResponse = (
  value: unknown,
): VolunteerSkillListItemDto[] => {
  if (Array.isArray(value)) {
    return value.map(normalizeVolunteerSkill);
  }

  const record = asRecord(value);
  const wrappedData = readPairValue(record, "data", "Data");

  return Array.isArray(wrappedData)
    ? wrappedData.map(normalizeVolunteerSkill)
    : [];
};
