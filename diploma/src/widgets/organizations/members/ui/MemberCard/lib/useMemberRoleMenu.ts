import { useEffect, useMemo, useRef, useState } from "react";
import type { OrganizationContextRole } from "@entities/organization";

interface UseMemberRoleMenuParams {
  roles: OrganizationContextRole[];
  currentRoleId?: string | null;
  onSelectRole: (roleId: string) => void;
}

export const useMemberRoleMenu = ({
  roles,
  currentRoleId,
  onSelectRole,
}: UseMemberRoleMenuParams) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const availableRoles = useMemo(
    () => roles.filter((role) => role.isActive && !role.archivedAt),
    [roles],
  );

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((current) => !current);
  const selectRole = (roleId: string) => {
    onSelectRole(roleId);
    closeMenu();
  };

  return {
    menuRef,
    isMenuOpen,
    availableRoles,
    hasAvailableRoles: availableRoles.length > 0,
    isCurrentRole: (roleId: string) => roleId === currentRoleId,
    closeMenu,
    toggleMenu,
    selectRole,
  };
};
