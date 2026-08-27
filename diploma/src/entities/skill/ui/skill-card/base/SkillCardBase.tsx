import styles from "./SkillCardBase.module.scss";

interface SkillCardBaseProps {
  iconUrl: string;
  name: string;
  className?: string;
  classNameBase?: string;
  bottomSlot?: React.ReactNode;
}

export const SkillCardBase = ({
  iconUrl,
  name,
  className,
  bottomSlot,
  classNameBase,
}: SkillCardBaseProps) => (
  <div className={`${styles.skillCardBase} ${classNameBase ?? ""}`}>
    <div className={`${styles.baseSkillInfo} ${className ?? ""}`}>
      <img src={iconUrl} alt={name} />
      <h1>{name}</h1>
    </div>
    {bottomSlot}
  </div>
);
