import { Status } from "../../../types";
import { Kanban } from "./components/kanban/kanban";
import styles from "./kanban-view.module.scss";

const kanbans: { title: string; status: Status }[] = [
  {
    title: "Working",
    status: Status.Todo,
  },
  {
    title: "In Progress",
    status: Status.InProgress,
  },
  {
    title: "Completed",
    status: Status.Done,
  },
];

export const KanbanView = () => {
  return (
    <div className={styles.container}>
      {kanbans.map((kanban) => (
        <Kanban title={kanban.title} status={kanban.status} />
      ))}
    </div>
  );
};
