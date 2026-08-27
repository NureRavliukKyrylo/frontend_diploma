import { motion } from "framer-motion";
import { Layout as TopographicPattern } from "@shared/assets/images/layout";
import type { OrganizationMember } from "@entities/organization";
import type { OrganizationDetailsAnimationConfig } from "../../lib/animation";
import { LevelSummary } from "./LevelSummary";
import { ProjectHighlights } from "./ProjectHighlights";
import { StoryCard } from "./StoryCard";
import styles from "./Panel.module.scss";

interface OrganizationDetailsInfoPanelProps {
  level: number;
  levelCurrent: number;
  levelMax: number;
  levelProgressPercent: number;
  levelNext: number;
  rating: number;
  votes: number;
  activeProjects: number;
  completedProjects: number;
  renderedDescription: string;
  descriptionExpanded: boolean;
  hasLongDescription: boolean;
  highlightedMembers: OrganizationMember[];
  remainingMembersCount: number;
  membersAccessDenied: boolean;
  animation: OrganizationDetailsAnimationConfig;
  onToggleDescription: () => void;
  onScrollToProjects: () => void;
}

export const OrganizationDetailsInfoPanel = ({
  level,
  levelCurrent,
  levelMax,
  levelProgressPercent,
  levelNext,
  rating,
  votes,
  activeProjects,
  completedProjects,
  renderedDescription,
  descriptionExpanded,
  hasLongDescription,
  highlightedMembers,
  remainingMembersCount,
  membersAccessDenied,
  animation,
  onToggleDescription,
  onScrollToProjects,
}: OrganizationDetailsInfoPanelProps) => {
  const { containerVariants, nestedContainerVariants, prefersReducedMotion } =
    animation;

  return (
    <article className={styles.infoPanel}>
      <LevelSummary
        level={level}
        levelCurrent={levelCurrent}
        levelMax={levelMax}
        levelProgressPercent={levelProgressPercent}
        levelNext={levelNext}
        rating={rating}
        votes={votes}
        animation={animation}
      />

      <motion.div
        className={styles.panelGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <ProjectHighlights
          activeProjects={activeProjects}
          completedProjects={completedProjects}
          animation={animation}
          onScrollToProjects={onScrollToProjects}
        />

        <motion.div
          className={styles.storyColumn}
          variants={nestedContainerVariants}
        >
          <StoryCard
            renderedDescription={renderedDescription}
            descriptionExpanded={descriptionExpanded}
            hasLongDescription={hasLongDescription}
            highlightedMembers={highlightedMembers}
            remainingMembersCount={remainingMembersCount}
            membersAccessDenied={membersAccessDenied}
            animation={animation}
            onToggleDescription={onToggleDescription}
          />
        </motion.div>
      </motion.div>

      <motion.img
        src={TopographicPattern}
        alt=""
        aria-hidden="true"
        className={styles.contourPattern}
        initial={prefersReducedMotion ? undefined : { x: 0, y: 0 }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 12, 0],
                y: [0, -10, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 10,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
      />
    </article>
  );
};
