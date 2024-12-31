import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/layouts/dashboard/dashboard-layout";
import { KanbanView } from "../features/tasks";
import { TasksDashboard } from "../components/layouts/tasks-dashboard/tasks-dashboard";
import { TableView } from "../features/tasks/table-view/table-view";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/dashboard"} />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route element={<TasksDashboard />}>
          <Route path="dashboard" element={<KanbanView />} />
          <Route path="my-tasks" element={<TableView />} />
        </Route>
      </Route>
    </Routes>
  );
};
