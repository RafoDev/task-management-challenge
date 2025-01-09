import { useState } from "react";
import { Row } from "../row/row";
import styles from "./cell.module.scss";
import ArrowDownIcon from "/src/assets/icons/arrow-down.svg?react";
import PlusIcon from "/src/assets/icons/plus.svg?react";
import ThreeDots from "/src/assets/icons/three-dots.svg?react";
import { TaskFieldsFragment } from "../../../graphql/fragments/taskFields.generated";

type CellProps = {
  title: string;
  tasks: TaskFieldsFragment[];
};

export const Cell = ({ title, tasks }: CellProps) => {
  const [open, setOpen] = useState(false);
  return (
    <section className={`${styles.container} ${open ? styles.containerOpen : ""} `} onClick={() => setOpen(!open)}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <figure className={`${styles.iconContainer} ${styles.arrowDown}`}>
            <ArrowDownIcon className={styles.icon} />
          </figure>

          <h2 className={`${styles.title} body-l-bold`}>
            {title}{" "}
            <span className={`${styles.count} body-l-bold`}>
              ({tasks.length})
            </span>
          </h2>
        </div>
        <section className={styles.options}>
          <figure className={styles.iconContainer}>
            <PlusIcon className={styles.icon} />
          </figure>
          <figure className={styles.iconContainer}>
            <ThreeDots className={styles.icon} />
          </figure>
        </section>
      </header>

      {open && (
        <section
          className={`${styles.taskContainer}`}
        >
          {tasks.map((task) => (
            <Row key={task.id} {...task} />
          ))}
        </section>
      )}
    </section>
  );
};
