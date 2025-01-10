import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/layouts/dashboard-layout/dashboard-layout";
import { useProfile } from "../features/navigation/searchbar/components/profile/context/profile-context";
import { ProfileInfo } from "../features/navigation/searchbar/components/profile/profile-info/profile-info";
import { Tasks } from "../features/tasks/tasks";

export const AppRouter = () => {
  const { profile } = useProfile();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/dashboard"} />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route
          path="dashboard"
          element={<Tasks defaultViewMode="kanban" />}
        />
        <Route
          path="my-tasks"
          element={
            <Tasks defaultViewMode="table" profileId={profile?.id} />
          }
        />
        <Route path="my-profile" element={<ProfileInfo />} />
      </Route>
    </Routes>
  );
};
