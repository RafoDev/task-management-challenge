import { Dialog, useDialog } from "../../../../../components/ui/dialog/dialog";
import PlusIcon from "/src/assets/icons/plus.svg?react";
import styles from "./create-task.module.scss";
import { PointEstimate, Status, TaskTag } from "../../../../../types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema, CreateTaskValue } from "./create-task-schema";
import { toast } from "sonner";
import Select from "../../../../../components/ui/select";
import DatePicker from "../../../../../components/ui/date-picker/date-picker";
import { useCreateTaskMutation } from "../../../graphql/queries/createTask.generated";
import { useGetUsersQuery } from "../../../graphql/queries/getUsers.generated";

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
  const { data: usersData } = useGetUsersQuery();

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
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateTaskValue>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      status: Status.Todo,
      tags: [],
    },
    mode: "onChange",
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
            className={`${styles.name} body-xl-bold`}
            {...register("name")}
          />

          {errors.name && <span>{errors.name.message}</span>}

          <Controller
            name="pointEstimate"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={errors.pointEstimate?.message}
                placeholder="Estimate"
                className={styles.select}
              >
                <Select.Label>Estimate Pts</Select.Label>
                {pointsEstimate.map((points) => (
                  <Select.Option key={points.value} value={points.value}>
                    {points.label}
                  </Select.Option>
                ))}
              </Select>
            )}
          />

          {errors.pointEstimate && <span>{errors.pointEstimate.message}</span>}

          {usersData && (
            <Controller
              name="assigneeId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  error={errors.assigneeId?.message}
                  placeholder="Assignee"
                  className={styles.select}
                >
                  <Select.Label>Assign To...</Select.Label>

                  {usersData.users.map((user) => (
                    <Select.Option key={user.id} value={user.id}>
                      {user.fullName}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          )}

          <Controller
            name="tags"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Select
                {...field}
                value={value || []}
                onChange={onChange}
                error={errors.tags?.message}
                placeholder="Label"
                className={styles.select}
                multiple
              >
                <Select.Label>Tag Title</Select.Label>

                {tags.map((tag) => (
                  <Select.CheckboxOption key={tag.value} value={tag.value}>
                    {tag.label}
                  </Select.CheckboxOption>
                ))}
              </Select>
            )}
          />
          {errors.tags && <span>{errors.tags.message}</span>}

          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                selected={value ? new Date(value) : null}
                onChange={(date) => {
                  const dateString = date
                    ? date.toISOString().split("T")[0]
                    : "";
                  onChange(dateString);
                }}
                onBlur={onBlur}
              />
            )}
          />
          {errors.dueDate && <span>{errors.dueDate.message}</span>}

          <footer className={styles.buttons}>
            <button
              onClick={() => closeDialog()}
              className={`${styles.close} body-m-regular`}
            >
              Close
            </button>
            <button
              type="submit"
              className={`${styles.create} ${
                !isValid && styles.createDisabled
              } body-m-regular`}
            >
              Create
            </button>
          </footer>
        </form>
      </Dialog>
    </>
  );
};
