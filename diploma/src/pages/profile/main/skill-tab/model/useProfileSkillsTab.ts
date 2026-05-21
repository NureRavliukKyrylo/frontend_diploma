import { skillsQuery, type SkillProfile } from "@entities/skill";
import type { SkillsProfileSearchParams } from "@entities/user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type ModalType = "remove" | "update" | null;

export const useProfileSkillsTab = (search: SkillsProfileSearchParams) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillProfile | null>(null);
  const { data } = useQuery(skillsQuery.my(search));

  const handleOpenModal = (skill: SkillProfile, type: ModalType) => {
    setSelectedSkill(skill);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedSkill(null);
  };

  const getMenuItems = (skill: SkillProfile) => [
    {
      key: "update",
      label: "Update Skill Level",
      onClick: () => handleOpenModal(skill, "update"),
      variant: "update" as const,
    },
    {
      key: "remove",
      label: "Remove Skill",
      onClick: () => handleOpenModal(skill, "remove"),
      variant: "delete" as const,
    },
  ];

  return {
    search,
    data,
    modalType,
    selectedSkill,
    getMenuItems,
    handleCloseModal,
  };
};
