import { categoryQuery } from "@entities/category";
import styles from "./CategoryDetailWidget.module.scss";
import { ReadMoreButton, ShowMoreItemsButton } from "@shared/ui/buttons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { SkillTab } from "@entities/skill";
import { motion } from "framer-motion";

export const CategoryDetailWidget = () => {
  const { id } = useParams({ from: "/_masterLayout/categories/$id/" });
  const { data: category } = useSuspenseQuery(categoryQuery.id(id));

  return (
    <div className={styles.categoryDetailBlock}>
      <img
        src={category.imageUrl}
        alt="Category image"
        className={styles.categoryDetailImage}
      />
      <div className={styles.categoryInformationSkills}>
        <div className={styles.categoryInformation}>
          <h1 className={styles.titleCategory}>{category.name}</h1>
          <div className={styles.descriptionProjectsBlock}>
            <ReadMoreButton
              collapsedHeight={90}
              className={styles.readMoreCategoryBlock}
              classNameButton={styles.readMoreCategoryButton}
            >
              <p>{category.description}</p>
            </ReadMoreButton>
            <div className={styles.projectsBlock}>
              <div className={styles.projectInfo}>
                <h1>{category.projectsTotal}</h1>
                <h2>All projects</h2>
              </div>
              <div className={styles.lineDividerProject} />
              <div className={styles.projectInfo}>
                <h1>{category.projectsActive}</h1>
                <h2>Active projects</h2>
              </div>
              <div className={styles.lineDividerProject} />
              <div className={styles.projectInfo}>
                <h1>{category.projectsCompleted}</h1>
                <h2>Completed projects</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.categorySkills}>
          <h1 className={styles.coreSkillsText}>Core skills</h1>
          <ShowMoreItemsButton
            items={category.skills.map((skill) => (
              <motion.div
                key={skill.id}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ ease: "easeInOut", duration: 0.15 }}
              >
                <SkillTab name={skill.name} />
              </motion.div>
            ))}
            initialVisibleCount={6}
            buttonText="See more"
          />
        </div>
      </div>
    </div>
  );
};
