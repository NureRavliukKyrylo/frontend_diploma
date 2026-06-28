import styles from "./AdminPlaceholderPage.module.scss";

interface AdminPlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const AdminPlaceholderPage = ({
  eyebrow,
  title,
  description,
}: AdminPlaceholderPageProps) => (
  <section className={styles.page}>
    <div className={styles.hero}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  </section>
);
