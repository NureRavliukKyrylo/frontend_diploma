import { useNavigate } from "@tanstack/react-router";
import type { ProfileMode } from "../types/profileMode";
import type { ProfileSettingsMode } from "../types/profileSettingsMode";

type AnyProfileTab = ProfileMode | ProfileSettingsMode;

interface ProfileTabsProps<TTab extends AnyProfileTab> {
  search: { tab: TTab };
  navigateParams: "/profile/" | "/profile/settings/";
}

export const useProfileTabs = <TTab extends AnyProfileTab>({
  search,
  navigateParams,
}: ProfileTabsProps<TTab>) => {
  const navigate = useNavigate({ from: navigateParams });

  const handleTabChange = (tab: TTab) => {
    navigate({
      search: (prev) => ({
        ...prev,
        tab: tab as typeof prev.tab,
      }),
    });
  };

  return {
    activeTab: search.tab,
    handleTabChange,
  };
};
