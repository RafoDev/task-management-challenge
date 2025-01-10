import ThreeDotsIcon from "/src/assets/icons/three-dots.svg?react";
import PenIcon from "/src/assets/icons/pen.svg?react";
import TrashIcon from "/src/assets/icons/trash.svg?react";
import Dropdown from "../../../../../../../components/ui/dropdown/dropdown";
import { TaskFieldsFragment } from "../../../../../graphql/fragments/taskFields.generated";
import {
  DeleteTaskDialog,
  useConfirmationDialog,
} from "../../../../../delete-task-dialog/delete-task-dialog";
import styles from "./task-dropdown.module.scss";
import { TaskForm, useTaskForm } from "../../../../../task-form";

export const TaskDropdown = (props: TaskFieldsFragment) => {
  const { isTaskFormOpen, openTaskForm, closeTaskForm } = useTaskForm();
  const {
    isVisible: isConfirmationDialogVisible,
    show: showConfirmationDialog,
    hide: hideConfirmationDialog,
  } = useConfirmationDialog();

  const handleEditClick = () => {
    openTaskForm();
  };

  const handleDeleteClick = () => {
    showConfirmationDialog();
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger asChild>
          <button className={styles.trigger}>
            <ThreeDotsIcon className={styles.icon} />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onClick={handleEditClick}>
            <PenIcon className={styles.icon} />
            <span className={styles.label}>Edit</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteClick}>
            <TrashIcon className={styles.icon} />
            <span className={styles.label}>Delete</span>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

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
    </>
  );
};
