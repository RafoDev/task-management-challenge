import { useTaskLayout } from "../../components/layouts/tasks-layout/tasks-layout";
import { useGetKanbanTasksQuery } from "./graphql/queries/getKanbanTasks.generated";
import { KanbanView } from "./kanban-view/kanban-view";
import { TableView } from "./table-view/table-view";

export const Tasks = () => {
  const { viewMode } = useTaskLayout();

  const { data, loading } = useGetKanbanTasksQuery();
  if (loading) return <span>loading</span>;

  return viewMode === "kanban" ? (
    <KanbanView tasks={data} />
  ) : (
    <TableView tasks={data} />
  );
};
