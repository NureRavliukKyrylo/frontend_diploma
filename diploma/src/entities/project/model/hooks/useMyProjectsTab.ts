import { useNavigate } from "@tanstack/react-router";
import { type MyProjectsMode } from "../types/MyProjectsMode";
import { myProjectSearchDefaults } from "@entities/project/libs";

export const useMyProjectsTabs = (currentTab: MyProjectsMode) => {
  const navigate = useNavigate({ from: "/projects/my/" });

  const handleTabChange = (tab: MyProjectsMode) => {
    navigate({ search: myProjectSearchDefaults[tab] });
  };

  return {
    activeTab: currentTab,
    handleTabChange,
  };
};
