import { Status } from "../../../../../types";
import { GetTasksQuery, useGetTasksQuery } from "../../../getTasks.generated";
import { TaskCard } from "../../../task-card/task-card";
import styles from "./kanban.module.scss";

type KanbanType = {
  title: string;
  status: Status;
};

export const Kanban = ({ title, status }: KanbanType) => {
  const { data, loading } = useGetTasksQuery();

  return (
    <section className={styles.container}>
      <h2 className={`${styles.title} body-l-bold`}>{title}</h2>
      <section className={styles.taskContainer}>
        {data?.tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </section>
    </section>
  );
};
