import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/layouts/dashboard/dashboard-layout";
import { TaskGrid, TaskList } from "./features/tasks";

function App() {

  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
