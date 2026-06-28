import { AdminSidebar } from "@widgets/admin/sidebar";
import styles from "./AdminLayout.module.scss";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => (
  <div className={styles.adminShell}>
    <AdminSidebar />
    <main className={styles.content}>{children}</main>
  </div>
);
