import styles from "./DistanceFilter.module.scss";
import { useCallback, useState } from "react";
import { useAutocompleteSuggestions } from "@shared/libs/map";
import type { LocationSuggestion } from "@shared/config/types";
import { AnimatePresence, motion } from "framer-motion";

interface DistanceFilterProps {
  defaultLocation?: string;
  defaultRadiusKm?: number;
  onLocationSelect: (location: LocationSuggestion, radiusKm: number) => void;
  onLocationClear: () => void;
  onRadiusChange: (radiusKm: number) => void;
}

export const DistanceFilter = ({
  defaultLocation,
  defaultRadiusKm = 10,
  onLocationSelect,
  onLocationClear,
  onRadiusChange,
}: DistanceFilterProps) => {
  const [inputValue, setInputValue] = useState(defaultLocation ?? "");
  const [query, setQuery] = useState("");
  const [radiusInput, setRadiusInput] = useState(String(defaultRadiusKm));
  const { suggestions, reset, error } = useAutocompleteSuggestions(query);
  const isOpen = suggestions.length > 0 || !!error;

  const handleSelect = useCallback(
    (suggestion: LocationSuggestion) => {
      setInputValue(suggestion.displayName);
      setQuery("");
      reset();
      onLocationSelect(suggestion, Number(radiusInput));
    },
    [onLocationSelect, radiusInput],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setQuery(e.target.value);
    if (!e.target.value) onLocationClear();
  };

  return (
    <div className={styles.locationSuggestionsWrapper}>
      <div className={`${styles.locationWrapper} ${isOpen ? styles.open : ""}`}>
        <div className={styles.locationInputWrapper}>
          <span className={styles.mapIcon}>
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3889 0L21.1933 0.035L14.6667 2.45L7.33333 0L0.44 2.21667C0.183333 2.29833 0 2.50833 0 2.77667V20.4167C0 20.7433 0.268889 21 0.611111 21L0.806667 20.965L7.33333 18.55L14.6667 21L21.56 18.7833C21.8167 18.7017 22 18.4917 22 18.2233V0.583333C22 0.256667 21.7311 0 21.3889 0ZM14.6667 18.6667L7.33333 16.205V2.33333L14.6667 4.795V18.6667Z"
                fill="#727272"
                fill-opacity="0.8"
              />
            </svg>
          </span>
          <input
            className={styles.locationInput}
            value={inputValue}
            onChange={handleChange}
            placeholder="Set location"
          />
        </div>
        <div className={styles.radiusInputWrapper}>
          <span className={styles.dividerLocationInput} />
          <div className={styles.kmInfoRadius}>
            <span className={styles.radiusPrefix}>+</span>
            <input
              className={styles.radiusInput}
              type="number"
              min={10}
              max={100}
              value={radiusInput}
              onChange={(e) => {
                const raw = e.target.value;
                if (Number(raw) > 100) return;
                setRadiusInput(raw);
              }}
              onBlur={() => {
                const clamped = Math.max(10, Number(radiusInput));
                setRadiusInput(String(clamped));
                onRadiusChange(clamped);
              }}
              style={{
                width: `${radiusInput.length}ch`,
              }}
            />
            <span className={styles.radiusSuffix}>km</span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.locationDropdown}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {error ? (
              <div className={styles.locationDropdownInfo}>{error}</div>
            ) : (
              suggestions.map((s, i) => (
                <li key={i} onClick={() => handleSelect(s)}>
                  {s.displayName}
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
