import styles from "./MainProfilePage.module.scss";
import { useProfileTabs, type ProfileMode } from "@entities/user";
import { SocialPlatforms, Toggle } from "@shared/ui";
export { ProfileMainWidget } from "@widgets/profile";
import { profileMainTabs } from "../config/profileMainTabs";
import { MainProfileWrapper } from "@shared/ui/wrappers";
import { profileMainForms } from "../config/profileMainForms";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { profileRoutes } from "@shared/routes";
import { Settings } from "@shared/assets/icons/actions";
import { UserHeaderWidget } from "@widgets/profile";
import { profileQuery } from "@entities/user/profile";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSearch } from "@tanstack/react-router";
import { OrganizationsListWidget } from "@widgets/organizations";
import { OrganizationItem } from "@entities/organization";
import { DefaultAvatar } from "@shared/assets/images/user";

export function MainProfilePage() {
  const search = useSearch({ from: "/_masterLayout/profile/" });

  const { activeTab, handleTabChange } = useProfileTabs<ProfileMode>({
    search,
    navigateParams: "/profile/",
  });

  const { data: user } = useQuery(profileQuery.all());
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  return (
    <div className={styles.mainProfileBlock}>
      <div className={styles.sideBarProfileBlock}>
        <UserHeaderWidget
          image={user?.profile?.avatarUrl}
          name={fullName}
          email={user?.email}
          phone={user?.profile?.phone}
        />
        <div className={styles.organizationBlock}>
          <div className={styles.organizationBlockHeader}>
            <h1>Organizations</h1>
          </div>
          <div className={styles.organizationBlockContent}>
            {user?.profile?.organizations?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No organizations joined</h2>
              </div>
            ) : (
              <OrganizationsListWidget
                className={styles.organizationsList}
                organizations={user?.profile?.organizations?.slice(0, 4)}
                renderCard={(organization) => (
                  <OrganizationItem
                    iconUrl={organization.logoUrl ?? DefaultAvatar}
                    name={organization.name}
                  />
                )}
              />
            )}
          </div>
        </div>
        <div className={styles.socialPlatformsWrapper}>
          <SocialPlatforms
            links={user?.profile?.socialLinks}
            privacySettings={user?.privacySettings}
          />
        </div>
      </div>
      <div className={styles.mainWrapperUserInfo}>
        <div className={styles.actionsChangeBlock}>
          <Toggle<ProfileMode>
            tabs={profileMainTabs}
            activeValue={activeTab}
            onChange={handleTabChange}
            buttonClassName={styles.toggleProfileMainButton}
            activeButtonClassName={styles.toggleProfileMainButtonActive}
            className={styles.toggleProfileMain}
            pillClassName={styles.toggleProfilePill}
          />
          <LinkButtonWrapper
            to={profileRoutes.settings}
            className={styles.linkSettingsButton}
          >
            <motion.img
              layout
              src={Settings}
              alt="settings"
              whileHover={{ rotate: 90, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
          </LinkButtonWrapper>
        </div>
        <div className={styles.userActionsBlock}>
          <MainProfileWrapper>
            {profileMainForms[activeTab]({ user })}
          </MainProfileWrapper>
        </div>
      </div>
    </div>
  );
}
