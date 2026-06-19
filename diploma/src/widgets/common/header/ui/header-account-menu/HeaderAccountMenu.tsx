import { getFullName, useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { useLogout } from "@features/auth";
import { LogOutImage } from "@shared/assets/images/actions";
import { DefaultAvatar } from "@shared/assets/images/user";
import { Avatar } from "@shared/ui";
import { ConfirmationModal } from "@shared/ui/modals";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { HeaderAccountDropdown } from "./HeaderAccountDropdown";
import styles from "./HeaderAccountMenu.module.scss";

interface HeaderAccountMenuProps {
  responsive?: boolean;
}

export const HeaderAccountMenu = ({
  responsive = false,
}: HeaderAccountMenuProps) => {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data: user } = useQuery({
    ...profileQuery.all(),
    enabled: isAuthenticated === true,
  });
  const { handleLogout, isLoading, errorMessage } = useLogout(() => {
    setIsOpen(false);
    setIsLogoutModalOpen(false);
  }, false);
  const fullName =
    getFullName(user?.firstName, user?.lastName) || user?.email || "Profile";
  const avatarSrc = user?.profile?.avatarUrl ?? DefaultAvatar;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openLogoutModal = () => {
    setIsOpen(false);
    setIsLogoutModalOpen(true);
  };

  return (
    <>
      <div
        ref={rootRef}
        className={clsx(
          responsive ? styles.responsiveRoot : styles.root,
          !responsive && styles.tooltip,
        )}
        data-tooltip={!responsive ? "Profile" : undefined}
        data-menu-open={isOpen ? "true" : undefined}
      >
        <button
          type="button"
          className={responsive ? styles.responsiveTrigger : styles.trigger}
          aria-label="Profile"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => isAuthenticated && setIsOpen((current) => !current)}
        >
          <Avatar
            src={avatarSrc}
            fallback={fullName}
            shape="circle"
            className={styles.avatar}
          />
        </button>
        <HeaderAccountDropdown
          isOpen={isAuthenticated === true && isOpen}
          responsive={responsive}
          avatarSrc={avatarSrc}
          fullName={fullName}
          email={user?.email ?? "Loading..."}
          availableMinutes={user?.profile?.timeBank.availableMinutes}
          isLogoutLoading={isLoading}
          onProfileClick={() => {
            setIsOpen(false);
            void navigate({ to: "/profile", search: { tab: "profile" } });
          }}
          onLogoutClick={openLogoutModal}
        />
      </div>
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Are you sure you want to logout?"
        text="You will be able to sign in again whenever you need."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={() => handleLogout()}
        onCancel={() => setIsLogoutModalOpen(false)}
        isLoading={isLoading}
        image={LogOutImage}
        error={errorMessage}
      />
    </>
  );
};
