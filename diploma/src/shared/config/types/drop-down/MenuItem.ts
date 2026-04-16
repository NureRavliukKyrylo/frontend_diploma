export interface MenuItem<T extends string> {
  key: string;
  label: string;
  onClick: () => void;
  variant?: T;
}
