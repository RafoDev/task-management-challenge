import { Status } from "../../../types";
import { TaskCard } from "../components/task-card/task-card";
import { GetTasksQuery } from "../getTasks.generated";
import styles from "./kanban-view.module.scss";
type KanbanViewType = {
  tasks: GetTasksQuery["tasks"];
  loading: boolean;
};

type KanbanColumns = "working" | "inprogress" | "completed";

const statusToColumnMap: Record<Status, KanbanColumns> = {
  [Status.Backlog]: "working",
  [Status.Todo]: "working",
  [Status.InProgress]: "inprogress",
  [Status.Done]: "completed",
  [Status.Cancelled]: "completed",
};

const getTasksByColumn = (
  tasks: KanbanViewType["tasks"],
  column: KanbanColumns
) => {
  return tasks.filter((task) => statusToColumnMap[task.status] === column);
};

const taskColumns: { title: string; label: KanbanColumns }[] = [
  {
    title: "Working",
    label: "working",
  },
  {
    title: "In Progress",
    label: "inprogress",
  },
  {
    title: "Completed",
    label: "completed",
  },
];

export const KanbanView = ({ tasks, loading }: KanbanViewType) => {
  if (loading) return <span>Loading...</span>;

  return (
    <div className={styles.container}>
      {taskColumns.map((column) => (
        <section key={column.title} className={styles.column}>
          <h2 className={`${styles.title} body-l-bold`}>{column.title}</h2>
          <section className={styles.taskContainer}>
            {getTasksByColumn(tasks, column.label).map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </section>
        </section>
      ))}
    </div>
  );
};
