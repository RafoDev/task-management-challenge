import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/layouts/dashboard/dashboard-layout";
import { Tasks } from "./features/tasks/tasks";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="dashboard" element={<Tasks />} />
          <Route path="list" element={<Tasks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
