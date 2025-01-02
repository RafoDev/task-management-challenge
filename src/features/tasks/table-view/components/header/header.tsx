import styles from "./header.module.scss";

export const Header = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.row}>
          <th className={styles.cell}># Task Name</th>
          <th className={styles.cell}>Task Tags</th>
          <th className={styles.cell}>Estimate</th>
          <th className={styles.cell}>Task Assign Name</th>
          <th className={styles.cell}>Due Date</th>
        </tr>
      </thead>
    </table>
  );
};
