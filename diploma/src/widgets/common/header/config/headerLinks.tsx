import type { NavLink, SystemRole } from "@shared/config/types";
import type { TFunction } from "i18next";

export const getHeaderLinks = (t: TFunction, role?: SystemRole): NavLink[] => {
  const common: NavLink[] = [
    { title: t("nav.activities"), href: "/activities" },
    { title: t("nav.map"), href: "/map" },
    { title: t("nav.organizations"), href: "/organizations" },
    { title: t("nav.calendar"), href: "/calendar" },
    { title: t("nav.categories"), href: "/categories" },
    { title: t("nav.timeBank"), href: "/time-bank" },
  ];

  const modLinks: NavLink[] = [
    ...common.filter(
      (link) => !["/map", "/calendar", "/time-bank"].includes(link.href),
    ),
    { title: t("nav.moderation"), href: "/reports" },
  ];

  const adminLinks: NavLink[] = [
    ...common,
    { title: t("nav.moderation"), href: "/reports" },
    { title: t("nav.admin"), href: "/admin" },
  ];

  const map: Record<SystemRole, NavLink[]> = {
    User: common,
    Moderator: modLinks,
    Admin: adminLinks,
    SuperAdmin: adminLinks,
  };

  return !role ? map["User"] : map[role];
};
