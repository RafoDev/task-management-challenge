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
  const [createTask] = useCreateTaskMutation({
    update(cache, { data }) {
      if (!data?.createTask) return;
      const newTask = data.createTask;
      cache.modify({
        fields: {
          tasks(existingTaskRefs = [], { toReference }) {
            const newTaskRef = toReference(newTask);
            return [...existingTaskRefs, newTaskRef];
          },
        },
      });
    },
  });

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
      onCompleted: () => {
        toast.success("Task has been created");
      },
    });
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

      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Task Name"
            className={styles.name}
            {...register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}

          <select
            id="estimate"
            className={styles.select}
            {...register("pointEstimate")}
          >
            <option value="" className={styles.option}>
              Estimate
            </option>
            {pointsEstimate.map((points) => (
              <option key={points.label} value={points.value} className={styles.option}>
                {points.label}
              </option>
            ))}
          </select>
          {errors.pointEstimate && <span>{errors.pointEstimate.message}</span>}

          <select
            id="assignee"
            className={styles.select}
            {...register("assigneeId")}
          >
            <option value="" className={styles.option}>
              Assignee
            </option>
            {usersData?.users.map((user) => (
              <option key={user.id} value={user.id} className={styles.option}>
                {user.fullName}
              </option>
            ))}
          </select>
          {errors.assigneeId && <span>{errors.assigneeId.message}</span>}

          <select {...register("tags")} className={styles.select}>
            {tags.map((tag) => (
              <option key={tag.value} value={tag.value} className={styles.option}>
                {tag.label}
              </option>
            ))}
          </select>
          {errors.tags && <span>{errors.tags.message}</span>}

          <input type="date" {...register("dueDate")} className={styles.date} />
          {errors.dueDate && <span>{errors.dueDate.message}</span>}

          <footer className={styles.buttons}>
            <button onClick={() => closeDialog()} className={styles.close}>
              Close
            </button>
            <button type="submit" className={styles.create}>
              Create Task
            </button>
          </footer>
        </form>
      </Dialog>
    </>
  );
};
