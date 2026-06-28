import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";

interface RequestsPaginationProps {
  currentPage: number;
  totalPages: number;
  pageWindow: number[];
  onPageChange: (page: number) => void;
}

export const RequestsPagination = ({
  currentPage,
  totalPages,
  pageWindow,
  onPageChange,
}: RequestsPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        Prev
      </button>
      {pageWindow.map((page) => (
        <button
          key={page}
          type="button"
          className={page === currentPage ? styles.pageButtonActive : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};
