import { Dialog, useDialog } from "../../../../../components/ui/dialog/dialog";
import PlusIcon from "/src/assets/icons/plus.svg?react";
import styles from "./create-task.module.scss";

export const CreateTask = () => {
  const { closeDialog, isDialogOpen, openDialog } = useDialog();

  return (
    <>
      <button
        className={`${styles.button} ${styles.createButton}`}
        onClick={() => openDialog()}
      >
        <figure className={styles.iconContainer}>
          <PlusIcon className={styles.icon} />
        </figure>
      </button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        actions={<button onClick={() => closeDialog()}>Close</button>}
      >
        <form>
          <input type="text" placeholder="Task Name" />
        </form>
      </Dialog>
    </>
  );
};
