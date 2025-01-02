import { useTaskLayout } from "../../components/layouts/tasks-layout/tasks-layout";
import { KanbanView } from "./kanban-view/kanban-view";
import { TableView } from "./table-view/table-view";

export const Tasks = () => {
  const { viewMode } = useTaskLayout();

  return viewMode === "kanban" ? <KanbanView /> : <TableView />;
};
