import { useRef, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { API_URL } from "@shared/config/constants";
import { PortalMenu } from "@shared/ui/portal-menu";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { useTranslation } from "react-i18next";

interface ExportMenuProps {
  from: string;
  to: string;
}

export const ExportMenu = ({ from, to }: ExportMenuProps) => {
  const { t } = useTranslation("admin");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const advancedParams = new URLSearchParams({ from, to });

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.exportButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Download size={17} aria-hidden="true" />
        {t("statistics.export.pdf")}
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      <PortalMenu
        isOpen={isOpen}
        anchorRef={buttonRef}
        className={styles.exportPopover}
      >
        <a href={`${API_URL}/api/admin/statistics/platform/export`}>
          {t("statistics.export.summary")}
        </a>
        <a href={`${API_URL}/api/statistics/advanced/export?${advancedParams}`}>
          {t("statistics.export.advanced")}
        </a>
      </PortalMenu>
    </>
  );
};
