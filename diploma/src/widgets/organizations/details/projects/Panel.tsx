import { Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AnimatePresence, motion } from "framer-motion";
import { ToggleDropdownButton } from "@shared/ui/buttons/action-buttons/toggle/ToggleDropdownButton";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import {
  ProjectCard,
  ProjectCardSkeleton,
  projectQuery,
  projectSearchDefaults,
  getSortingProjectItems,
  useProjectsListQuery,
  type ProjectSortValues,
  type ProjectSearchParams,
} from "@entities/project";
import type { Organization } from "@entities/organization";
import { ProjectsListWidget } from "@widgets/projects/projects-list/ProjectsListWidget";
import { ProjectFilters } from "./ui/Filters";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import styles from "./Panel.module.scss";

interface OrganizationDetailsProjectsPanelProps {
  organization: Organization;
  canManageOrganization?: boolean;
  onCreateProject?: () => void;
}

export const OrganizationDetailsProjectsPanel = ({
  organization,
}: OrganizationDetailsProjectsPanelProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["common", "organizations"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortingProjectItems = useMemo(() => getSortingProjectItems(t), [t]);
  const [search, setSearch] = useState<ProjectSearchParams>({
    ...projectSearchDefaults,
    OrganizationIds: [organization.id],
    Page: 1,
    PageSize: 9,
  });
  const requestSearch = useMemo(() => {
    const { tab: _tab, ...searchWithoutTab } = search;

    return {
      ...searchWithoutTab,
      OrganizationIds: [organization.id],
    };
  }, [organization.id, search]);
  const { data: projectsResponse } = useQuery(projectQuery.list(requestSearch));

  return (
    <div className={styles.projectsPanel}>
      <div className={styles.filterProjectsWrapper}>
        <motion.section
          className={styles.projectsControlsRow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <ProjectFilters
              search={search}
              onChange={(patch) =>
                setSearch((prev) => ({
                  ...prev,
                  ...patch,
                  OrganizationIds: [organization.id],
                }))
              }
              onReset={() =>
                setSearch({
                  ...projectSearchDefaults,
                  OrganizationIds: [organization.id],
                  Page: 1,
                  PageSize: 9,
                })
              }
            />
          </ToggleDropdownButton>

          <SearchBar
            value={search.Search}
            onChange={(value) =>
              setSearch((prev) => ({
                ...prev,
                Search: value || undefined,
                Page: 1,
              }))
            }
            variant="projects"
          />

          <SortDropDown
            options={sortingProjectItems}
            onSelect={(value) =>
              setSearch((prev) => ({
                ...prev,
                OrderBy: value as ProjectSortValues,
                Page: 1,
              }))
            }
            value={search.OrderBy ?? "Default"}
          />
        </motion.section>

        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          )}
        >
          <motion.div
            layout
            initial={false}
            transition={{ layout: layoutTransition }}
            className={`${styles.projectsList} ${isFilterOpen ? styles.filterOpen : ""}`}
          >
            {projectsResponse?.data?.length === 0 ? (
              <section className={styles.projectsEmptyState}>
                <h2>{t("organizations:details.panels.noProjects")}</h2>
                <p>{t("organizations:details.panels.adjustFilters")}</p>
              </section>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    className={styles.projectsListSkeletonWrapper}
                    renderSkeleton={ProjectCardSkeleton}
                    items={9}
                  />
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JSON.stringify(requestSearch)}
                    {...fadeVariants}
                    transition={fadeDuration}
                  >
                    <ProjectsListWidget
                      renderCard={(project, index) => (
                        <motion.div
                          key={project.id}
                          custom={index + 1}
                          variants={staggeredCardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          className={styles.projectCardMotion}
                          onClick={() =>
                            navigate({
                              to: "/projects/$id",
                              params: { id: project.id },
                            })
                          }
                        >
                          <ProjectCard project={project} />
                        </motion.div>
                      )}
                      renderSkeleton={ProjectCardSkeleton}
                      skeletonItems={9}
                      useProjectsQuery={useProjectsListQuery(requestSearch)}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
        </ErrorBoundary>
      </div>

      {projectsResponse && projectsResponse.pagination.totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            total={projectsResponse.pagination.totalPages}
            page={search.Page}
            onChange={(page) =>
              setSearch((prev) => ({
                ...prev,
                Page: page,
                OrganizationIds: [organization.id],
              }))
            }
          />
        </div>
      )}
    </div>
  );
};
