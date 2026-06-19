import type { Organization, OrganizationMember } from "../model/types";
import { getNestedObjectValue, pickString } from "./normalizeOrganizationValues";

export const normalizeOrganizationMember = (
  raw: unknown,
): OrganizationMember | null => {
  if (typeof raw !== "object" || raw === null) return null;

  const value = raw as Record<string, unknown>;
  const profile =
    (getNestedObjectValue(value, "profile", "Profile") as
      | Record<string, unknown>
      | undefined) ?? {};
  const user =
    (getNestedObjectValue(value, "user", "User") as
      | Record<string, unknown>
      | undefined) ?? {};
  const userProfile =
    (getNestedObjectValue(user, "profile", "Profile") as
      | Record<string, unknown>
      | undefined) ?? {};

  const id = pickString(
    value.id as string | undefined,
    value.Id as string | undefined,
    value.userId as string | undefined,
    value.UserId as string | undefined,
    user.id as string | undefined,
    user.Id as string | undefined,
  );

  if (!id) return null;

  return {
    id,
    firstName: pickString(
      value.firstName as string | undefined,
      value.FirstName as string | undefined,
      user.firstName as string | undefined,
      user.FirstName as string | undefined,
    ),
    lastName: pickString(
      value.lastName as string | undefined,
      value.LastName as string | undefined,
      user.lastName as string | undefined,
      user.LastName as string | undefined,
    ),
    email:
      pickString(
        value.email as string | undefined,
        value.Email as string | undefined,
        user.email as string | undefined,
        user.Email as string | undefined,
      ) ?? null,
    avatarUrl:
      pickString(
        value.avatarUrl as string | undefined,
        value.AvatarUrl as string | undefined,
        profile.avatarUrl as string | undefined,
        profile.AvatarUrl as string | undefined,
        userProfile.avatarUrl as string | undefined,
        userProfile.AvatarUrl as string | undefined,
      ) ?? null,
    role:
      pickString(
        value.role as string | undefined,
        value.Role as string | undefined,
      ) ?? null,
  };
};

export const normalizeOrganizationMemberPreview = (
  raw: unknown,
): NonNullable<Organization["memberPreviews"]>[number] | null => {
  const member = normalizeOrganizationMember(raw);

  if (!member || typeof raw !== "object" || raw === null) return null;

  const value = raw as Record<string, unknown>;
  const role =
    (getNestedObjectValue(value, "role", "Role") as
      | Record<string, unknown>
      | undefined) ?? {};

  return {
    userId: member.id,
    firstName: member.firstName ?? "",
    lastName: member.lastName ?? "",
    avatarUrl: member.avatarUrl ?? "",
    role: {
      roleId:
        pickString(
          role.roleId as string | undefined,
          role.RoleId as string | undefined,
        ) ?? "",
      name:
        pickString(
          role.name as string | undefined,
          role.Name as string | undefined,
        ) ?? "",
    },
  };
};
