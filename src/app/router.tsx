import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/layouts/dashboard/dashboard-layout";
import { KanbanView, TaskList } from "../features/tasks";
import { useGetTasksQuery } from "../features/tasks/getTasks.generated";
import { TasksDashboard } from "../components/layouts/tasks-dashboard/tasks-dashboard";

export const AppProvider = () => {
  const { data, loading } = useGetTasksQuery();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/tasks/kanban"} />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="/tasks" element={<TasksDashboard />}>
          <Route
            path="kanban"
            element={<KanbanView tasks={data?.tasks || []} loading={loading} />}
          />
          <Route path="list" element={<TaskList />} />
        </Route>
      </Route>
    </Routes>
  );
};
