import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@shared/ui";
import { DefaultAvatar } from "@shared/assets/images/user";
import type { OrganizationMember } from "@entities/organization";
import type { OrganizationDetailsAnimationConfig } from "../../lib/animation";
import { getMemberName } from "../../lib/helpers";
import styles from "./StoryCard.module.scss";

interface StoryCardProps {
  renderedDescription: string;
  descriptionExpanded: boolean;
  hasLongDescription: boolean;
  highlightedMembers: OrganizationMember[];
  remainingMembersCount: number;
  membersAccessDenied: boolean;
  animation: OrganizationDetailsAnimationConfig;
  onToggleDescription: () => void;
}

export const StoryCard = ({
  renderedDescription,
  descriptionExpanded,
  hasLongDescription,
  highlightedMembers,
  remainingMembersCount,
  membersAccessDenied,
  animation,
  onToggleDescription,
}: StoryCardProps) => {
  const collapsedDescriptionHeight = 140;
  const {
    blockVariants,
    sideRevealVariants,
    subtleHover,
    buttonHover,
    prefersReducedMotion,
  } = animation;
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] =
    useState(false);

  useEffect(() => {
    if (!hasLongDescription) {
      setIsDescriptionOverflowing(false);
      return;
    }

    const checkOverflow = () => {
      const element = descriptionRef.current;

      if (!element) {
        setIsDescriptionOverflowing(false);
        return;
      }

      setIsDescriptionOverflowing(
        element.scrollHeight > collapsedDescriptionHeight + 1,
      );
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [
    collapsedDescriptionHeight,
    descriptionExpanded,
    hasLongDescription,
    renderedDescription,
  ]);

  return (
    <div className={styles.storyCard}>
      <motion.div className={styles.storyContent} variants={blockVariants}>
        <p
          ref={descriptionRef}
          className={`${styles.descriptionText} ${
            !descriptionExpanded && isDescriptionOverflowing
              ? styles.descriptionCollapsed
              : ""
          }`}
        >
          {renderedDescription}
        </p>

        {hasLongDescription && (descriptionExpanded || isDescriptionOverflowing) ? (
          <motion.button
            type="button"
            className={styles.descriptionAction}
            onClick={onToggleDescription}
            whileHover={buttonHover}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          >
            {descriptionExpanded ? "Show less" : "Read more"}
          </motion.button>
        ) : null}
      </motion.div>

      <motion.article
        className={styles.teamPreviewCard}
        variants={blockVariants}
        whileHover={subtleHover}
      >
        <div>
          <span className={styles.cardEyebrow}>TEAM</span>
          <h3>MEMBERS</h3>
        </div>

        <motion.div className={styles.membersRow} variants={sideRevealVariants}>
          {highlightedMembers.length > 0 ? (
            <>
              {highlightedMembers.map((member) => (
                <Avatar
                  key={member.id}
                  src={member.avatarUrl ?? DefaultAvatar}
                  fallback={getMemberName(member)}
                  variant="default"
                  className={styles.memberAvatar}
                  initialsClassName={styles.memberInitials}
                />
              ))}
              {remainingMembersCount > 0 ? (
                <span className={styles.extraMembersBadge}>
                  +{remainingMembersCount}
                </span>
              ) : null}
            </>
          ) : (
            <span className={styles.membersFallback}>
              {membersAccessDenied
                ? "Members are hidden by access policy"
                : "No members available yet"}
            </span>
          )}
        </motion.div>
      </motion.article>
    </div>
  );
};
