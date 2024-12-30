import styles from "./row.module.scss";
import ConnectionsIcon from "/src/assets/icons/connections.svg?react";
import CommentsIcon from "/src/assets/icons/comments.svg?react";
import { GetTasksQuery } from "../../../getTasks.generated";
import { formatDate } from "../../../utils/format-date";
import { Avatar, Tags } from "../../../../../components/ui";
import { formatEstimatedPoints } from "../../../utils";

type RowType = GetTasksQuery["tasks"][number];

export const Row = (props: RowType) => {
  const points = formatEstimatedPoints(props.pointEstimate);
  const formattedDueDate = formatDate(props.dueDate);

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h4 className={`${styles.name} body-l-bold`}>
          {props.position} {props.name}
        </h4>
        <div className={styles.reactions}>
          <div className={styles.connection}>
            <span className="body-m-bold">5</span>
            <ConnectionsIcon className={styles.reactionIcon} />
          </div>
          <div className={styles.comments}>
            <span className="body-m-bold">5</span>
            <CommentsIcon className={styles.reactionIcon} />
          </div>
          <span>Details</span>
        </div>
        {/* <figure className={styles.options}>
          <ThreeDotsIcon className={styles.optionsIcon} />
        </figure> */}
      </header>

      {/* <div className={styles.tags}>
        {props.tags.map((tag) => (
          <Tag key={tag} style={tag}>
            <span className={"body-m-bold"}>{tag}</span>
          </Tag>
        ))}
      </div> */}
      <Tags tags={props.tags} className={styles.tags} />

      <span className={`${styles.points} body-m-bold`}>{points} Points</span>

      <article className={styles.assignee}>
        <Avatar
          id={props.assignee?.id || ""}
          avatar={props.assignee?.avatar}
          fullName={props.assignee?.fullName || ""}
          size="s"
        />
        <span className={styles.assigneeName}>{props.assignee?.fullName}</span>
      </article>

      {/* <div className={styles.content}>
        <Tag style={"neutral"}>
          <TimerIcon className={styles.timerIcon} />
        </Tag>
      </div> */}

      <span className={`${styles.dueDate} body-m-regular`}>
        {formattedDueDate}
      </span>
    </article>
  );
};
