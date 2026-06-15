export const AnimatePresence = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const motion = {
  div: ({
    children,
    onClick,
    className,
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  ),
};
