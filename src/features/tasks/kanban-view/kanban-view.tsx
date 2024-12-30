import { Status } from "../../../types";
import { Kanban } from "./components/kanban/kanban";
import styles from "./kanban-view.module.scss";

const kanbans: { title: string; status: keyof typeof Status }[] = [
  {
    title: "Working",
    status: "Todo",
  },
  {
    title: "In Progress",
    status: "InProgress",
  },
  {
    title: "Completed",
    status: "Done",
  },
];

export const KanbanView = () => {
  return (
    <div className={styles.container}>
      {kanbans.map(({ title, status }) => (
        <Kanban key={title} title={title} status={status} />
      ))}
    </div>
  );
};
