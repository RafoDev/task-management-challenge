import { useRef, useState } from "react";
import { useOutsideClick } from "../../../../../../../shared/hooks/use-outside-click";
import styles from "./dropdown.module.scss";
import PenIcon from "/src/assets/icons/pen.svg?react";
import ThreeDotsIcon from "/src/assets/icons/three-dots.svg?react";
import TrashIcon from "/src/assets/icons/trash.svg?react";
import { TaskForm, useTaskForm } from "../../../../../task-form/task-form";
import {
  DeleteTaskDialog,
  useConfirmationDialog,
} from "../../../../../delete-task-dialog/delete-task-dialog";
import { TaskFieldsFragment } from "../../../../../graphql/fragments/taskFields.generated";

export const Dropdown = (props: TaskFieldsFragment) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isTaskFormOpen, openTaskForm, closeTaskForm } = useTaskForm();
  const {
    isVisible: isConfirmationDialogVisible,
    show: showConfirmationDialog,
    hide: hideConfirmationDialog,
  } = useConfirmationDialog();

  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const handleEditClick = () => {
    setIsOpen(false);
    openTaskForm();
  };
  const handleDeleteClick = () => {
    setIsOpen(false);
    showConfirmationDialog();
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

          <li className={styles.option} onClick={handleDeleteClick}>
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
      <DeleteTaskDialog
        taskId={props.id}
        taskName={props.name}
        isVisible={isConfirmationDialogVisible}
        onClose={hideConfirmationDialog}
        onOpen={showConfirmationDialog}
      />
    </div>
  );
};
