import type { SkillsSearchParams } from "@entities/skill/libs";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./SkillsFilterWidget.module.scss";
import { CategoriesListFilter } from "@features/project";
import { motion } from "framer-motion";
import { useCategoriesInfiniteQuery } from "@entities/category";
import { useSkillsFilters } from "../model/useSkillsFilter";
import { useTranslation } from "react-i18next";

interface SkillsFilterWidgetProps {
  search: SkillsSearchParams;
}

export const SkillsFilterWidget = ({ search }: SkillsFilterWidgetProps) => {
  const { onCategoryToggle, onClearFilters } = useSkillsFilters();
  const { t } = useTranslation("common");

  return (
    <>
      <div className={styles.categoriesFilterBlock}>
        <h1 className={styles.categoriesTitle}>{t("filters.categories")}</h1>
        <CategoriesListFilter
          selectedIds={search.CategoryIds}
          onToggle={onCategoryToggle}
          useCategoriesQuery={useCategoriesInfiniteQuery({ PageSize: 7 })}
        />
      </div>
      <div className={styles.dividerFilterBlock} />
      <div className={styles.buttonClear}>
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={styles.animationButtonBlock}
        >
          <BaseButtonWrapper
            onClick={onClearFilters}
            className={styles.clearFiltersButton}
          >
            {t("actions.clearFilters")}
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
