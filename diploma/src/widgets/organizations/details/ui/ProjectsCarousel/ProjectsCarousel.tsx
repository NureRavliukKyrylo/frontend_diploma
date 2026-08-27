import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projectQuery } from "@entities/project";
import { ProjectCarouselCard } from "./ui/ProjectCarouselCard";
import styles from "./ProjectsCarousel.module.scss";

interface ProjectsCarouselProps {
  organizationId: string;
}

const PROJECTS_PER_PAGE = 3;
const PROJECTS_PAGE_SIZE = 6;

export const ProjectsCarousel = ({ organizationId }: ProjectsCarouselProps) => {
  const { t } = useTranslation("organizations");
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const projectListParams = useMemo<Parameters<typeof projectQuery.list>[0]>(
    () => ({
      OrganizationIds: [organizationId],
      Page: 1,
      PageSize: PROJECTS_PAGE_SIZE,
      OnlyActive: false,
      ShowJoined: false,
      OrderBy: "Default",
    }),
    [organizationId],
  );

  const { data, isLoading, isError } = useQuery(
    projectQuery.list(projectListParams),
  );

  const projects = data?.data ?? [];
  const visibleProjects = projects.slice(
    page * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE,
  );
  const canPrev = page > 0;
  const canNext = (page + 1) * PROJECTS_PER_PAGE < projects.length;

  const openProject = (projectId: string) => {
    navigate({ to: "/projects/$id", params: { id: projectId } });
  };

  const openProjectsList = () => {
    navigate({
      to: "/activities",
      search: {
        tab: "projects",
        OrganizationIds: [organizationId],
      },
    });
  };

  return (
    <section className={styles.outerCard}>
      <div className={styles.titleRow}>
        <div className={styles.titleLineBefore} aria-hidden="true" />
        <h2 className={styles.title}>{t("carousel.title")}</h2>
        <div className={styles.titleLineAfter} aria-hidden="true" />
      </div>

      <div className={styles.carouselArea}>
        <div className={styles.gridShell}>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnLeft}`}
            onClick={() =>
              setPage((currentPage) => Math.max(currentPage - 1, 0))
            }
            disabled={!canPrev}
            aria-label={t("carousel.previous")}
          >
            <ChevronLeft size={28} color="#8C0000" strokeWidth={3} />
          </button>

          {isLoading ? (
            <div className={styles.cardsGrid}>
              {Array.from({ length: PROJECTS_PER_PAGE }).map((_, index) => (
                <article key={index} className={styles.skeletonCard} />
              ))}
            </div>
          ) : isError ? (
            <div className={styles.stateMessage}>{t("carousel.error")}</div>
          ) : projects.length === 0 ? (
            <div className={styles.stateMessage}>
              {t("carousel.empty")}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                className={styles.cardsGrid}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {visibleProjects.map((project) => {
                  return (
                    <ProjectCarouselCard
                      key={project.id}
                      project={project}
                      onOpen={openProject}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnRight}`}
            onClick={() => setPage((currentPage) => currentPage + 1)}
            disabled={!canNext}
            aria-label={t("carousel.next")}
          >
            <ChevronRight size={28} color="#8C0000" strokeWidth={3} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.seeMoreBtn}
        onClick={openProjectsList}
      >
        {t("carousel.seeMore")}
      </button>
    </section>
  );
};
