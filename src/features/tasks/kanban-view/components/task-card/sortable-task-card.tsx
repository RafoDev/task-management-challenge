import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskFieldsFragment } from "../../../graphql/fragments/taskFields.generated";
import { TaskCard } from "./task-card";
import styles from "./sortable-task.module.scss";

interface SortableTaskCardProps extends TaskFieldsFragment {
  containerId: string;
}

export const SortableTaskCard = ({
  containerId,
  ...props
}: SortableTaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    data: {
      containerId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? styles.dragging : ""}
      {...attributes}
      {...listeners}
    >
      <TaskCard {...props} />
    </div>
  );
};
