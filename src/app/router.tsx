import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/layouts/dashboard-layout/dashboard-layout";
import { KanbanView } from "../features/tasks";
import { TasksLayout } from "../components/layouts/tasks-layout/tasks-layout";
import { TableView } from "../features/tasks/table-view/table-view";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/dashboard"} />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route
          path="dashboard"
          element={<TasksLayout defaultViewMode="kanban" />}
        />
        <Route
          path="my-tasks"
          element={<TasksLayout defaultViewMode="table" />}
        />
      </Route>
    </Routes>
  );
};
