import styles from "./MainProfilePage.module.scss";
import { useUserProfileStore, type ProfileMode } from "@entities/user";
import { SocialPlatforms, Toggle } from "@shared/ui";
export { ProfileMainWidget } from "@widgets/profile";
import { profileMainTabs } from "./configs/profileMainTabs";
import { MainProfileWrapper } from "@shared/ui/wrappers";
import { profileMainForms } from "./configs/profileMainForms";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { profileRoutes } from "@shared/routes";
import { Settings } from "@shared/assets/icons/actions";
import { UserHeaderWidget } from "@widgets/profile";
import { useProfile } from "@entities/user/profile";

export function MainProfilePage() {
  const { profileMode, setProfileMode } = useUserProfileStore();
  const { data: user, isLoading, error } = useProfile();

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
        {/*replace with widget later */}
        <div className={styles.organizationBlock}>
          <div className={styles.organizationBlockHeader}>
            <h1>Organizations</h1>
          </div>
          <div className={styles.organizationBlockContent}></div>
        </div>
        <SocialPlatforms links={user?.profile?.socialLinks} />
      </div>
      <div className={styles.mainWrapperUserInfo}>
        <div className={styles.actionsChangeBlock}>
          <Toggle<ProfileMode>
            tabs={profileMainTabs}
            activeValue={profileMode}
            onChange={setProfileMode}
            buttonClassName={styles.toggleProfileMainButton}
            activeButtonClassName={styles.toggleProfileMainButtonActive}
            className={styles.toggleProfileMain}
          />
          <LinkButtonWrapper
            to={profileRoutes.settings.root}
            className={styles.linkSettingsButton}
          >
            <img src={Settings} alt="settings" />
          </LinkButtonWrapper>
        </div>
        <div className={styles.userActionsBlock}>
          <MainProfileWrapper>
            {profileMainForms[profileMode]({ user })}
          </MainProfileWrapper>
        </div>
      </div>
    </div>
  );
}
