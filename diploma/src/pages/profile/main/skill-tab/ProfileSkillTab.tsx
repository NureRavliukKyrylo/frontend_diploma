import {
  SkillControlCard,
  SkillControlCardSkeleton,
  useMySkillsListQuery,
} from "@entities/skill";
import { useSearch } from "@tanstack/react-router";
import { ProfileSkillsWidget, SkillsListWidget } from "@widgets/skills";
import styles from "../MainProfilePage.module.scss";
import { AssignSkillCard } from "@features/skills";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

export const ProfileSkillsTab = () => {
  const search = useSearch({ from: "/_masterLayout/profile/" });
  const menuItems = [
    {
      key: "update",
      label: "Update Skill Level",
      onClick: () => console.log(),
      variant: "update" as const,
    },
    {
      key: "remove",
      label: "Remove Skill",
      onClick: () => console.log(),
      variant: "delete" as const,
    },
  ];
  return (
    <ProfileSkillsWidget
      search={search}
      skills={
        <Suspense
          fallback={
            <ListWidgetSkeleton
              renderSkeleton={SkillControlCardSkeleton}
              className={styles.skillsProfileTabList}
              items={9}
            />
          }
        >
          <SkillsListWidget
            startSlot={<AssignSkillCard />}
            renderCard={(skill) => (
              <SkillControlCard skill={skill} menuItems={menuItems} />
            )}
            className={styles.skillsProfileTabList}
            useSkillsQuery={useMySkillsListQuery(search)}
          />
        </Suspense>
      }
    />
  );
};
