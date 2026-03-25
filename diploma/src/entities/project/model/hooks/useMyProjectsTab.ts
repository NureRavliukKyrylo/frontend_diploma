import { useNavigate } from "@tanstack/react-router";
import { type MyProjectsMode, type ProjectMode } from "../types";
import { myProjectSearchDefaults } from "../../libs";

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

export const useProjectTabs = (currentTab: ProjectMode, projectId: string) => {
  const navigate = useNavigate({ from: "/projects/$id/" });

  const handleTabChange = (tab: ProjectMode) => {
    navigate({ params: { id: projectId }, search: { tab } });
  };

  return {
    activeTab: currentTab,
    handleTabChange,
  };
};
