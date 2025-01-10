import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ViewModes } from "../types";

type TasksContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  viewMode: ViewModes;
  toggleViewMode(): void;
  profileId?: string;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);


export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({
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

  useEffect(() => {
    setViewMode(defaultViewMode);
  }, [defaultViewMode]);

  const toggleViewMode = () => {
    setViewMode((view) => (view === "kanban" ? "table" : "kanban"));
  };

  return (
    <TasksContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        viewMode,
        toggleViewMode,
        profileId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
