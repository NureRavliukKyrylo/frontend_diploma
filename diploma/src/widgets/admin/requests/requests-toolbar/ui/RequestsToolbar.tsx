import { SortDropDown } from "@shared/ui/drop-down";
import {
  statusOptions,
  type StatusFilterValue,
  type TypeFilterValue,
  typeOptions,
} from "@widgets/admin/requests/requests-config/libs/requestTypeConfig";
import { Search } from "lucide-react";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";

interface RequestsToolbarProps {
  searchInput: string;
  status: StatusFilterValue;
  type: TypeFilterValue;
  onSearchInputChange: (value: string) => void;
  onStatusChange: (value: StatusFilterValue) => void;
  onTypeChange: (value: TypeFilterValue) => void;
}

export const RequestsToolbar = ({
  searchInput,
  status,
  type,
  onSearchInputChange,
  onStatusChange,
  onTypeChange,
}: RequestsToolbarProps) => (
  <div className={styles.toolbar}>
    <div className={styles.searchField}>
      <Search size={18} aria-hidden="true" />
      <input
        value={searchInput}
        onChange={(event) => onSearchInputChange(event.target.value)}
        placeholder="Search requests"
      />
    </div>

    <div className={styles.dropdownShell}>
      <SortDropDown
        selectedLabelOnly
        options={statusOptions}
        value={status}
        onSelect={onStatusChange}
      />
    </div>

    <div className={styles.dropdownShell}>
      <SortDropDown
        selectedLabelOnly
        options={typeOptions}
        value={type}
        onSelect={onTypeChange}
      />
    </div>
  </div>
);
