import { Dialog, useDialog } from "../../../../../components/ui/dialog/dialog";
import PlusIcon from "/src/assets/icons/plus.svg?react";
import styles from "./create-task.module.scss";
import { PointEstimate, TaskTag } from "../../../../../types";
import { useGetUsersQuery } from "../../../getUsers.generated";

const pointsEstimate: { value: PointEstimate; label: string }[] = [
  { value: PointEstimate.One, label: "1 Points" },
  { value: PointEstimate.Two, label: "2 Points" },
  { value: PointEstimate.Four, label: "4 Points" },
  { value: PointEstimate.Eight, label: "8 Points" },
];

const tags: { value: TaskTag; label: string }[] = [
  { value: TaskTag.Android, label: "Android" },
  { value: TaskTag.Ios, label: "IOS" },
  { value: TaskTag.NodeJs, label: "NodeJS" },
  { value: TaskTag.Rails, label: "Rails" },
  { value: TaskTag.React, label: "React" },
];

export const CreateTask = () => {
  const { closeDialog, isDialogOpen, openDialog } = useDialog();
  const { data, loading } = useGetUsersQuery();

  return (
    <>
      <button
        className={`${styles.button} ${styles.createButton}`}
        onClick={() => openDialog()}
      >
        <PlusIcon className={styles.icon} />
      </button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        actions={<button onClick={() => closeDialog()}>Close</button>}
      >
        <form className="form">
          <input type="text" placeholder="Task Name" className="name" />
          <select name="estimate" id="estimate" className="points">
            <option value="" className="option">
              Estimate
            </option>
            {pointsEstimate.map((points) => (
              <option value={points.label}>{points.label}</option>
            ))}
          </select>
          <select name="assignee" id="assignee" className="assignee">
            <option value="" className="option">
              Assignee
            </option>
            {data?.users.map((user) => (
              <option value={user.id} className="option">
                {user.fullName}
              </option>
            ))}
          </select>
          <select name="tags" id="tags" className="tags">
            {tags.map((tag) => (
              <option value={tag.value} className="option">
                {tag.label}
              </option>
            ))}
          </select>
          <input type="date" />
        </form>
      </Dialog>
    </>
  );
};
