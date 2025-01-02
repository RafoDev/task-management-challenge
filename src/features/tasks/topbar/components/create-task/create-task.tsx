import { Dialog, useDialog } from "../../../../../components/ui/dialog/dialog";
import PlusIcon from "/src/assets/icons/plus.svg?react";
import styles from "./create-task.module.scss";
import { PointEstimate, Status, TaskTag } from "../../../../../types";
import { useGetUsersQuery } from "../../../getUsers.generated";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema, CreateTaskValue } from "./create-task-schema";
import { useCreateTaskMutation } from "../../../createTask.generated";
import { toast } from "sonner";

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
  const { data: usersData, loading: usersLoading } = useGetUsersQuery();
  const [createTask, { data: mutationData, loading, error }] =
    useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskValue>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      status: Status.Todo,
    },
  });

  const onSubmit = (inputData: CreateTaskValue) => {
    createTask({
      variables: {
        input: {
          name: inputData.name,
          dueDate: inputData.dueDate,
          pointEstimate: inputData.pointEstimate,
          status: inputData.status,
          tags: inputData.tags,
          assigneeId: inputData.assigneeId,
        },
      },
    });

    if (mutationData) toast.success("Task has been created");

    closeDialog();
  };

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
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Task Name"
            className="name"
            {...register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}

          <select
            id="estimate"
            className="points"
            {...register("pointEstimate")}
          >
            <option value="" className="option">
              Estimate
            </option>
            {pointsEstimate.map((points) => (
              <option key={points.label} value={points.value}>
                {points.label}
              </option>
            ))}
          </select>
          {errors.pointEstimate && <span>{errors.pointEstimate.message}</span>}
          {errors.status && <span>{errors.status.message}</span>}

          <select
            id="assignee"
            className="assignee"
            {...register("assigneeId")}
          >
            <option value="" className="option">
              Assignee
            </option>
            {usersData?.users.map((user) => (
              <option key={user.id} value={user.id} className="option">
                {user.fullName}
              </option>
            ))}
          </select>
          {errors.assigneeId && <span>{errors.assigneeId.message}</span>}

          <select {...register("tags")} multiple className="tags">
            {tags.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </select>
          {errors.tags && <span>{errors.tags.message}</span>}

          <input type="date" {...register("dueDate")} />
          {errors.dueDate && <span>{errors.dueDate.message}</span>}

          <button type="submit">Create Task</button>
        </form>
      </Dialog>
    </>
  );
};
