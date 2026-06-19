import styles from "../../TaskEditSettings.module.scss";

interface PillOption {
  id: string;
  name: string;
}

interface PillOptionsSectionProps {
  title: string;
  description: string;
  loadingText: string;
  isLoading: boolean;
  options: PillOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const PillOptionsSection = ({
  title,
  description,
  loadingText,
  isLoading,
  options,
  selectedIds,
  onToggle,
}: PillOptionsSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionLabel}>{title}</h2>
    <p className={styles.sectionDescription}>{description}</p>

    {isLoading ? (
      <div className={styles.optionState}>{loadingText}</div>
    ) : (
      <div className={styles.categoryGrid}>
        {options.map((option) => {
          const selected = selectedIds.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              className={`${styles.categoryPill} ${selected ? styles.active : ""}`}
              onClick={() => onToggle(option.id)}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    )}
  </section>
);
