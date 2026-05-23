import styles from "./CategoryDetailHeader.module.scss";
import { CategoryLogo } from "@shared/assets/images/information";
import { Tab, Toggle } from "@shared/ui";
import type { Category } from "@entities/category";
import { ReadMoreButton, ShowMoreItemsButton } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import type { ListActivitiesMode } from "@shared/config/types";
import { listActivitiesTabs } from "@shared/config/constants";

interface CategoryDetailHeaderProps {
  activeTab: ListActivitiesMode;
  onTabChange: (tab: ListActivitiesMode) => void;
  category: Category;
}

export const CategoryDetailHeader = ({
  activeTab,
  onTabChange,
  category,
}: CategoryDetailHeaderProps) => {
  return (
    <div className={styles.categoryHeader}>
      <div className={styles.categoryInformation}>
        <div className={styles.textCategoryInformation}>
          <div className={styles.textCategory}>
            <h1>{category.name}</h1>
            <h2>{category.activitiesTotal} activities</h2>
          </div>
          <div className={styles.categoryDescription}>
            <ReadMoreButton
              collapsedHeight={90}
              className={styles.readMoreCategoryBlock}
              classNameButton={styles.readMoreCategoryButton}
              gradientColor="244, 244, 244"
            >
              <p>{category.description}</p>
            </ReadMoreButton>
          </div>
          <div className={styles.projectsBlock}>
            <div className={styles.projectInfo}>
              <h1>{category.activitiesTotal}</h1>
              <h2>All activities</h2>
            </div>
            <div className={styles.lineDividerProject} />
            <div className={styles.projectInfo}>
              <h1>{category.activitiesActive}</h1>
              <h2>Active activities</h2>
            </div>
            <div className={styles.lineDividerProject} />
            <div className={styles.projectInfo}>
              <h1>{category.activitiesCompleted}</h1>
              <h2>Completed activities</h2>
            </div>
          </div>
          <div className={styles.categorySkills}>
            <h1 className={styles.coreSkillsText}>Core skills</h1>
            {!category.skills?.length ? (
              <h1 className={styles.noSkills}>No skills yet</h1>
            ) : (
              <ShowMoreItemsButton
                items={category.skills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ ease: "easeInOut", duration: 0.15 }}
                  >
                    <Tab className={styles.skillTab} name={skill.name} />
                  </motion.div>
                ))}
                initialVisibleCount={6}
                buttonContent="See more"
                classNameItems={styles.skillItems}
                classNameButton={styles.skillReadMore}
              />
            )}
          </div>
        </div>
        <div className={styles.listActivitiesToggle}>
          <Toggle
            tabs={listActivitiesTabs}
            activeValue={activeTab}
            onChange={onTabChange}
            buttonClassName={styles.toggleListActivitiesButton}
            activeButtonClassName={styles.toggleListActivitiesButtonActive}
            className={styles.toggleListActivities}
            pillClassName={styles.toggleListActivitiesPill}
          />
        </div>
      </div>
      <div className={styles.imageCategory}>
        <img src={CategoryLogo} alt="projects" />
      </div>
    </div>
  );
};
