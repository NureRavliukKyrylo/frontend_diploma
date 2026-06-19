import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { profileSearchDefaults } from "@entities/user";
import { Avatar } from "@shared/ui";
import type { OrganizationDetailsAnimationConfig } from "../lib/animation";
import type { DirectoryMemberCard } from "../lib/helpers";
import styles from "./MembersPanel.module.scss";

interface OrganizationDetailsMembersPanelProps {
  memberDirectoryCards: DirectoryMemberCard[];
  animation: OrganizationDetailsAnimationConfig;
  canManageMembers?: boolean;
  canSelfUnsubscribe?: boolean;
  currentUserId?: string | null;
  onRequestUnsubscribe?: (member: DirectoryMemberCard) => void;
}

export const OrganizationDetailsMembersPanel = ({
  memberDirectoryCards,
  animation,
  canManageMembers = false,
  canSelfUnsubscribe = false,
  currentUserId,
  onRequestUnsubscribe,
}: OrganizationDetailsMembersPanelProps) => {
  const { containerVariants, blockVariants, subtleHover } = animation;

  return (
    <motion.div
      className={styles.membersPanel}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className={styles.membersDirectoryGrid}>
        <div className={styles.membersDirectoryIntro}>
          <div className={styles.membersDirectoryIntroCopy}>
            <h3>Team members</h3>
            <p>These are the volunteers helping us create positive change</p>
          </div>
        </div>

        {memberDirectoryCards.length > 0 ? (
          memberDirectoryCards.map((memberCard) => (
            <motion.article
              key={memberCard.id}
              className={`${styles.membersDirectoryCard} ${styles.membersDirectoryCardInteractive}`}
              variants={blockVariants}
              whileHover={subtleHover}
            >
              {(((memberCard.id === currentUserId && canSelfUnsubscribe) ||
                (memberCard.id !== currentUserId && canManageMembers)) &&
                !memberCard.isOwner &&
                onRequestUnsubscribe) ? (
                <div className={styles.membersDirectoryActions}>
                  <Dropdown placement="bottom-end" shouldBlockScroll={false}>
                    <DropdownTrigger>
                      <button
                        type="button"
                        className={styles.membersDirectoryMenuButton}
                        aria-label={`Open actions for ${memberCard.name}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Icon path={mdiDotsHorizontal} size={0.95} />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label={`${memberCard.name} actions`}>
                      <DropdownItem
                        key="unsubscribe"
                        onClick={() => onRequestUnsubscribe(memberCard)}
                        classNames={{
                          base: styles.membersDirectoryDropdownItem,
                          title: styles.membersDirectoryDropdownTitle,
                        }}
                      >
                        {memberCard.id === currentUserId ? "Leave" : "Remove"}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : null}

              <Link
                to={memberCard.profilePath}
                search={profileSearchDefaults.profile}
                className={styles.membersDirectoryLink}
                aria-label={`Open ${memberCard.name} profile`}
              >
                <Avatar
                  src={memberCard.avatarUrl ?? undefined}
                  fallback={memberCard.name}
                  variant={memberCard.avatarUrl ? "default" : "initials"}
                  className={styles.membersDirectoryAvatar}
                  initialsClassName={styles.membersDirectoryInitials}
                />

                <div className={styles.membersDirectoryMeta}>
                  <h4>{memberCard.name}</h4>
                  <p>{memberCard.roleLabel}</p>
                </div>
              </Link>
            </motion.article>
          ))
        ) : (
          <motion.article
            className={styles.membersDirectoryEmpty}
            variants={blockVariants}
          >
            <h4>No team members yet</h4>
            <p>When people join the organization, they will appear here.</p>
          </motion.article>
        )}
      </div>
    </motion.div>
  );
};
