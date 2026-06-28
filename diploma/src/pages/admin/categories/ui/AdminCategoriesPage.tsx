import { AdminDirectoryPagination } from "@widgets/admin/shared/ui/AdminDirectoryPagination";
import { CategoriesGrid } from "@widgets/admin/categories/categories-grid/ui/CategoriesGrid";
import { CategoriesHeaderActions } from "@widgets/admin/categories/categories-page/ui/CategoriesHeaderActions";
import { CategoriesToolbar } from "@widgets/admin/categories/categories-page/ui/CategoriesToolbar";
import { CategoryDeleteConfirmationModal } from "@widgets/admin/categories/categories-page/ui/CategoryDeleteConfirmationModal";
import { CategoryDrawer } from "@widgets/admin/categories/category-drawer/ui/CategoryDrawer";
import { CategoryFormModal } from "@widgets/admin/categories/category-create-edit-modal/ui/CategoryFormModal";
import { useAdminCategoriesPage } from "@widgets/admin/categories/categories-page/model/useAdminCategoriesPage";
import styles from "../../skills/ui/AdminSkillsPage.module.scss";

export const AdminCategoriesPage = () => {
  const page = useAdminCategoriesPage();

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <div className={styles.pageEyebrow}>Admin</div>
          <h1 className={styles.pageTitle}>Categories</h1>
        </div>
        <CategoriesHeaderActions
          styles={styles}
          onCreate={() =>
            page.setFormState({ mode: "create", category: null })
          }
        />
      </div>

      <CategoriesToolbar
        styles={styles}
        searchInput={page.searchInput}
        sortValue={page.search.OrderBy}
        onSearchInputChange={page.setSearchInput}
        onSortChange={(value) => page.updateSearch({ OrderBy: value, Page: 1 })}
      />

      <div className={styles.sectionHeader}>
        <span>Category directory</span>
        <span className={styles.sectionLine} aria-hidden="true" />
        <strong className={styles.matchCount}>
          {page.pagination.totalCount} matches
        </strong>
      </div>

      <CategoriesGrid
        categories={page.categories}
        isLoading={page.categoriesQuery.isLoading}
        isError={page.categoriesQuery.isError}
        onCreate={() => page.setFormState({ mode: "create", category: null })}
        onOpenCategory={page.setSelectedCategory}
      />

      <AdminDirectoryPagination
        styles={styles}
        currentPage={page.pagination.currentPage}
        totalPages={page.pagination.totalPages}
        pageWindow={page.pagination.pageWindow}
        onPageChange={(pageNumber) => page.updateSearch({ Page: pageNumber })}
      />

      <CategoryDrawer
        category={page.selectedCategory}
        onClose={() => page.setSelectedCategory(null)}
        onEdit={(category) => page.setFormState({ mode: "edit", category })}
        onChangeImage={(category) =>
          page.setFormState({ mode: "edit", category })
        }
        onDelete={page.setDeleteTarget}
      />

      <CategoryFormModal
        isOpen={Boolean(page.formState)}
        mode={page.formState?.mode ?? "create"}
        category={page.formState?.category}
        onClose={() => page.setFormState(null)}
      />

      <CategoryDeleteConfirmationModal
        target={page.deleteTarget}
        mutation={page.deleteMutation}
        onClose={() => page.setDeleteTarget(null)}
      />
    </section>
  );
};
