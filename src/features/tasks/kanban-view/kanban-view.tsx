import { TaskCard } from "../components/task-card/task-card";
import { GetTasksQuery } from "../getTasks.generated";

type KanbanViewType = {
  tasks: GetTasksQuery["tasks"];
  loading: boolean;
};

export const KanbanView = ({ tasks, loading }: KanbanViewType) => {
  if (loading) return <span>Loading...</span>;
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard {...task} />
      ))}
    </div>
  );
};
