import styles from "./MapLocationInput.module.scss";

interface MapLocationInputProps {
  label: string;
  handleMapOpen: () => void;
  error?: string;
}

export const MapLocationInput: React.FC<MapLocationInputProps> = ({
  label,
  handleMapOpen,
  error,
}) => {
  return (
    <div
      className={`${styles.mapLocationWrapper} ${
        error ? styles.error : ""
      }`}
    >
        <div className={styles.leftMapContent}>
        <span className={styles.mapIcon}>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3889 0L21.1933 0.035L14.6667 2.45L7.33333 0L0.44 2.21667C0.183333 2.29833 0 2.50833 0 2.77667V20.4167C0 20.7433 0.268889 21 0.611111 21L0.806667 20.965L7.33333 18.55L14.6667 21L21.56 18.7833C21.8167 18.7017 22 18.4917 22 18.2233V0.583333C22 0.256667 21.7311 0 21.3889 0ZM14.6667 18.6667L7.33333 16.205V2.33333L14.6667 4.795V18.6667Z" fill="#727272" fill-opacity="0.8"/>
            </svg>
        </span>
        <span className={styles.divider}></span>
        <h1>{label}</h1>
      </div>
      <button
        type="button"
        onClick={handleMapOpen}
        className={styles.mapOpenButton}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6667 0L17.4778 2.81111L13.9456 6.31889L15.6811 8.05444L19.1889 4.52222L22 7.33333V0H14.6667ZM0 7.33333L2.81111 4.52222L6.31889 8.05444L8.05444 6.31889L4.52222 2.81111L7.33333 0H0V7.33333ZM7.33333 22L4.52222 19.1889L8.05444 15.6811L6.31889 13.9456L2.81111 17.4778L0 14.6667V22H7.33333ZM22 14.6667L19.1889 17.4778L15.6811 13.9456L13.9456 15.6811L17.4778 19.1889L14.6667 22H22V14.6667Z" fill="#727272" fill-opacity="0.8"/>
</svg>

        </button>

      {error && (
        <div className="errorInput">{error}</div>
      )}
    </div>
  );
};