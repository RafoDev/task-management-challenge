import GridIcon from "/src/assets/icons/dashboard.svg?react";
import ListIcon from "/src/assets/icons/list.svg?react";
import styles from "./topbar.module.scss";
import { useTaskLayout } from "../../../components/layouts/tasks-layout/tasks-layout";
import PlusIcon from "/src/assets/icons/plus.svg?react";
import { TaskForm, useTaskForm } from "../task-form";

export const Topbar = () => {
  const { toggleViewMode, viewMode } = useTaskLayout();
  const { isTaskFormOpen, openTaskForm, closeTaskForm } = useTaskForm();

  return (
    <nav className={styles.container}>
      <button
        className={
          viewMode === "table"
            ? `${styles.button} ${styles.buttonActive}`
            : `${styles.button}`
        }
        onClick={() => toggleViewMode()}
        disabled={viewMode === "table"}
      >
        <figure className={styles.iconContainer}>
          <ListIcon className={styles.icon} />
        </figure>
        <span className={`${styles.label} body-s-regular`}>Task</span>
      </button>
      <button
        className={
          viewMode === "kanban"
            ? `${styles.button} ${styles.buttonActive}`
            : `${styles.button}`
        }
        onClick={() => toggleViewMode()}
        disabled={viewMode === "kanban"}
      >
        <figure className={styles.iconContainer}>
          <GridIcon className={styles.icon} />
        </figure>
        <span className={`${styles.label} body-s-regular`}>Dashboard</span>
      </button>
      
      <button
        className={`${styles.button} ${styles.create}`}
        onClick={() => openTaskForm()}
      >
        <PlusIcon className={styles.icon} />
      </button>

      <TaskForm
        isTaskFormOpen={isTaskFormOpen}
        openTaskForm={openTaskForm}
        closeTaskForm={closeTaskForm}
      />
    </nav>
  );
};
