import { useRef, useState } from "react";
import { useOutsideClick } from "../../../../../../../shared/hooks/use-outside-click";
import styles from "./dropdown.module.scss";
import PenIcon from "/src/assets/icons/pen.svg?react";
import ThreeDotsIcon from "/src/assets/icons/three-dots.svg?react";
import TrashIcon from "/src/assets/icons/trash.svg?react";
import { TaskForm, useTaskForm } from "../../../../../task-form/task-form";
import { TaskCardType } from "../../../../kanban-view";

export const Dropdown = (props: TaskCardType) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isTaskFormOpen, openTaskForm, closeTaskForm } = useTaskForm();

  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const handleEditClick = () => {
    setIsOpen(false);
    openTaskForm();
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

          <li className={styles.option}>
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
