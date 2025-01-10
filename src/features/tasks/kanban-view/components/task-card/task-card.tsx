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
  });

  const points = formatEstimatedPoints(props.pointEstimate);
  const formattedDueDate = formatDate(props.dueDate);
  const animationClass = "animate__animated animate__fadeIn";

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`${styles.container}`}
      data-task-id={props.id}
      {...attributes}
      {...listeners}
    >
      <header className={`${styles.header}`}>
        <h4 className={`${styles.name} ${animationClass} body-l-bold`}>
          {props.name}
        </h4>
        <TaskDropdown {...props} />
      </header>

      <div className={`${styles.content} ${animationClass}`}>
        <span className={`${styles.points} body-m-bold`}>{points} Pts</span>
        <Tag style={"neutral"}>
          <TimerIcon className={styles.timerIcon} />
          <span className={`${styles.dueDate} body-m-bold`}>
            {formattedDueDate}
          </span>
        </Tag>
      </div>

      <div className={`${styles.tags} ${animationClass}`}>
        {props.tags.map((tag) => (
          <Tag key={tag} style={tag}>
            <span className={"body-m-bold"}>{tag}</span>
          </Tag>
        ))}
      </div>

      <footer className={`${styles.footer} ${animationClass}`}>
        <Avatar
          id={props.assignee?.id || ""}
          avatar={props.assignee?.avatar}
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
