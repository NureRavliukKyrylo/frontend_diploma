import { STEP_HEADERS } from "../config/createTaskDrawerConfig";
import styles from "../CreateTaskDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface CreateTaskHeadingProps {
  activeStep: number;
}

export const CreateTaskHeading = ({ activeStep }: CreateTaskHeadingProps) => {
  const { t } = useTranslation("task");
  const stepHeader = STEP_HEADERS[activeStep];

  return (
    <div className={styles.headingBlock}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        <span className={styles.eyebrowText}>{t(stepHeader.eyebrow)}</span>
      </div>
      <h2 className={styles.h1}>{t(stepHeader.title)}</h2>
      <p className={styles.h1sub}>{t(stepHeader.subtitle)}</p>
    </div>
  );
};
