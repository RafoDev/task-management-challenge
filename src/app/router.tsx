import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/layouts/dashboard/dashboard-layout";
import { KanbanView } from "../features/tasks";
import { TasksDashboard } from "../components/layouts/tasks-dashboard/tasks-dashboard";
import { TableView } from "../features/tasks/table-view/table-view";

export const AppProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/kanban"} />} />
      <Route path="/" element={<Dashboard />}>
        <Route element={<TasksDashboard />}>
          <Route path="kanban" element={<KanbanView />} />
          <Route path="table" element={<TableView />} />
        </Route>
      </Route>
    </Routes>
  );
};
