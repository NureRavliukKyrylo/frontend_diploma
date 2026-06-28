import { getFullName, useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { useLogout } from "@features/auth";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { adminNavItems } from "../config/adminSidebarNav";
import { getInitials, isNavItemActive } from "../lib/sidebarNavState";
import { useAdminSidebarBadges } from "../model/useAdminSidebarBadges";
import { AccountDropdown } from "./AccountDropdown";
import { LogoutConfirmationModal } from "./LogoutConfirmationModal";
import { SidebarActionRow } from "./SidebarActionRow";
import { SidebarNav } from "./SidebarNav";
import styles from "./AdminSidebar.module.scss";

export const AdminSidebar = () => {
  const location = useLocation();
  const systemRole = useUserStore((state) => state.systemRole);
  const rootRef = useRef<HTMLElement>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data: user } = useQuery(profileQuery.all());
  const { notificationLabel, notificationTooltip, badgeLabels } =
    useAdminSidebarBadges();
  const { handleLogout, isLoading, errorMessage } = useLogout(() => {
    setIsAccountOpen(false);
    setIsLogoutModalOpen(false);
  }, false);
  const activeItem = useMemo(
    () =>
      adminNavItems.find((item) =>
        item.href ? isNavItemActive(location.pathname, item.href) : false,
      ),
    [location.pathname],
  );
  const fullName =
    getFullName(user?.firstName, user?.lastName) || user?.email || "Admin";
  const roleLabel = systemRole ?? user?.roleName ?? "Admin";
  const initials = getInitials(fullName);

  useEffect(() => {
    if (!isAccountOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAccountOpen]);

  const openLogoutModal = () => {
    setIsAccountOpen(false);
    setIsLogoutModalOpen(true);
  };

  return (
    <>
      <aside ref={rootRef} className={styles.sidebar}>
        <div className={styles.logoBlock}>
          <span className={styles.logo}>IMPACTFLOW</span>
          <span className={styles.logoCaption}>Admin panel</span>
        </div>

        <SidebarActionRow
          searchLabel={activeItem?.searchLabel ?? "Search anything"}
          notificationLabel={notificationLabel}
          notificationTooltip={notificationTooltip}
        />

        <SidebarNav pathname={location.pathname} badgeLabels={badgeLabels} />

        <Link to="/activities" className={styles.backLink}>
          <ArrowLeft size={15} aria-hidden="true" />
          <span>Back to platform</span>
        </Link>

        <AccountDropdown
          fullName={fullName}
          roleLabel={roleLabel}
          initials={initials}
          isOpen={isAccountOpen}
          isLoading={isLoading}
          onToggle={() => setIsAccountOpen((current) => !current)}
          onLogout={openLogoutModal}
        />
      </aside>

      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        isLoading={isLoading}
        error={errorMessage}
        onConfirm={() => handleLogout()}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};
