import { Outlet } from "react-router-dom";
import { Topbar } from "../../../features/tasks/components/topbar/topbar";

import styles from "./tasks-dashboard.module.scss";

export const TasksDashboard = () => {
  return (
    <div className={styles.container}>
      <Topbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
