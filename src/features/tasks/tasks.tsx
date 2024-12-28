import { Route, Routes } from "react-router-dom";
import { TaskGrid } from "./task-grid/task-grid";
import { TaskList } from "./task-list/task-list";
import { TasksDashboard } from "../../components/layouts/tasks-dashboard/tasks-dashboard";

export const Tasks = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksDashboard />}>
        <Route index element={<TaskGrid />} />
        <Route path="/list" element={<TaskList />} />
      </Route>
    </Routes>
  );
};
