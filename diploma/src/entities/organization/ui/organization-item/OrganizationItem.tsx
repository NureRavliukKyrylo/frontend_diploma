import styles from "./OrganizationItem.module.scss";

interface OrganizationItemProps {
  iconUrl: string;
  name: string;
}

export const OrganizationItem = ({ iconUrl, name }: OrganizationItemProps) => (
  <div className={styles.organizationItemWrapper}>
    <img src={iconUrl} alt={name} />
    <h1>{name}</h1>
  </div>
);
