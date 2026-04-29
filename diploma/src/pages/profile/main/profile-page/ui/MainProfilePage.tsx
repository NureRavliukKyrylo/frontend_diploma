import styles from "./MainProfilePage.module.scss";
import {
  getFullName,
  profileSearchDefaults,
  type ProfileMode,
} from "@entities/user";
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
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { OrganizationsListWidget } from "@widgets/organizations";
import { OrganizationItem } from "@entities/organization";
import { DefaultAvatar } from "@shared/assets/images/user";

export function MainProfilePage() {
  const { tab, ...search } = useSearch({ from: "/_masterLayout/profile/" });
  const navigate = useNavigate({ from: "/profile/" });
  console.log(search);
  const handleTabChange = (tab: ProfileMode) => {
    navigate({ search: profileSearchDefaults[tab] });
  };

  const { data: user } = useSuspenseQuery(profileQuery.all());

  return (
    <div className={styles.mainProfileBlock}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0 }}
        className={styles.sideBarProfileBlock}
      >
        <UserHeaderWidget
          image={user?.profile?.avatarUrl}
          name={getFullName(user.firstName, user.lastName)}
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
      </motion.div>

      <div className={styles.mainWrapperUserInfo}>
        <motion.div
          className={styles.actionsChangeBlock}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Toggle<ProfileMode>
            tabs={profileMainTabs}
            activeValue={tab}
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
        </motion.div>
        <div className={styles.userActionsBlock}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                x: -20,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
            >
              <MainProfileWrapper>
                {profileMainForms[tab]({ user, search })}
              </MainProfileWrapper>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
