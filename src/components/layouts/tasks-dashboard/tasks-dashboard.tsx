import { Outlet } from "react-router-dom";

import styles from "./tasks-dashboard.module.scss";
import { Topbar } from "../../../features/tasks/topbar/topbar";
import { SearchBar } from "../../../features/navigation/searchbar/searchbar";

export const TasksDashboard = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SearchBar />
      </header>
      <Topbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
