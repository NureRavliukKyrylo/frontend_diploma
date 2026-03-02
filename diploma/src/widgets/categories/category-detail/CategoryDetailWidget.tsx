import { categoryQuery } from "@entities/category";
import styles from "./CategoryDetailWidget.module.scss";
import { ReadMoreButton } from "@shared/ui/buttons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SkillTabsWidget } from "@widgets/skills";
import { useParams } from "@tanstack/react-router";

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
                <h1>{451}</h1>
                <h2>All projects</h2>
              </div>
              <div className={styles.lineDividerProject} />
              <div className={styles.projectInfo}>
                <h1>{2}</h1>
                <h2>Active projects</h2>
              </div>
              <div className={styles.lineDividerProject} />
              <div className={styles.projectInfo}>
                <h1>{3}</h1>
                <h2>Completed projects</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.categorySkills}>
          <h1 className={styles.coreSkillsText}>Core skills</h1>
          <SkillTabsWidget skills={[]} />
        </div>
      </div>
    </div>
  );
};
