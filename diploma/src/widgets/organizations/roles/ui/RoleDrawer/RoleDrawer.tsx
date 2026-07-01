import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ContextRoleDto } from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import {
  getRoleTypeLabel,
  type ContextRoleCardType,
} from "../../config/rolePresentation";
import { useRoleDrawerLifecycle } from "./lib/useRoleDrawerLifecycle";
import type { RoleDrawerMember } from "./types";
import { AssignmentSection } from "./ui/AssignmentSection";
import { MembersSection } from "./ui/MembersSection";
import { PermissionsSection } from "./ui/PermissionsSection";
import { RoleDrawerFooter } from "./ui/RoleDrawerFooter";
import styles from "./RoleDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface RoleDrawerProps {
  isOpen: boolean;
  role: ContextRoleDto | null;
  type: ContextRoleCardType | null;
  memberCount: number;
  members: RoleDrawerMember[];
  assignmentMembers: ParticipationListItem[];
  assignmentRoles: ContextRoleDto[];
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
  assignmentMembers,
  assignmentRoles,
  stripeColor,
  onClose,
  onEdit,
  onSetDefault,
  onArchive,
  onDelete,
}: RoleDrawerProps) => {
  const { t } = useTranslation("roles");
  useRoleDrawerLifecycle(isOpen, onClose);

  if (!role || !type) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label={t("drawer.close")}
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
              <div className={styles.headerMain}>
                <div className={styles.titleRow}>
                  <span className={styles.roleIcon}>
                    {role.name.trim().charAt(0).toUpperCase() || "R"}
                  </span>
                  <h2 className={styles.title}>{role.name}</h2>
                </div>
                <div className={styles.metaLine}>
                  <span>{getRoleTypeLabel(type, role, t)}</span>
                  <span className={styles.metaDot} />
                  <span>{t("card.members", { count: memberCount })}</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                aria-label={t("drawer.close")}
                onClick={onClose}
              >
                <X size={18} strokeWidth={2.6} />
              </button>
            </header>

            <div className={styles.body}>
              <PermissionsSection permissions={role.permissions} />
              <AssignmentSection
                assignableBy={role.assignableBy}
                approvableBy={role.approvableBy}
                members={assignmentMembers}
                roles={assignmentRoles}
                currentRoleId={role.id}
              />
              <MembersSection memberCount={memberCount} members={members} />
            </div>

            <RoleDrawerFooter
              role={role}
              type={type}
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
