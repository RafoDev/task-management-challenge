import { useGetKanbanTasksQuery } from "../graphql/queries/getKanbanTasks.generated";
import { Kanban } from "./components/kanban/kanban";
import styles from "./kanban-view.module.scss";

export const KanbanView = () => {
  const { data, loading } = useGetKanbanTasksQuery();
  if (loading) return <span>loading</span>;

  return (
    <div className={styles.container}>
      <Kanban title="Working" tasks={data?.todoTasks ?? []} />
      <Kanban title="In Progress" tasks={data?.inProgressTasks ?? []} />
      <Kanban title="Done" tasks={data?.doneTasks ?? []} />
    </div>
  );
};
