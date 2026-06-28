import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AdminUsersStyles } from "../../model/types";

interface UsersPaginationProps {
  styles: AdminUsersStyles;
  currentPage: number;
  totalPages: number;
  pageWindow: number[];
  onPageChange: (page: number) => void;
}

export const UsersPagination = ({
  styles,
  currentPage,
  totalPages,
  pageWindow,
  onPageChange,
}: UsersPaginationProps) => (
  <div className={styles.pagination}>
    <button
      type="button"
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage <= 1}
      aria-label="Previous page"
    >
      <ChevronLeft size={18} aria-hidden="true" />
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
      <ChevronRight size={18} aria-hidden="true" />
    </button>
  </div>
);
