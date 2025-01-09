import styles from "./row.module.scss";
import ConnectionsIcon from "/src/assets/icons/connections.svg?react";
import CommentsIcon from "/src/assets/icons/comments.svg?react";
import { formatDate } from "../../../utils/format-date";
import { Avatar, Tags } from "../../../../../components/ui";
import { formatEstimatedPoints } from "../../../utils";
import { TaskFieldsFragment } from "../../../graphql/fragments/taskFields.generated";

export const Row = (props: TaskFieldsFragment) => {
  const points = formatEstimatedPoints(props.pointEstimate);
  const formattedDueDate = formatDate(props.dueDate);

  return (
    <article className={`${styles.container}  animate__animated animate__slideInDown`}>
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
      </header>

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

      <span className={`${styles.dueDate} body-m-regular`}>
        {formattedDueDate}
      </span>
    </article>
  );
};
