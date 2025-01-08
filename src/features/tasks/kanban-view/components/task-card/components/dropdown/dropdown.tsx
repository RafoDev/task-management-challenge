import { useRef, useState } from "react";
import { useOutsideClick } from "../../../../../../../shared/hooks/use-outside-click";
import styles from "./dropdown.module.scss";
import PenIcon from "/src/assets/icons/pen.svg?react";
import ThreeDotsIcon from "/src/assets/icons/three-dots.svg?react";
import TrashIcon from "/src/assets/icons/trash.svg?react";
import { TaskForm, useTaskForm } from "../../../../../task-form/task-form";
import { TaskCardType } from "../../../../kanban-view";
import { useDeleteTaskMutation } from "../../../../../graphql/mutations/deleteTask.generated";
import { toast } from "sonner";

export const Dropdown = (props: TaskCardType) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isTaskFormOpen, openTaskForm, closeTaskForm } = useTaskForm();

  const [deleteTask] = useDeleteTaskMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          tasks(existingTasks = [], { readField }) {
            return existingTasks.filter(
              (taskRef: any) => readField("id", taskRef) !== data?.deleteTask.id
            );
          },
        },
      });
    },
  });
  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const handleEditClick = () => {
    setIsOpen(false);
    openTaskForm();
  };

  const handleDeleteTask = async (taskId: string) => {
    setIsOpen(false);
    try {
      await deleteTask({
        variables: {
          input: {
            id: taskId,
          },
        },
      });
      toast.success("Task has been deleted");
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <ThreeDotsIcon className={styles.icon} />
      </button>
      {isOpen && (
        <ul className={styles.options}>
          <li className={styles.option} onClick={handleEditClick}>
            <PenIcon className={styles.icon} />
            <span className={`${styles.label} body-m-regular`}>Edit</span>
          </li>

          <li
            className={styles.option}
            onClick={() => {
              handleDeleteTask(props.id);
            }}
          >
            <TrashIcon className={styles.icon} />
            <span className={styles.label}>Delete</span>
          </li>
        </ul>
      )}
      <TaskForm
        initialData={props}
        isTaskFormOpen={isTaskFormOpen}
        openTaskForm={openTaskForm}
        closeTaskForm={closeTaskForm}
      />
    </div>
  );
};
