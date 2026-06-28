import type { SortOption } from "@shared/config/types";
import type { OrganizationContextRole } from "@entities/organization";
import type { RoleSortOption } from "../model/types";
import type { OrganizationRolesPageModel } from "../model/pageModel";

export const getSortingRoleItems = (): SortOption<RoleSortOption>[] => [
  { label: "Name (A-Z)", value: "name" },
  { label: "Most permissions", value: "permissions" },
  { label: "Most members", value: "members" },
];

export const sortRolesByOption = (
  roles: OrganizationContextRole[],
  roleSort: OrganizationRolesPageModel["roleSort"],
  getMemberCountForRole: OrganizationRolesPageModel["getMemberCountForRole"],
) => {
  const sortedRoles = [...roles];

  return sortedRoles.sort((first, second) => {
    if (roleSort === "permissions") {
      const permissionsDiff =
        second.permissions.length - first.permissions.length;
      if (permissionsDiff !== 0) return permissionsDiff;
    }

    if (roleSort === "members") {
      const membersDiff =
        getMemberCountForRole(second.id) - getMemberCountForRole(first.id);
      if (membersDiff !== 0) return membersDiff;
    }

    return first.name.localeCompare(second.name);
  });
};
