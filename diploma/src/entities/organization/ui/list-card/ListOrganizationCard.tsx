import styles from "./ListOrganizationCard.module.scss";

export interface ListOrganizationCardProps {
  name: string;
  image: string;
}
export const ListOrganizationCard = ({
  name,
  image,
}: ListOrganizationCardProps) => {
  return (
    <div className={styles.listCardOrganizationWrapper}>
      <img src={image} alt="image-organization" />
      <div className={styles.organizationInfo}>
        <h1>{name}</h1>
        <h2>organization</h2>
      </div>
    </div>
  );
};
