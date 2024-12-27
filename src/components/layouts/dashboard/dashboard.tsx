import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../features/navigation/sidebar/sidebar";
import { TopNavbar } from "../../../features/navigation/top-navbar/top-navbar";
import styles from "./dashboard.module.scss";

export const Dashboard = () => {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <header className={styles.header}>
        <TopNavbar />
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </section>
  );
};
