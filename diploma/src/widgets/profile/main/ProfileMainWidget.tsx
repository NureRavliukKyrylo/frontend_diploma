import { ProgressBar, Carousel } from "@shared/ui";
import styles from "./ProfileMainWidget.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";

export function ProfileMainWidget() {
  const demoItems = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <div className={styles.levelRateInfo}>
        <div className={styles.levelUserInfo}>
          <div className={styles.headerLevelBar}>
            <span className={styles.current}>Level 12</span>
            <span className={styles.xp}>25/100</span>
          </div>
          <ProgressBar currentXP={25} maxXP={100} />
          <div className={styles.footerLevelBar}>
            <span className={styles.label}>Next level</span>
            <span className={styles.next}>Level 2</span>
          </div>
        </div>
        <div className={styles.ratingUserInfo}>
          <h1>4.5</h1>
          <p>(120 votes)</p>
        </div>
      </div>
      <div className={styles.bioUser}>
        <p>
          I am an active and dedicated volunteer who truly enjoys helping others
          and making a positive difference in the community. Over the years, I
          have taken part in charity projects, social initiatives, and event
          organization, which allowed me to develop strong teamwork,
          communication, and problem-solving skills. I adapt quickly to new
          challenges, stay motivated in dynamic environments,
        </p>
      </div>
      <div className={styles.privateUserInfo}></div>
      <div className={styles.userActivityInfo}>
        <div className={styles.projectsBlock}>
          <div className={styles.projectsDetailInfoBlock}>
            <div className={styles.projectsUserProfile}>
              <div className={styles.textInfoProjectsUserProfile}>
                <h1>ACTIVE</h1>
                <h2>PROJECTS</h2>
              </div>
              <p>5</p>
            </div>
            <div className={styles.projectsUserProfile}>
              <div className={styles.textInfoProjectsUserProfile}>
                <h1>COMPLETED</h1>
                <h2>PROJECTS</h2>
              </div>
              <p>25</p>
            </div>
          </div>
          <div className={styles.projectsSeeMore}>
            <BaseButtonWrapper className={styles.seeMoreProjectsButton}>
              SEE MORE
            </BaseButtonWrapper>
          </div>
        </div>
        <div className={styles.skillsBlock}>
          <h1>SKILLS</h1>
          <div className={styles.buttonSkillsBlock}>
            <BaseButtonWrapper className={styles.seeMoreSkillsButton}>
              See more
            </BaseButtonWrapper>
          </div>
        </div>
      </div>
      <div className={styles.lineDividerBadges}>
        <div className={styles.lineBadges}>
          <div className={styles.textBadges}>
            <h1>BADGES</h1>
          </div>
        </div>
      </div>
      <Carousel
        items={demoItems}
        visibleCount={3}
        gap={20}
        renderItem={(item) => (
          <div
            style={{
              height: "200px",
              background: "#333",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "40px",
              borderRadius: "10px",
            }}
          >
            {item}
          </div>
        )}
      />
    </>
  );
}
