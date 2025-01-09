import { useState } from "react";
import Dialog from "../../../components/ui/dialog/dialog";
import { useDeleteTaskMutation } from "../graphql/mutations/deleteTask.generated";
import { toast } from "sonner";
import styles from "./delete-task-dialog.module.scss";
import TrashIcon from "/src/assets/icons/trash.svg?react";
import { Reference } from "@apollo/client";

export const useConfirmationDialog = () => {
  const [isVisible, setIsVisible] = useState(false);

  return {
    isVisible,
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
  };
};

type TaskRef = {
  id: string;
  [key: string]: unknown;
};

type CacheFields = {
  tasks: TaskRef[];
};

type ReadFieldFunction = <T>(fieldName: string, taskRef: TaskRef) => T;

type DeleteTaskDialogProps = {
  taskId: string;
  taskName: string;
  isVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const DeleteTaskDialog = ({
  taskId,
  taskName,
  isVisible,
  onClose,
  onOpen,
}: DeleteTaskDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTask] = useDeleteTaskMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          tasks(existingTasks: ReadonlyArray<Reference> = [], { readField }) {
            return existingTasks.filter(
              (taskRef) => readField("id", taskRef) !== data?.deleteTask.id
            );
          },
        },
      });
    },
  });

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true);
      await deleteTask({
        variables: {
          input: {
            id: taskId,
          },
        },
      });
      toast.success(`Task ${taskName} has been deleted`);
      onClose();
    } catch (error) {
      toast.error(`Failed to delete task. Please try again.`);
      console.error("Delete task error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isVisible} onOpen={onOpen} onClose={onClose}>
      <Dialog.Content>
        <div className={styles.container}>
          <header className={styles.header}>
            <TrashIcon className={styles.icon} />
            <h2 className={`${styles.title} body-xl-bold`}>Delete task</h2>
          </header>

          <main className={styles.main}>
            <p className={`${styles.explanation} body-m-regular`}>
              Are you sure you want to delete "{taskName}"?
              <br />
              This action is permanent and cannot be recovered.
            </p>
          </main>
          <footer className={styles.buttons}>
            <button
              className={`${styles.button} body-m-regular`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`${styles.button} ${styles.buttonConfirm} body-m-regular`}
              onClick={handleDeleteTask}
            >
              {isDeleting ? "Deleting..." : "I understand, delete the task"}
            </button>
          </footer>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
