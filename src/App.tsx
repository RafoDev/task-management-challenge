import { TopNavbar } from "./features/navigation/top-navbar/top-navbar";
import { useGetAllTasksQuery } from "./getTasks.generated";

function App() {
  // const { data, loading } = useGetAllTasksQuery();

  return (
    <>
      <TopNavbar />
      {/* {loading ? (
        <span>loading...</span>
      ) : (
        <ul>
          {data?.tasks.map((task) => (
            <li key={task.id}>
              <h4>{task.name}</h4>
              <span>{task.status}</span>
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
}

export default App;
