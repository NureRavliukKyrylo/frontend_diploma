import { AnimatePresence, motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { Map } from "lucide-react";
import type { CreateProjectFormErrors } from "../../../model/useCreateProjectForm";
import styles from "../CreateProjectSteps.module.scss";

interface LocationSuggestion {
  displayName: string;
  lat: number;
  lng: number;
}

interface ProjectLocationBlockProps {
  locationQuery: string;
  errors: CreateProjectFormErrors;
  suggestions: LocationSuggestion[];
  error?: string | null;
  dropdownOpen: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMapOpen: () => void;
  onSuggestionSelect: (suggestion: LocationSuggestion) => void;
}

export const ProjectLocationBlock = ({
  locationQuery,
  errors,
  suggestions,
  error,
  dropdownOpen,
  onInputChange,
  onMapOpen,
  onSuggestionSelect,
}: ProjectLocationBlockProps) => (
  <section className={styles.fieldBlock}>
    <h2 className={styles.blockLabel}>Location</h2>
    <label className={styles.locationField}>
      <div className={styles.locationSearch}>
        <input
          className={styles.locationInput}
          value={locationQuery}
          placeholder="Start typing a city or region..."
          aria-invalid={Boolean(errors.location)}
          onChange={onInputChange}
        />
        <button
          type="button"
          className={styles.mapIconBtn}
          aria-label="Pick project location on map"
          onClick={onMapOpen}
        >
          <Map size={22} strokeWidth={2.2} />
        </button>

        <AnimatePresence>
          {dropdownOpen ? (
            <motion.ul
              className={styles.locationDropdown}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {error ? (
                <li className={styles.locationDropdownInfo}>{error}</li>
              ) : (
                suggestions.map((suggestion) => (
                  <li
                    key={`${suggestion.displayName}-${suggestion.lat}-${suggestion.lng}`}
                    onClick={() => onSuggestionSelect(suggestion)}
                  >
                    {suggestion.displayName}
                  </li>
                ))
              )}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
      {errors.location ? (
        <span className={styles.formError}>{errors.location}</span>
      ) : null}
    </label>
  </section>
);
