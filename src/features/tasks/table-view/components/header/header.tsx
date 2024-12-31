import styles from "./header.module.scss";

export const Header = () => {
  return (
    <div className={`${styles.container} body-m-regular`}>
      <span className={styles.column}>Task Name</span>
      <span className={styles.column}>Task Tags</span>
      <span className={styles.column}>Estimate</span>
      <span className={styles.column}>Task Assign Name</span>
      <span className={styles.column}>Due Date</span>
    </div>
  );
};
