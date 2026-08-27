import { Pagination } from "@shared/ui";
import { Suspense } from "react";
import { motion } from "framer-motion";
import {
  ListProjectCard,
  ListProjectCardSkeleton,
  projectQuery,
  useProjectsMapQuery,
  type MapProjectRequestParams,
} from "@entities/project";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import styles from "./MapListPanel.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { ProjectsListWidget } from "@widgets/projects";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { useTranslation } from "react-i18next";

interface MapListPanelProps {
  listParams: MapProjectRequestParams;
  page?: number;
  onSelectProject: (id: string, lat: number, lng: number) => void;
}

export const MapListPanel = ({
  listParams,
  page,
  onSelectProject,
}: MapListPanelProps) => {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate({ from: "/map/" });
  const { data: projects } = useQuery(projectQuery.map(listParams));

  return (
    <ToggleDropdownButton variant="list">
      {projects?.data?.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>{t("common:mapEmptyState.title")}</h2>
          <p>{t("common:mapEmptyState.subtitle")}</p>
        </div>
      ) : (
        <Suspense
          fallback={
            <ListWidgetSkeleton
              renderSkeleton={ListProjectCardSkeleton}
              className={styles.mapProjectsListWidget}
              items={6}
            />
          }
        >
          <div className={styles.scrollableListBlock}>
            <ProjectsListWidget
              useProjectsQuery={useProjectsMapQuery(listParams)}
              className={styles.mapProjectsListWidget}
              renderCard={(project) => (
                <motion.div
                  className={styles.projectCardListWrapper}
                  onClick={() => {
                    const lat = project.location?.latitude;
                    const lng = project.location?.longitude;
                    if (lat && lng) onSelectProject(project.id, lat, lng);
                  }}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={{
                    rest: {
                      scale: 1,
                      x: 0,
                      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                    },
                    hover: {
                      scale: 1.02,
                      x: -2,
                      boxShadow: "4px 4px 16px rgba(0,0,0,0.12)",
                    },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ cursor: "pointer" }}
                >
                  <ListProjectCard
                    key={`proj-${project.id}`}
                    project={project}
                  />
                </motion.div>
              )}
            />
          </div>
        </Suspense>
      )}
      {projects && projects.pagination.totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            total={projects.pagination.totalPages}
            page={page}
            onChange={(page) =>
              navigate({
                search: (prev) => ({ ...prev, Page: page }),
                resetScroll: false,
              })
            }
          />
        </div>
      )}
    </ToggleDropdownButton>
  );
};
