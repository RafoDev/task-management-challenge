import { Route, Routes } from "react-router-dom";
import { KanbanView } from "./kanban-view/kanban-view";
import { TaskList } from "./task-list/task-list";
import { TasksDashboard } from "../../components/layouts/tasks-dashboard/tasks-dashboard";
import { useGetTasksQuery } from "./getTasks.generated";

export const Tasks = () => {
  const { data, loading } = useGetTasksQuery();

  return (
    <Routes>
      <Route path="/" element={<TasksDashboard />}>
        <Route
          index
          element={<KanbanView tasks={data?.tasks || []} loading={loading} />}
        />
        <Route path="/list" element={<TaskList />} />
      </Route>
    </Routes>
  );
};
