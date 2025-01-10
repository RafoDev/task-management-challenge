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
  isReceiving?: boolean;
};

export const Kanban = ({ id, title, tasks = [], isReceiving }: KanbanProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "container",
      containerId: id,
    },
  });

  const taskContainerClass = `${styles.taskContainer} ${
    isOver ? styles.isOver : ""
  } ${isReceiving ? styles.receiving : ""}`;

  return (
    <section className={styles.container}>
      <h2 className={`${styles.title} body-l-bold`}>
        {title} ({tasks.length})
      </h2>
      <SortableContext
        id={id}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <section
          className={taskContainerClass}
          ref={setNodeRef}
          data-droppable-id={id}
        >
          {tasks.map((task, index) => (
            <TaskCard key={task.id} {...task} index={index} containerId={id} />
          ))}
          {tasks.length === 0 && (
            <div className={styles.emptyState}>
              <span className={styles.emptyMessage}>
                No tasks yet. Create one!
              </span>
            </div>
          )}
        </section>
      </SortableContext>
    </section>
  );
};
