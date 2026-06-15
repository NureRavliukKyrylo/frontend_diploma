export const Dropdown = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const DropdownTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => <div>{children}</div>;

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <ul>{children}</ul>
);

export const DropdownItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => <li onClick={onClick}>{children}</li>;
