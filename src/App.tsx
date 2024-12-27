import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/layouts/dashboard/dashboard";
import { Tasks } from "./features/tasks/tasks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="list" element={<Tasks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
