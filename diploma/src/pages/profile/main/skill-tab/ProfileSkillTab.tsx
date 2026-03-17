import {
  SkillControlCard,
  SkillControlCardSkeleton,
  useMySkillsListQuery,
  type SkillProfile,
} from "@entities/skill";
import { useSearch } from "@tanstack/react-router";
import { ProfileSkillsWidget, SkillsListWidget } from "@widgets/skills";
import styles from "../MainProfilePage.module.scss";
import { AssignSkillCard, RemoveSkillModal } from "@features/skills";
import { Suspense, useState } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

export const ProfileSkillsTab = () => {
  const search = useSearch({ from: "/_masterLayout/profile/" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillProfile | null>(null);

  const handleRemoveSkill = (skill: SkillProfile) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const getMenuItems = (skill: SkillProfile) => [
    {
      key: "update",
      label: "Update Skill Level",
      onClick: () => console.log(),
      variant: "update" as const,
    },
    {
      key: "remove",
      label: "Remove Skill",
      onClick: () => handleRemoveSkill(skill),
      variant: "delete" as const,
    },
  ];

  return (
    <>
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
            <SkillsListWidget<SkillProfile>
              startSlot={<AssignSkillCard />}
              renderCard={(skill) => (
                <SkillControlCard
                  skill={skill}
                  menuItems={getMenuItems(skill)}
                />
              )}
              className={styles.skillsProfileTabList}
              useSkillsQuery={useMySkillsListQuery(search)}
            />
          </Suspense>
        }
      />
      {selectedSkill && (
        <RemoveSkillModal
          isOpen={isModalOpen}
          skillId={selectedSkill.skillId}
          skillName={selectedSkill.name}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
