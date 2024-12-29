import { GetAllTasksQuery } from "../getTasks.generated";

type KanbanViewType = {
  tasks: GetAllTasksQuery["tasks"];
  loading: boolean;
};

export const KanbanView = ({ tasks, loading }: KanbanViewType) => {
  if (loading) return <span>Loading...</span>;
  return <span>{JSON.stringify(tasks)}</span>;
};
