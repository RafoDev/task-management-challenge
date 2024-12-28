import { Outlet } from "react-router-dom";
import { Topbar } from "../../../features/tasks/components/topbar/topbar";

export const TasksDashboard = () => {
  return (
    <div>
      <Topbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
