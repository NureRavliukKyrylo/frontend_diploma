import {
  SkillControlCard,
  SkillControlCardSkeleton,
  useMySkillsListQuery,
  type SkillProfile,
} from "@entities/skill";
import { ProfileSkillsWidget, SkillsListWidget } from "@widgets/skills";
import styles from "./ProfileSkillsTab.module.scss";
import {
  AssignSkillCard,
  RemoveSkillModal,
  UpdateSkillLevelModal,
} from "@features/skills";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { Skeleton } from "@heroui/react";
import { useProfileSkillsTab } from "../model/useProfileSkillsTab";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeVariants,
  fadeDuration,
  staggeredCardVariantsNoHover,
} from "@shared/assets/animations";
import type { SkillsProfileSearchParams } from "@entities/user";

interface ProfileSkillsTabProps {
  search: SkillsProfileSearchParams;
}

export const ProfileSkillsTab = ({ search }: ProfileSkillsTabProps) => {
  const {
    data,
    modalType,
    selectedSkill,
    getMenuItems,
    handleCloseModal,
    getSkillLabel,
  } = useProfileSkillsTab(search);

  console.log("skills", search);
  return (
    <>
      <ProfileSkillsWidget
        search={search}
        pagination={data?.pagination}
        skills={
          <Suspense
            fallback={
              <div className={styles.skillsProfileWrapperList}>
                <Skeleton className={styles.skeletonText} />
                <ListWidgetSkeleton
                  renderSkeleton={() => <SkillControlCardSkeleton showLevel />}
                  className={styles.skillsProfileList}
                  items={9}
                />
              </div>
            }
          >
            <div className={styles.skillsProfileWrapperList}>
              <h1 className={styles.totalSkills}>
                Skills ({data?.pagination.totalCount})
              </h1>
              <AnimatePresence mode="wait">
                <motion.div
                  key={JSON.stringify(search)}
                  {...fadeVariants}
                  transition={fadeDuration}
                >
                  <SkillsListWidget<SkillProfile>
                    startSlot={
                      <motion.div
                        custom={0}
                        variants={staggeredCardVariantsNoHover}
                        initial="hidden"
                        animate="visible"
                      >
                        <AssignSkillCard />
                      </motion.div>
                    }
                    renderCard={(skill, index) => (
                      <motion.div
                        key={skill.skillId}
                        custom={index + 1}
                        variants={staggeredCardVariantsNoHover}
                        initial="hidden"
                        animate="visible"
                      >
                        <SkillControlCard
                          skill={skill}
                          menuItems={getMenuItems(skill)}
                          className={styles.profileSkillControlBlock}
                          bottomSlot={() => (
                            <div className={styles.skillLevel}>
                              Level: {getSkillLabel(skill)}
                            </div>
                          )}
                        />
                      </motion.div>
                    )}
                    className={styles.skillsProfileList}
                    useSkillsQuery={useMySkillsListQuery(search)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Suspense>
        }
      />
      {selectedSkill && (
        <>
          <RemoveSkillModal
            isOpen={modalType === "remove"}
            skillId={selectedSkill.skillId}
            skillName={selectedSkill.name}
            onClose={handleCloseModal}
          />
          <UpdateSkillLevelModal
            isOpen={modalType === "update"}
            skill={selectedSkill}
            onClose={handleCloseModal}
          />
        </>
      )}
    </>
  );
};
