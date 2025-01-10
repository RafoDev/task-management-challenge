import { useForm } from "react-hook-form";
import { TaskFieldsFragment } from "../graphql/fragments/taskFields.generated";
import { useGetUsersQuery } from "../graphql/queries/getUsers.generated";
import {
  CreateTaskSchema,
  TaskFormValue,
  UpdateTaskSchema,
} from "./task-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "../../../types";
import { useTaskMutations } from "./hooks/use-task-mutations";
import Dialog from "../../../components/ui/dialog/dialog";
import { TaskFormFields } from "./components/task-form-fields";
import styles from "./task-form.module.scss";

type TaskFormProps = {
  initialData?: TaskFormValue & {
    id?: string;
    assignee?: TaskFieldsFragment["assignee"];
    assigneeId?: string;
  };
  onSuccess?: () => void;
  isTaskFormOpen: boolean;
  openTaskForm: () => void;
  closeTaskForm: () => void;
};

export const TaskForm = ({
  initialData,
  onSuccess,
  isTaskFormOpen,
  openTaskForm,
  closeTaskForm,
}: TaskFormProps) => {
  const { data: usersData } = useGetUsersQuery();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TaskFormValue>({
    resolver: zodResolver(
      initialData?.id ? UpdateTaskSchema : CreateTaskSchema
    ),
    defaultValues: {
      status: Status.Todo,
      tags: [],
      ...initialData,
      assigneeId: initialData?.assignee?.id || initialData?.assigneeId,
    },
    mode: "onChange",
  });

  const handleClose = () => {
    reset({
      status: Status.Todo,
      tags: [],
      ...initialData,
      assigneeId: initialData?.assignee?.id || initialData?.assigneeId,
    });
    closeTaskForm();
  };

  const { handleSubmit: onSubmit, isEditMode } = useTaskMutations(
    initialData,
    handleClose,
    onSuccess
  );

  return (
    <Dialog open={isTaskFormOpen} onOpen={openTaskForm} onClose={handleClose}>
      <Dialog.Content>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TaskFormFields
            control={control}
            register={register}
            errors={errors}
            users={usersData?.users}
          />

          <footer className={styles.buttons}>
            <button
              onClick={() => handleClose()}
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
              {isEditMode ? "Update" : "Create"}
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};
