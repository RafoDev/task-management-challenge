import { GetKanbanTasksQuery } from "../graphql/queries/getKanbanTasks.generated";
import { Cell } from "./components/cell/cell";
import { Header } from "./components/header/header";
import styles from "./table-view.module.scss";

export type TableViewProps = { tasks: GetKanbanTasksQuery | undefined };

export const TableView = ({ tasks }: TableViewProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <Cell title="Working" tasks={tasks?.todoTasks ?? []} />
      <Cell title="In Progress" tasks={tasks?.inProgressTasks ?? []} />
      <Cell title="Done" tasks={tasks?.doneTasks ?? []} />
    </div>
  );
};
