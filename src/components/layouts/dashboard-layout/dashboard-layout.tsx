import { Sidebar } from "../../../features/navigation/sidebar/sidebar";
import styles from "./dashboard-layout.module.scss";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </section>
  );
};
