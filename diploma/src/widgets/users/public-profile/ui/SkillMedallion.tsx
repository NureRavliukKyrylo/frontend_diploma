import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./PublicProfileSkills.module.scss";

interface SkillMedallionProps {
  iconUrl: string | null;
  name: string;
}

export const SkillMedallion = ({ iconUrl, name }: SkillMedallionProps) => {
  const { t } = useTranslation("common");
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [iconUrl]);

  const showImage = Boolean(iconUrl) && !hasImageError;

  return (
    <div className={styles.medallion}>
      {showImage ? (
        <img
          src={iconUrl ?? undefined}
          alt=""
          onError={() => setHasImageError(true)}
        />
      ) : (
        <Wrench
          size={26}
          aria-label={t("publicProfile.skills.iconLabel", { name })}
        />
      )}
    </div>
  );
};
