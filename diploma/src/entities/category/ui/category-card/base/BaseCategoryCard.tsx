interface BaseCardProps {
  img: string;
  imgAlt?: string;
  children?: React.ReactNode;
  className?: string;
}

export const BaseCategoryCard = ({
  img,
  imgAlt,
  children,
  className,
}: BaseCardProps) => {
  return (
    <div className={className}>
      <img src={img} alt={imgAlt} />
      {children}
    </div>
  );
};
