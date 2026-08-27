import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { Bookmark, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./HeaderActions.module.scss";

export const HeaderActions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <>
      <span className={styles.tooltip} data-tooltip={t("header.myOrganizations")}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={t("header.myOrganizations")}
          onClick={() => void navigate({ to: "/organizations/my" })}
        >
          <Building2 className={styles.icon} strokeWidth={2} />
        </button>
      </span>
      <span className={styles.tooltip} data-tooltip={t("header.bookmarks")}>
        <button
          type="button"
          className={clsx(
            styles.bookmarkButton,
            "lg:max-xl:!h-[42px] lg:max-xl:!w-[42px] lg:max-xl:!min-w-[42px] lg:max-xl:!gap-0 lg:max-xl:!px-0",
          )}
          aria-label={t("header.bookmarks")}
          onClick={() => void navigate({ to: "/activities/my" })}
        >
          <Bookmark className={styles.icon} strokeWidth={2} />
          <span className="lg:max-xl:!hidden">{t("header.bookmark")}</span>
        </button>
      </span>
    </>
  );
};
