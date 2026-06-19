import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  MessageSquare,
  MoreHorizontal,
  UserMinus,
} from "lucide-react";
import type { OrganizationContextRole } from "@entities/organization";
import type { useMemberRoleMenu } from "../lib/useMemberRoleMenu";
import type { OrganizationMemberCardModel } from "../types";
import { getRoleTone } from "./roleTone";
import styles from "../MemberCard.module.scss";

interface MemberCardFooterProps {
  member: OrganizationMemberCardModel;
  roleMenu: ReturnType<typeof useMemberRoleMenu>;
  isRoleChangePending: boolean;
  showRoleSection: boolean;
  onProfileClick: (member: OrganizationMemberCardModel) => void;
  onMessageClick: (member: OrganizationMemberCardModel) => void;
  onRemoveClick: (member: OrganizationMemberCardModel) => void;
}

export const MemberCardFooter = ({
  member,
  roleMenu,
  isRoleChangePending,
  showRoleSection,
  onProfileClick,
  onMessageClick,
  onRemoveClick,
}: MemberCardFooterProps) => (
  <div className={styles.footer}>
    <button
      type="button"
      className={styles.profileBtn}
      onClick={() => onProfileClick(member)}
    >
      Profile
    </button>

    {!member.isOwner ? (
      <div className={styles.menuWrap} ref={roleMenu.menuRef}>
        <AnimatePresence>
          {roleMenu.isMenuOpen ? (
            <motion.div
              className={styles.dropdownMenu}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {showRoleSection ? (
                <RoleMenuSection
                  roles={roleMenu.availableRoles}
                  roleMenu={roleMenu}
                  isRoleChangePending={isRoleChangePending}
                />
              ) : null}

              <div className={styles.menuSection}>
                <button
                  type="button"
                  className={styles.menuAction}
                  onClick={() => {
                    onMessageClick(member);
                    roleMenu.closeMenu();
                  }}
                >
                  <MessageSquare size={15} strokeWidth={2.2} />
                  <span>Send message</span>
                </button>
              </div>

              <div className={styles.menuSection}>
                <button
                  type="button"
                  className={`${styles.menuAction} ${styles.menuActionDanger}`}
                  onClick={() => {
                    onRemoveClick(member);
                    roleMenu.closeMenu();
                  }}
                >
                  <UserMinus size={15} strokeWidth={2.2} />
                  <span>Remove from org</span>
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          className={`${styles.moreBtn} ${
            roleMenu.isMenuOpen ? styles.moreBtnOpen : ""
          }`}
          aria-expanded={roleMenu.isMenuOpen}
          aria-label={`Open actions for ${member.fullName}`}
          onClick={roleMenu.toggleMenu}
        >
          <MoreHorizontal size={20} strokeWidth={2.4} />
        </button>
      </div>
    ) : null}
  </div>
);

interface RoleMenuSectionProps {
  roles: OrganizationContextRole[];
  roleMenu: ReturnType<typeof useMemberRoleMenu>;
  isRoleChangePending: boolean;
}

const RoleMenuSection = ({
  roles,
  roleMenu,
  isRoleChangePending,
}: RoleMenuSectionProps) => (
  <div className={styles.menuSection}>
    <p className={styles.sectionLabel}>Change role</p>
    <div className={styles.roleList}>
      {roles.map((role) => {
        const isActiveRole = roleMenu.isCurrentRole(role.id);
        const tone = getRoleTone(role.name, false);

        return (
          <button
            key={role.id}
            type="button"
            className={styles.roleItem}
            disabled={isRoleChangePending || isActiveRole}
            onClick={() => roleMenu.selectRole(role.id)}
          >
            <span
              className={styles.roleDot}
              style={{ backgroundColor: tone.dotColor }}
            />
            <span className={styles.roleItemLabel}>{role.name}</span>
            {isActiveRole ? (
              <Check
                size={14}
                strokeWidth={2.8}
                className={styles.roleCheck}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  </div>
);
