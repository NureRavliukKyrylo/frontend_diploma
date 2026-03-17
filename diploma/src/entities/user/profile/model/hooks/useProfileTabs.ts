import { useNavigate } from "@tanstack/react-router";
import type { ProfileMode } from "../types/profileMode";
import type { ProfileSettingsMode } from "../types/profileSettingsMode";
import {
  profileSearchDefaults,
  profileSettingsSearchDefaults,
} from "../../libs/profileSearchSchema";

type AnyProfileTab = ProfileMode | ProfileSettingsMode;

interface ProfileTabsProps<TTab extends AnyProfileTab> {
  search: { tab: TTab };
  navigateParams: "/profile/" | "/profile/settings/";
}

const defaultsByRoute = {
  "/profile/": profileSearchDefaults,
  "/profile/settings/": profileSettingsSearchDefaults,
} as const;

export const useProfileTabs = <TTab extends AnyProfileTab>({
  search,
  navigateParams,
}: ProfileTabsProps<TTab>) => {
  const navigate = useNavigate({ from: navigateParams });

  const handleTabChange = (tab: TTab) => {
    navigate({
      search: {
        ...defaultsByRoute[navigateParams],
        tab: tab,
      },
    });
  };

  return {
    activeTab: search.tab,
    handleTabChange,
  };
};
