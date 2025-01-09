import { useTaskLayout } from "../../components/layouts/tasks-layout/tasks-layout";
import { GetKanbanTasksQuery } from "./graphql/queries/getKanbanTasks.generated";
import { KanbanView } from "./kanban-view/kanban-view";
import { TableView } from "./table-view/table-view";

export const Tasks = ({
  tasks,
}: {
  tasks: GetKanbanTasksQuery | undefined;
}) => {
  const { viewMode } = useTaskLayout();

  return viewMode === "kanban" ? (
    <KanbanView tasks={tasks} />
  ) : (
    <TableView tasks={tasks} />
  );
};
