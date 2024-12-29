import { Avatar } from "../../../../components/ui";
import { GetTasksQuery } from "../../getTasks.generated";
import styles from "./task-card.module.scss";
import ThreeDotsIcon from "/src/assets/icons/three-dots.svg?react";
import TimerIcon from "/src/assets/icons/timer.svg?react";
import AttachIcon from "/src/assets/icons/attach.svg?react";
import ConnectionsIcon from "/src/assets/icons/connections.svg?react";
import CommentsIcon from "/src/assets/icons/comments.svg?react";
import { PointEstimate } from "../../../../types";

type TaskCardType = GetTasksQuery["tasks"][number];

export const PointEstimateValues: Record<PointEstimate, number> = {
  [PointEstimate.Eight]: 8,
  [PointEstimate.Four]: 4,
  [PointEstimate.One]: 1,
  [PointEstimate.Two]: 2,
  [PointEstimate.Zero]: 0,
};

export const TaskCard = (props: TaskCardType) => {
  const points = PointEstimateValues[props.pointEstimate];
  return (
    <article className={styles.container}>
      <div className={styles.header}>
        <h4 className={`${styles.name} body-l-bold`}>{props.name}</h4>
        <figure className={styles.options}>
          <ThreeDotsIcon className={styles.optionsIcon} />
        </figure>
      </div>
      <div className={styles.content}>
        <span className={`${styles.points} body-m-bold`}>{points} Pts</span>
        <span className={styles.timer}>
          <TimerIcon className={styles.timerIcon} />
          <span className={styles.dueDate}>{props.dueDate}</span>
        </span>
      </div>
      <ul className={styles.tags}>
        {props.tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <Avatar
          id={props.assignee?.id || ""}
          avatar={props.assignee?.avatar}
          fullName={props.assignee?.fullName || ""}
        />
        <div className={styles.reactions}>
          <AttachIcon className={styles.reactionIcon} />
          <div className={styles.connection}>
            5 <ConnectionsIcon className={styles.reactionIcon} />
          </div>
          <div className={styles.comments}>
            5 <CommentsIcon className={styles.reactionIcon} />
          </div>
        </div>
      </div>
    </article>
  );
};
