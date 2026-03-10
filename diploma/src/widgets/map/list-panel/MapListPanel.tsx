import { map, Pagination } from "@shared/ui";
import { Suspense } from "react";
import { motion } from "framer-motion";
import {
  ListProjectCard,
  projectQuery,
  type ProjectSearchParams,
} from "@entities/project";
import { CombinedListWidget } from "../combined-list/CombinedListWidget";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import styles from "./MapListPanel.module.scss";
import { CombinedListWidgetSkeleton } from "../combined-list/CombinedListWidgetSkeleton";
import { ToggleDropdownButton } from "@shared/ui/buttons";

interface MapListPanelProps {
  listParams: ProjectSearchParams;
  page?: number;
}

export const MapListPanel = ({ listParams, page }: MapListPanelProps) => {
  const navigate = useNavigate({ from: "/map/" });
  const { data: projects } = useQuery(projectQuery.map(listParams));

  return (
    <ToggleDropdownButton variant="list">
      {projects?.data?.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No projects found</h2>
          <p>Try adjusting your filters or search query</p>
        </div>
      ) : (
        <Suspense fallback={<CombinedListWidgetSkeleton items={5} />}>
          <div className={styles.scrollableListBlock}>
            <CombinedListWidget
              projectParams={listParams}
              renderProjectCard={(project) => (
                <motion.div
                  className={styles.projectCardListWrapper}
                  onClick={() => {
                    const lat = project.location?.latitude;
                    const lng = project.location?.longitude;
                    if (lat && lng) map.flyTo(lat, lng, 12);
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
                    name={project.title}
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
              navigate({ search: (prev) => ({ ...prev, Page: page }) })
            }
          />
        </div>
      )}
    </ToggleDropdownButton>
  );
};
