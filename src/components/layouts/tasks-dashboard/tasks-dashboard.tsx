import { Outlet } from "react-router-dom";

import styles from "./tasks-dashboard.module.scss";
import { Topbar } from "../../../features/tasks/topbar/topbar";
import { SearchBar } from "../../../features/navigation/searchbar/searchbar";
import { useState } from "react";

export type ViewModes = "kanban" | "table";

type TasksDashboardType = {
  defaultViewMode: ViewModes;
};

export const TasksDashboard = ({
  defaultViewMode = "kanban",
}: TasksDashboardType) => {
  const [viewMode, setViewMode] = useState<ViewModes>(defaultViewMode);
  const toggleViewMode = () => {
    setViewMode((view) => (view === "kanban" ? "table" : "kanban"));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SearchBar />
      </header>
      <Topbar viewMode={viewMode} toggleViewMode={toggleViewMode} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
