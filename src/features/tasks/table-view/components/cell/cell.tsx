import { Status } from "../../../../../types";
import { useGetTasksQuery } from "../../../getTasks.generated";
import { TaskCard } from "../../../task-card/task-card";
import styles from "./cell.module.scss";

type CellType = {
  title: string;
  status: keyof typeof Status;
};

export const Cell = ({ title, status }: CellType) => {
  const { data, loading } = useGetTasksQuery({
    variables: { status: Status[status] },
  });
  if (loading) return <span>loading...</span>;

  return (
    <section className={styles.container}>
      <h2 className={`${styles.title} body-l-bold`}>
        {title} ({data?.tasks.length})
      </h2>
      <section className={styles.taskContainer}>
        {data?.tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </section>
    </section>
  );
};
