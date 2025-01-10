import styles from "./tasks.module.scss";

import { useEffect } from "react";

import { useGetTasksQuery } from "./graphql/queries/getTasks.generated";

import { ViewModes } from "./types";
import useDebounce from "../../shared/hooks/use-debounce";
import { SearchBar } from "../navigation/searchbar/searchbar";
import { Topbar } from "./topbar/topbar";
import { TasksProvider, useTasks } from "./context/tasks-context";
import { ViewMode } from "./view-mode/view-mode";

type TasksProps = {
  defaultViewMode?: ViewModes;
  profileId?: string;
};

const TasksContent = () => {
  const { searchQuery, profileId } = useTasks();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data, loading, refetch } = useGetTasksQuery({
    variables: {
      name: debouncedSearchQuery.length > 1 ? debouncedSearchQuery : undefined,
      assigneeId: profileId,
    },
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refetch();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SearchBar />
      </header>
      <Topbar />
      <div className={styles.content}>
        {!loading ? (
          <ViewMode tasks={data} />
        ) : (
          <div className={styles.loading}>
            <span> Loading tasks, please wait...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const Tasks = ({
  defaultViewMode = "kanban",
  profileId,
}: TasksProps) => {
  return (
    <TasksProvider defaultViewMode={defaultViewMode} profileId={profileId}>
      <TasksContent />
    </TasksProvider>
  );
};
