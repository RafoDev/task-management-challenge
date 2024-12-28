import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/layouts/dashboard/dashboard-layout";
import { TaskGrid, TaskList } from "./features/tasks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<TaskGrid />} />
          <Route path="/list" element={<TaskList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
