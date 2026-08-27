import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AdminUsersStyles } from "../../model/types";
import { useTranslation } from "react-i18next";

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
}: UsersPaginationProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        aria-label={t("common.pagination.previous")}
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
        aria-label={t("common.pagination.next")}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
};
