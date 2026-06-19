import { useMemo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ContextRoleDto } from "@entities/organization";
import {
  getRoleTypeLabel,
  type ContextRoleCardType,
} from "../../config/rolePresentation";
import { useRoleDrawerLifecycle } from "./lib/useRoleDrawerLifecycle";
import type { RoleDrawerMember } from "./types";
import { MembersSection } from "./ui/MembersSection";
import { PermissionsSection } from "./ui/PermissionsSection";
import { RoleDrawerFooter } from "./ui/RoleDrawerFooter";
import styles from "./RoleDrawer.module.scss";

interface RoleDrawerProps {
  isOpen: boolean;
  role: ContextRoleDto | null;
  type: ContextRoleCardType | null;
  memberCount: number;
  members: RoleDrawerMember[];
  stripeColor: string;
  onClose: () => void;
  onEdit?: () => void;
  onSetDefault?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export const RoleDrawer = ({
  isOpen,
  role,
  type,
  memberCount,
  members,
  stripeColor,
  onClose,
  onEdit,
  onSetDefault,
  onArchive,
  onDelete,
}: RoleDrawerProps) => {
  useRoleDrawerLifecycle(isOpen, onClose);

  const subtitle = useMemo(() => {
    if (!role || !type) return "";

    const typeLabel = getRoleTypeLabel(type, role);
    const membersLabel =
      memberCount === 1 ? "1 member" : `${memberCount} members`;

    return `${typeLabel} · ${membersLabel}`;
  }, [memberCount, role, type]);

  if (!role || !type) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label="Close role drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span
              className={styles.headerStripe}
              style={{ backgroundColor: stripeColor }}
            />

            <header className={styles.header}>
              <div>
                <h2 className={styles.title}>{role.name}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close role drawer"
                onClick={onClose}
              >
                <X size={18} strokeWidth={2.6} />
              </button>
            </header>

            <div className={styles.body}>
              <PermissionsSection permissions={role.permissions} />
              <MembersSection memberCount={memberCount} members={members} />
            </div>

            <RoleDrawerFooter
              role={role}
              type={type}
              onClose={onClose}
              onEdit={onEdit}
              onSetDefault={onSetDefault}
              onArchive={onArchive}
              onDelete={onDelete}
            />
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};

export type { RoleDrawerMember };
