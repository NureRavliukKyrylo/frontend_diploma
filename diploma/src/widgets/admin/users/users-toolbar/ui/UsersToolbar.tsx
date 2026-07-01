import type { AdminUsersParams, AdminUsersSearchParams } from "@entities/admin";
import { withDebounce } from "@shared/libs/hocs";
import { SortDropDown } from "@shared/ui/drop-down";
import { DatePickerInput } from "@shared/ui/inputs";
import { Search } from "lucide-react";
import { statusOptions, sortOptions } from "../../config/options";
import { getDatePickerClassNames } from "../../lib/userDisplay";
import type {
  AdminUsersStyles,
  RoleFilter,
  SortValue,
  StatusDropDownValue,
  StatusFilter,
} from "../../model/types";
import { useTranslation } from "react-i18next";

const DebouncedDatePicker = withDebounce(DatePickerInput, 300);

interface UsersToolbarProps {
  styles: AdminUsersStyles;
  search: AdminUsersSearchParams;
  searchInput: string;
  roleFilterOptions: Array<{ value: RoleFilter; label: string }>;
  roleFilterValue: RoleFilter;
  statusDropDownValue: StatusDropDownValue;
  onSearchInputChange: (value: string) => void;
  onUpdateSearch: (patch: Partial<AdminUsersSearchParams>) => void;
  onStatusChange: (value: StatusFilter) => void;
}

export const UsersToolbar = ({
  styles,
  search,
  searchInput,
  roleFilterOptions,
  roleFilterValue,
  statusDropDownValue,
  onSearchInputChange,
  onUpdateSearch,
  onStatusChange,
}: UsersToolbarProps) => {
  const { t } = useTranslation("admin");
  const localizedStatusOptions = statusOptions.map((option) => ({
    ...option,
    label: t(option.label),
  }));
  const localizedSortOptions = sortOptions.map((option) => ({
    ...option,
    label: t(option.label),
  }));

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBox}>
        <Search size={19} aria-hidden="true" />
        <input
          value={searchInput}
          onChange={(event) => onSearchInputChange(event.target.value)}
          placeholder={t("users.toolbar.search")}
        />
      </div>

      <div className={styles.filterGrid}>
        <label className={styles.filterField}>
          <span>{t("users.toolbar.role")}</span>
          <div className={styles.dropdownShell}>
            <SortDropDown
              selectedLabelOnly
              options={roleFilterOptions}
              value={roleFilterValue}
              onSelect={(value) =>
                onUpdateSearch({
                  RoleName:
                    value === "all" ? undefined : value.replace(/^role:/, ""),
                  Page: 1,
                })
              }
            />
          </div>
        </label>

        <label className={styles.filterField}>
          <span>{t("users.toolbar.status")}</span>
          <div className={styles.dropdownShell}>
            <SortDropDown
              selectedLabelOnly
              options={localizedStatusOptions}
              value={statusDropDownValue}
              onSelect={(value) =>
                onStatusChange(value.replace(/^status:/, "") as StatusFilter)
              }
            />
          </div>
        </label>

        <label className={`${styles.filterField} ${styles.toolbarDateField}`}>
          <span>{t("users.toolbar.registeredFrom")}</span>
          <div className={styles.datePickerShell}>
            <DebouncedDatePicker
              label=""
              name="registeredFrom"
              showMonthAndYearPickers
              value={search.RegisteredFrom}
              onChange={(value) =>
                onUpdateSearch({ RegisteredFrom: value, Page: 1 })
              }
              classNames={getDatePickerClassNames(styles)}
            />
          </div>
        </label>

        <label className={`${styles.filterField} ${styles.toolbarDateField}`}>
          <span>{t("users.toolbar.registeredTo")}</span>
          <div className={styles.datePickerShell}>
            <DebouncedDatePicker
              label=""
              name="registeredTo"
              showMonthAndYearPickers
              value={search.RegisteredTo}
              onChange={(value) =>
                onUpdateSearch({ RegisteredTo: value, Page: 1 })
              }
              classNames={getDatePickerClassNames(styles)}
            />
          </div>
        </label>

        <label className={styles.filterField}>
          <span>{t("users.toolbar.sort")}</span>
          <div className={styles.dropdownShell}>
            <SortDropDown
              selectedLabelOnly
              options={localizedSortOptions}
              value={(search.OrderBy ?? "Newest") as SortValue}
              onSelect={(value) =>
                onUpdateSearch({
                  OrderBy: value as AdminUsersParams["OrderBy"],
                  Page: 1,
                })
              }
            />
          </div>
        </label>
      </div>
    </div>
  );
};
