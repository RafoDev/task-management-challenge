import styles from "./table-view.module.scss";

import { GetTasksQuery } from "../getTasks.generated";
import { Status } from "../../../types";

type KanbanViewType = {
  tasks: GetTasksQuery["tasks"];
  loading: boolean;
};

const statusToColumnMap: Record<Status, KanbanColumns> = {
  [Status.Backlog]: "working",
  [Status.Todo]: "working",
  [Status.InProgress]: "inprogress",
  [Status.Done]: "completed",
  [Status.Cancelled]: "completed",
};

export const TableView = () => {
  return <div>table-view</div>;
};
