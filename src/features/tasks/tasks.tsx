import { Route, Routes } from "react-router-dom";
import { KanbanView } from "./kanban-view/kanban-view";
import { TaskList } from "./task-list/task-list";
import { TasksDashboard } from "../../components/layouts/tasks-dashboard/tasks-dashboard";

export const Tasks = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksDashboard />}>
        <Route index element={<KanbanView />} />
        <Route path="/list" element={<TaskList />} />
      </Route>
    </Routes>
  );
};
