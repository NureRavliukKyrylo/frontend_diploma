import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { Bookmark, Building2 } from "lucide-react";
import styles from "./HeaderActions.module.scss";

export const HeaderActions = () => {
  const navigate = useNavigate();

  return (
    <>
      <span className={styles.tooltip} data-tooltip="My Organizations">
        <button
          type="button"
          className={styles.iconButton}
          aria-label="My Organizations"
          onClick={() => void navigate({ to: "/organizations/my" })}
        >
          <Building2 className={styles.icon} strokeWidth={2} />
        </button>
      </span>
      <span className={styles.tooltip} data-tooltip="Bookmarks">
        <button
          type="button"
          className={clsx(
            styles.bookmarkButton,
            "lg:max-xl:!h-[42px] lg:max-xl:!w-[42px] lg:max-xl:!min-w-[42px] lg:max-xl:!gap-0 lg:max-xl:!px-0",
          )}
          aria-label="Bookmarks"
          onClick={() => void navigate({ to: "/activities/my" })}
        >
          <Bookmark className={styles.icon} strokeWidth={2} />
          <span className="lg:max-xl:!hidden">Bookmark</span>
        </button>
      </span>
    </>
  );
};
