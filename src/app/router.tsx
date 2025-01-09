import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/layouts/dashboard-layout/dashboard-layout";
import { TasksLayout } from "../components/layouts/tasks-layout/tasks-layout";
import { useProfile } from "../features/navigation/searchbar/components/profile/context/profile-context";

export const AppRouter = () => {
  const { profile } = useProfile();

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
          element={
            <TasksLayout defaultViewMode="table" profileId={profile?.id} />
          }
        />
      </Route>
    </Routes>
  );
};
