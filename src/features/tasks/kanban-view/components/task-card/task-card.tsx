import styles from "./task-card.module.scss";
import TimerIcon from "/src/assets/icons/timer.svg?react";
import AttachIcon from "/src/assets/icons/attach.svg?react";
import ConnectionsIcon from "/src/assets/icons/connections.svg?react";
import CommentsIcon from "/src/assets/icons/comments.svg?react";
import { Avatar } from "../../../../../components/ui";
import { Tag } from "../../../../../components/ui/tag/tag";
import { formatDate, formatEstimatedPoints } from "../../../utils";
import { Dropdown } from "./components/dropdown/dropdown";
import { TaskFieldsFragment } from "../../../graphql/fragments/taskFields.generated";

export const TaskCard = (props: TaskFieldsFragment) => {
  const points = formatEstimatedPoints(props.pointEstimate);
  const formattedDueDate = formatDate(props.dueDate);

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h4 className={`${styles.name} body-l-bold`}>{props.name}</h4>
        <Dropdown {...props} />
      </header>

      <div className={styles.content}>
        <span className={`${styles.points} body-m-bold`}>{points} Pts</span>
        <Tag style={"neutral"}>
          <TimerIcon className={styles.timerIcon} />
          <span className={`${styles.dueDate} body-m-bold`}>
            {formattedDueDate}
          </span>
        </Tag>
      </div>

      <div className={styles.tags}>
        {props.tags.map((tag) => (
          <Tag key={tag} style={tag}>
            <span className={"body-m-bold"}>{tag}</span>
          </Tag>
        ))}
      </div>

      <footer className={styles.footer}>
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
