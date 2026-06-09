import styles from "./SkillsListFilter.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import type { QueryResult } from "@shared/config/types";
import { Tab } from "@shared/ui";
import type { Skill } from "@entities/skill";

interface SkillsListFilterProps {
  useSkillsQuery: () => QueryResult<Pick<Skill, "id" | "name">>;
  selectedIds?: string[];
  onToggle: (id: string) => void;
}

export const SkillsListFilter = ({
  useSkillsQuery,
  selectedIds,
  onToggle,
}: SkillsListFilterProps) => {
  const {
    data: skills = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useSkillsQuery();

  if (isError) {
    return (
      <div className={styles.stateMessage}>
        <p className={styles.errorMessage}>Failed to load skills</p>
      </div>
    );
  }
  console.log(skills);

  if (skills.length === 0) {
    return <p className={styles.emptyText}>No skills found</p>;
  }

  return (
    <div className={styles.skillsInfinite}>
      <div className={styles.skillsListFilter}>
        <AnimatePresence mode="wait">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={styles.skillTabWrapper}
            >
              <Tab
                name={skill.name}
                isSelected={selectedIds?.includes(skill.id) ?? false}
                onClick={() => onToggle(skill.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasNextPage && (
        <BaseButtonWrapper
          onClick={() => fetchNextPage?.()}
          disabled={isFetchingNextPage}
          className={styles.showMoreSkillsButton}
        >
          {isFetchingNextPage ? "Loading..." : "show more"}
        </BaseButtonWrapper>
      )}
    </div>
  );
};
