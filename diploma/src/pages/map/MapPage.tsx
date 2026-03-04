import { BaseMap } from "@shared/ui";
import styles from "./MapPage.module.scss";
import { FilterButton } from "@shared/ui/buttons";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchBar } from "@shared/ui/inputs";
import { MapFiltersWidget } from "@widgets/map";

export const MapPage = () => {
  const navigate = useNavigate({ from: "/map/" });
  const search = useSearch({ from: "/_masterLayout/map/" });
  return (
    <div className={styles.mapPageWrapper}>
      <BaseMap
        zoomPosition="bottomright"
        fullscreenPosition="bottomleft"
        scrollWheelZoom={false}
      >
        <div className={styles.filterButtonWrapper}>
          <FilterButton>
            <MapFiltersWidget search={search} from="/map/" />
          </FilterButton>
          <SearchBar
            onChange={(value) => {
              navigate({
                search: (prev) => ({ ...prev, Search: value }),
              });
            }}
            variant="projects"
          />
        </div>
      </BaseMap>
    </div>
  );
};
