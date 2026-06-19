import { STEP_HEADERS } from "../config/createTaskDrawerConfig";
import styles from "../CreateTaskDrawer.module.scss";

interface CreateTaskHeadingProps {
  activeStep: number;
}

export const CreateTaskHeading = ({ activeStep }: CreateTaskHeadingProps) => {
  const stepHeader = STEP_HEADERS[activeStep];

  return (
    <div className={styles.headingBlock}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        <span className={styles.eyebrowText}>{stepHeader.eyebrow}</span>
      </div>
      <h2 className={styles.h1}>{stepHeader.title}</h2>
      <p className={styles.h1sub}>{stepHeader.subtitle}</p>
    </div>
  );
};
