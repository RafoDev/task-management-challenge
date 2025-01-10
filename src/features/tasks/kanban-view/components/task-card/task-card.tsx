import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskFieldsFragment } from "../../../graphql/fragments/taskFields.generated";
import styles from "./task-card.module.scss";
import TimerIcon from "/src/assets/icons/timer.svg?react";
import AttachIcon from "/src/assets/icons/attach.svg?react";
import ConnectionsIcon from "/src/assets/icons/connections.svg?react";
import CommentsIcon from "/src/assets/icons/comments.svg?react";
import { Avatar } from "../../../../../components/ui";
import { Tag } from "../../../../../components/ui/tag/tag";
import { formatDate, formatEstimatedPoints } from "../../../utils";
import { TaskDropdown } from "./components/task-dropdown/task-dropdown";

type TaskCardProps = TaskFieldsFragment & {
  index: number;
  containerId: string;
  isDragOverlay?: boolean;
};

export const TaskCard = (props: TaskCardProps) => {
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
      type: "task",
      task: props,
      containerId: props.containerId,
      position: props.index,
    },
    disabled: props.isDragOverlay,
  });

  const points = formatEstimatedPoints(props.pointEstimate);
  const formattedDueDate = formatDate(props.dueDate);
  const animationClass = "animate__animated";

  const style = {
    transform: props.isDragOverlay
      ? `scale(1.05) ${CSS.Transform.toString(
          transform || { x: 0, y: 0, scaleX: 1, scaleY: 1 }
        )}`
      : CSS.Transform.toString(transform),
    transition: props.isDragOverlay ? "none" : transition,
    opacity: isDragging ? 0 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    boxShadow: props.isDragOverlay ? "0 0 15px rgba(0, 0, 0, 0.1)" : undefined,
  };

  const dragAttributes = {
    ...attributes,
    ...listeners,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`${styles.container}`}
      data-task-id={props.id}
    >
      <header className={`${styles.header}`} {...dragAttributes}>
        <h4 className={`${styles.name} ${animationClass} body-l-bold`}>
          {props.name}
        </h4>
      </header>
      {!props.isDragOverlay && (
        <div className={styles.dropdown}>
          <TaskDropdown {...props} />
        </div>
      )}

      <div
        className={`${styles.content} ${animationClass}`}
        {...dragAttributes}
      >
        <span className={`${styles.points} body-m-bold`}>{points} Pts</span>
        <Tag style={"neutral"}>
          <TimerIcon className={styles.timerIcon} />
          <span className={`${styles.dueDate} body-m-bold`}>
            {formattedDueDate}
          </span>
        </Tag>
      </div>

      <div className={`${styles.tags} ${animationClass}`} {...dragAttributes}>
        {props.tags.map((tag) => (
          <Tag key={tag} style={tag}>
            <span className={"body-m-bold"}>{tag}</span>
          </Tag>
        ))}
      </div>

      <footer
        className={`${styles.footer} ${animationClass}`}
        {...dragAttributes}
      >
        <Avatar
          avatar={props.assignee?.avatar || ""}
          fullName={props.assignee?.fullName || ""}
          size="s"
        />
        <div className={styles.reactions}>
          <AttachIcon className={styles.reactionIcon} />
          <div className={styles.connection}>
            <span className="body-m-bold">5</span>
            <ConnectionsIcon className={styles.reactionIcon} />
          </div>
          <div className={styles.comments}>
            <span className="body-m-bold">5</span>
            <CommentsIcon className={styles.reactionIcon} />
          </div>
        </div>
      </footer>
    </article>
  );
};
