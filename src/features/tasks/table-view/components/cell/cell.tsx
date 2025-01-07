import { useState } from "react";
import { Status } from "../../../../../types";
import { Row } from "../row/row";
import styles from "./cell.module.scss";
import ArrowDownIcon from "/src/assets/icons/arrow-down.svg?react";
import PlusIcon from "/src/assets/icons/plus.svg?react";
import ThreeDots from "/src/assets/icons/three-dots.svg?react";
import { useGetAllTasksQuery } from "../../../graphql/queries/getTasks.generated";

type CellType = {
  title: string;
  status: keyof typeof Status;
};

export const Cell = ({ title, status }: CellType) => {
  const { data, loading } = useGetAllTasksQuery({
    variables: { status: Status[status] },
  });

  const [open, setOpen] = useState(false);

  if (loading) return <span>loading...</span>;

  return (
    <section
      className={`${styles.container} ${open ? styles.containerOpen : ""}`}
      onClick={() => setOpen(!open)}
    >
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <figure className={`${styles.iconContainer} ${styles.arrowDown}`}>
            <ArrowDownIcon className={styles.icon} />
          </figure>

          <h2 className={`${styles.title} body-l-bold`}>
            {title}{" "}
            <span className={`${styles.count} body-l-bold`}>
              ({data?.tasks.length})
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

      <section className={styles.taskContainer}>
        {data?.tasks.map((task) => (
          <Row key={task.id} {...task} />
        ))}
      </section>
    </section>
  );
};
