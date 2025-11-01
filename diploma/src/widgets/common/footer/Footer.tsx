import { NavMenu, SocialLinks } from "@shared/ui";
import { socialLinks } from "./config/socialLinks";
import styles from "./Footer.module.scss";
import {
  productLinks,
  generalLinks,
  companyLinks,
  rightLinks,
} from "./config/navLinks";
import { Copyright } from "@shared/assets/common";

export function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.contentFooter}>
        <div className={styles.infoFooter}>
          <div className={styles.projectInfoBlock}>
            <h1>IMPACTFLOW</h1>
            <p>
              Your action today creates tomorrow’s world. Every step you take in
              your community builds a foundation for global change
            </p>
            <div className={styles.contactsBlockFooter}>
              <SocialLinks links={socialLinks} size={25} />
            </div>
          </div>
          <div className={styles.navMenuBlockFooter}>
            <div className={styles.navBlockFooter}>
              <h1>Product</h1>
              <div className={styles.navInfo}>
                <NavMenu links={productLinks} />
              </div>
            </div>
            <div className={styles.navBlockFooter}>
              <h1>General</h1>
              <div className={styles.navInfo}>
                <NavMenu links={generalLinks} />
              </div>
            </div>
            <div className={styles.navBlockFooter}>
              <h1>Company</h1>
              <div className={styles.navInfo}>
                <NavMenu links={companyLinks} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divideLineFooter}></div>
        <div className={styles.additionalInfoFooter}>
          <div className={styles.rightsCompany}>
            <img src={Copyright} alt="companyIssue" />
            <p>2025 ImpactFlow. All rights reserved </p>
          </div>
          <div className={styles.basicActionsFooter}>
            <NavMenu links={rightLinks} linkClassName={styles.rightLinkText} />
          </div>
        </div>
      </div>
    </div>
  );
}
