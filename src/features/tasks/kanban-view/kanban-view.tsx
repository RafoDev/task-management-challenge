import { GetKanbanTasksQuery } from "../graphql/queries/getKanbanTasks.generated";
import { Kanban } from "./components/kanban/kanban";
import styles from "./kanban-view.module.scss";

export type KanbanViewProps = { tasks: GetKanbanTasksQuery | undefined };

export const KanbanView = ({ tasks }: KanbanViewProps) => {
  return (
    <div className={styles.container}>
      <Kanban title="Working" tasks={tasks?.todoTasks ?? []} />
      <Kanban title="In Progress" tasks={tasks?.inProgressTasks ?? []} />
      <Kanban title="Done" tasks={tasks?.doneTasks ?? []} />
    </div>
  );
};
