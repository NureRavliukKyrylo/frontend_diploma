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

export const ProfileSkillsTab = () => {
  const {
    search,
    data,
    modalType,
    selectedSkill,
    getMenuItems,
    handleCloseModal,
    getSkillLabel,
  } = useProfileSkillsTab();

  return (
    <>
      <ProfileSkillsWidget
        search={search}
        pagination={data?.pagination}
        skills={
          <Suspense
            fallback={
              <div className={styles.skillsProfileWrapperList}>
                <Skeleton className={styles.skeletonText}></Skeleton>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SkillsListWidget<SkillProfile>
                    startSlot={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          delay: 0.1,
                        }}
                      >
                        <AssignSkillCard />
                      </motion.div>
                    }
                    renderCard={(skill, index) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          delay: 0.1 + index * 0.08,
                        }}
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
