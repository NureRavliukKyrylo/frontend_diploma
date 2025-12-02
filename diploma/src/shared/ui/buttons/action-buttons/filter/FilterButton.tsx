import { BaseButtonWrapper } from "../../base-buttons/base-wrapper/BaseButtonWrapper";
import styles from "./FilterButton.module.scss";
import { DownArrow } from "@shared/assets/icons/actions";

export const FilterButton = () => {
  return (
    <BaseButtonWrapper className={styles.filterButton}>
      <h1>Filter</h1>
      <img
        src={DownArrow}
        alt="down arrow"
        className={styles.downArrowFilter}
      />
    </BaseButtonWrapper>
  );
};
