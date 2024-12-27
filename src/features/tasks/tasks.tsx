import { useGetAllTasksQuery } from "./getTasks.generated";

export const Tasks = () => {
  const { data, loading } = useGetAllTasksQuery();
  if (loading) return <span>loading...</span>;
  return (
    <div>
      {loading ? (
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
      )}
    </div>
  );
};
