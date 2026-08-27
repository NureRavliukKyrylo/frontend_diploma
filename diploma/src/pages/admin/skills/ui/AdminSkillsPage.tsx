import { AdminDirectoryPagination } from "@widgets/admin/shared/ui/AdminDirectoryPagination";
import { ChangeSkillIconModal } from "@widgets/admin/skills/skill-icon-modal/ui/ChangeSkillIconModal";
import { SkillDeleteConfirmationModal } from "@widgets/admin/skills/skills-page/ui/SkillDeleteConfirmationModal";
import { SkillDrawer } from "@widgets/admin/skills/skill-drawer/ui/SkillDrawer";
import { SkillFormModal } from "@widgets/admin/skills/skill-create-edit-modal/ui/SkillFormModal";
import { SkillsGrid } from "@widgets/admin/skills/skills-grid/ui/SkillsGrid";
import { SkillsHeaderActions } from "@widgets/admin/skills/skills-page/ui/SkillsHeaderActions";
import { SkillsToolbar } from "@widgets/admin/skills/skills-page/ui/SkillsToolbar";
import { useAdminSkillsPage } from "@widgets/admin/skills/skills-page/model/useAdminSkillsPage";
import { useTranslation } from "react-i18next";
import styles from "./AdminSkillsPage.module.scss";

export const AdminSkillsPage = () => {
  const { t } = useTranslation("admin");
  const page = useAdminSkillsPage();

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <div className={styles.pageEyebrow}>{t("common.eyebrow")}</div>
          <h1 className={styles.pageTitle}>{t("skills.title")}</h1>
        </div>
        <SkillsHeaderActions
          styles={styles}
          onCreate={() => page.setFormState({ mode: "create", skill: null })}
        />
      </div>

      <SkillsToolbar
        styles={styles}
        searchInput={page.searchInput}
        categoryOptions={page.categoryOptions}
        categoryFilterValue={page.categoryFilterValue}
        sortValue={page.search.OrderBy}
        onSearchInputChange={page.setSearchInput}
        onCategoryChange={page.setCategoryFilter}
        onSortChange={(value) => page.updateSearch({ OrderBy: value, Page: 1 })}
      />

      <div className={styles.sectionHeader}>
        <span>{t("skills.directory")}</span>
        <span className={styles.sectionLine} aria-hidden="true" />
        <strong className={styles.matchCount}>
          {t("common.matches", { count: page.pagination.totalCount })}
        </strong>
      </div>

      <SkillsGrid
        skills={page.skills}
        isLoading={page.skillsQueryResult.isLoading}
        isError={page.skillsQueryResult.isError}
        onOpenSkill={page.setSelectedSkill}
        onEditSkill={(skill) => page.setFormState({ mode: "edit", skill })}
        onChangeSkillIcon={page.setIconSkill}
        onDeleteSkill={(skill) =>
          page.setDeleteTarget({ skill, closeDrawer: false })
        }
      />

      <AdminDirectoryPagination
        styles={styles}
        currentPage={page.pagination.currentPage}
        totalPages={page.pagination.totalPages}
        pageWindow={page.pagination.pageWindow}
        onPageChange={(pageNumber) => page.updateSearch({ Page: pageNumber })}
      />

      <SkillDrawer
        skill={page.selectedSkill}
        onClose={() => page.setSelectedSkill(null)}
        onEdit={(skill) => page.setFormState({ mode: "edit", skill })}
        onDelete={(skill, totalVolunteers) =>
          page.setDeleteTarget({ skill, totalVolunteers, closeDrawer: true })
        }
      />

      <SkillFormModal
        isOpen={Boolean(page.formState)}
        mode={page.formState?.mode ?? "create"}
        skill={page.formState?.skill}
        onClose={() => page.setFormState(null)}
      />

      <ChangeSkillIconModal
        skill={page.iconSkill}
        onClose={() => page.setIconSkill(null)}
      />

      <SkillDeleteConfirmationModal
        target={page.deleteTarget}
        mutation={page.deleteMutation}
        onClose={() => page.setDeleteTarget(null)}
      />
    </section>
  );
};
