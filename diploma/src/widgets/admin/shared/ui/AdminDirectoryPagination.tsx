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
}: AdminDirectoryPaginationProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        aria-label={t("common.pagination.previous")}
      >
        {t("common.actions.previous")}
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
        {t("common.actions.next")}
      </button>
    </div>
  );
};
import { useTranslation } from "react-i18next";
