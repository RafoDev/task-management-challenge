import { KanbanView } from "./kanban-view/kanban-view";
import { TableView } from "./table-view/table-view";
import { ViewModes } from "./types";

export const Tasks = ({ viewMode }: { viewMode: ViewModes }) => {
  return viewMode === "kanban" ? <KanbanView /> : <TableView />;
};
