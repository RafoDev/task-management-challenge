import styles from "./tasks-layout.module.scss";
import { Topbar } from "../../../features/tasks/topbar/topbar";
import { SearchBar } from "../../../features/navigation/searchbar/searchbar";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ViewModes } from "../../../features/tasks/types";
import { Tasks } from "../../../features/tasks/tasks";

type TasksLayoutProps = {
  defaultViewMode?: ViewModes;
};

type TaskLayoutContextType = {
  viewMode: ViewModes;
  toggleViewMode(): void;
};

const TaskLayoutContext = createContext<TaskLayoutContextType | undefined>(
  undefined
);

const TaskLayoutProvider = ({
  defaultViewMode,
  children,
}: {
  defaultViewMode: ViewModes;
  children: ReactNode;
}) => {
  const [viewMode, setViewMode] = useState<ViewModes>(defaultViewMode);

  useEffect(() => {
    setViewMode(defaultViewMode);
  }, [defaultViewMode]);

  const toggleViewMode = () => {
    setViewMode((view) => (view === "kanban" ? "table" : "kanban"));
  };

  return (
    <TaskLayoutContext.Provider value={{ viewMode, toggleViewMode }}>
      {children}
    </TaskLayoutContext.Provider>
  );
};

export const TasksLayout = ({
  defaultViewMode = "kanban",
}: TasksLayoutProps) => {
  return (
    <TaskLayoutProvider defaultViewMode={defaultViewMode}>
      <div className={styles.container}>
        <header className={styles.header}>
          <SearchBar />
        </header>
        <Topbar />
        <div className={styles.content}>
          <Tasks />
        </div>
      </div>
    </TaskLayoutProvider>
  );
};

export const useTaskLayout = (): TaskLayoutContextType => {
  const context = useContext(TaskLayoutContext);
  if (!context) {
    throw new Error("useTaskLayout must be used within a TaskLayoutProvider");
  }
  return context;
};
