import styles from "./MainProfilePage.module.scss";
import { useUserProfileStore, type ProfileMode } from "@entities/user";
import { Toggle } from "@shared/ui";
export { ProfileMainWidget } from "@widgets/profile";
import { profileMainTabs } from "./configs/profileMainTabs";
import { MainProfileWrapper } from "@shared/ui/wrappers";
import { profileMainForms } from "./configs/profileMainForms";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { profileRoutes } from "@shared/routes";
import { Settings } from "@shared/assets/icons/actions";
import { SideBarWidget } from "@widgets/profile";

export function MainProfilePage() {
  const { profileMode, setProfileMode } = useUserProfileStore();

  return (
    <div className={styles.mainProfileBlock}>
      <SideBarWidget />
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
            {profileMainForms[profileMode]}
          </MainProfileWrapper>
        </div>
      </div>
    </div>
  );
}
