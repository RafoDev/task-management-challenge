import "./App.css";
import { useGetAllTasksQuery } from "./getTasks.generated";

function App() {
  const { data, loading } = useGetAllTasksQuery();
  if (loading) return <span>loading</span>;
  return <>{JSON.stringify(data?.tasks)}</>;
}

export default App;
