import { TaskFieldsFragment } from "../../../graphql/fragments/taskFields.generated";
import { TaskCard } from "../task-card/task-card";
import styles from "./kanban.module.scss";

type KanbanProps = {
  title: string;
  tasks: TaskFieldsFragment[];
};

export const Kanban = ({ title, tasks = [] }: KanbanProps) => {
  
  return (
    <section className={styles.container}>
      <h2 className={`${styles.title} body-l-bold`}>
        {title} ({tasks.length})
      </h2>
      <section className={styles.taskContainer}>
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </section>
    </section>
  );
};
