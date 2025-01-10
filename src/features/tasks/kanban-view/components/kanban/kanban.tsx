import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskFieldsFragment } from "../../../graphql/fragments/taskFields.generated";
import { TaskCard } from "../task-card/task-card";
import styles from "./kanban.module.scss";

type KanbanProps = {
  id: string;
  title: string;
  tasks: TaskFieldsFragment[];
};

export const Kanban = ({ id, title, tasks = [] }: KanbanProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "container",
      containerId: id,
    },
  });

  const taskContainerClass = isOver
    ? `${styles.taskContainer} ${styles.isOver}`
    : styles.taskContainer;

  return (
    <section ref={setNodeRef} className={styles.container}>
      <h2 className={`${styles.title} body-l-bold`}>
        {title} ({tasks.length})
      </h2>
      <SortableContext
        id={id}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <section className={taskContainerClass}>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} {...task} index={index} containerId={id} />
          ))}
        </section>
      </SortableContext>
    </section>
  );
};
