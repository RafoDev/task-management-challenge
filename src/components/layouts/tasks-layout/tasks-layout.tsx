import styles from "./tasks-layout.module.scss";
import { Topbar } from "../../../features/tasks/topbar/topbar";
import { SearchBar } from "../../../features/navigation/searchbar/searchbar";
import { useEffect, useState } from "react";
import { KanbanView } from "../../../features/tasks";
import { TableView } from "../../../features/tasks/table-view/table-view";
import { ViewModes } from "../../../features/tasks/types";
import { Tasks } from "../../../features/tasks/tasks";

type TasksDashboardType = {
  defaultViewMode?: ViewModes;
};

export const TasksLayout = ({
  defaultViewMode = "kanban",
}: TasksDashboardType) => {
  const [viewMode, setViewMode] = useState<ViewModes>(defaultViewMode);

  useEffect(() => {
    setViewMode(defaultViewMode);
  }, [defaultViewMode]);

  console.log(defaultViewMode);

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
        <Tasks viewMode={viewMode} />
      </div>
    </div>
  );
};
