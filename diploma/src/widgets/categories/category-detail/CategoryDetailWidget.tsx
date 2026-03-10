import { categoryQuery } from "@entities/category";
import styles from "./CategoryDetailWidget.module.scss";
import { ReadMoreButton, ShowMoreItemsButton } from "@shared/ui/buttons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { SkillTab } from "@entities/skill";
import type { Skill } from "@entities/skill/model";

export const CategoryDetailWidget = () => {
  const { id } = useParams({ from: "/_masterLayout/categories/$id/" });
  const { data: category } = useSuspenseQuery(categoryQuery.id(id));
  const fakeSkills: Pick<Skill, "id" | "name">[] = [
    { id: "1", name: "React" },
    { id: "2", name: "TypeScript" },
    { id: "3", name: "Node.js" },
    { id: "4", name: "GraphQL" },
    { id: "5", name: "PostgreSQL" },
    { id: "6", name: "Docker" },
    { id: "7", name: "Kubernetes" },
    { id: "8", name: "Python" },
    { id: "9", name: "Figma" },
    { id: "10", name: "AWS" },
    { id: "11", name: "AWS" },
    { id: "12", name: "AWS" },
  ];
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
            items={fakeSkills.map((skill) => (
              <SkillTab key={skill.id} name={skill.name} />
            ))}
            initialVisibleCount={6}
            buttonText="See more"
          />
        </div>
      </div>
    </div>
  );
};
