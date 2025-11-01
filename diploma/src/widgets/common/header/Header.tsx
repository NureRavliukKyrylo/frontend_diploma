import { SearchBar } from "@shared/ui/inputs";
import styles from "./Header.module.scss";
import {
  ActiveProjectsButton,
  LanguageSwitcherButton,
  MessagesButton,
  NotificationButton,
  ProfieAvatar,
} from "@shared/ui/buttons";
import { NavMenu } from "@shared/ui";
import { headerLinks } from "./config/headerLinks";

export function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerMainContainer}>
        <div className={styles.headerLeftBlock}>
          <div className={styles.searchBarBlock}>
            <SearchBar />
          </div>
          <NotificationButton />
          <MessagesButton />
        </div>
        <div className={styles.headerCenterBlock}>
          <h1>IMPACTFLOW</h1>
        </div>
        <div className={styles.headerRightBlock}>
          <ActiveProjectsButton />
          <LanguageSwitcherButton />
          <ProfieAvatar />
        </div>
      </div>
      <div className={styles.headerSubContainer}>
        <div className={styles.headerMenuBlock}>
          <NavMenu links={headerLinks} linkClassName={styles.headerLinkText} />
        </div>
      </div>
    </div>
  );
}
