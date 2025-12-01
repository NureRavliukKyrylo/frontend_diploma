import type { Skill } from "@entities/skill/model";
import styles from "./CategoryDetailWidget.module.scss";
import { ReadMoreButton } from "@shared/ui/buttons";
import { SkillTabsWidget } from "@widgets/skills";

interface CategoryDetailWidget {
  imageCategory: string;
  titleCategory: string;
  descriptionCategory: string;
  allProjects: number;
  activeProjects: number;
  completedProjects: number;
  skills: Skill[];
}
export const CategoryDetailWidget = ({
  imageCategory,
  titleCategory,
  descriptionCategory,
  allProjects,
  activeProjects,
  completedProjects,
  skills,
}: CategoryDetailWidget) => {
  return (
    <div className={styles.categoryDetailBlock}>
      <img
        src={imageCategory}
        alt="Category image"
        className={styles.categoryDetailImage}
      />
      <div className={styles.categoryInformationSkills}>
        <div className={styles.categoryInformation}>
          <h1 className={styles.titleCategory}>{titleCategory}</h1>
          <div className={styles.descriptionProjectsBlock}>
            <ReadMoreButton
              collapsedHeight={90}
              className={styles.readMoreCategoryBlock}
              classNameButton={styles.readMoreCategoryButton}
            >
              <p>{descriptionCategory}</p>
            </ReadMoreButton>
            <div className={styles.projectsBlock}>
              <div className={styles.projectInfo}>
                <h1>{allProjects}</h1>
                <h2>All projects</h2>
              </div>
              <div className={styles.lineDividerProject} />
              <div className={styles.projectInfo}>
                <h1>{activeProjects}</h1>
                <h2>Active projects</h2>
              </div>
              <div className={styles.lineDividerProject} />
              <div className={styles.projectInfo}>
                <h1>{completedProjects}</h1>
                <h2>Completed projects</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.categorySkills}>
          <h1 className={styles.coreSkillsText}>Core skills</h1>
          <SkillTabsWidget skills={skills} />
        </div>
      </div>
    </div>
  );
};
