import { Switch } from "@shared/ui";
import styles from "./MoreOptionsFilter.module.scss";
import type { ProjectSearchParams } from "@entities/project";
import type { NavigateParams } from "../../model/NavigateParams";
import { useNavigate } from "@tanstack/react-router";

interface MoreOptionsFilterProps {
  search: ProjectSearchParams;
  from: NavigateParams;
}

export const MoreOptionsFilter = ({ search, from }: MoreOptionsFilterProps) => {
  const navigate = useNavigate({ from });

  return (
    <div className={styles.wrapperMoreOptionsFilter}>
      <div className={styles.completedProject}>
        <h1 className={styles.titleFilterMoreOptions}>
          Show completed projects
        </h1>
        <Switch
          isSelected={search.ShowCompleted}
          onValueChange={(isSelected) => {
            navigate({
              search: (prev) => ({
                ...prev,
                ShowCompleted: isSelected,
                Page: 1,
              }),
              resetScroll: false,
            });
          }}
          classNames={{
            base: "scale-80 sm:scale-90 lg:scale-95",
            wrapper:
              "bg-[rgba(44,44,44,0.3)] group-data-[selected=true]:bg-[#8C0000]",
            thumb: "w-[20px] h-[20px]",
          }}
        />
      </div>
      <div className={styles.joinedProject}>
        <h1 className={styles.titleFilterMoreOptions}>
          Display joined projects
        </h1>
        <Switch
          isSelected={search.ShowJoined}
          onValueChange={(isSelected) => {
            navigate({
              search: (prev) => ({ ...prev, ShowJoined: isSelected, Page: 1 }),
              resetScroll: false,
            });
          }}
          classNames={{
            base: "scale-80 sm:scale-90 lg:scale-95",
            wrapper:
              "bg-[rgba(44,44,44,0.3)] group-data-[selected=true]:bg-[#8C0000]",
            thumb: "w-[20px] h-[20px]",
          }}
        />
      </div>
    </div>
  );
};
