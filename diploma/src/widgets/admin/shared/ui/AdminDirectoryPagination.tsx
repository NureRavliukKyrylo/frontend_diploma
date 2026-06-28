interface AdminDirectoryPaginationProps {
  styles: Record<string, string>;
  currentPage: number;
  totalPages: number;
  pageWindow: number[];
  onPageChange: (page: number) => void;
}

export const AdminDirectoryPagination = ({
  styles,
  currentPage,
  totalPages,
  pageWindow,
  onPageChange,
}: AdminDirectoryPaginationProps) => (
  <div className={styles.pagination}>
    <button
      type="button"
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage <= 1}
      aria-label="Previous page"
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
      aria-label="Next page"
    >
      Next
    </button>
  </div>
);
