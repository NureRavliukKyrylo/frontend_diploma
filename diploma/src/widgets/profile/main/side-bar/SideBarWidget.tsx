import { ProfileAvatar } from "@entities/user";
import styles from "./SideBarWidget.module.scss";
import { InstagramIcon } from "@shared/assets/icons/brands";
import { SocialPlatform } from "@shared/config/types";
import { SocialPlatforms } from "@shared/ui";

export function SideBarWidget() {
  const links = [
    {
      platform: SocialPlatform.Instagram,
      url: "https://instagram.com/my-profile",
    },
    {
      platform: SocialPlatform.Telegram,
      url: "https://t.me/my-profile",
    },
    {
      platform: SocialPlatform.WhatsApp,
      url: "https://wa.me/1234567890",
    },
  ];
  return (
    <div className={styles.sideBarProfileBlock}>
      <div className={styles.avatarBlockInfoSideBar}>
        <div className={styles.avatarBlock}>
          <ProfileAvatar avatar={InstagramIcon} level={13} />
        </div>
        <h1>Shestakov Mykola</h1>
      </div>
      <div className={styles.userInfoSideBar}>
        <div className={styles.wrapperInfoProfileUser}>
          <h1>example@gmail.com</h1>
        </div>
        <div className={styles.wrapperInfoProfileUser}>
          <h1>+380 (095) 123 45 67</h1>
        </div>
        <div className={styles.organizationBlock}>
          <div className={styles.organizationBlockHeader}>
            <h1>Organizations</h1>
          </div>
          <div className={styles.organizationBlockContent}></div>
        </div>
        <SocialPlatforms links={links} />
      </div>
    </div>
  );
}
