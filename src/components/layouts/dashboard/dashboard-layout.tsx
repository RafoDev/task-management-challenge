import { Sidebar } from "../../../features/navigation/sidebar/sidebar";
import { TopNavbar } from "../../../features/navigation/searchbar/searchbar";
import styles from "./dashboard-layout.module.scss";
import { Tasks } from "../../../features/tasks/tasks";

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
        <Tasks />
      </main>
    </section>
  );
};
