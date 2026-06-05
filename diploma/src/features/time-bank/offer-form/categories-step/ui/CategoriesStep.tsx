import { Tab } from "@shared/ui";
import { useCategoriesInfiniteQuery } from "@entities/category";
import { useCategoriesForm } from "../model/useCategoriesForm";
import styles from "./CategoriesStep.module.scss";
import type { OfferFormData } from "@entities/offer";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { forwardRef, useImperativeHandle } from "react";
import type { StepRef } from "../../main";
import { AnimatePresence, motion } from "framer-motion";

interface CategoriesStepProps {
  data: OfferFormData;
}

export const CategoriesStep = forwardRef<StepRef, CategoriesStepProps>(
  ({ data }, ref) => {
    const { formik, toggleCategory } = useCategoriesForm({ data });

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
          await formik.submitForm();
          return true;
        }
        formik.setTouched(
          Object.keys(formik.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {},
          ),
        );
        return false;
      },
    }));

    const categoriesQuery = useCategoriesInfiniteQuery({ PageSize: 12 })();

    if (categoriesQuery.isError) {
      return (
        <div className={styles.stateMessage}>
          <p className={styles.errorMessage}>Failed to load categories</p>
        </div>
      );
    }

    if (categoriesQuery.data?.length === 0) {
      return <p className={styles.emptyText}>No categories found</p>;
    }

    return (
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.tagsWrapper}>
            <AnimatePresence mode="wait">
              {categoriesQuery.data?.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Tab
                    name={category.name}
                    isSelected={formik.values.categoryIds.includes(category.id)}
                    className={styles.categoryTab}
                    onClick={() => toggleCategory(category.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {categoriesQuery.hasNextPage && (
            <BaseButtonWrapper
              onClick={() => categoriesQuery.fetchNextPage?.()}
              disabled={categoriesQuery.isFetchingNextPage}
              className={styles.showMoreCategoriesButton}
              type="button"
            >
              {categoriesQuery.isFetchingNextPage ? "Loading..." : "show more"}
            </BaseButtonWrapper>
          )}
          {formik.touched.categoryIds && formik.errors.categoryIds && (
            <div className="errorInput">
              {formik.errors.categoryIds as string}
            </div>
          )}
        </div>
      </form>
    );
  },
);
