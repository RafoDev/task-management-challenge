import { useTasks } from "../context/tasks-context";
import { GetTasksQuery } from "../graphql/queries/getTasks.generated";
import { KanbanView } from "../kanban-view/kanban-view";
import { TableView } from "../table-view/table-view";

export const ViewMode = ({ tasks }: { tasks: GetTasksQuery | undefined }) => {
  const { viewMode } = useTasks();

  return viewMode === "kanban" ? (
    <KanbanView tasks={tasks} />
  ) : (
    <TableView tasks={tasks} />
  );
};