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
import { useGetKanbanTasksQuery } from "../../../features/tasks/graphql/queries/getKanbanTasks.generated";
import useDebounce from "../../../shared/hooks/use-debounce";

type TasksLayoutProps = {
  defaultViewMode?: ViewModes;
  profileId?: string;
};

type TaskLayoutContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  viewMode: ViewModes;
  toggleViewMode(): void;
  isSearching: boolean;
  profileId?: string;
};

const TaskLayoutContext = createContext<TaskLayoutContextType | undefined>(
  undefined
);

const TaskLayoutProvider = ({
  defaultViewMode,
  children,
  profileId,
}: {
  defaultViewMode: ViewModes;
  children: ReactNode;
  profileId?: string;
}) => {
  const [viewMode, setViewMode] = useState<ViewModes>(defaultViewMode);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setViewMode(defaultViewMode);
  }, [defaultViewMode]);

  const toggleViewMode = () => {
    setViewMode((view) => (view === "kanban" ? "table" : "kanban"));
  };

  return (
    <TaskLayoutContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        viewMode,
        toggleViewMode,
        isSearching,
        profileId,
      }}
    >
      {children}
    </TaskLayoutContext.Provider>
  );
};

export const useTaskLayout = (): TaskLayoutContextType => {
  const context = useContext(TaskLayoutContext);
  if (!context) {
    throw new Error("useTaskLayout must be used within a TaskLayoutProvider");
  }
  return context;
};

export const TasksLayout = ({
  defaultViewMode = "kanban",
  profileId,
}: TasksLayoutProps) => {
  return (
    <TaskLayoutProvider defaultViewMode={defaultViewMode} profileId={profileId}>
      <TasksContent />
    </TaskLayoutProvider>
  );
};

const TasksContent = () => {
  const { searchQuery, profileId } = useTaskLayout();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data, loading } = useGetKanbanTasksQuery({
    variables: {
      name: debouncedSearchQuery.length > 1 ? debouncedSearchQuery : undefined,
      assigneeId: profileId,
    },
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SearchBar />
      </header>
      <Topbar />
      <div className={styles.content}>
        <Tasks tasks={data} />
      </div>
    </div>
  );
};
